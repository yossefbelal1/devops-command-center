import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Map,
  FolderGit2,
  HelpCircle,
  BarChart3,
  BookOpen,
  Briefcase,
  Bookmark,
  MoreHorizontal,
  Pause,
  X
} from 'lucide-react';
import { getTimerDurations, formatDuration } from '../timer/timerUtils';

const PRIMARY_MOBILE_ROUTES = [
  { to: '/', label: 'الرئيسية', Icon: LayoutDashboard, end: true },
  { to: '/roadmap', label: 'المسار', Icon: Map },
  { to: '/hivebox', label: 'HiveBox', Icon: FolderGit2 },
  { to: '/quiz', label: 'الكويزات', Icon: HelpCircle },
  { to: '/analytics', label: 'التحليلات', Icon: BarChart3 }
];

const MORE_MOBILE_ROUTES = [
  {
    to: '/playbook',
    label: 'القرارات الهندسية',
    desc: '12 مقارنة معمارية متسلسلة',
    Icon: BookOpen
  },
  {
    to: '/career',
    label: 'المسيرة والرواتب',
    desc: 'التدرج الوظيفي وتقديرات السوق',
    Icon: Briefcase
  },
  {
    to: '/resources',
    label: 'المصادر والنسخ الاحتياطي',
    desc: 'المكتبة الكاملة، الإعدادات، و JSON',
    Icon: Bookmark
  }
];

export function MobileNav({ activeTimer = null }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [moreOpen, setMoreOpen] = useState(false);
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    if (!activeTimer) return;
    setNowMs(Date.now());
    const id = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(id);
  }, [activeTimer]);

  // Close sheet on route change or Escape
  useEffect(() => {
    setMoreOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!moreOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setMoreOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [moreOpen]);

  const { activeSeconds, isRunning } = getTimerDurations(activeTimer, nowMs);
  const isMoreRouteActive = MORE_MOBILE_ROUTES.some((r) =>
    location.pathname.startsWith(r.to)
  );

  return (
    <>
      {/* Upward Bottom Sheet for secondary routes */}
      {moreOpen && (
        <div
          onClick={() => setMoreOpen(false)}
          className="md:hidden fixed inset-0 z-40 bg-slate-900/45 backdrop-blur-sm flex items-end"
          role="dialog"
          aria-modal="true"
          aria-label="المزيد من الصفحات"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full bg-white rounded-t-3xl border-t border-slate-200 shadow-2xl p-5 pb-24 space-y-3"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-sm font-extrabold text-slate-900">صفحات إضافية</span>
              <button
                type="button"
                onClick={() => setMoreOpen(false)}
                aria-label="إغلاق القائمة"
                className="min-h-[44px] min-w-[44px] rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              {MORE_MOBILE_ROUTES.map(({ to, label, desc, Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMoreOpen(false)}
                  className={({ isActive }) =>
                    `min-h-[48px] w-full px-4 py-3 rounded-2xl border flex items-center gap-3 transition ${
                      isActive
                        ? 'bg-blue-600 border-blue-600 text-white shadow-sm shadow-blue-600/20'
                        : 'bg-slate-50 border-slate-200/80 text-slate-800 hover:bg-blue-50/70'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          isActive ? 'bg-white/20 text-white' : 'bg-white text-blue-600 border border-slate-200'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 text-right">
                        <div className="text-xs font-extrabold">{label}</div>
                        <div
                          className={`text-[11px] truncate ${
                            isActive ? 'text-blue-100' : 'text-slate-500'
                          }`}
                        >
                          {desc}
                        </div>
                      </div>
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Fixed Bottom App Bar: 5 primary routes + More */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-50">
        {activeTimer && (
          <div className="px-3 pb-1.5">
            <button
              type="button"
              onClick={() => navigate('/')}
              className={`w-full min-h-[44px] px-3 py-2 rounded-xl border backdrop-blur-md shadow-sm flex items-center justify-between text-xs font-bold ${
                isRunning
                  ? 'bg-blue-50/95 border-blue-200 text-blue-800'
                  : 'bg-amber-50/95 border-amber-200 text-amber-900'
              }`}
            >
              <span className="flex items-center gap-2 truncate">
                {isRunning ? (
                  <span className="w-2 h-2 rounded-full bg-blue-600 pulse-blue shrink-0" />
                ) : (
                  <Pause className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                )}
                <span className="truncate">{activeTimer.topicTitle || 'مؤقت المذاكرة'}</span>
              </span>
              <span className="font-mono font-black shrink-0">{formatDuration(activeSeconds)}</span>
            </button>
          </div>
        )}

        <nav
          aria-label="تنقل الجوال"
          className="bg-white/95 backdrop-blur-xl border-t border-slate-200/90 px-1.5 pt-1.5 pb-safe grid grid-cols-6 gap-0.5"
        >
          {PRIMARY_MOBILE_ROUTES.map(({ to, label, Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `min-h-[44px] min-w-[44px] flex flex-col items-center justify-center gap-0.5 px-1 py-1 rounded-xl text-[10px] font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/20'
                    : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" strokeWidth={2} />
              <span className="truncate max-w-full">{label}</span>
            </NavLink>
          ))}

          <button
            type="button"
            onClick={() => setMoreOpen((prev) => !prev)}
            aria-expanded={moreOpen}
            aria-label="المزيد"
            className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center gap-0.5 px-1 py-1 rounded-xl text-[10px] font-bold whitespace-nowrap transition-all ${
              moreOpen || isMoreRouteActive
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <MoreHorizontal className="w-4 h-4 shrink-0" strokeWidth={2} />
            <span>المزيد</span>
          </button>
        </nav>
      </div>
    </>
  );
}
