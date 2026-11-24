import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  DollarSign,
  FolderGit2,
  Info,
  Layers,
  ShieldCheck,
  Target,
  Wrench,
  Clock
} from 'lucide-react';
import {
  CAREER_BENCHMARK_NOTE,
  CAREER_EVOLUTION_STAGES,
  SALARY_BENCHMARKS,
  APPLICATION_READINESS_TIMELINE
} from '../data/careerData';
import { ROADMAP_MODULES } from '../data/roadmapData';
import { normalizeExecutionStatus } from '../services/storage';
import { ProgressBar } from '../components/ui/ProgressBar';
import { CompletedItemCard } from '../components/ui/StatusBadge';

export function CareerPage({ appState }) {
  const [openStages, setOpenStages] = useState({ 'stage-1': true });

  const topicLookup = useMemo(() => {
    const map = {};
    ROADMAP_MODULES.forEach((mod) => {
      (mod.topics || []).forEach((t) => {
        map[t.id] = { topic: t, module: mod };
      });
    });
    return map;
  }, []);

  const isTopicCompleted = (topicId) => {
    const entry = topicLookup[topicId];
    if (!entry) return false;
    const { topic } = entry;
    const exec = normalizeExecutionStatus(
      appState.topicProgress?.[topicId]?.executionStatus ??
        appState.topicStatus?.[topicId] ??
        topic.defaultStatus
    );
    if (exec === 'completed') return true;
    return (topic.subtasks || []).every((s) =>
      appState.subtasks?.[s.id] !== undefined ? appState.subtasks[s.id] : s.done
    );
  };

  const getModulesProgressPct = (moduleIds = []) => {
    let totalSubs = 0;
    let doneSubs = 0;
    moduleIds.forEach((modId) => {
      const mod = ROADMAP_MODULES.find((m) => m.id === modId);
      if (!mod) return;
      (mod.topics || []).forEach((t) => {
        (t.subtasks || []).forEach((s) => {
          totalSubs++;
          const done =
            appState.subtasks?.[s.id] !== undefined ? appState.subtasks[s.id] : s.done;
          if (done) doneSubs++;
        });
      });
    });
    return {
      doneSubs,
      totalSubs,
      pct: totalSubs > 0 ? Math.round((doneSubs / totalSubs) * 100) : 0
    };
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Indicative Benchmark Disclaimer */}
      <section className="glass-v5-blue rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-blue-600 font-bold">
            <Briefcase className="w-3.5 h-3.5" />
            <span>CAREER PATH EVOLUTION &amp; INDICATIVE MARKET BENCHMARKS</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            مسار التطور المهني وتقديرات السوق (2026–2027)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            خط زمني من Junior DevOps حتى Platform / AI Infrastructure Architect، مرتبط بمهارات المسار وخطة التقديم الواقعية.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/90 border border-blue-200 flex items-start gap-2.5 text-xs text-slate-700">
          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <span>{CAREER_BENCHMARK_NOTE}</span>
        </div>
      </section>

      {/* Vertical Career Progression Timeline (0-2 yrs -> 10+ yrs) */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-black text-slate-900">
            التدرج الوظيفي (0–2 سنوات ← 10+ سنوات)
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                const all = {};
                CAREER_EVOLUTION_STAGES.forEach((s) => {
                  all[s.id] = true;
                });
                setOpenStages(all);
              }}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              فتح الكل
            </button>
            <button
              type="button"
              onClick={() => setOpenStages({ 'stage-1': true })}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              طي المستقبلية
            </button>
          </div>
        </div>

        <div className="relative space-y-4 md:pr-9 md:before:content-[''] md:before:absolute md:before:right-3.5 md:before:top-6 md:before:bottom-6 md:before:w-[2px] md:before:bg-slate-200">
          {CAREER_EVOLUTION_STAGES.map((stage, idx) => {
            const isOpen = !!openStages[stage.id];
            const gapItems = stage.skillsGapCheck || [];
            const gapDoneCount = gapItems.filter((sg) => isTopicCompleted(sg.topicId)).length;

            // STRICT RULE: Never mark future career stages (2+ yrs) as complete from tool familiarity alone.
            const statusBadgeClass = stage.isCurrentTarget
              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-900'
              : 'bg-slate-100 border-slate-200 text-slate-700';

            return (
              <div key={stage.id} className="relative">
                {/* Timeline node */}
                <div
                  className={`hidden md:flex absolute -right-[33px] top-6 w-7 h-7 rounded-full items-center justify-center font-mono text-xs font-bold z-10 ring-4 ${
                    stage.isCurrentTarget
                      ? 'bg-blue-600 text-white ring-blue-100'
                      : 'bg-white border-2 border-slate-300 text-slate-600 ring-slate-100'
                  }`}
                >
                  {idx + 1}
                </div>

                <div
                  className={`bg-white rounded-3xl border shadow-sm overflow-hidden transition ${
                    stage.isCurrentTarget
                      ? 'border-blue-300 ring-1 ring-blue-500/20'
                      : 'border-slate-200/90'
                  }`}
                >
                  <div
                    onClick={() =>
                      setOpenStages((prev) => ({ ...prev, [stage.id]: !prev[stage.id] }))
                    }
                    className="p-5 cursor-pointer hover:bg-slate-50/70 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none"
                  >
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-mono text-[11px] font-bold">
                          {stage.years}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold">
                          {stage.scopeBadge}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[11px] font-bold ${statusBadgeClass}`}
                        >
                          {stage.isCurrentTarget ? (
                            <Target className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Clock className="w-3 h-3 text-slate-500" />
                          )}
                          <span>{stage.isCurrentTarget ? 'الهدف الحالي' : 'مرحلة مستقبلية'}</span>
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                        {stage.role}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {gapItems.length > 0 && (
                        <span className="px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] font-bold text-slate-700">
                          أدوات المسار: {gapDoneCount}/{gapItems.length}
                        </span>
                      )}
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-blue-600' : ''
                        }`}
                      />
                    </div>
                  </div>

                  <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
                    <div className="accordion-inner">
                      <div className="p-5 pt-3 border-t border-slate-100 space-y-4 text-xs sm:text-sm">
                        {/* 1. User Status & 2. Role Scope */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div
                            className={`p-4 rounded-2xl border space-y-1 ${
                              stage.isCurrentTarget
                                ? 'bg-emerald-500/10 border-emerald-500/30'
                                : 'bg-slate-50 border-slate-200/80'
                            }`}
                          >
                            <div className="text-[11px] font-extrabold text-slate-900">
                              حالة المستخدم الحالية (User Status)
                            </div>
                            <p className="text-xs font-bold text-slate-800">{stage.userStatus}</p>
                          </div>

                          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-1">
                            <div className="text-[11px] font-extrabold text-blue-900 flex items-center gap-1.5">
                              <Layers className="w-3.5 h-3.5" />
                              <span>نطاق الدور (Role Scope)</span>
                            </div>
                            <p className="text-xs text-slate-800 leading-relaxed">
                              {stage.roleScope}
                            </p>
                          </div>
                        </div>

                        {/* 3. Responsibilities & 4. Production Expectations */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                            <strong className="text-xs font-extrabold text-slate-900 block">
                              المسؤوليات (Responsibilities)
                            </strong>
                            <ul className="list-disc list-inside text-xs text-slate-700 space-y-1 leading-relaxed">
                              {stage.responsibilities.map((r) => (
                                <li key={r}>{r}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3">
                            <div className="space-y-1">
                              <strong className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                                <span>توقعات الإنتاج (Production Expectations)</span>
                              </strong>
                              <p className="text-xs text-slate-700 leading-relaxed">
                                {stage.productionExpectations}
                              </p>
                            </div>

                            <div className="space-y-1 pt-2 border-t border-slate-200/60">
                              <strong className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                                <FolderGit2 className="w-3.5 h-3.5 text-blue-600" />
                                <span>المشاريع العملية (Practical Projects)</span>
                              </strong>
                              <div className="flex flex-wrap gap-1.5">
                                {stage.practicalProjects.map((proj) => (
                                  <span
                                    key={proj}
                                    className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-bold text-slate-800"
                                  >
                                    {proj}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 5. Required Skills & 6. Tools */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-2">
                            <strong className="text-xs font-extrabold text-indigo-900 block">
                              المهارات المطلوبة (Required Skills)
                            </strong>
                            <div className="flex flex-wrap gap-1.5">
                              {stage.requiredSkills.map((sk) => (
                                <span
                                  key={sk}
                                  className="px-2.5 py-1 rounded-lg bg-white border border-indigo-100 text-[11px] font-bold text-slate-800"
                                >
                                  {sk}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-2">
                            <strong className="text-xs font-extrabold text-blue-900 flex items-center gap-1.5">
                              <Wrench className="w-3.5 h-3.5" />
                              <span>الأدوات (Tools)</span>
                            </strong>
                            <div className="flex flex-wrap gap-1.5">
                              {stage.tools.map((t) => (
                                <span
                                  key={t}
                                  className="px-2.5 py-1 rounded-lg bg-white border border-blue-100 font-mono text-[11px] text-slate-800"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* 7. User Skills Gap (linked to roadmap topics) */}
                        <div className="space-y-2">
                          <strong className="text-xs font-extrabold text-slate-900 block">
                            فجوة المهارات المرتبطة بخارطة الطريق (User Skills Gap)
                          </strong>
                          {gapItems.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {gapItems.map((sg) => {
                                const done = isTopicCompleted(sg.topicId);
                                const linked = topicLookup[sg.topicId];
                                const targetHref = linked
                                  ? `/roadmap?module=${encodeURIComponent(
                                      linked.module.id
                                    )}&topic=${encodeURIComponent(sg.topicId)}`
                                  : '/roadmap';

                                return (
                                  <Link key={sg.id} to={targetHref} className="block group">
                                    <CompletedItemCard
                                      completed={done}
                                      className="p-3 group-hover:border-blue-300"
                                    >
                                      <span className="flex items-center justify-between gap-2 text-xs font-bold">
                                        <span className="flex items-center gap-2 min-w-0">
                                          <CheckCircle2
                                            className={`w-4 h-4 shrink-0 ${
                                              done ? 'text-emerald-600' : 'text-slate-300'
                                            }`}
                                          />
                                          <span className="truncate">{sg.label}</span>
                                        </span>
                                        <span className="text-[10px] font-mono text-blue-600 shrink-0">
                                          {linked?.topic?.code || sg.topicId}
                                        </span>
                                      </span>
                                    </CompletedItemCard>
                                  </Link>
                                );
                              })}
                            </div>
                          ) : (
                            <p className="text-xs text-slate-600 bg-slate-50 border border-slate-200/70 rounded-xl p-3">
                              {stage.skillsGapNote ||
                                'تعتمد هذه المرحلة على الخبرة الإنتاجية والمعمارية التراكمية بعد إتمام المسار الأساسي و Bonus Track.'}
                            </p>
                          )}
                        </div>

                        {/* 8. Readiness Checklist */}
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                          <strong className="text-xs font-extrabold text-slate-900 block">
                            قائمة الجاهزية (Readiness Checklist)
                          </strong>
                          <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                            {(stage.readinessChecklist || []).map((rc) => (
                              <li key={rc}>{rc}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Application Readiness Milestone Timeline mapped to Roadmap Progress */}
      <section className="glass-v5 rounded-3xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <CalendarClock className="w-5 h-5 text-blue-600" />
          <div>
            <h2 className="text-base font-extrabold text-slate-900">
              خطة التقديم المرحلية للسوق (Application Readiness Timeline)
            </h2>
            <p className="text-[11px] text-slate-500">
              مربوطة مباشرة بنسبة إنجازك الفعلي في موديولات الخارطة
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {APPLICATION_READINESS_TIMELINE.map((item) => {
            const prog = getModulesProgressPct(item.moduleIds || []);
            const ready = prog.pct >= 100;

            return (
              <div
                key={item.id || item.phase}
                className={`p-4 rounded-2xl border space-y-2.5 ${
                  ready
                    ? 'bg-emerald-500/10 border-l-4 border-emerald-500 border-emerald-200'
                    : 'bg-white border-slate-200/80'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="text-[11px] font-mono font-bold text-blue-700">
                    {item.phase}
                  </div>
                  {ready && (
                    <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-900 text-[10px] font-bold shrink-0">
                      ✅ مكتمل
                    </span>
                  )}
                </div>
                <div className="text-sm font-extrabold text-slate-900">{item.status}</div>
                <p className="text-xs text-slate-600 leading-relaxed">{item.details}</p>
                <ProgressBar
                  value={prog.pct}
                  size="sm"
                  label="جاهزية الموديولات المرتبطة"
                  sublabel={`${prog.doneSubs}/${prog.totalSubs} مهمة`}
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* Egypt & Remote Compensation Benchmarks */}
      <section className="glass-v5 rounded-3xl p-6 space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <DollarSign className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base font-extrabold text-slate-900">
                  مؤشرات الرواتب في مصر والعمل عن بُعد
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-[10px] font-mono font-bold">
                  {SALARY_BENCHMARKS.badge}
                </span>
              </div>
              <p className="text-[11px] text-slate-600">{SALARY_BENCHMARKS.disclaimer}</p>
              <p className="text-[11px] text-slate-500">{SALARY_BENCHMARKS.sourceNote}</p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-xl bg-slate-100 border border-slate-200 font-mono text-[11px] font-bold text-slate-700">
            Last Verified: {SALARY_BENCHMARKS.lastVerified}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SALARY_BENCHMARKS.markets.map((m) => (
            <div
              key={m.market}
              className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-3 text-xs"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="font-extrabold text-slate-900">{m.market}</div>
                <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono text-[10px] font-bold shrink-0">
                  {m.currency}
                </span>
              </div>
              <div className="font-mono space-y-1.5 text-slate-800 bg-slate-50 rounded-xl p-3 border border-slate-100">
                <div className="flex justify-between gap-2">
                  <span className="text-slate-500">Junior:</span>
                  <span className="font-bold">{m.junior}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-slate-500">Mid:</span>
                  <span className="font-bold">{m.mid}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-slate-500">Senior:</span>
                  <span className="font-bold">{m.senior}</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">{m.notes}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
