import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowLeft } from 'lucide-react';

export function SearchModal({ isOpen, onClose, data, onNavigateToTopic, onNavigateTab }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();
  const topicMatches = [];
  if (q.length >= 1) {
    data.modules.forEach((mod) => {
      mod.topics.forEach((t) => {
        const hit =
          t.title.toLowerCase().includes(q) ||
          t.code.toLowerCase().includes(q) ||
          t.whatYouDo.toLowerCase().includes(q) ||
          t.subtasks.some((s) => s.text.toLowerCase().includes(q));
        if (hit) {
          topicMatches.push({ mod, topic: t });
        }
      });
    });
  }

  const questionMatches = [];
  if (q.length >= 1 && data.interviewQuizzes) {
    data.interviewQuizzes.forEach((quiz) => {
      quiz.questions.forEach((iq) => {
        if (
          iq.question.toLowerCase().includes(q) ||
          quiz.domain.toLowerCase().includes(q)
        ) {
          questionMatches.push({ domain: quiz.domain, question: iq.question, id: iq.id });
        }
      });
    });
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
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
            placeholder="ابحث عن أي موضوع (Corey Schafer, Kind, Valkey, Argo CD) أو سؤال مقابلة..."
            className="w-full text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          {!q && (
            <div className="py-8 text-center text-xs text-slate-400">
              اكتب كلمة مفتاحية مثل: <span className="font-mono text-slate-600">Corey</span>،{' '}
              <span className="font-mono text-slate-600">Valkey</span>،{' '}
              <span className="font-mono text-slate-600">Kind</span>، أو{' '}
              <span className="font-mono text-slate-600">Trivy</span>
            </div>
          )}

          {q && topicMatches.length === 0 && questionMatches.length === 0 && (
            <div className="py-8 text-center text-xs text-slate-400">
              لا توجد نتائج مطابقة لـ "{query}"
            </div>
          )}

          {topicMatches.length > 0 && (
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-slate-400 px-2">مواضيع الموديولات</div>
              {topicMatches.map(({ mod, topic }) => (
                <button
                  key={topic.id}
                  onClick={() => {
                    onNavigateToTopic(mod.id);
                    onClose();
                  }}
                  className="w-full p-3 rounded-xl hover:bg-blue-50/80 border border-transparent hover:border-blue-100 flex items-center justify-between gap-3 text-right transition"
                >
                  <div>
                    <div className="text-xs font-extrabold text-slate-900">
                      <span className="font-mono text-blue-600 ml-1.5">{topic.code}</span>
                      {topic.title}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Module {mod.number}: {mod.title}
                    </div>
                  </div>
                  <ArrowLeft className="w-4 h-4 text-blue-600 shrink-0" />
                </button>
              ))}
            </div>
          )}

          {questionMatches.length > 0 && (
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-slate-400 px-2">أسئلة الكويز</div>
              {questionMatches.map((iq) => (
                <button
                  key={iq.id}
                  onClick={() => {
                    onNavigateTab('playbook');
                    onClose();
                  }}
                  className="w-full p-3 rounded-xl hover:bg-blue-50/80 border border-transparent hover:border-blue-100 flex items-center justify-between gap-3 text-right transition"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900">{iq.question}</div>
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
