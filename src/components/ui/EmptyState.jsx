import React from 'react';
import { Inbox } from 'lucide-react';

export function EmptyState({
  icon: Icon = Inbox,
  title = 'لا توجد بيانات بعد',
  description = 'ابدأ بإضافة عنصر جديد أو تسجيل نشاط ليظهر هنا.',
  actionLabel,
  onAction,
  className = ''
}) {
  return (
    <div
      className={`glass-v5 rounded-2xl p-8 text-center flex flex-col items-center justify-center gap-3 ${className}`}
    >
      <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
        <Icon className="w-6 h-6" strokeWidth={1.8} />
      </div>
      <div className="space-y-1 max-w-md">
        <h3 className="text-sm font-extrabold text-slate-900">{title}</h3>
        {description && <p className="text-xs text-slate-500 leading-relaxed">{description}</p>}
      </div>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-1 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm shadow-blue-600/20 transition"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
