import React, { useState, useEffect, useMemo } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Clock,
  PlusCircle,
  Timer
} from 'lucide-react';
import {
  STUDY_CATEGORIES,
  STUDY_DIFFICULTIES,
  normalizeCategory,
  normalizeDifficulty,
  getTimerDurations,
  formatDuration
} from './timerUtils';
import { SessionLogModal } from './SessionLogModal';

export function StudyTimerWidget({
  activeTimer,
  topics = [],
  onStartTimer,
  onPauseTimer,
  onResumeTimer,
  onCompleteTimer,
  onLogManualSession
}) {
  const [nowMs, setNowMs] = useState(() => Date.now());
  const [selectedTopicId, setSelectedTopicId] = useState('');
  const [category, setCategory] = useState('lab');
  const [difficulty, setDifficulty] = useState('intermediate');
  const [modalState, setModalState] = useState(null); // { mode: 'complete' | 'manual', initialData: {...} } | null

  // Tick every second only while a timer exists
  useEffect(() => {
    if (!activeTimer) return;
    setNowMs(Date.now());
    const id = setInterval(() => {
      setNowMs(Date.now());
    }, 1000);
    return () => clearInterval(id);
  }, [activeTimer]);

  // Default topic selection
  useEffect(() => {
    if (!selectedTopicId && topics.length > 0) {
      const preferred =
        topics.find((t) => t.status === 'in_progress' || t.defaultStatus === 'in_progress') ||
        topics.find((t) => t.status !== 'done' && t.defaultStatus !== 'done') ||
        topics[0];
      if (preferred) {
        setSelectedTopicId(preferred.id);
        setCategory(normalizeCategory(preferred.category));
        setDifficulty(normalizeDifficulty(preferred.difficulty));
      }
    }
  }, [topics, selectedTopicId]);

  const selectedTopic = useMemo(
    () => topics.find((t) => t.id === selectedTopicId) || topics[0] || null,
    [topics, selectedTopicId]
  );

  const { activeSeconds, pausedSeconds, isRunning, isPaused } = useMemo(
    () => getTimerDurations(activeTimer, nowMs),
    [activeTimer, nowMs]
  );

  const handleTopicChange = (nextId) => {
    setSelectedTopicId(nextId);
    const found = topics.find((t) => t.id === nextId);
    if (found) {
      setCategory(normalizeCategory(found.category));
      setDifficulty(normalizeDifficulty(found.difficulty));
    }
  };

  const handleStart = () => {
    if (!onStartTimer) return;
    onStartTimer({
      topicId: selectedTopic?.id || 'custom-session',
      topicTitle: selectedTopic?.title || 'جلسة مذاكرة DevOps',
      category,
      difficulty,
      estimatedMinutes: Number(
        selectedTopic?.estimatedMinutes || (selectedTopic?.hours ? selectedTopic.hours * 60 : 60)
      )
    });
  };

  const openModal = (mode) => {
    const snapshot =
      mode === 'complete' && activeTimer
        ? {
            topicId: activeTimer.topicId,
            topicTitle: activeTimer.topicTitle,
            category: activeTimer.category,
            difficulty: activeTimer.difficulty,
            estimatedMinutes: activeTimer.estimatedMinutes,
            activeSeconds,
            pausedSeconds
          }
        : {
            topicId: selectedTopic?.id || '',
            topicTitle: selectedTopic?.title || '',
            category,
            difficulty,
            estimatedMinutes: selectedTopic?.estimatedMinutes || 60
          };
    setModalState({ mode, initialData: snapshot });
  };

  const handleModalSubmit = (payload) => {
    if (modalState?.mode === 'complete') {
      onCompleteTimer?.(payload);
    } else if (modalState?.mode === 'manual') {
      onLogManualSession?.(payload);
    }
    setModalState(null);
  };

  return (
    <>
      <div className="glass-v5-blue rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm ${
                isRunning
                  ? 'bg-blue-600 text-white shadow-blue-600/25'
                  : isPaused
                  ? 'bg-amber-500 text-white shadow-amber-500/25'
                  : 'bg-white border border-blue-100 text-blue-600'
              }`}
            >
              <Timer className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-900">مؤقت المذاكرة التكيفي</h2>
              <p className="text-[11px] text-slate-500">
                يحسب الزمن الفعلي بدقة (وقت التوقف مستبعد تلقائياً)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => openModal('manual')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold transition"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>تسجيل جلسة يدوية</span>
          </button>
        </div>

        {activeTimer ? (
          <div className="bg-white/90 rounded-2xl border border-blue-100 p-4 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      isRunning ? 'bg-blue-600 pulse-blue' : 'bg-amber-500'
                    }`}
                  />
                  <span className="text-[11px] font-bold text-slate-500">
                    {isRunning ? 'جارٍ التسجيل النشط' : 'متوقف مؤقتاً (الوقت النشط متجمد)'}
                  </span>
                </div>
                <div className="text-sm font-extrabold text-slate-900 truncate mt-0.5">
                  {activeTimer.topicTitle || 'جلسة مذاكرة'}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-left">
                  <div className="text-[10px] font-bold text-slate-400">الزمن النشط</div>
                  <div className="text-2xl font-black font-mono text-blue-700 tracking-tight">
                    {formatDuration(activeSeconds)}
                  </div>
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div className="text-left">
                  <div className="text-[10px] font-bold text-slate-400">وقت التوقف</div>
                  <div className="text-sm font-bold font-mono text-amber-600">
                    {formatDuration(pausedSeconds)}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {isRunning ? (
                <button
                  type="button"
                  onClick={() => onPauseTimer?.()}
                  className="flex-1 min-w-[120px] py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition"
                >
                  <Pause className="w-4 h-4" />
                  <span>إيقاف مؤقت</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onResumeTimer?.()}
                  className="flex-1 min-w-[120px] py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>استئناف</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => openModal('complete')}
                className="flex-1 min-w-[140px] py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>إنهاء وحفظ الجلسة</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white/90 rounded-2xl border border-blue-100 p-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
              <div className="sm:col-span-6">
                <label className="text-[11px] font-bold text-slate-500 block mb-1">
                  اختر الموضوع
                </label>
                <select
                  value={selectedTopicId}
                  onChange={(e) => handleTopicChange(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-none focus:bg-white focus:border-blue-500"
                >
                  {topics.length === 0 ? (
                    <option value="">جلسة مذاكرة حرة</option>
                  ) : (
                    topics.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.code ? `${t.code} — ` : ''}
                        {t.title}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div className="sm:col-span-3">
                <label className="text-[11px] font-bold text-slate-500 block mb-1">التصنيف</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-none focus:bg-white focus:border-blue-500"
                >
                  {STUDY_CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-3">
                <label className="text-[11px] font-bold text-slate-500 block mb-1">الصعوبة</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-none focus:bg-white focus:border-blue-500"
                >
                  {STUDY_DIFFICULTIES.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={handleStart}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm shadow-blue-600/25 transition"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>ابدأ المؤقت الآن</span>
              {selectedTopic?.estimatedMinutes && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/15 font-mono text-[10px]">
                  <Clock className="w-3 h-3" />
                  {selectedTopic.estimatedMinutes}m
                </span>
              )}
            </button>
          </div>
        )}
      </div>

      <SessionLogModal
        isOpen={Boolean(modalState)}
        mode={modalState?.mode || 'complete'}
        onClose={() => setModalState(null)}
        onSubmit={handleModalSubmit}
        topics={topics}
        initialData={modalState?.initialData}
      />
    </>
  );
}
