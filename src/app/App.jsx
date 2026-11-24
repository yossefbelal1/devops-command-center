import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Lenis from 'lenis';
import confetti from 'canvas-confetti';
import { ROADMAP_META, ROADMAP_MODULES } from '../data/roadmapData';
import { HIVEBOX_DATA } from '../data/hiveboxData';
import { PLAYBOOK_DECISIONS } from '../data/playbookData';
import { QUIZ_MODULES } from '../data/quizData';
import { RESOURCES_CATALOG } from '../data/resourcesData';
import {
  DEFAULT_APP_STATE,
  loadAppState,
  saveAppState,
  resetAppState,
  pushServerState,
  getLastSyncMeta,
  updateTaskProgress,
  normalizeExecutionStatus,
  toLegacyTopicStatus,
  getTopicsNeedingReview,
  buildExportBackup,
  previewBackupFile,
  restoreFromBackup
} from '../services/storage';
import {
  computeAdaptiveForecast,
  rebuildForecastModelFromSessions,
  normalizeCategory,
  normalizeDifficulty
} from '../services/adaptiveForecast';
import { Navbar } from '../components/layout/Navbar';
import { MobileNav } from '../components/layout/MobileNav';
import { SearchModal } from '../components/layout/SearchModal';
import { AppRoutes } from './router';

