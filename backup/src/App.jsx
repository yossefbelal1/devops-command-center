import React, { useState, useEffect, useRef, useMemo } from 'react';
import Lenis from 'lenis';
import confetti from 'canvas-confetti';
import { ROADMAP_DATA } from './data/roadmapData';
import { Navbar } from './components/Navbar';
import { RoadmapsView } from './components/RoadmapsView';
import { ProjectsView } from './components/ProjectsView';
import { CareerView } from './components/CareerView';
import { PlaybookView } from './components/PlaybookView';
import { AnalyticsView } from './components/AnalyticsView';
import { SearchModal } from './components/SearchModal';

const STORAGE_KEY = 'devops_command_center_v6_youssef';

const getInitialProgress = () => {
  const defaultState = {
    subtasks: {},
    topicStatus: {},
    topicNotes: {},
    hivebox: {},
    audit: {},
    quizzes: {},
    studySessions: []
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return { ...defaultState, ...JSON.parse(raw) };
    }
  } catch (e) {
    console.error('Failed to read localStorage:', e);
  }
  return defaultState;
};

export default function App() {
  const [activeTab, setActiveTab] = useState('roadmaps');
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [progress, setProgress] = useState(getInitialProgress);
  const [searchOpen, setSearchOpen] = useState(false);
  const lenisRef = useRef(null);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
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

  // Sync progress to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress:', e);
    }
  }, [progress]);

  // Global keyboard shortcut for search (Ctrl+K)
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

  const fireConfetti = () => {
    confetti({
      particleCount: 65,
      spread: 55,
      origin: { y: 0.72 },
      colors: ['#2563EB', '#10B981', '#06B6D4', '#6366F1']
    });
  };

  // Compute global metrics
  const metrics = useMemo(() => {
    let totalSubtasks = 0;
    let doneSubtasks = 0;
    let totalHours = 0;
    let doneHours = 0;

    ROADMAP_DATA.modules.forEach((mod) => {
      mod.topics.forEach((t) => {
        totalHours += t.hours;
        let tDoneCount = 0;
        t.subtasks.forEach((s) => {
          totalSubtasks++;
          const isDone =
            progress.subtasks[s.id] !== undefined ? progress.subtasks[s.id] : s.done;
          if (isDone) {
            doneSubtasks++;
            tDoneCount++;
          }
        });
        const tRatio = t.subtasks.length > 0 ? tDoneCount / t.subtasks.length : 0;
        const explicitStatus = progress.topicStatus[t.id] || t.defaultStatus;
        if (explicitStatus === 'done') {
          doneHours += t.hours;
        } else {
          doneHours += Math.round(t.hours * tRatio);
        }
      });
    });

    let hbTotal = 0;
    let hbDone = 0;
    ROADMAP_DATA.hivebox.phases.forEach((p) => {
      p.deliverables.forEach((d) => {
        hbTotal++;
        const checked = progress.hivebox[d.id] !== undefined ? progress.hivebox[d.id] : d.done;
        if (checked) hbDone++;
      });
    });

    return {
      totalSubtasks,
      doneSubtasks,
      overallPct: totalSubtasks > 0 ? Math.round((doneSubtasks / totalSubtasks) * 100) : 0,
      totalHours,
      doneHours,
      hbTotal,
      hbDone,
      hbPct: hbTotal > 0 ? Math.round((hbDone / hbTotal) * 100) : 0
    };
  }, [progress]);

  // Handlers
  const handleToggleSubtask = (topic, subtaskId) => {
    setProgress((prev) => {
      const currentVal =
        prev.subtasks[subtaskId] !== undefined
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

      let nextTopicStatus = { ...prev.topicStatus };
      if (allDone) {
        nextTopicStatus[topic.id] = 'done';
        fireConfetti();
      } else if (anyDone) {
        nextTopicStatus[topic.id] = 'in_progress';
      } else {
        nextTopicStatus[topic.id] = 'pending';
      }

      return {
        ...prev,
        subtasks: nextSubtasks,
        topicStatus: nextTopicStatus
      };
    });
  };

  const handleSetTopicStatus = (topicId, newStatus) => {
    setProgress((prev) => {
      const nextSubtasks = { ...prev.subtasks };
      if (newStatus === 'done') {
        const mod = ROADMAP_DATA.modules.find((m) =>
          m.topics.some((t) => t.id === topicId)
        );
        const topic = mod?.topics.find((t) => t.id === topicId);
        topic?.subtasks.forEach((s) => {
          nextSubtasks[s.id] = true;
        });
        fireConfetti();
      }
      return {
        ...prev,
        subtasks: nextSubtasks,
        topicStatus: { ...prev.topicStatus, [topicId]: newStatus }
      };
    });
  };

  const handleSaveTopicNote = (topicId, text) => {
    setProgress((prev) => ({
      ...prev,
      topicNotes: { ...prev.topicNotes, [topicId]: text }
    }));
  };

  const handleToggleHivebox = (delId) => {
    setProgress((prev) => {
      let defaultDone = false;
      ROADMAP_DATA.hivebox.phases.forEach((p) => {
        const found = p.deliverables.find((d) => d.id === delId);
        if (found) defaultDone = found.done;
      });
      const current = prev.hivebox[delId] !== undefined ? prev.hivebox[delId] : defaultDone;
      if (!current) fireConfetti();
      return {
        ...prev,
        hivebox: { ...prev.hivebox, [delId]: !current }
      };
    });
  };

  const handleToggleAudit = (auditId) => {
    setProgress((prev) => {
      const current = prev.audit[auditId] !== false;
      return {
        ...prev,
        audit: { ...prev.audit, [auditId]: !current }
      };
    });
  };

  const handleSaveQuizProgress = (quizId, questionId, result) => {
    setProgress((prev) => {
      const prevQuiz = prev.quizzes[quizId] || {};
      const nextQuiz = { ...prevQuiz, [questionId]: result };

      // Fire confetti if ALL questions in this card just got solved!
      const quizObj = ROADMAP_DATA.interviewQuizzes.find((q) => q.id === quizId);
      if (quizObj && result.solved) {
        const allSolved = quizObj.questions.every((q) => nextQuiz[q.id]?.solved);
        if (allSolved) fireConfetti();
      }

      return {
        ...prev,
        quizzes: { ...prev.quizzes, [quizId]: nextQuiz }
      };
    });
  };

  const handleAddSession = (session) => {
    fireConfetti();
    setProgress((prev) => ({
      ...prev,
      studySessions: [session, ...prev.studySessions]
    }));
  };

  const handleDeleteSession = (id) => {
    setProgress((prev) => ({
      ...prev,
      studySessions: prev.studySessions.filter((s) => s.id !== id)
    }));
  };

  const handleExportJSON = () => {
    const str =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(progress, null, 2));
    const a = document.createElement('a');
    a.href = str;
    a.download = `youssef_devops_roadmap_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const handleImportJSON = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        setProgress((prev) => ({ ...prev, ...parsed }));
        alert('تم استيراد بيانات تقدمك بنجاح.');
      } catch {
        alert('ملف JSON غير صالح.');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (window.confirm('هل أنت متأكد من إعادة ضبط كل الشيك ليست إلى الوضع الافتراضي؟')) {
      localStorage.removeItem(STORAGE_KEY);
      setProgress(getInitialProgress());
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab !== 'roadmaps') {
      setSelectedModuleId(null);
    }
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
  };

  const handleSelectModule = (modId) => {
    setActiveTab('roadmaps');
    setSelectedModuleId(modId);
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
  };

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
        activeTab={activeTab}
        onTabChange={handleTabChange}
        metrics={metrics}
        onOpenSearch={() => setSearchOpen(true)}
        onJumpToCurrent={() => handleSelectModule('module-2')}
      />

      <main className="flex-1 relative z-10">
        {activeTab === 'roadmaps' && (
          <RoadmapsView
            data={ROADMAP_DATA}
            progress={progress}
            metrics={metrics}
            selectedModuleId={selectedModuleId}
            onSelectModule={handleSelectModule}
            onToggleSubtask={handleToggleSubtask}
            onSetTopicStatus={handleSetTopicStatus}
            onSaveTopicNote={handleSaveTopicNote}
            lenisRef={lenisRef}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsView
            data={ROADMAP_DATA}
            progress={progress}
            onToggleHivebox={handleToggleHivebox}
            onToggleAudit={handleToggleAudit}
          />
        )}

        {activeTab === 'career' && <CareerView data={ROADMAP_DATA} progress={progress} />}

        {activeTab === 'playbook' && (
          <PlaybookView
            data={ROADMAP_DATA}
            progress={progress}
            onSaveQuizProgress={handleSaveQuizProgress}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView
            data={ROADMAP_DATA}
            progress={progress}
            metrics={metrics}
            onToggleSubtask={handleToggleSubtask}
            onAddSession={handleAddSession}
            onDeleteSession={handleDeleteSession}
            onExportJSON={handleExportJSON}
            onImportJSON={handleImportJSON}
            onReset={handleReset}
          />
        )}
      </main>

      <footer className="bg-slate-950 text-slate-400 py-8 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            <strong className="text-white font-extrabold">Youssef.DevOps</strong> — Dynamic DevOps
            Roadmap & HiveBox Tracker (yossefbelal1)
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

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        data={ROADMAP_DATA}
        onNavigateToTopic={(modId) => handleSelectModule(modId)}
        onNavigateTab={(tab) => handleTabChange(tab)}
      />
    </div>
  );
}
