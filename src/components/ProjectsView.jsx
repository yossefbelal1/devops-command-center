import React, { useState } from 'react';
import {
  Box,
  Check,
  CheckCircle2,
  ChevronDown,
  Code2,
  ExternalLink,
  Server,
  ShieldCheck,
  Sparkles,
  Target,
  XCircle
} from 'lucide-react';
import { TechBadgeIcon } from './TechIcons';

export function ProjectsView({ data, progress, onToggleHivebox, onToggleAudit }) {
  const [subTab, setSubTab] = useState('hivebox');
  const [openPhases, setOpenPhases] = useState({ 'hb-2': true });
  const [openAudits, setOpenAudits] = useState({ 'cbp-1': true });
  const [auditCat, setAuditCat] = useState('all');

  const togglePhase = (id) => {
    setOpenPhases((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAuditBox = (id) => {
    setOpenAudits((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Hivebox stats
  let hbTotal = 0;
  let hbDone = 0;
  data.hivebox.phases.forEach((p) => {
    p.deliverables.forEach((d) => {
      hbTotal++;
      if (progress.hivebox[d.id] !== undefined ? progress.hivebox[d.id] : d.done) {
        hbDone++;
      }
    });
  });
  const hbPct = hbTotal > 0 ? Math.round((hbDone / hbTotal) * 100) : 0;

  // Audit stats
  const auditTotal = data.containerAudit.length;
  const auditPassed = data.containerAudit.filter((a) => progress.audit[a.id] !== false).length;
  const auditPct = Math.round((auditPassed / auditTotal) * 100);

  const filteredAudit = data.containerAudit.filter(
    (a) => auditCat === 'all' || a.category.toLowerCase().includes(auditCat.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Sub-Navigation Pill Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-blue-600 font-bold">
            HIVEBOX (7 PHASES), AUTOTELE & CONTAINER QUALITY
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            المشاريع العملية ومعايير الجودة الإنتاجية
          </h1>
        </div>

        <div className="inline-flex flex-wrap bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs self-start gap-1">
          <button
            onClick={() => setSubTab('hivebox')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
              subTab === 'hivebox'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Box className="w-4 h-4" />
            <span>مشروع HiveBox ({hbPct}%)</span>
          </button>

          <button
            onClick={() => setSubTab('autotele')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
              subTab === 'autotele'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Server className="w-4 h-4" />
            <span>AutoTele وبيئة العمل</span>
          </button>

          <button
            onClick={() => setSubTab('audit')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
              subTab === 'audit'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>معايير الحاويات ({auditPassed}/{auditTotal})</span>
          </button>
        </div>
      </div>

      {/* ================================================================ */}
      {/* TAB 1: REAL 7-PHASE HIVEBOX PROJECT (devopsroadmap.io)           */}
      {/* ================================================================ */}
      {subTab === 'hivebox' && (
        <div className="space-y-6">
          <div className="glass-v5-blue rounded-3xl p-6 sm:p-8 space-y-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <TechBadgeIcon type="python" size="sm" />
                  <TechBadgeIcon type="docker" size="sm" />
                  <TechBadgeIcon type="kubernetes" size="sm" />
                  <TechBadgeIcon type="terraform" size="sm" />
                  <TechBadgeIcon type="argocd" size="sm" />
                  <a
                    href={data.hivebox.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-[11px] font-mono font-bold hover:bg-blue-700 transition"
                  >
                    <span>yossefbelal1/Hivebox</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 pt-1">
                  {data.hivebox.title}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">{data.hivebox.overview}</p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-blue-100 shadow-xs min-w-[230px]">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-2">
                  <span>إنجاز المشروع (7 Phases)</span>
                  <span className="font-mono text-blue-600">{hbPct}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${hbPct}%` }}
                  />
                </div>
                <span className="text-[11px] text-slate-500 block mt-2">
                  {hbDone} من {hbTotal} مخرج تم تسليمه
                </span>
              </div>
            </div>

            {/* Full Official Stack Tags */}
            <div className="pt-3 border-t border-blue-200/50 flex flex-wrap gap-1.5">
              {data.hivebox.architectureStack.map((st) => (
                <span
                  key={st}
                  className="px-2.5 py-1 rounded-lg bg-white/90 border border-blue-100 text-slate-700 font-mono text-[11px] font-semibold"
                >
                  {st}
                </span>
              ))}
            </div>
          </div>

          {/* 7-Phase Timeline */}
          <div className="relative space-y-4 md:pr-8 md:before:content-[''] md:before:absolute md:before:right-3 md:before:top-4 md:before:bottom-4 md:before:w-[2px] md:before:bg-slate-200">
            {data.hivebox.phases.map((phase) => {
              const isOpen = !!openPhases[phase.id];
              const doneCount = phase.deliverables.filter((d) =>
                progress.hivebox[d.id] !== undefined ? progress.hivebox[d.id] : d.done
              ).length;
              const isAllDone = doneCount === phase.deliverables.length;

              return (
                <div key={phase.id} className="relative">
                  <div
                    className={`hidden md:flex absolute -right-[30px] top-6 w-7 h-7 rounded-full items-center justify-center text-xs font-bold font-mono z-10 ${
                      isAllDone
                        ? 'bg-emerald-500 text-white'
                        : phase.phase === 2
                        ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                        : 'bg-white border-2 border-slate-300 text-slate-600'
                    }`}
                  >
                    {isAllDone ? <Check className="w-3.5 h-3.5" /> : phase.phase}
                  </div>

                  <div
                    className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition ${
                      phase.phase === 2 ? 'border-blue-300' : 'border-slate-200/90'
                    }`}
                  >
                    <div
                      onClick={() => togglePhase(phase.id)}
                      className="p-5 cursor-pointer hover:bg-slate-50/70 transition flex items-center justify-between gap-4 select-none"
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-700 font-mono text-xs font-bold border border-blue-200/70">
                            Phase {phase.phase}
                          </span>
                          <span className="text-[11px] font-semibold text-slate-400">
                            {phase.moduleRef}
                          </span>
                        </div>
                        <h3 className="text-base font-extrabold text-slate-900">{phase.title}</h3>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span
                          className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full ${
                            isAllDone
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {doneCount}/{phase.deliverables.length}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                            isOpen ? 'rotate-180 text-blue-600' : ''
                          }`}
                        />
                      </div>
                    </div>

                    <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
                      <div className="accordion-inner">
                        <div className="p-5 pt-0 border-t border-slate-100 space-y-4">
                          {/* Stack */}
                          <div className="flex flex-wrap gap-1.5 pt-4">
                            {phase.stack.map((tech) => (
                              <span
                                key={tech}
                                className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-mono text-[11px] font-semibold"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          {/* What You Do + Example Code */}
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                              <span className="text-[11px] font-extrabold text-blue-700 flex items-center gap-1.5">
                                <Target className="w-3.5 h-3.5" />
                                المطلوب منك تنفيذه:
                              </span>
                              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                                {phase.whatYouDo}
                              </p>
                            </div>

                            <div className="p-4 rounded-xl bg-[#0B192C] text-slate-100 space-y-1.5">
                              <span className="text-[11px] font-mono font-bold text-blue-300 flex items-center gap-1.5">
                                <Code2 className="w-3.5 h-3.5" />
                                مثال / مواصفة تقنية للمرحلة:
                              </span>
                              <pre className="text-[11px] font-mono leading-relaxed overflow-x-auto text-emerald-300 whitespace-pre-wrap">
                                {phase.exampleCode}
                              </pre>
                            </div>
                          </div>

                          {/* Deliverables */}
                          <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                            {phase.deliverables.map((del) => {
                              const checked =
                                progress.hivebox[del.id] !== undefined
                                  ? progress.hivebox[del.id]
                                  : del.done;
                              return (
                                <label
                                  key={del.id}
                                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition ${
                                    checked ? 'bg-emerald-50/40' : 'hover:bg-slate-50'
                                  }`}
                                >
                                  <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => onToggleHivebox(del.id)}
                                    className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
                                  />
                                  <span
                                    className={`text-xs sm:text-sm font-medium ${
                                      checked ? 'line-through text-slate-400' : 'text-slate-800'
                                    }`}
                                  >
                                    {del.text}
                                  </span>
                                </label>
                              );
                            })}
                          </div>

                          <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/70 flex items-start gap-2.5">
                            <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                            <div className="text-xs text-slate-700">
                              <strong className="text-blue-800">معيار الإنجاز: </strong>
                              {phase.verification}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* TAB 2: AUTOTELE PORTFOLIO & LAB ENVIRONMENT                      */}
      {/* ================================================================ */}
      {subTab === 'autotele' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                موجود في البورتفوليو الحالي
              </span>
              <a
                href="https://github.com/yossefbelal1/AutoTele"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                <span>github.com/yossefbelal1/AutoTele</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">مشروع AutoTele SaaS</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              منصة SaaS متكاملة لتبادل الإعلانات على تليجرام. ميزة قوية جداً في الـ CV لأنك بنيتها
              بنفسك بـ Multiple Workers و PostgreSQL و Docker.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['Python asyncio', 'Telethon', 'Multiple Workers', 'PostgreSQL', 'Docker'].map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-mono text-[11px] font-semibold"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/70 text-xs text-slate-700 space-y-1.5">
              <strong className="text-blue-900 block">الترقية المطلوبة في Module 7 (Capstone):</strong>
              <ul className="list-disc list-inside space-y-1">
                <li>رسم Architecture Diagram احترافي (C4 Model) يوضح Workers + Postgres + Docker</li>
                <li>إضافة GitHub Actions CI + Hadolint + Multi-stage Dockerfile</li>
                <li>توثيق الـ Deployment والنسخ الاحتياطي كـ Production Case Study</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold inline-block">
              بيئة التطوير الحالية (Active Lab)
            </span>
            <h2 className="text-xl font-extrabold text-slate-900">خادمك المحلي وأدوات التنفيذ</h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
                <strong className="text-slate-900 block mb-1">جهاز التطوير الأساسي:</strong>
                Windows + VS Code + Git مربوط بحساب <code className="font-mono text-blue-600">yossefbelal1</code>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
                <strong className="text-slate-900 block mb-1">سيرفر اللاب العملي (RHEL VM):</strong>
                <span className="font-mono text-xs text-emerald-700 block">
                  yossef@RedHatLap • Docker 29.9.3 (rootless / no sudo) • Python 3.9.25
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs leading-relaxed">
                <strong>القاعدة الصارمة الحالية:</strong> تخطى Jenkins واستخدم GitHub Actions، ولا تقفز لـ
                Kubernetes أو Terraform قبل إنهاء Corey Schafer (6 فيديوهات) + لابات KodeKloud + تسليم
                HiveBox Phase 2 على نفس مستودع <code className="font-mono">yossefbelal1/Hivebox</code>.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* TAB 3: EXPANDABLE CONTAINER QUALITY BOXES WITH EXAMPLES & TOOLS  */}
      {/* ================================================================ */}
      {subTab === 'audit' && (
        <div className="space-y-6">
          <div className="glass-v5-blue rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                15 معيار جودة وإنتاجية للحاويات (افتح أي بوكس لرؤية المثال والأداة)
              </h2>
              <p className="text-sm text-slate-600">
                كل قاعدة تحتوي على المطلوب منك + الستاك/الأداة المستخدمة + مثال عملي جاهز للتطبيق في
                HiveBox.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-blue-100 shadow-xs flex items-center gap-4">
              <div className="text-3xl font-black font-mono text-emerald-600">{auditPct}%</div>
              <div className="text-xs text-slate-600">
                <strong className="block text-slate-900">معدل الامتثال</strong>
                {auditPassed} من {auditTotal} قاعدة
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {['all', 'Security', 'Performance', 'Reliability', 'Architecture'].map((cat) => (
              <button
                key={cat}
                onClick={() => setAuditCat(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  auditCat === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {cat === 'all' ? 'الكل (15)' : cat}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredAudit.map((item, idx) => {
              const isPassed = progress.audit[item.id] !== false;
              const isOpen = !!openAudits[item.id];

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl border transition overflow-hidden ${
                    isPassed ? 'border-slate-200/90' : 'border-rose-200 bg-rose-50/20'
                  }`}
                >
                  <div
                    onClick={() => toggleAuditBox(item.id)}
                    className="p-4 sm:p-5 cursor-pointer hover:bg-slate-50/70 transition flex items-center justify-between gap-4 select-none"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xs font-mono font-bold text-slate-400 shrink-0">
                        #{idx + 1}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-sm sm:text-base font-extrabold text-slate-900 truncate">
                          {item.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                            الأداة: {item.tool}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleAudit(item.id);
                        }}
                        className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 transition ${
                          isPassed
                            ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                            : 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                        }`}
                      >
                        {isPassed ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" /> ممتثل
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5" /> غير ممتثل
                          </>
                        )}
                      </button>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-blue-600' : ''
                        }`}
                      />
                    </div>
                  </div>

                  <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
                    <div className="accordion-inner">
                      <div className="p-5 pt-0 border-t border-slate-100 grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5 mt-4">
                          <span className="text-[11px] font-extrabold text-blue-700 block">
                            المطلوب منك إيه:
                          </span>
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                            {item.whatYouDo}
                          </p>
                        </div>

                        <div className="p-4 rounded-xl bg-[#0B192C] text-slate-100 space-y-1.5 mt-0 lg:mt-4">
                          <span className="text-[11px] font-mono font-bold text-blue-300 block">
                            مثال عملي ({item.tool}):
                          </span>
                          <pre className="text-[11px] font-mono leading-relaxed text-emerald-300 overflow-x-auto whitespace-pre-wrap">
                            {item.example}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
