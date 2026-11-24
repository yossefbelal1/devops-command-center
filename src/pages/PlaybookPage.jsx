import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown, Code2, Lightbulb, AlertCircle } from 'lucide-react';
import { PLAYBOOK_DECISIONS } from '../data/playbookData';

export function PlaybookPage() {
  const [searchParams] = useSearchParams();
  const stepParam = searchParams.get('step');
  const [openSteps, setOpenSteps] = useState({
    '01': true,
    ...(stepParam ? { [stepParam]: true } : {})
  });

  useEffect(() => {
    if (stepParam) {
      setOpenSteps((prev) => ({ ...prev, [stepParam]: true }));
    }
  }, [stepParam]);

  const toggleStep = (step) => {
    setOpenSteps((prev) => ({ ...prev, [step]: !prev[step] }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-blue-600 font-bold">
            ENGINEERING PLAYBOOK • 12 CHRONOLOGICAL DECISIONS
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            امتى تستخدم كل أداة؟ (دليل القرارات الهندسية)
          </h1>
        </div>

        <div className="flex items-center gap-2 self-start">
          <button
            type="button"
            onClick={() => {
              const all = {};
              PLAYBOOK_DECISIONS.forEach((d) => {
                all[d.step] = true;
              });
              setOpenSteps(all);
            }}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50"
          >
            فتح الكل
          </button>
          <button
            type="button"
            onClick={() => setOpenSteps({})}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50"
          >
            طي الكل
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {PLAYBOOK_DECISIONS.map((item) => {
          const isOpen = !!openSteps[item.step];
          return (
            <div
              key={item.step}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden"
            >
              <div
                onClick={() => toggleStep(item.step)}
                className="p-5 cursor-pointer hover:bg-slate-50/70 transition flex items-center justify-between gap-4 select-none"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-blue-600 text-white font-mono text-xs font-bold">
                      #{item.step}
                    </span>
                    <span className="text-[11px] font-bold text-blue-700">{item.stage}</span>
                    {item.hiveboxStage && (
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-mono text-[10px] font-bold">
                        {item.hiveboxStage}
                      </span>
                    )}
                  </div>
                  <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                    {item.title}
                  </h2>
                </div>

                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ${
                    isOpen ? 'rotate-180 text-blue-600' : ''
                  }`}
                />
              </div>

              <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
                <div className="accordion-inner">
                  <div className="p-5 pt-2 border-t border-slate-100 space-y-4 text-xs sm:text-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
                        <strong className="text-slate-900 block mb-1">المشكلة التي تحلها:</strong>
                        <p className="text-slate-700 leading-relaxed">{item.whatProblem}</p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
                        <strong className="text-slate-900 block mb-1">كيف تعمل داخلياً؟</strong>
                        <p className="text-slate-700 leading-relaxed">{item.howItWorks}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                        <strong className="text-emerald-900 block">متى تستخدمها؟</strong>
                        <p className="text-slate-800 leading-relaxed">{item.whenToUse}</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1">
                        <strong className="text-amber-900 flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>متى لا تستخدمها؟</span>
                        </strong>
                        <p className="text-slate-800 leading-relaxed">{item.whenNotToUse}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/70 space-y-1">
                        <strong className="text-blue-900 flex items-center gap-1.5">
                          <Code2 className="w-3.5 h-3.5" />
                          <span>مثال عملي في مشاريعك:</span>
                        </strong>
                        <p className="text-slate-800 leading-relaxed">{item.practicalExample}</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/70 space-y-1">
                        <strong className="text-indigo-900 flex items-center gap-1.5">
                          <Lightbulb className="w-3.5 h-3.5" />
                          <span>سيناريو القرار:</span>
                        </strong>
                        <p className="text-slate-800 leading-relaxed">{item.decisionScenario}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
                        <strong className="text-slate-900 block">المفاضلات (Trade-offs):</strong>
                        <p className="text-slate-700 leading-relaxed">{item.tradeOffs}</p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
                        <strong className="text-slate-900 block">البدائل (Alternatives):</strong>
                        <p className="text-xs font-mono text-slate-700 leading-relaxed">
                          {item.alternatives}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
