import React, { useState, useMemo } from 'react';
import { TrendingUp, TrendingDown, Minus, Activity } from 'lucide-react';

export function ForecastTrendChart({
  forecast = null,
  sessions = [],
  title = 'منحنى السرعة والتوقع التكيفي',
  className = ''
}) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const baselineHours =
    forecast?.baselineRemainingHours ?? forecast?.originalPlanRemainingHours ?? 0;
  const minHours = forecast?.adaptiveMinHours ?? forecast?.optimisticHours ?? baselineHours;
  const expectedHours = forecast?.adaptiveExpectedHours ?? forecast?.expectedHours ?? baselineHours;
  const maxHours = forecast?.adaptiveMaxHours ?? forecast?.conservativeHours ?? baselineHours;
  const trend = forecast?.trend || 'Stable';
  const confidence = forecast?.confidence || 'Low';

  // Extract valid chronological velocity points from sessions
  const points = useMemo(() => {
    const valid = (sessions || [])
      .filter(
        (s) =>
          !s.interrupted &&
          Number(s.estimatedMinutes) > 0 &&
          Number(s.actualActiveMinutes) > 0
      )
      .slice(0, 14)
      .reverse();

    return valid.map((s, idx) => {
      const velocity = Math.max(
        0.35,
        Math.min(2.5, Number(s.estimatedMinutes) / Number(s.actualActiveMinutes))
      );
      const rawDate = s.completedAt || s.date || '';
      const shortDate = rawDate ? String(rawDate).slice(5, 10) : `#${idx + 1}`;
      return {
        id: s.id || idx,
        label: shortDate,
        title: s.topicTitle || s.topic || 'جلسة مذاكرة',
        velocity: Number(velocity.toFixed(2)),
        activeMins: Number(s.actualActiveMinutes),
        estMins: Number(s.estimatedMinutes)
      };
    });
  }, [sessions]);

  // SVG dimensions for velocity trend chart
  const svgW = 520;
  const svgH = 190;
  const padL = 40;
  const padR = 18;
  const padT = 20;
  const padB = 32;
  const plotW = svgW - padL - padR;
  const plotH = svgH - padT - padB;
  const minY = 0.3;
  const maxY = 2.2;

  const yFor = (val) => {
    const clamped = Math.max(minY, Math.min(maxY, val));
    return padT + ((maxY - clamped) / (maxY - minY)) * plotH;
  };

  const xFor = (idx, total) => {
    if (total <= 1) return padL + plotW / 2;
    return padL + (idx / (total - 1)) * plotW;
  };

  const baselineY = yFor(1.0);

  const polylinePts = points
    .map((p, idx) => `${xFor(idx, points.length).toFixed(1)},${yFor(p.velocity).toFixed(1)}`)
    .join(' ');

  const areaPts =
    points.length >= 2
      ? `${xFor(0, points.length).toFixed(1)},${(padT + plotH).toFixed(1)} ${polylinePts} ${xFor(
          points.length - 1,
          points.length
        ).toFixed(1)},${(padT + plotH).toFixed(1)}`
      : '';

  // Range bar calculation for remaining hours comparison
  const rangeScaleMax = Math.max(baselineHours, maxHours, 1) * 1.1;
  const pctOfScale = (h) => Math.max(0, Math.min(100, (h / rangeScaleMax) * 100));

  const TrendIcon =
    trend === 'Improving'
      ? TrendingUp
      : trend === 'Slower than expected'
      ? TrendingDown
      : Minus;

  const trendBadgeClass =
    trend === 'Improving'
      ? 'bg-emerald-500/10 text-emerald-800 border-emerald-500/30'
      : trend === 'Slower than expected'
      ? 'bg-amber-50 text-amber-800 border-amber-200'
      : 'bg-blue-50 text-blue-800 border-blue-200';

  return (
    <div className={`glass-v5 rounded-3xl p-5 sm:p-6 space-y-5 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-extrabold text-slate-900">{title}</h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            مقارنة سرعتك الفعلية (1.0x = الخطة القياسية) مع نطاق الساعات المتبقية
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[11px] font-bold ${trendBadgeClass}`}
          >
            <TrendIcon className="w-3.5 h-3.5" />
            <span>{trend}</span>
          </span>
          <span className="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-mono font-bold">
            Confidence: {confidence}
          </span>
        </div>
      </div>

      {/* Remaining Hours Adaptive Range Band */}
      <div className="bg-white/90 rounded-2xl border border-slate-200/80 p-4 space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-bold text-slate-700">نطاق الساعات المتبقية المتوقعة</span>
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span className="text-slate-500">الخطة: {baselineHours}h</span>
            <span className="font-bold text-blue-700">
              المتوقع: {expectedHours}h ({minHours}h – {maxHours}h)
            </span>
          </div>
        </div>

        <svg viewBox="0 0 400 38" className="w-full h-10 overflow-visible" aria-label="نطاق الساعات المتوقعة">
          {/* Track */}
          <rect x="0" y="14" width="400" height="10" rx="5" fill="#E2E8F0" />
          {/* Adaptive min..max confidence band */}
          <rect
            x={(pctOfScale(minHours) / 100) * 400}
            y="11"
            width={Math.max(8, ((pctOfScale(maxHours) - pctOfScale(minHours)) / 100) * 400)}
            height="16"
            rx="8"
            fill="rgba(37, 99, 235, 0.22)"
            stroke="#3B82F6"
            strokeWidth="1.2"
          />
          {/* Baseline marker */}
          <line
            x1={(pctOfScale(baselineHours) / 100) * 400}
            y1="6"
            x2={(pctOfScale(baselineHours) / 100) * 400}
            y2="32"
            stroke="#64748B"
            strokeWidth="2"
            strokeDasharray="3 2"
          />
          {/* Expected marker */}
          <circle
            cx={(pctOfScale(expectedHours) / 100) * 400}
            cy="19"
            r="6"
            fill="#2563EB"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Velocity Trend Line Chart */}
      <div className="relative bg-white/90 rounded-2xl border border-slate-200/80 p-3 sm:p-4">
        {points.length < 2 ? (
          <div className="py-8 flex flex-col items-center justify-center text-center gap-2 text-slate-500">
            <Activity className="w-6 h-6 text-blue-500" />
            <div className="text-xs font-bold text-slate-700">
              بانتظار جلستين صالحتين على الأقل لرسم المنحنى الزمني
            </div>
            <div className="text-[11px] text-slate-400">
              معدل السرعة الحالي يعتمد على المعامل القياسي 1.0x حتى تتراكم الجلسات غير المتقطعة.
            </div>
          </div>
        ) : (
          <svg
            viewBox={`0 0 ${svgW} ${svgH}`}
            className="w-full h-auto overflow-visible select-none"
            role="img"
            aria-label={title}
          >
            <defs>
              <linearGradient id="velocityAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.24" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0.01" />
              </linearGradient>
            </defs>

            {/* Horizontal grid lines */}
            {[0.5, 1.0, 1.5, 2.0].map((tick) => {
              const y = yFor(tick);
              const isBase = tick === 1.0;
              return (
                <g key={tick}>
                  <line
                    x1={padL}
                    y1={y}
                    x2={svgW - padR}
                    y2={y}
                    stroke={isBase ? '#10B981' : '#E2E8F0'}
                    strokeWidth={isBase ? 1.4 : 1}
                    strokeDasharray={isBase ? '5 4' : undefined}
                  />
                  <text
                    x={padL - 6}
                    y={y + 3}
                    textAnchor="end"
                    className={`text-[10px] font-mono ${
                      isBase ? 'fill-emerald-700 font-bold' : 'fill-slate-400'
                    }`}
                  >
                    {tick.toFixed(1)}x
                  </text>
                </g>
              );
            })}

            {/* Area fill */}
            {areaPts && <polygon points={areaPts} fill="url(#velocityAreaGrad)" />}

            {/* Velocity polyline */}
            <polyline
              fill="none"
              stroke="#2563EB"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={polylinePts}
            />

            {/* Data points & X labels */}
            {points.map((pt, idx) => {
              const x = xFor(idx, points.length);
              const y = yFor(pt.velocity);
              const isHovered = hoveredIdx === idx;
              return (
                <g key={pt.id}>
                  <circle
                    cx={x}
                    cy={y}
                    r={isHovered ? 6 : 4}
                    fill={pt.velocity >= 1 ? '#10B981' : '#2563EB'}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="cursor-pointer transition-all"
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  />
                  {(points.length <= 8 || idx % 2 === 0 || idx === points.length - 1) && (
                    <text
                      x={x}
                      y={svgH - 8}
                      textAnchor="middle"
                      className="fill-slate-400 text-[9.5px] font-mono"
                    >
                      {pt.label}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Baseline label */}
            <text
              x={svgW - padR}
              y={baselineY - 5}
              textAnchor="end"
              className="fill-emerald-700 text-[9.5px] font-bold"
            >
              السرعة القياسية 1.0x
            </text>
          </svg>
        )}

        {hoveredIdx !== null && points[hoveredIdx] && (
          <div className="mt-2 px-3 py-1.5 rounded-xl bg-slate-900/90 text-white text-[11px] font-bold flex flex-wrap items-center justify-between gap-2">
            <span className="truncate">{points[hoveredIdx].title}</span>
            <span className="font-mono text-blue-300">
              {points[hoveredIdx].velocity}x ({points[hoveredIdx].activeMins}m / {points[hoveredIdx].estMins}m)
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
