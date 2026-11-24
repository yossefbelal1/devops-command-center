import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Lock,
  Play,
  SlidersHorizontal,
  Star
} from 'lucide-react';
import {
  ROADMAP_META,
  ROADMAP_MODULES,
  POST_ROADMAP_BONUS_TRACK
} from '../data/roadmapData';
import {
  normalizeExecutionStatus,
  needsReview
} from '../services/storage';
import { computeAdaptiveForecast } from '../services/adaptiveForecast';
import { ProgressBar } from '../components/ui/ProgressBar';
import { StatusBadge } from '../components/ui/StatusBadge';
import { SlideOverDrawer } from '../components/roadmap/SlideOverDrawer';

export function RoadmapPage({ appState, forecast: forecastProp, actions }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedModuleId, setSelectedModuleId] = useState(searchParams.get('module'));
  const [drawerTopicId, setDrawerTopicId] = useState(searchParams.get('topic'));
  const [filter, setFilter] = useState('all');

  const forecast = useMemo(
    () =>
      forecastProp ||
      computeAdaptiveForecast({
        modules: ROADMAP_MODULES,
        progress: appState,
        targetWeeklyHours: appState.targetWeeklyHours || appState.weeklyStudyHours || 12,
        studySessions: appState.studySessions
      }),
    [forecastProp, appState]
  );

  useEffect(() => {
    const modParam = searchParams.get('module');
    const topicParam = searchParams.get('topic');
    if (modParam !== null) setSelectedModuleId(modParam);
    if (topicParam) {
      setDrawerTopicId(topicParam);
      if (!modParam) {
        const owner = ROADMAP_MODULES.find((m) =>
          (m.topics || []).some((t) => t.id === topicParam)
        );
        if (owner) setSelectedModuleId(owner.id);
      }
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
        remainingHours: modForecast?.remainingHours ?? 0,
        remainingMonths: modForecast?.remainingMonths ?? 0,
        isComplete: doneTopics === (mod.topics?.length || 0) && (mod.topics?.length || 0) > 0,
        isCurrent: mod.id === ROADMAP_META.currentModuleId
      };
    },
    [appState.subtasks, appState.topicProgress, appState.topicStatus, forecast]
  );

  const selectModule = (modId) => {
    setSelectedModuleId(modId);
    setDrawerTopicId(null);
    if (modId) setSearchParams({ module: modId });
    else setSearchParams({});
  };

  const openTopicDrawer = (modId, topicId) => {
    setDrawerTopicId(topicId);
    setSearchParams({ module: modId, topic: topicId });
  };

  const closeTopicDrawer = () => {
    setDrawerTopicId(null);
    if (selectedModuleId) setSearchParams({ module: selectedModuleId });
    else setSearchParams({});
  };

  const activeModule = useMemo(
    () =>
      selectedModuleId
        ? ROADMAP_MODULES.find((m) => m.id === selectedModuleId) || ROADMAP_MODULES[0]
        : null,
    [selectedModuleId]
  );

  const drawerContext = useMemo(() => {
    if (!drawerTopicId) return { topic: null, module: null };
    for (const mod of ROADMAP_MODULES) {
      const found = (mod.topics || []).find((t) => t.id === drawerTopicId);
      if (found) return { topic: found, module: mod };
    }
    return { topic: null, module: null };
  }, [drawerTopicId]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {activeModule ? (
        (() => {
          const modStats = getModuleSummary(activeModule);
          return (
            <div className="space-y-6">
              <div
                className={`bg-gradient-to-l ${activeModule.cardTheme} text-white rounded-3xl p-6 sm:p-8 shadow-lg space-y-4`}
              >
                <button
                  type="button"
                  onClick={() => selectModule(null)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-colors duration-150"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>العودة لجميع الموديولات</span>
                </button>

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

                  <div className="bg-slate-900/50 rounded-2xl p-4 min-w-[240px] space-y-2 border border-white/20">
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
                      {modStats.doneSubs}/{modStats.totalSubs} مهمة • متبقي {modStats.remainingHours} ساعة (~{modStats.remainingMonths} شهر)
                    </div>
                  </div>
                </div>
              </div>

              {/* Clean Topic Cards — click any card to open SlideOverDrawer */}
              <div className="space-y-3">
                {(activeModule.topics || []).map((topic) => {
                  const rec = appState.topicProgress?.[topic.id];
                  const execStatus = normalizeExecutionStatus(
                    rec?.executionStatus ?? appState.topicStatus?.[topic.id] ?? topic.defaultStatus
                  );
                  const masteryStatus =
                    rec?.masteryStatus ||
                    (execStatus === 'completed' ? 'practiced' : 'unverified');
                  const confidence = Number(rec?.confidence || 0);
                  const reviewDue = needsReview(rec);
                  const isTopicDone = execStatus === 'completed';

                  const subtasks = topic.subtasks || [];
                  const subDone = subtasks.filter((s) =>
                    appState.subtasks?.[s.id] !== undefined ? appState.subtasks[s.id] : s.done
                  ).length;

                  return (
                    <div
                      key={topic.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => openTopicDrawer(activeModule.id, topic.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          openTopicDrawer(activeModule.id, topic.id);
                        }
                      }}
                      className={`rounded-3xl p-5 border shadow-sm cursor-pointer transition-colors duration-150 hover:shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                        isTopicDone
                          ? 'bg-emerald-500/10 border-l-4 border-emerald-500 border-emerald-200 text-slate-900'
                          : 'bg-white border-slate-200 hover:border-blue-300'
                      }`}
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

                        <h2 className="text-base font-extrabold text-slate-900">{topic.title}</h2>
                        <p className="text-xs text-slate-600 line-clamp-1">{topic.whatYouDo}</p>
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

                        <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-sm">
                          <SlidersHorizontal className="w-3.5 h-3.5" />
                          <span>فتح التفاصيل</span>
                        </span>
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
                  {forecast.adaptiveExpectedHours} ساعة
                </strong>{' '}
                (~<strong className="font-mono text-emerald-700">{forecast.remainingMonths} شهر</strong>{' '}
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

                    {/* Quick Topic Chips opening SlideOverDrawer directly */}
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
                            onClick={() => openTopicDrawer(mod.id, t.id)}
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
                          : `متبقي ${stats.remainingHours} ساعة (~${stats.remainingMonths} شهر)`
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

      {/* Slide-Over Topic Drawer */}
      <SlideOverDrawer
        isOpen={Boolean(drawerContext.topic)}
        onClose={closeTopicDrawer}
        topic={drawerContext.topic}
        module={drawerContext.module}
        appState={appState}
        actions={actions}
      />
    </div>
  );
}
