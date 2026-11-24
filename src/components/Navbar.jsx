import React from 'react';
import {
  Map,
  FolderGit2,
  Briefcase,
  BookOpen,
  BarChart3,
  Search,
  CheckCircle2,
  Infinity as InfinityIcon
} from 'lucide-react';

export function Navbar({ activeTab, onTabChange, metrics, onOpenSearch, onJumpToCurrent }) {
  const navItems = [
    { id: 'roadmaps', label: 'المسار والموديولات', Icon: Map },
    { id: 'projects', label: 'المشاريع والتدقيق', Icon: FolderGit2 },
    { id: 'career', label: 'الرواتب وخطة التقديم', Icon: Briefcase },
    { id: 'playbook', label: 'القرارات والمقابلات', Icon: BookOpen },
    { id: 'analytics', label: 'التحليلات والنسخ', Icon: BarChart3 }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <button
          onClick={() => onTabChange('roadmaps')}
          className="flex items-center gap-2.5 group text-right shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shadow-sm shadow-blue-600/20 group-hover:scale-105 transition-transform">
            <InfinityIcon className="w-5 h-5" strokeWidth={2.2} />
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-extrabold text-slate-900 tracking-tight leading-none">
              Youssef<span className="text-blue-600">.DevOps</span>
            </div>
            <div className="text-[10px] font-medium text-slate-500 mt-1">
              Glassy Career Roadmap
            </div>
          </div>
        </button>

        {/* Clean Focused Navigation Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
          {navItems.map(({ id, label, Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => onTabChange(id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/25'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <Icon className="w-3.5 h-3.5" strokeWidth={2} />
                <span>{label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Search + Current Jump + Progress Pill */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenSearch}
            title="بحث سريع في الموديولات والأسئلة"
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-600 transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={onJumpToCurrent}
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100/80 border border-blue-200/70 text-blue-700 text-xs font-bold transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-blue-600 pulse-blue" />
            <span>2.4 Corey Schafer + KodeKloud</span>
          </button>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-bold font-mono">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{metrics.overallPct}%</span>
          </div>
        </div>
      </div>
    </header>
  );
}
