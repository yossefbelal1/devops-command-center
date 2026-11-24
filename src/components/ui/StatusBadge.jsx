import React from 'react';
import { Clock, CircleDashed, Sparkles, Award, ShieldAlert, CheckCircle2 } from 'lucide-react';

/**
 * Shared style tokens for completed items across the entire app.
 * Uses crisp emerald highlight + left accent bar (no strikethrough anywhere).
 */
export const COMPLETED_SURFACE_CLASSES =
  'bg-emerald-500/10 border-l-4 border-emerald-500 text-slate-900';

const EXECUTION_CONFIG = {
  completed: {
    label: '✅ مكتمل',
    classes: 'bg-emerald-500/10 border-l-4 border-emerald-500 text-emerald-900 font-bold',
    icon: null
  },
  done: {
    label: '✅ مكتمل',
    classes: 'bg-emerald-500/10 border-l-4 border-emerald-500 text-emerald-900 font-bold',
    icon: null
  },
  in_progress: {
    label: 'قيد التنفيذ',
    classes: 'bg-blue-500/10 border-l-4 border-blue-500 text-blue-900 font-bold',
    icon: Clock
  },
  not_started: {
    label: 'لم يبدأ',
    classes: 'bg-slate-100 border border-slate-200 text-slate-700 font-semibold',
    icon: CircleDashed
  },
  pending: {
    label: 'لم يبدأ',
    classes: 'bg-slate-100 border border-slate-200 text-slate-700 font-semibold',
    icon: CircleDashed
  }
};

const MASTERY_CONFIG = {
  mastered: {
    label: 'متقن',
    classes: 'bg-emerald-500/10 border border-emerald-500/40 text-emerald-900 font-bold',
    icon: Award
  },
  practiced: {
    label: 'تم التطبيق',
    classes: 'bg-indigo-50 border border-indigo-200 text-indigo-800 font-bold',
    icon: Sparkles
  },
  unverified: {
    label: 'غير مُختبر',
    classes: 'bg-slate-100 border border-slate-200 text-slate-600 font-semibold',
    icon: CircleDashed
  }
};

export function StatusBadge({
  status = 'not_started',
  type = 'execution',
  needsReview = false,
  size = 'sm',
  className = ''
}) {
  const map = type === 'mastery' ? MASTERY_CONFIG : EXECUTION_CONFIG;
  const fallbackKey = type === 'mastery' ? 'unverified' : 'not_started';
  const cfg = map[status] || map[fallbackKey];
  const Icon = cfg.icon;

  const sizeClasses =
    size === 'md' ? 'px-3 py-1 text-xs rounded-lg' : 'px-2.5 py-0.5 text-[11px] rounded-md';

  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap ${sizeClasses} ${cfg.classes} ${className}`}>
      {Icon && <Icon className="w-3 h-3 shrink-0" strokeWidth={2.2} />}
      <span>{cfg.label}</span>
      {needsReview && (
        <span
          title="مضى أكثر من 30 يوماً منذ آخر مراجعة"
          className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 text-[10px] font-bold"
        >
          <ShieldAlert className="w-2.5 h-2.5" />
          مراجعة
        </span>
      )}
    </span>
  );
}

export function CompletedItemCard({ children, completed = false, className = '', onClick }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl transition-all duration-200 ${
        completed
          ? 'bg-emerald-500/10 border-l-4 border-emerald-500 text-slate-900'
          : 'bg-white border border-slate-200/80 text-slate-900'
      } ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1 font-medium text-slate-900">{children}</div>
        {completed && (
          <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-900 text-[11px] font-bold">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>✅ مكتمل</span>
          </span>
        )}
      </div>
    </div>
  );
}
