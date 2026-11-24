import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Circle,
  ChevronDown,
  Clock,
  ExternalLink,
  FileText,
  Layers,
  Play,
  Sparkles,
  Target
} from 'lucide-react';
import { SpotlightCard, CountUp } from './ReactBitsUI';
import { TechBadgeIcon } from './TechIcons';

export function RoadmapsView({
  data,
  progress,
  metrics,
  selectedModuleId,
  onSelectModule,
  onToggleSubtask,
  onSetTopicStatus,
  onSaveTopicNote,
  lenisRef
}) {
  const [filter, setFilter] = useState('all');
  const [expandedTopics, setExpandedTopics] = useState({ 'm2-4': true, 'm2-5': true });
  const [activeTimelineTopicId, setActiveTimelineTopicId] = useState('m2-4');
  const cardsContainerRef = useRef(null);
  const topicRefs = useRef({});

  // GSAP stagger entrance for module cards
  useEffect(() => {
    if (!selectedModuleId && cardsContainerRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.module-card-anim',
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.07,
            ease: 'power3.out',
            clearProps: 'transform'
          }
        );
      }, cardsContainerRef);
      return () => ctx.revert();
    }
  }, [selectedModuleId, filter]);

  // Helper to compute module progress
  const getModuleStats = (mod) => {
    let totalSub = 0;
    let doneSub = 0;
    let doneTopics = 0;

    mod.topics.forEach((topic) => {
      const tStatus = progress.topicStatus[topic.id] || topic.defaultStatus;
      if (tStatus === 'done') doneTopics++;

      topic.subtasks.forEach((sub) => {
        totalSub++;
        const isSubDone =
          progress.subtasks[sub.id] !== undefined ? progress.subtasks[sub.id] : sub.done;
        if (isSubDone) doneSub++;
      });
    });

    const pct = totalSub > 0 ? Math.round((doneSub / totalSub) * 100) : 0;
    const isComplete = doneTopics === mod.topics.length;
    const isCurrent = mod.id === data.meta.currentModuleId;
    return { totalSub, doneSub, doneTopics, totalTopics: mod.topics.length, pct, isComplete, isCurrent };
  };

  // Scroll observer for Timeline Sync when inside a module
  useEffect(() => {
    if (!selectedModuleId) return;
    const mod = data.modules.find((m) => m.id === selectedModuleId);
    if (!mod) return;

    // Auto expand first in_progress or first topic
    const firstActive =
      mod.topics.find((t) => (progress.topicStatus[t.id] || t.defaultStatus) === 'in_progress') ||
      mod.topics[0];
    if (firstActive) {
      setActiveTimelineTopicId(firstActive.id);
      setExpandedTopics((prev) => ({ ...prev, [firstActive.id]: true }));
    }

    const handleScroll = () => {
      const offset = 180;
      for (const topic of mod.topics) {
        const el = topicRefs.current[topic.id];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset && rect.bottom >= offset) {
            setActiveTimelineTopicId(topic.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedModuleId]);

  const scrollToTopic = (topicId) => {
    setActiveTimelineTopicId(topicId);
    setExpandedTopics((prev) => ({ ...prev, [topicId]: true }));
    setTimeout(() => {
      const el = topicRefs.current[topicId];
      if (el) {
        if (lenisRef && lenisRef.current) {
          lenisRef.current.scrollTo(el, { offset: -95, duration: 0.9 });
        } else {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, 60);
  };

  const toggleTopicAccordion = (topicId) => {
    setExpandedTopics((prev) => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const expandAllTopics = (mod, expand) => {
    const next = {};
    mod.topics.forEach((t) => {
      next[t.id] = expand;
    });
    setExpandedTopics(next);
  };

  // =========================================================================
  // VIEW A: MODULE DETAIL / LEARNING JOURNEY TIMELINE VIEW (Image 2 Style)
  // =========================================================================
  if (selectedModuleId) {
    const modIdx = data.modules.findIndex((m) => m.id === selectedModuleId);
    const mod = data.modules[modIdx];
    const nextMod = data.modules[modIdx + 1];
    const modStats = getModuleStats(mod);

    return (
      <div className="pb-16">
        {/* Top Module Hero Banner */}
        <div
          className={`bg-gradient-to-l ${mod.cardTheme} text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative overflow-hidden`}
        >
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.4) 1px, transparent 1px)',
              backgroundSize: '28px 28px'
            }}
          />
          <div className="max-w-7xl mx-auto relative z-10 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={() => onSelectModule(null)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold backdrop-blur-md border border-white/15 transition"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                <span>العودة لجميع الموديولات (7 Modules)</span>
              </button>

              <div className="flex items-center gap-2">
                {mod.techIcons.map((ic, i) => (
                  <TechBadgeIcon key={i} type={ic} size="sm" />
                ))}
              </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-2 max-w-3xl">
                <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-blue-200">
                  <span>MODULE {mod.number}</span>
                  <span>•</span>
                  <span>{mod.monthRange}</span>
                  <span>•</span>
                  <span>{mod.estimatedHours} ساعة تقديرية</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                  {mod.title}
                </h1>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed">{mod.subtitle}</p>
              </div>

              {/* Module Progress Box */}
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 min-w-[240px]">
                <div className="flex items-center justify-between text-xs font-bold mb-2">
                  <span>إنجاز الموديول</span>
                  <span className="font-mono">{modStats.pct}%</span>
                </div>
                <div className="w-full h-2 bg-black/25 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-500"
                    style={{ width: `${modStats.pct}%` }}
                  />
                </div>
                <div className="mt-2 text-[11px] text-white/75 flex items-center justify-between">
                  <span>{modStats.doneSub} من {modStats.totalSub} نقطة فرعية</span>
                  <span>{modStats.doneTopics}/{modStats.totalTopics} مواضيع</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Split Layout: Sticky Timeline Sidebar + Timeline Accordion Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* RIGHT SIDEBAR (RTL): Sticky Learning Journey Timeline */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-5">
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-blue-600 font-bold block">
                      YOUR ROADMAP
                    </span>
                    <h2 className="text-lg font-extrabold text-slate-900">رحلة التعلم</h2>
                  </div>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                    {modStats.doneTopics} من {modStats.totalTopics} مكتمل
                  </span>
                </div>

                <div className="space-y-5">
                  {mod.sections.map((section, sIdx) => (
                    <div key={sIdx} className="space-y-2.5">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wide px-1">
                        {section.title}
                      </div>

                      <div className="relative pr-3 space-y-1.5 before:content-[''] before:absolute before:right-[15px] before:top-2 before:bottom-2 before:w-[1.5px] before:bg-slate-200">
                        {section.topicIds.map((tId) => {
                          const topic = mod.topics.find((t) => t.id === tId);
                          if (!topic) return null;
                          const status = progress.topicStatus[topic.id] || topic.defaultStatus;
                          const isActive = activeTimelineTopicId === topic.id;
                          const doneSubs = topic.subtasks.filter((s) =>
                            progress.subtasks[s.id] !== undefined ? progress.subtasks[s.id] : s.done
                          ).length;

                          return (
                            <button
                              key={topic.id}
                              onClick={() => scrollToTopic(topic.id)}
                              className={`w-full relative flex items-center justify-between gap-2.5 p-2.5 rounded-xl text-right transition-all ${
                                isActive
                                  ? 'bg-blue-50/90 border border-blue-200 text-blue-900 shadow-xs'
                                  : 'hover:bg-slate-50 text-slate-700 border border-transparent'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <span
                                  className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold transition-all ${
                                    status === 'done'
                                      ? 'bg-emerald-500 text-white'
                                      : isActive || status === 'in_progress'
                                      ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                                      : 'bg-white border-2 border-slate-300 text-slate-500'
                                  }`}
                                >
                                  {status === 'done' ? <Check className="w-3.5 h-3.5" /> : topic.code}
                                </span>
                                <span className="text-xs font-bold truncate">{topic.title}</span>
                              </div>
                              <span className="text-[10px] font-mono text-slate-400 shrink-0">
                                {doneSubs}/{topic.subtasks.length}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* LEFT MAIN CONTENT: Timeline Scrolling Accordion Cards */}
            <div className="lg:col-span-8 space-y-5">
              {/* Control Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white/80 backdrop-blur-md px-4 py-3 rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span>اضغط على أي جزء لفتحه أو إغلاقه وعلم كل نقطة تنجزها:</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => expandAllTopics(mod, true)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                  >
                    فتح الكل
                  </button>
                  <button
                    onClick={() => expandAllTopics(mod, false)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                  >
                    طي الكل
                  </button>
                </div>
              </div>

              {/* Vertical Timeline Rail + Cards */}
              <div className="relative space-y-5 md:pr-8 md:before:content-[''] md:before:absolute md:before:right-3 md:before:top-4 md:before:bottom-4 md:before:w-[2px] md:before:bg-slate-200">
                {mod.topics.map((topic, tIdx) => {
                  const status = progress.topicStatus[topic.id] || topic.defaultStatus;
                  const isOpen = !!expandedTopics[topic.id];
                  const isFocused = activeTimelineTopicId === topic.id;
                  const noteVal = progress.topicNotes[topic.id] || '';
                  const doneSubs = topic.subtasks.filter((s) =>
                    progress.subtasks[s.id] !== undefined ? progress.subtasks[s.id] : s.done
                  ).length;
                  const subPct = Math.round((doneSubs / topic.subtasks.length) * 100);

                  return (
                    <div
                      key={topic.id}
                      ref={(el) => (topicRefs.current[topic.id] = el)}
                      className="relative"
                    >
                      {/* Timeline Node Marker */}
                      <div
                        className={`hidden md:flex absolute -right-[30px] top-6 w-7 h-7 rounded-full items-center justify-center text-[10px] font-bold font-mono z-10 transition-all ${
                          status === 'done'
                            ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/30'
                            : status === 'in_progress' || isFocused
                            ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                            : 'bg-white border-2 border-slate-300 text-slate-500'
                        }`}
                      >
                        {status === 'done' ? <Check className="w-3.5 h-3.5" /> : topic.code}
                      </div>

                      {/* Topic Card (Image 2 Clean White Floating Card!) */}
                      <div
                        className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                          isFocused
                            ? 'border-blue-300 shadow-[0_14px_35px_-12px_rgba(37,99,235,0.16)]'
                            : 'border-slate-200/90 shadow-sm hover:border-slate-300'
                        }`}
                      >
                        {/* Card Accordion Trigger Header */}
                        <div
                          onClick={() => toggleTopicAccordion(topic.id)}
                          className="p-5 cursor-pointer flex items-center justify-between gap-4 select-none hover:bg-slate-50/70 transition-colors"
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            <span
                              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold shrink-0 ${
                                status === 'done'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : status === 'in_progress'
                                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                  : 'bg-slate-100 text-slate-600 border border-slate-200'
                              }`}
                            >
                              {topic.code}
                            </span>
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 truncate">
                                  {topic.title}
                                </h3>
                                {status === 'in_progress' && (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
                                    قيد التنفيذ الآن
                                  </span>
                                )}
                                {status === 'done' && (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                                    مكتمل
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                                <span className="inline-flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5" />
                                  {topic.hours} ساعات
                                </span>
                                <span>•</span>
                                <span className="font-mono text-blue-600 font-semibold">
                                  {doneSubs} / {topic.subtasks.length} نقاط ({subPct}%)
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <div className="hidden sm:block w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-300 ${
                                  status === 'done' ? 'bg-emerald-500' : 'bg-blue-600'
                                }`}
                                style={{ width: `${subPct}%` }}
                              />
                            </div>
                            <ChevronDown
                              className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                                isOpen ? 'rotate-180 text-blue-600' : ''
                              }`}
                            />
                          </div>
                        </div>

                        {/* Collapsible Topic Details (Smooth Grid Accordion) */}
                        <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
                          <div className="accordion-inner">
                            <div className="border-t border-slate-100">
                              {/* Mini Visual Banner matching Image 2 Card Header */}
                              <div className="bg-gradient-to-l from-[#0B1F3A] via-[#0F2C59] to-[#163E7A] px-6 py-4 text-white flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <TechBadgeIcon type={mod.techIcons[0]} size="sm" />
                                  <div>
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-blue-200 block">
                                      TOPIC {topic.code} • {tIdx + 1} OF {mod.topics.length}
                                    </span>
                                    <div className="flex flex-wrap gap-1.5 mt-1">
                                      {topic.tags.map((tag) => (
                                        <span
                                          key={tag}
                                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/15 text-white/95"
                                        >
                                          {tag}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onSetTopicStatus(
                                      topic.id,
                                      status === 'done' ? 'pending' : 'done'
                                    );
                                  }}
                                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                                    status === 'done'
                                      ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                                      : 'bg-white text-slate-900 hover:bg-blue-50'
                                  }`}
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>{status === 'done' ? 'تم الإنجاز' : 'تعليم كمكتمل'}</span>
                                </button>
                              </div>

                              <div className="p-6 space-y-5">
                                {/* What you do & Deliverable Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                                    <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
                                      <Target className="w-3.5 h-3.5 text-blue-600" />
                                      مطلوب منك إيه في الجزء ده:
                                    </span>
                                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                                      {topic.whatYouDo}
                                    </p>
                                  </div>

                                  <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/70 space-y-1.5">
                                    <span className="text-[11px] font-extrabold text-blue-700 uppercase tracking-wide flex items-center gap-1.5">
                                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                                      المخرج العملي المطلوب (Deliverable):
                                    </span>
                                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-semibold">
                                      {topic.deliverable}
                                    </p>
                                  </div>
                                </div>

                                {/* Granular Interactive Sub-Checklist */}
                                <div className="space-y-2.5">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-extrabold text-slate-900">
                                      شيك ليست النقاط التفصيلية ({doneSubs} من {topic.subtasks.length}):
                                    </span>
                                    <span className="text-[11px] text-slate-400">
                                      اضغط على أي نقطة لتحديث تقدمك
                                    </span>
                                  </div>

                                  <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
                                    {topic.subtasks.map((sub, sIdx) => {
                                      const isSubDone =
                                        progress.subtasks[sub.id] !== undefined
                                          ? progress.subtasks[sub.id]
                                          : sub.done;

                                      return (
                                        <label
                                          key={sub.id}
                                          className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                                            isSubDone
                                              ? 'bg-emerald-50/40 hover:bg-emerald-50/70'
                                              : 'hover:bg-slate-50'
                                          }`}
                                        >
                                          <input
                                            type="checkbox"
                                            checked={isSubDone}
                                            onChange={() => onToggleSubtask(topic, sub.id)}
                                            className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer shrink-0"
                                          />
                                          <span className="text-[11px] font-mono text-slate-400 shrink-0">
                                            {topic.code}.{sIdx + 1}
                                          </span>
                                          <span
                                            className={`text-xs sm:text-sm font-medium transition-all ${
                                              isSubDone
                                                ? 'line-through text-slate-400'
                                                : 'text-slate-800'
                                            }`}
                                          >
                                            {sub.text}
                                          </span>
                                        </label>
                                      );
                                    })}
                                  </div>
                                </div>

                                {/* Resources & Status Bar */}
                                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                                  <div className="flex flex-wrap items-center gap-2">
                                    {topic.resources.map((res, rIdx) => (
                                      <a
                                        key={rIdx}
                                        href={res.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm shadow-blue-600/20 transition"
                                      >
                                        <Play className="w-3 h-3 fill-current" />
                                        <span>{res.label}</span>
                                        <ExternalLink className="w-3 h-3 opacity-80" />
                                      </a>
                                    ))}
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-slate-500 font-semibold">الحالة:</span>
                                    <select
                                      value={status}
                                      onChange={(e) => onSetTopicStatus(topic.id, e.target.value)}
                                      className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-500"
                                    >
                                      <option value="pending">متبقي</option>
                                      <option value="in_progress">قيد التنفيذ</option>
                                      <option value="done">مكتمل</option>
                                    </select>
                                  </div>
                                </div>

                                {/* Personal Notes */}
                                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                                  <label className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
                                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                                    ملاحظاتك الشخصية لهذا الجزء (تُحفظ تلقائياً):
                                  </label>
                                  <textarea
                                    rows={2}
                                    value={noteVal}
                                    onChange={(e) => onSaveTopicNote(topic.id, e.target.value)}
                                    placeholder="اكتب الدرس اللي وقفت عنده أو رابط حل اللاب أو أي ملاحظة سريعة..."
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 transition"
                                  />
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

              {/* Bottom Next Module Callout (Image 2 Bottom Dark Banner!) */}
              {nextMod && (
                <div className="mt-10 rounded-3xl bg-[#0B192C] text-white p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-blue-400 font-bold">
                      KEEP GROWING • NEXT MODULE
                    </span>
                    <h3 className="text-2xl font-extrabold">جاهز للمرحلة التالية؟</h3>
                    <p className="text-sm text-slate-300">
                      انتقل إلى <strong>Module {nextMod.number}: {nextMod.title}</strong> ({nextMod.monthRange})
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onSelectModule(nextMod.id);
                      if (lenisRef && lenisRef.current) lenisRef.current.scrollTo(0);
                    }}
                    className="px-5 py-3 rounded-xl bg-white hover:bg-blue-50 text-slate-900 font-extrabold text-sm transition shrink-0 flex items-center gap-2"
                  >
                    <span>افتح Module {nextMod.number}</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW B: HOME CARDS OVERVIEW — ALL 7 MODULES (Image 1 + Glassy V5 Header)
  // =========================================================================
  const filteredModules = data.modules.filter((mod) => {
    const s = getModuleStats(mod);
    if (filter === 'done') return s.isComplete;
    if (filter === 'current') return s.isCurrent;
    if (filter === 'upcoming') return !s.isComplete && !s.isCurrent;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Glassy V5 Blue-and-White Hero & Analytics Strip */}
      <section className="glass-v5-blue rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute -left-20 -top-20 w-72 h-72 bg-blue-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-700 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-blue-600 pulse-blue" />
              <span>محطتك الحالية: Module 2 — Python (Corey Schafer الـ 6 + KodeKloud) & HiveBox Phase 2</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              مسارك الكامل لاحتراف <span className="text-blue-600">DevOps & Cloud</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              خطة عملية منظمة لـ <strong>{data.meta.studentName}</strong> على وتيرة {data.meta.pace} —
              اضغط على أي موديول من الكروت السبعة للدخول إلى شيك ليست النقاط التفصيلية بالتايم لاين.
            </p>
            <div className="pt-1 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectModule('module-2')}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md shadow-blue-600/20 transition flex items-center gap-2"
              >
                <span>أكمل Module 2 الآن</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-semibold text-slate-500">
                الجدول المستهدف: {data.meta.timelineRange}
              </span>
            </div>
          </div>

          {/* 4 Glassy Analytics Mini-Cards */}
          <div className="grid grid-cols-2 gap-3.5 w-full lg:w-[420px] shrink-0">
            <div className="bg-white/90 border border-blue-100 rounded-2xl p-4 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 block">الإنجاز الكلي</span>
              <div className="text-2xl font-black text-blue-600 font-mono mt-1">
                <CountUp to={metrics.overallPct} suffix="%" />
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                {metrics.doneSubtasks} / {metrics.totalSubtasks} نقطة
              </span>
            </div>

            <div className="bg-white/90 border border-blue-100 rounded-2xl p-4 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 block">الساعات المقدرة</span>
              <div className="text-2xl font-black text-slate-900 font-mono mt-1">
                <CountUp to={metrics.doneHours} suffix="h" />
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                من أصل {metrics.totalHours} ساعة
              </span>
            </div>

            <div className="bg-white/90 border border-blue-100 rounded-2xl p-4 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 block">مشروع HiveBox</span>
              <div className="text-2xl font-black text-emerald-600 font-mono mt-1">
                <CountUp to={metrics.hbPct} suffix="%" />
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                {metrics.hbDone} / {metrics.hbTotal} مخرج
              </span>
            </div>

            <div className="bg-white/90 border border-blue-100 rounded-2xl p-4 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 block">بداية التقديم</span>
              <div className="text-lg font-black text-slate-900 mt-1.5">مايو 2027</div>
              <span className="text-[11px] text-blue-600 font-bold mt-1 block">الشهر السادس</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section Header + Filter Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">الموديولات السبعة للمسار (Modules 01 – 07)</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            اضغط على أي كارت لفتح تفاصيله ونقاطه بنظام Timeline Scrolling
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-xl border border-slate-200 shadow-xs">
          {[
            { id: 'all', label: 'الكل (7)' },
            { id: 'current', label: 'المحطة الحالية' },
            { id: 'done', label: 'المكتملة' },
            { id: 'upcoming', label: 'القادمة' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                filter === f.id
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* 7 MODULE CARDS GRID (Matching Image 1 Aesthetics!) */}
      <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredModules.map((mod, idx) => {
          const s = getModuleStats(mod);
          const isLastOdd = filteredModules.length === 7 && idx === 6;

          return (
            <SpotlightCard
              key={mod.id}
              onClick={() => onSelectModule(mod.id)}
              className={`module-card-anim group cursor-pointer rounded-3xl bg-gradient-to-br ${mod.cardTheme} p-7 text-white shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ${
                isLastOdd ? 'md:col-span-2' : ''
              } ${s.isCurrent ? 'ring-4 ring-blue-500/35' : ''}`}
            >
              <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
                {/* Top Row: Number & Pill */}
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-mono font-bold text-white/75 tracking-widest">
                    {mod.number}
                  </span>

                  <div className="flex items-center gap-2">
                    {s.isCurrent && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white text-blue-900 text-[10px] font-extrabold shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />
                        أنت هنا الآن
                      </span>
                    )}
                    <span className="px-3 py-1 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm text-[10px] font-bold tracking-wide uppercase">
                      {mod.badge}
                    </span>
                  </div>
                </div>

                {/* Tech Icons + Title + Subtitle */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    {mod.techIcons.map((ic, i) => (
                      <TechBadgeIcon key={i} type={ic} size="md" />
                    ))}
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-2xl sm:text-[26px] font-extrabold tracking-tight leading-snug">
                      {mod.title}
                    </h3>
                    <p className="text-sm text-white/80 leading-relaxed max-w-2xl">
                      {mod.subtitle}
                    </p>
                  </div>
                </div>

                {/* Progress Bar & CTA Footer */}
                <div className="space-y-4 pt-2">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-white/80 font-medium">
                      <span>
                        {s.doneSub} من {s.totalSub} نقطة مكتملة
                      </span>
                      <span className="font-mono font-bold">{s.pct}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/15 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white rounded-full transition-all duration-500"
                        style={{ width: `${s.pct}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-white/15">
                    <span className="inline-flex items-center gap-2 text-sm font-bold underline decoration-white/40 underline-offset-4 group-hover:decoration-white transition-all">
                      <span>استكشف الموديول والنقاط</span>
                      <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                    </span>
                    <span className="text-xs font-mono text-white/70">
                      {mod.estimatedHours} ساعة • {mod.topics.length} مواضيع
                    </span>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </div>
  );
}
