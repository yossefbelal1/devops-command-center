import React, { useState } from 'react';
import { Radar } from 'lucide-react';
import { EmptyState } from '../ui/EmptyState';

export function SkillRadarChart({
  data = [],
  title = 'رادار المهارات والتنفيذ',
  subtitle = 'نسبة الإنجاز مقارنةً بمستوى الإتقان الفعلي',
  className = ''
}) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  if (!Array.isArray(data) || data.length < 3) {
    return (
      <EmptyState
        icon={Radar}
        title="لا توجد محاور كافية للرادار"
        description="تتطلب خريطة الرادار 3 مجالات مهارية على الأقل لعرض التوازن بين الموديولات."
        className={className}
      />
    );
  }

  const width = 380;
  const height = 320;
  const cx = width / 2;
  const cy = height / 2;
  const maxRadius = 102;
  const count = data.length;
  const levels = [25, 50, 75, 100];
  const hasMastery = data.some((d) => typeof d.masteryValue === 'number');

  const getPoint = (index, pct) => {
    const angle = (Math.PI * 2 * index) / count - Math.PI / 2;
    const clamped = Math.max(0, Math.min(100, Number(pct) || 0));
    const r = (clamped / 100) * maxRadius;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      angle
    };
  };

  const buildPolygonPoints = (accessor) =>
    data
      .map((item, idx) => {
        const pt = getPoint(idx, accessor(item));
        return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
      })
      .join(' ');

  const executionPoints = buildPolygonPoints((d) => d.value);
  const masteryPoints = hasMastery ? buildPolygonPoints((d) => d.masteryValue ?? 0) : '';
  const hoveredItem = hoveredIdx !== null ? data[hoveredIdx] : null;

  return (
    <div className={`glass-v5 rounded-3xl p-5 sm:p-6 space-y-4 ${className}`}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-extrabold text-slate-900">{title}</h3>
          <p className="text-[11px] text-slate-500 mt-0.5">{subtitle}</p>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-bold">
          <span className="inline-flex items-center gap-1.5 text-blue-700">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <span>التنفيذ</span>
          </span>
          {hasMastery && (
            <span className="inline-flex items-center gap-1.5 text-emerald-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>الإتقان</span>
            </span>
          )}
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full max-w-[380px] h-auto overflow-visible select-none"
          role="img"
          aria-label={title}
        >
          {/* Concentric grid polygons */}
          {levels.map((lvl) => {
            const pts = data
              .map((_, idx) => {
                const pt = getPoint(idx, lvl);
                return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
              })
              .join(' ');
            return (
              <g key={lvl}>
                <polygon
                  points={pts}
                  fill={lvl === 100 ? 'rgba(248, 250, 252, 0.7)' : 'none'}
                  stroke="#CBD5E1"
                  strokeWidth={lvl === 100 ? 1.2 : 0.8}
                  strokeDasharray={lvl === 100 ? undefined : '3 3'}
                />
                <text
                  x={cx + 4}
                  y={cy - (lvl / 100) * maxRadius - 2}
                  className="fill-slate-400 text-[9px] font-mono"
                >
                  {lvl}%
                </text>
              </g>
            );
          })}

          {/* Axis spokes & labels */}
          {data.map((item, idx) => {
            const outer = getPoint(idx, 100);
            const labelPos = getPoint(idx, 123);
            const cos = Math.cos(outer.angle);
            const textAnchor =
              Math.abs(cos) < 0.2 ? 'middle' : cos > 0 ? 'start' : 'end';

            return (
              <g key={item.label + idx}>
                <line
                  x1={cx}
                  y1={cy}
                  x2={outer.x}
                  y2={outer.y}
                  stroke="#CBD5E1"
                  strokeWidth={1}
                />
                <text
                  x={labelPos.x}
                  y={labelPos.y + 3}
                  textAnchor={textAnchor}
                  className={`text-[10.5px] font-bold transition-colors ${
                    hoveredIdx === idx ? 'fill-blue-700' : 'fill-slate-700'
                  }`}
                >
                  {item.label}
                </text>
              </g>
            );
          })}

          {/* Mastery polygon */}
          {hasMastery && (
            <polygon
              points={masteryPoints}
              fill="rgba(16, 185, 129, 0.14)"
              stroke="#10B981"
              strokeWidth={2}
              strokeDasharray="4 3"
            />
          )}

          {/* Execution polygon */}
          <polygon
            points={executionPoints}
            fill="rgba(37, 99, 235, 0.18)"
            stroke="#2563EB"
            strokeWidth={2.2}
          />

          {/* Interactive vertices */}
          {data.map((item, idx) => {
            const pt = getPoint(idx, item.value);
            const isHovered = hoveredIdx === idx;
            return (
              <circle
                key={`dot-${idx}`}
                cx={pt.x}
                cy={pt.y}
                r={isHovered ? 6 : 4}
                fill={isHovered ? '#1D4ED8' : '#2563EB'}
                stroke="#FFFFFF"
                strokeWidth={2}
                className="cursor-pointer transition-all"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              />
            );
          })}
        </svg>

        {hoveredItem && (
          <div className="absolute bottom-2 left-2 right-2 mx-auto w-fit px-3 py-1.5 rounded-xl bg-slate-900/90 text-white text-[11px] font-bold shadow-lg flex items-center gap-3 pointer-events-none">
            <span>{hoveredItem.fullName || hoveredItem.label}</span>
            <span className="font-mono text-blue-300">تنفيذ: {Math.round(hoveredItem.value)}%</span>
            {typeof hoveredItem.masteryValue === 'number' && (
              <span className="font-mono text-emerald-300">
                إتقان: {Math.round(hoveredItem.masteryValue)}%
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
