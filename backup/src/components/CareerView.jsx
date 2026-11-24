import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  CalendarClock,
  Check,
  CheckCircle2,
  ChevronDown,
  DollarSign,
  Layers,
  TrendingUp
} from 'lucide-react';

export function CareerView({ data, progress }) {
  const [openStages, setOpenStages] = useState({ 'stage-1': true });
  const [openExtras, setOpenExtras] = useState({ apply: true, depi: false });

  const toggleStage = (id) => {
    setOpenStages((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleExtra = (key) => {
    setOpenExtras((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Helper to check if Youssef completed a topic referenced in a career stage
  const isTopicCompleted = (topicId) => {
    const mod = data.modules.find((m) => m.topics.some((t) => t.id === topicId));
    const topic = mod?.topics.find((t) => t.id === topicId);
    if (!topic) return false;
    const explicit = progress.topicStatus[topicId] || topic.defaultStatus;
    if (explicit === 'done') return true;
    return topic.subtasks.every((s) =>
      progress.subtasks[s.id] !== undefined ? progress.subtasks[s.id] : s.done
    );
  };

  const colorMap = {
    emerald: {
      pill: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      dot: 'bg-emerald-500 ring-emerald-100',
      badge: 'bg-emerald-600 text-white'
    },
    blue: {
      pill: 'bg-blue-100 text-blue-800 border-blue-200',
      dot: 'bg-blue-600 ring-blue-100',
      badge: 'bg-blue-600 text-white'
    },
    indigo: {
      pill: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      dot: 'bg-indigo-600 ring-indigo-100',
      badge: 'bg-indigo-600 text-white'
    },
    purple: {
      pill: 'bg-purple-100 text-purple-800 border-purple-200',
      dot: 'bg-purple-600 ring-purple-100',
      badge: 'bg-purple-600 text-white'
    },
    rose: {
      pill: 'bg-rose-100 text-rose-800 border-rose-200',
      dot: 'bg-rose-500 ring-rose-100',
      badge: 'bg-rose-600 text-white'
    },
    slate: {
      pill: 'bg-slate-200 text-slate-800 border-slate-300',
      dot: 'bg-slate-800 ring-slate-200',
      badge: 'bg-slate-900 text-white'
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header & Core Evolution Mantra */}
      <div className="glass-v5-blue rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-blue-600 font-bold">
              CAREER PATH EVOLUTION OF A DEVOPS ENGINEER
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              تدرج المسار المهني والرواتب وخطة التقديم الفعلي
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              مسار DevOps ليس سلّماً جامداً؛ الدور يتطور مع اتساع نطاق المسؤولية. اضغط على أي مرحلة
              لرؤية المهام، ما أنجزته منها بعلامة ✓، ومتوسط الرواتب.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-blue-200/80 shadow-xs shrink-0">
            <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1.5">
              تطور نطاق المسؤولية (Scope Evolution)
            </span>
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-slate-900 font-mono" dir="ltr">
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Tasks</span>
              <span>→</span>
              <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800">Systems</span>
              <span>→</span>
              <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800">Platforms</span>
              <span>→</span>
              <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800">Architecture</span>
            </div>
          </div>
        </div>
      </div>

      {/* VERTICAL TIMELINE SCROLL: LIFE OF A DEVOPS ENGINEER */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span>خط الزمن المهني (0 إلى 10+ سنوات خبرة)</span>
          </h2>
          <span className="text-xs text-slate-500 font-semibold">
            اضغط على أي بوكس لفتحه وإغلاقه
          </span>
        </div>

        <div className="relative space-y-5 md:pr-10 md:before:content-[''] md:before:absolute md:before:right-4 md:before:top-6 md:before:bottom-6 md:before:w-[2.5px] md:before:bg-gradient-to-b md:before:from-emerald-400 md:before:via-blue-500 md:before:to-slate-700">
          {data.careerEvolution.map((stage, idx) => {
            const isOpen = !!openStages[stage.id];
            const theme = colorMap[stage.themeColor] || colorMap.blue;
            const completedSkills = stage.skillChecks.filter((sc) =>
              isTopicCompleted(sc.moduleRef)
            ).length;
            const totalSkills = stage.skillChecks.length;

            return (
              <div key={stage.id} className="relative">
                {/* Timeline Circle Marker */}
                <div
                  className={`hidden md:flex absolute -right-[35px] top-6 w-8 h-8 rounded-full items-center justify-center text-xs font-mono font-black text-white ring-4 z-10 ${theme.dot}`}
                >
                  {idx + 1}
                </div>

                {/* Stage Box */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition hover:border-blue-200">
                  <div
                    onClick={() => toggleStage(stage.id)}
                    className="p-5 cursor-pointer hover:bg-slate-50/70 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none"
                  >
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`px-3 py-0.5 rounded-full text-xs font-mono font-bold border ${theme.pill}`}
                        >
                          {stage.years}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-mono font-bold">
                          Scope: {stage.scopeBadge}
                        </span>
                        {idx === 0 && (
                          <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold">
                            هدفك في منتصف 2027
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-black text-slate-900">{stage.role}</h3>
                      <p className="text-xs text-slate-500">{stage.headline}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {totalSkills > 0 && (
                        <span
                          className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${
                            completedSkills === totalSkills
                              ? 'bg-emerald-100 text-emerald-700'
                              : completedSkills > 0
                              ? 'bg-blue-50 text-blue-700'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          منجز: {completedSkills}/{totalSkills}
                        </span>
                      )}
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-blue-600' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {/* Collapsible Details */}
                  <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
                    <div className="accordion-inner">
                      <div className="p-5 pt-0 border-t border-slate-100 space-y-5">
                        <p className="text-xs font-mono text-slate-500 bg-slate-50 px-3.5 py-2 rounded-xl mt-4" dir="ltr">
                          {stage.summary}
                        </p>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          {/* Responsibilities */}
                          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
                            <span className="text-xs font-extrabold text-slate-800 block">
                              المسؤوليات في هذه المرحلة:
                            </span>
                            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                              {stage.bullets.map((b, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Live Checked Skills from Roadmap */}
                          <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 space-y-2">
                            <span className="text-xs font-extrabold text-blue-900 block">
                              موقفك الحالي من مهارات هذه المرحلة (مربوط بالـ Roadmap):
                            </span>
                            {totalSkills === 0 ? (
                              <p className="text-xs text-slate-500">
                                مرحلة قيادية ومعمارية متقدمة تُكتسب بعد سنوات من الخبرة الإنتاجية.
                              </p>
                            ) : (
                              <div className="space-y-1.5">
                                {stage.skillChecks.map((sc, sIdx) => {
                                  const done = isTopicCompleted(sc.moduleRef);
                                  return (
                                    <div
                                      key={sIdx}
                                      className={`flex items-center gap-2 text-xs px-2.5 py-1.5 rounded-lg ${
                                        done
                                          ? 'bg-emerald-50 text-emerald-800 font-bold'
                                          : 'bg-white/80 text-slate-600'
                                      }`}
                                    >
                                      <span
                                        className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                                          done
                                            ? 'bg-emerald-500 text-white'
                                            : 'border border-slate-300 bg-white'
                                        }`}
                                      >
                                        {done && <Check className="w-2.5 h-2.5" strokeWidth={3} />}
                                      </span>
                                      <span>{sc.label}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Salaries Snapshot for this Level */}
                        <div className="space-y-2">
                          <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                            <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                            متوسط الرواتب المتوقعة في هذه المرحلة:
                          </span>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
                            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                              <span className="text-[10px] text-slate-500 block">مصر (محلي/Startup)</span>
                              <span className="text-xs font-extrabold text-slate-900 font-mono">
                                {stage.salarySnapshot.egyptLocal}
                              </span>
                            </div>
                            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
                              <span className="text-[10px] text-slate-500 block">مصر (Outsourcing)</span>
                              <span className="text-xs font-extrabold text-emerald-700 font-mono">
                                {stage.salarySnapshot.egyptOutsourcing}
                              </span>
                            </div>
                            <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100">
                              <span className="text-[10px] text-slate-500 block">الخليج (SA / UAE)</span>
                              <span className="text-xs font-extrabold text-blue-700 font-mono">
                                {stage.salarySnapshot.gulf}
                              </span>
                            </div>
                            <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-100">
                              <span className="text-[10px] text-slate-500 block">ريموت دولي / Upwork</span>
                              <span className="text-xs font-extrabold text-indigo-700 font-mono">
                                {stage.salarySnapshot.remote}
                              </span>
                            </div>
                          </div>
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

      {/* EXPANDABLE STRATEGY BOXES: WHEN TO APPLY & DEPI/MIS */}
      <section className="space-y-4">
        {/* Box 1: When to Apply */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div
            onClick={() => toggleExtra('apply')}
            className="p-5 cursor-pointer hover:bg-slate-50/70 transition flex items-center justify-between gap-4 select-none"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <CalendarClock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  امتى أقدم على شغل؟ (خطة الـ 4 مراحل حتى نص 2027)
                </h3>
                <p className="text-xs text-slate-500">
                  اضغط لفتح خطة التقديم الشهرية دون تسرع أو حرق فرص
                </p>
              </div>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                openExtras.apply ? 'rotate-180 text-blue-600' : ''
              }`}
            />
          </div>

          <div className={`accordion-content ${openExtras.apply ? 'open' : ''}`}>
            <div className="accordion-inner">
              <div className="p-5 pt-0 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.whenToApply.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2 mt-4"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono font-bold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full">
                        {item.period}
                      </span>
                      <span className="text-[11px] font-extrabold text-slate-700">
                        {item.status}
                      </span>
                    </div>
                    <h4 className="text-sm font-extrabold text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Box 2: DEPI Verdict & MIS Degree Strategy */}
        <div className="bg-white rounded-2xl border border-amber-200 shadow-sm overflow-hidden">
          <div
            onClick={() => toggleExtra('depi')}
            className="p-5 cursor-pointer hover:bg-amber-50/30 transition flex items-center justify-between gap-4 select-none"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  موقف DEPI الرسمي + خطة اختراق البنوك والشركات بشهادة MIS
                </h3>
                <p className="text-xs text-slate-500">
                  اضغط لفتح التفاصيل الكاملة وتوصية شهادة MIS للـ ATS والـ 3 ركائز
                </p>
              </div>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                openExtras.depi ? 'rotate-180 text-amber-600' : ''
              }`}
            />
          </div>

          <div className={`accordion-content ${openExtras.depi ? 'open' : ''}`}>
            <div className="accordion-inner">
              <div className="p-5 pt-0 border-t border-amber-100 space-y-4">
                <div className="p-4 rounded-xl bg-slate-900 text-white text-xs sm:text-sm leading-relaxed mt-4">
                  <strong className="text-amber-400 block mb-1">{data.meta.depiVerdict.status}</strong>
                  {data.meta.depiVerdict.decision}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {data.meta.depiVerdict.threePillars.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5"
                    >
                      <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">{p.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
