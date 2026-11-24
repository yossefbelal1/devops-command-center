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
  phases: [
    {
      id: 'hb-1',
      phase: 1,
      moduleRef: 'Module 1: Welcome to the DevOps World',
      title: 'Phase 1: Kickoff & Preparation',
      status: 'done',
      dependencies: ['لا يوجد (نقطة البداية)'],
      purpose: 'تأسيس أسلوب العمل المنظم (Kanban & Pull Requests) وتجهيز المستودع واختيار حساسات openSenseMap.',
      requiredTools: ['GitHub Account', 'GitHub Projects (Kanban)', 'openSenseMap'],
      exampleImplementation: `# 3 senseBox IDs متجاورة من openSenseMap:
5eba5fbad46fb8001b799786
5c21ff8f919f80001adf2488
5ade1acf223bd80019a1011c

# قاعدة صارمة: ممنوع git push مباشر على main — كل Phase عبر Pull Request!`,
      acceptanceCriteria: [
        'وجود مستودع عام باسم yossefbelal1/Hivebox مع README واضح.',
        'وجود لوحة Kanban بأعمدة Todo / In Progress / Done.',
        'توثيق الـ 3 senseBox IDs والالتزام بعدم Scope Creep.'
      ],
      definitionOfDone: 'المستودع والـ Kanban جاهزان، وكارت Phase 1 منقول إلى عمود Done.',
      verificationCommands: ['git remote -v', 'git branch -a'],
      commonFailures: [
        'الدفع المباشر إلى main بدون فتح Pull Request.',
        'محاولة كتابة كود المرحلة الثالثة أو الرابعة مبكراً (Scope Creep).'
      ],
      deliverables: [
        { id: 'hb1-1', text: 'إنشاء/Fork مستودع عام باسم yossefbelal1/Hivebox على GitHub', done: true },
        { id: 'hb1-2', text: 'كتابة README.md يوضح الفكرة وخارطة المشروع وإعداد لوحة Kanban', done: true },
        { id: 'hb1-3', text: 'تحديد 3 senseBox IDs من openSenseMap والعمل عبر Pull Requests فقط', done: true }
      ]
    },
    {
      id: 'hb-2',
      phase: 2,
      moduleRef: 'Module 2: Basics - DevOps Core (محطتك القادمة فوراً)',
      title: 'Phase 2: Basic API & Container (v0.0.1)',
      status: 'in_progress',
      dependencies: ['Phase 1 مكتمل', 'إنهاء Python Corey Schafer الـ 6 + لابات Bash'],
      purpose: 'بناء أصغر نسخة قابلة للتشغيل (MVP v0.0.1) وتغليفها في Docker وتشغيلها محلياً مع سكريبت Bash Health Check.',
      requiredTools: ['Git', 'VS Code', 'Python 3.9+', 'Docker 29.9.3 (RHEL VM)', 'Bash'],
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
      deliverables: [
        { id: 'hb2-1', text: 'تنفيذ دالة تطبع الإصدار الحالي (Semantic Versioning v0.0.1) وتخرج', done: false },
        { id: 'hb2-2', text: 'إنشاء Dockerfile وبناء الصورة وتشغيل الحاوية محلياً على RHEL VM', done: false },
        { id: 'hb2-3', text: 'كتابة سكريبت Bash للتحقق وتوثيق كيفية الاختبار في المستودع', done: false },
        { id: 'hb2-4', text: 'رفع الكود عبر Pull Request وتحديث لوحة Kanban', done: false }
      ]
    },
    {
      id: 'hb-3',
      phase: 3,
      moduleRef: 'Module 3: Start - Laying the Foundation',
      title: 'Phase 3: Quality, Endpoints & Continuous Integration',
      status: 'pending',
      dependencies: ['Phase 2 مدمج في main'],
      purpose: 'تحويل التطبيق إلى FastAPI/Flask REST API حقيقي متصل بـ openSenseMap مع اختبارات pytest وجودة الكود و CI Pipeline.',
      requiredTools: ['FastAPI / Flask', 'pytest', 'Pylint', 'Hadolint', 'GitHub Actions', 'OpenSSF Scorecard'],
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
      deliverables: [
        { id: 'hb3-1', text: 'تطبيق Conventional Commits وبناء /version و /temperature عبر openSenseMap API', done: false },
        { id: 'hb3-2', text: 'كتابة Unit Tests باستخدام pytest + اجتياز Pylint', done: false },
        { id: 'hb3-3', text: 'تطبيق Container Best Practices (Multi-stage + Non-root) واجتياز Hadolint', done: false },
        { id: 'hb3-4', text: 'بناء GitHub Actions CI + اختبار /version + إعداد OpenSSF Scorecard', done: false }
      ]
    },
    {
      id: 'hb-4',
      phase: 4,
      moduleRef: 'Module 4: Expand - Constructing a Shell',
      title: 'Phase 4: Kubernetes (Kind), Metrics & Security Gates',
      status: 'pending',
      dependencies: ['Phase 3 مدمج', 'إنهاء Kubernetes Basics & Kind'],
      purpose: 'تشغيل HiveBox داخل Kubernetes محلياً (Kind + Ingress-Nginx) وتصدير /metrics وفحص SonarQube/Terrascan ورفع الصورة لـ GHCR.',
      requiredTools: ['Kind', 'kubectl', 'Ingress-Nginx', 'Prometheus', 'SonarQube / Semgrep', 'Terrascan', 'GHCR'],
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
      deliverables: [
        { id: 'hb4-1', text: 'تهيئة senseBox IDs عبر Env Vars + إضافة /metrics + حقل status في /temperature', done: false },
        { id: 'hb4-2', text: 'كتابة Integration Tests وإعداد Kind + Ingress-Nginx + K8s Manifests', done: false },
        { id: 'hb4-3', text: 'تشغيل SonarQube/Semgrep و Terrascan في الـ CI Pipeline', done: false },
        { id: 'hb4-4', text: 'بناء GitHub Actions CD workflow لنشر صورة موسومة في GHCR', done: false }
      ]
    },
    {
      id: 'hb-5',
      phase: 5,
      moduleRef: 'Module 5: Transform - Finishing the Structure',
      title: 'Phase 5: Valkey Cache, MinIO Storage, Terraform, Helm & Venom E2E',
      status: 'pending',
      dependencies: ['Phase 4 مدمج', 'Terraform + Helm + Kustomize'],
      purpose: 'إضافة طبقة الكاش Valkey والتخزين MinIO بدورة 5 دقائق، تغليف Helm & Kustomize، بناء البنية بـ Terraform، واختبار E2E بـ Venom.',
      requiredTools: ['Valkey', 'MinIO', 'Helm', 'Kustomize', 'Terraform', 'Grafana Agent', 'Venom'],
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
      deliverables: [
        { id: 'hb5-1', text: 'دمج Valkey (5m cycle) و MinIO (5m cycle) + نقاط /cache و /store و /readyz و /metrics مخصصة', done: false },
        { id: 'hb5-2', text: 'بناء Helm Chart للتطبيق + Kustomize لـ Valkey/MinIO + ربط /readyz كـ Readiness Probe', done: false },
        { id: 'hb5-3', text: 'نشر Grafana Agent (Loki/Grafana) + إنشاء الكلاستر بـ Terraform IaC', done: false },
        { id: 'hb5-4', text: 'كتابة وتشغيل End-to-End Tests بأداة Venom على Kind', done: false }
      ]
    },
    {
      id: 'hb-6',
      phase: 6,
      moduleRef: 'Module 6: Optimize - Keep Improving',
      title: 'Phase 6: GitOps (Argo CD), Supply Chain Security & Production Hardening',
      status: 'pending',
      dependencies: ['Phase 5 مدمج'],
      purpose: 'نقل المشروع لمستوى الإنتاج المؤسسي عبر النشر التصريحي بـ Argo CD، وأتمتة الـ DNS/TLS، والأمان الذاتي.',
      requiredTools: ['Argo CD', 'ExternalDNS', 'Cert-Manager', 'Dependabot', 'Trivy', 'Grafana Loki', 'Kyverno (Optional)', 'TestKube (Optional)'],
      exampleImplementation: `# التحسينات الموصى بها (Recommended):
- Declarative GitOps sync via Argo CD
- ExternalDNS + Cert-Manager (Let's Encrypt TLS)
- Dependabot automated dependency PRs
- Self-hosted Open-Source Grafana/Loki/Terraform state (replacing external SaaS)

# تحسينات اختيارية متقدمة (Optional):
- Kyverno Policy-as-Code
- Multi-env clusters (Dev / Stage / Prod) via Terraform + Kustomize
- TestKube + Custom Kubernetes Operator`,
      acceptanceCriteria: [
        'Argo CD يزامن تغييرات الـ GitOps تلقائياً مع الكلاستر.',
        'Cert-Manager و ExternalDNS يديران الدومين وشهادات TLS تلقائياً.',
        'Dependabot و Trivy مفعلان، والاعتماد على خدمات Open-Source داخل الكلاستر.',
        'التمييز الواضح بين المتطلبات الموصى بها والتحسينات الاختيارية (Optional).'
      ],
      definitionOfDone: 'نشر مستقر بـ Argo CD + TLS + Observability ذاتية الاستضافة + أمان سلسلة التوريد.',
      verificationCommands: [
        'argocd app get hivebox',
        'kubectl get certificate -A',
        'trivy image --severity HIGH,CRITICAL <image>'
      ],
      commonFailures: [
        'ترك إعدادات Sync اليدوي في Argo CD بدلاً من Automated Sync & Self-Heal.',
        'الخلط بين التحسينات الاختيارية (Operator/Kyverno) كمتطلبات إجبارية تعطل الإغلاق.'
      ],
      deliverables: [
        { id: 'hb6-1', text: '[Recommended] نشر التطبيق بنمط Declarative GitOps عبر Argo CD', done: false },
        { id: 'hb6-2', text: '[Recommended] إعداد ExternalDNS و Cert-Manager (TLS) + تفعيل Dependabot', done: false },
        { id: 'hb6-3', text: '[Recommended] استبدال الخدمات الخارجية بـ Open-Source داخل الكلاستر (Loki/Grafana) + Trivy', done: false },
        { id: 'hb6-4', text: '[Optional] Kyverno Policy-as-Code / Multi-env Dev-Stage-Prod / TestKube / K8s Operator', done: false }
      ]
    }
  ]
};

