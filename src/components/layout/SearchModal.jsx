import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  ArrowLeft,
  Map,
  FolderGit2,
  BookOpen,
  Bookmark,
  HelpCircle
} from 'lucide-react';
import { ROADMAP_MODULES } from '../../data/roadmapData';
import { HIVEBOX_DATA } from '../../data/hiveboxData';
import { PLAYBOOK_DECISIONS } from '../../data/playbookData';

export function SearchModal({
  isOpen,
  onClose,
  data = {},
  onNavigateToTopic
}) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 40);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  const modules = data?.modules || ROADMAP_MODULES || [];
  const hiveboxPhases = data?.hivebox?.phases || HIVEBOX_DATA?.phases || [];
  const playbookDecisions = data?.playbook || PLAYBOOK_DECISIONS || [];
  const interviewQuizzes = data?.interviewQuizzes || [];
  const extraResources = data?.resources || [];

  const q = query.toLowerCase().trim();

  const results = useMemo(() => {
    if (!q) {
      return {
        topics: [],
        phases: [],
        decisions: [],
        resources: [],
        questions: []
      };
    }

    const topics = [];
    const resources = [];

    modules.forEach((mod) => {
      (mod.topics || []).forEach((t) => {
        const hit =
          t.title?.toLowerCase().includes(q) ||
          t.code?.toLowerCase().includes(q) ||
          t.whatYouDo?.toLowerCase().includes(q) ||
          (t.tags || []).some((tag) => tag.toLowerCase().includes(q)) ||
          (t.subtasks || []).some((s) => s.text?.toLowerCase().includes(q));
        if (hit) {
          topics.push({ mod, topic: t });
        }

        (t.resources || []).forEach((res) => {
          if (
            res.label?.toLowerCase().includes(q) ||
            res.type?.toLowerCase().includes(q) ||
            res.url?.toLowerCase().includes(q)
          ) {
            resources.push({
              id: `${t.id}-${res.label}`,
              label: res.label,
              type: res.type || 'Resource',
              url: res.url,
              context: `${t.code} ${t.title}`
            });
          }
        });
      });
    });

    extraResources.forEach((res, idx) => {
      if (
        res.label?.toLowerCase().includes(q) ||
        res.title?.toLowerCase().includes(q) ||
        res.category?.toLowerCase().includes(q)
      ) {
        resources.push({
          id: res.id || `extra-res-${idx}`,
          label: res.label || res.title,
          type: res.type || res.category || 'Resource',
          url: res.url,
          context: res.category || 'مصادر المسار'
        });
      }
    });

    const phases = hiveboxPhases.filter(
      (p) =>
        p.title?.toLowerCase().includes(q) ||
        p.purpose?.toLowerCase().includes(q) ||
        p.moduleRef?.toLowerCase().includes(q) ||
        (p.requiredTools || []).some((tool) => tool.toLowerCase().includes(q)) ||
        (p.deliverables || []).some((d) => d.text?.toLowerCase().includes(q))
    );

    const decisions = playbookDecisions.filter(
      (d) =>
        d.title?.toLowerCase().includes(q) ||
        d.stage?.toLowerCase().includes(q) ||
        d.whatProblem?.toLowerCase().includes(q) ||
        d.decisionScenario?.toLowerCase().includes(q) ||
        d.hiveboxStage?.toLowerCase().includes(q)
    );

    const questions = [];
    interviewQuizzes.forEach((quiz) => {
      (quiz.questions || []).forEach((iq) => {
        if (
          iq.question?.toLowerCase().includes(q) ||
          quiz.domain?.toLowerCase().includes(q)
        ) {
          questions.push({ domain: quiz.domain, question: iq.question, id: iq.id });
        }
      });
    });

    return {
      topics: topics.slice(0, 8),
      phases: phases.slice(0, 5),
      decisions: decisions.slice(0, 5),
      resources: resources.slice(0, 6),
      questions: questions.slice(0, 5)
    };
  }, [q, modules, hiveboxPhases, playbookDecisions, interviewQuizzes, extraResources]);

  if (!isOpen) return null;

  const hasAny =
    results.topics.length > 0 ||
    results.phases.length > 0 ||
    results.decisions.length > 0 ||
    results.resources.length > 0 ||
    results.questions.length > 0;

  const goTo = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-slate-900/45 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-20 px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
          <Search className="w-5 h-5 text-blue-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث في الموديولات، مراحل HiveBox، قرارات Playbook، والمصادر..."
            className="w-full text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-[65vh] overflow-y-auto p-4 space-y-5">
          {!q && (
            <div className="py-8 text-center text-xs text-slate-400 space-y-2">
              <div>
                اكتب كلمة مفتاحية مثل:{' '}
                <span className="font-mono text-slate-600">Python</span>،{' '}
                <span className="font-mono text-slate-600">Valkey</span>،{' '}
                <span className="font-mono text-slate-600">Kind</span>،{' '}
                <span className="font-mono text-slate-600">Argo CD</span>، أو{' '}
                <span className="font-mono text-slate-600">Trivy</span>
              </div>
              <div className="text-[11px] text-slate-400">
                اضغط <kbd className="px-1.5 py-0.5 rounded bg-slate-100 font-mono">Esc</kbd> للإغلاق
              </div>
            </div>
          )}

          {q && !hasAny && (
            <div className="py-8 text-center text-xs text-slate-400">
              لا توجد نتائج مطابقة لـ "{query}"
            </div>
          )}

          {results.topics.length > 0 && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 px-2">
                <Map className="w-3.5 h-3.5 text-blue-600" />
                <span>مواضيع الموديولات</span>
              </div>
              {results.topics.map(({ mod, topic }) => (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => {
                    onNavigateToTopic?.(mod.id, topic.id);
                    goTo(`/roadmap?module=${encodeURIComponent(mod.id)}&topic=${encodeURIComponent(topic.id)}`);
                  }}
                  className="w-full p-3 rounded-xl hover:bg-blue-50/80 border border-transparent hover:border-blue-100 flex items-center justify-between gap-3 text-right transition"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-extrabold text-slate-900 truncate">
                      <span className="font-mono text-blue-600 ml-1.5">{topic.code}</span>
                      {topic.title}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 truncate">
                      Module {mod.number}: {mod.title}
                    </div>
                  </div>
                  <ArrowLeft className="w-4 h-4 text-blue-600 shrink-0" />
                </button>
              ))}
            </div>
          )}

          {results.phases.length > 0 && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 px-2">
                <FolderGit2 className="w-3.5 h-3.5 text-indigo-600" />
                <span>مراحل HiveBox</span>
              </div>
              {results.phases.map((phase) => (
                <button
                  key={phase.id}
                  type="button"
                  onClick={() => goTo(`/hivebox?phase=${encodeURIComponent(phase.id)}`)}
                  className="w-full p-3 rounded-xl hover:bg-blue-50/80 border border-transparent hover:border-blue-100 flex items-center justify-between gap-3 text-right transition"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-extrabold text-slate-900 truncate">{phase.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5 truncate">{phase.purpose}</div>
                  </div>
                  <ArrowLeft className="w-4 h-4 text-blue-600 shrink-0" />
                </button>
              ))}
            </div>
          )}

          {results.decisions.length > 0 && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 px-2">
                <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                <span>قرارات الـ Engineering Playbook</span>
              </div>
              {results.decisions.map((decision) => (
                <button
                  key={decision.step}
                  type="button"
                  onClick={() => goTo(`/playbook?step=${encodeURIComponent(decision.step)}`)}
                  className="w-full p-3 rounded-xl hover:bg-blue-50/80 border border-transparent hover:border-blue-100 flex items-center justify-between gap-3 text-right transition"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-extrabold text-slate-900 truncate">
                      <span className="font-mono text-emerald-600 ml-1.5">#{decision.step}</span>
                      {decision.title}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 truncate">{decision.stage}</div>
                  </div>
                  <ArrowLeft className="w-4 h-4 text-blue-600 shrink-0" />
                </button>
              ))}
            </div>
          )}

          {results.resources.length > 0 && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 px-2">
                <Bookmark className="w-3.5 h-3.5 text-amber-600" />
                <span>المصادر والكورسات</span>
              </div>
              {results.resources.map((res) => (
                <button
                  key={res.id}
                  type="button"
                  onClick={() => goTo(`/resources?q=${encodeURIComponent(res.label)}`)}
                  className="w-full p-3 rounded-xl hover:bg-blue-50/80 border border-transparent hover:border-blue-100 flex items-center justify-between gap-3 text-right transition"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate">{res.label}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5 truncate">
                      {res.type} • {res.context}
                    </div>
                  </div>
                  <ArrowLeft className="w-4 h-4 text-blue-600 shrink-0" />
                </button>
              ))}
            </div>
          )}

          {results.questions.length > 0 && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 px-2">
                <HelpCircle className="w-3.5 h-3.5 text-violet-600" />
                <span>أسئلة الكويزات</span>
              </div>
              {results.questions.map((iq) => (
                <button
                  key={iq.id}
                  type="button"
                  onClick={() => goTo('/quiz')}
                  className="w-full p-3 rounded-xl hover:bg-blue-50/80 border border-transparent hover:border-blue-100 flex items-center justify-between gap-3 text-right transition"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate">{iq.question}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{iq.domain}</div>
                  </div>
                  <ArrowLeft className="w-4 h-4 text-blue-600 shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
