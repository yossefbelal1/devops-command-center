import React, { useState } from 'react';
import {
  Check,
  Clock,
  Download,
  Plus,
  Printer,
  RotateCcw,
  Trash2,
  Upload
} from 'lucide-react';
import { CountUp } from './ReactBitsUI';

export function AnalyticsView({
  data,
  progress,
  metrics,
  onToggleSubtask,
  onAddSession,
  onDeleteSession,
  onExportJSON,
  onImportJSON,
  onReset
}) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [hours, setHours] = useState('');
  const [topic, setTopic] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const h = parseFloat(hours);
    if (!h || !topic.trim()) return;
    onAddSession({
      id: `sess-${Date.now()}`,
      date,
      hours: h,
      topic: topic.trim(),
      notes: notes.trim()
    });
    setHours('');
    setTopic('');
    setNotes('');
  };

  const moduleStats = data.modules.map((mod) => {
    let total = 0;
    let done = 0;
    mod.topics.forEach((t) => {
      t.subtasks.forEach((s) => {
        total++;
        const isDone = progress.subtasks[s.id] !== undefined ? progress.subtasks[s.id] : s.done;
        if (isDone) done++;
      });
    });
    return {
      ...mod,
      done,
      total,
      pct: total > 0 ? Math.round((done / total) * 100) : 0
    };
  });

  const loggedHours = progress.studySessions.reduce((sum, s) => sum + (s.hours || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <span className="text-[11px] font-mono uppercase tracking-widest text-blue-600 font-bold">
          PROGRESS MATRIX & STUDY LOG
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
          لوحة التقدم السريعة — كل نقاطك في نظرة واحدة
        </h1>
      </div>

      {/* Top Glassy Blue-and-White Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 glass-v5-blue rounded-3xl p-6 flex flex-col justify-between space-y-6">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">نظرة عامة على الإنجاز</h2>
            <p className="text-xs text-slate-500 mt-0.5">نسبة إتمام كافة النقاط الفرعية بالمسار</p>
          </div>

          <div className="flex items-center justify-center py-2">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="#DBEAFE" strokeWidth="12" />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={314.16}
                  strokeDashoffset={314.16 - (314.16 * metrics.overallPct) / 100}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-slate-900 font-mono">
                  <CountUp to={metrics.overallPct} suffix="%" />
                </span>
                <span className="text-[11px] font-bold text-slate-500">مكتمل</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/90 rounded-2xl p-3.5 border border-blue-100 text-center">
              <span className="text-[11px] font-bold text-slate-500 block">نقاط منجزة</span>
              <span className="text-lg font-black text-blue-600 font-mono">
                {metrics.doneSubtasks}/{metrics.totalSubtasks}
              </span>
            </div>
            <div className="bg-white/90 rounded-2xl p-3.5 border border-blue-100 text-center">
              <span className="text-[11px] font-bold text-slate-500 block">ساعات مسجلة</span>
              <span className="text-lg font-black text-emerald-600 font-mono">{loggedHours}h</span>
            </div>
          </div>
        </div>

        {/* Module-by-Module Progress Bars */}
        <div className="lg:col-span-8 glass-v5 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900">
              ملخص التقدم لكل موديول (01 – 07)
            </h2>
            <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              {metrics.doneSubtasks}/{metrics.totalSubtasks} نقطة
            </span>
          </div>

          <div className="space-y-3.5">
            {moduleStats.map((m) => (
              <div key={m.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 truncate max-w-[70%]">
                    <span className="font-mono text-blue-600 ml-1.5">{m.number}</span>
                    {m.title}
                  </span>
                  <span className="font-mono font-bold text-slate-600 shrink-0">
                    {m.done}/{m.total} ({m.pct}%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      m.pct === 100
                        ? 'bg-emerald-500'
                        : m.pct > 0
                        ? 'bg-blue-600'
                        : 'bg-slate-300'
                    }`}
                    style={{ width: `${m.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* COMPACT VISUAL CHECKLIST MATRIX (No long explanations - pure status check!) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-slate-900">
            خريطة جميع النقاط السريعة (اضغط للتعليم مباشرة)
          </h2>
          <span className="text-xs text-slate-500 font-semibold">
            ✓ منجز • ◌ قيد التنفيذ/متبقي
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {moduleStats.map((mod) => (
            <div
              key={mod.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5 mb-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-[11px] font-bold shrink-0 ${
                        mod.pct === 100
                          ? 'bg-emerald-500 text-white'
                          : mod.pct > 0
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {mod.number}
                    </span>
                    <h3 className="text-xs font-extrabold text-slate-900 truncate">{mod.title}</h3>
                  </div>
                  <span
                    className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      mod.pct === 100
                        ? 'bg-emerald-50 text-emerald-700'
                        : mod.pct > 0
                        ? 'bg-blue-50 text-blue-700'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {mod.pct}%
                  </span>
                </div>

                <div className="space-y-2.5 max-h-64 overflow-y-auto pl-1">
                  {mod.topics.map((topic) => (
                    <div key={topic.id} className="space-y-1">
                      <div className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
                        <span className="font-mono text-blue-600">{topic.code}</span>
                        <span className="truncate">{topic.title}</span>
                      </div>
                      <div className="space-y-1 pr-2">
                        {topic.subtasks.map((sub) => {
                          const isDone =
                            progress.subtasks[sub.id] !== undefined
                              ? progress.subtasks[sub.id]
                              : sub.done;
                          return (
                            <button
                              key={sub.id}
                              onClick={() => onToggleSubtask(topic, sub.id)}
                              className={`w-full flex items-start gap-2 text-right px-2 py-1 rounded-lg transition text-[11px] ${
                                isDone
                                  ? 'bg-emerald-50/60 text-slate-500 hover:bg-emerald-50'
                                  : 'hover:bg-slate-50 text-slate-800'
                              }`}
                            >
                              <span
                                className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 border transition ${
                                  isDone
                                    ? 'bg-emerald-500 border-emerald-500 text-white'
                                    : 'border-slate-300 bg-white'
                                }`}
                              >
                                {isDone && <Check className="w-2.5 h-2.5" strokeWidth={3} />}
                              </span>
                              <span className={isDone ? 'line-through' : 'font-medium'}>
                                {sub.text}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Study Logger + Backup Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4"
        >
          <div className="flex items-center gap-2 text-base font-extrabold text-slate-900">
            <Clock className="w-5 h-5 text-blue-600" />
            <span>تسجيل جلسة مذاكرة جديدة</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 block">التاريخ</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-mono focus:outline-none focus:bg-white focus:border-blue-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 block">الساعات</label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                max="16"
                placeholder="2"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-mono focus:outline-none focus:bg-white focus:border-blue-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 block">الموضوع / اللاب</label>
            <input
              type="text"
              placeholder="Corey Schafer venv + pip على RHEL VM"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:outline-none focus:bg-white focus:border-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 block">ملاحظات (اختياري)</label>
            <textarea
              rows={2}
              placeholder="ملاحظة سريعة..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:outline-none focus:bg-white focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm shadow-blue-600/20 transition"
          >
            <Plus className="w-4 h-4" />
            <span>حفظ الجلسة</span>
          </button>
        </form>

        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="text-base font-extrabold text-slate-900">النسخ الاحتياطي</h3>
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={onExportJSON}
                className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>تصدير JSON</span>
              </button>

              <label className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition">
                <Upload className="w-3.5 h-3.5" />
                <span>استيراد JSON</span>
                <input type="file" accept=".json" onChange={onImportJSON} className="hidden" />
              </label>

              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>طباعة / PDF</span>
              </button>

              <button
                onClick={onReset}
                className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold flex items-center gap-1.5 transition mr-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة تعيين</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900">سجل الجلسات</h3>
              <span className="text-xs font-mono font-bold text-blue-600">
                {progress.studySessions.length} جلسة
              </span>
            </div>

            {progress.studySessions.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-400">
                لم تسجل أي جلسة بعد.
              </div>
            ) : (
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {progress.studySessions.map((s) => (
                  <div
                    key={s.id}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{s.topic}</span>
                        <span className="text-[11px] font-mono text-slate-400">{s.date}</span>
                      </div>
                      {s.notes && <p className="text-xs text-slate-500 mt-0.5">{s.notes}</p>}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-700 font-mono text-xs font-bold">
                        {s.hours}h
                      </span>
                      <button
                        onClick={() => onDeleteSession(s.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
