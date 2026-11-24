import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Eye,
  Filter,
  HelpCircle,
  Lightbulb,
  Play,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  XCircle
} from 'lucide-react';
import { QUIZ_MODULES } from '../data/quizData';
import { ProgressBar } from '../components/ui/ProgressBar';
import { EmptyState } from '../components/ui/EmptyState';

const DIFFICULTY_STYLES = {
  Easy: 'bg-emerald-500/10 text-emerald-800 border-emerald-500/30',
  Medium: 'bg-blue-50 text-blue-800 border-blue-200',
  Hard: 'bg-rose-50 text-rose-800 border-rose-200'
};

export function QuizPage({ appState, actions }) {
  const [activeModuleId, setActiveModuleId] = useState(null);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [topicFilter, setTopicFilter] = useState('all');
  const [retryIncorrectOnly, setRetryIncorrectOnly] = useState(false);

  // Optional countdown timer (seconds per question)
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(90);
  const [questionStartMs, setQuestionStartMs] = useState(() => Date.now());

  const activeModule = useMemo(
    () => QUIZ_MODULES.find((m) => m.moduleId === activeModuleId) || null,
    [activeModuleId]
  );

  const moduleProgress = useMemo(
    () => (activeModule ? appState.quizzes?.[activeModule.moduleId] || {} : {}),
    [activeModule, appState.quizzes]
  );

  const availableTopics = useMemo(() => {
    if (!activeModule) return [];
    const set = new Set((activeModule.questions || []).map((q) => q.topic));
    return ['all', ...Array.from(set)];
  }, [activeModule]);

  const filteredQuestions = useMemo(() => {
    if (!activeModule) return [];
    return (activeModule.questions || []).filter((q) => {
      if (difficultyFilter !== 'all' && q.difficulty !== difficultyFilter) return false;
      if (topicFilter !== 'all' && q.topic !== topicFilter) return false;
      if (retryIncorrectOnly) {
        const st = moduleProgress[q.id];
        return !st?.solved;
      }
      return true;
    });
  }, [activeModule, difficultyFilter, topicFilter, retryIncorrectOnly, moduleProgress]);

  const currentQuestion = filteredQuestions[questionIdx] || null;
  const currentQState = currentQuestion ? moduleProgress[currentQuestion.id] || null : null;

  // Determine whether the current question's answer should be visible in the DOM
  // CRITICAL: Never expose correctIndex or explanation until user submits OR clicks Reveal Answer.
  const isRevealed = Boolean(currentQState?.revealed);
  const isSolved = Boolean(currentQState?.solved);
  const hasSubmittedWrong =
    Boolean(currentQState) && !isSolved && !isRevealed && currentQState.selected !== null;
  const canShowFeedback = isSolved || isRevealed || hasSubmittedWrong;

  useEffect(() => {
    if (!currentQuestion) return;
    setSelectedOption(
      currentQState?.selected !== undefined && currentQState?.selected !== null
        ? currentQState.selected
        : null
    );
    setShowHint(false);
    setSecondsLeft(90);
    setQuestionStartMs(Date.now());
  }, [currentQuestion?.id]);

  useEffect(() => {
    if (!timerEnabled || !activeModule || !currentQuestion || canShowFeedback) return;
    const id = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [timerEnabled, activeModule, currentQuestion?.id, canShowFeedback]);

  // Global stats across all 7 modules (105 questions)
  const globalStats = useMemo(() => {
    let totalQuestions = 0;
    let totalSolved = 0;
    let completedModules = 0;

    QUIZ_MODULES.forEach((mod) => {
      const modProg = appState.quizzes?.[mod.moduleId] || {};
      const qCount = mod.questions.length;
      const solvedCount = mod.questions.filter((q) => modProg[q.id]?.solved === true).length;
      totalQuestions += qCount;
      totalSolved += solvedCount;
      if (qCount > 0 && solvedCount === qCount) completedModules++;
    });

    return { totalQuestions, totalSolved, completedModules };
  }, [appState.quizzes]);

  const openModuleQuiz = (modId, incorrectOnly = false) => {
    setActiveModuleId(modId);
    setDifficultyFilter('all');
    setTopicFilter('all');
    setRetryIncorrectOnly(incorrectOnly);
    setQuestionIdx(0);
    setSelectedOption(null);
    setShowHint(false);
  };

  const handleSubmitAnswer = () => {
    if (!activeModule || !currentQuestion || selectedOption === null) return;
    const elapsedSec = Math.max(1, Math.round((Date.now() - questionStartMs) / 1000));
    const isCorrect = selectedOption === currentQuestion.correctIndex;
    actions.saveQuizAttempt(activeModule.moduleId, currentQuestion.id, {
      selectedIndex: selectedOption,
      isCorrect,
      revealed: false,
      timeSpentSec: elapsedSec
    });
  };

  const handleRevealAnswer = () => {
    if (!activeModule || !currentQuestion) return;
    const elapsedSec = Math.max(1, Math.round((Date.now() - questionStartMs) / 1000));
    // CRITICAL: revealed: true NEVER marks solved: true
    actions.saveQuizAttempt(activeModule.moduleId, currentQuestion.id, {
      selectedIndex: selectedOption,
      isCorrect: false,
      revealed: true,
      timeSpentSec: elapsedSec
    });
  };

  const handleRetryCurrentQuestion = () => {
    setSelectedOption(null);
    setShowHint(false);
    setSecondsLeft(90);
    setQuestionStartMs(Date.now());
    if (activeModule && currentQuestion) {
      actions.clearQuizQuestionAttempt(activeModule.moduleId, currentQuestion.id);
    }
  };

  if (activeModule) {
    const solvedInModule = activeModule.questions.filter(
      (q) => moduleProgress[q.id]?.solved === true
    ).length;
    const totalInModule = activeModule.questions.length;
    const isModuleComplete = solvedInModule === totalInModule && totalInModule > 0;

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setActiveModuleId(null)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-bold transition"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة لقائمة الكويزات</span>
          </button>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setRetryIncorrectOnly((prev) => !prev);
                setQuestionIdx(0);
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition ${
                retryIncorrectOnly
                  ? 'bg-amber-500 text-white border-amber-500'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Incorrect Questions Only</span>
            </button>

            <button
              type="button"
              onClick={() => setTimerEnabled((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-mono font-bold transition ${
                timerEnabled
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{timerEnabled ? `مؤقت: ${secondsLeft}s` : 'تفعيل مؤقت السؤال'}</span>
            </button>
          </div>
        </div>

        {/* Module Header & Filters */}
        <div className="glass-v5-blue rounded-3xl p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-mono font-bold text-blue-700">
                MODULE {activeModule.moduleNumber} QUIZ
              </span>
              <h1 className="text-xl font-black text-slate-900 mt-0.5">{activeModule.title}</h1>
            </div>

            <div className="flex items-center gap-2">
              {isModuleComplete ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-900 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>✅ مكتمل ({solvedInModule}/{totalInModule})</span>
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-white border border-blue-200 font-mono text-xs font-bold text-blue-700">
                  المحلول بنجاح: {solvedInModule} / {totalInModule}
                </span>
              )}
            </div>
          </div>

          <ProgressBar value={solvedInModule} max={totalInModule} size="sm" />

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={difficultyFilter}
              onChange={(e) => {
                setDifficultyFilter(e.target.value);
                setQuestionIdx(0);
              }}
              aria-label="تصفية الصعوبة"
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700"
            >
              <option value="all">كل المستويات</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            <select
              value={topicFilter}
              onChange={(e) => {
                setTopicFilter(e.target.value);
                setQuestionIdx(0);
              }}
              aria-label="تصفية الموضوع"
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 max-w-xs"
            >
              {availableTopics.map((t) => (
                <option key={t} value={t}>
                  {t === 'all' ? 'كل المواضيع' : t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Single Active Question Card */}
        {!currentQuestion ? (
          <EmptyState
            icon={CheckCircle2}
            title={
              retryIncorrectOnly
                ? 'لا توجد أسئلة خاطئة أو غير محلولة في هذا الفلتر!'
                : 'لا توجد أسئلة مطابقة للفلتر الحالي'
            }
            description={
              retryIncorrectOnly
                ? 'أحسنت! تم حل جميع الأسئلة المطابقة بنجاح بدون كشف.'
                : 'غيّر فلاتر الصعوبة أو الموضوع لعرض الأسئلة.'
            }
            actionLabel="عرض كل أسئلة الموديول"
            onAction={() => {
              setRetryIncorrectOnly(false);
              setDifficultyFilter('all');
              setTopicFilter('all');
              setQuestionIdx(0);
            }}
          />
        ) : (
          <div className="glass-v5 rounded-3xl p-6 sm:p-8 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-white font-mono text-xs font-bold">
                  سؤال {questionIdx + 1} من {filteredQuestions.length}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold">
                  {currentQuestion.topic}
                </span>
                <span
                  className={`px-2.5 py-1 rounded-lg border text-xs font-mono font-bold ${
                    DIFFICULTY_STYLES[currentQuestion.difficulty] || DIFFICULTY_STYLES.Medium
                  }`}
                >
                  {currentQuestion.difficulty}
                </span>
              </div>

              {isSolved ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 border-l-4 border-emerald-500 text-emerald-900 text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>✅ مكتمل</span>
                </span>
              ) : isRevealed ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 text-xs font-bold">
                  <Eye className="w-3.5 h-3.5" />
                  <span>مكشوف (غير محسوب كمكتمل)</span>
                </span>
              ) : null}
            </div>

            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 leading-relaxed">
              {currentQuestion.question}
            </h2>

            {/* Options — NO correct answer styling or data-* leak before submit/reveal */}
            <div className="space-y-2.5">
              {currentQuestion.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                let optionClass =
                  'bg-white border-slate-200 text-slate-800 hover:border-blue-300 hover:bg-blue-50/40';

                if (canShowFeedback) {
                  if (idx === currentQuestion.correctIndex) {
                    optionClass =
                      'bg-emerald-500/10 border-emerald-500 border-l-4 text-emerald-950 font-bold';
                  } else if (isSelected) {
                    optionClass = 'bg-rose-50 border-rose-400 text-rose-900 font-bold';
                  } else {
                    optionClass = 'bg-slate-50 border-slate-200 text-slate-500';
                  }
                } else if (isSelected) {
                  optionClass =
                    'bg-blue-50 border-blue-600 ring-2 ring-blue-500/20 text-blue-950 font-bold';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isSolved || isRevealed}
                    onClick={() => setSelectedOption(idx)}
                    className={`w-full text-right p-4 rounded-2xl border transition flex items-start gap-3 ${optionClass}`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-slate-100 border border-slate-200 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 text-slate-700">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-xs sm:text-sm leading-relaxed flex-1">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex flex-wrap items-center gap-2">
                {!isSolved && !isRevealed && (
                  <button
                    type="button"
                    disabled={selectedOption === null}
                    onClick={handleSubmitAnswer}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-bold transition shadow-sm"
                  >
                    تأكيد الإجابة (Submit)
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setShowHint((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold transition"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>{showHint ? 'إخفاء التلميح' : 'تلميح (Hint)'}</span>
                </button>

                {!isSolved && !isRevealed && (
                  <button
                    type="button"
                    onClick={handleRevealAnswer}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>إظهار الإجابة (Reveal Answer)</span>
                  </button>
                )}

                {(isRevealed || hasSubmittedWrong) && (
                  <button
                    type="button"
                    onClick={handleRetryCurrentQuestion}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-800 text-xs font-bold transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>أعد المحاولة لحلها بنفسك</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={questionIdx === 0}
                  onClick={() => setQuestionIdx((i) => Math.max(0, i - 1))}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 text-xs font-bold text-slate-700"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>السابق</span>
                </button>
                <button
                  type="button"
                  disabled={questionIdx >= filteredQuestions.length - 1}
                  onClick={() =>
                    setQuestionIdx((i) => Math.min(filteredQuestions.length - 1, i + 1))
                  }
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-900 hover:bg-blue-700 disabled:opacity-40 text-xs font-bold text-white"
                >
                  <span>التالي</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {showHint && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 leading-relaxed">
                <strong className="block mb-1">تلميح:</strong>
                {currentQuestion.hint}
              </div>
            )}

            {/* Explanation only rendered after submit or reveal */}
            {canShowFeedback && (
              <div
                className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-1.5 ${
                  isSolved
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-950'
                    : isRevealed
                    ? 'bg-amber-50 border-amber-200 text-amber-950'
                    : 'bg-rose-50 border-rose-200 text-rose-950'
                }`}
              >
                <div className="font-extrabold flex items-center gap-1.5">
                  {isSolved ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>إجابة صحيحة! تم احتساب السؤال كمكتمل.</span>
                    </>
                  ) : isRevealed ? (
                    <>
                      <ShieldAlert className="w-4 h-4 text-amber-600" />
                      <span>
                        تم كشف الإجابة الصحيحة — هذا السؤال لم يُحتسب كمكتمل؛ أعد المحاولة واختر الإجابة الصحيحة بنفسك.
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-600" />
                      <span>إجابة غير دقيقة — راجع التفسير وأعد المحاولة.</span>
                    </>
                  )}
                </div>
                <p>{currentQuestion.explanation}</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Module Selector Cards View
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="glass-v5-blue rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-blue-700">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>INTERVIEW QUIZ BANK • 7 MODULES × 15 MCQS = {globalStats.totalQuestions} QUESTIONS</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            بنك اختبارات المقابلات التفاعلي
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            لا يكتمل أي موديول إلا بعد حل جميع أسئلته الـ 15 بإجابة صحيحة (كشف الإجابة لا يحتسب السؤال محلولاً).
          </p>
        </div>

        <div className="bg-white/90 rounded-2xl p-4 border border-blue-100 min-w-[230px] space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>إجمالي الأسئلة المحلولة</span>
            <span className="font-mono text-blue-700">
              {globalStats.totalSolved}/{globalStats.totalQuestions}
            </span>
          </div>
          <ProgressBar
            value={globalStats.totalSolved}
            max={globalStats.totalQuestions || 1}
            size="sm"
            showPercentage
          />
          <div className="text-[11px] font-mono text-slate-500">
            موديولات مكتملة: {globalStats.completedModules} / {QUIZ_MODULES.length}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {QUIZ_MODULES.map((mod) => {
          const modProg = appState.quizzes?.[mod.moduleId] || {};
          const total = mod.questions.length;
          const solved = mod.questions.filter((q) => modProg[q.id]?.solved === true).length;
          const wrongOrRevealed = mod.questions.filter(
            (q) => modProg[q.id] && !modProg[q.id].solved
          ).length;
          const isComplete = solved === total && total > 0;

          const diffCounts = mod.questions.reduce(
            (acc, q) => {
              acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
              return acc;
            },
            { Easy: 0, Medium: 0, Hard: 0 }
          );

          return (
            <div
              key={mod.id}
              className={`rounded-3xl p-6 flex flex-col justify-between gap-4 transition-all ${
                isComplete
                  ? 'bg-emerald-500/10 border-l-4 border-emerald-500 text-slate-900'
                  : 'glass-v5'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-white font-mono text-xs font-bold">
                    Module {mod.moduleNumber}
                  </span>

                  {isComplete ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-900 text-[11px] font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>✅ مكتمل ({solved}/{total})</span>
                    </span>
                  ) : (
                    <span className="font-mono text-xs font-bold text-blue-700">
                      {solved} / {total}
                    </span>
                  )}
                </div>

                <div>
                  <h2 className="text-base font-extrabold text-slate-900">{mod.title}</h2>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                    {mod.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 text-[10px] font-mono font-bold">
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800">
                    Easy: {diffCounts.Easy}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800">
                    Medium: {diffCounts.Medium}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-800">
                    Hard: {diffCounts.Hard}
                  </span>
                </div>
              </div>

              <div className="space-y-2.5">
                <ProgressBar value={solved} max={total} size="sm" />

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => openModuleQuiz(mod.moduleId, false)}
                    className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{solved > 0 ? 'متابعة الاختبار' : 'بدء الاختبار'}</span>
                  </button>

                  {wrongOrRevealed > 0 && (
                    <button
                      type="button"
                      onClick={() => openModuleQuiz(mod.moduleId, true)}
                      title="إعادة المحاولة للأسئلة الخاطئة أو المكشوفة فقط"
                      className="py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold flex items-center gap-1 transition"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>الخاطئة ({wrongOrRevealed})</span>
                    </button>
                  )}

                  {Object.keys(modProg).length > 0 && (
                    <button
                      type="button"
                      onClick={() => actions.resetQuizModule(mod.moduleId, false)}
                      title="إعادة ضبط كويز هذا الموديول"
                      className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 transition"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
