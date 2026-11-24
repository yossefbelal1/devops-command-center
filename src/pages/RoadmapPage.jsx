import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Code2,
  ExternalLink,
  FileText,
  Layers,
  Lock,
  Play,
  RefreshCw,
  Save,
  Star,
  Target,
  Wrench
} from 'lucide-react';
import {
  ROADMAP_META,
  ROADMAP_MODULES,
  POST_ROADMAP_BONUS_TRACK
} from '../data/roadmapData';
import {
  normalizeExecutionStatus,
  needsReview,
  getDaysSinceReview
} from '../services/storage';
import { computeAdaptiveForecast } from '../services/adaptiveForecast';
import { ProgressBar } from '../components/ui/ProgressBar';
import { StatusBadge } from '../components/ui/StatusBadge';
import { TimelineStepList } from '../components/ui/TimelineStepList';

export function RoadmapPage({ appState, forecast: forecastProp, actions }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialModule = searchParams.get('module');
  const initialTopic = searchParams.get('topic');

  const [selectedModuleId, setSelectedModuleId] = useState(initialModule);
  const [openTopics, setOpenTopics] = useState(() => ({
    'm2-5': true,
    ...(initialTopic ? { [initialTopic]: true } : {})
  }));
  const [filter, setFilter] = useState('all');
  const [noteDrafts, setNoteDrafts] = useState({});
  const [noteSavedId, setNoteSavedId] = useState(null);

  const forecast = useMemo(
    () =>
      forecastProp ||
      computeAdaptiveForecast({
        modules: ROADMAP_MODULES,
        progress: appState,
        targetWeeklyHours: appState.targetWeeklyHours || appState.weeklyStudyHours || 7.5,
        studySessions: appState.studySessions
      }),
    [forecastProp, appState]
  );

  useEffect(() => {
    const modParam = searchParams.get('module');
    const topicParam = searchParams.get('topic');
    if (modParam !== null) setSelectedModuleId(modParam);
    if (topicParam) {
      setOpenTopics((prev) => ({ ...prev, [topicParam]: true }));
      if (!modParam) {
        const owner = ROADMAP_MODULES.find((m) =>
          (m.topics || []).some((t) => t.id === topicParam)
        );
        if (owner) setSelectedModuleId(owner.id);
      }
      setTimeout(() => {
        const el = document.getElementById(`roadmap-topic-${topicParam}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [searchParams]);

  const getModuleSummary = useMemo(
    () => (mod) => {
      let totalSubs = 0;
      let doneSubs = 0;
      let doneTopics = 0;

      (mod.topics || []).forEach((t) => {
        const rec = appState.topicProgress?.[t.id];
        const exec = normalizeExecutionStatus(
          rec?.executionStatus ?? appState.topicStatus?.[t.id] ?? t.defaultStatus
        );
        if (exec === 'completed') doneTopics++;

        (t.subtasks || []).forEach((s) => {
          totalSubs++;
          const isDone =
            appState.subtasks?.[s.id] !== undefined ? appState.subtasks[s.id] : s.done;
          if (isDone) doneSubs++;
        });
      });

      const pct = totalSubs > 0 ? Math.round((doneSubs / totalSubs) * 100) : 0;
      const modForecast = forecast.moduleBreakdown?.find((m) => m.id === mod.id);

      return {
        totalSubs,
        doneSubs,
        doneTopics,
        totalTopics: mod.topics?.length || 0,
        pct,
        remainingHours: Math.max(0, modForecast?.remainingHours ?? 0),
        remainingMonths: Math.max(0, modForecast?.remainingMonths ?? 0),
        isComplete: doneTopics === (mod.topics?.length || 0) && (mod.topics?.length || 0) > 0,
        isCurrent: mod.id === ROADMAP_META.currentModuleId
      };
    },
    [appState.subtasks, appState.topicProgress, appState.topicStatus, forecast]
  );

  const selectModule = (modId, focusTopicId = null) => {
    setSelectedModuleId(modId);
    if (modId && focusTopicId) {
      setOpenTopics((prev) => ({ ...prev, [focusTopicId]: true }));
      setSearchParams({ module: modId, topic: focusTopicId });
    } else if (modId) {
      setSearchParams({ module: modId });
    } else {
      setSearchParams({});
    }
    window.scrollTo(0, 0);
  };

  const toggleTopicAccordion = (topicId) => {
    setOpenTopics((prev) => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const handleSaveNote = (topicId, value) => {
    actions.saveTopicNote?.(topicId, value);
    setNoteSavedId(topicId);
    setTimeout(() => setNoteSavedId((cur) => (cur === topicId ? null : cur)), 1800);
  };

  const activeModuleIdx = useMemo(
    () =>
      selectedModuleId
        ? ROADMAP_MODULES.findIndex((m) => m.id === selectedModuleId)
        : -1,
    [selectedModuleId]
  );

  const activeModule =
    activeModuleIdx >= 0 ? ROADMAP_MODULES[activeModuleIdx] : null;
  const prevModule =
    activeModuleIdx > 0 ? ROADMAP_MODULES[activeModuleIdx - 1] : null;
  const nextModule =
    activeModuleIdx >= 0 && activeModuleIdx < ROADMAP_MODULES.length - 1
      ? ROADMAP_MODULES[activeModuleIdx + 1]
      : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {activeModule ? (
        (() => {
          const modStats = getModuleSummary(activeModule);
          return (
            <div className="space-y-6">
              {/* Module Header with Prev/Next & M1..M7 Quick Switcher */}
              <div
                className={`bg-gradient-to-l ${activeModule.cardTheme} text-white rounded-3xl p-6 sm:p-8 shadow-lg space-y-5`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => selectModule(null)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-colors duration-150"
                  >
                    <ArrowRight className="w-4 h-4" />
                    <span>العودة لجميع الموديولات</span>
                  </button>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      disabled={!prevModule}
                      onClick={() => prevModule && selectModule(prevModule.id)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 disabled:opacity-40 text-white text-xs font-bold transition-colors duration-150"
                    >
                      <span>→ الموديول السابق</span>
                    </button>

                    <button
                      type="button"
                      disabled={!nextModule}
                      onClick={() => nextModule && selectModule(nextModule.id)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-slate-900 hover:bg-blue-50 disabled:opacity-40 text-xs font-bold transition-colors duration-150"
                    >
                      <span>الموديول التالي ←</span>
                    </button>
                  </div>
                </div>

                {/* Quick M1..M7 Switcher Tabs */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {ROADMAP_MODULES.map((m) => {
                    const active = m.id === activeModule.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => selectModule(m.id)}
                        className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-colors duration-150 ${
                          active
                            ? 'bg-white text-slate-900 shadow-sm'
                            : 'bg-white/10 hover:bg-white/20 text-blue-100'
                        }`}
                      >
                        M{m.number}
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="text-xs font-mono text-blue-200 font-bold">
                      MODULE {activeModule.number} • {activeModule.monthRange} •{' '}
                      {activeModule.estimatedHours}h
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black">{activeModule.title}</h1>
                    <p className="text-xs sm:text-sm text-blue-100/90 max-w-2xl">
                      {activeModule.subtitle}
                    </p>
                  </div>

                  <div className="bg-slate-900/50 rounded-2xl p-4 min-w-[250px] space-y-2 border border-white/20">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span>إنجاز الموديول</span>
                      <span className="font-mono">{modStats.pct}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
                      <div
                        className="h-full bg-emerald-400 rounded-full transition-all duration-300"
                        style={{ width: `${modStats.pct}%` }}
                      />
                    </div>
                    <div className="text-[11px] font-mono text-blue-100">
                      {modStats.doneSubs}/{modStats.totalSubs} مهمة • متبقي{' '}
                      {modStats.remainingHours} ساعة (حوالي {modStats.remainingMonths} شهر)
                    </div>
                  </div>
                </div>
              </div>

              {/* Inline Accordion Topic Cards (NO modal popup!) */}
              <div className="space-y-4">
                {(activeModule.topics || []).map((topic) => {
                  const isOpen = Boolean(openTopics[topic.id]);
                  const rec = appState.topicProgress?.[topic.id];
                  const execStatus = normalizeExecutionStatus(
                    rec?.executionStatus ?? appState.topicStatus?.[topic.id] ?? topic.defaultStatus
                  );
                  const masteryStatus =
                    rec?.masteryStatus ||
                    (execStatus === 'completed' ? 'practiced' : 'unverified');
                  const confidence = Number(rec?.confidence || 0);
                  const reviewDue = needsReview(rec);
                  const daysSince = getDaysSinceReview(rec);
                  const isTopicDone = execStatus === 'completed';

                  const subtasks = topic.subtasks || [];
                  const subDone = subtasks.filter((s) =>
                    appState.subtasks?.[s.id] !== undefined ? appState.subtasks[s.id] : s.done
                  ).length;
                  const requiredTools =
                    topic.requiredTools && topic.requiredTools.length > 0
                      ? topic.requiredTools
                      : topic.tags || [];
                  const bestPracticesList = Array.isArray(topic.bestPractices)
                    ? topic.bestPractices
                    : topic.bestPractices
                    ? [topic.bestPractices]
                    : [];
                  const commonFailures = Array.isArray(topic.commonFailures)
                    ? topic.commonFailures
                    : [];

                  const savedNote = rec?.note ?? appState.topicNotes?.[topic.id] ?? '';
                  const noteVal =
                    noteDrafts[topic.id] !== undefined ? noteDrafts[topic.id] : savedNote;

                  return (
                    <div
                      id={`roadmap-topic-${topic.id}`}
                      key={topic.id}
                      className={`rounded-3xl border shadow-sm overflow-hidden transition-colors duration-150 ${
                        isTopicDone
                          ? 'bg-emerald-500/10 border-l-4 border-emerald-500 border-emerald-200 text-slate-900'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      {/* Topic Header Toggle */}
                      <div
                        role="button"
                        tabIndex={0}
                        aria-expanded={isOpen}
                        onClick={() => toggleTopicAccordion(topic.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            toggleTopicAccordion(topic.id);
                          }
                        }}
                        className="p-5 cursor-pointer hover:bg-slate-50/70 transition-colors duration-150 flex flex-col md:flex-row md:items-center justify-between gap-4 select-none"
                      >
                        <div className="space-y-2 min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 font-mono text-xs font-bold">
                              {topic.code}
                            </span>
                            <StatusBadge
                              status={execStatus}
                              type="execution"
                              needsReview={reviewDue}
                            />
                            <StatusBadge status={masteryStatus} type="mastery" />
                            {confidence > 0 && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-mono font-bold">
                                <Star className="w-3 h-3 fill-current" />
                                {confidence}/5
                              </span>
                            )}
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-500">
                              <Clock className="w-3 h-3" />
                              {topic.hours}h
                            </span>
                          </div>

                          <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                            {topic.title}
                          </h2>
                          <p className="text-xs text-slate-600 leading-relaxed">{topic.whatYouDo}</p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 shrink-0">
                          <div className="w-32">
                            <ProgressBar
                              value={subDone}
                              max={subtasks.length || 1}
                              sublabel={`${subDone}/${subtasks.length}`}
                              size="sm"
                            />
                          </div>

                          <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-sm">
                            <span>{isOpen ? 'إغلاق ▲' : 'عرض التفاصيل ▼'}</span>
                          </span>
                        </div>
                      </div>

                      {/* Smooth Inline Accordion Body */}
                      <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
                        <div className="accordion-inner">
                          {isOpen && (
                            <div className="p-5 sm:p-6 pt-4 border-t border-slate-200 bg-white space-y-6 text-xs">
                              {reviewDue && (
                                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex flex-wrap items-center justify-between gap-3">
                                  <span className="font-bold text-amber-900">
                                    مضى أكثر من 30 يوماً منذ آخر مراجعة — يوصى بمراجعة سريعة لتثبيت الإتقان.
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => actions.markTopicReviewed?.(topic.id)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors duration-150"
                                  >
                                    <RefreshCw className="w-3.5 h-3.5" />
                                    <span>
                                      تمت المراجعة
                                      {daysSince !== null ? ` (${daysSince} يوم)` : ''}
                                    </span>
                                  </button>
                                </div>
                              )}

                              {/* Section 1: الشرح والمفاهيم والـ Best Practices */}
                              <section className="space-y-3">
                                <div className="flex items-center gap-2 text-xs font-black text-blue-700">
                                  <span className="w-6 h-6 rounded-lg bg-blue-600 text-white font-mono text-[11px] flex items-center justify-center">
                                    1
                                  </span>
                                  <Target className="w-4 h-4" />
                                  <span>الشرح والمفاهيم والـ Best Practices</span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {topic.objectives?.length > 0 && (
                                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                                      <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                                        <Layers className="w-3.5 h-3.5 text-blue-600" />
                                        <span>الأهداف التعليمية</span>
                                      </div>
                                      <ul className="list-disc list-inside text-slate-700 space-y-1 leading-relaxed">
                                        {topic.objectives.map((obj, i) => (
                                          <li key={i}>{obj}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200/70 space-y-2">
                                    <div className="font-extrabold text-blue-900">
                                      أفضل الممارسات ومعيار الإتقان
                                    </div>
                                    {bestPracticesList.length > 0 && (
                                      <ul className="list-disc list-inside text-slate-800 space-y-1 leading-relaxed">
                                        {bestPracticesList.map((bp, i) => (
                                          <li key={i}>{bp}</li>
                                        ))}
                                      </ul>
                                    )}
                                    {topic.masteryCriteria && (
                                      <p className="text-slate-800 pt-1 border-t border-blue-200/70">
                                        <strong>معيار الإتقان: </strong>
                                        {topic.masteryCriteria}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </section>

                              {/* Section 2: الأدوات المطلوبة */}
                              <section className="space-y-2">
                                <div className="flex items-center gap-2 text-xs font-black text-indigo-700">
                                  <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-mono text-[11px] flex items-center justify-center">
                                    2
                                  </span>
                                  <Wrench className="w-4 h-4" />
                                  <span>الأدوات المطلوبة (Required Tools)</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                  {requiredTools.map((tool) => (
                                    <span
                                      key={tool}
                                      className="px-3 py-1 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 font-mono text-[11px] font-bold"
                                    >
                                      {tool}
                                    </span>
                                  ))}
                                </div>
                              </section>

                              {/* Section 3: Effort Breakdown + Numbered Vertical Timeline with per-step Hints */}
                              <section className="space-y-3">
                                <div className="flex items-center gap-2 text-xs font-black text-emerald-700">
                                  <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-mono text-[11px] flex items-center justify-center">
                                    3
                                  </span>
                                  <span>خطوات التنفيذ التفصيلية (Timeline + Hints)</span>
                                </div>

                                <TimelineStepList
                                  steps={subtasks}
                                  checkedMap={appState.subtasks}
                                  isStepChecked={(s) =>
                                    appState.subtasks?.[s.id] !== undefined
                                      ? Boolean(appState.subtasks[s.id])
                                      : Boolean(s.done)
                                  }
                                  onToggleStep={(s) => actions.toggleSubtask?.(topic, s.id)}
                                  effortBreakdown={topic.effortBreakdown}
                                  codePrefix={`${topic.code}.`}
                                />
                              </section>

                              {/* Section 4: أمثلة عملية وأوامر التحقق والتقييم */}
                              <section className="space-y-3">
                                <div className="flex items-center gap-2 text-xs font-black text-slate-900">
                                  <span className="w-6 h-6 rounded-lg bg-slate-900 text-white font-mono text-[11px] flex items-center justify-center">
                                    4
                                  </span>
                                  <Code2 className="w-4 h-4" />
                                  <span>أمثلة عملية، أخطاء شائعة، وتقييم الإتقان</span>
                                </div>

                                {topic.exampleCode && (
                                  <div className="p-4 rounded-2xl bg-[#0B192C] text-slate-100 space-y-1.5">
                                    <div className="text-[11px] font-mono font-bold text-blue-300">
                                      CLI / Code Verification Example
                                    </div>
                                    <pre className="text-[11px] font-mono leading-relaxed overflow-x-auto text-emerald-300 whitespace-pre-wrap">
                                      {topic.exampleCode}
                                    </pre>
                                  </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {topic.deliverable && (
                                    <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-950">
                                      <strong className="block mb-1">المخرج العملي (Deliverable):</strong>
                                      <span>{topic.deliverable}</span>
                                    </div>
                                  )}

                                  {commonFailures.length > 0 && (
                                    <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                                      <div className="font-extrabold text-amber-900 flex items-center gap-1.5">
                                        <AlertTriangle className="w-3.5 h-3.5" />
                                        <span>أخطاء شائعة (Common Failures)</span>
                                      </div>
                                      <ul className="list-disc list-inside text-slate-800 space-y-0.5">
                                        {commonFailures.map((cf) => (
                                          <li key={cf}>{cf}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>

                                {/* Two-level Execution, Mastery, Confidence 1-5 & Notes */}
                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                                  <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <select
                                        value={execStatus}
                                        onChange={(e) =>
                                          actions.setTopicExecution?.(topic.id, e.target.value)
                                        }
                                        className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800"
                                      >
                                        <option value="not_started">التنفيذ: لم يبدأ</option>
                                        <option value="in_progress">التنفيذ: قيد التنفيذ</option>
                                        <option value="completed">التنفيذ: مكتمل ✅</option>
                                      </select>

                                      <select
                                        value={masteryStatus}
                                        onChange={(e) =>
                                          actions.setTopicMastery?.(topic.id, e.target.value)
                                        }
                                        className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800"
                                      >
                                        <option value="unverified">الإتقان: غير مُختبر</option>
                                        <option value="practiced">الإتقان: تم التطبيق</option>
                                        <option value="mastered">الإتقان: متقن</option>
                                      </select>
                                    </div>

                                    <div className="flex items-center gap-1.5">
                                      <span className="text-[11px] font-bold text-slate-600 ml-1">
                                        الثقة (1–5):
                                      </span>
                                      {[1, 2, 3, 4, 5].map((lvl) => {
                                        const filled = confidence >= lvl;
                                        return (
                                          <button
                                            key={lvl}
                                            type="button"
                                            onClick={() =>
                                              actions.setTopicConfidence?.(topic.id, lvl)
                                            }
                                            className={`w-8 h-8 rounded-lg border text-xs font-mono font-bold flex items-center justify-center gap-0.5 transition-colors duration-150 ${
                                              confidence === lvl
                                                ? 'bg-blue-600 border-blue-600 text-white'
                                                : filled
                                                ? 'bg-blue-50 border-blue-200 text-blue-700'
                                                : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-100'
                                            }`}
                                          >
                                            <Star
                                              className={`w-3 h-3 ${filled ? 'fill-current' : ''}`}
                                            />
                                            <span>{lvl}</span>
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>

                                  <div className="flex flex-col sm:flex-row gap-2">
                                    <div className="relative flex-1">
                                      <FileText className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5" />
                                      <input
                                        type="text"
                                        value={noteVal}
                                        onChange={(e) =>
                                          setNoteDrafts((prev) => ({
                                            ...prev,
                                            [topic.id]: e.target.value
                                          }))
                                        }
                                        placeholder="ملاحظاتك الشخصية لهذا الموضوع..."
                                        className="w-full pr-8 pl-3 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none focus:border-blue-500"
                                      />
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => handleSaveNote(topic.id, noteVal)}
                                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-blue-700 text-white text-xs font-bold transition-colors duration-150 shrink-0"
                                    >
                                      <Save className="w-3.5 h-3.5" />
                                      <span>
                                        {noteSavedId === topic.id ? 'تم الحفظ ✓' : 'حفظ الملاحظة'}
                                      </span>
                                    </button>
                                  </div>
                                </div>
                              </section>

                              {/* Section 5: المصادر والفيديوهات المرتبطة */}
                              {topic.resources?.length > 0 && (
                                <section className="space-y-2.5">
                                  <div className="flex items-center gap-2 text-xs font-black text-violet-700">
                                    <span className="w-6 h-6 rounded-lg bg-violet-600 text-white font-mono text-[11px] flex items-center justify-center">
                                      5
                                    </span>
                                    <BookOpen className="w-4 h-4" />
                                    <span>
                                      المصادر والفيديوهات المرتبطة ({topic.resources.length})
                                    </span>
                                  </div>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                                    {topic.resources.map((res, rIdx) => (
                                      <a
                                        key={`${res.url}-${rIdx}`}
                                        href={res.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between gap-2 p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-colors duration-150"
                                      >
                                        <div className="min-w-0">
                                          <span className="inline-block px-2 py-0.5 rounded bg-white border border-slate-200 font-mono text-[10px] font-bold text-blue-700 mb-1">
                                            {res.type || 'Resource'}
                                          </span>
                                          <div className="text-xs font-bold text-slate-900 truncate">
                                            {res.label}
                                          </div>
                                        </div>
                                        <ExternalLink className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                                      </a>
                                    ))}
                                  </div>
                                </section>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()
      ) : (
        <>
          <div className="glass-v5-blue rounded-3xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-blue-600 font-bold">
                DYNAMIC DEVOPS ROADMAP • 7 MODULES
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                خارطة طريق DevOps التفاعلية
              </h1>
              <p className="text-xs sm:text-sm text-slate-600">
                متبقي إجمالاً{' '}
                <strong className="font-mono text-blue-700">
                  {Math.max(0, forecast.adaptiveExpectedHours)} ساعة
                </strong>{' '}
                (حوالي{' '}
                <strong className="font-mono text-emerald-700">
                  {Math.max(0, forecast.remainingMonths)} شهر
                </strong>{' '}
                • {forecast.expectedMonthRangeLabel})
              </p>
            </div>

            <div className="inline-flex bg-white p-1 rounded-2xl border border-slate-200 self-start">
              {[
                { id: 'all', label: 'الكل' },
                { id: 'active', label: 'قيد الدراسة' },
                { id: 'done', label: 'المكتمل' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors duration-150 ${
                    filter === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ROADMAP_MODULES.filter((mod) => {
              const s = getModuleSummary(mod);
              if (filter === 'done') return s.isComplete;
              if (filter === 'active') return !s.isComplete;
              return true;
            }).map((mod) => {
              const stats = getModuleSummary(mod);
              return (
                <div
                  key={mod.id}
                  className={`rounded-3xl p-6 transition-colors duration-150 hover:shadow-lg flex flex-col justify-between gap-4 ${
                    stats.isComplete
                      ? 'bg-emerald-500/10 border-l-4 border-emerald-500 text-slate-900'
                      : stats.isCurrent
                      ? 'glass-v5-blue ring-2 ring-blue-500/30'
                      : 'glass-v5'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-white font-mono text-xs font-bold">
                        Module {mod.number}
                      </span>
                      {stats.isComplete ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-900 text-[11px] font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>✅ مكتمل</span>
                        </span>
                      ) : stats.isCurrent ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[11px] font-bold">
                          تركيزك الحالي
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono text-slate-500">
                          {mod.monthRange}
                        </span>
                      )}
                    </div>

                    <div>
                      <h2 className="text-base font-extrabold text-slate-900">{mod.title}</h2>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mt-1">
                        {mod.subtitle}
                      </p>
                    </div>

                    {/* Quick Topic Chips opening module & inline topic */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {(mod.topics || []).map((t) => {
                        const exec = normalizeExecutionStatus(
                          appState.topicProgress?.[t.id]?.executionStatus ??
                            appState.topicStatus?.[t.id] ??
                            t.defaultStatus
                        );
                        const done = exec === 'completed';
                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => selectModule(mod.id, t.id)}
                            className={`px-2 py-1 rounded-lg text-[10.5px] font-mono font-bold border transition-colors duration-150 ${
                              done
                                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-900'
                                : exec === 'in_progress'
                                ? 'bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100'
                                : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300'
                            }`}
                            title={t.title}
                          >
                            {t.code} {done ? '✅' : ''}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <ProgressBar
                      value={stats.pct}
                      size="sm"
                      label={`${stats.doneSubs}/${stats.totalSubs} مهمة`}
                      sublabel={
                        stats.isComplete
                          ? `${mod.estimatedHours}h مكتملة`
                          : `متبقي ${stats.remainingHours} ساعة (حوالي ${stats.remainingMonths} شهر)`
                      }
                    />

                    <button
                      type="button"
                      onClick={() => selectModule(mod.id)}
                      className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors duration-150"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>فتح مواضيع الموديول ({mod.topics?.length || 0})</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Locked Bonus Track */}
      <section className="rounded-3xl bg-slate-900 text-slate-200 p-6 space-y-3">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
          <Lock className="w-4 h-4" />
          <span>{POST_ROADMAP_BONUS_TRACK.title}</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          {POST_ROADMAP_BONUS_TRACK.description}
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {POST_ROADMAP_BONUS_TRACK.courses.map((c) => (
            <span
              key={c.title}
              className="px-2.5 py-1 rounded-lg bg-white/10 text-[11px] font-mono text-slate-200"
            >
              {c.title}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
