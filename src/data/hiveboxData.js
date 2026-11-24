export const HIVEBOX_DATA = {
  title: 'HiveBox — Dynamic DevOps Roadmap Project',
  repoUrl: 'https://github.com/yossefbelal1/Hivebox',
  officialSpecUrl: 'https://devopsroadmap.io/projects/hivebox/',
  overview:
    'بناء خدمة RESTful API قابلة للتوسع بلغة Python حول منصة openSenseMap لمربي النحل، تتطور عبر 6 مراحل مترابطة (Iterative MVP) على نفس المستودع yossefbelal1/Hivebox عبر Pull Requests — بدءاً من سكربت v0.0.1 وصولاً إلى Kubernetes و Valkey و MinIO و Terraform و Argo CD.',
  architectureFlow: [
    'Engineer / GitHub PRs',
    'GitHub Actions (Lint + Test + OpenSSF + SonarQube + Terrascan + Trivy)',
    'GHCR Registry',
    'Argo CD (GitOps Pull)',
    'Kubernetes (Kind / Cloud) + Ingress-Nginx + Cert-Manager + ExternalDNS',
    'HiveBox FastAPI App (/version, /temperature, /metrics, /cache, /store, /readyz)',
    'Valkey (Cache) + MinIO (S3 Storage) + openSenseMap API',
    'Prometheus + Grafana + Loki (Observability)'
  ],
  kanbanBoard: {
    columns: [
      { id: 'todo', title: 'Todo', subtitle: 'المراحل القادمة' },
      { id: 'in_progress', title: 'In Progress', subtitle: 'قيد التنفيذ الآن' },
      { id: 'done', title: 'Done', subtitle: 'مكتمل ومدمج عبر PR' }
    ],
    defaultPhaseColumn: {
      'hb-1': 'in_progress',
      'hb-2': 'in_progress',
      'hb-3': 'todo',
      'hb-4': 'todo',
      'hb-5': 'todo',
      'hb-6': 'todo'
    }
  },
  phases: [
    {
      id: 'hb-1',
      phase: 1,
      moduleRef: 'Module 1: Welcome to the DevOps World',
      title: 'Phase 1: Kickoff & Preparation',
      status: 'in_progress',
      effortBreakdown: { videoPct: 20, labPct: 30, codingPct: 25, troubleshootingPct: 25 },
      dependencies: ['لا يوجد (نقطة البداية)'],
      purpose:
        'تأسيس أسلوب العمل المنظم (Kanban & Pull Requests) وتجهيز المستودع العام yossefbelal1/Hivebox واختيار 3 حساسات openSenseMap.',
      bestPractices: [
        'حماية فرع main ومنع git push المباشر — كل تعديل يمر عبر Feature Branch و Pull Request.',
        'الالتزام بنطاق المرحلة الحالية فقط (No Scope Creep) وتوثيق القرارات في README منذ اليوم الأول.',
        'اختيار 3 حساسات قريبة جغرافياً ومنتظمة التحديث من openSenseMap لضمان دقة متوسط الحرارة.'
      ],
      requiredTools: ['GitHub Account', 'GitHub Projects (Kanban)', 'Git CLI', 'openSenseMap'],
      requiredTasks: [
        'إنشاء/Fork مستودع عام باسم yossefbelal1/Hivebox على GitHub.',
        'كتابة README.md يوضح فكرة المشروع وخارطة المراحل الست.',
        'إنشاء لوحة Kanban بأعمدة Todo / In Progress / Done.',
        'اختيار وتوثيق 3 senseBox IDs متجاورة من openSenseMap وتجهيز فرع PR للمرحلة الثانية.'
      ],
      optionalEnhancements: [],
      exampleImplementation: `# 3 senseBox IDs متجاورة من openSenseMap:
5eba5fbad46fb8001b799786
5c21ff8f919f80001adf2488
5ade1acf223bd80019a1011c

# تجهيز فرع المرحلة الثانية:
git checkout -b feat/phase-2-basic-api
# قاعدة صارمة: ممنوع git push مباشر على main — كل Phase عبر Pull Request!`,
      acceptanceCriteria: [
        'وجود مستودع عام باسم yossefbelal1/Hivebox مع README واضح.',
        'وجود لوحة Kanban بأعمدة Todo / In Progress / Done.',
        'توثيق الـ 3 senseBox IDs في README/Issues وتجهيز فرع Phase 2.'
      ],
      definitionOfDone: 'توثيق المعرفات الثلاثة وفتح فرع العمل ونقل بطاقة Phase 1 إلى Done في Kanban.',
      verificationCommands: ['git remote -v', 'git branch -a', 'git status'],
      commonFailures: [
        'الدفع المباشر إلى main بدون فتح Pull Request.',
        'محاولة كتابة كود المرحلة الثالثة أو الرابعة مبكراً (Scope Creep).'
      ],
      resources: [
        { label: 'HiveBox Official Phase 1 Spec', url: 'https://devopsroadmap.io/projects/hivebox/', type: 'Roadmap / Docs' },
        { label: 'HiveBox GitHub Repo (yossefbelal1/Hivebox)', url: 'https://github.com/yossefbelal1/Hivebox', type: 'Roadmap / Docs' },
        { label: 'openSenseMap Live Sensors Map', url: 'https://opensensemap.org/', type: 'Roadmap / Docs' }
      ],
      deliverables: [
        {
          id: 'hb1-1',
          text: 'إنشاء المستودع العام yossefbelal1/Hivebox على GitHub',
          details: 'التحقق من إتاحة المستودع العام وربطه محلياً بـ Git',
          hint: 'تحقق من الربط عبر git remote -v وتأكد أن المستودع Public وليس Private.',
          estimatedHours: 1,
          done: true,
          optional: false
        },
        {
          id: 'hb1-2',
          text: 'كتابة ملف README.md يوضح فكرة المشروع وخارطة المراحل الست',
          details: 'توثيق الهدف وروابط openSenseMap والمراحل',
          hint: 'اجعل في README قسماً لجدول المراحل وأوامر التشغيل السريع ليقرأه أي مهندس خلال دقيقة.',
          estimatedHours: 1,
          done: true,
          optional: false
        },
        {
          id: 'hb1-3',
          text: 'إنشاء لوحة GitHub Project Kanban بأعمدة Todo / In Progress / Done ونقل بطاقة Phase 1',
          details: 'توزيع المهام على أعمدة اللوحة',
          hint: 'اربط بطاقات Kanban بالـ Issues والـ Pull Requests لتتحرك تلقائياً عند الدمج.',
          estimatedHours: 1,
          done: true,
          optional: false
        },
        {
          id: 'hb1-4',
          text: 'اختيار وتوثيق 3 معرفات senseBox IDs متجاورة من openSenseMap (5eba5fbad46fb8001b799786, 5c21ff8f919bf8001adf2488, 5ade1acf223bd80019a1011c) وتجهيز فرع العمل لفتح Pull Request للمرحلة الثانية',
          details: 'توثيق المعرفات الثلاثة في README/Issues وفتح branch مثل feat/phase-2-basic-api',
          hint: 'جرّب استدعاء curl -s https://api.opensensemap.org/boxes/5eba5fbad46fb8001b799786 | head ثم أنشئ الفرع عبر git checkout -b feat/phase-2-basic-api.',
          estimatedHours: 1,
          done: false,
          optional: false
        }
      ]
    },
    {
      id: 'hb-2',
      phase: 2,
      moduleRef: 'Module 2: Basics - DevOps Core (محطتك القادمة فوراً)',
      title: 'Phase 2: Basic API & Container (v0.0.1)',
      status: 'in_progress',
      effortBreakdown: { videoPct: 15, labPct: 30, codingPct: 35, troubleshootingPct: 20 },
      dependencies: ['Phase 1 مكتمل', 'إنهاء Python Corey Schafer الـ 6 + لابات Bash'],
      purpose:
        'بناء أصغر نسخة قابلة للتشغيل (MVP v0.0.1) تطبع الإصدار وتخرج، وتغليفها في Docker وتشغيلها محلياً على RHEL VM مع سكريبت Bash للتحقق.',
      bestPractices: [
        'الالتزام بأصغر MVP قابل للاختبار: في Phase 2 المطلوب طباعة الإصدار والخروج بنجاح (Exit Code 0) بدون تعقيد مبكر.',
        'استخدام صورة أساسية خفيفة (python:3.9-slim) وتثبيت الاعتماديات داخل بيئة معزولة.',
        'حماية سكربت التحقق بـ set -euo pipefail للتحقق الفوري من خروج الحاوية بنجاح.'
      ],
      requiredTools: ['Git', 'VS Code', 'Python 3.9+', 'Docker 29.9.3 (RHEL VM)', 'Bash'],
      requiredTasks: [
        'تنفيذ دالة Python تطبع الإصدار الحالي (Semantic Versioning v0.0.1) وتخرج بـ Exit code 0.',
        'كتابة Dockerfile وبناء الصورة وتشغيل الحاوية محلياً على RHEL VM بدون أخطاء.',
        'كتابة سكريبت Bash للتحقق من تشغيل الحاوية وتوثيق خطوات الاختبار في README.',
        'فتح Pull Request من فرع مخصص ودمجه في main ثم نقل الكارت إلى Done.'
      ],
      optionalEnhancements: [],
      exampleImplementation: `# src/app.py (Semantic Versioning v0.0.1)
APP_VERSION = "v0.0.1"

def print_version():
    print(f"HiveBox version: {APP_VERSION}")

if __name__ == "__main__":
    print_version()

# Dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY src/app.py .
CMD ["python", "app.py"]`,
      acceptanceCriteria: [
        'الدالة تطبع الإصدار v0.0.1 وتخرج بنجاح (Exit code 0).',
        'بناء وتشغيل الـ Container على RHEL VM بدون أخطاء وبدون sudo.',
        'توثيق خطوات اختبار التشغيل داخل المستودع + سكريبت Bash Check.'
      ],
      definitionOfDone: 'دمج PR الخاص بـ Phase 2 بعد التحقق من طباعة الإصدار من داخل الحاوية.',
      verificationCommands: [
        'docker build -t hivebox:v0.0.1 .',
        'docker run --rm hivebox:v0.0.1',
        'bash scripts/health_check.sh'
      ],
      commonFailures: [
        'نسيان الخروج بعد الطباعة أو بدء خادم ويب قبل أوانه.',
        'نسيان توثيق أوامر التشغيل والاختبار في README.'
      ],
      resources: [
        { label: 'HiveBox Phase 2 Spec', url: 'https://devopsroadmap.io/projects/hivebox/', type: 'Roadmap / Docs' },
        { label: 'Ahmed Elfakharany: Docker Arabic', url: 'https://www.youtube.com/watch?v=l_R7rdrurdE', type: 'YouTube' },
        { label: 'Vishakha Sadhwani: Docker CRASH COURSE', url: 'https://www.youtube.com/watch?v=WEf2X7Ai2bg', type: 'YouTube' }
      ],
      deliverables: [
        {
          id: 'hb2-1',
          text: 'تنفيذ دالة تطبع الإصدار الحالي (Semantic Versioning v0.0.1) وتخرج',
          details: 'إنشاء src/app.py يطبع v0.0.1 ويخرج برمز نجاح 0 عند التشغيل المباشر',
          hint: 'تأكد من عدم بدء خادم FastAPI في هذه المرحلة؛ اختبر عبر python src/app.py && echo $?.',
          estimatedHours: 1.5,
          done: false,
          optional: false
        },
        {
          id: 'hb2-2',
          text: 'إنشاء Dockerfile وبناء الصورة وتشغيل الحاوية محلياً على RHEL VM',
          details: 'بناء الصورة بـ docker build والتأكد من تشغيلها بدون صلاحيات sudo',
          hint: 'استخدم python:3.9-slim و docker run --rm hivebox:v0.0.1 للتنظيف التلقائي بعد الخروج.',
          estimatedHours: 2,
          done: false,
          optional: false
        },
        {
          id: 'hb2-3',
          text: 'كتابة سكريبت Bash للتحقق وتوثيق كيفية الاختبار في المستودع',
          details: 'سكربت health_check.sh يبني ويشغل الحاوية ويتحقق من وجود v0.0.1 في المخرجات',
          hint: 'فعّل set -euo pipefail وتحقق من المخرجات بـ grep -q "v0.0.1" وأعط السكربت chmod +x.',
          estimatedHours: 1.5,
          done: false,
          optional: false
        },
        {
          id: 'hb2-4',
          text: 'رفع الكود عبر Pull Request وتحديث لوحة Kanban',
          details: 'مراجعة التغييرات ودمج PR على GitHub ونقل بطاقة Phase 2 إلى Done',
          hint: 'استخدم رسالة commit واضحة مثل feat(phase-2): add v0.0.1 container and health script.',
          estimatedHours: 1,
          done: false,
          optional: false
        }
      ]
    },
    {
      id: 'hb-3',
      phase: 3,
      moduleRef: 'Module 3: Start - Laying the Foundation',
      title: 'Phase 3: Quality, Endpoints & Continuous Integration',
      status: 'pending',
      effortBreakdown: { videoPct: 15, labPct: 25, codingPct: 40, troubleshootingPct: 20 },
      dependencies: ['Phase 2 مدمج في main'],
      purpose:
        'تحويل التطبيق إلى FastAPI/Flask REST API حقيقي متصل بـ openSenseMap مع اختبارات pytest وجودة الكود و Multi-stage Docker و CI Pipeline مع OpenSSF Scorecard.',
      bestPractices: [
        'تطبيق Dependency Injection / Mocking عند اختبار استدعاءات openSenseMap API في pytest.',
        'تأمين الحاوية بمستخدم Non-root و Multi-stage build واجتياز Hadolint بدون أي تحذيرات.',
        'تطبيق Conventional Commits لتسهيل تتبع الإصدارات وتكامل CI التلقائي.'
      ],
      requiredTools: [
        'FastAPI / Flask',
        'pytest',
        'Pylint',
        'Hadolint',
        'GitHub Actions',
        'OpenSSF Scorecard'
      ],
      requiredTasks: [
        'بناء REST API بنقطتي /version و /temperature مع استبعاد قراءات openSenseMap الأقدم من ساعة.',
        'كتابة Unit Tests شاملة بـ pytest (مع Mocking) واجتياز فحص Pylint.',
        'تطبيق Container Best Practices (Multi-stage + Non-root + .dockerignore) واجتياز Hadolint.',
        'إعداد GitHub Actions CI لتشغيل الفحوصات واختبار /version حياً + تفعيل OpenSSF Scorecard.'
      ],
      optionalEnhancements: [],
      exampleImplementation: `# Endpoints المطلوبة:
GET /version      -> {"version": "v0.1.0"}
GET /temperature  -> {"average_temperature": 24.5}

# شرط حرج: تجاهل أي قراءة من openSenseMap أقدم من 1 ساعة!
# CI (.github/workflows/ci.yml):
# 1) Pylint + Hadolint
# 2) pytest (Unit Tests)
# 3) Docker Build + تشغيل الحاوية وفحص curl /version
# 4) OpenSSF Scorecard GitHub Action`,
      acceptanceCriteria: [
        'نقطة /version تعيد الإصدار المنشور بدقة.',
        'نقطة /temperature تحسب متوسط الحرارة لـ senseBoxes مع استبعاد القراءات الأقدم من ساعة.',
        'اختبارات pytest تغطي كل الـ Endpoints مع Mocking.',
        'تطبيق Container Best Practices (Multi-stage + Non-root) واجتياز Hadolint و Pylint و OpenSSF Scorecard.'
      ],
      definitionOfDone: 'كل خطوات الـ CI (Pylint, Hadolint, pytest, /version test, OpenSSF) خضراء على الـ PR.',
      verificationCommands: [
        'pylint src/',
        'hadolint Dockerfile',
        'pytest -v',
        'curl -f http://localhost:8000/version'
      ],
      commonFailures: [
        'اعتماد /temperature على اتصال إنترنت حقيقي في Unit Tests بدلاً من Mocking.',
        'نسيان فلترة القراءات الأقدم من ساعة واحدة.',
        'تجاهل تحذيرات OpenSSF Scorecard الأمنية في الـ Workflow.'
      ],
      resources: [
        { label: 'HiveBox Phase 3 Spec', url: 'https://devopsroadmap.io/projects/hivebox/', type: 'Roadmap / Docs' },
        { label: 'Container Best Practices', url: 'https://devopsroadmap.io/projects/container-best-practices/', type: 'Roadmap / Docs' },
        { label: 'Vishakha Sadhwani: CI/CD CRASH COURSE', url: 'https://www.youtube.com/watch?v=ixNNyLcWXX8', type: 'YouTube' }
      ],
      deliverables: [
        {
          id: 'hb3-1',
          text: 'تطبيق Conventional Commits وبناء /version و /temperature عبر openSenseMap API',
          details: 'حساب متوسط الحرارة مع استبعاد أي قراءة يتجاوز عمرها 60 دقيقة',
          hint: 'حوّل createdAt إلى datetime UTC وقارن الفرق مع datetime.now(timezone.utc) <= 3600s.',
          estimatedHours: 3,
          done: false,
          optional: false
        },
        {
          id: 'hb3-2',
          text: 'كتابة Unit Tests باستخدام pytest + اجتياز Pylint',
          details: 'استخدام unittest.mock لعزل اختبارات API وضبط إعدادات .pylintrc',
          hint: 'لا تجعل pytest يتصل بالإنترنت الفعلي؛ استعمل monkeypatch لتثبيت الاستجابة والوقت.',
          estimatedHours: 2.5,
          done: false,
          optional: false
        },
        {
          id: 'hb3-3',
          text: 'تطبيق Container Best Practices (Multi-stage + Non-root) واجتياز Hadolint',
          details: 'تحديث Dockerfile بمراحل بناء منفصلة ومستخدم غير root و .dockerignore',
          hint: 'مرر Dockerfile عبر docker run --rm -i hadolint/hadolint < Dockerfile.',
          estimatedHours: 2,
          done: false,
          optional: false
        },
        {
          id: 'hb3-4',
          text: 'بناء GitHub Actions CI + اختبار /version + إعداد OpenSSF Scorecard',
          details: 'تشغيل الحاوية في الـ CI والتحقق من /version وتفعيل Scorecard Workflow',
          hint: 'تأكد من ضبط permissions: read-all في أعلى الـ workflow وتثبيت الـ actions بـ SHA ليرتفع تقييم OpenSSF.',
          estimatedHours: 2.5,
          done: false,
          optional: false
        }
      ]
    },
    {
      id: 'hb-4',
      phase: 4,
      moduleRef: 'Module 4: Expand - Constructing a Shell',
      title: 'Phase 4: Kubernetes (Kind), Metrics & Security Gates',
      status: 'pending',
      effortBreakdown: { videoPct: 15, labPct: 35, codingPct: 25, troubleshootingPct: 25 },
      dependencies: ['Phase 3 مدمج', 'إنهاء Kubernetes Basics & Kind'],
      purpose:
        'تشغيل HiveBox داخل Kubernetes محلياً (Kind + Ingress-Nginx) وتصدير مقاييس Prometheus على /metrics وإضافة حالة الحرارة وفحوصات SonarQube/Terrascan ورفع الصورة لـ GHCR.',
      bestPractices: [
        'الالتزام بمبدأ 12-Factor App بتمرير SENSEBOX_IDS عبر Environment Variables / ConfigMap.',
        'وسم الصور المنشورة على GHCR برقم الإصدار (Semantic Version Tag) وعدم الاعتماد على :latest.',
        'إضافة بوابات الفحص الساكن (SonarQube/Semgrep + Terrascan) قبل بناء ونشر الصورة.'
      ],
      requiredTools: [
        'Kind',
        'kubectl',
        'Ingress-Nginx',
        'Prometheus',
        'SonarQube / Semgrep',
        'Terrascan',
        'GHCR'
      ],
      requiredTasks: [
        'قراءة senseBox IDs من Environment Variables (12-Factor) وإضافة /metrics وحقل status في /temperature.',
        'كتابة Integration Tests وإعداد Kind + Ingress-Nginx + Kubernetes Manifests.',
        'إضافة بوابات SonarQube/Semgrep و Terrascan في CI Pipeline.',
        'إنشاء GitHub Actions CD workflow لنشر صورة موسومة برقم الإصدار في GHCR.'
      ],
      optionalEnhancements: [],
      exampleImplementation: `# تصنيف /temperature في Phase 4:
if avg_temp < 10:      status = "Too Cold"
elif avg_temp <= 36:   status = "Good"
else:                  status = "Too Hot"  # > 37

# قراءة SENSEBOX_IDS من Environment Variable (12-Factor)
# إضافة GET /metrics لـ Prometheus default metrics`,
      acceptanceCriteria: [
        'معرفات senseBox تُقرأ من متغيرات البيئة (12-Factor).',
        'إرجاع حقل status الدقيق في /temperature + إرجاع مقاييس Prometheus على /metrics.',
        'تشغيل Kind مع Ingress-Nginx و Kubernetes Manifests.',
        'تشغيل Integration Tests + SonarQube/Semgrep + Terrascan في CI + CD workflow يرفع Image موسومة إلى GHCR.'
      ],
      definitionOfDone: 'التطبيق يستجيب عبر Ingress-Nginx في Kind والـ CD يرفع الصورة المرقمة إلى GHCR.',
      verificationCommands: [
        'kind create cluster --config kind-config.yaml',
        'kubectl apply -f k8s/',
        'curl http://localhost/temperature',
        'curl http://localhost/metrics'
      ],
      commonFailures: [
        'ترك senseBox IDs مكتوبة Hardcoded في الكود.',
        'نسيان تثبيت Ingress-Nginx Controller داخل كلاستر Kind.',
        'استخدام وسم :latest بدلاً من Version Tag في الـ CD Workflow.'
      ],
      resources: [
        { label: 'HiveBox Phase 4 Spec', url: 'https://devopsroadmap.io/projects/hivebox/', type: 'Roadmap / Docs' },
        { label: '12-Factor App Methodology', url: 'https://12factor.net/', type: 'Roadmap / Docs' },
        { label: 'Vishakha Sadhwani: The ONLY Kubernetes Course', url: 'https://www.youtube.com/watch?v=H_a5DTKSEjY', type: 'YouTube' }
      ],
      deliverables: [
        {
          id: 'hb4-1',
          text: 'تهيئة senseBox IDs عبر Env Vars + إضافة /metrics + حقل status في /temperature',
          details: 'تطبيق تصنيف الحرارة Too Cold / Good / Too Hot وتصدير prometheus_client metrics',
          hint: 'تأكد من التعامل مع SENSEBOX_IDS الفارغة أو المتعددة المفصولة بفاصلة.',
          estimatedHours: 3,
          done: false,
          optional: false
        },
        {
          id: 'hb4-2',
          text: 'كتابة Integration Tests وإعداد Kind + Ingress-Nginx + K8s Manifests',
          details: 'تشغيل Deployment, Service, ConfigMap, Ingress محلياً على Kind cluster',
          hint: 'في Kind اربط extraPortMappings للمنفذين 80 و 443 في kind-config.yaml قبل تثبيت Ingress-Nginx.',
          estimatedHours: 4,
          done: false,
          optional: false
        },
        {
          id: 'hb4-3',
          text: 'تشغيل SonarQube/Semgrep و Terrascan في الـ CI Pipeline',
          details: 'فحص جودة الكود وملفات Kubernetes IaC لمنع الثغرات قبل الدمج',
          hint: 'شغّل terracan scan -t k8s -d k8s/ محلياً أولاً لإصلاح securityContext و resource limits.',
          estimatedHours: 2.5,
          done: false,
          optional: false
        },
        {
          id: 'hb4-4',
          text: 'بناء GitHub Actions CD workflow لنشر صورة موسومة في GHCR',
          details: 'بناء ورفع Image بوسم الإصدار تلقائياً إلى GitHub Container Registry',
          hint: 'أضف packages: write في الـ CD workflow واستخدم docker/metadata-action لتوليد وسم الإصدار.',
          estimatedHours: 2.5,
          done: false,
          optional: false
        }
      ]
    },
    {
      id: 'hb-5',
      phase: 5,
      moduleRef: 'Module 5: Transform - Finishing the Structure',
      title: 'Phase 5: Valkey Cache, MinIO Storage, Terraform, Helm & Venom E2E',
      status: 'pending',
      effortBreakdown: { videoPct: 15, labPct: 30, codingPct: 30, troubleshootingPct: 25 },
      dependencies: ['Phase 4 مدمج', 'Terraform + Helm + Kustomize'],
      purpose:
        'إضافة طبقة الكاش Valkey والتخزين MinIO بدورة 5 دقائق، تغليف Helm & Kustomize، بناء البنية بـ Terraform، نشر Grafana Agent، واختبار E2E بأداة Venom.',
      bestPractices: [
        'فصل حالة التطبيق (Stateless App) عن طبقة الكاش (Valkey) وطبقة التخزين الكائني (MinIO S3).',
        'تصميم /readyz ليعكس الجاهزية الحقيقية للخدمات التابعة (50%+1 sensors + cache freshness < 10m).',
        'اختبار البنية كاملة من البداية للنهاية (End-to-End) داخل Kind عبر Venom في CI.'
      ],
      requiredTools: [
        'Valkey',
        'MinIO',
        'Helm',
        'Kustomize',
        'Terraform',
        'Grafana Agent',
        'Venom'
      ],
      requiredTasks: [
        'دمج Valkey (5m cycle) و MinIO (5m cycle) + نقاط /cache و /store و /readyz ومقاييس مخصصة.',
        'بناء Helm Chart للتطبيق + Kustomize لـ Valkey/MinIO + ربط /readyz كـ Readiness Probe.',
        'نشر Grafana Agent لإرسال السجلات والمقاييس + إنشاء الكلاستر بـ Terraform IaC.',
        'كتابة وتشغيل End-to-End Tests بأداة Venom على Kind.'
      ],
      optionalEnhancements: [],
      exampleImplementation: `# Endpoints الجديدة في Phase 5:
GET  /temperature -> يقرأ من Valkey Cache (ما لم يكن قديماً فيحدثه)
POST /cache       -> يفرض تحديث البيانات في Valkey فوراً
POST /store       -> يفرض حفظ نسخة جديدة في MinIO (S3)
GET  /readyz      -> يعيد HTTP 200 إلا إذا:
  1) 50% + 1 من senseBoxes غير متاحة، أو
  2) محتوى Valkey Cache أقدم من دورتين (10 دقائق)، أو
  3) محتوى MinIO أقدم من دورتين.`,
      acceptanceCriteria: [
        'عمل دورة التحديث كل 5 دقائق لـ Valkey و MinIO.',
        'عمل /cache و /store و /readyz وفق الشروط الدقيقة ومقاييس مخصصة في /metrics.',
        'تجهيز Helm Chart للتطبيق و Kustomize لـ Valkey/MinIO + ربط /readyz كـ Readiness Probe.',
        'نشر Grafana Agent + إنشاء Kubernetes Cluster بـ Terraform IaC + نجاح Venom E2E Tests.'
      ],
      definitionOfDone: 'تشغيل الـ Pipeline لكلاستر Kind مع Terraform و Helm و Kustomize واجتياز اختبارات Venom E2E.',
      verificationCommands: [
        'helm lint ./charts/hivebox',
        'kubectl kustomize k8s/infra/',
        'terraform plan && terraform apply',
        'venom run tests/e2e/'
      ],
      commonFailures: [
        'نسيان شرط الـ 50%+1 أو فحص عمر الدورتين داخل /readyz.',
        'عدم تزامن أسرار MinIO و Valkey في Kubernetes Secrets.'
      ],
      resources: [
        { label: 'HiveBox Phase 5 Spec', url: 'https://devopsroadmap.io/projects/hivebox/', type: 'Roadmap / Docs' },
        { label: 'KodeKloud: Terraform Basics Training', url: 'https://kodekloud.com/', type: 'KodeKloud' },
        { label: 'KodeKloud: Helm for Beginners', url: 'https://kodekloud.com/', type: 'KodeKloud' }
      ],
      deliverables: [
        {
          id: 'hb5-1',
          text: 'دمج Valkey (5m cycle) و MinIO (5m cycle) + نقاط /cache و /store و /readyz و /metrics مخصصة',
          details: 'تحديث الخلفية لقراءة الحرارة من الكاش وتخزين اللقطات في MinIO وفحص الجاهزية بدقة',
          hint: 'احفظ timestamp آخر تحديث في مفتاح مستقل داخل Valkey و metadata في MinIO ليسهل فحص الدورتين في /readyz.',
          estimatedHours: 4,
          done: false,
          optional: false
        },
        {
          id: 'hb5-2',
          text: 'بناء Helm Chart للتطبيق + Kustomize لـ Valkey/MinIO + ربط /readyz كـ Readiness Probe',
          details: 'تغليف القوالب وتفعيل readinessProbe على /readyz وفصل الأسرار في Secrets',
          hint: 'امنح Pod التطبيق initialDelaySeconds مناسباً في readinessProbe حتى تكتمل أول دورة كاش/تخزين.',
          estimatedHours: 3.5,
          done: false,
          optional: false
        },
        {
          id: 'hb5-3',
          text: 'نشر Grafana Agent (Loki/Grafana) + إنشاء الكلاستر بـ Terraform IaC',
          details: 'تعريف الكلاستر والبنية التحتية بالكود في modules منظمة وإرسال المقاييس والسجلات',
          hint: 'نفّذ terraform validate و terraform plan داخل CI قبل أي تطبيق فعلي.',
          estimatedHours: 4,
          done: false,
          optional: false
        },
        {
          id: 'hb5-4',
          text: 'كتابة وتشغيل End-to-End Tests بأداة Venom على Kind',
          details: 'التحقق التلقائي من عمل /temperature و /cache و /store و /readyz على الكلاستر الحي',
          hint: 'استدعِ POST /cache و POST /store في خطوات Venom الأولى لضمان جاهزية /readyz فوراً.',
          estimatedHours: 2.5,
          done: false,
          optional: false
        }
      ]
    },
    {
      id: 'hb-6',
      phase: 6,
      moduleRef: 'Module 6: Optimize - Keep Improving',
      title: 'Phase 6: GitOps (Argo CD), Supply Chain Security & Production Hardening',
      status: 'pending',
      effortBreakdown: { videoPct: 15, labPct: 35, codingPct: 25, troubleshootingPct: 25 },
      dependencies: ['Phase 5 مدمج'],
      purpose:
        'نقل المشروع لمستوى الإنتاج المؤسسي عبر النشر التصريحي بـ Argo CD، وأتمتة الـ DNS/TLS، والأمان الذاتي — مع فصل واضح بين المهام الأساسية الموصى بها والتحسينات الاختيارية.',
      bestPractices: [
        'تفعيل Pull-based GitOps عبر Argo CD مع Auto-Sync و Self-Heal بدلاً من الدفع المباشر بالـ kubectl.',
        'التمييز بوضوح بين المهام الأساسية المطلوبة لإغلاق Phase 6 والتحسينات الاختيارية المتقدمة.',
        'تفعيل فحص Trivy و Dependabot بشكل مستمر لحماية سلسلة التوريد.'
      ],
      requiredTools: [
        'Argo CD',
        'ExternalDNS',
        'Cert-Manager',
        'Dependabot',
        'Trivy',
        'Grafana Loki',
        'Kyverno (Optional)',
        'TestKube (Optional)'
      ],
      requiredTasks: [
        'نشر التطبيق بنمط Declarative GitOps عبر Argo CD مع Automated Sync & Self-Heal.',
        'إعداد ExternalDNS و Cert-Manager (شهادات TLS) وتفعيل Dependabot لتحديثات الاعتماديات.',
        'استبدال الخدمات الخارجية بـ Open-Source داخل الكلاستر (Loki/Grafana/Prometheus) + فحص الصور بـ Trivy.'
      ],
      optionalEnhancements: [
        'تطبيق Kyverno Policy-as-Code لمنع الصور غير الموقعة أو root containers.',
        'إعداد بيئات متعددة (Dev / Stage / Prod) عبر Terraform Workspaces + Kustomize Overlays.',
        'إضافة TestKube للاختبار داخل الكلاستر أو بناء Custom Kubernetes Operator.'
      ],
      exampleImplementation: `# المهام الأساسية الموصى بها (Required / Recommended):
- Declarative GitOps sync via Argo CD
- ExternalDNS + Cert-Manager (Let's Encrypt TLS)
- Dependabot automated dependency PRs
- Self-hosted Open-Source Grafana/Loki/Terraform state (replacing external SaaS) + Trivy

# تحسينات اختيارية متقدمة (Optional Enhancements):
- Kyverno Policy-as-Code
- Multi-env clusters (Dev / Stage / Prod) via Terraform + Kustomize
- TestKube + Custom Kubernetes Operator`,
      acceptanceCriteria: [
        'Argo CD يزامن تغييرات الـ GitOps تلقائياً مع الكلاستر.',
        'Cert-Manager و ExternalDNS يديران الدومين وشهادات TLS تلقائياً.',
        'Dependabot و Trivy مفعلان، والاعتماد على خدمات Open-Source داخل الكلاستر.',
        'التمييز الواضح بين المهام الأساسية والتحسينات الاختيارية (Optional).'
      ],
      definitionOfDone: 'نشر مستقر بـ Argo CD + TLS + Observability ذاتية الاستضافة + أمان سلسلة التوريد.',
      verificationCommands: [
        'argocd app get hivebox',
        'kubectl get certificate -A',
        'trivy image --severity HIGH,CRITICAL <image>'
      ],
      commonFailures: [
        'ترك إعدادات Sync اليدوي في Argo CD بدلاً من Automated Sync & Self-Heal.',
        'الخلط بين التحسينات الاختيارية (Operator/Kyverno/TestKube) كمتطلبات إجبارية تعطل إغلاق Phase 6.'
      ],
      resources: [
        { label: 'HiveBox Phase 6 Spec', url: 'https://devopsroadmap.io/projects/hivebox/', type: 'Roadmap / Docs' },
        { label: 'Ahmed Elfakharany: Argo CD Arabic', url: 'https://www.youtube.com/watch?v=C0xRfrNIRak', type: 'YouTube' },
        { label: 'KodeKloud: DevSecOps Course', url: 'https://kodekloud.com/courses/devsecops', type: 'KodeKloud' }
      ],
      deliverables: [
        {
          id: 'hb6-1',
          text: '[Required] نشر التطبيق بنمط Declarative GitOps عبر Argo CD',
          details: 'إعداد Application manifest مع تفعيل Automated Sync و Prune و Self-Heal',
          hint: 'تأكد من مزامنة مسار Helm/Kustomize في Argo CD واختبار تغيير يدوي لملاحظة Self-Heal.',
          estimatedHours: 3.5,
          done: false,
          optional: false
        },
        {
          id: 'hb6-2',
          text: '[Required] إعداد ExternalDNS و Cert-Manager (TLS) + تفعيل Dependabot',
          details: 'إصدار شهادات HTTPS تلقائياً وإدارة سجلات DNS وتحديث الاعتماديات عبر PRs آلية',
          hint: 'اختبر مع Let’s Encrypt Staging Issuer أولاً لتفادي تجاوز حدود Rate Limits.',
          estimatedHours: 3,
          done: false,
          optional: false
        },
        {
          id: 'hb6-3',
          text: '[Required] استبدال الخدمات الخارجية بـ Open-Source داخل الكلاستر (Loki/Grafana) + Trivy',
          details: 'تشغيل Loki/Grafana/Prometheus محلياً داخل الكلاستر وإلزام CI ببوابة Trivy CVE',
          hint: 'شغّل trivy image --exit-code 1 --severity HIGH,CRITICAL قبل أي نشر عبر CD.',
          estimatedHours: 3.5,
          done: false,
          optional: false
        },
        {
          id: 'hb6-4',
          text: '[Optional] Kyverno Policy-as-Code / Multi-env Dev-Stage-Prod / TestKube / K8s Operator',
          details: 'تحسينات إضافية اختيارية لا تعطل إغلاق المرحلة الأساسية عند تأجيلها',
          hint: 'ابدأ بسياسة Kyverno واحدة مثل disallow-root-user بوضع Audit قبل Enforce.',
          estimatedHours: 4,
          done: false,
          optional: true
        }
      ]
    }
  ]
};