function makeAuditEntry(action, entityType, entityId = null, details = null) {
  return {
    id: `audit-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: new Date().toISOString(),
    action,
    entityType,
    entityId,
    details
  };
}

export default function App() {
  const [appState, setAppState] = useState(DEFAULT_APP_STATE);
  const [hydrated, setHydrated] = useState(false);
  const [syncStatus, setSyncStatus] = useState('offline');
  const [lastSyncedAt, setLastSyncedAt] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const lenisRef = useRef(null);
  const isFirstSaveRef = useRef(true);
  const syncTimerRef = useRef(null);
  const latestPendingSyncRef = useRef(DEFAULT_APP_STATE);
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });
    lenisRef.current = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  // Hydrate from IndexedDB + silent server reconciliation (/api/state)
  useEffect(() => {
    let active = true;
    loadAppState()
      .then((loaded) => {
        if (!active) return;
        setAppState(loaded);
        const meta = getLastSyncMeta();
        setSyncStatus(meta.status || 'offline');
        setLastSyncedAt(meta.lastSyncedAt || null);
        setHydrated(true);
      })
      .catch((err) => {
        console.error('Failed to hydrate app state:', err);
        if (active) {
          setSyncStatus('offline');
          setHydrated(true);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  // Persist state to IndexedDB immediately + auto-sync to /api/state with 500ms debounce
  useEffect(() => {
    if (!hydrated) return;
    if (isFirstSaveRef.current) {
      isFirstSaveRef.current = false;
      return;
    }

    latestPendingSyncRef.current = appState;
    saveAppState(appState)
      .then((saved) => {
        latestPendingSyncRef.current = saved;
      })
      .catch((err) => {
        console.error('Failed to persist app state:', err);
      });

    setSyncStatus('syncing');
    if (syncTimerRef.current) {
      clearTimeout(syncTimerRef.current);
    }
    syncTimerRef.current = setTimeout(async () => {
      const res = await pushServerState(latestPendingSyncRef.current);
      if (res.ok) {
        setSyncStatus('synced');
        setLastSyncedAt(
          res.updatedAt ||
            latestPendingSyncRef.current?.updatedAt ||
            new Date().toISOString()
        );
      } else {
        setSyncStatus('offline');
      }
    }, 500);

    return () => {
      if (syncTimerRef.current) {
        clearTimeout(syncTimerRef.current);
      }
    };
  }, [appState, hydrated]);

  // Global keyboard shortcut for search (Ctrl/Cmd + K)
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const fireConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 60,
        spread: 55,
        origin: { y: 0.72 },
        colors: ['#2563EB', '#10B981', '#06B6D4', '#6366F1']
      });
    } catch {
      // Ignore in headless/non-canvas environments
    }
  }, []);

  // Flattened topics list for timer, dashboard, and selectors
  const allTopics = useMemo(
    () =>
      ROADMAP_MODULES.flatMap((mod) =>
        (mod.topics || []).map((t) => ({
          ...t,
          moduleId: mod.id,
          moduleNumber: mod.number,
          moduleTitle: mod.title,
          status:
            appState.topicProgress?.[t.id]?.executionStatus ??
            appState.topicStatus?.[t.id] ??
            t.defaultStatus
        }))
      ),
    [appState.topicProgress, appState.topicStatus]
  );

  // Global execution, mastery, and HiveBox metrics
  const metrics = useMemo(() => {
    let totalSubtasks = 0;
    let doneSubtasks = 0;
    let totalHours = 0;
    let doneHours = 0;
    let totalTopics = 0;
    let completedTopics = 0;
    let masteredTopics = 0;
    let practicedTopics = 0;

    const moduleStats = ROADMAP_MODULES.map((mod) => {
      let modSubTotal = 0;
      let modSubDone = 0;
      let modTopicCount = 0;
      let modMasteryPoints = 0;

      (mod.topics || []).forEach((t) => {
        totalTopics++;
        modTopicCount++;
        totalHours += Number(t.hours) || 0;

        let tDoneCount = 0;
        (t.subtasks || []).forEach((s) => {
          totalSubtasks++;
          modSubTotal++;
          const isDone =
            appState.subtasks?.[s.id] !== undefined ? appState.subtasks[s.id] : s.done;
          if (isDone) {
            doneSubtasks++;
            modSubDone++;
            tDoneCount++;
          }
        });

        const tRatio = t.subtasks?.length > 0 ? tDoneCount / t.subtasks.length : 0;
        const explicitExec = normalizeExecutionStatus(
          appState.topicProgress?.[t.id]?.executionStatus ??
            appState.topicStatus?.[t.id] ??
            t.defaultStatus
        );
        if (explicitExec === 'completed') {
          completedTopics++;
          doneHours += Number(t.hours) || 0;
        } else {
          doneHours += Math.round((Number(t.hours) || 0) * tRatio);
        }

        const explicitMastery =
          appState.topicProgress?.[t.id]?.masteryStatus ||
          (explicitExec === 'completed' ? 'practiced' : 'unverified');
        if (explicitMastery === 'mastered') {
          masteredTopics++;
          modMasteryPoints += 1;
        } else if (explicitMastery === 'practiced') {
          practicedTopics++;
          modMasteryPoints += 0.5;
        }
      });

      const executionPct = modSubTotal > 0 ? Math.round((modSubDone / modSubTotal) * 100) : 0;
      const masteryPct =
        modTopicCount > 0 ? Math.round((modMasteryPoints / modTopicCount) * 100) : 0;

      return {
        id: mod.id,
        number: mod.number,
        title: mod.title,
        shortLabel: `M${mod.number}`,
        executionPct,
        masteryPct,
        doneSubtasks: modSubDone,
        totalSubtasks: modSubTotal
      };
    });

    let hbTotal = 0;
    let hbDone = 0;
    (HIVEBOX_DATA.phases || []).forEach((p) => {
      (p.deliverables || []).forEach((d) => {
        hbTotal++;
        const checked =
          appState.hivebox?.[d.id] !== undefined ? appState.hivebox[d.id] : d.done;
        if (checked) hbDone++;
      });
    });

    const overallPct = totalSubtasks > 0 ? Math.round((doneSubtasks / totalSubtasks) * 100) : 0;
    const masteryScore = masteredTopics + practicedTopics * 0.5;
    const masteryPct = totalTopics > 0 ? Math.round((masteryScore / totalTopics) * 100) : 0;

    return {
      totalSubtasks,
      doneSubtasks,
      overallPct,
      totalTopics,
      completedTopics,
      masteredTopics,
      practicedTopics,
      masteryPct,
      totalHours,
      doneHours,
      hbTotal,
      hbDone,
      hbPct: hbTotal > 0 ? Math.round((hbDone / hbTotal) * 100) : 0,
      moduleStats
    };
  }, [appState.subtasks, appState.topicProgress, appState.topicStatus, appState.hivebox]);

  // Adaptive forecast model
  const forecast = useMemo(
    () =>
      computeAdaptiveForecast({
        modules: ROADMAP_MODULES,
        progress: appState,
        targetWeeklyHours: appState.targetWeeklyHours || appState.weeklyStudyHours || 12,
        studySessions: appState.studySessions
      }),
    [appState]
  );

  // Topics due for 30-day review
  const topicsDueForReview = useMemo(
    () => getTopicsNeedingReview(appState.topicProgress || {}),
    [appState.topicProgress]
  );

  // Actions passed to routes
  const actions = useMemo(() => {
    const appendLog = (prev, action, entityType, entityId, details) => [
      makeAuditEntry(action, entityType, entityId, details),
      ...(prev.auditLog || []).slice(0, 249)
    ];

    return {
      toggleSubtask: (topic, subtaskId) => {
        setAppState((prev) => {
          const currentVal =
            prev.subtasks?.[subtaskId] !== undefined
              ? prev.subtasks[subtaskId]
              : topic.subtasks.find((s) => s.id === subtaskId)?.done || false;
          const nextVal = !currentVal;
          const nextSubtasks = { ...prev.subtasks, [subtaskId]: nextVal };

          const allDone = topic.subtasks.every((s) =>
            nextSubtasks[s.id] !== undefined ? nextSubtasks[s.id] : s.done
          );
          const anyDone = topic.subtasks.some((s) =>
            nextSubtasks[s.id] !== undefined ? nextSubtasks[s.id] : s.done
          );

          const nextExecution = allDone
            ? 'completed'
            : anyDone
            ? 'in_progress'
            : 'not_started';
          if (allDone) fireConfetti();

          const updatedRec = updateTaskProgress(prev.topicProgress?.[topic.id], {
            topicId: topic.id,
            executionStatus: nextExecution
          });

          return {
            ...prev,
            subtasks: nextSubtasks,
            topicStatus: {
              ...prev.topicStatus,
              [topic.id]: toLegacyTopicStatus(nextExecution)
            },
            topicProgress: {
              ...prev.topicProgress,
              [topic.id]: updatedRec
            },
            auditLog: appendLog(prev, 'toggle_subtask', 'subtask', subtaskId, {
              topicId: topic.id,
              done: nextVal
            })
          };
        });
      },

      setTopicExecution: (topicId, executionStatus) => {
        const normExec = normalizeExecutionStatus(executionStatus);
        setAppState((prev) => {
          const nextSubtasks = { ...prev.subtasks };
          if (normExec === 'completed') {
            const found = allTopics.find((t) => t.id === topicId);
            found?.subtasks?.forEach((s) => {
              nextSubtasks[s.id] = true;
            });
            fireConfetti();
          }
          const updatedRec = updateTaskProgress(prev.topicProgress?.[topicId], {
            topicId,
            executionStatus: normExec
          });

          return {
            ...prev,
            subtasks: nextSubtasks,
            topicStatus: {
              ...prev.topicStatus,
              [topicId]: toLegacyTopicStatus(normExec)
            },
            topicProgress: {
              ...prev.topicProgress,
              [topicId]: updatedRec
            },
            auditLog: appendLog(prev, 'set_execution', 'topic', topicId, {
              executionStatus: normExec
            })
          };
        });
      },

      setTopicMastery: (topicId, masteryStatus) => {
        setAppState((prev) => {
          const existing = prev.topicProgress?.[topicId] || {
            topicId,
            executionStatus: prev.topicStatus?.[topicId] || 'not_started'
          };
          const updatedRec = updateTaskProgress(existing, {
            topicId,
            masteryStatus,
            markReviewed: masteryStatus !== 'unverified'
          });
          if (masteryStatus === 'mastered') fireConfetti();

          return {
            ...prev,
            topicProgress: {
              ...prev.topicProgress,
              [topicId]: updatedRec
            },
            auditLog: appendLog(prev, 'set_mastery', 'topic', topicId, { masteryStatus })
          };
        });
      },

      markTopicReviewed: (topicId) => {
        setAppState((prev) => {
          const updatedRec = updateTaskProgress(prev.topicProgress?.[topicId], {
            topicId,
            markReviewed: true
          });
          return {
            ...prev,
            topicProgress: {
              ...prev.topicProgress,
              [topicId]: updatedRec
            },
            auditLog: appendLog(prev, 'mark_reviewed', 'topic', topicId, null)
          };
        });
      },

      setTopicConfidence: (topicId, confidence) => {
        const lvl = Math.max(1, Math.min(5, Math.round(Number(confidence) || 3)));
        setAppState((prev) => {
          const existing = prev.topicProgress?.[topicId] || {
            topicId,
            executionStatus: prev.topicStatus?.[topicId] || 'not_started'
          };
          const exec = normalizeExecutionStatus(existing.executionStatus);
          let nextMastery = existing.masteryStatus || 'unverified';
          if (lvl >= 4 && exec === 'completed') {
            nextMastery = 'mastered';
          } else if (lvl >= 3 && nextMastery === 'unverified') {
            nextMastery = 'practiced';
          }

          const updatedRec = updateTaskProgress(existing, {
            topicId,
            confidence: lvl,
            masteryStatus: nextMastery,
            markReviewed: lvl >= 3
          });
          if (nextMastery === 'mastered' && existing.masteryStatus !== 'mastered') {
            fireConfetti();
          }

          return {
            ...prev,
            topicProgress: {
              ...prev.topicProgress,
              [topicId]: updatedRec
            },
            auditLog: appendLog(prev, 'set_confidence', 'topic', topicId, {
              confidence: lvl,
              masteryStatus: nextMastery
            })
          };
        });
      },

      saveQuizAttempt: (moduleId, questionId, { selectedIndex = null, isCorrect = false, revealed = false, timeSpentSec = 0 } = {}) => {
        setAppState((prev) => {
          const prevMod = prev.quizzes?.[moduleId] || {};
          const prevQ = prevMod[questionId] || {};
          const nextAttempts = (Number(prevQ.attempts) || 0) + 1;

          // CRITICAL: Reveal Answer or incorrect submission NEVER marks solved: true
          const nextSolved = revealed
            ? Boolean(prevQ.solved)
            : Boolean(isCorrect);

          const nextMod = {
            ...prevMod,
            [questionId]: {
              selected:
                selectedIndex !== undefined ? selectedIndex : prevQ.selected ?? null,
              solved: nextSolved,
              revealed: Boolean(revealed),
              attempts: nextAttempts,
              timeSpentSec: Number(timeSpentSec) || 0,
              attemptedAt: new Date().toISOString()
            }
          };

          const quizMeta = QUIZ_MODULES.find((q) => q.moduleId === moduleId || q.id === moduleId);
          if (!revealed && isCorrect && quizMeta) {
            const allSolved = quizMeta.questions.every((q) => nextMod[q.id]?.solved === true);
            if (allSolved) fireConfetti();
          }

          return {
            ...prev,
            quizzes: {
              ...prev.quizzes,
              [moduleId]: nextMod
            },
            auditLog: appendLog(prev, 'quiz_attempt', 'quiz', `${moduleId}::${questionId}`, {
              solved: nextSolved,
              revealed: Boolean(revealed),
              attempts: nextAttempts
            })
          };
        });
      },

      clearQuizQuestionAttempt: (moduleId, questionId) => {
        setAppState((prev) => {
          const prevMod = prev.quizzes?.[moduleId] || {};
          const prevQ = prevMod[questionId] || {};
          return {
            ...prev,
            quizzes: {
              ...prev.quizzes,
              [moduleId]: {
                ...prevMod,
                [questionId]: {
                  ...prevQ,
                  selected: null,
                  revealed: false,
                  solved: Boolean(prevQ.solved)
                }
              }
            }
          };
        });
      },

      resetQuizModule: (moduleId, wrongOnly = false) => {
        setAppState((prev) => {
          const prevMod = prev.quizzes?.[moduleId] || {};
          const nextMod = {};
          if (wrongOnly) {
            for (const [qId, qState] of Object.entries(prevMod)) {
              if (qState?.solved === true) {
                nextMod[qId] = qState;
              }
            }
          }
          return {
            ...prev,
            quizzes: {
              ...prev.quizzes,
              [moduleId]: nextMod
            },
            auditLog: appendLog(prev, 'reset_quiz', 'quiz', moduleId, { wrongOnly })
          };
        });
      },

      toggleCapstone: (itemId) => {
        setAppState((prev) => {
          const current = Boolean(prev.hivebox?.[itemId]);
          const next = !current;
          if (next) fireConfetti();
          return {
            ...prev,
            hivebox: { ...prev.hivebox, [itemId]: next },
            auditLog: appendLog(prev, 'toggle_capstone', 'capstone', itemId, { done: next })
          };
        });
      },

      setHiveboxColumn: (phaseId, columnId) => {
        setAppState((prev) => ({
          ...prev,
          hiveboxColumns: { ...(prev.hiveboxColumns || {}), [phaseId]: columnId },
          auditLog: appendLog(prev, 'move_hivebox_kanban', 'hivebox', phaseId, { columnId })
        }));
      },

      saveTopicNote: (topicId, noteText) => {
        setAppState((prev) => {
          const updatedRec = updateTaskProgress(prev.topicProgress?.[topicId], {
            topicId,
            note: noteText
          });
          return {
            ...prev,
            topicNotes: { ...prev.topicNotes, [topicId]: noteText },
            topicProgress: {
              ...prev.topicProgress,
              [topicId]: updatedRec
            }
          };
        });
      },

      toggleHivebox: (delId) => {
        setAppState((prev) => {
          let defaultDone = false;
          (HIVEBOX_DATA.phases || []).forEach((p) => {
            const found = p.deliverables.find((d) => d.id === delId);
            if (found) defaultDone = Boolean(found.done);
          });
          const current =
            prev.hivebox?.[delId] !== undefined ? prev.hivebox[delId] : defaultDone;
          const next = !current;
          if (next) fireConfetti();
          return {
            ...prev,
            hivebox: { ...prev.hivebox, [delId]: next },
            auditLog: appendLog(prev, 'toggle_hivebox', 'hivebox', delId, { done: next })
          };
        });
      },

      toggleAudit: (auditId) => {
        setAppState((prev) => {
          const current = prev.audit?.[auditId] !== false;
          const next = !current;
          return {
            ...prev,
            audit: { ...prev.audit, [auditId]: next },
            auditLog: appendLog(prev, 'toggle_audit', 'audit', auditId, { done: next })
          };
        });
      },

      startTimer: ({ topicId, topicTitle, category, difficulty, estimatedMinutes }) => {
        const nowIso = new Date().toISOString();
        setAppState((prev) => ({
          ...prev,
          activeTimer: {
            topicId: topicId || 'custom-session',
            topicTitle: topicTitle || 'جلسة مذاكرة DevOps',
            category: normalizeCategory(category),
            difficulty: normalizeDifficulty(difficulty),
            estimatedMinutes: Number(estimatedMinutes) || 60,
            startedAt: nowIso,
            lastResumedAt: nowIso,
            pausedAt: null,
            accumulatedActiveMs: 0,
            accumulatedPausedMs: 0,
            isRunning: true
          }
        }));
      },

      pauseTimer: () => {
        setAppState((prev) => {
          if (!prev.activeTimer || !prev.activeTimer.isRunning) return prev;
          const nowMs = Date.now();
          const runningSince =
            Date.parse(prev.activeTimer.lastResumedAt || prev.activeTimer.startedAt) || nowMs;
          const deltaMs = Math.max(0, nowMs - runningSince);
          return {
            ...prev,
            activeTimer: {
              ...prev.activeTimer,
              accumulatedActiveMs: (prev.activeTimer.accumulatedActiveMs || 0) + deltaMs,
              pausedAt: new Date(nowMs).toISOString(),
              isRunning: false
            }
          };
        });
      },

      resumeTimer: () => {
        setAppState((prev) => {
          if (!prev.activeTimer || prev.activeTimer.isRunning) return prev;
          const nowMs = Date.now();
          const pausedSince = Date.parse(prev.activeTimer.pausedAt) || nowMs;
          const pauseDeltaMs = Math.max(0, nowMs - pausedSince);
          return {
            ...prev,
            activeTimer: {
              ...prev.activeTimer,
              accumulatedPausedMs: (prev.activeTimer.accumulatedPausedMs || 0) + pauseDeltaMs,
              lastResumedAt: new Date(nowMs).toISOString(),
              pausedAt: null,
              isRunning: true
            }
          };
        });
      },

      completeTimer: (payload) => {
        fireConfetti();
        setAppState((prev) => {
          const completedAt = payload.completedAt || new Date().toISOString();
          const activeMinutes = Math.max(1, Number(payload.actualActiveMinutes) || 1);
          const pausedMinutes = Math.max(0, Number(payload.pausedMinutes) || 0);
          const session = {
            id: `sess-${Date.now()}`,
            topicId: payload.topicId || prev.activeTimer?.topicId || null,
            topicTitle: payload.topicTitle || prev.activeTimer?.topicTitle || 'جلسة مذاكرة',
            topic: payload.topicTitle || prev.activeTimer?.topicTitle || 'جلسة مذاكرة',
            category: normalizeCategory(payload.category || prev.activeTimer?.category),
            difficulty: normalizeDifficulty(payload.difficulty || prev.activeTimer?.difficulty),
            estimatedMinutes: Number(payload.estimatedMinutes || prev.activeTimer?.estimatedMinutes || 60),
            actualActiveMinutes: activeMinutes,
            pausedMinutes,
            hours: Number((activeMinutes / 60).toFixed(2)),
            confidence: Number(payload.confidence) || 3,
            interrupted: Boolean(payload.interrupted),
            note: payload.note || '',
            notes: payload.note || '',
            evidenceUrl: payload.evidenceUrl || '',
            startedAt: prev.activeTimer?.startedAt || null,
            completedAt,
            date: completedAt.split('T')[0],
            source: 'timer'
          };
          const nextSessions = [session, ...(prev.studySessions || [])];
          const nextForecastModel = rebuildForecastModelFromSessions(nextSessions);

          const nextTaskTelemetry = { ...(prev.taskTelemetry || {}) };
          if (session.topicId) {
            nextTaskTelemetry[session.topicId] = {
              estimatedMinutes: session.estimatedMinutes,
              actualActiveMinutes: session.actualActiveMinutes,
              pausedMinutes: session.pausedMinutes,
              category: session.category,
              difficulty: session.difficulty,
              confidence: session.confidence,
              completedAt: session.completedAt,
              interrupted: session.interrupted,
              note: session.note,
              evidenceUrl: session.evidenceUrl
            };
          }

          return {
            ...prev,
            activeTimer: null,
            studySessions: nextSessions,
            forecastModel: nextForecastModel,
            taskTelemetry: nextTaskTelemetry,
            auditLog: appendLog(prev, 'complete_timer_session', 'studySession', session.id, {
              topicId: session.topicId,
              actualActiveMinutes: session.actualActiveMinutes,
              pausedMinutes: session.pausedMinutes,
              interrupted: session.interrupted
            })
          };
        });
      },

      logManualSession: (payload) => {
        fireConfetti();
        setAppState((prev) => {
          const completedAt = payload.completedAt || new Date().toISOString();
          const activeMinutes = Math.max(1, Number(payload.actualActiveMinutes) || 1);
          const pausedMinutes = Math.max(0, Number(payload.pausedMinutes) || 0);
          const session = {
            id: `sess-${Date.now()}`,
            topicId: payload.topicId || null,
            topicTitle: payload.topicTitle || 'جلسة مذاكرة يدوية',
            topic: payload.topicTitle || 'جلسة مذاكرة يدوية',
            category: normalizeCategory(payload.category),
            difficulty: normalizeDifficulty(payload.difficulty),
            estimatedMinutes: Number(payload.estimatedMinutes) || 60,
            actualActiveMinutes: activeMinutes,
            pausedMinutes,
            hours: Number((activeMinutes / 60).toFixed(2)),
            confidence: Number(payload.confidence) || 3,
            interrupted: Boolean(payload.interrupted),
            note: payload.note || '',
            notes: payload.note || '',
            evidenceUrl: payload.evidenceUrl || '',
            completedAt,
            date: completedAt.split('T')[0],
            source: 'manual'
          };
          const nextSessions = [session, ...(prev.studySessions || [])];
          const nextForecastModel = rebuildForecastModelFromSessions(nextSessions);

          return {
            ...prev,
            studySessions: nextSessions,
            forecastModel: nextForecastModel,
            auditLog: appendLog(prev, 'log_manual_session', 'studySession', session.id, {
              topicId: session.topicId,
              actualActiveMinutes: session.actualActiveMinutes,
              interrupted: session.interrupted
            })
          };
        });
      },

      updateSession: (sessionId, patch) => {
        setAppState((prev) => {
          const nextSessions = (prev.studySessions || []).map((s) => {
            if (s.id !== sessionId) return s;
            const activeMinutes = Math.max(
              1,
              Number(patch.actualActiveMinutes ?? s.actualActiveMinutes) || 1
            );
            return {
              ...s,
              ...patch,
              topic: patch.topicTitle || patch.topic || s.topicTitle || s.topic,
              topicTitle: patch.topicTitle || patch.topic || s.topicTitle || s.topic,
              category: normalizeCategory(patch.category || s.category),
              difficulty: normalizeDifficulty(patch.difficulty || s.difficulty),
              actualActiveMinutes: activeMinutes,
              pausedMinutes: Math.max(0, Number(patch.pausedMinutes ?? s.pausedMinutes) || 0),
              hours: Number((activeMinutes / 60).toFixed(2)),
              notes: patch.note ?? patch.notes ?? s.note ?? '',
              note: patch.note ?? patch.notes ?? s.note ?? '',
              updatedAt: new Date().toISOString()
            };
          });
          const nextForecastModel = rebuildForecastModelFromSessions(nextSessions);

          return {
            ...prev,
            studySessions: nextSessions,
            forecastModel: nextForecastModel,
            auditLog: appendLog(prev, 'edit_session', 'studySession', sessionId, patch)
          };
        });
      },

      toggleSessionInterrupted: (sessionId) => {
        setAppState((prev) => {
          let toggledTo = false;
          const nextSessions = (prev.studySessions || []).map((s) => {
            if (s.id !== sessionId) return s;
            toggledTo = !s.interrupted;
            return { ...s, interrupted: toggledTo, updatedAt: new Date().toISOString() };
          });
          const nextForecastModel = rebuildForecastModelFromSessions(nextSessions);
          return {
            ...prev,
            studySessions: nextSessions,
            forecastModel: nextForecastModel,
            auditLog: appendLog(prev, 'toggle_interrupted', 'studySession', sessionId, {
              interrupted: toggledTo
            })
          };
        });
      },

      deleteSession: (sessionId) => {
        setAppState((prev) => {
          const nextSessions = (prev.studySessions || []).filter((s) => s.id !== sessionId);
          const nextForecastModel = rebuildForecastModelFromSessions(nextSessions);
          return {
            ...prev,
            studySessions: nextSessions,
            forecastModel: nextForecastModel,
            auditLog: appendLog(prev, 'delete_session', 'studySession', sessionId, null)
          };
        });
      },

      setTargetWeeklyHours: (hours) => {
        const clamped = Math.max(1, Math.min(80, Number(hours) || 12));
        setAppState((prev) => ({
          ...prev,
          targetWeeklyHours: clamped,
          weeklyStudyHours: clamped,
          auditLog: appendLog(prev, 'update_target_hours', 'settings', 'targetWeeklyHours', {
            targetWeeklyHours: clamped
          })
        }));
      },

      exportBackup: () => {
        const { json, filename, counts } = buildExportBackup(appState);
        const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        return { filename, counts };
      },

      previewBackup: async (fileOrText) => previewBackupFile(fileOrText),

      restoreBackup: async (previewOrFile) => {
        const res = await restoreFromBackup(previewOrFile);
        if (res.ok && res.state) {
          isFirstSaveRef.current = true;
          setAppState(res.state);
          setSyncStatus('syncing');
          const syncRes = await pushServerState(res.state);
          if (syncRes.ok) {
            setSyncStatus('synced');
            setLastSyncedAt(syncRes.updatedAt);
          } else {
            setSyncStatus('offline');
          }
        }
        return res;
      },

      resetAll: async () => {
        const next = await resetAppState();
        isFirstSaveRef.current = true;
        setAppState(next);
        setSyncStatus('syncing');
        const syncRes = await pushServerState(next);
        if (syncRes.ok) {
          setSyncStatus('synced');
          setLastSyncedAt(syncRes.updatedAt);
        } else {
          setSyncStatus('offline');
        }
        return next;
      }
    };
  }, [allTopics, appState, fireConfetti]);

  const searchData = useMemo(
    () => ({
      modules: ROADMAP_MODULES,
      hivebox: HIVEBOX_DATA,
      playbook: PLAYBOOK_DECISIONS,
      meta: ROADMAP_META,
      resources: RESOURCES_CATALOG.map((r) => ({
        ...r,
        label: r.title,
        type: r.provider,
        category: `Module ${r.moduleNumber}`
      })),
      interviewQuizzes: QUIZ_MODULES.map((q) => ({
        ...q,
        domain: q.title
      }))
    }),
    []
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F6F2] text-slate-900 relative">
      <div
        className="pointer-events-none fixed inset-x-0 top-0 h-[420px] -z-0 opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 75% 55% at 50% -10%, rgba(59, 130, 246, 0.14), transparent)'
        }}
      />

      <Navbar
        metrics={metrics}
        activeTimer={appState.activeTimer}
        syncStatus={syncStatus}
        lastSyncedAt={lastSyncedAt}
        onOpenSearch={() => setSearchOpen(true)}
        onTimerClick={() => navigate('/')}
      />

      <main className="flex-1 relative z-10 pb-20 md:pb-6">
        {!hydrated ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="glass-v5 rounded-3xl p-8 animate-pulse space-y-4">
              <div className="h-5 w-48 bg-slate-200 rounded-lg" />
              <div className="h-8 w-80 bg-slate-200 rounded-xl" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="h-28 bg-slate-100 rounded-2xl" />
                <div className="h-28 bg-slate-100 rounded-2xl" />
                <div className="h-28 bg-slate-100 rounded-2xl" />
              </div>
            </div>
          </div>
        ) : (
          <AppRoutes
            appState={appState}
            metrics={metrics}
            forecast={forecast}
            allTopics={allTopics}
            topicsDueForReview={topicsDueForReview}
            syncStatus={syncStatus}
            lastSyncedAt={lastSyncedAt}
            actions={actions}
          />
        )}
      </main>

      <footer className="bg-slate-950 text-slate-400 py-8 px-4 sm:px-6 lg:px-8 mt-8 pb-28 md:pb-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            <strong className="text-white font-extrabold">Youssef.DevOps</strong> — Dynamic DevOps
            Roadmap &amp; HiveBox Command Center ({ROADMAP_META.studentName})
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/yossefbelal1/Hivebox"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              HiveBox Repo
            </a>
            <a
              href="https://github.com/yossefbelal1/AutoTele"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              AutoTele Repo
            </a>
            <a
              href="https://devopsroadmap.io/projects/hivebox/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              devopsroadmap.io
            </a>
          </div>
        </div>
      </footer>

      <MobileNav activeTimer={appState.activeTimer} />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        data={searchData}
      />
    </div>
  );
}
