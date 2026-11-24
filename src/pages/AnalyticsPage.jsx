import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Edit3,
  ExternalLink,
  Gauge,
  PlusCircle,
  Star,
  Trash2,
  ArrowLeft
} from 'lucide-react';
import {
  CATEGORY_LABELS,
  DIFFICULTY_LABELS,
  FORECAST_CATEGORIES,
  FORECAST_DIFFICULTIES
} from '../services/adaptiveForecast';
import { ProgressBar } from '../components/ui/ProgressBar';
import { StatusBadge } from '../components/ui/StatusBadge';
import { EmptyState } from '../components/ui/EmptyState';
import { ForecastTrendChart } from '../components/charts/ForecastTrendChart';
import { SessionLogModal } from '../components/timer/SessionLogModal';

const CONFIDENCE_CLASS = {
  High: 'bg-emerald-500/10 text-emerald-800 border-emerald-500/30',
  Medium: 'bg-blue-50 text-blue-800 border-blue-200',
  Low: 'bg-slate-100 text-slate-600 border-slate-200'
};

export function AnalyticsPage({
  appState,
  metrics,
  forecast,
  allTopics = [],
  actions
}) {
  const [editingSession, setEditingSession] = useState(null);
  const [manualModalOpen, setManualModalOpen] = useState(false);

  const sessions = appState.studySessions || [];

  const totals = useMemo(() => {
    let activeMins = 0;
    let pausedMins = 0;
    let validCount = 0;
    let interruptedCount = 0;

    for (const s of sessions) {
      activeMins += Number(s.actualActiveMinutes) || Math.round((Number(s.hours) || 0) * 60);
      pausedMins += Number(s.pausedMinutes) || 0;
      if (s.interrupted) interruptedCount++;
      else validCount++;
    }

    return {
      totalActiveHours: (activeMins / 60).toFixed(1),
      totalPausedMins: pausedMins,
      validCount,
      interruptedCount
    };
  }, [sessions]);

  // Build full matrix of active or observed (category, difficulty) velocity buckets
  const velocityRows = useMemo(() => {
    const map = forecast?.bucketVelocities || {};
    const keys = new Set(Object.keys(map));
    const rows = [];

    for (const cat of FORECAST_CATEGORIES) {
      for (const diff of FORECAST_DIFFICULTIES) {
        const key = `${cat}::${diff}`;
        if (keys.has(key)) {
          rows.push(map[key]);
        }
      }
    }

    // Include any extra keys if present
    for (const [key, val] of Object.entries(map)) {
      if (!rows.some((r) => r.key === key)) {
        rows.push(val);
      }
    }

    return rows.sort((a, b) => (b.n || 0) - (a.n || 0));
  }, [forecast]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-blue-600 font-bold">
            ADAPTIVE FORECAST VELOCITY &amp; TELEMETRY
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            التحليلات وتاريخ جلسات المذاكرة
          </h1>
        </div>

        <button
          type="button"
          onClick={() => setManualModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm shadow-blue-600/20 transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span>إضافة جلسة جديدة</span>
        </button>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-v5 rounded-2xl p-4 space-y-1">
          <div className="text-[11px] font-bold text-slate-500">إجمالي الساعات النشطة</div>
          <div className="text-2xl font-black font-mono text-blue-700">
            {totals.totalActiveHours}h
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            مستبعد التوقف: {totals.totalPausedMins} دقيقة
          </div>
        </div>

        <div className="glass-v5 rounded-2xl p-4 space-y-1">
          <div className="text-[11px] font-bold text-slate-500">جلسات صالحة للتوقع</div>
          <div className="text-2xl font-black font-mono text-emerald-700">
            {totals.validCount}
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            متقطعة مستبعدة: {totals.interruptedCount}
          </div>
        </div>

        <div className="glass-v5 rounded-2xl p-4 space-y-1">
          <div className="text-[11px] font-bold text-slate-500">المتبقي التكيفي</div>
          <div className="text-2xl font-black font-mono text-slate-900">
            {forecast.adaptiveExpectedHours}h
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            مقابل {forecast.baselineRemainingHours}h خطة أساسية
          </div>
        </div>

        <div className="glass-v5 rounded-2xl p-4 space-y-1">
          <div className="text-[11px] font-bold text-slate-500">المعدل الأسبوعي الفعلي</div>
          <div className="text-2xl font-black font-mono text-indigo-700">
            {forecast.rollingWeeklyHours}h/w
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            الهدف: {forecast.targetWeeklyHours}h/w
          </div>
        </div>
      </div>

      {/* Forecast Trend Chart */}
      <ForecastTrendChart forecast={forecast} sessions={sessions} />

      {/* Concise Visual Progress Rows across Modules (NO walls of text, NO strikethrough) */}
      <section className="glass-v5 rounded-3xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">
              صفوف التقدّم المختصرة للموديولات
            </h2>
            <p className="text-xs text-slate-500">
              مقارنة التنفيذ بالإتقان عبر الموديولات السبعة (بدون شطب للنصوص المكتملة)
            </p>
          </div>
          <Link
            to="/roadmap"
            className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1"
          >
            <span>تحديث المهام</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-2.5">
          {(metrics.moduleStats || []).map((mod) => {
            const isComplete = mod.executionPct >= 100;
            const modForecast = forecast.moduleBreakdown?.find((m) => m.id === mod.id);

            return (
              <div
                key={mod.id}
                className={`rounded-2xl p-4 transition-all ${
                  isComplete
                    ? 'bg-emerald-500/10 border-l-4 border-emerald-500 text-slate-900'
                    : 'bg-white border border-slate-200/80'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-mono text-xs font-bold shrink-0">
                      M{mod.number}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
                        {mod.title}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                        {mod.doneSubtasks}/{mod.totalSubtasks} مهمة • الإتقان {mod.masteryPct}%
                        {modForecast && modForecast.adaptiveExpectedHours > 0
                          ? ` • المتبقي التكيفي ${modForecast.adaptiveExpectedHours}h`
                          : ''}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 md:w-72 shrink-0">
                    <ProgressBar value={mod.executionPct} size="sm" className="flex-1" />
                    <StatusBadge
                      status={
                        isComplete
                          ? 'completed'
                          : mod.executionPct > 0
                          ? 'in_progress'
                          : 'not_started'
                      }
                      type="execution"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Adaptive Forecast Velocity Table by (category, difficulty) */}
      <section className="glass-v5 rounded-3xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Gauge className="w-5 h-5 text-blue-600" />
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                جدول معاملات السرعة المستقلة (Category × Difficulty)
              </h2>
              <p className="text-xs text-slate-500">
                كل خانة مستقلة تماماً — سرعة الفيديوهات لا تؤثر أبداً على اللابات أو البرمجة أو المشاريع.
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500">
                <th className="py-2.5 px-3">التصنيف (Category)</th>
                <th className="py-2.5 px-3">الصعوبة (Difficulty)</th>
                <th className="py-2.5 px-3">العينات (N)</th>
                <th className="py-2.5 px-3">السرعة الفعلية</th>
                <th className="py-2.5 px-3">السرعة الخام</th>
                <th className="py-2.5 px-3">الثقة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {velocityRows.map((row) => (
                <tr key={row.key} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 px-3 font-bold text-slate-900">
                    {CATEGORY_LABELS[row.category] || row.category}
                    <span className="font-mono text-[10px] text-slate-400 mr-1.5">
                      ({row.category})
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-700 font-semibold">
                    {DIFFICULTY_LABELS[row.difficulty] || row.difficulty}
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-slate-800">
                    {row.n}
                    {row.interruptedCount > 0 && (
                      <span className="text-[10px] text-amber-600 mr-1">
                        (+{row.interruptedCount} متقطعة)
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 font-mono font-black text-blue-700">
                    {Number(row.effectiveVelocity).toFixed(2)}x
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-500">
                    {Number(row.rawVelocity).toFixed(2)}x
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full border text-[11px] font-bold ${
                        CONFIDENCE_CLASS[row.confidence] || CONFIDENCE_CLASS.Low
                      }`}
                    >
                      {row.confidence}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Study Session History with Edit, Mark Interrupted, and Delete */}
      <section className="glass-v5 rounded-3xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">
              سجل جلسات المذاكرة ({sessions.length})
            </h2>
            <p className="text-xs text-slate-500">
              يمكنك تعديل أي جلسة، تعليمها كمتقطعة (Interrupted)، أو حذفها — ويُعاد بناء نموذج التوقع تلقائياً.
            </p>
          </div>
        </div>

        {sessions.length === 0 ? (
          <EmptyState
            icon={Activity}
            title="لا توجد جلسات مذاكرة مسجلة بعد"
            description="ابدأ مؤقت المذاكرة من الرئيسية أو أضف جلسة يدوية ليتعلّم نموذج التوقع سرعتك الحقيقية."
            actionLabel="تسجيل أول جلسة يدوية"
            onAction={() => setManualModalOpen(true)}
          />
        ) : (
          <div className="space-y-3">
            {sessions.map((sess) => {
              const activeMins =
                Number(sess.actualActiveMinutes) || Math.round((Number(sess.hours) || 0) * 60);
              const pausedMins = Number(sess.pausedMinutes) || 0;
              const estMins = Number(sess.estimatedMinutes) || 0;
              const isInterrupted = Boolean(sess.interrupted);

              return (
                <div
                  key={sess.id}
                  className={`rounded-2xl p-4 border transition ${
                    isInterrupted
                      ? 'bg-amber-50/50 border-amber-200'
                      : 'bg-white border-slate-200/80'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[11px] text-slate-500">
                          {sess.date || String(sess.completedAt || '').slice(0, 10)}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-bold">
                          {CATEGORY_LABELS[sess.category] || sess.category}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
                          {DIFFICULTY_LABELS[sess.difficulty] || sess.difficulty}
                        </span>
                        {isInterrupted ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold">
                            <AlertTriangle className="w-3 h-3" />
                            <span>متقطعة (مستبعدة)</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-800 text-[10px] font-bold">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>جلسة صالحة</span>
                          </span>
                        )}
                      </div>

                      <div className="text-sm font-extrabold text-slate-900 truncate">
                        {sess.topicTitle || sess.topic || 'جلسة مذاكرة'}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-slate-600">
                        <span className="inline-flex items-center gap-1 text-blue-700 font-bold">
                          <Clock className="w-3 h-3" />
                          نشط: {activeMins}m
                        </span>
                        {pausedMins > 0 && (
                          <span className="text-amber-700">توقف: {pausedMins}m</span>
                        )}
                        {estMins > 0 && <span>مقدّر: {estMins}m</span>}
                        <span className="inline-flex items-center gap-0.5 text-amber-600">
                          <Star className="w-3 h-3 fill-current" />
                          ثقة: {sess.confidence || 3}/5
                        </span>
                        {sess.evidenceUrl && (
                          <a
                            href={sess.evidenceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-blue-600 hover:underline font-sans font-bold"
                          >
                            <span>رابط الإثبات</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>

                      {(sess.note || sess.notes) && (
                        <p className="text-xs text-slate-600 pt-1">
                          {sess.note || sess.notes}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setEditingSession(sess)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>تعديل</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => actions.toggleSessionInterrupted(sess.id)}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                          isInterrupted
                            ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200'
                        }`}
                      >
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>{isInterrupted ? 'اعتماد كصالحة' : 'تعليم كمتقطعة'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => actions.deleteSession(sess.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>حذف</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Edit Session Modal */}
      <SessionLogModal
        isOpen={Boolean(editingSession)}
        mode="manual"
        onClose={() => setEditingSession(null)}
        topics={allTopics}
        initialData={editingSession || {}}
        onSubmit={(payload) => {
          if (editingSession) {
            actions.updateSession(editingSession.id, payload);
            setEditingSession(null);
          }
        }}
      />

      {/* Add Manual Session Modal */}
      <SessionLogModal
        isOpen={manualModalOpen}
        mode="manual"
        onClose={() => setManualModalOpen(false)}
        topics={allTopics}
        onSubmit={(payload) => {
          actions.logManualSession(payload);
          setManualModalOpen(false);
        }}
      />
    </div>
  );
}