// Phase 7 rendered as a DISTINCT STANDALONE CAPSTONE PROJECT (NOT a HiveBox phase!)
export const CAPSTONE_PROJECT_DATA = {
  id: 'capstone-standalone',
  isSeparateProject: true,
  notHiveboxPhase: true,
  effortBreakdown: { videoPct: 10, labPct: 30, codingPct: 35, troubleshootingPct: 25 },
  badge: 'SEPARATE STANDALONE PROJECT • MODULE 7',
  repoHint: 'مستودع مستقل مخصص (Dedicated Separate Repository — NOT HiveBox)',
  title: 'End-to-End Original Capstone Project (Beyond HiveBox)',
  subtitle:
    'مشروع مستقل تماماً عن HiveBox في مستودع منفصل — تصمم وتنفذ فيه نظاماً أصيلاً من الصفر يطبق كامل دورة SDLC ومكدس DevOps (IaC + CI/CD + Kubernetes + GitOps + Observability + Containerized AI/ML Workload).',
  purpose:
    'إثبات القدرة على هندسة وبناء نظام إنتاجي متكامل من الصفر في مستودع مستقل بدون خطوات مسبقة، مع دمج حمل عمل AI/ML محاواة و Observability كاملة.',
  bestPractices: [
    'إنشاء مستودع جديد منفصل تماماً عن HiveBox مع توثيق معماري واضح عبر C4 Diagrams.',
    'دمج كامل المكدس: Terraform IaC + GitHub Actions CI/CD + Trivy + Kubernetes + Argo CD + Loki/Prometheus.',
    'إضافة خدمة AI/ML Inference أو LLM Proxy محاواة مع مراقبة استهلاك الموارد و HPA.'
  ],
  requiredTools: [
    'Terraform',
    'GitHub Actions',
    'Docker',
    'Kubernetes',
    'Argo CD',
    'Prometheus + Grafana + Loki',
    'Trivy',
    'Python / AI Inference'
  ],
  exampleImplementation: `# هيكل المستودع المستقل للـ Capstone:
├── infra/terraform/       # Provisioning K8s + Network + Storage
├── k8s/argocd/            # Declarative GitOps Application manifests
├── services/api/          # Core Backend / AutoTele Workers
├── services/ai-inference/ # Containerized AI/ML Inference / LLM Proxy
└── .github/workflows/     # Lint + Tests + Trivy + Build -> GHCR`,
  verificationCommands: [
    'terraform validate && terraform plan',
    'kubectl get pods,hpa -A',
    'argocd app list',
    'curl -f http://localhost/healthz'
  ],
  acceptanceCriteria: [
    'مستودع مستقل بمعمارية C4 واضحة.',
    'تشغيل CI/CD كامل مع فحوصات الأمان Trivy.',
    'نشر فعلي على Kubernetes عبر GitOps مع Observability.',
    'تضمين خدمة AI/ML محاواة تحت HPA.'
  ],
  definitionOfDone: 'مستودع عام مستقل وموثق بالكامل مع رسومات معمارية ولقطات تشغيل جاهز لعرضه في المقابلات.',
  commonFailures: [
    'بناء المشروع داخل مستودع HiveBox بدلاً من مستودع مستقل.',
    'تجاهل توثيق القرارات المعمارية والمقاييس في README.'
  ],
  resources: [
    { label: 'AutoTele SaaS Platform (Separate Repo)', url: 'https://github.com/yossefbelal1/AutoTele', type: 'Roadmap / Docs' },
    { label: 'Vishakha Sadhwani: End-To-End DevOps + AIOps Project', url: 'https://www.youtube.com/watch?v=UBzYwNbFCKs', type: 'YouTube' },
    { label: 'Tech5ense: DevOps & Cloud Engineering', url: 'https://www.tech5ense.com/', type: 'Roadmap / Docs' }
  ],
  whySeparate:
    'في Dynamic DevOps Roadmap، المرحلة السابعة تسألك: "What is your next project?" — الهدف هو إثبات قدرتك على هندسة مشروع جديد في مستودع مستقل بدون خطوات جاهزة، مع ترقية AutoTele كبنية SaaS إنتاجية.',
  autoteleBase: {
    name: 'AutoTele SaaS Platform (Separate Repo)',
    url: 'https://github.com/yossefbelal1/AutoTele',
    stack: ['Python asyncio', 'Telethon', 'Multiple Workers', 'PostgreSQL', 'Docker'],
    upgrades: [
      'إعادة تصميم معمارية AutoTele برسومات C4 Model واضحة في مستودعه المستقل.',
      'تطبيق GitHub Actions CI + Hadolint + Trivy + Multi-stage Docker.',
      'نشر خدمة AI/ML Inference أو LLM Proxy داخل Kubernetes مع Autoscaling و Prometheus.'
    ]
  },
  deliverables: [
    {
      id: 'cap-1',
      text: 'تحديد فكرة ومعمارية الـ Capstone في مستودع مستقل جديد + تصميم C4 Architecture Diagram',
      details: 'إنشاء مستودع جديد منفصل ورسم Context & Container Diagrams للنظام',
      hint: 'يمكنك بناء مشروع جديد أو ترقية AutoTele بمعمارية واضحة؛ المهم أن يكون في مستودع منفصل عن HiveBox.',
      estimatedHours: 4,
      done: false,
      optional: false
    },
    {
      id: 'cap-2',
      text: 'بناء CI/CD Pipeline كامل (Lint + Unit/Integration Tests + Trivy + GHCR)',
      details: 'أتمتة الاختبارات وفحص الصور ودفع الإصدارات تلقائياً إلى GHCR',
      hint: 'طبّق نفس معايير الجودة التي أثبتت كفاءتها في HiveBox (Pylint/Hadolint/Trivy/OIDC).',
      estimatedHours: 5,
      done: false,
      optional: false
    },
    {
      id: 'cap-3',
      text: 'تشغيل الخدمة على Kubernetes + Terraform IaC + Argo CD GitOps + Loki/Grafana',
      details: 'تجهيز البنية بالكود ومزامنة Argo CD مع تجميع السجلات والمقاييس',
      hint: 'وثّق لقطات شاشة لـ Argo CD و Grafana Dashboards داخل README للمقابلات.',
      estimatedHours: 6,
      done: false,
      optional: false
    },
    {
      id: 'cap-4',
      text: 'تضمين Containerized AI/ML Workload (Inference/LLM Proxy) مع HPA ومقاييس الأداء',
      details: 'تغليف خدمة AI/ML Inference وضبط HorizontalPodAutoscaler ومراقبتها في Grafana',
      hint: 'اعرض مقاييس inference_latency_seconds و requests_per_second في لوحة Prometheus.',
      estimatedHours: 5,
      done: false,
      optional: false
    }
  ]
};

