import React, { useState, useEffect } from 'react';
import {
  X,
  Clock,
  Target,
  Award,
  ExternalLink,
  CheckCircle2,
  Star,
  RefreshCw,
  FileText,
  Save,
  BookOpen,
  Layers,
  Wrench,
  Terminal,
  ListChecks
} from 'lucide-react';
import { StatusBadge } from '../ui/StatusBadge';
import { ProgressBar } from '../ui/ProgressBar';
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
  actions = {}
}) {
  const [noteDraft, setNoteDraft] = useState('');
  const [noteSavedFeedback, setNoteSavedFeedback] = useState(false);

  const rec = topic ? appState.topicProgress?.[topic.id] : null;
  const savedNote = topic ? rec?.note ?? appState.topicNotes?.[topic.id] ?? '' : '';

  useEffect(() => {
    setNoteDraft(savedNote);
    setNoteSavedFeedback(false);
  }, [topic?.id, savedNote]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose?.();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

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

  const estMinutes = Number(topic.estimatedMinutes || (topic.hours || 1) * 60);
  const requiredTools =
    topic.requiredTools && topic.requiredTools.length > 0
      ? topic.requiredTools
      : topic.tags || [];
  const bestPracticesList = Array.isArray(topic.bestPractices)
    ? topic.bestPractices
    : topic.bestPractices
    ? [topic.bestPractices]
    : [];

  const handleSaveNote = () => {
    actions.saveTopicNote?.(topic.id, noteDraft);
    setNoteSavedFeedback(true);
    setTimeout(() => setNoteSavedFeedback(false), 1800);
  };

  const handleToggleCompleted = () => {
    const nextExec = execStatus === 'completed' ? 'in_progress' : 'completed';
    actions.setTopicExecution?.(topic.id, nextExec);
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6 bg-slate-950/80"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-topic-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl max-h-[88vh] flex flex-col rounded-2xl overflow-hidden bg-white shadow-xl border border-slate-200"
      >
        {/* Sticky Header */}
        <div className="shrink-0 bg-white border-b border-slate-200 px-4 sm:px-6 py-4 flex items-start justify-between gap-4">
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
              className="text-base sm:text-lg font-black text-slate-900 leading-snug"
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
            aria-label="إغلاق النافذة"
            className="min-h-[44px] min-w-[44px] rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors duration-150 shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body — Strict 5-Section Vertical Sequence */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-6 bg-[#F6F6F2]/60">
          {reviewDue && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-amber-900 font-bold">
                مضى أكثر من 30 يوماً منذ آخر مراجعة لهذا الموضوع — يوصى بمراجعة سريعة لتثبيت الإتقان.
              </div>
              <button
                type="button"
                onClick={() => actions.markTopicReviewed?.(topic.id)}
                className="min-h-[44px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors duration-150"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>تمت المراجعة</span>
              </button>
            </div>
          )}

          {/* SECTION 1 — الشرح والمفاهيم والـ Best Practices */}
          <section className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-extrabold text-blue-700">
              <span className="w-6 h-6 rounded-lg bg-blue-600 text-white font-mono text-[11px] flex items-center justify-center shrink-0">
                1
              </span>
              <Target className="w-4 h-4 shrink-0" />
              <span>الشرح والمفاهيم والـ Best Practices</span>
            </div>

            {topic.objectives?.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-[11px] font-extrabold text-slate-700">الأهداف التعليمية:</div>
                <ul className="space-y-1 text-xs text-slate-700 pr-5 list-disc">
                  {topic.objectives.map((obj, idx) => (
                    <li key={idx}>{obj}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {topic.whatYouDo && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="text-[11px] font-extrabold text-blue-700 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5" />
                    <span>المطلوب تنفيذه</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{topic.whatYouDo}</p>
                </div>
              )}

              {topic.masteryCriteria && (
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
                  <div className="text-[11px] font-extrabold text-blue-900 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>معيار الإتقان</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{topic.masteryCriteria}</p>
                </div>
              )}
            </div>

            {bestPracticesList.length > 0 && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                <div className="text-[11px] font-extrabold text-emerald-900">
                  أفضل الممارسات الهندسية (Best Practices):
                </div>
                <ul className="space-y-1 text-xs text-emerald-950 pr-4 list-disc">
                  {bestPracticesList.map((bp, i) => (
                    <li key={i}>{bp}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* SECTION 2 — الأدوات المطلوبة */}
          <section className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900">
              <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-mono text-[11px] flex items-center justify-center shrink-0">
                2
              </span>
              <Wrench className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>الأدوات المطلوبة</span>
            </div>

            {requiredTools.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {requiredTools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 font-mono text-xs font-semibold"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500">لا توجد أدوات خاصة مطلوبة لهذا الدرس.</p>
            )}
          </section>

          {/* SECTION 3 — خطوات التنفيذ التفصيلية (Connected Vertical Timeline) */}
          <section className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900">
                <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-mono text-[11px] flex items-center justify-center shrink-0">
                  3
                </span>
                <ListChecks className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>خطوات التنفيذ التفصيلية</span>
              </div>
              <span className="text-xs font-mono font-bold text-slate-600">
                {doneSubCount}/{subtasks.length}
              </span>
            </div>

            <ProgressBar value={subPct} size="sm" showPercentage={false} />

            <div className="relative space-y-3 pr-2">
              {subtasks.map((sub, idx) => {
                const isSubDone =
                  appState.subtasks?.[sub.id] !== undefined ? appState.subtasks[sub.id] : sub.done;
                const isLast = idx === subtasks.length - 1;

                return (
                  <div key={sub.id} className="relative flex items-stretch gap-3">
                    {/* Vertical timeline connector + numbered node */}
                    <div className="flex flex-col items-center shrink-0">
                      <span
                        className={`w-7 h-7 rounded-full font-mono text-xs font-black flex items-center justify-center border-2 transition-colors duration-150 ${
                          isSubDone
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'bg-white border-blue-500 text-blue-700'
                        }`}
                      >
                        {idx + 1}
                      </span>
                      {!isLast && (
                        <span
                          className={`w-0.5 flex-1 my-1 ${
                            isSubDone ? 'bg-emerald-400' : 'bg-slate-200'
                          }`}
                        />
                      )}
                    </div>

                    {/* Step Card (no strikethrough) */}
                    <div
                      onClick={() => actions.toggleSubtask?.(topic, sub.id)}
                      className={`flex-1 p-3 rounded-xl border cursor-pointer transition-colors duration-150 ${
                        isSubDone
                          ? 'bg-emerald-500/10 border-l-4 border-emerald-500 border-emerald-200 text-slate-900'
                          : 'bg-slate-50 border-slate-200 hover:border-blue-300 text-slate-900'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2.5 min-w-0">
                          <input
                            type="checkbox"
                            checked={isSubDone}
                            onChange={() => actions.toggleSubtask?.(topic, sub.id)}
                            onClick={(e) => e.stopPropagation()}
                            className="mt-0.5 w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer shrink-0"
                          />
                          <div className="min-w-0 space-y-1">
                            <div className="text-xs sm:text-sm font-bold text-slate-900">
                              {sub.text}
                            </div>
                            {sub.details && (
                              <p className="text-[11px] text-slate-600 leading-relaxed">
                                {sub.details}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {sub.estimatedHours && (
                            <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 font-mono text-[10px] font-bold text-slate-600">
                              {sub.estimatedHours}h
                            </span>
                          )}
                          {isSubDone && (
                            <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-900 text-[10px] font-bold whitespace-nowrap">
                              ✅ مكتمل
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* SECTION 4 — أمثلة عملية وأوامر التحقق والتقييم */}
          <section className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900">
              <span className="w-6 h-6 rounded-lg bg-slate-900 text-white font-mono text-[11px] flex items-center justify-center shrink-0">
                4
              </span>
              <Terminal className="w-4 h-4 text-slate-700 shrink-0" />
              <span>أمثلة عملية وأوامر التحقق والتقييم</span>
            </div>

            {topic.deliverable && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950">
                <span className="font-extrabold">المخرج العملي: </span>
                <span>{topic.deliverable}</span>
              </div>
            )}

            {topic.exampleCode && (
              <pre
                dir="ltr"
                className="p-3.5 rounded-xl bg-slate-950 text-emerald-300 font-mono text-[11px] overflow-x-auto leading-relaxed"
              >
                {topic.exampleCode}
              </pre>
            )}

            {/* Execution, Mastery & Confidence */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
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
                      className={`min-h-[44px] py-2 px-2 rounded-xl text-[11px] font-bold transition-colors duration-150 border ${
                        execStatus === opt.id
                          ? opt.id === 'completed'
                            ? 'bg-emerald-500/15 border-emerald-500 text-emerald-900'
                            : 'bg-blue-600 border-blue-600 text-white'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
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
                      className={`min-h-[44px] py-2 px-2 rounded-xl text-[11px] font-bold transition-colors duration-150 border ${
                        masteryStatus === opt.id
                          ? opt.id === 'mastered'
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'bg-indigo-600 border-indigo-600 text-white'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
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
                      className={`min-h-[44px] min-w-[44px] px-2.5 rounded-xl border text-xs font-mono font-bold flex items-center justify-center gap-0.5 transition-colors duration-150 ${
                        confidence === lvl
                          ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                          : filled
                          ? 'bg-blue-50 border-blue-200 text-blue-700'
                          : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      <Star className={`w-3 h-3 ${filled ? 'fill-current' : ''}`} />
                      <span>{lvl}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Personal Notes */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
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
            </div>
          </section>

          {/* SECTION 5 — المصادر والفيديوهات المرتبطة */}
          <section className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900">
              <span className="w-6 h-6 rounded-lg bg-amber-500 text-white font-mono text-[11px] flex items-center justify-center shrink-0">
                5
              </span>
              <BookOpen className="w-4 h-4 text-amber-600 shrink-0" />
              <span>المصادر والفيديوهات المرتبطة ({topic.resources?.length || 0})</span>
            </div>

            {topic.resources?.length > 0 ? (
              <div className="space-y-2">
                {topic.resources.map((res, idx) => (
                  <a
                    key={`${res.url}-${idx}`}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 transition-colors duration-150 group"
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
            ) : (
              <p className="text-xs text-slate-500">لا توجد روابط مسجلة لهذا الموضوع.</p>
            )}
          </section>
        </div>

        {/* Sticky Footer */}
        <div className="shrink-0 px-4 sm:px-6 py-3.5 border-t border-slate-200 bg-white flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSaveNote}
              className="min-h-[44px] inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors duration-150"
            >
              <Save className="w-3.5 h-3.5" />
              <span>حفظ</span>
            </button>

            <button
              type="button"
              onClick={handleToggleCompleted}
              className={`min-h-[44px] inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition-colors duration-150 ${
                execStatus === 'completed'
                  ? 'bg-emerald-500/15 border-emerald-500 text-emerald-900'
                  : 'bg-emerald-600 hover:bg-emerald-700 border-emerald-600 text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{execStatus === 'completed' ? '✅ مكتمل' : 'تعليم كمكتمل'}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors duration-150"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}
