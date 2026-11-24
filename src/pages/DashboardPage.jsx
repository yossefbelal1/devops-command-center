import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  CalendarClock,
  CheckCircle2,
  Clock,
  FolderGit2,
  Gauge,
  PlusCircle,
  ShieldAlert,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Minus,
  Award
} from 'lucide-react';
import { ROADMAP_META } from '../data/roadmapData';
import { HIVEBOX_DATA } from '../data/hiveboxData';
import { ProgressBar } from '../components/ui/ProgressBar';
import { StatusBadge } from '../components/ui/StatusBadge';
import { SkillRadarChart } from '../components/charts/SkillRadarChart';

const CONFIDENCE_BADGES = {
  High: { label: 'ثقة عالية (High)', classes: 'bg-emerald-500/10 text-emerald-800 border-emerald-500/30' },
  Medium: { label: 'ثقة متوسطة (Medium)', classes: 'bg-blue-50 text-blue-800 border-blue-200' },
  Low: { label: 'ثقة مبدئية (Low)', classes: 'bg-amber-50 text-amber-800 border-amber-200' }
};

export function DashboardPage({
  metrics,
  forecast,
  allTopics,
  topicsDueForReview = []
}) {
  const nextTopic = useMemo(
    () =>
      allTopics.find((t) => t.id === ROADMAP_META.currentTopicId) ||
      allTopics.find((t) => t.status === 'in_progress') ||
      allTopics.find((t) => t.status !== 'completed' && t.status !== 'done') ||
      allTopics[0],
    [allTopics]
  );

  const hiveboxPhase2 = useMemo(
    () => HIVEBOX_DATA.phases.find((p) => p.id === 'hb-2') || HIVEBOX_DATA.phases[1] || HIVEBOX_DATA.phases[0],
    []
  );

  const radarData = useMemo(
    () =>
      (metrics.moduleStats || []).map((m) => ({
        label: `M${m.number}`,
        fullName: `Module ${m.number}: ${m.title}`,
        value: m.executionPct,
        masteryValue: m.masteryPct
      })),
    [metrics.moduleStats]
  );

  const confidenceCfg = CONFIDENCE_BADGES[forecast.confidence] || CONFIDENCE_BADGES.Low;
  const TrendIcon =
    forecast.trend === 'Improving'
      ? TrendingUp
      : forecast.trend === 'Slower than expected'
      ? TrendingDown
      : Minus;

  const trendClasses =
    forecast.trend === 'Improving'
      ? 'bg-emerald-500/10 text-emerald-800 border-emerald-500/30'
      : forecast.trend === 'Slower than expected'
      ? 'bg-amber-50 text-amber-800 border-amber-200'
      : 'bg-slate-100 text-slate-700 border-slate-200';

  const deltaLabel =
    forecast.deltaHours === 0
      ? 'مطابق للخطة القياسية (0.0h)'
      : forecast.deltaHours < 0
      ? `أسرع بـ ${Math.abs(forecast.deltaHours)}h عن الخطة`
      : `أبطأ بـ ${forecast.deltaHours}h عن الخطة`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Executive Header */}
      <section className="glass-v5-blue rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-blue-200 text-blue-700 text-[11px] font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EXECUTIVE OVERVIEW • {ROADMAP_META.targetRole}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            لوحة القيادة التنفيذية — {ROADMAP_META.studentName}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            تتبّع الإنجاز والإتقان الفعلي، الساعات والشهور المتبقية المحدّثة تلقائياً، والتوقّع الذكي للجاهزية قبل التقديم في منتصف 2027.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
          <div className="bg-white rounded-2xl p-3.5 border border-blue-100 min-w-[125px]">
            <div className="text-[11px] font-bold text-slate-500">نسبة التنفيذ</div>
            <div className="text-2xl font-black font-mono text-blue-700 mt-0.5">
              {metrics.overallPct}%
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              {metrics.doneSubtasks}/{metrics.totalSubtasks} مهمة
            </div>
          </div>

          <div className="bg-white rounded-2xl p-3.5 border border-emerald-200/80 min-w-[125px]">
            <div className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>نسبة الإتقان</span>
            </div>
            <div className="text-2xl font-black font-mono text-emerald-700 mt-0.5">
              {metrics.masteryPct}%
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              {metrics.masteredTopics} متقن • {metrics.practicedTopics} مطبّق
            </div>
          </div>

          <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 min-w-[125px]">
            <div className="text-[11px] font-bold text-slate-500">المدة المتبقية</div>
            <div className="text-2xl font-black font-mono text-slate-900 mt-0.5">
              حوالي {Math.max(0, forecast.remainingMonths)} شهر
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              متبقي {Math.max(0, forecast.adaptiveExpectedHours)} ساعة
            </div>
          </div>

          <div className="bg-white rounded-2xl p-3.5 border border-indigo-200/80 min-w-[125px]">
            <div className="text-[11px] font-bold text-slate-500">مشروع HiveBox</div>
            <div className="text-2xl font-black font-mono text-indigo-700 mt-0.5">
              {metrics.hbPct}%
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              {metrics.hbDone}/{metrics.hbTotal} مخرج
            </div>
          </div>
        </div>
      </section>

      {/* Top Grid: Immediate Next Action + Smart Dynamic ETA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Immediate Next Action Card */}
        <section className="lg:col-span-6 glass-v5 rounded-3xl p-6 flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600 text-white text-[11px] font-bold">
                <Target className="w-3.5 h-3.5" />
                <span>الخطوة التنفيذية المباشرة الآن</span>
              </span>
              {nextTopic && <StatusBadge status={nextTopic.status} type="execution" />}
            </div>

            <div className="space-y-1">
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                Python DevOps Libraries → HiveBox Phase 2
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                أغلق موضوع{' '}
                <strong className="text-slate-900">{nextTopic?.title || 'Python DevOps Libraries'}</strong>{' '}
                (6 فيديوهات Corey Schafer + requests &amp; FastAPI) ثم سلّم{' '}
                <strong className="text-blue-700">{hiveboxPhase2?.title || 'HiveBox Phase 2'}</strong>{' '}
                على RHEL VM عبر Pull Request.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="text-[11px] font-bold text-slate-500">الموضوع النشط</div>
                <div className="text-xs font-extrabold text-slate-900 truncate">
                  {nextTopic?.code} — {nextTopic?.title}
                </div>
                <div className="text-[11px] font-mono text-blue-700">
                  المقدّر: {nextTopic?.hours || 12}h ({nextTopic?.estimatedMinutes || 720}m)
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200/70 space-y-1.5">
                <div className="text-[11px] font-bold text-blue-700 flex items-center gap-1">
                  <FolderGit2 className="w-3.5 h-3.5" />
                  <span>تسليم المشروع الموازي</span>
                </div>
                <div className="text-xs font-extrabold text-slate-900 truncate">
                  {hiveboxPhase2?.title}
                </div>
                <div className="text-[11px] font-mono text-slate-600">
                  Docker 29.9.3 + Python 3.9 + Bash Check
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <Link
              to={`/roadmap?module=module-2&topic=${encodeURIComponent(nextTopic?.id || 'm2-5')}`}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors duration-150"
            >
              <span>فتح تفاصيل {nextTopic?.code || '2.5'}</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/hivebox?phase=hb-2"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold transition-colors duration-150"
            >
              <span>فتح HiveBox Phase 2</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* Smart Dynamic ETA Card */}
        <section className="lg:col-span-6 glass-v5 rounded-3xl p-6 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
                  <CalendarClock className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-extrabold text-slate-900">
                    التوقّع الزمني الذكي (Smart Dynamic ETA)
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    يُخصم فوراً مع كل مهمة تنهيها ويُعاد حساب الشهور تلقائياً
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[11px] font-bold ${confidenceCfg.classes}`}
                >
                  <span>{confidenceCfg.label}</span>
                  <span className="font-mono">({forecast.observationCount})</span>
                </span>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[11px] font-bold ${trendClasses}`}
                >
                  <TrendIcon className="w-3.5 h-3.5" />
                  <span>{forecast.trend}</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200/70">
                <div className="text-[11px] font-bold text-blue-700">الساعات المتبقية</div>
                <div className="text-xl font-black font-mono text-slate-900 mt-1">
                  {Math.max(0, forecast.adaptiveExpectedHours)} ساعة
                </div>
                <div className="text-[11px] font-mono text-slate-600 mt-0.5">
                  النطاق: {Math.max(0, forecast.adaptiveMinHours)}–{Math.max(0, forecast.adaptiveMaxHours)} ساعة
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="text-[11px] font-bold text-slate-500">المدة المتبقية بالشهور</div>
                <div className="text-xl font-black font-mono text-slate-900 mt-1">
                  حوالي {Math.max(0, forecast.remainingMonths)} شهر
                </div>
                <div className="text-[11px] font-mono text-slate-600 mt-0.5">
                  ({Math.max(0, forecast.remainingMonthsMin)}–{Math.max(0, forecast.remainingMonthsMax)} شهر)
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                <div className="text-[11px] font-bold text-emerald-800">الموعد المتوقع للجاهزية</div>
                <div className="text-sm font-black text-slate-900 mt-1.5">
                  {forecast.expectedMonthRangeLabel || forecast.expectedDateMax}
                </div>
                <div className="text-[11px] font-mono text-emerald-800 mt-0.5">
                  {forecast.expectedDateMin} – {forecast.expectedDateMax}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            <ProgressBar
              value={metrics.doneHours}
              max={metrics.totalHours || 1}
              label="تقدم الساعات المقدّرة"
              sublabel={`${metrics.doneHours}h من ${metrics.totalHours}h • ${deltaLabel}`}
              size="md"
            />
            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                الوتيرة المعتمدة: {forecast.effectiveWeeklyHours || forecast.targetWeeklyHours || 7.5} ساعة/أسبوع (1.5 ساعة × 5 أيام = حوالي 32.5 ساعة/شهر)
              </span>
              <Link to="/analytics" className="text-blue-600 font-bold hover:underline">
                تفاصيل السرعة والساعات ←
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Review Alert if any 30-day topics need review */}
      {topicsDueForReview.length > 0 && (
        <section className="rounded-2xl bg-amber-50 border border-amber-200 p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
            <div className="text-xs">
              <strong className="text-amber-900">
                تنبيه مراجعة دورية (30 يوماً):
              </strong>{' '}
              <span className="text-amber-800">
                لديك {topicsDueForReview.length} موضوع مكتمل لم يُراجع منذ أكثر من 30 يوماً.
              </span>
            </div>
          </div>
          <Link
            to="/roadmap"
            className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors duration-150"
          >
            مراجعة المواضيع الآن
          </Link>
        </section>
      )}

      {/* Middle Grid: Crisp Smart Dynamic Forecast Action Card + Skill Radar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <section className="lg:col-span-6 glass-v5-blue rounded-3xl p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
                <Gauge className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-slate-900">
                  بطاقة التوقع والتقدم الفوري
                </h2>
                <p className="text-[11px] text-slate-600">
                  ملخص الساعات المتبقية، المدة بالشهور، وتاريخ الجاهزية لسوق العمل
                </p>
              </div>
            </div>

            <Link
              to="/analytics"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-colors duration-150"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>تسجيل ساعات مذاكرة إضافية</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-white border border-blue-100 space-y-1">
              <div className="text-[11px] font-bold text-slate-500">الساعات المتبقية</div>
              <div className="text-xl font-black font-mono text-blue-700">
                {Math.max(0, forecast.adaptiveMinHours)}–{Math.max(0, forecast.adaptiveMaxHours)} ساعة
              </div>
              <div className="text-[11px] text-slate-500">
                المتوقع: <strong className="font-mono text-slate-800">{Math.max(0, forecast.adaptiveExpectedHours)} ساعة</strong> (الأساس: {Math.max(0, forecast.baselineRemainingHours)} ساعة)
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-blue-100 space-y-1">
              <div className="text-[11px] font-bold text-slate-500">المدة المتبقية بالشهور</div>
              <div className="text-xl font-black font-mono text-emerald-700">
                حوالي {Math.max(0, forecast.remainingMonths)} شهر
              </div>
              <div className="text-[11px] text-slate-600">
                الموعد المتوقع للجاهزية: <strong>{forecast.expectedMonthRangeLabel}</strong>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <div className="font-extrabold text-slate-900">
                الساعات الأسبوعية المسجلة: {forecast.rollingWeeklyHours}h/أسبوع
              </div>
              <div className="text-[11px] text-slate-500">
                الهدف الأسبوعي المضبوط: {forecast.targetWeeklyHours} ساعة • {deltaLabel}
              </div>
            </div>
            <Link
              to="/resources"
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors duration-150"
            >
              تعديل الوتيرة الأسبوعية
            </Link>
          </div>
        </section>

        <div className="lg:col-span-6">
          <SkillRadarChart
            data={radarData}
            title="رادار المهارات: التنفيذ مقابل الإتقان"
            subtitle="توزيع تقدمك وإتقانك across Modules 01–07"
          />
        </div>
      </div>

      {/* Quick Module Execution Snapshot */}
      <section className="glass-v5 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">ملخص الموديولات السبعة</h3>
            <p className="text-[11px] text-slate-500">
              نظرة سريعة على الإنجاز والمتبقي بالساعات والشهور لكل موديول
            </p>
          </div>
          <Link
            to="/roadmap"
            className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
          >
            <span>عرض الخارطة كاملة</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {(metrics.moduleStats || []).map((mod) => {
            const isDone = mod.executionPct >= 100;
            const modForecast = forecast.moduleBreakdown?.find((m) => m.id === mod.id);

            return (
              <Link
                key={mod.id}
                to={`/roadmap?module=${encodeURIComponent(mod.id)}`}
                className={`rounded-2xl p-4 transition-colors duration-150 hover:shadow-md space-y-2.5 ${
                  isDone
                    ? 'bg-emerald-500/10 border-l-4 border-emerald-500 text-slate-900'
                    : 'bg-white border border-slate-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono font-bold text-blue-700">
                    Module {mod.number}
                  </span>
                  {isDone ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-900 text-[10px] font-bold">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>✅ مكتمل</span>
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono font-bold text-slate-500">
                      {mod.doneSubtasks}/{mod.totalSubtasks}
                    </span>
                  )}
                </div>
                <div className="text-xs font-extrabold text-slate-900 line-clamp-1">
                  {mod.title}
                </div>
                <ProgressBar value={mod.executionPct} size="sm" showPercentage />
                {!isDone && modForecast && (
                  <div className="text-[10.5px] font-mono text-slate-500">
                    متبقي {Math.max(0, modForecast.remainingHours)} ساعة (حوالي {Math.max(0, modForecast.remainingMonths)} شهر)
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