export const CONTAINER_AUDIT_DATA = [
  {
    id: 'cbp-1',
    category: 'Size & Security',
    tool: 'Slim / Distroless Base',
    title: 'استخدام صور أساسية مصغرة (Minimal Base Images)',
    whatYouDo: 'استخدم python:3.9-slim أو distroless بدلاً من الصور الكاملة لتقليص الحجم بنسبة 80% وتقليل CVEs.',
    example: `FROM python:3.9-slim  # ~125MB بدلاً من ~950MB`
  },
  {
    id: 'cbp-2',
    category: 'Performance',
    tool: 'Multi-stage Builds',
    title: 'البناء متعدد المراحل (Multi-stage Builds)',
    whatYouDo: 'افصل مرحلة بناء وتثبيت التبعيات عن صورة التشغيل النهائية.',
    example: `FROM python:3.9-slim AS builder
RUN python -m venv /opt/venv && /opt/venv/bin/pip install -r requirements.txt
FROM python:3.9-slim
COPY --from=builder /opt/venv /opt/venv`
  },
  {
    id: 'cbp-3',
    category: 'Security',
    tool: 'Non-Root USER',
    title: 'التشغيل بمستخدم غير Root (Non-Root User)',
    whatYouDo: 'أنشئ مستخدماً بصلاحيات محدودة وشغّل التطبيق به.',
    example: `RUN useradd --create-home --uid 10001 appuser
USER 10001`
  },
  {
    id: 'cbp-4',
    category: 'Performance',
    tool: '.dockerignore',
    title: 'إعداد ملف .dockerignore شامل',
    whatYouDo: 'استبعد .git و .env و __pycache__ و .venv من سياق البناء.',
    example: `.git\n.env\n__pycache__\n.venv\ntests/`
  },
  {
    id: 'cbp-5',
    category: 'Reliability',
    tool: 'SemVer / Commit SHA',
    title: 'منع وسم :latest في الإنتاج',
    whatYouDo: 'ثبّت الصور برقم إصدار محدد أو Commit SHA لضمان التكرارية.',
    example: `FROM python:3.9.25-slim-bookworm`
  },
  {
    id: 'cbp-6',
    category: 'Performance',
    tool: 'Layer Caching',
    title: 'ترتيب الطبقات لاستغلال الكاش',
    whatYouDo: 'انسخ requirements.txt وثبّته قبل نسخ كود التطبيق.',
    example: `COPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY ./src ./src`
  },
  {
    id: 'cbp-7',
    category: 'Size',
    tool: 'Hadolint',
    title: 'دمج أوامر RUN ومسح الكاش واجتياز Hadolint',
    whatYouDo: 'ادمج أوامر apt مع تنظيف القوائم في طبقة واحدة وافحص بـ Hadolint.',
    example: `RUN apt-get update && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*`
  },
  {
    id: 'cbp-8',
    category: 'Reliability',
    tool: 'Exec Form / PID 1',
    title: 'معالجة إشارات الإيقاف (SIGTERM)',
    whatYouDo: 'استخدم صيغة Exec JSON في CMD لتصل SIGTERM للتطبيق مباشرة.',
    example: `CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]`
  },
  {
    id: 'cbp-9',
    category: 'Reliability',
    tool: 'HEALTHCHECK / /readyz',
    title: 'تعريف فحوصات الجاهزية',
    whatYouDo: 'حدد آلية فحص الصحة للحاوية و Readiness Probe في Kubernetes.',
    example: `HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:8000/version || exit 1`
  },
  {
    id: 'cbp-10',
    category: 'Security',
    tool: 'Trivy',
    title: 'فحص الثغرات التلقائي بـ Trivy في CI',
    whatYouDo: 'أوقف البناء إذا وُجدت ثغرات CRITICAL أو HIGH قبل الدفع إلى GHCR.',
    example: `trivy image --exit-code 1 --severity HIGH,CRITICAL ghcr.io/yossefbelal1/hivebox:v0.1.0`
  },
  {
    id: 'cbp-11',
    category: 'Security',
    tool: 'Runtime Secrets',
    title: 'فصل الأسرار عن طبقات الصورة',
    whatYouDo: 'مرر الأسرار عبر Environment Variables أو Kubernetes Secrets فقط.',
    example: `# لا تضع API keys في Dockerfile أبداً`
  },
  {
    id: 'cbp-12',
    category: 'Security',
    tool: 'K8s SecurityContext',
    title: 'نظام ملفات للقراءة فقط (Read-Only Root FS)',
    whatYouDo: 'فعّل readOnlyRootFilesystem: true في Kubernetes Manifests.',
    example: `securityContext:\n  readOnlyRootFilesystem: true\n  runAsNonRoot: true`
  },
  {
    id: 'cbp-13',
    category: 'Observability',
    tool: 'Grafana Loki',
    title: 'توجيه السجلات إلى stdout/stderr',
    whatYouDo: 'تجنب الكتابة في ملفات داخلية واطبع السجلات ليلتقطها Loki.',
    example: `logging.basicConfig(stream=sys.stdout, level=logging.INFO)`
  },
  {
    id: 'cbp-14',
    category: 'Reliability',
    tool: 'Resource Limits',
    title: 'فرض حدود الـ CPU و Memory',
    whatYouDo: 'حدد Requests & Limits لمنع OOMKilled المفاجئ.',
    example: `resources:\n  requests: { cpu: "100m", memory: "128Mi" }\n  limits: { cpu: "250m", memory: "256Mi" }`
  },
  {
    id: 'cbp-15',
    category: 'Architecture',
    tool: 'Valkey + MinIO',
    title: 'معمارية Stateless وفصل التخزين',
    whatYouDo: 'اجعل التطبيق عديم الحالة واخزن الكاش في Valkey والملفات في MinIO/S3.',
    example: `HiveBox Pod (Stateless) -> Valkey (Cache) + MinIO (Object Storage)`
  }
];
