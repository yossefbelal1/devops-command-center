import React from 'react';
import {
  Terminal,
  GitBranch,
  Box,
  Cpu,
  Cloud,
  ShieldCheck,
  Activity,
  Layers,
  Code2,
  Workflow,
  Database,
  Server,
  Sparkles,
  Briefcase,
  Network,
  Compass
} from 'lucide-react';

export function TechBadgeIcon({ type, size = 'md' }) {
  const dim = size === 'sm' ? 'w-7 h-7' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10';
  const iconDim = size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';

  const iconMap = {
    linux: { Icon: Terminal, color: 'text-slate-900', bg: 'bg-white' },
    git: { Icon: GitBranch, color: 'text-orange-600', bg: 'bg-white' },
    docker: { Icon: Box, color: 'text-sky-600', bg: 'bg-white' },
    python: { Icon: Code2, color: 'text-blue-600', bg: 'bg-white' },
    bash: { Icon: Terminal, color: 'text-emerald-700', bg: 'bg-white' },
    github: { Icon: Workflow, color: 'text-slate-900', bg: 'bg-white' },
    aws: { Icon: Cloud, color: 'text-amber-600', bg: 'bg-white' },
    kubernetes: { Icon: Compass, color: 'text-blue-600', bg: 'bg-white' },
    helm: { Icon: Layers, color: 'text-indigo-700', bg: 'bg-white' },
    terraform: { Icon: Server, color: 'text-purple-700', bg: 'bg-white' },
    argocd: { Icon: Workflow, color: 'text-orange-600', bg: 'bg-white' },
    prometheus: { Icon: Activity, color: 'text-rose-600', bg: 'bg-white' },
    grafana: { Icon: Activity, color: 'text-amber-500', bg: 'bg-white' },
    security: { Icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-white' },
    ansible: { Icon: Cpu, color: 'text-red-700', bg: 'bg-white' },
    ai: { Icon: Sparkles, color: 'text-violet-600', bg: 'bg-white' },
    career: { Icon: Briefcase, color: 'text-blue-700', bg: 'bg-white' },
    nginx: { Icon: Network, color: 'text-emerald-600', bg: 'bg-white' },
    network: { Icon: Network, color: 'text-cyan-600', bg: 'bg-white' },
    terminal: { Icon: Terminal, color: 'text-slate-800', bg: 'bg-white' },
    database: { Icon: Database, color: 'text-blue-700', bg: 'bg-white' }
  };

  const entry = iconMap[type] || { Icon: Box, color: 'text-blue-600', bg: 'bg-white' };
  const IconComp = entry.Icon;

  return (
    <div
      className={`${dim} rounded-full ${entry.bg} shadow-md ring-1 ring-black/5 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105`}
    >
      <IconComp className={`${iconDim} ${entry.color}`} strokeWidth={2} />
    </div>
  );
}
