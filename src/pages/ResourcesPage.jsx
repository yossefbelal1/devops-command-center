import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  AlertTriangle,
  Bookmark,
  CheckCircle2,
  Database,
  Download,
  ExternalLink,
  FileJson,
  FolderGit2,
  Globe,
  RotateCcw,
  Save,
  Search,
  ShieldCheck,
  Upload
} from 'lucide-react';
import { ROADMAP_META } from '../data/roadmapData';
import { RESOURCES_CATALOG, RESOURCE_CATEGORIES } from '../data/resourcesData';
import { EmptyState } from '../components/ui/EmptyState';

export function ResourcesPage({ appState, actions }) {
  const [searchParams] = useSearchParams();
  const [weeklyTarget, setWeeklyTarget] = useState(
    String(appState.targetWeeklyHours || appState.weeklyStudyHours || 7.5)
  );
  const [targetSavedMsg, setTargetSavedMsg] = useState('');
  const [backupPreview, setBackupPreview] = useState(null);
  const [backupStatus, setBackupStatus] = useState(null);
  const [resourceQuery, setResourceQuery] = useState(searchParams.get('q') || '');
  const [providerFilter, setProviderFilter] = useState('all');
  const [moduleFilter, setModuleFilter] = useState('all');

  useEffect(() => {
    const qParam = searchParams.get('q');
    if (qParam !== null) setResourceQuery(qParam);
  }, [searchParams]);

  const moduleNumbers = ['01', '02', '03', '04', '05', '06', '07'];

  const filteredResources = useMemo(() => {
    const q = resourceQuery.trim().toLowerCase();
    return RESOURCES_CATALOG.filter((r) => {
      if (providerFilter !== 'all' && r.provider !== providerFilter) return false;
      if (moduleFilter !== 'all' && r.moduleNumber !== moduleFilter) return false;
      if (!q) return true;
      return (
        r.title.toLowerCase().includes(q) ||
        r.provider.toLowerCase().includes(q) ||
        (r.instructor || '').toLowerCase().includes(q) ||
        (r.description || '').toLowerCase().includes(q) ||
        (r.tags || []).some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [resourceQuery, providerFilter, moduleFilter]);

  const handleSaveWeeklyTarget = (e) => {
    e.preventDefault();
    actions.setTargetWeeklyHours(weeklyTarget);
    setTargetSavedMsg('تم حفظ الهدف الأسبوعي بنجاح.');
    setTimeout(() => setTargetSavedMsg(''), 3000);
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBackupStatus(null);
    const preview = await actions.previewBackup(file);
    setBackupPreview({ ...preview, fileName: file.name });
    e.target.value = '';
  };

  const handleConfirmRestore = async () => {
    if (!backupPreview || !backupPreview.valid) return;
    const res = await actions.restoreBackup(backupPreview);
    if (res.ok) {
      setBackupStatus({
        ok: true,
        message: `تمت الاستعادة بنجاح (${res.counts?.totalRecords || 0} سجل) وتم تحديث كل المخازن في IndexedDB.`
      });
      setBackupPreview(null);
    } else {
      setBackupStatus({
        ok: false,
        message: res.errors?.join(' ') || 'فشلت عملية الاستعادة وتم التراجع بأمان.'
      });
    }
  };

  const handleReset = async () => {
    if (
      window.confirm(
        'هل أنت متأكد من إعادة ضبط كل البيانات والجلسات في IndexedDB إلى الوضع الافتراضي؟'
      )
    ) {
      await actions.resetAll();
      setBackupPreview(null);
      setBackupStatus({
        ok: true,
        message: 'تمت إعادة ضبط قاعدة البيانات إلى الحالة الافتراضية.'
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <span className="text-[11px] font-mono uppercase tracking-widest text-blue-600 font-bold">
          CURATED RESOURCES CATALOG, SETTINGS &amp; JSON BACKUP/RESTORE
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
          مكتبة المصادر والإعدادات والنسخ الاحتياطي
        </h1>
      </div>

      {/* Curated Resources Catalog with Module & Provider Filters */}
      <section className="glass-v5 rounded-3xl p-6 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Bookmark className="w-5 h-5 text-blue-600" />
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                دليل المصادر والكورسات المعتمدة ({filteredResources.length} من{' '}
                {RESOURCES_CATALOG.length})
              </h2>
              <p className="text-xs text-slate-500">
                مجمّعة بدقة حسب الموديولات السبعة ومزوّدي المحتوى المعتمدين في الخطة
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={resourceQuery}
                onChange={(e) => setResourceQuery(e.target.value)}
                placeholder="ابحث بالاسم، المدرب، أو الوسم..."
                className="pr-8 pl-3 py-2 rounded-xl border border-slate-200 bg-white text-xs w-56 focus:outline-none focus:border-blue-500"
              />
            </div>

            <select
              value={moduleFilter}
              onChange={(e) => setModuleFilter(e.target.value)}
              aria-label="تصفية حسب الموديول"
              className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700"
            >
              <option value="all">كل الموديولات (01–07)</option>
              {moduleNumbers.map((num) => (
                <option key={num} value={num}>
                  Module {num}
                </option>
              ))}
            </select>

            <select
              value={providerFilter}
              onChange={(e) => setProviderFilter(e.target.value)}
              aria-label="تصفية حسب المزود"
              className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700"
            >
              <option value="all">كل المزودين</option>
              {RESOURCE_CATEGORIES.map((prov) => (
                <option key={prov} value={prov}>
                  {prov}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Provider Quick Pills */}
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setProviderFilter('all')}
            className={`px-3 py-1 rounded-full text-xs font-bold border transition ${
              providerFilter === 'all'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            الكل ({RESOURCES_CATALOG.length})
          </button>
          {RESOURCE_CATEGORIES.map((prov) => (
            <button
              key={prov}
              type="button"
              onClick={() => setProviderFilter(prov)}
              className={`px-3 py-1 rounded-full text-xs font-bold border transition ${
                providerFilter === prov
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {prov}
            </button>
          ))}
        </div>

        {filteredResources.length === 0 ? (
          <EmptyState
            icon={Bookmark}
            title="لا توجد مصادر مطابقة للفلتر الحالي"
            description="جرّب تغيير الموديول أو مسح كلمة البحث."
            actionLabel="إعادة ضبط الفلاتر"
            onAction={() => {
              setResourceQuery('');
              setProviderFilter('all');
              setModuleFilter('all');
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredResources.map((res) => (
              <a
                key={res.id}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-300 hover:shadow-sm transition flex flex-col justify-between gap-3 group"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-mono font-bold">
                      {res.provider}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold">
                        <Globe className="w-2.5 h-2.5" />
                        {res.language}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-slate-500">
                        M{res.moduleNumber} • {res.topicCode}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-blue-700 transition">
                    {res.title}
                  </div>
                  {res.instructor && (
                    <div className="text-[11px] font-semibold text-indigo-700">
                      {res.instructor}
                    </div>
                  )}
                  {res.description && (
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      {res.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                  <div className="flex flex-wrap gap-1">
                    {(res.tags || []).slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-1.5 py-0.5 rounded bg-slate-50 text-[10px] font-mono text-slate-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 shrink-0">
                    <span>فتح</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* Portfolio Repositories */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ROADMAP_META.portfolioRepos.map((repo) => (
          <a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-v5 rounded-2xl p-5 hover:border-blue-300 transition flex items-start justify-between gap-3"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                <FolderGit2 className="w-4 h-4 text-blue-600" />
                <span>{repo.name}</span>
              </div>
              <p className="text-xs text-slate-600">{repo.desc}</p>
            </div>
            <ExternalLink className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
          </a>
        ))}
      </section>

      {/* Settings & JSON Backup/Restore Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-5 glass-v5 rounded-3xl p-6 space-y-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">إعدادات الخطة والتخزين</h2>
              <p className="text-[11px] text-slate-500">
                IndexedDB ({appState.migratedFrom ? `مُرحّل من ${appState.migratedFrom}` : 'devops_command_center_db'})
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveWeeklyTarget} className="space-y-3">
            <label className="text-xs font-bold text-slate-700 block">
              الساعات الأسبوعية المستهدفة (7.5 ساعة/أسبوع — 1.5 ساعة × 5 أيام = حوالي 32.5 ساعة/شهر)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="80"
                step="0.5"
                value={weeklyTarget}
                onChange={(e) => setWeeklyTarget(e.target.value)}
                className="w-28 px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm font-mono font-bold text-slate-900 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition"
              >
                <Save className="w-3.5 h-3.5" />
                <span>حفظ الوتيرة</span>
              </button>
            </div>
            {targetSavedMsg && (
              <p className="text-xs font-bold text-emerald-700">{targetSavedMsg}</p>
            )}
          </form>

          <div className="pt-3 border-t border-slate-200/80 space-y-2">
            <div className="text-xs font-bold text-slate-700">ملخص السجلات الحالية</div>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                مواضيع متابعة: {Object.keys(appState.topicProgress || {}).length}
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                جلسات مذاكرة: {(appState.studySessions || []).length}
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                سجل التدقيق: {(appState.auditLog || []).length}
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                نقاط HiveBox: {Object.keys(appState.hivebox || {}).length}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200/80">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة ضبط البيانات الافتراضية</span>
            </button>
          </div>
        </section>

        <section className="lg:col-span-7 glass-v5-blue rounded-3xl p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
                <FileJson className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-slate-900">
                  النسخ الاحتياطي والاستعادة (JSON Backup &amp; Safe Rollback)
                </h2>
                <p className="text-[11px] text-slate-600">
                  فحص ومعاينة أعداد السجلات قبل الكتابة في IndexedDB مع تراجع آمن عند أي خطأ.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                const res = actions.exportBackup();
                setBackupStatus({
                  ok: true,
                  message: `تم تصدير النسخة ${res.filename} (${res.counts.studySessions} جلسة، ${res.counts.subtasks} مهمة فرعية).`
                });
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-blue-700 text-white text-xs font-bold transition"
            >
              <Download className="w-4 h-4" />
              <span>تصدير نسخة JSON</span>
            </button>
          </div>

          <div className="bg-white/90 rounded-2xl border border-blue-100 p-4 space-y-3">
            <label className="text-xs font-bold text-slate-700 block">
              استيراد ملف نسخة احتياطية للمعاينة أولاً
            </label>
            <label className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-blue-200 hover:border-blue-400 bg-blue-50/40 cursor-pointer text-xs font-bold text-blue-700 transition">
              <Upload className="w-4 h-4" />
              <span>اختر ملف JSON للمعاينة والفحص</span>
              <input
                type="file"
                accept="application/json,.json"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>

            {backupPreview && (
              <div
                className={`rounded-2xl p-4 border space-y-3 ${
                  backupPreview.valid
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : 'bg-rose-50 border-rose-200'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900">
                    {backupPreview.valid ? (
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                    )}
                    <span>
                      معاينة: {backupPreview.fileName} ({backupPreview.format})
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-600">
                    إجمالي السجلات: {backupPreview.counts?.totalRecords || 0}
                  </span>
                </div>

                {backupPreview.valid ? (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
                      <div className="bg-white/90 rounded-lg p-2 border border-slate-200/70">
                        المواضيع: {backupPreview.counts.taskProgress}
                      </div>
                      <div className="bg-white/90 rounded-lg p-2 border border-slate-200/70">
                        المهام: {backupPreview.counts.subtasks}
                      </div>
                      <div className="bg-white/90 rounded-lg p-2 border border-slate-200/70">
                        الجلسات: {backupPreview.counts.studySessions}
                      </div>
                      <div className="bg-white/90 rounded-lg p-2 border border-slate-200/70">
                        HiveBox: {backupPreview.counts.hiveboxChecks}
                      </div>
                    </div>

                    {backupPreview.warnings?.length > 0 && (
                      <p className="text-[11px] text-amber-800 font-semibold">
                        {backupPreview.warnings.join(' ')}
                      </p>
                    )}

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={handleConfirmRestore}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition"
                      >
                        تأكيد الاستعادة الآن
                      </button>
                      <button
                        type="button"
                        onClick={() => setBackupPreview(null)}
                        className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold"
                      >
                        إلغاء
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="text-xs text-rose-700 font-bold">
                    {backupPreview.errors?.join(' ')}
                  </p>
                )}
              </div>
            )}

            {backupStatus && (
              <div
                className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                  backupStatus.ok
                    ? 'bg-emerald-500/10 text-emerald-900 border border-emerald-500/30'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{backupStatus.message}</span>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
