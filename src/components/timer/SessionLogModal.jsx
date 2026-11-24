import React, { useState, useEffect, useRef } from 'react';
import { X, Clock, CheckCircle2, AlertTriangle, Link as LinkIcon, Star } from 'lucide-react';
import {
  STUDY_CATEGORIES,
  STUDY_DIFFICULTIES,
  normalizeCategory,
  normalizeDifficulty,
  formatDuration
} from './timerUtils';

const EMPTY_DATA = {};

export function SessionLogModal({
  isOpen,
  mode = 'complete', // 'complete' | 'manual'
  onClose,
  onSubmit,
  topics = [],
  initialData = EMPTY_DATA
}) {
  const [topicId, setTopicId] = useState('');
  const [topicTitle, setTopicTitle] = useState('');
  const [category, setCategory] = useState('lab');
  const [difficulty, setDifficulty] = useState('intermediate');
  const [estimatedMinutes, setEstimatedMinutes] = useState(60);
  const [actualActiveMinutes, setActualActiveMinutes] = useState(30);
  const [pausedMinutes, setPausedMinutes] = useState(0);
  const [confidence, setConfidence] = useState(4);
  const [interrupted, setInterrupted] = useState(false);
  const [note, setNote] = useState('');
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      wasOpenRef.current = false;
      return;
    }
    if (wasOpenRef.current) return;
    wasOpenRef.current = true;

    const defaultTopicId = initialData.topicId ?? topics[0]?.id ?? '';
    const matchedTopic = topics.find((t) => t.id === defaultTopicId);

    setTopicId(defaultTopicId);
    setTopicTitle(initialData.topicTitle || matchedTopic?.title || '');
    setCategory(normalizeCategory(initialData.category || matchedTopic?.category));
    setDifficulty(normalizeDifficulty(initialData.difficulty || matchedTopic?.difficulty));
    setEstimatedMinutes(
      Number(initialData.estimatedMinutes || matchedTopic?.estimatedMinutes || (matchedTopic?.hours || 1) * 60)
    );

    const activeMinsFromSecs =
      initialData.activeSeconds !== undefined
        ? Math.max(1, Math.round(initialData.activeSeconds / 60))
        : Number(initialData.actualActiveMinutes || 30);
    const pausedMinsFromSecs =
      initialData.pausedSeconds !== undefined
        ? Math.max(0, Math.round(initialData.pausedSeconds / 60))
        : Number(initialData.pausedMinutes || 0);

    setActualActiveMinutes(activeMinsFromSecs);
    setPausedMinutes(pausedMinsFromSecs);
    setConfidence(Number(initialData.confidence || 4));
    setInterrupted(Boolean(initialData.interrupted));
    setNote(initialData.note || '');
    setEvidenceUrl(initialData.evidenceUrl || '');
  }, [isOpen, initialData, topics]);

  if (!isOpen) return null;

  const handleTopicSelect = (nextId) => {
    setTopicId(nextId);
    const found = topics.find((t) => t.id === nextId);
    if (found) {
      setTopicTitle(found.title);
      setCategory(normalizeCategory(found.category));
      setDifficulty(normalizeDifficulty(found.difficulty));
      setEstimatedMinutes(Number(found.estimatedMinutes || (found.hours || 1) * 60));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const activeMins = Math.max(1, Number(actualActiveMinutes) || 1);
    const pausedMins = Math.max(0, Number(pausedMinutes) || 0);
    const estMins = Math.max(5, Number(estimatedMinutes) || 60);

    onSubmit({
      topicId: topicId || null,
      topicTitle: topicTitle.trim() || 'جلسة مذاكرة DevOps',
      category,
      difficulty,
      estimatedMinutes: estMins,
      actualActiveMinutes: activeMins,
      pausedMinutes: pausedMins,
      activeSeconds:
        initialData.activeSeconds !== undefined && mode === 'complete'
          ? initialData.activeSeconds
          : activeMins * 60,
      pausedSeconds:
        initialData.pausedSeconds !== undefined && mode === 'complete'
          ? initialData.pausedSeconds
          : pausedMins * 60,
      confidence,
      interrupted,
      note: note.trim(),
      evidenceUrl: evidenceUrl.trim(),
      completedAt: new Date().toISOString(),
      source: mode === 'manual' ? 'manual' : 'timer'
    });
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-slate-900/45 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8"
      >
        <div className="px-6 py-4 bg-gradient-to-l from-blue-50/80 to-white border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm shadow-blue-600/20">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">
                {mode === 'complete' ? 'إنهاء وحفظ جلسة المذاكرة' : 'تسجيل جلسة مذاكرة يدوية'}
              </h3>
              <p className="text-[11px] text-slate-500">
                الوقت الفعلي يُحسب بدقة مع فصل وقت التوقف لتحديث سرعة التعلّم
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {mode === 'complete' && (
            <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-blue-50/70 border border-blue-100">
              <div>
                <div className="text-[11px] font-bold text-slate-500">الوقت النشط الفعلي</div>
                <div className="text-base font-black font-mono text-blue-700">
                  {formatDuration(initialData.activeSeconds || 0)}
                </div>
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-500">وقت التوقف (مستبعد)</div>
                <div className="text-base font-black font-mono text-amber-700">
                  {formatDuration(initialData.pausedSeconds || 0)}
                </div>
              </div>
            </div>
          )}

          {topics.length > 0 && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">الموضوع المرتبط</label>
              <select
                value={topicId}
                onChange={(e) => handleTopicSelect(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-none focus:bg-white focus:border-blue-500"
              >
                {topics.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.code ? `${t.code} — ` : ''}
                    {t.title}
                  </option>
                ))}
                <option value="">موضوع مخصص / آخر</option>
              </select>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">عنوان الجلسة</label>
            <input
              type="text"
              value={topicTitle}
              onChange={(e) => setTopicTitle(e.target.value)}
              placeholder="مثال: Python DevOps Libraries — Requests & JSON"
              required
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">التصنيف (Category)</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-none focus:bg-white focus:border-blue-500"
              >
                {STUDY_CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">الصعوبة (Difficulty)</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-none focus:bg-white focus:border-blue-500"
              >
                {STUDY_DIFFICULTIES.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 block">المدة النشطة (دقيقة)</label>
              <input
                type="number"
                min="1"
                max="720"
                value={actualActiveMinutes}
                onChange={(e) => setActualActiveMinutes(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 block">مدة التوقف (دقيقة)</label>
              <input
                type="number"
                min="0"
                max="720"
                value={pausedMinutes}
                onChange={(e) => setPausedMinutes(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-mono text-slate-700 focus:outline-none focus:bg-white focus:border-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 block">المقدّر (دقيقة)</label>
              <input
                type="number"
                min="5"
                max="2400"
                value={estimatedMinutes}
                onChange={(e) => setEstimatedMinutes(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-mono text-slate-700 focus:outline-none focus:bg-white focus:border-blue-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              مستوى الثقة والاستيعاب (1 – 5)
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((lvl) => {
                const active = confidence >= lvl;
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setConfidence(lvl)}
                    className={`flex-1 py-2 rounded-xl border text-xs font-mono font-bold flex items-center justify-center gap-1 transition ${
                      confidence === lvl
                        ? 'bg-blue-600 border-blue-600 text-white shadow-sm shadow-blue-600/20'
                        : active
                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                        : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${active ? 'fill-current' : ''}`} />
                    <span>{lvl}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <label className="flex items-start gap-2.5 p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80 cursor-pointer">
            <input
              type="checkbox"
              checked={interrupted}
              onChange={(e) => setInterrupted(e.target.checked)}
              className="mt-0.5 rounded border-amber-400 text-amber-600 focus:ring-amber-500"
            />
            <div className="text-xs">
              <div className="font-bold text-amber-900 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>جلسة متقطعة (Interrupted)</span>
              </div>
              <p className="text-[11px] text-amber-800/80 mt-0.5">
                عند التفعيل سيتم استبعادها أو تقليل وزنها في حساب التوقع التكيفي حتى لا تشوّه سرعتك الحقيقية.
              </p>
            </div>
          </label>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5 text-slate-400" />
              <span>رابط إثبات / PR / GitHub (اختياري)</span>
            </label>
            <input
              type="url"
              value={evidenceUrl}
              onChange={(e) => setEvidenceUrl(e.target.value)}
              placeholder="https://github.com/yossefbelal1/Hivebox/pull/..."
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-mono text-slate-800 focus:outline-none focus:bg-white focus:border-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">ملاحظة / ما تم إنجازه</label>
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="ما العقبات التي واجهتك أو الخطوة القادمة؟"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-blue-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm shadow-blue-600/25 transition"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>حفظ الجلسة</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
