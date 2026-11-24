import React, { useState } from 'react';
import { Lightbulb, ChevronDown, Clock, CheckCircle2 } from 'lucide-react';

const DEFAULT_EFFORT_BREAKDOWN = {
  videoPct: 25,
  labPct: 30,
  codingPct: 25,
  troubleshootingPct: 20
};

export function TimelineStepList({
  steps = [],
  checkedMap = {},
  isStepChecked,
  onToggleStep,
  effortBreakdown = DEFAULT_EFFORT_BREAKDOWN,
  showEffortBreakdown = true,
  codePrefix = ''
}) {
  const [openHints, setOpenHints] = useState({});

  const videoPct = Number(effortBreakdown?.videoPct ?? 25);
  const labPct = Number(effortBreakdown?.labPct ?? 30);
  const codeTroublePct =
    effortBreakdown?.codingPct !== undefined || effortBreakdown?.troubleshootingPct !== undefined
      ? Number(effortBreakdown?.codingPct ?? 0) + Number(effortBreakdown?.troubleshootingPct ?? 0)
      : 45;
  const totalPct = Math.max(1, videoPct + labPct + codeTroublePct);

  const toggleHint = (stepId, e) => {
    e.stopPropagation();
    setOpenHints((prev) => ({ ...prev, [stepId]: !prev[stepId] }));
  };

  return (
    <div className="space-y-4">
      {showEffortBreakdown && (
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-bold">
            <span className="text-slate-700">توزيع المجهود المقترح:</span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200">
                🎥 شرح وفهم {videoPct}%
              </span>
              <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-800 border border-indigo-200">
                🧪 تطبيق ولابات {labPct}%
              </span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                🛠️ كود وحل مشاكل (Troubleshooting) {codeTroublePct}%
              </span>
            </div>
          </div>

          <div className="w-full h-2 rounded-full overflow-hidden bg-slate-200 flex">
            <div
              className="h-full bg-blue-500"
              style={{ width: `${(videoPct / totalPct) * 100}%` }}
            />
            <div
              className="h-full bg-indigo-500"
              style={{ width: `${(labPct / totalPct) * 100}%` }}
            />
            <div
              className="h-full bg-emerald-500"
              style={{ width: `${(codeTroublePct / totalPct) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Connected Vertical Scroll Timeline */}
      <div className="relative space-y-3">
        {steps.map((step, idx) => {
          const checked =
            typeof isStepChecked === 'function'
              ? Boolean(isStepChecked(step))
              : checkedMap?.[step.id] !== undefined
              ? Boolean(checkedMap[step.id])
              : Boolean(step.done);
          const isLast = idx === steps.length - 1;
          const hintOpen = Boolean(openHints[step.id]);
          const hasHint = Boolean(step.hint && String(step.hint).trim());

          return (
            <div key={step.id} className="relative flex items-stretch gap-3">
              {/* Vertical Connector & Numbered Node */}
              <div className="flex flex-col items-center shrink-0">
                <span
                  className={`w-7 h-7 rounded-full font-mono text-xs font-black flex items-center justify-center border-2 transition-colors duration-150 ${
                    checked
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'bg-white border-blue-600 text-blue-700'
                  }`}
                >
                  {idx + 1}
                </span>
                {!isLast && (
                  <span
                    className={`w-0.5 flex-1 my-1 ${
                      checked ? 'bg-emerald-400' : 'bg-slate-200'
                    }`}
                  />
                )}
              </div>

              {/* Step Card */}
              <div
                onClick={() => onToggleStep?.(step)}
                className={`flex-1 p-3.5 rounded-2xl border cursor-pointer transition-colors duration-150 space-y-2.5 ${
                  checked
                    ? 'bg-emerald-500/10 border-l-4 border-emerald-500 border-emerald-200 text-slate-900'
                    : 'bg-white border-slate-200 hover:border-blue-300 text-slate-900'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5 min-w-0 flex-1">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onToggleStep?.(step)}
                      onClick={(e) => e.stopPropagation()}
                      aria-label={step.text}
                      className="mt-1 w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer shrink-0"
                    />
                    <div className="min-w-0 space-y-1 flex-1">
                      <div className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                        {codePrefix && (
                          <span className="font-mono text-blue-600 ml-1.5">
                            {codePrefix}
                            {idx + 1}
                          </span>
                        )}
                        <span>{step.text}</span>
                      </div>

                      {step.details && (
                        <div className="text-xs text-slate-700 leading-relaxed bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2">
                          <span className="font-bold text-slate-900">المطلوب تعمله بالظبط: </span>
                          <span>{step.details}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                    {step.optional !== undefined && (
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                          step.optional
                            ? 'bg-amber-50 border-amber-200 text-amber-800'
                            : 'bg-blue-50 border-blue-200 text-blue-800'
                        }`}
                      >
                        {step.optional ? 'Optional' : 'Required'}
                      </span>
                    )}

                    {step.estimatedHours !== undefined && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 font-mono text-[10px] font-bold text-slate-700">
                        <Clock className="w-3 h-3 text-blue-600" />
                        <span>{step.estimatedHours}h</span>
                      </span>
                    )}

                    {checked && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-900 text-[10px] font-bold whitespace-nowrap">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>✅ مكتمل</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Collapsible Per-Step Hint */}
                {hasHint && (
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={(e) => toggleHint(step.id, e)}
                      aria-expanded={hintOpen}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-colors duration-150 ${
                        hintOpen
                          ? 'bg-amber-100 border-amber-300 text-amber-950'
                          : 'bg-amber-50 border-amber-200 text-amber-900 hover:bg-amber-100'
                      }`}
                    >
                      <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>💡 Hint / تلميح عملي</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-150 ${
                          hintOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {hintOpen && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="mt-2 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 leading-relaxed cursor-text"
                      >
                        {step.hint}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
