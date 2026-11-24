import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  AlertTriangle,
  Box,
  CheckCircle2,
  ChevronDown,
  Code2,
  ExternalLink,
  GitBranch,
  Kanban,
  ShieldCheck,
  Sparkles,
  Target,
  Terminal
} from 'lucide-react';
import {
  HIVEBOX_DATA,
  CAPSTONE_PROJECT_DATA,
  CONTAINER_AUDIT_DATA
} from '../data/hiveboxData';
import { ProgressBar } from '../components/ui/ProgressBar';
import { CompletedItemCard } from '../components/ui/StatusBadge';

export function HiveBoxPage({ appState, metrics, actions }) {
  const [searchParams] = useSearchParams();
  const phaseParam = searchParams.get('phase');
  const [subTab, setSubTab] = useState('hivebox');
  const [openPhases, setOpenPhases] = useState({
    'hb-2': true,
    ...(phaseParam ? { [phaseParam]: true } : {})
  });
  const [kanbanColumns, setKanbanColumns] = useState(
    () => ({ ...(HIVEBOX_DATA.kanbanBoard?.defaultPhaseColumn || {}) })
  );

  useEffect(() => {
    if (phaseParam) {
      setSubTab('hivebox');
      setOpenPhases((prev) => ({ ...prev, [phaseParam]: true }));
    }
  }, [phaseParam]);

  const auditPassed = CONTAINER_AUDIT_DATA.filter(
    (a) => appState.audit?.[a.id] !== false
  ).length;
  const auditPct = Math.round((auditPassed / CONTAINER_AUDIT_DATA.length) * 100);

  const getPhaseStats = (phase) => {
    const deliverables = phase.deliverables || [];
    const requiredDeliverables = deliverables.filter((d) => !d.optional);
    const doneCount = deliverables.filter((d) =>
      appState.hivebox?.[d.id] !== undefined ? appState.hivebox[d.id] : d.done
    ).length;
    const requiredDoneCount = requiredDeliverables.filter((d) =>
      appState.hivebox?.[d.id] !== undefined ? appState.hivebox[d.id] : d.done
    ).length;
    const isAllRequiredDone =
      requiredDeliverables.length > 0 && requiredDoneCount === requiredDeliverables.length;

    return { doneCount, totalCount: deliverables.length, isAllRequiredDone };
  };

  const resolveKanbanColumn = (phase) => {
    const explicit = appState.hiveboxColumns?.[phase.id] || kanbanColumns[phase.id];
    const stats = getPhaseStats(phase);
    if (stats.isAllRequiredDone && !appState.hiveboxColumns?.[phase.id]) return 'done';
    return explicit || 'todo';
  };

  const moveKanbanPhase = (phaseId, nextCol) => {
    setKanbanColumns((prev) => ({ ...prev, [phaseId]: nextCol }));
    actions.setHiveboxColumn?.(phaseId, nextCol);
  };

  const openPhaseCard = (phaseId) => {
    setOpenPhases((prev) => ({ ...prev, [phaseId]: true }));
    const el = document.getElementById(`hivebox-phase-${phaseId}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header & Sub-tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-blue-600 font-bold">
            HIVEBOX (PHASES 1–6 ITERATIVE MVP) • STANDALONE CAPSTONE • CONTAINER AUDIT
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            مشروع HiveBox وتدقيق الحاويات
          </h1>
        </div>

        <div className="inline-flex flex-wrap bg-white p-1.5 rounded-2xl border border-slate-200 self-start gap-1">
          {[
            { id: 'hivebox', label: 'HiveBox (6 Phases)', Icon: Box },
            { id: 'capstone', label: 'Standalone Capstone (Phase 7)', Icon: Sparkles },
            { id: 'audit', label: `Container Audit (${auditPct}%)`, Icon: ShieldCheck }
          ].map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setSubTab(id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                subTab === id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {subTab === 'hivebox' && (
        <div className="space-y-6">
          {/* Overview Banner */}
          <div className="glass-v5-blue rounded-3xl p-6 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-2 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={HIVEBOX_DATA.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-[11px] font-mono font-bold hover:bg-blue-700 transition"
                  >
                    <GitBranch className="w-3 h-3" />
                    <span>yossefbelal1/Hivebox (Single Repo • PRs Only)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={HIVEBOX_DATA.officialSpecUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:underline"
                  >
                    <span>المواصفة الرسمية</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">{HIVEBOX_DATA.title}</h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {HIVEBOX_DATA.overview}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-blue-100 min-w-[230px]">
                <ProgressBar
                  value={metrics.hbPct}
                  label="إنجاز مخرجات HiveBox"
                  sublabel={`${metrics.hbDone}/${metrics.hbTotal} مخرج`}
                  size="md"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-blue-200/50 flex flex-wrap gap-1.5">
              {(HIVEBOX_DATA.architectureFlow || []).map((step) => (
                <span
                  key={step}
                  className="px-2.5 py-1 rounded-lg bg-white/90 border border-blue-100 text-slate-700 font-mono text-[11px] font-semibold"
                >
                  {step}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Kanban Board (Phases 1-6) */}
          <section className="glass-v5 rounded-3xl p-5 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Kanban className="w-5 h-5 text-blue-600" />
                <div>
                  <h2 className="text-base font-extrabold text-slate-900">
                    لوحة Kanban التفاعلية (Phases 1–6)
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    انقل المراحل بين الأعمدة أو اضغط على أي بطاقة لفتح مواصفاتها الكاملة بالأسفل.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(HIVEBOX_DATA.kanbanBoard?.columns || []).map((col) => {
                const colPhases = HIVEBOX_DATA.phases.filter(
                  (p) => resolveKanbanColumn(p) === col.id
                );

                return (
                  <div
                    key={col.id}
                    className={`rounded-2xl p-3.5 border space-y-3 ${
                      col.id === 'done'
                        ? 'bg-emerald-500/10 border-emerald-500/30'
                        : col.id === 'in_progress'
                        ? 'bg-blue-50/70 border-blue-200'
                        : 'bg-slate-50 border-slate-200/80'
                    }`}
                  >
                    <div className="flex items-center justify-between px-1">
                      <div>
                        <div className="text-xs font-black text-slate-900">{col.title}</div>
                        <div className="text-[10px] text-slate-500">{col.subtitle}</div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-white border border-slate-200 font-mono text-[11px] font-bold text-slate-700">
                        {colPhases.length}
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {colPhases.map((phase) => {
                        const stats = getPhaseStats(phase);
                        return (
                          <div
                            key={phase.id}
                            className={`rounded-xl p-3 bg-white border shadow-xs space-y-2.5 ${
                              col.id === 'done'
                                ? 'border-l-4 border-emerald-500 border-emerald-200'
                                : 'border-slate-200'
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => openPhaseCard(phase.id)}
                              className="text-right w-full space-y-1 group"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono text-[10px] font-bold">
                                  Phase {phase.phase}
                                </span>
                                <span className="font-mono text-[10px] font-bold text-slate-500">
                                  {stats.doneCount}/{stats.totalCount}
                                </span>
                              </div>
                              <div className="text-xs font-extrabold text-slate-900 group-hover:text-blue-700 transition">
                                {phase.title}
                              </div>
                            </button>

                            <div className="flex items-center gap-1 pt-1 border-t border-slate-100">
                              {(HIVEBOX_DATA.kanbanBoard?.columns || []).map((targetCol) => (
                                <button
                                  key={targetCol.id}
                                  type="button"
                                  disabled={col.id === targetCol.id}
                                  onClick={() => moveKanbanPhase(phase.id, targetCol.id)}
                                  className={`flex-1 py-1 px-1.5 rounded-lg text-[10px] font-bold transition ${
                                    col.id === targetCol.id
                                      ? 'bg-slate-900 text-white cursor-default'
                                      : 'bg-slate-100 hover:bg-blue-100 text-slate-700'
                                  }`}
                                >
                                  {targetCol.title}
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Expandable Phase Cards 1–6 with ALL Required Fields */}
          <div className="space-y-4">
            {HIVEBOX_DATA.phases.map((phase) => {
              const isOpen = !!openPhases[phase.id];
              const stats = getPhaseStats(phase);

              return (
                <div
                  id={`hivebox-phase-${phase.id}`}
                  key={phase.id}
                  className={`rounded-3xl border shadow-sm overflow-hidden transition ${
                    stats.isAllRequiredDone
                      ? 'bg-emerald-500/10 border-l-4 border-emerald-500 border-emerald-200'
                      : phase.phase === 2
                      ? 'bg-white border-blue-300'
                      : 'bg-white border-slate-200/90'
                  }`}
                >
                  <div
                    onClick={() =>
                      setOpenPhases((prev) => ({ ...prev, [phase.id]: !prev[phase.id] }))
                    }
                    className="p-5 cursor-pointer hover:bg-white/70 transition flex items-center justify-between gap-4 select-none"
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-700 font-mono text-xs font-bold border border-blue-200/70">
                          Phase {phase.phase}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500">
                          {phase.moduleRef}
                        </span>
                        {stats.isAllRequiredDone && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-900 text-[11px] font-bold">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>✅ مكتمل</span>
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-extrabold text-slate-900">{phase.title}</h3>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                        {stats.doneCount}/{stats.totalCount}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-blue-600' : ''
                        }`}
                      />
                    </div>
                  </div>

                  <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
                    <div className="accordion-inner">
                      <div className="p-5 pt-3 border-t border-slate-200/70 bg-white space-y-5 text-xs">
                        {/* Purpose & Dependencies & Required Tools */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                            <div className="font-extrabold text-blue-700 flex items-center gap-1.5">
                              <Target className="w-3.5 h-3.5" />
                              <span>الهدف (Purpose)</span>
                            </div>
                            <p className="text-slate-700 leading-relaxed">{phase.purpose}</p>
                          </div>

                          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                            <div className="font-extrabold text-slate-900">الاعتماديات (Dependencies)</div>
                            <ul className="list-disc list-inside text-slate-700 space-y-1">
                              {(phase.dependencies || []).map((dep) => (
                                <li key={dep}>{dep}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
                            <div className="font-extrabold text-slate-900">الأدوات المطلوبة (Tools)</div>
                            <div className="flex flex-wrap gap-1.5">
                              {(phase.requiredTools || []).map((tool) => (
                                <span
                                  key={tool}
                                  className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-mono text-[11px] font-semibold"
                                >
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Required Tasks vs Optional Enhancements */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/70 space-y-2">
                            <div className="font-extrabold text-blue-900">
                              المهام الأساسية المطلوبة (Required Tasks)
                            </div>
                            <ul className="list-disc list-inside text-slate-800 space-y-1 leading-relaxed">
                              {(phase.requiredTasks || []).map((task) => (
                                <li key={task}>{task}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-200/70 space-y-2">
                            <div className="font-extrabold text-indigo-900">
                              تحسينات اختيارية (Optional Enhancements)
                            </div>
                            {phase.optionalEnhancements?.length > 0 ? (
                              <ul className="list-disc list-inside text-slate-700 space-y-1 leading-relaxed">
                                {phase.optionalEnhancements.map((opt) => (
                                  <li key={opt}>{opt}</li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-slate-500">
                                لا توجد تحسينات اختيارية في هذه المرحلة — ركّز على إغلاق المتطلبات الأساسية فقط.
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Example Implementation & CLI Verification Commands */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div className="p-4 rounded-2xl bg-[#0B192C] text-slate-100 space-y-2">
                            <span className="text-[11px] font-mono font-bold text-blue-300 flex items-center gap-1.5">
                              <Code2 className="w-3.5 h-3.5" />
                              Example Implementation
                            </span>
                            <pre className="text-[11px] font-mono leading-relaxed overflow-x-auto text-emerald-300 whitespace-pre-wrap">
                              {phase.exampleImplementation}
                            </pre>
                          </div>

                          <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 space-y-2">
                            <span className="text-[11px] font-mono font-bold text-amber-300 flex items-center gap-1.5">
                              <Terminal className="w-3.5 h-3.5" />
                              CLI Verification Commands
                            </span>
                            <div className="space-y-1.5 font-mono text-[11px] text-slate-200">
                              {(phase.verificationCommands || []).map((cmd) => (
                                <div
                                  key={cmd}
                                  className="px-2.5 py-1.5 rounded-lg bg-white/10 overflow-x-auto"
                                >
                                  $ {cmd}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Acceptance Criteria, Definition of Done & Common Failures */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1.5">
                            <div className="font-extrabold text-emerald-900">
                              معايير القبول (Acceptance Criteria)
                            </div>
                            <ul className="list-disc list-inside text-slate-800 space-y-1">
                              {(phase.acceptanceCriteria || []).map((ac) => (
                                <li key={ac}>{ac}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/70 space-y-1.5">
                            <div className="font-extrabold text-blue-900">
                              تعريف الإنجاز (Definition of Done)
                            </div>
                            <p className="text-slate-800 leading-relaxed">{phase.definitionOfDone}</p>
                          </div>

                          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1.5">
                            <div className="font-extrabold text-amber-900 flex items-center gap-1.5">
                              <AlertTriangle className="w-3.5 h-3.5" />
                              <span>أخطاء شائعة (Common Failures)</span>
                            </div>
                            <ul className="list-disc list-inside text-slate-800 space-y-1">
                              {(phase.commonFailures || []).map((cf) => (
                                <li key={cf}>{cf}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Interactive Deliverables */}
                        <div className="space-y-2">
                          <div className="font-extrabold text-slate-900">
                            قائمة التسليمات (Deliverables)
                          </div>
                          {phase.deliverables.map((del) => {
                            const checked =
                              appState.hivebox?.[del.id] !== undefined
                                ? appState.hivebox[del.id]
                                : del.done;
                            return (
                              <CompletedItemCard
                                key={del.id}
                                completed={checked}
                                className="p-3.5 cursor-pointer hover:border-blue-300"
                                onClick={() => actions.toggleHivebox(del.id)}
                              >
                                <div className="flex items-center gap-3">
                                  <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => actions.toggleHivebox(del.id)}
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer shrink-0"
                                  />
                                  {del.optional !== undefined && (
                                    <span
                                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
                                        del.optional
                                          ? 'bg-indigo-100 text-indigo-800'
                                          : 'bg-blue-100 text-blue-800'
                                      }`}
                                    >
                                      {del.optional ? 'Optional' : 'Required'}
                                    </span>
                                  )}
                                  <span className="text-xs sm:text-sm font-semibold text-slate-900">
                                    {del.text}
                                  </span>
                                </div>
                              </CompletedItemCard>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Separate Standalone Phase 7 Capstone Callout */}
          <section className="rounded-3xl bg-gradient-to-l from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 border border-indigo-400/30 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-200 font-mono text-[11px] font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{CAPSTONE_PROJECT_DATA.badge} • NOT A HIVEBOX PHASE</span>
                </span>
                <h2 className="text-xl font-black">{CAPSTONE_PROJECT_DATA.title}</h2>
                <p className="text-xs text-slate-300">{CAPSTONE_PROJECT_DATA.repoHint}</p>
              </div>
              <button
                type="button"
                onClick={() => setSubTab('capstone')}
                className="px-4 py-2 rounded-xl bg-white text-slate-900 hover:bg-indigo-100 text-xs font-bold transition"
              >
                فتح لوحة Capstone المستقلة
              </button>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {CAPSTONE_PROJECT_DATA.whySeparate}
            </p>
          </section>
        </div>
      )}

      {subTab === 'capstone' && (
        <div className="glass-v5 rounded-3xl p-6 sm:p-8 space-y-6 border-2 border-indigo-200">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-[11px] font-mono font-bold">
                {CAPSTONE_PROJECT_DATA.badge}
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold">
                مستقل تماماً عن HiveBox (Dedicated Separate Repo)
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {CAPSTONE_PROJECT_DATA.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {CAPSTONE_PROJECT_DATA.subtitle}
            </p>
            <p className="text-xs text-blue-900 bg-blue-50 border border-blue-200 rounded-2xl p-4">
              {CAPSTONE_PROJECT_DATA.whySeparate}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <strong className="text-sm font-extrabold text-slate-900">
                {CAPSTONE_PROJECT_DATA.autoteleBase.name}
              </strong>
              <a
                href={CAPSTONE_PROJECT_DATA.autoteleBase.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1"
              >
                <span>GitHub Repo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {CAPSTONE_PROJECT_DATA.autoteleBase.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 rounded-lg bg-white border border-slate-200 font-mono text-[11px] text-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
            <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
              {CAPSTONE_PROJECT_DATA.autoteleBase.upgrades.map((u) => (
                <li key={u}>{u}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-2.5">
            <div className="text-xs font-extrabold text-slate-900">
              مخرجات مشروع التخرج المستقل (Capstone Deliverables)
            </div>
            {CAPSTONE_PROJECT_DATA.deliverables.map((del) => {
              const checked = Boolean(appState.hivebox?.[del.id]);
              return (
                <CompletedItemCard
                  key={del.id}
                  completed={checked}
                  className="p-3.5 cursor-pointer hover:border-indigo-300"
                  onClick={() => actions.toggleCapstone(del.id)}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => actions.toggleCapstone(del.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-4 h-4 rounded text-indigo-600"
                    />
                    <span className="text-xs sm:text-sm font-semibold text-slate-900">
                      {del.text}
                    </span>
                  </div>
                </CompletedItemCard>
              );
            })}
          </div>
        </div>
      )}

      {subTab === 'audit' && (
        <div className="space-y-3">
          {CONTAINER_AUDIT_DATA.map((item) => {
            const passed = appState.audit?.[item.id] !== false;
            return (
              <CompletedItemCard
                key={item.id}
                completed={passed}
                className="p-4 cursor-pointer"
                onClick={() => actions.toggleAudit(item.id)}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={passed}
                      onChange={() => actions.toggleAudit(item.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-4 h-4 rounded text-blue-600"
                    />
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px] font-bold">
                      {item.tool}
                    </span>
                    <span className="text-sm font-extrabold text-slate-900">{item.title}</span>
                  </div>
                  <p className="text-xs text-slate-600 pr-7">{item.whatYouDo}</p>
                </div>
              </CompletedItemCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
