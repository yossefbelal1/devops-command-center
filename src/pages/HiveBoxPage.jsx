import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  AlertTriangle,
  BookOpen,
  Box,
  CheckCircle2,
  ChevronDown,
  Code2,
  ExternalLink,
  GitBranch,
  Kanban,
  ListChecks,
  ShieldCheck,
  Sparkles,
  Target,
  Terminal,
  Wrench
} from 'lucide-react';
import {
  HIVEBOX_DATA,
  CAPSTONE_PROJECT_DATA,
  CONTAINER_AUDIT_DATA
} from '../data/hiveboxData';
import { computeHiveboxRemainingForecast } from '../services/adaptiveForecast';
import { ProgressBar } from '../components/ui/ProgressBar';
import { CompletedItemCard } from '../components/ui/StatusBadge';

function FiveSectionTimeline({
  purpose,
  bestPractices = [],
  dependencies = [],
  requiredTools = [],
  optionalEnhancements = [],
  deliverables = [],
  checkStateMap = {},
  onToggleItem,
  exampleImplementation,
  verificationCommands = [],
  acceptanceCriteria = [],
  definitionOfDone,
  commonFailures = [],
  resources = []
}) {
  return (
    <div className="p-5 pt-3 border-t border-slate-200 bg-white space-y-6 text-xs">
      {/* Section 1: الشرح والمفاهيم والـ Best Practices */}
      <section className="space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-black text-blue-700">
          <span className="w-6 h-6 rounded-lg bg-blue-600 text-white font-mono text-[11px] flex items-center justify-center">
            1
          </span>
          <Target className="w-4 h-4" />
          <span>الشرح والمفاهيم والـ Best Practices</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="font-extrabold text-slate-900">الهدف والوصف الهندسي</div>
            <p className="text-slate-700 leading-relaxed">{purpose}</p>
            {dependencies.length > 0 && (
              <div className="pt-2 border-t border-slate-200/70">
                <span className="font-bold text-slate-900">المتطلبات السابقة: </span>
                <span className="text-slate-600">{dependencies.join(' • ')}</span>
              </div>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200/70 space-y-1.5">
            <div className="font-extrabold text-blue-900">أفضل الممارسات (Best Practices)</div>
            {bestPractices.length > 0 ? (
              <ul className="list-disc list-inside text-slate-800 space-y-1 leading-relaxed">
                {bestPractices.map((bp, i) => (
                  <li key={i}>{bp}</li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-600">الالتزام بالتسليم التراكمي عبر Pull Requests واختبار كل مخرج قبل الدمج.</p>
            )}
          </div>
        </div>
      </section>

      {/* Section 2: الأدوات المطلوبة */}
      <section className="space-y-2.5">
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

        {optionalEnhancements.length > 0 && (
          <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200/70 space-y-1">
            <div className="font-extrabold text-indigo-900">
              تحسينات اختيارية (Optional Enhancements)
            </div>
            <ul className="list-disc list-inside text-slate-700 space-y-1">
              {optionalEnhancements.map((opt) => (
                <li key={opt}>{opt}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Section 3: خطوات التنفيذ التفصيلية (Connected numbered vertical timeline) */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-black text-emerald-700">
          <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-mono text-[11px] flex items-center justify-center">
            3
          </span>
          <ListChecks className="w-4 h-4" />
          <span>خطوات التنفيذ التفصيلية (Execution Timeline)</span>
        </div>

        <div className="relative pr-8 space-y-3 before:content-[''] before:absolute before:right-3 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200">
          {deliverables.map((del, idx) => {
            const checked =
              checkStateMap?.[del.id] !== undefined ? Boolean(checkStateMap[del.id]) : Boolean(del.done);

            return (
              <div key={del.id} className="relative">
                <div
                  className={`absolute -right-8 top-3.5 w-6 h-6 rounded-full font-mono text-[11px] font-bold flex items-center justify-center z-10 border-2 ${
                    checked
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'bg-white border-blue-500 text-blue-700'
                  }`}
                >
                  {idx + 1}
                </div>

                <div
                  role="checkbox"
                  aria-checked={checked}
                  tabIndex={0}
                  onClick={() => onToggleItem?.(del.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onToggleItem?.(del.id);
                    }
                  }}
                  className={`rounded-2xl p-3.5 cursor-pointer transition-colors duration-150 border ${
                    checked
                      ? 'bg-emerald-500/10 border-l-4 border-emerald-500 border-emerald-200 text-slate-900'
                      : 'bg-white border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => onToggleItem?.(del.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="mt-0.5 w-4 h-4 rounded text-blue-600 border-slate-300 cursor-pointer shrink-0"
                      />
                      <div className="space-y-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {del.optional !== undefined && (
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                                del.optional
                                  ? 'bg-indigo-100 text-indigo-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {del.optional ? 'Optional' : 'Required'}
                            </span>
                          )}
                          {del.estimatedHours && (
                            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px] font-bold">
                              ~{del.estimatedHours}h
                            </span>
                          )}
                          {checked && (
                            <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-900 text-[10px] font-bold">
                              ✅ مكتمل
                            </span>
                          )}
                        </div>
                        <div className="text-xs sm:text-sm font-bold text-slate-900">
                          {del.text}
                        </div>
                        {del.details && (
                          <p className="text-[11px] text-slate-600 leading-relaxed">
                            {del.details}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 4: أمثلة عملية وأوامر التحقق */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-black text-slate-900">
          <span className="w-6 h-6 rounded-lg bg-slate-900 text-white font-mono text-[11px] flex items-center justify-center">
            4
          </span>
          <Terminal className="w-4 h-4" />
          <span>أمثلة عملية وأوامر التحقق (Examples, Verification &amp; Criteria)</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {exampleImplementation && (
            <div className="p-4 rounded-2xl bg-[#0B192C] text-slate-100 space-y-2">
              <span className="text-[11px] font-mono font-bold text-blue-300 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5" />
                Example Implementation
              </span>
              <pre className="text-[11px] font-mono leading-relaxed overflow-x-auto text-emerald-300 whitespace-pre-wrap">
                {exampleImplementation}
              </pre>
            </div>
          )}

          {verificationCommands.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 space-y-2">
              <span className="text-[11px] font-mono font-bold text-amber-300 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                CLI Verification Commands
              </span>
              <div className="space-y-1.5 font-mono text-[11px] text-slate-200">
                {verificationCommands.map((cmd) => (
                  <div key={cmd} className="px-2.5 py-1.5 rounded-lg bg-white/10 overflow-x-auto">
                    $ {cmd}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {acceptanceCriteria.length > 0 && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1.5">
              <div className="font-extrabold text-emerald-900">معايير القبول (Acceptance Criteria)</div>
              <ul className="list-disc list-inside text-slate-800 space-y-1">
                {acceptanceCriteria.map((ac) => (
                  <li key={ac}>{ac}</li>
                ))}
              </ul>
            </div>
          )}

          {definitionOfDone && (
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200/70 space-y-1.5">
              <div className="font-extrabold text-blue-900">تعريف الإنجاز (Definition of Done)</div>
              <p className="text-slate-800 leading-relaxed">{definitionOfDone}</p>
            </div>
          )}

          {commonFailures.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 space-y-1.5">
              <div className="font-extrabold text-amber-900 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>أخطاء شائعة (Common Failures)</span>
              </div>
              <ul className="list-disc list-inside text-slate-800 space-y-1">
                {commonFailures.map((cf) => (
                  <li key={cf}>{cf}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Section 5: المصادر والفيديوهات المرتبطة */}
      <section className="space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-black text-violet-700">
          <span className="w-6 h-6 rounded-lg bg-violet-600 text-white font-mono text-[11px] flex items-center justify-center">
            5
          </span>
          <BookOpen className="w-4 h-4" />
          <span>المصادر والفيديوهات المرتبطة ({resources.length})</span>
        </div>

        {resources.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {resources.map((res, idx) => (
              <a
                key={`${res.url}-${idx}`}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-2 p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-colors duration-150"
              >
                <div className="min-w-0">
                  <span className="inline-block px-2 py-0.5 rounded bg-white border border-slate-200 font-mono text-[10px] font-bold text-blue-700 mb-1">
                    {res.type || 'Docs'}
                  </span>
                  <div className="text-xs font-bold text-slate-900 truncate">{res.label}</div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              </a>
            ))}
          </div>
        ) : (
          <p className="text-slate-500">لا توجد روابط إضافية لهذه المرحلة.</p>
        )}
      </section>
    </div>
  );
}

export function HiveBoxPage({ appState, metrics, forecast, actions }) {
  const [searchParams] = useSearchParams();
  const phaseParam = searchParams.get('phase');
  const [subTab, setSubTab] = useState('hivebox');
  const [openPhases, setOpenPhases] = useState({
    'hb-1': true,
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

  const hbForecast = useMemo(
    () =>
      computeHiveboxRemainingForecast({
        phases: HIVEBOX_DATA.phases,
        hiveboxState: appState.hivebox,
        weeklyHours:
          forecast?.effectiveWeeklyHours ||
          appState.targetWeeklyHours ||
          appState.weeklyStudyHours ||
          12
      }),
    [appState.hivebox, appState.targetWeeklyHours, appState.weeklyStudyHours, forecast]
  );

  const auditPassed = CONTAINER_AUDIT_DATA.filter(
    (a) => appState.audit?.[a.id] !== false
  ).length;
  const auditPct = Math.round((auditPassed / CONTAINER_AUDIT_DATA.length) * 100);

  const getPhaseStats = (phase) => {
    const deliverables = phase.deliverables || [];
    const requiredDeliverables = deliverables.filter((d) => !d.optional);
    let remainingHours = 0;
    let doneCount = 0;
    let requiredDoneCount = 0;

    for (const d of deliverables) {
      const checked =
        appState.hivebox?.[d.id] !== undefined ? Boolean(appState.hivebox[d.id]) : Boolean(d.done);
      if (checked) {
        doneCount++;
        if (!d.optional) requiredDoneCount++;
      } else {
        remainingHours += Number(d.estimatedHours) || 2;
      }
    }

    const isAllRequiredDone =
      requiredDeliverables.length > 0 && requiredDoneCount === requiredDeliverables.length;

    return {
      doneCount,
      totalCount: deliverables.length,
      remainingHours,
      isAllRequiredDone
    };
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
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors duration-150 ${
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
          {/* Overview Banner with Dynamic Remaining Hours & Months */}
          <div className="glass-v5-blue rounded-3xl p-6 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-2 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={HIVEBOX_DATA.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-[11px] font-mono font-bold hover:bg-blue-700 transition-colors duration-150"
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

              <div className="bg-white rounded-2xl p-4 border border-blue-100 min-w-[260px] space-y-2">
                <ProgressBar
                  value={metrics.hbPct}
                  label="إنجاز مخرجات HiveBox"
                  sublabel={`${metrics.hbDone}/${metrics.hbTotal} مخرج`}
                  size="md"
                />
                <div className="text-[11px] font-mono text-slate-600 pt-1 border-t border-slate-100">
                  متبقي {hbForecast.remainingHours} ساعة (~{hbForecast.remainingMonths} شهر •{' '}
                  {hbForecast.expectedMonthLabel})
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-blue-200/50 flex flex-wrap gap-1.5">
              {(HIVEBOX_DATA.architectureFlow || []).map((step) => (
                <span
                  key={step}
                  className="px-2.5 py-1 rounded-lg bg-white border border-blue-100 text-slate-700 font-mono text-[11px] font-semibold"
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
                    انقل المراحل بين الأعمدة أو اضغط على أي بطاقة لفتح خطواتها الـ 5 بالأسفل.
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
                        ? 'bg-blue-50 border-blue-200'
                        : 'bg-slate-50 border-slate-200'
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
                              <div className="text-xs font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors duration-150">
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
                                  className={`flex-1 py-1 px-1.5 rounded-lg text-[10px] font-bold transition-colors duration-150 ${
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

          {/* Expandable Phase Cards 1–6 with 5-Section Vertical Sequence */}
          <div className="space-y-4">
            {HIVEBOX_DATA.phases.map((phase) => {
              const isOpen = !!openPhases[phase.id];
              const stats = getPhaseStats(phase);

              return (
                <div
                  id={`hivebox-phase-${phase.id}`}
                  key={phase.id}
                  className={`rounded-3xl border shadow-sm overflow-hidden transition-colors duration-150 ${
                    stats.isAllRequiredDone
                      ? 'bg-emerald-500/10 border-l-4 border-emerald-500 border-emerald-200'
                      : phase.phase <= 2
                      ? 'bg-white border-blue-300'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div
                    onClick={() =>
                      setOpenPhases((prev) => ({ ...prev, [phase.id]: !prev[phase.id] }))
                    }
                    className="p-5 cursor-pointer hover:bg-slate-50 transition-colors duration-150 flex items-center justify-between gap-4 select-none"
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-700 font-mono text-xs font-bold border border-blue-200/70">
                          Phase {phase.phase}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500">
                          {phase.moduleRef}
                        </span>
                        {stats.isAllRequiredDone ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-900 text-[11px] font-bold">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>✅ مكتمل</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 font-mono text-[10px] font-bold">
                            متبقي {stats.remainingHours}h
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
                        className={`w-5 h-5 text-slate-400 transition-transform duration-150 ${
                          isOpen ? 'rotate-180 text-blue-600' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {isOpen && (
                    <FiveSectionTimeline
                      purpose={phase.purpose}
                      bestPractices={phase.bestPractices || []}
                      dependencies={phase.dependencies || []}
                      requiredTools={phase.requiredTools || []}
                      optionalEnhancements={phase.optionalEnhancements || []}
                      deliverables={phase.deliverables || []}
                      checkStateMap={appState.hivebox}
                      onToggleItem={actions.toggleHivebox}
                      exampleImplementation={phase.exampleImplementation}
                      verificationCommands={phase.verificationCommands || []}
                      acceptanceCriteria={phase.acceptanceCriteria || []}
                      definitionOfDone={phase.definitionOfDone}
                      commonFailures={phase.commonFailures || []}
                      resources={phase.resources || []}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Separate Standalone Phase 7 Capstone Callout */}
          <section className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 border border-indigo-400/30 space-y-4">
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
                className="px-4 py-2 rounded-xl bg-white text-slate-900 hover:bg-indigo-100 text-xs font-bold transition-colors duration-150"
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
        <div className="glass-v5 rounded-3xl overflow-hidden border-2 border-indigo-200">
          <div className="p-6 sm:p-8 space-y-4 bg-white">
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

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
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
              <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                {CAPSTONE_PROJECT_DATA.autoteleBase.upgrades.map((u) => (
                  <li key={u}>{u}</li>
                ))}
              </ul>
            </div>
          </div>

          <FiveSectionTimeline
            purpose={CAPSTONE_PROJECT_DATA.purpose || CAPSTONE_PROJECT_DATA.subtitle}
            bestPractices={CAPSTONE_PROJECT_DATA.bestPractices || []}
            dependencies={CAPSTONE_PROJECT_DATA.dependencies || []}
            requiredTools={CAPSTONE_PROJECT_DATA.requiredTools || CAPSTONE_PROJECT_DATA.autoteleBase.stack}
            deliverables={CAPSTONE_PROJECT_DATA.deliverables || []}
            checkStateMap={appState.hivebox}
            onToggleItem={actions.toggleCapstone}
            exampleImplementation={CAPSTONE_PROJECT_DATA.exampleImplementation}
            verificationCommands={CAPSTONE_PROJECT_DATA.verificationCommands || []}
            acceptanceCriteria={CAPSTONE_PROJECT_DATA.acceptanceCriteria || []}
            definitionOfDone={CAPSTONE_PROJECT_DATA.definitionOfDone}
            commonFailures={CAPSTONE_PROJECT_DATA.commonFailures || []}
            resources={CAPSTONE_PROJECT_DATA.resources || []}
          />
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
