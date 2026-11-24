import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Clock,
  Target,
  Award,
  ExternalLink,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  PlusCircle,
  Star,
  RefreshCw,
  FileText,
  Save,
  BookOpen,
  Layers
} from 'lucide-react';
import { StatusBadge, CompletedItemCard } from '../ui/StatusBadge';
import { ProgressBar } from '../ui/ProgressBar';
import { SessionLogModal } from '../timer/SessionLogModal';
import {
  normalizeCategory,
  normalizeDifficulty,
  getTimerDurations,
  formatDuration
} from '../timer/timerUtils';
import {
  normalizeExecutionStatus,
  needsReview,
  getDaysSinceReview
} from '../../services/storage';

export function SlideOverDrawer({
  isOpen,
  onClose,
  topic,
  module,
  appState = {},
  activeTimer = null,
  actions = {}
}) {
  const [noteDraft, setNoteDraft] = useState('');
  const [noteSavedFeedback, setNoteSavedFeedback] = useState(false);
  const [manualModalOpen, setManualModalOpen] = useState(false);
  const [completeModalOpen, setCompleteModalOpen] = useState(false);
  const [nowMs, setNowMs] = useState(() => Date.now());

  const rec = topic ? appState.topicProgress?.[topic.id] : null;
  const savedNote = topic ? rec?.note ?? appState.topicNotes?.[topic.id] ?? '' : '';

  useEffect(() => {
    setNoteDraft(savedNote);
    setNoteSavedFeedback(false);
  }, [topic?.id, savedNote]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && !manualModalOpen && !completeModalOpen) {
        e.preventDefault();
        onClose?.();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose, manualModalOpen, completeModalOpen]);

  const isThisTopicTimer = Boolean(activeTimer && topic && activeTimer.topicId === topic.id);

  useEffect(() => {
    if (!isOpen || !isThisTopicTimer) return;
    setNowMs(Date.now());
    const id = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(id);
  }, [isOpen, isThisTopicTimer]);

  const timerInfo = useMemo(
    () => getTimerDurations(isThisTopicTimer ? activeTimer : null, nowMs),
    [isThisTopicTimer, activeTimer, nowMs]
  );

  if (!isOpen || !topic) return null;

  const execStatus = normalizeExecutionStatus(
    rec?.executionStatus ?? appState.topicStatus?.[topic.id] ?? topic.defaultStatus
  );
  const masteryStatus =
    rec?.masteryStatus || (execStatus === 'completed' ? 'practiced' : 'unverified');
  const confidence = Number(rec?.confidence || 0);
  const reviewDue = needsReview(rec);
  const daysSince = getDaysSinceReview(rec);

  const subtasks = topic.subtasks || [];
  const doneSubCount = subtasks.filter((s) =>
    appState.subtasks?.[s.id] !== undefined ? appState.subtasks[s.id] : s.done
  ).length;
  const subPct = subtasks.length > 0 ? Math.round((doneSubCount / subtasks.length) * 100) : 0;

  const normalizedCat = normalizeCategory(topic.category);
  const normalizedDiff = normalizeDifficulty(topic.difficulty);
  const estMinutes = Number(topic.estimatedMinutes || (topic.hours || 1) * 60);

  const handleSaveNote = () => {
    actions.saveTopicNote?.(topic.id, noteDraft);
    setNoteSavedFeedback(true);
    setTimeout(() => setNoteSavedFeedback(false), 1800);
  };

  const handleStartTopicTimer = () => {
    actions.startTimer?.({
      topicId: topic.id,
      topicTitle: `${topic.code ? `${topic.code} — ` : ''}${topic.title}`,
      category: normalizedCat,
      difficulty: normalizedDiff,
      estimatedMinutes: estMinutes
    });
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex justify-end bg-slate-900/45 backdrop-blur-sm transition-opacity"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-topic-title"
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl h-full bg-[#F6F6F2] shadow-2xl border-r border-slate-200 flex flex-col overflow-hidden animate-in"
      >
        {/* Sticky Drawer Header */}
        <div className="bg-white/90 backdrop-blur-xl border-b border-slate-200 px-5 sm:px-6 py-4 flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1.5 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              {module && (
                <span className="px-2.5 py-0.5 rounded-md bg-slate-900 text-white font-mono text-[11px] font-bold">
                  Module {module.number}
                </span>
              )}
              <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 font-mono text-xs font-bold">
                {topic.code}
              </span>
              <StatusBadge status={execStatus} type="execution" needsReview={reviewDue} />
              <StatusBadge status={masteryStatus} type="mastery" />
            </div>

            <h2
              id="drawer-topic-title"
              className="text-lg sm:text-xl font-black text-slate-900 leading-snug"
            >
              {topic.title}
            </h2>

            <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 font-semibold">
              <span className="inline-flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                {topic.hours}h ({estMinutes}m)
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                {topic.category}
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                {topic.difficulty}
              </span>
              {daysSince !== null && (
                <span className="font-mono text-slate-500">آخر مراجعة: منذ {daysSince} يوم</span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق اللوحة الجانبية"
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* 30-day review alert */}
          {reviewDue && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-amber-900 font-bold">
                مضى أكثر من 30 يوماً منذ آخر مراجعة لهذا الموضوع — يوصى بمراجعة سريعة لتثبيت الإتقان.
              </div>
              <button
                type="button"
                onClick={() => actions.markTopicReviewed?.(topic.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>تمت المراجعة</span>
              </button>
            </div>
          )}

          {/* Execution, Mastery & Confidence Controls */}
          <div className="glass-v5 rounded-2xl p-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-600 block">
                  حالة التنفيذ (Execution)
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'not_started', label: 'لم يبدأ' },
                    { id: 'in_progress', label: 'قيد التنفيذ' },
                    { id: 'completed', label: '✅ مكتمل' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => actions.setTopicExecution?.(topic.id, opt.id)}
                      className={`py-2 px-2 rounded-xl text-[11px] font-bold transition border ${
                        execStatus === opt.id
                          ? opt.id === 'completed'
                            ? 'bg-emerald-500/15 border-emerald-500 text-emerald-900'
                            : 'bg-blue-600 border-blue-600 text-white'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-600 block">
                  مستوى الإتقان (Mastery)
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'unverified', label: 'غير مُختبر' },
                    { id: 'practiced', label: 'تم التطبيق' },
                    { id: 'mastered', label: 'متقن' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => actions.setTopicMastery?.(topic.id, opt.id)}
                      className={`py-2 px-2 rounded-xl text-[11px] font-bold transition border ${
                        masteryStatus === opt.id
                          ? opt.id === 'mastered'
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'bg-indigo-600 border-indigo-600 text-white'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Confidence 1-5 */}
            <div className="pt-2 border-t border-slate-200/70 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-slate-800">مستوى الثقة (1 – 5)</div>
                <div className="text-[11px] text-slate-500">
                  تقييم ثقتك في التطبيق العملي وأسئلة المقابلة
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((lvl) => {
                  const filled = confidence >= lvl;
                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => actions.setTopicConfidence?.(topic.id, lvl)}
                      aria-label={`مستوى الثقة ${lvl} من 5`}
                      className={`w-9 h-9 rounded-xl border text-xs font-mono font-bold flex items-center justify-center gap-0.5 transition ${
                        confidence === lvl
                          ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                          : filled
                          ? 'bg-blue-50 border-blue-200 text-blue-700'
                          : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      <Star className={`w-3 h-3 ${filled ? 'fill-current' : ''}`} />
                      <span>{lvl}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Inline Topic Study Timer */}
          <div className="glass-v5-blue rounded-2xl p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-extrabold text-slate-900">
                  مؤقت المذاكرة لهذا الموضوع
                </span>
              </div>
              <button
                type="button"
                onClick={() => setManualModalOpen(true)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white hover:bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-bold transition"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>تسجيل جلسة يدوية</span>
              </button>
            </div>

            {isThisTopicTimer ? (
              <div className="bg-white/90 rounded-xl border border-blue-100 p-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      timerInfo.isRunning ? 'bg-blue-600 pulse-blue' : 'bg-amber-500'
                    }`}
                  />
                  <div>
                    <div className="text-lg font-black font-mono text-blue-700 leading-none">
                      {formatDuration(timerInfo.activeSeconds)}
                    </div>
                    <div className="text-[10px] font-mono text-amber-600 mt-1">
                      توقف: {formatDuration(timerInfo.pausedSeconds)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {timerInfo.isRunning ? (
                    <button
                      type="button"
                      onClick={() => actions.pauseTimer?.()}
                      className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1 transition"
                    >
                      <Pause className="w-3.5 h-3.5" />
                      <span>إيقاف مؤقت</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => actions.resumeTimer?.()}
                      className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1 transition"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>استئناف</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setCompleteModalOpen(true)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 transition"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>إنهاء</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap items-center justify-between gap-3">
                {activeTimer ? (
                  <p className="text-[11px] text-amber-800 font-semibold">
                    يوجد مؤقت نشط لموضوع آخر ({activeTimer.topicTitle}).
                  </p>
                ) : (
                  <p className="text-[11px] text-slate-600">
                    ابدأ حساب الزمن الفعلي لهذا الموضوع مباشرة مع فصل وقت التوقف.
                  </p>
                )}

                {!activeTimer && (
                  <button
                    type="button"
                    onClick={handleStartTopicTimer}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm shadow-blue-600/20 transition"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>ابدأ المؤقت لهذا الموضوع</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Learning Objectives, What You Do, Mastery Criteria */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
            {topic.objectives?.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span>الأهداف التعليمية</span>
                </div>
                <ul className="space-y-1 text-xs text-slate-700 pr-4 list-disc">
                  {topic.objectives.map((obj, idx) => (
                    <li key={idx}>{obj}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {topic.whatYouDo && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                  <div className="text-[11px] font-extrabold text-blue-700 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5" />
                    <span>المطلوب تنفيذه</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{topic.whatYouDo}</p>
                </div>
              )}

              {topic.masteryCriteria && (
                <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/70 space-y-1">
                  <div className="text-[11px] font-extrabold text-blue-900 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>معيار الإتقان</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{topic.masteryCriteria}</p>
                </div>
              )}
            </div>

            {topic.deliverable && (
              <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/70 text-xs text-emerald-950">
                <span className="font-extrabold">المخرج العملي: </span>
                <span>{topic.deliverable}</span>
              </div>
            )}
          </div>

          {/* Subtasks Checklist (ZERO strikethrough) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
            <ProgressBar
              value={subPct}
              label="المهام الفرعية"
              sublabel={`${doneSubCount}/${subtasks.length} مكتمل`}
              size="sm"
            />
            <div className="space-y-2">
              {subtasks.map((sub, idx) => {
                const isSubDone =
                  appState.subtasks?.[sub.id] !== undefined ? appState.subtasks[sub.id] : sub.done;

                return (
                  <CompletedItemCard
                    key={sub.id}
                    completed={isSubDone}
                    className="p-3 cursor-pointer hover:border-blue-300"
                    onClick={() => actions.toggleSubtask?.(topic, sub.id)}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isSubDone}
                        onChange={() => actions.toggleSubtask?.(topic, sub.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer shrink-0"
                      />
                      <span className="text-[11px] font-mono text-slate-500 shrink-0">
                        {topic.code}.{idx + 1}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-slate-900">
                        {sub.text}
                      </span>
                    </div>
                  </CompletedItemCard>
                );
              })}
            </div>
          </div>

          {/* Curated Resources */}
          {topic.resources?.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2.5">
              <div className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>المصادر والروابط المعتمدة ({topic.resources.length})</span>
              </div>
              <div className="space-y-2">
                {topic.resources.map((res, idx) => (
                  <a
                    key={`${res.url}-${idx}`}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200/80 hover:border-blue-200 transition group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-mono font-bold text-blue-700 shrink-0">
                        {res.type || 'Resource'}
                      </span>
                      <span className="text-xs font-bold text-slate-800 group-hover:text-blue-700 truncate">
                        {res.label}
                      </span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Persistent Personal Notes */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>ملاحظاتك الشخصية لهذا الموضوع</span>
              </label>
              {noteSavedFeedback && (
                <span className="text-[11px] font-bold text-emerald-700">تم الحفظ ✓</span>
              )}
            </div>
            <textarea
              rows={3}
              value={noteDraft}
              onChange={(e) => setNoteDraft(e.target.value)}
              onBlur={() => actions.saveTopicNote?.(topic.id, noteDraft)}
              placeholder="دوّن الأوامر المهمة، نقاط القوة، أو ما واجهته في اللاب..."
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500"
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSaveNote}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition"
              >
                <Save className="w-3.5 h-3.5" />
                <span>حفظ الملاحظة</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      <SessionLogModal
        isOpen={manualModalOpen}
        mode="manual"
        onClose={() => setManualModalOpen(false)}
        onSubmit={(payload) => {
          actions.logManualSession?.(payload);
          setManualModalOpen(false);
        }}
        topics={[topic]}
        initialData={{
          topicId: topic.id,
          topicTitle: `${topic.code ? `${topic.code} — ` : ''}${topic.title}`,
          category: normalizedCat,
          difficulty: normalizedDiff,
          estimatedMinutes: estMinutes
        }}
      />

      <SessionLogModal
        isOpen={completeModalOpen}
        mode="complete"
        onClose={() => setCompleteModalOpen(false)}
        onSubmit={(payload) => {
          actions.completeTimer?.(payload);
          setCompleteModalOpen(false);
        }}
        topics={[topic]}
        initialData={{
          topicId: topic.id,
          topicTitle: `${topic.code ? `${topic.code} — ` : ''}${topic.title}`,
          category: normalizedCat,
          difficulty: normalizedDiff,
          estimatedMinutes: estMinutes,
          activeSeconds: timerInfo.activeSeconds,
          pausedSeconds: timerInfo.pausedSeconds
        }}
      />
    </div>
  );
}