// Phase 7 rendered as a DISTINCT STANDALONE CAPSTONE PROJECT (NOT a HiveBox phase!)
export const CAPSTONE_PROJECT_DATA = {
  id: 'capstone-standalone',
  badge: 'SEPARATE STANDALONE PROJECT • MODULE 7',
  title: 'End-to-End Original Capstone Project (Beyond HiveBox)',
  subtitle:
    'مشروع مستقل تماماً عن HiveBox — تصمم وتنفذ فيه نظاماً أصيلاً من الصفر يطبق كامل دورة SDLC ومكدس DevOps (IaC + CI/CD + Kubernetes + GitOps + Observability + Containerized AI/ML Workload).',
  whySeparate:
    'في Dynamic DevOps Roadmap، المرحلة السابعة تسألك: "What is your next project?" — الهدف هو إثبات قدرتك على هندسة مشروع جديد بدون خطوات جاهزة، مع ترقية AutoTele كبنية SaaS إنتاجية.',
  autoteleBase: {
    name: 'AutoTele SaaS Platform',
    url: 'https://github.com/yossefbelal1/AutoTele',
    stack: ['Python asyncio', 'Telethon', 'Multiple Workers', 'PostgreSQL', 'Docker'],
    upgrades: [
      'إعادة تصميم معمارية AutoTele برسومات C4 Model واضحة.',
      'تطبيق GitHub Actions CI + Hadolint + Trivy + Multi-stage Docker.',
      'نشر خدمة AI/ML Inference أو LLM Proxy داخل Kubernetes مع Autoscaling و Prometheus.'
    ]
  },
  deliverables: [
    { id: 'cap-1', text: 'تحديد فكرة ومعمارية الـ Capstone المستقل وتصميم C4 Architecture Diagram' },
    { id: 'cap-2', text: 'بناء CI/CD Pipeline كامل (Lint + Unit/Integration Tests + Trivy + GHCR)' },
    { id: 'cap-3', text: 'تشغيل الخدمة على Kubernetes + Terraform IaC + Argo CD GitOps + Loki/Grafana' },
    { id: 'cap-4', text: 'تضمين AI/ML Inference Container مع HPA ومقاييس الأداء في البورتفوليو' }
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
