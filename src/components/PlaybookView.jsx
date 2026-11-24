import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Code2,
  Eye,
  GitCompare,
  HelpCircle,
  Lightbulb,
  Sparkles,
  XCircle
} from 'lucide-react';

export function PlaybookView({ data, progress, onSaveQuizProgress }) {
  const [subTab, setSubTab] = useState('decisions');
  const [openDecisions, setOpenDecisions] = useState({ '01': true });
  const [openQuizId, setOpenQuizId] = useState(null);
  const [quizStep, setQuizStep] = useState({}); // { quizId: questionIndex }
  const [showHint, setShowHint] = useState({}); // { questionId: bool }
  const [revealedSolution, setRevealedSolution] = useState({}); // { questionId: bool }

  const toggleDecision = (step) => {
    setOpenDecisions((prev) => ({ ...prev, [step]: !prev[step] }));
  };

  const toggleQuizCard = (quizId) => {
    setOpenQuizId((prev) => (prev === quizId ? null : quizId));
  };

  const getQIndex = (quizId) => quizStep[quizId] || 0;

  const handleSelectOption = (quiz, q, optionIdx) => {
    const isCorrect = optionIdx === q.correctIndex;
    onSaveQuizProgress(quiz.id, q.id, {
      selected: optionIdx,
      solved: isCorrect
    });
  };

  const handleRevealSolution = (quiz, q) => {
    setRevealedSolution((prev) => ({ ...prev, [q.id]: true }));
    onSaveQuizProgress(quiz.id, q.id, {
      selected: q.correctIndex,
      solved: true
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header & Sub-tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-blue-600 font-bold">
            BUILD TIMELINE DECISIONS & INTERACTIVE QUIZ BANK
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            امتى تستخدم كل أداة؟ واختبارات المقابلات التفاعلية
          </h1>
        </div>

        <div className="inline-flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs self-start">
          <button
            onClick={() => setSubTab('decisions')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
              subTab === 'decisions'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <GitCompare className="w-4 h-4" />
            <span>امتى أستخدم إيه؟ (Build Order)</span>
          </button>

          <button
            onClick={() => setSubTab('interview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
              subTab === 'interview'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>كويز المقابلات (30 سؤال)</span>
          </button>
        </div>
      </div>

      {/* ================================================================ */}
      {/* SUB-TAB 1: REAL PROJECT BUILD TIMELINE SCROLLING                 */}
      {/* ================================================================ */}
      {subTab === 'decisions' && (
        <div className="space-y-6">
          <div className="glass-v5-blue rounded-2xl p-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs sm:text-sm text-slate-700 font-semibold">
              مرتبة خطوة بخطوة كأنك تبني مشروعاً حقيقياً (HiveBox / AutoTele) من السطر الأول حتى
              الإنتاج — اضغط على أي خطوة لفتحها وإغلاقها:
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const all = {};
                  data.whenToUseWhat.forEach((w) => (all[w.step] = true));
                  setOpenDecisions(all);
                }}
                className="px-3 py-1.5 rounded-lg bg-white text-slate-700 text-xs font-bold border border-slate-200 hover:bg-slate-50"
              >
                فتح الكل
              </button>
              <button
                onClick={() => setOpenDecisions({})}
                className="px-3 py-1.5 rounded-lg bg-white text-slate-700 text-xs font-bold border border-slate-200 hover:bg-slate-50"
              >
                طي الكل
              </button>
            </div>
          </div>

          <div className="relative space-y-4 md:pr-9 md:before:content-[''] md:before:absolute md:before:right-3.5 md:before:top-5 md:before:bottom-5 md:before:w-[2px] md:before:bg-slate-200">
            {data.whenToUseWhat.map((item) => {
              const isOpen = !!openDecisions[item.step];

              return (
                <div key={item.step} className="relative">
                  <div className="hidden md:flex absolute -right-[33px] top-6 w-7 h-7 rounded-full bg-blue-600 text-white font-mono text-xs font-bold items-center justify-center z-10 ring-4 ring-blue-100">
                    {item.step}
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
                    <div
                      onClick={() => toggleDecision(item.step)}
                      className="p-5 cursor-pointer hover:bg-slate-50/70 transition flex items-center justify-between gap-4 select-none"
                    >
                      <div className="space-y-1">
                        <span className="text-[11px] font-mono font-bold text-blue-600 block">
                          خطوة بناء {item.step} • {item.stage}
                        </span>
                        <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                          {item.title}
                        </h2>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-blue-600' : ''
                        }`}
                      />
                    </div>

                    <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
                      <div className="accordion-inner">
                        <div className="p-5 pt-0 border-t border-slate-100 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                              <span className="text-xs font-extrabold text-blue-700 block">
                                {item.leftName}
                              </span>
                              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                                {item.leftWhen}
                              </p>
                            </div>

                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                              <span className="text-xs font-extrabold text-indigo-700 block">
                                {item.rightName}
                              </span>
                              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                                {item.rightWhen}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80 space-y-1">
                              <span className="text-xs font-extrabold text-emerald-800 flex items-center gap-1.5">
                                <Code2 className="w-3.5 h-3.5" />
                                مثال عملي من مشاريعك:
                              </span>
                              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                                {item.example}
                              </p>
                            </div>

                            <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 space-y-1">
                              <span className="text-xs font-extrabold text-blue-900 flex items-center gap-1.5">
                                <Lightbulb className="w-3.5 h-3.5 text-blue-600" />
                                القاعدة الذهبية:
                              </span>
                              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-semibold">
                                {item.rule}
                              </p>
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
        </div>
      )}

      {/* ================================================================ */}
      {/* SUB-TAB 2: INTERACTIVE QUIZ MODE CARDS (6 Cards x 5 Questions)   */}
      {/* ================================================================ */}
      {subTab === 'interview' && (
        <div className="space-y-6">
          <div className="glass-v5-blue rounded-2xl p-5 flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-0.5">
              <h2 className="text-sm font-extrabold text-slate-900">
                وضع الاختبار التفاعلي (Quiz Mode)
              </h2>
              <p className="text-xs text-slate-600">
                افتح أي كارت لحل أسئلته خطوة بخطوة (Next/Prev) مع أزرار التلميح (Hint) والحل
                المباشر. <strong>لا يكتمل الكارت إلا بعد حل جميع أسئلته!</strong>
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {data.interviewQuizzes.map((quiz) => {
              const isOpen = openQuizId === quiz.id;
              const quizProg = progress.quizzes[quiz.id] || {};
              const solvedCount = quiz.questions.filter((q) => quizProg[q.id]?.solved).length;
              const totalCount = quiz.questions.length;
              const isCardCompleted = solvedCount === totalCount;

              const currentIndex = getQIndex(quiz.id);
              const activeQ = quiz.questions[currentIndex];
              const qState = quizProg[activeQ.id] || {};
              const isHintShown = !!showHint[activeQ.id];
              const isSolutionShown = !!revealedSolution[activeQ.id] || qState.solved;

              return (
                <div
                  key={quiz.id}
                  className={`bg-white rounded-3xl border shadow-sm overflow-hidden transition-all ${
                    isCardCompleted
                      ? 'border-emerald-300'
                      : isOpen
                      ? 'border-blue-300 shadow-md'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Card Collapsed/Header Row */}
                  <div
                    onClick={() => toggleQuizCard(quiz.id)}
                    className="p-5 sm:p-6 cursor-pointer hover:bg-slate-50/70 transition flex items-center justify-between gap-4 select-none"
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700">
                          {quiz.badge}
                        </span>
                        {isCardCompleted ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                            <CheckCircle2 className="w-3.5 h-3.5" /> مكتمل بالكامل
                          </span>
                        ) : (
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            محلول: {solvedCount} من {totalCount}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                        {quiz.domain}
                      </h3>
                      <p className="text-xs text-slate-500">{quiz.desc}</p>
                    </div>

                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </div>

                  {/* Interactive Quiz Mode Inside Card */}
                  {isOpen && (
                    <div className="border-t border-slate-100 bg-slate-50/50 p-5 sm:p-6 space-y-5">
                      {/* Stepper Dots Header */}
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-1.5">
                          {quiz.questions.map((q, idx) => {
                            const isQSolved = quizProg[q.id]?.solved;
                            const isCurr = idx === currentIndex;
                            return (
                              <button
                                key={q.id}
                                onClick={() =>
                                  setQuizStep((prev) => ({ ...prev, [quiz.id]: idx }))
                                }
                                className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center transition ${
                                  isCurr
                                    ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                                    : isQSolved
                                    ? 'bg-emerald-500 text-white'
                                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                                }`}
                              >
                                {isQSolved && !isCurr ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                              </button>
                            );
                          })}
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-500">
                          السؤال {currentIndex + 1} من {totalCount}
                        </span>
                      </div>

                      {/* Active Question Box */}
                      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-5 shadow-xs">
                        <h4 className="text-base sm:text-lg font-extrabold text-slate-900 leading-relaxed">
                          {activeQ.question}
                        </h4>

                        {/* Options */}
                        <div className="space-y-2.5">
                          {activeQ.options.map((opt, oIdx) => {
                            const isSelected = qState.selected === oIdx;
                            const isCorrectOpt = oIdx === activeQ.correctIndex;
                            let btnStyle =
                              'bg-slate-50 border-slate-200 text-slate-800 hover:bg-blue-50/60 hover:border-blue-300';

                            if (isSelected) {
                              btnStyle = isCorrectOpt
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-200'
                                : 'bg-rose-50 border-rose-400 text-rose-900 ring-2 ring-rose-200';
                            } else if (isSolutionShown && isCorrectOpt) {
                              btnStyle =
                                'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-200';
                            }

                            return (
                              <button
                                key={oIdx}
                                onClick={() => handleSelectOption(quiz, activeQ, oIdx)}
                                className={`w-full text-right p-4 rounded-xl border text-xs sm:text-sm font-semibold transition flex items-center justify-between gap-3 ${btnStyle}`}
                              >
                                <div className="flex items-center gap-3">
                                  <span className="w-6 h-6 rounded-lg bg-white border border-slate-200 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                                    {String.fromCharCode(65 + oIdx)}
                                  </span>
                                  <span>{opt}</span>
                                </div>
                                {isSelected && !isCorrectOpt && (
                                  <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                                )}
                                {(isSelected || isSolutionShown) && isCorrectOpt && (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Helper Buttons: Hint & Direct Solution */}
                        <div className="flex flex-wrap items-center gap-2.5 pt-1">
                          <button
                            onClick={() =>
                              setShowHint((prev) => ({
                                ...prev,
                                [activeQ.id]: !prev[activeQ.id]
                              }))
                            }
                            className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold flex items-center gap-1.5 transition"
                          >
                            <Lightbulb className="w-3.5 h-3.5" />
                            <span>{isHintShown ? 'إخفاء التلميح' : 'تلميح (Hint)'}</span>
                          </button>

                          <button
                            onClick={() => handleRevealSolution(quiz, activeQ)}
                            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>الحل المباشر + الشرح</span>
                          </button>
                        </div>

                        {/* Hint Panel */}
                        {isHintShown && (
                          <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 font-medium leading-relaxed">
                            <strong>تلميح: </strong>
                            {activeQ.hint}
                          </div>
                        )}

                        {/* Solution & Quick Explanation Panel */}
                        {isSolutionShown && (
                          <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-1">
                            <span className="text-xs font-extrabold text-emerald-800 flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5" />
                              الشرح السريع والحل الصحيح:
                            </span>
                            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                              {activeQ.explanation}
                            </p>
                          </div>
                        )}

                        {/* Previous / Next Navigation */}
                        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                          <button
                            disabled={currentIndex === 0}
                            onClick={() =>
                              setQuizStep((prev) => ({
                                ...prev,
                                [quiz.id]: Math.max(0, currentIndex - 1)
                              }))
                            }
                            className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition"
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                            <span>السابق</span>
                          </button>

                          <button
                            disabled={currentIndex === totalCount - 1}
                            onClick={() =>
                              setQuizStep((prev) => ({
                                ...prev,
                                [quiz.id]: Math.min(totalCount - 1, currentIndex + 1)
                              }))
                            }
                            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition"
                          >
                            <span>التالي (Next)</span>
                            <ArrowLeft className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
