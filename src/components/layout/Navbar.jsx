import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Map,
  FolderGit2,
  BookOpen,
  HelpCircle,
  BarChart3,
  Briefcase,
  Bookmark,
  Search,
  CheckCircle2,
  Pause,
  Cloud,
  CloudOff,
  RefreshCw,
  Infinity as InfinityIcon
} from 'lucide-react';
import { getTimerDurations, formatDuration } from '../timer/timerUtils';

export const NAV_ROUTES = [
  { to: '/', label: 'الرئيسية', Icon: LayoutDashboard, end: true },
  { to: '/roadmap', label: 'المسار', Icon: Map },
  { to: '/hivebox', label: 'HiveBox', Icon: FolderGit2 },
  { to: '/playbook', label: 'القرارات', Icon: BookOpen },
  { to: '/quiz', label: 'الكويزات', Icon: HelpCircle },
  { to: '/analytics', label: 'التحليلات', Icon: BarChart3 },
  { to: '/career', label: 'المسيرة', Icon: Briefcase },
  { to: '/resources', label: 'المصادر', Icon: Bookmark }
];

const SYNC_STATUS_META = {
  synced: {
    label: 'متزامن',
    title: 'تمت مزامنة البيانات مع الخادم المحلي',
    classes: 'bg-emerald-50 border-emerald-200/80 text-emerald-700',
    Icon: Cloud
  },
  syncing: {
    label: 'جاري الحفظ',
    title: 'جارٍ حفظ التغييرات ومزامنتها',
    classes: 'bg-blue-50 border-blue-200/80 text-blue-700',
    Icon: RefreshCw,
    spin: true
  },
  offline: {
    label: 'محلي',
    title: 'الوضع المحلي (IndexedDB) — الخادم غير متصل',
    classes: 'bg-slate-100 border-slate-200 text-slate-600',
    Icon: CloudOff
  }
};

export function Navbar({
  metrics = { overallPct: 0 },
  activeTimer = null,
  syncStatus = 'synced',
  onOpenSearch,
  onTimerClick
}) {
  const navigate = useNavigate();
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    if (!activeTimer) return;
    setNowMs(Date.now());
    const timer = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [activeTimer]);

  const { activeSeconds, isRunning } = getTimerDurations(activeTimer, nowMs);
  const overallPct = metrics?.overallPct ?? 0;
  const syncMeta = SYNC_STATUS_META[syncStatus] || SYNC_STATUS_META.synced;
  const SyncIcon = syncMeta.Icon;

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-xl border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-3">
        {/* Brand */}
        <NavLink
          to="/"
          className="flex items-center gap-2 group text-right shrink-0 min-h-[44px]"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shadow-sm shadow-blue-600/20 group-hover:scale-105 transition-transform">
            <InfinityIcon className="w-5 h-5" strokeWidth={2.2} />
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-extrabold text-slate-900 tracking-tight leading-none">
              Youssef<span className="text-blue-600">.DevOps</span>
            </div>
            <div className="text-[10px] font-medium text-slate-500 mt-1">
              Glassy Command Center
            </div>
          </div>
        </NavLink>

        {/* Desktop 8-route NavLink bar */}
        <nav
          aria-label="التنقل الرئيسي"
          className="hidden md:flex items-center gap-1 overflow-x-auto no-scrollbar py-1"
        >
          {NAV_ROUTES.map(({ to, label, Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/25'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`
              }
            >
              <Icon className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Right Controls: Sync Pill + Mini Timer Pill + Search + Global Progress */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Compact unobtrusive Sync Status Pill */}
          <div
            title={syncMeta.title}
            data-sync-status={syncStatus}
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full border text-[10px] font-bold transition-colors ${syncMeta.classes}`}
          >
            <SyncIcon
              className={`w-3 h-3 shrink-0 ${syncMeta.spin ? 'animate-spin' : ''}`}
            />
            <span className="hidden sm:inline">{syncMeta.label}</span>
          </div>

          {activeTimer && (
            <button
              type="button"
              onClick={() => {
                if (onTimerClick) onTimerClick();
                else navigate('/');
              }}
              title={activeTimer.topicTitle || 'المؤقت النشط'}
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-xs font-mono font-bold transition ${
                isRunning
                  ? 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100/80'
                  : 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100/80'
              }`}
            >
              {isRunning ? (
                <span className="w-2 h-2 rounded-full bg-blue-600 pulse-blue shrink-0" />
              ) : (
                <Pause className="w-3 h-3 text-amber-600 shrink-0" />
              )}
              <span>{formatDuration(activeSeconds)}</span>
              <span className="hidden xl:inline font-sans max-w-[110px] truncate text-[11px] font-semibold">
                {activeTimer.topicTitle}
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={onOpenSearch}
            title="بحث سريع (Ctrl/Cmd + K)"
            aria-label="بحث سريع"
            className="min-h-[44px] min-w-[44px] sm:min-h-[36px] sm:min-w-[36px] flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-600 text-xs font-bold transition-colors"
          >
            <Search className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-200 rounded-md text-slate-500">
              Ctrl+K
            </kbd>
          </button>

          <div
            title={
              metrics?.masteryPct !== undefined
                ? `التنفيذ ${overallPct}% • الإتقان ${metrics.masteryPct}%`
                : `نسبة الإنجاز الكلية ${overallPct}%`
            }
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 text-xs font-bold font-mono"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{overallPct}%</span>
          </div>
        </div>
      </div>
    </header>
  );
}
