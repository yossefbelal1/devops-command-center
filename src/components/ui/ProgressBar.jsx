import React from 'react';

const VARIANT_CLASSES = {
  blue: 'bg-blue-600',
  emerald: 'bg-emerald-500',
  amber: 'bg-amber-500',
  rose: 'bg-rose-500',
  indigo: 'bg-indigo-600'
};

const TRACK_CLASSES = {
  blue: 'bg-slate-200/80',
  emerald: 'bg-emerald-500/15',
  amber: 'bg-amber-100',
  rose: 'bg-rose-100',
  indigo: 'bg-indigo-100'
};

const SIZE_CLASSES = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-3.5'
};

export function ProgressBar({
  value = 0,
  max = 100,
  label,
  sublabel,
  showPercentage = true,
  size = 'md',
  variant = 'auto',
  className = ''
}) {
  const safeMax = max > 0 ? max : 100;
  const pct = Math.max(0, Math.min(100, Math.round((value / safeMax) * 100)));

  const resolvedVariant =
    variant === 'auto'
      ? pct >= 100
        ? 'emerald'
        : pct > 0
        ? 'blue'
        : 'blue'
      : variant;

  const barColor = VARIANT_CLASSES[resolvedVariant] || VARIANT_CLASSES.blue;
  const trackColor = TRACK_CLASSES[resolvedVariant] || TRACK_CLASSES.blue;
  const heightClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;

  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      {(label || sublabel || showPercentage) && (
        <div className="flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            {label && <span className="font-bold text-slate-800 truncate">{label}</span>}
            {sublabel && (
              <span className="text-[11px] text-slate-500 font-medium truncate">{sublabel}</span>
            )}
          </div>
          {showPercentage && (
            <span
              className={`font-mono font-bold shrink-0 ${
                pct >= 100 ? 'text-emerald-700' : 'text-slate-700'
              }`}
            >
              {pct}%
            </span>
          )}
        </div>
      )}

      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        className={`w-full rounded-full overflow-hidden ${trackColor} ${heightClass}`}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
