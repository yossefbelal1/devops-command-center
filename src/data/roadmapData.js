export const ROADMAP_DATA = {
  meta: {
    studentName: "يوسف بلال (yossefbelal1)",
    location: "دمياط، مصر",
    degree: "Bachelor's in Management Information Systems (MIS)",
    targetRole: "Junior DevOps / Cloud / SRE Engineer",
    environment: "Windows + VS Code + GitHub | RHEL VM (yossef@RedHatLap) with Docker 29.9.3 & Python 3.9.25",
    portfolioRepos: [
      { name: "Hivebox", url: "https://github.com/yossefbelal1/Hivebox", desc: "مشروع Dynamic DevOps Roadmap الرئيسي (Iterative MVP على مستودع واحد)" },
      { name: "AutoTele", url: "https://github.com/yossefbelal1/AutoTele", desc: "منصة SaaS لتبادل الإعلانات على تليجرام (Python asyncio, Telethon, Multiple Workers, PostgreSQL, Docker)" }
    ],
    currentModuleId: "module-2",
    currentTopicId: "m2-4",
    pace: "10 – 15 ساعة أسبوعياً (~40 ساعة شهرياً)",
    timelineRange: "ديسمبر 2026 – منتصف 2027 (6–8 شهور)",
    totalEstimatedHours: 320,
    depiVerdict: {
      status: "تراك DevOps غير متاح في DEPI لخريجي نظم معلومات وتجارة",
      summary:
        "وفقاً للجدول الرسمي في وثيقة DEPI (Program Available For each College)، تراك DevOps Engineer متاح فقط تحت كليات الهندسة المتخصصة. المتاح لخريجي تجارة المتخصصة هو React / .Net / Mobile / Testing / Data / ERP.",
      decision:
        "اقفل ملف المنح الحكومية بالكامل (DEPI / NTI / DEBI) ولا تضيع يوماً واحداً في الانتظار. منهج KodeKloud Pro + Dynamic DevOps Roadmap أعمق عملياً وبمراحل، ونتجه مباشرة لبناء HiveBox + AutoTele + شهادة CKA/AWS SAA.",
      threePillars: [
        {
          title: "1. باب الـ Outsourcing والشركات الخاصة (أول وظيفة)",
          desc: "80% من السوق (SaaS, Startups, Outsourcing للبنوك في مصر والخليج) بيحاسبك على شغلك الفعلي مش اسم الكلية. اكتب شهادتك بالإنجليزي: Bachelor's in Management Information Systems (MIS) لتخطي فلاتر الـ ATS."
        },
        {
          title: "2. معادلة الخبرة + المشاريع + الشهادة الدولية",
          desc: "مشاريع End-to-End حقيقية على GitHub (HiveBox + AutoTele) + تاسكات Upwork صغيرة (Backup, Nginx, Docker, Monitoring) + شهادة عملية ثقيلة (CKA أو AWS SAA) تلغي سؤال الكلية تماماً."
        },
        {
          title: "3. ميزة الـ AI Workloads التنافسية",
          desc: "في نهاية المسار سننشر نموذج AI صغير أو LLM API على Kubernetes مع Autoscaling و Prometheus Monitoring — خطوة تضعك أمام 90% من المنافسين."
        }
      ]
    }
  },

  modules: [
    {
      id: "module-1",
      number: "01",
      badge: "مكتمل 100%",
      title: "Welcome to the DevOps World",
      subtitle: "SDLC، الفروق بين Agile و DevOps و DevSecOps، مبادئ Shift-Left، وكويز الموديول + HiveBox Phase 1.",
      monthRange: "مكتمل 100%",
      estimatedHours: 20,
      cardTheme: "from-[#0F3460] via-[#0B2545] to-[#081A33]",
      techIcons: ["linux", "git", "github", "docker"],
      sections: [
        { title: "المفاهيم التأسيسية", topicIds: ["m1-1", "m1-2"] },
        { title: "التقييم والمشروع", topicIds: ["m1-3"] }
      ],
      topics: [
        {
          id: "m1-1",
          code: "1.1",
          title: "دورة حياة البرمجيات (SDLC) و Agile vs DevOps",
          hours: 8,
          defaultStatus: "done",
          tags: ["SDLC", "Agile", "DevOps"],
          whatYouDo: "فهم دورة حياة البرمجيات الكاملة (Plan, Code, Build, Test, Deploy, Operate, Monitor) والفرق بين Agile و DevOps و DevSecOps.",
          deliverable: "خريطة ذهنية واضحة لمراحل تسليم البرمجيات ودور مهندس DevOps في كل مرحلة.",
          resources: [{ label: "Module 1: Welcome to DevOps", url: "https://devopsroadmap.io/getting-started/" }],
          subtasks: [
            { id: "m1-1-s1", text: "فهم دورة حياة البرمجيات SDLC (Plan → Code → Build → Test → Deploy → Operate → Monitor)", done: true },
            { id: "m1-1-s2", text: "استيعاب الفروق الجوهرية بين Agile و DevOps و DevSecOps ومبدأ Shift-Left Security", done: true },
            { id: "m1-1-s3", text: "فهم المحاور الأساسية للـ DevOps (Culture, Automation, Measurement/Monitoring)", done: true }
          ]
        },
        {
          id: "m1-2",
          code: "1.2",
          title: "اجتياز كويز الإنترفيو الخاص بالموديول الأول",
          hours: 4,
          defaultStatus: "done",
          tags: ["Interview Quiz", "Foundations"],
          whatYouDo: "مراجعة أسئلة المقابلات النظرية الخاصة بثقافة DevOps والـ SDLC والـ Shift-Left.",
          deliverable: "اجتياز كويز الموديول الأول بنجاح.",
          resources: [{ label: "Dynamic DevOps Roadmap", url: "https://devopsroadmap.io/" }],
          subtasks: [
            { id: "m1-2-s1", text: "اجتياز كويز الإنترفيو الخاص بالموديول الأول بنجاح", done: true }
          ]
        },
        {
          id: "m1-3",
          code: "1.3",
          title: "تسليم HiveBox Phase 1 (Setup & Kanban)",
          hours: 8,
          defaultStatus: "done",
          tags: ["HiveBox", "GitHub", "Kanban"],
          whatYouDo: "إنشاء مستودع yossefbelal1/Hivebox وتجهيز README ولوحة GitHub Project Kanban وتحديد 3 senseBox IDs.",
          deliverable: "مستودع HiveBox جاهز ومربوط بلوحة Kanban مع نقل كارت Phase 1 إلى Done.",
          resources: [{ label: "HiveBox Phase 1", url: "https://devopsroadmap.io/projects/hivebox/" }],
          subtasks: [
            { id: "m1-3-s1", text: "إنشاء مستودع عام باسم Hivebox على GitHub (yossefbelal1/Hivebox)", done: true },
            { id: "m1-3-s2", text: "كتابة README.md يوضح فكرة المشروع وخارطة المراحل الـ 6+", done: true },
            { id: "m1-3-s3", text: "إنشاء لوحة GitHub Project (Kanban: Todo, In Progress, Done) وإتمام Phase 1", done: true }
          ]
        }
      ]
    },

    {
      id: "module-2",
      number: "02",
      badge: "المحطة الحالية • قيد التنفيذ",
      title: "Basics — DevOps Core",
      subtitle: "Linux & Git & Docker Core منتهية — متبقي Corey Schafer الـ 6 + لابات KodeKloud + HiveBox Phase 2.",
      monthRange: "ديسمبر 2026 (الشهر 1)",
      estimatedHours: 50,
      cardTheme: "from-[#1D4ED8] via-[#1E40AF] to-[#172554]",
      techIcons: ["python", "bash", "linux", "docker"],
      sections: [
        { title: "الأساسيات المنتهية (Linux, Git, Docker Core)", topicIds: ["m2-1", "m2-2", "m2-3"] },
        { title: "التركيز الحالي (Python & Bash & HiveBox Phase 2)", topicIds: ["m2-4", "m2-5", "m2-6"] }
      ],
      topics: [
        {
          id: "m2-1",
          code: "2.1",
          title: "Linux & Networking (RH124/RH134 + CCNA)",
          hours: 12,
          defaultStatus: "done",
          tags: ["Linux", "RHEL", "Networking"],
          whatYouDo: "إدارة أنظمة لينكس (RH124 / RH134) وأساسيات الشبكات (IP, Subnetting, Routing, DNS, HTTP/S) مع تقوية مستمرة في الـ Troubleshooting.",
          deliverable: "سيرفر RHEL VM (yossef@RedHatLap) مهيأ وجاهز للتطبيق العملي.",
          resources: [{ label: "Dynamic Roadmap: Module 2", url: "https://devopsroadmap.io/learning-plan" }],
          subtasks: [
            { id: "m2-1-s1", text: "إدارة أنظمة لينكس بمستوى RH124 / RH134", done: true },
            { id: "m2-1-s2", text: "أساسيات الشبكات (CCNA: IP, Subnetting, Routing, DNS, HTTP/S)", done: true },
            { id: "m2-1-s3", text: "تجهيز RHEL VM (yossef@RedHatLap) بمستخدم غير root و Python 3.9.25", done: true }
          ]
        },
        {
          id: "m2-2",
          code: "2.2",
          title: "Git & GitHub Workflow",
          hours: 6,
          defaultStatus: "done",
          tags: ["Git", "GitHub"],
          whatYouDo: "إتقان دورة العمل الأساسية (clone, config, add, commit, branch, push, pull) على VS Code و GitHub.",
          deliverable: "ربط VS Code بحساب GitHub yossefbelal1 وإدارة الفروع والـ PRs.",
          resources: [{ label: "GitHub yossefbelal1", url: "https://github.com/yossefbelal1" }],
          subtasks: [
            { id: "m2-2-s1", text: "إتقان clone, config, add, commit, branch, push, pull", done: true },
            { id: "m2-2-s2", text: "ربط بيئة Windows + VS Code بحساب GitHub", done: true }
          ]
        },
        {
          id: "m2-3",
          code: "2.3",
          title: "Docker Core (Images, Containers, Dockerfile, Ports & Env)",
          hours: 8,
          defaultStatus: "done",
          tags: ["Docker 29.9.3", "Containers"],
          whatYouDo: "فهم الصور والحاويات، كتابة Dockerfile مبدئي، وإدارة المنافذ ومتغيرات البيئة (ما قبل Docker Compose).",
          deliverable: "تشغيل Docker 29.9.3 على RHEL VM بصلاحيات المستخدم بدون sudo.",
          resources: [{ label: "Docker Core Basics", url: "https://devopsroadmap.io/learning-plan" }],
          subtasks: [
            { id: "m2-3-s1", text: "فهم Images & Containers وكتابة Dockerfile مبدئي", done: true },
            { id: "m2-3-s2", text: "إدارة Ports و Environment Variables وتشغيل Docker بدون sudo على RHEL", done: true }
          ]
        },
        {
          id: "m2-4",
          code: "2.4",
          title: "Python Fundamentals & DevOps Tools (خطوتك الحالية الآن)",
          hours: 12,
          defaultStatus: "in_progress",
          tags: ["Python", "Corey Schafer", "KodeKloud"],
          whatYouDo: "تم إنهاء نظري CS50P بالعربي (باستثناء RegEx و OOP). الخطوة الحالية: تطبيق أدوات Corey Schafer الـ 6 بالترتيب + إكمال لابات Python Basics على KodeKloud (متوقف عند Literals).",
          deliverable: "إتقان venv و pip و json و requests و os و subprocess على الـ RHEL VM + إنهاء لابات KodeKloud.",
          resources: [
            { label: "KodeKloud Python Basics", url: "https://kodekloud.com/" },
            { label: "Corey Schafer Python", url: "https://www.youtube.com/@coreyms" }
          ],
          subtasks: [
            { id: "m2-4-s1", text: "إنهاء الجانب النظري للغة من بلاي ليست CS50P بالعربي (تم مع تخطي RegEx و OOP عمداً)", done: true },
            { id: "m2-4-s2", text: "فيديو وتطبيق عملي: venv + pip (عزل البيئة وتوليد requirements.txt)", done: false },
            { id: "m2-4-s3", text: "فيديو وتطبيق عملي: json + requests (التعامل مع APIs)", done: false },
            { id: "m2-4-s4", text: "فيديو وتطبيق عملي: os + subprocess (أتمتة نظام التشغيل)", done: false },
            { id: "m2-4-s5", text: "حل اللابات المتبقية في كورس Python Basics على KodeKloud (بدءاً من درس Literals)", done: false }
          ]
        },
        {
          id: "m2-5",
          code: "2.5",
          title: "Bash Scripting & Health Check Script",
          hours: 7,
          defaultStatus: "in_progress",
          tags: ["Bash", "KodeKloud Labs", "Health Check"],
          whatYouDo: "المفاهيم النظرية منتهية (Shebang, Variables, Args, Conditions, Loops, $?, Signals & Trap). المطلوب: حل لابات فقط من Shell Scripts for Beginners + كتابة سكريبت Health Check عملي على RHEL VM.",
          deliverable: "سكريبت Bash نظيف يختبر استجابة تطبيق HiveBox على RHEL VM.",
          resources: [{ label: "KodeKloud Shell Scripts", url: "https://kodekloud.com/" }],
          subtasks: [
            { id: "m2-5-s1", text: "مراجعة المفاهيم النظرية الأساسية (Shebang, Variables, Args, Conditions, Loops, $?, Trap)", done: true },
            { id: "m2-5-s2", text: "حل لابات فقط من كورس Shell Scripts for Beginners على KodeKloud", done: false },
            { id: "m2-5-s3", text: "كتابة سكريبت Health Check عملي على الـ RHEL VM", done: false }
          ]
        },
        {
          id: "m2-6",
          code: "2.6",
          title: "تسليم HiveBox Phase 2 + كويز Module 2",
          hours: 5,
          defaultStatus: "pending",
          tags: ["HiveBox Phase 2", "v0.0.1", "CLI"],
          whatYouDo: "بناء النسخة الأولى v0.0.1 من HiveBox (دالة تطبع الإصدار وتخرج) وتغليفها في Dockerfile وتشغيلها على RHEL VM ورفعها مع تحديث Kanban + حل كويز Module 2.",
          deliverable: "إغلاق Module 2 بالكامل ورفع كود Phase 2 على GitHub.",
          resources: [{ label: "HiveBox Phase 2 Spec", url: "https://devopsroadmap.io/projects/hivebox/" }],
          subtasks: [
            { id: "m2-6-s1", text: "كتابة كود HiveBox v0.0.1 (Semantic Versioning — طباعة الإصدار والخروج)", done: false },
            { id: "m2-6-s2", text: "إنشاء Dockerfile وبناء الصورة وتشغيل الحاوية محلياً على RHEL VM", done: false },
            { id: "m2-6-s3", text: "توثيق الاختبار ورفع الكود عبر PR إلى yossefbelal1/Hivebox وتحديث Kanban", done: false },
            { id: "m2-6-s4", text: "حل كويز Module 2 بنجاح", done: false }
          ]
        }
      ]
    },

    {
      id: "module-3",
      number: "03",
      badge: "يناير 2027 • الشهر 2",
      title: "Start — Laying the Foundation",
      subtitle: "Modularity، اختبارات pytest، تحسين Docker (Multi-stage + Hadolint)، و GitHub Actions CI + HiveBox Phase 3.",
      monthRange: "يناير 2027 (الشهر 2)",
      estimatedHours: 45,
      cardTheme: "from-[#065F46] via-[#064E3B] to-[#022C22]",
      techIcons: ["python", "docker", "github", "security"],
      sections: [
        { title: "هيكلة الكود والاختبارات", topicIds: ["m3-1", "m3-2"] },
        { title: "أمان الحاويات و GitHub Actions", topicIds: ["m3-3", "m3-4", "m3-5"] }
      ],
      topics: [
        {
          id: "m3-1",
          code: "3.1",
          title: "Planning & Code Modularity",
          hours: 6,
          defaultStatus: "pending",
          tags: ["Python", "Clean Code", "Conventional Commits"],
          whatYouDo: "تنظيم هيكل كود HiveBox وفصل المنطق البرمجي عن الإعدادات مع الالتزام بـ Conventional Commits.",
          deliverable: "كود منظم مع نقاط /version و /temperature لـ openSenseMap API.",
          resources: [{ label: "Module 3 Roadmap", url: "https://devopsroadmap.io/learning-plan" }],
          subtasks: [
            { id: "m3-1-s1", text: "تنظيم هيكل مجلدات المشروع وفصل الـ Modules", done: false },
            { id: "m3-1-s2", text: "اعتماد Conventional Commits وتطبيق Pylint", done: false }
          ]
        },
        {
          id: "m3-2",
          code: "3.2",
          title: "Quality Assurance & Unit Testing (pytest)",
          hours: 10,
          defaultStatus: "pending",
          tags: ["pytest", "Unit Tests", "QA"],
          whatYouDo: "كتابة اختبارات وحدات أوتوماتيكية للكود باستخدام pytest لاختبار الـ Endpoints والدوال (مع Mocking لـ openSenseMap).",
          deliverable: "مجموعة Unit Tests تغطي /version و /temperature.",
          resources: [{ label: "HiveBox Phase 3", url: "https://devopsroadmap.io/projects/hivebox/" }],
          subtasks: [
            { id: "m3-2-s1", text: "تثبيت pytest وكتابة اختبارات لنقطة /version", done: false },
            { id: "m3-2-s2", text: "كتابة اختبارات لحساب متوسط الحرارة والتحقق من شرط البيانات الأقل من ساعة", done: false }
          ]
        },
        {
          id: "m3-3",
          code: "3.3",
          title: "Docker Best Practices (Multi-stage, Non-root & Hadolint)",
          hours: 9,
          defaultStatus: "pending",
          tags: ["Docker", "Hadolint", "Multi-stage"],
          whatYouDo: "تحسين Dockerfile عبر Multi-stage builds، تقليل حجم الصورة، التشغيل بمستخدم Non-root، وفحصه بـ Hadolint.",
          deliverable: "Dockerfile نظيف يجتاز فحص Hadolint بدون تحذيرات.",
          resources: [{ label: "Container Best Practices", url: "https://devopsroadmap.io/projects/container-best-practices/" }],
          subtasks: [
            { id: "m3-3-s1", text: "تطبيق Multi-stage Build و Base Image مصغرة (slim/distroless)", done: false },
            { id: "m3-3-s2", text: "التشغيل بمستخدم Non-root وإضافة .dockerignore", done: false },
            { id: "m3-3-s3", text: "تثبيت Hadolint في VS Code وفحص Dockerfile", done: false }
          ]
        },
        {
          id: "m3-4",
          code: "3.4",
          title: "Continuous Integration بـ GitHub Actions & OpenSSF Scorecard",
          hours: 12,
          defaultStatus: "pending",
          tags: ["GitHub Actions", "CI", "OpenSSF"],
          whatYouDo: "بناء أول CI Pipeline باستخدام GitHub Actions (.github/workflows/ci.yml) لتشغيل Pylint و Hadolint و pytest وبناء الصورة وفحص OpenSSF Scorecard.",
          deliverable: "Pipeline يعمل تلقائياً عند كل Push/PR مع اختبار نقطة /version في الـ CI.",
          resources: [{ label: "KodeKloud GitHub Actions", url: "https://kodekloud.com/" }],
          subtasks: [
            { id: "m3-4-s1", text: "إنشاء .github/workflows/ci.yml لتشغيل Pylint و Hadolint", done: false },
            { id: "m3-4-s2", text: "تشغيل pytest وبناء Docker Image داخل الـ CI", done: false },
            { id: "m3-4-s3", text: "تفعيل OpenSSF Scorecard GitHub Action وإصلاح الملاحظات", done: false },
            { id: "m3-4-s4", text: "تشغيل الحاوية في الـ CI واختبار استجابة /version", done: false }
          ]
        },
        {
          id: "m3-5",
          code: "3.5",
          title: "تسليم HiveBox Phase 3",
          hours: 8,
          defaultStatus: "pending",
          tags: ["HiveBox Phase 3", "FastAPI/Flask"],
          whatYouDo: "تنفيذ /version و /temperature المتصلة بـ openSenseMap API ورفع الكود كـ PR مع CI أخضر.",
          deliverable: "إغلاق HiveBox Phase 3 على لوحة Kanban.",
          resources: [{ label: "HiveBox Phase 3 Spec", url: "https://devopsroadmap.io/projects/hivebox/" }],
          subtasks: [
            { id: "m3-5-s1", text: "تنفيذ Endpoint /version و /temperature ببيانات openSenseMap", done: false },
            { id: "m3-5-s2", text: "إتمام PR الخاص بـ Phase 3 بنجاح كامل اختبارات الـ CI", done: false }
          ]
        }
      ]
    },

    {
      id: "module-4",
      number: "04",
      badge: "فبراير – مارس 2027 • شهران",
      title: "Expand — Constructing a Shell",
      subtitle: "12-Factor App، Kubernetes (Kind)، Prometheus/Grafana، أساسيات AWS، استكمال System Design، و HiveBox Phase 4.",
      monthRange: "فبراير – مارس 2027 (الشهران 3 و 4)",
      estimatedHours: 70,
      cardTheme: "from-[#1E3A8A] via-[#172554] to-[#0F172A]",
      techIcons: ["kubernetes", "prometheus", "aws", "nginx"],
      sections: [
        { title: "معمارية 12-Factor و Kubernetes Core", topicIds: ["m4-1", "m4-2"] },
        { title: "المراقبة، AWS، و System Design", topicIds: ["m4-3", "m4-4", "m4-5"] },
        { title: "تسليم Phase 4", topicIds: ["m4-6"] }
      ],
      topics: [
        {
          id: "m4-1",
          code: "4.1",
          title: "Twelve-Factor App & REST APIs Best Practices",
          hours: 8,
          defaultStatus: "pending",
          tags: ["12-Factor", "REST API", "Stateless"],
          whatYouDo: "تطبيق مبادئ Twelve-Factor App (قراءة معرفات senseBoxes من Env Vars والاعتماد على Statelessness).",
          deliverable: "تطبيق HiveBox قابل للتهيئة بالكامل عبر Environment Variables.",
          resources: [{ label: "12-Factor App", url: "https://12factor.net/" }],
          subtasks: [
            { id: "m4-1-s1", text: "جعل senseBox IDs قابلة للتهيئة عبر Env Vars", done: false },
            { id: "m4-1-s2", text: "إضافة حقل status لقراءة الحرارة (Too Cold / Good / Too Hot)", done: false }
          ]
        },
        {
          id: "m4-2",
          code: "4.2",
          title: "Container Orchestration: Kubernetes Core & Kind",
          hours: 24,
          defaultStatus: "pending",
          tags: ["Kubernetes", "Kind", "Ingress-Nginx"],
          whatYouDo: "فهم معمارية الكلاستر وتشغيل التطبيق محلياً عبر Kind، وإتقان Pods, Deployments, ReplicaSets, Services, Ingress, ConfigMaps, Secrets, Probes, HPA.",
          deliverable: "تشغيل HiveBox داخل كلاستر Kind مع Ingress-Nginx.",
          resources: [{ label: "KodeKloud Kubernetes", url: "https://kodekloud.com/" }],
          subtasks: [
            { id: "m4-2-s1", text: "فهم Control Plane و Worker Nodes وتثبيت Kind و kubectl", done: false },
            { id: "m4-2-s2", text: "كتابة Manifests: Deployment, Service, ConfigMap, Secret", done: false },
            { id: "m4-2-s3", text: "إعداد Kind مع Ingress-Nginx لتوجيه الطلبات", done: false },
            { id: "m4-2-s4", text: "ضبط Probes و Resource Limits و HPA", done: false }
          ]
        },
        {
          id: "m4-3",
          code: "4.3",
          title: "Observability Basics (/metrics, Prometheus & Grafana)",
          hours: 10,
          defaultStatus: "pending",
          tags: ["Prometheus", "Grafana", "Metrics"],
          whatYouDo: "إضافة نقطة /metrics للتطبيق لتصدير مقاييس Prometheus الافتراضية وربطها بـ Grafana.",
          deliverable: "نقطة /metrics شغالة ولوحة متابعة أولية في Grafana.",
          resources: [{ label: "HiveBox Phase 4", url: "https://devopsroadmap.io/projects/hivebox/" }],
          subtasks: [
            { id: "m4-3-s1", text: "إضافة Endpoint /metrics لتصدير مقاييس Prometheus", done: false },
            { id: "m4-3-s2", text: "ربط Prometheus و Grafana لمراقبة الأداء", done: false }
          ]
        },
        {
          id: "m4-4",
          code: "4.4",
          title: "Cloud Computing Fundamentals (AWS Core)",
          hours: 12,
          defaultStatus: "pending",
          tags: ["AWS", "VPC", "EC2", "S3", "ECR"],
          whatYouDo: "فهم خدمات AWS الأساسية على KodeKloud Playground: EC2, VPC, Subnets, Security Groups, IAM, S3, ECR.",
          deliverable: "القدرة على إعداد شبكة VPC وصلاحيات IAM ورفع صورة إلى ECR.",
          resources: [{ label: "KodeKloud AWS Playgrounds", url: "https://kodekloud.com/" }],
          subtasks: [
            { id: "m4-4-s1", text: "إتقان IAM (Users, Roles, Policies) و S3 و ECR", done: false },
            { id: "m4-4-s2", text: "بناء VPC مع Public/Private Subnets و Security Groups و EC2", done: false }
          ]
        },
        {
          id: "m4-5",
          code: "4.5",
          title: "System Design (الجزء الثاني — استكمال الكورس)",
          hours: 8,
          defaultStatus: "pending",
          tags: ["System Design", "Caching", "Queues"],
          whatYouDo: "استكمال دروس ولابات كورس System Design For Beginners على KodeKloud (تم إنهاء Module 1 منه فقط مسبقاً): Caching, Queues, Replication, K8s Self-Healing.",
          deliverable: "فهم معماري متكامل لتصميم الأنظمة الموزعة والاعتمادية.",
          resources: [{ label: "KodeKloud System Design", url: "https://kodekloud.com/" }],
          subtasks: [
            { id: "m4-5-s1", text: "إنهاء Module 1 (مكتمل مسبقاً)", done: true },
            { id: "m4-5-s2", text: "دراسة Caching, Queues, Replication و K8s Self-Healing", done: false }
          ]
        },
        {
          id: "m4-6",
          code: "4.6",
          title: "تسليم HiveBox Phase 4 (Integration Tests, SonarQube, Terrascan & CD)",
          hours: 8,
          defaultStatus: "pending",
          tags: ["SonarQube", "Terrascan", "GHCR"],
          whatYouDo: "تشغيل Integration Tests، فحص الكود بـ SonarQube/Semgrep، فحص K8s Manifests بـ Terrascan، ونشر الصورة لـ GHCR عبر CD Workflow.",
          deliverable: "إغلاق HiveBox Phase 4 بالكامل على GitHub.",
          resources: [{ label: "HiveBox Phase 4 Spec", url: "https://devopsroadmap.io/projects/hivebox/" }],
          subtasks: [
            { id: "m4-6-s1", text: "كتابة Integration Tests وتشغيل SonarQube + Terrascan في CI", done: false },
            { id: "m4-6-s2", text: "إنشاء CD Workflow لرفع الصورة الموسومة بالإصدار إلى GHCR", done: false }
          ]
        }
      ]
    },

    {
      id: "module-5",
      number: "05",
      badge: "أبريل 2027 • الشهر 5",
      title: "Transform — Finishing the Structure",
      subtitle: "Valkey & MinIO، Terraform IaC، تغليف Helm & Kustomize، اختبارات Venom، و HiveBox Phase 5.",
      monthRange: "أبريل 2027 (الشهر 5)",
      estimatedHours: 45,
      cardTheme: "from-[#4C1D95] via-[#3B0764] to-[#2E1065]",
      techIcons: ["terraform", "helm", "database", "kubernetes"],
      sections: [
        { title: "التكامل مع Valkey و MinIO و Helm", topicIds: ["m5-1", "m5-2"] },
        { title: "Terraform IaC و Phase 5", topicIds: ["m5-3", "m5-4"] }
      ],
      topics: [
        {
          id: "m5-1",
          code: "5.1",
          title: "Integration Testing, Valkey Cache & MinIO Object Storage",
          hours: 12,
          defaultStatus: "pending",
          tags: ["Valkey", "MinIO", "Integration Tests"],
          whatYouDo: "إضافة طبقة كاش بـ Valkey (دورة 5 دقائق) وطبقة تخزين S3-compatible بـ MinIO مع نقاط /cache و /store و /readyz وكتابة Integration Tests.",
          deliverable: "تطبيق متكامل يخزن البيانات في MinIO ويكيشها في Valkey مع probe /readyz.",
          resources: [{ label: "HiveBox Phase 5 Spec", url: "https://devopsroadmap.io/projects/hivebox/" }],
          subtasks: [
            { id: "m5-1-s1", text: "إضافة Valkey Cache بدورة تحديث 5 دقائق + Endpoint /cache", done: false },
            { id: "m5-1-s2", text: "إضافة MinIO (S3-compatible) Storage + Endpoint /store", done: false },
            { id: "m5-1-s3", text: "تطوير /readyz للتحقق من توفر الحساسات وحداثة الكاش والتخزين", done: false }
          ]
        },
        {
          id: "m5-2",
          code: "5.2",
          title: "Kubernetes Packaging: Helm & Kustomize",
          hours: 11,
          defaultStatus: "pending",
          tags: ["Helm", "Kustomize", "K8s Security"],
          whatYouDo: "تحويل ملفات K8s إلى Helm Chart مع Kustomize لإدارة الموارد (Valkey, MinIO, HiveBox) ومراجعة Kubernetes Security Best Practices.",
          deliverable: "Helm Chart + Kustomize Overlays مع ربط /readyz كـ Readiness Probe.",
          resources: [{ label: "KodeKloud Helm", url: "https://kodekloud.com/" }],
          subtasks: [
            { id: "m5-2-s1", text: "بناء Helm Chart لتطبيق HiveBox وتغليفه", done: false },
            { id: "m5-2-s2", text: "إنشاء Kustomize manifests للبنية التحتية (Valkey, MinIO)", done: false },
            { id: "m5-2-s3", text: "تطبيق /readyz كـ Readiness Probe ومراجعة K8s Security Best Practices", done: false }
          ]
        },
        {
          id: "m5-3",
          code: "5.3",
          title: "Infrastructure as Code: Terraform",
          hours: 14,
          defaultStatus: "pending",
          tags: ["Terraform", "HCL", "State"],
          whatYouDo: "إتقان أساسيات Terraform (Providers, Resources, State, Variables, Outputs, Modules) لبناء البنية التحتية السحابية أو محلياً بالكود.",
          deliverable: "أكواد Terraform لبناء كلاستر Kubernetes ونشر Grafana Agent.",
          resources: [{ label: "KodeKloud Terraform", url: "https://kodekloud.com/" }],
          subtasks: [
            { id: "m5-3-s1", text: "إتقان Providers, Resources, State, Variables, Outputs, Modules", done: false },
            { id: "m5-3-s2", text: "إنشاء كلاستر Kubernetes عبر Terraform IaC (Free tier cloud أو Floci)", done: false },
            { id: "m5-3-s3", text: "نشر Grafana Agent لتجميع السجلات والمقاييس", done: false }
          ]
        },
        {
          id: "m5-4",
          code: "5.4",
          title: "Venom E2E Testing & تسليم HiveBox Phase 5",
          hours: 8,
          defaultStatus: "pending",
          tags: ["Venom", "E2E", "HiveBox Phase 5"],
          whatYouDo: "كتابة اختبارات End-to-End باستخدام Venom وتشغيلها ضد الكلاستر الحي في CI.",
          deliverable: "إغلاق HiveBox Phase 5 بالكامل على GitHub.",
          resources: [{ label: "HiveBox Phase 5 Spec", url: "https://devopsroadmap.io/projects/hivebox/" }],
          subtasks: [
            { id: "m5-4-s1", text: "بناء End-to-End Test Suite بأداة Venom", done: false },
            { id: "m5-4-s2", text: "تشغيل Kind + البنية التحتية + اختبارات Venom في الـ Pipeline", done: false }
          ]
        }
      ]
    },

    {
      id: "module-6",
      number: "06",
      badge: "مايو 2027 • بداية التقديم",
      title: "Optimize — Keep Improving",
      subtitle: "أمان Trivy، تجميع السجلات Grafana Loki، النشر المستمر GitOps عبر Argo CD، و HiveBox Phase 6.",
      monthRange: "مايو 2027 (الشهر 6)",
      estimatedHours: 45,
      cardTheme: "from-[#0F766E] via-[#115E59] to-[#042F2E]",
      techIcons: ["argocd", "security", "grafana", "prometheus"],
      sections: [
        { title: "الأمان والسجلات المركزية", topicIds: ["m6-1", "m6-2"] },
        { title: "GitOps مع Argo CD و Phase 6", topicIds: ["m6-3", "m6-4"] }
      ],
      topics: [
        {
          id: "m6-1",
          code: "6.1",
          title: "DevSecOps & Supply Chain Security (Trivy & Least Privilege)",
          hours: 12,
          defaultStatus: "pending",
          tags: ["Trivy", "DevSecOps", "Kyverno"],
          whatYouDo: "فحص ثغرات الصور والحاويات بـ Trivy، إدارة الأسرار، تطبيق Least Privilege، واستكشاف Kyverno Policy-as-Code و Dependabot.",
          deliverable: "بوابة أمان تمنع الثغرات الحرجة وتحدث التبعيات تلقائياً عبر Dependabot.",
          resources: [{ label: "DevSecOps Growth", url: "https://devopsroadmap.io/growth/devsecops/" }],
          subtasks: [
            { id: "m6-1-s1", text: "دمج Trivy في الـ CI لفحص الصور والملفات", done: false },
            { id: "m6-1-s2", text: "تفعيل Dependabot للتحديثات التلقائية وتطبيق Least Privilege", done: false },
            { id: "m6-1-s3", text: "إعداد سياسات Kyverno أو Pod Security Standards", done: false }
          ]
        },
        {
          id: "m6-2",
          code: "6.2",
          title: "Log Aggregation & Advanced Observability (Grafana Loki)",
          hours: 10,
          defaultStatus: "pending",
          tags: ["Grafana Loki", "Observability", "Promtail"],
          whatYouDo: "تجميع وتحليل السجلات المركزية باستخدام Grafana Loki (أو EFK) مع مقاييس Prometheus المخصصة.",
          deliverable: "لوحات مراقبة وسجلات موحدة في Grafana بدون SSH للسيرفرات.",
          resources: [{ label: "SRE Growth", url: "https://devopsroadmap.io/growth/sre/" }],
          subtasks: [
            { id: "m6-2-s1", text: "تشغيل Grafana Loki لتجميع سجلات الكلاستر والتطبيق", done: false },
            { id: "m6-2-s2", text: "إعداد التنبيهات ومراقبة الأخطاء في Grafana", done: false }
          ]
        },
        {
          id: "m6-3",
          code: "6.3",
          title: "GitOps & Continuous Deployment (Argo CD)",
          hours: 15,
          defaultStatus: "pending",
          tags: ["Argo CD", "GitOps", "ExternalDNS", "Cert-Manager"],
          whatYouDo: "أتمتة النشر المستمر على بيئات متعددة (Dev / Staging / Prod) باستخدام Argo CD مع ExternalDNS و Cert-Manager (Let's Encrypt TLS).",
          deliverable: "Git هو مصدر الحقيقة الوحيد؛ أي دمج يُحدّث الكلاستر تلقائياً مع شهادات HTTPS.",
          resources: [{ label: "KodeKloud Argo CD", url: "https://kodekloud.com/" }],
          subtasks: [
            { id: "m6-3-s1", text: "تثبيت Argo CD وربطه بمستودع النشر وتفعيل Auto-Sync", done: false },
            { id: "m6-3-s2", text: "إعداد بيئات Dev / Staging / Prod عبر Terraform & Kustomize", done: false },
            { id: "m6-3-s3", text: "تجهيز ExternalDNS و Cert-Manager لإصدار شهادات TLS تلقائياً", done: false }
          ]
        },
        {
          id: "m6-4",
          code: "6.4",
          title: "تسليم HiveBox Phase 6 وبداية التقديم المبدئي",
          hours: 8,
          defaultStatus: "pending",
          tags: ["HiveBox Phase 6", "Upwork"],
          whatYouDo: "إغلاق المرحلة السادسة من HiveBox كاملة وبدء إرسال عروض Upwork المصغرة.",
          deliverable: "مشروع HiveBox مكتمل إنتاجياً من الكود حتى GitOps.",
          resources: [{ label: "HiveBox Phase 6", url: "https://devopsroadmap.io/projects/hivebox/" }],
          subtasks: [
            { id: "m6-4-s1", text: "نشر HiveBox Phase 6 كاملاً وتوثيق معماريته", done: false },
            { id: "m6-4-s2", text: "إطلاق خدمات Upwork المصغرة (Docker, Nginx, Backup, CI)", done: false }
          ]
        }
      ]
    },

    {
      id: "module-7",
      number: "07",
      badge: "يونيو – يوليو 2027 • الجاهزية للسوق",
      title: "Capstone Project & Career Readiness",
      subtitle: "مشروع Capstone شامل + AI Workload على K8s + توثيق AutoTele + الـ CV المتوافق مع ATS ومعسكر المقابلات.",
      monthRange: "يونيو – يوليو 2027 (الشهران 7 و 8)",
      estimatedHours: 45,
      cardTheme: "from-[#7F1D1D] via-[#6B1313] to-[#450A0A]",
      techIcons: ["ai", "ansible", "kubernetes", "career"],
      sections: [
        { title: "الـ Capstone و AutoTele و AI Workloads", topicIds: ["m7-1", "m7-2"] },
        { title: "الجاهزية الوظيفية والـ CKA", topicIds: ["m7-3", "m7-4"] }
      ],
      topics: [
        {
          id: "m7-1",
          code: "7.1",
          title: "Capstone Project الشامل + Ansible السريع",
          hours: 18,
          defaultStatus: "pending",
          tags: ["Capstone", "Ansible", "C4 Architecture"],
          whatYouDo: "بناء مشروع Capstone كامل من الصفر يجمع (IaC + CI/CD + K8s + GitOps + Security + Observability)، مع كورس Ansible السريع (3 ساعات) وتوثيق AutoTele برسومات معمارية.",
          deliverable: "مشروعان إنتاجيان موثقان بعمق (HiveBox + AutoTele/Capstone).",
          resources: [{ label: "Dynamic Roadmap Capstone", url: "https://devopsroadmap.io/learning-plan" }],
          subtasks: [
            { id: "m7-1-s1", text: "إنهاء كورس Ansible السريع (3 ساعات على KodeKloud)", done: false },
            { id: "m7-1-s2", text: "توثيق مشروع AutoTele برسومات معمارية و CI/CD", done: false },
            { id: "m7-1-s3", text: "بناء وتوثيق الـ Capstone Project بالمعايير الكاملة", done: false }
          ]
        },
        {
          id: "m7-2",
          code: "7.2",
          title: "ميزة الـ AI Workloads على Kubernetes",
          hours: 10,
          defaultStatus: "pending",
          tags: ["AI Infra", "LLM API", "Kubernetes"],
          whatYouDo: "نشر نموذج AI صغير أو LLM API على Kubernetes مع Resource Limits و HPA و Prometheus Monitoring لتتفوق على 90% من المتقدمين.",
          deliverable: "AI Microservice يعمل على الكلاستر مع داشبورد مراقبة الأداء.",
          resources: [{ label: "Platform Engineering", url: "https://devopsroadmap.io/growth/platform/" }],
          subtasks: [
            { id: "m7-2-s1", text: "تغليف خدمة AI / LLM API في Container محسن", done: false },
            { id: "m7-2-s2", text: "نشر الخدمة على Kubernetes مع Autoscaling و Monitoring", done: false }
          ]
        },
        {
          id: "m7-3",
          code: "7.3",
          title: "صياغة CV (MIS ATS) ومخطط المهارات (Skills Radar)",
          hours: 8,
          defaultStatus: "pending",
          tags: ["CV", "Cover Letter", "ATS"],
          whatYouDo: "صياغة الـ CV والـ Cover Letter بمسمى Bachelor's in Management Information Systems (MIS) ورسم مخطط المهارات.",
          deliverable: "CV احترافي متوافق مع ATS وبروفايل LinkedIn جاهز للتقديم.",
          resources: [{ label: "Interview Best Practices", url: "https://devopsroadmap.io/interview/best-practices/" }],
          subtasks: [
            { id: "m7-3-s1", text: "إعداد CV بـ MIS Degree مع أبرز نتائج HiveBox و AutoTele", done: false },
            { id: "m7-3-s2", text: "كتابة Cover Letter ورسم Skills Radar وتجهيز LinkedIn", done: false }
          ]
        },
        {
          id: "m7-4",
          code: "7.4",
          title: "معسكر المقابلات + خطة CKA + التقديم المكثف",
          hours: 9,
          defaultStatus: "pending",
          tags: ["Interview Prep", "CKA", "Job Hunt"],
          whatYouDo: "تكثيف محاكاة الإنترفيوهات (كورس DevOps Interview Prep على KodeKloud)، التقديم لشركات السوفتوير والـ Outsourcing، ثم التجهيز لامتحان CKA.",
          deliverable: "اقتناص أول وظيفة Junior DevOps / Cloud / SRE.",
          resources: [{ label: "Common Questions", url: "https://devopsroadmap.io/interview/common-questions/" }],
          subtasks: [
            { id: "m7-4-s1", text: "إنهاء كورس DevOps Interview Prep على KodeKloud", done: false },
            { id: "m7-4-s2", text: "بدء التقديم المكثف لشركات الـ Outsourcing والشركات الخاصة", done: false },
            { id: "m7-4-s3", text: "حجز والبدء في التحضير العملي لشهادة CKA (Killer.sh)", done: false }
          ]
        }
      ]
    }
  ],

  // REAL 7-PHASE HIVEBOX PROJECT (Verbatim from devopsroadmap.io/projects/hivebox/)
  hivebox: {
    title: "HiveBox — End-to-End Hands-On DevOps Project (devopsroadmap.io)",
    repoUrl: "https://github.com/yossefbelal1/Hivebox",
    overview:
      "بناء خدمة RESTful API قابلة للتوسع بلغة Python حول منصة openSenseMap لمربي النحل، تتطور عبر 7 مراحل متدرجة (Iterative MVP) على مستودع واحد من سطر أوامر بسيط إلى نظام إنتاجي كامل بـ Kubernetes و Valkey و MinIO و Terraform و Argo CD و Grafana.",
    architectureStack: [
      "GitHub & Actions",
      "Python (FastAPI/Flask)",
      "Docker & Hadolint",
      "Kubernetes (Kind)",
      "Ingress-Nginx",
      "Valkey (Redis Cache)",
      "MinIO (S3 Storage)",
      "Helm & Kustomize",
      "Terraform",
      "Argo CD (GitOps)",
      "Prometheus, Grafana & Loki",
      "Trivy, SonarQube & Terrascan",
      "Cert-Manager & ExternalDNS"
    ],
    phases: [
      {
        id: "hb-1",
        phase: 1,
        moduleRef: "Module 1: Welcome to the DevOps World",
        title: "Phase 1: Project Setup & Agile Planning",
        status: "done",
        stack: ["GitHub", "Kanban Board", "openSenseMap", "Git Flow"],
        whatYouDo:
          "تجهيز بيئة العمل التنظيمية للمشروع بدون Scope Creep، واختيار 3 senseBox IDs من openSenseMap لاستخدامها لاحقاً.",
        exampleCode: `# 3 senseBox IDs متجاورة من openSenseMap:
5eba5fbad46fb8001b799786
5c21ff8f919f80001adf2488
5ade1acf223bd80019a1011c

# قاعدة Git: كل Phase تُقدم عبر Pull Request إلى main وليس Push مباشر!`,
        verification: "المستودع yossefbelal1/Hivebox جاهز بـ README ولوحة Kanban وكارت Phase 1 في عمود Done.",
        deliverables: [
          { id: "hb1-1", text: "إنشاء/Fork مستودع عام باسم Hivebox على GitHub (yossefbelal1/Hivebox)", done: true },
          { id: "hb1-2", text: "كتابة README.md يوضح الفكرة والمراحل وتجهيز GitHub Project Kanban", done: true },
          { id: "hb1-3", text: "تحديد 3 senseBox IDs من منصة openSenseMap والالتزام بنظام Pull Requests", done: true }
        ]
      },
      {
        id: "hb-2",
        phase: 2,
        moduleRef: "Module 2: Basics - DevOps Core (محطتك القادمة مباشرة)",
        title: "Phase 2: Minimal Python CLI, Docker Container & Bash Check",
        status: "in_progress",
        stack: ["Git", "VS Code", "Python 3.9", "Docker 29.9.3", "Bash"],
        whatYouDo:
          "كتابة الكود المبدئي باستخدام Semantic Versioning (v0.0.1) عبر دالة تطبع الإصدار الحالي وتخرج، ثم تغليفه في Dockerfile وتشغيله محلياً على RHEL VM مع سكريبت Bash Health Check.",
        exampleCode: `# app.py (v0.0.1)
APP_VERSION = "v0.0.1"

def print_version():
    print(f"HiveBox version: {APP_VERSION}")

if __name__ == "__main__":
    print_version()`,
        verification: "تشغيل الـ Docker Container محلياً يطبع v0.0.1 بنجاح مع توثيق الاختبار في المستودع.",
        deliverables: [
          { id: "hb2-1", text: "تنفيذ دالة تطبع الإصدار الحالي (Semantic Versioning v0.0.1) وتخرج", done: false },
          { id: "hb2-2", text: "إنشاء Dockerfile وبناء الصورة وتشغيل الحاوية محلياً على RHEL VM", done: false },
          { id: "hb2-3", text: "كتابة سكريبت Bash بسيط للـ Health Check وتوثيق خطوات الاختبار", done: false },
          { id: "hb2-4", text: "رفع التعديلات عبر Pull Request وتحديث لوحة Kanban", done: false }
        ]
      },
      {
        id: "hb-3",
        phase: 3,
        moduleRef: "Module 3: Start - Laying the Foundation",
        title: "Phase 3: FastAPI/Flask API, Pytest, Hadolint & GitHub Actions CI",
        status: "pending",
        stack: ["FastAPI/Flask", "pytest", "Pylint", "Hadolint", "GitHub Actions", "OpenSSF Scorecard"],
        whatYouDo:
          "تحويل التطبيق إلى REST API بنقطتي /version و /temperature (سحب درجات الحرارة من openSenseMap وحساب متوسطها مع ضمان ألا يزيد عمر البيانات عن ساعة)، وكتابة Unit Tests بـ pytest، وتحسين Dockerfile وبناء CI Pipeline.",
        exampleCode: `# Endpoints المطلوبة في Phase 3:
GET /version      -> {"version": "v0.1.0"}
GET /temperature  -> {"average_temperature": 24.6, "unit": "°C"}
# شرط: استبعاد قراءات openSenseMap الأقدم من 1 ساعة!`,
        verification: "CI Pipeline أخضر يشغل Pylint و Hadolint و pytest و OpenSSF Scorecard ويتحقق من /version.",
        deliverables: [
          { id: "hb3-1", text: "تطبيق Conventional Commits وتنفيذ /version و /temperature عبر openSenseMap API", done: false },
          { id: "hb3-2", text: "كتابة Unit Tests باستخدام pytest وتطبيق Pylint", done: false },
          { id: "hb3-3", text: "تحسين Dockerfile (Multi-stage + Non-root) واجتياز فحص Hadolint", done: false },
          { id: "hb3-4", text: "بناء GitHub Actions CI + تفعيل OpenSSF Scorecard + اختبار /version في CI", done: false }
        ]
      },
      {
        id: "hb-4",
        phase: 4,
        moduleRef: "Module 4: Expand - Constructing a Shell",
        title: "Phase 4: Kind Kubernetes, /metrics, SonarQube, Terrascan & CD",
        status: "pending",
        stack: ["Kind", "kubectl", "Ingress-Nginx", "Prometheus", "SonarQube", "Terrascan", "GHCR"],
        whatYouDo:
          "نقل senseBox IDs إلى Env Vars (12-Factor)، إضافة /metrics لـ Prometheus وتصنيف حالة الحرارة في /temperature، تشغيل الكلاستر محلياً بـ Kind + Ingress-Nginx، وفحص الكود والمانيفستس ورفع الصورة لـ GHCR.",
        exampleCode: `# تصنيف الحالة في /temperature:
< 10°C      -> "status": "Too Cold"
11°C - 36°C -> "status": "Good"
> 37°C      -> "status": "Too Hot"`,
        verification: "التطبيق يعمل داخل Kind عبر Ingress-Nginx، و /metrics تصدر مقاييس Prometheus، والـ CD يرفع الصورة لـ GHCR.",
        deliverables: [
          { id: "hb4-1", text: "جعل senseBox IDs عبر Env Vars + إضافة /metrics + حقل status في /temperature", done: false },
          { id: "hb4-2", text: "كتابة Integration Tests وإعداد Kind مع Ingress-Nginx و K8s Manifests", done: false },
          { id: "hb4-3", text: "تشغيل SonarQube (أو Semgrep) و Terrascan في CI لفحص الكود والـ YAML", done: false },
          { id: "hb4-4", text: "إنشاء GitHub Actions CD لرفع Docker Image موسومة بالإصدار إلى GHCR", done: false }
        ]
      },
      {
        id: "hb-5",
        phase: 5,
        moduleRef: "Module 5: Transform - Finishing the Structure",
        title: "Phase 5: Valkey Cache, MinIO Storage, Helm, Terraform & Venom E2E",
        status: "pending",
        stack: ["Valkey", "MinIO", "Helm", "Kustomize", "Terraform", "Grafana Agent", "Venom"],
        whatYouDo:
          "إضافة طبقة كاش بـ Valkey وتخزين بـ MinIO بدورة 5 دقائق، وإضافة نقاط /cache و /store و /readyz، وتغليف التطبيق بـ Helm + Kustomize، وبناء البنية بـ Terraform IaC، واختبار E2E بأداة Venom.",
        exampleCode: `# شروط فشل /readyz (يرجع غير HTTP 200 إذا):
1) 50% + 1 من senseBoxes غير متاحة، أو
2) المحتوى في Valkey Cache أقدم من دورتين (10 دقائق)، أو
3) المحتوى المخزن في MinIO أقدم من دورتين.`,
        verification: "Terraform ينشئ الكلاستر، Helm ينشر المنظومة بـ /readyz، و Venom E2E Tests تمر بنجاح.",
        deliverables: [
          { id: "hb5-1", text: "إضافة Valkey Cache و MinIO (S3) بدورة 5 دقائق + نقاط /cache و /store و /readyz", done: false },
          { id: "hb5-2", text: "إنشاء Helm Chart للتطبيق و Kustomize للـ Valkey و MinIO + ربط /readyz كـ Probe", done: false },
          { id: "hb5-3", text: "نشر Grafana Agent وبناء كلاستر Kubernetes عبر Terraform IaC", done: false },
          { id: "hb5-4", text: "كتابة وتشغيل اختبارات End-to-End باستخدام أداة Venom", done: false }
        ]
      },
      {
        id: "hb-6",
        phase: 6,
        moduleRef: "Module 6: Optimize - Keep Improving",
        title: "Phase 6: Argo CD GitOps, Trivy, Loki, Cert-Manager & ExternalDNS",
        status: "pending",
        stack: ["Argo CD", "Trivy", "Grafana Loki", "Cert-Manager", "ExternalDNS", "Dependabot", "Kyverno"],
        whatYouDo:
          "تحسين المشروع لمستوى الإنتاج المؤسسي: النشر التصريحي عبر Argo CD، إعداد DNS و TLS تلقائياً بـ ExternalDNS و Cert-Manager، فحص Trivy، سجلات Loki، و Dependabot.",
        exampleCode: `# تحسينات اختيارية متقدمة في Phase 6:
- Kyverno (Policy as Code)
- Multi-env clusters (Dev / Stage / Prod) via Terraform + Kustomize
- TestKube + Custom Kubernetes Operator`,
        verification: "نشر GitOps كامل عبر Argo CD مع مراقبة Grafana/Loki وشهادات TLS وفحص Trivy.",
        deliverables: [
          { id: "hb6-1", text: "أتمتة النشر عبر Argo CD (Declarative GitOps) وتفعيل Dependabot", done: false },
          { id: "hb6-2", text: "إعداد ExternalDNS و Cert-Manager (Let's Encrypt) للشهادات والدومينات", done: false },
          { id: "hb6-3", text: "فحص الصور والمستودع بـ Trivy وتجميع السجلات عبر Grafana Loki", done: false },
          { id: "hb6-4", text: "تطبيق Kyverno أو عزل بيئات Dev/Stage/Prod", done: false }
        ]
      },
      {
        id: "hb-7",
        phase: 7,
        moduleRef: "Module 7: Capstone Project",
        title: "Phase 7: Capstone Project (AutoTele Upgrade + AI Workload)",
        status: "pending",
        stack: ["AutoTele", "AI/LLM Inference", "Kubernetes", "Full Stack DevOps"],
        whatYouDo:
          "تصميم وتنفيذ مشروعك الخاص الشامل بنفس معمارية HiveBox الاحترافية (ترقية AutoTele مع CI/CD + K8s + نشر نموذج AI/LLM API مع المراقبة).",
        exampleCode: `# في البورتفوليو النهائي لديك 3 أسلحة ثقيلة:
1. yossefbelal1/Hivebox (منهج devopsroadmap.io كامل 7 Phases)
2. yossefbelal1/AutoTele (منصة SaaS حقيقية بـ Telethon + Workers + Postgres)
3. AI/LLM Inference Service on K8s + HPA + Prometheus`,
        verification: "مشروعان متكاملان على GitHub برسومات معمارية C4 جاهزان لإقناع أي شركة أو عميل.",
        deliverables: [
          { id: "hb7-1", text: "توثيق AutoTele برسومات معمارية وخط CI/CD و Docker Best Practices", done: false },
          { id: "hb7-2", text: "نشر AI/LLM Inference API على Kubernetes مع مراقبة Prometheus/Grafana", done: false }
        ]
      }
    ]
  },

  // EXPANDABLE CONTAINER BEST PRACTICES WITH EXAMPLES & TOOLS
  containerAudit: [
    {
      id: "cbp-1",
      category: "Size & Security",
      tool: "Distroless / Slim Images",
      title: "استخدام صور أساسية مصغرة (Minimal Base Images)",
      whatYouDo: "اختر صور مثل python:3.12-slim أو distroless بدلاً من python:latest لتقليص الحجم بنسبة 80% وتقليل الثغرات.",
      example: `# السيئ (ضخم ~1GB):
FROM python:3.12

# الصحيح (مصغر ~130MB):
FROM python:3.12-slim`
    },
    {
      id: "cbp-2",
      category: "Performance",
      tool: "Docker Multi-stage",
      title: "البناء متعدد المراحل (Multi-stage Builds)",
      whatYouDo: "افصل مرحلة تجميع الحزم والمترجمات (builder) عن صورة التشغيل النهائية (runtime).",
      example: `FROM python:3.12-slim AS builder
RUN python -m venv /opt/venv
COPY requirements.txt .
RUN /opt/venv/bin/pip install --no-cache-dir -r requirements.txt

FROM python:3.12-slim
COPY --from=builder /opt/venv /opt/venv`
    },
    {
      id: "cbp-3",
      category: "Security",
      tool: "Linux UID / USER",
      title: "التشغيل بمستخدم غير Root (Non-Root User)",
      whatYouDo: "أنشئ مستخدماً بصلاحيات محدودة وشغّل العملية به لمنع السيطرة على الـ Host لو اُخترق التطبيق.",
      example: `RUN useradd --create-home --uid 10001 appuser
USER 10001
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0"]`
    },
    {
      id: "cbp-4",
      category: "Performance",
      tool: ".dockerignore",
      title: "إعداد ملف .dockerignore شامل",
      whatYouDo: "امنع إرسال ملفات Git وملفات الأسرار .env والـ cache إلى Docker Build Context.",
      example: `# .dockerignore
.git
.env
__pycache__
*.pyc
.venv
tests/`
    },
    {
      id: "cbp-5",
      category: "Reliability",
      tool: "Semantic Versioning / SHA",
      title: "منع استخدام وسم :latest في الإنتاج",
      whatYouDo: "ثبّت إصدار الصورة الأساسية وإصدارات صورك بـ Tag صريح أو Commit SHA لضمان تكرارية البناء.",
      example: `# السيئ: FROM python:latest
# الصحيح: FROM python:3.12.7-slim-bookworm`
    },
    {
      id: "cbp-6",
      category: "Performance",
      tool: "BuildKit Cache",
      title: "ترتيب الطبقات لاستغلال الكاش (Layer Caching)",
      whatYouDo: "انسخ ملف المتطلبات وثبت الحزم قبل نسخ كود التطبيق لعدم إعادة تثبيت الحزم عند كل تعديل في الكود.",
      example: `COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY ./src ./src`
    },
    {
      id: "cbp-7",
      category: "Size",
      tool: "Hadolint",
      title: "دمج أوامر RUN ومسح كاش الحزم (Hadolint Clean)",
      whatYouDo: "ادمج أوامر التثبيت والتنظيف في RUN واحدة، وافحص الملف بـ Hadolint.",
      example: `RUN apt-get update && apt-get install -y --no-install-recommends curl \\
    && rm -rf /var/lib/apt/lists/*`
    },
    {
      id: "cbp-8",
      category: "Reliability",
      tool: "Exec Form / Tini",
      title: "معالجة PID 1 وإشارات الإيقاف (Graceful Shutdown)",
      whatYouDo: "استخدم صيغة JSON Exec في CMD لتستقبل بايثون إشارة SIGTERM وتغلق الاتصالات بهدوء.",
      example: `# الصحيح (Exec form):
CMD ["python", "-m", "uvicorn", "main:app"]`
    },
    {
      id: "cbp-9",
      category: "Reliability",
      tool: "HEALTHCHECK / K8s /readyz",
      title: "تعريف فحوصات الجاهزية والصحة",
      whatYouDo: "عرّف نقطة /readyz أو HEALTHCHECK للتحقق من اتصال التطبيق والاعتماديات.",
      example: `HEALTHCHECK --interval=30s --timeout=3s \\
  CMD curl -f http://localhost:8000/version || exit 1`
    },
    {
      id: "cbp-10",
      category: "Security",
      tool: "Trivy",
      title: "الفحص التلقائي للثغرات بـ Trivy في CI",
      whatYouDo: "افحص الصورة قبل رفعها للـ Registry وأوقف البناء إذا وجدت ثغرات CRITICAL أو HIGH.",
      example: `trivy image --exit-code 1 --severity HIGH,CRITICAL ghcr.io/yossefbelal1/hivebox:v0.1.0`
    },
    {
      id: "cbp-11",
      category: "Security",
      tool: "Runtime Secrets / Env",
      title: "منع وضع الأسرار داخل طبقات الصورة",
      whatYouDo: "لا تضع كلمات مرور أو مفاتيح API داخل Dockerfile ENV؛ مررها وقت التشغيل عبر Kubernetes Secrets.",
      example: `# ممنوع: ENV API_KEY="secret123"
# الصحيح: تمريرها عبر docker run --env-file أو K8s Secret`
    },
    {
      id: "cbp-12",
      category: "Security",
      tool: "K8s SecurityContext",
      title: "نظام ملفات للقراءة فقط (Read-Only Root FS)",
      whatYouDo: "فعّل readOnlyRootFilesystem: true في Kubernetes لمنع تعديل ملفات النظام وقت التشغيل.",
      example: `securityContext:
  readOnlyRootFilesystem: true
  runAsNonRoot: true
  allowPrivilegeEscalation: false`
    },
    {
      id: "cbp-13",
      category: "Observability",
      tool: "Grafana Loki",
      title: "توجيه السجلات إلى stdout/stderr",
      whatYouDo: "اطبع Logs التطبيق على Console مباشرة ليلتقطها Docker و Grafana Agent/Loki.",
      example: `import logging, sys
logging.basicConfig(stream=sys.stdout, level=logging.INFO)`
    },
    {
      id: "cbp-14",
      category: "Reliability",
      tool: "K8s Requests & Limits",
      title: "فرض حدود الموارد (CPU & Memory Limits)",
      whatYouDo: "حدد سقف الذاكرة والمعالج لكل حاوية لمنع OOMKilled المفاجئ.",
      example: `resources:
  requests: { cpu: "100m", memory: "128Mi" }
  limits:   { cpu: "250m", memory: "256Mi" }`
    },
    {
      id: "cbp-15",
      category: "Architecture",
      tool: "Valkey + MinIO (12-Factor)",
      title: "معمارية Stateless وفصل التخزين",
      whatYouDo: "لا تخزن حالة أو ملفات داخل الحاوية نفسها؛ انقل الكاش لـ Valkey والتخزين لـ MinIO/S3.",
      example: `# HiveBox Phase 5 Architecture:
HiveBox Pod (Stateless) -> Valkey (Cache) + MinIO (Object Storage)`
    }
  ],

  // CAREER EVOLUTION TIMELINE (Exact Match to "Life of a DevOps Engineer" + Dynamic Skill Sync)
  careerEvolution: [
    {
      id: "stage-1",
      years: "0–2 years",
      role: "Junior DevOps Engineer",
      scopeBadge: "Tasks",
      themeColor: "emerald",
      headline: "أنت تبني الأساسيات وتتعلم أدوات التنفيذ اليومية (محطتك المستهدفة في نص 2027)",
      summary: "You're building the fundamentals: Linux, Git, Docker, CI/CD and cloud.",
      bullets: [
        "إتقان Linux، الشبكات، وكتابة سكربتات Python & Bash",
        "كتابة أول CI/CD Pipeline عبر GitHub Actions",
        "التطبيق العملي على الحاويات و أساسيات Cloud & Kubernetes (HiveBox Phases 1–4)",
        "استكشاف تشغيل أحمال AI/ML workloads بشكل مبسط"
      ],
      salarySnapshot: {
        egyptLocal: "18,000 – 30,000 ج.م",
        egyptOutsourcing: "35,000 – 55,000 ج.م",
        gulf: "$2,200 – $3,500 / شهر",
        remote: "$25 – $40 / ساعة"
      },
      skillChecks: [
        { label: "Linux RH124/134 & Networking (CCNA)", moduleRef: "m2-1" },
        { label: "Git & GitHub + Conventional Commits", moduleRef: "m2-2" },
        { label: "Python & Bash Automation Scripts", moduleRef: "m2-4" },
        { label: "Docker & Multi-stage Best Practices", moduleRef: "m3-3" },
        { label: "GitHub Actions CI/CD Pipeline", moduleRef: "m3-4" },
        { label: "Kubernetes Basics (Kind) & AWS Core", moduleRef: "m4-2" }
      ]
    },
    {
      id: "stage-2",
      years: "2–4 years",
      role: "DevOps Engineer",
      scopeBadge: "Systems",
      themeColor: "blue",
      headline: "تمتلك عمليات النشر وأتمتة البنية التحتية وتشغيل الإنتاج اليومي",
      summary: "You start owning deployments, infra automation & day-to-day production operations.",
      bullets: [
        "بناء وصيانة خطوط CI/CD متعددة البيئات (Dev / Stage / Prod)",
        "نشر وإدارة البنية التحتية بالكود باستخدام Terraform و Helm",
        "أتمتة سير العمل بالكامل وتقليل التدخل اليدوي (GitOps with Argo CD)",
        "دعم نشر خدمات الـ AI/ML في بيئات الإنتاج"
      ],
      salarySnapshot: {
        egyptLocal: "35,000 – 60,000 ج.م",
        egyptOutsourcing: "60,000 – 95,000 ج.م",
        gulf: "$4,000 – $6,500 / شهر",
        remote: "$50 – $80 / ساعة"
      },
      skillChecks: [
        { label: "Terraform IaC & Modules + Remote State", moduleRef: "m5-3" },
        { label: "Helm Charts & Kustomize Overlays", moduleRef: "m5-2" },
        { label: "Argo CD Declarative GitOps", moduleRef: "m6-3" },
        { label: "Valkey / Redis & S3/MinIO Operations", moduleRef: "m5-1" }
      ]
    },
    {
      id: "stage-3",
      years: "4–6 years",
      role: "Senior DevOps Engineer",
      scopeBadge: "Systems+",
      themeColor: "indigo",
      headline: "ينتقل التركيز من المهام الفردية إلى هندسة الأنظمة الكاملة والاعتمادية",
      summary: "The focus shifts from individual tasks to systems: reliability, Kubernetes, observability, security, scalability and incident management.",
      bullets: [
        "امتلاك أنظمة الإنتاج كاملة وضمان High Availability & Scalability",
        "قيادة المراقبة المتقدمة (Prometheus, Grafana, Loki) وإدارة الـ Incidents",
        "تطبيق معايير DevSecOps و Supply Chain Security (Trivy, Kyverno, Vault)",
        "تمكين فرق العمل من تشغيل AI/ML Workflows على نطاق واسع"
      ],
      salarySnapshot: {
        egyptLocal: "70,000 – 120,000+ ج.م",
        egyptOutsourcing: "110,000 – 180,000+ ج.م",
        gulf: "$7,000 – $11,000+ / شهر",
        remote: "$90 – $150+ / ساعة"
      },
      skillChecks: [
        { label: "DevSecOps (Trivy, Kyverno, Least Privilege)", moduleRef: "m6-1" },
        { label: "Observability Stack (Prometheus + Grafana + Loki)", moduleRef: "m6-2" },
        { label: "System Design (Caching, Queues, Self-Healing)", moduleRef: "m4-5" }
      ]
    },
    {
      id: "stage-4",
      years: "6–8 years",
      role: "Platform / AI Infrastructure Engineer",
      scopeBadge: "Platforms",
      themeColor: "purple",
      headline: "تصميم منصات المطورين الداخلية وتشغيل بنية الذكاء الاصطناعي والـ GPUs",
      summary: "You start building internal platforms and working with a new class of workloads: GPU infrastructure, AI/ML platforms, model serving, distributed systems and inference.",
      bullets: [
        "تصميم وبناء Internal Developer Platforms (IDPs) ذاتية الخدمة",
        "توحيد معايير البنية التحتية لأحمال AI/ML و Model Serving",
        "إدارة GPU Clusters وتحسين التكلفة (FinOps) والأداء والأمان",
        "تمكين فرق الـ ML من تدريب ونشر النماذج بسرعة وأمان"
      ],
      salarySnapshot: {
        egyptLocal: "120,000 – 200,000+ ج.م",
        egyptOutsourcing: "180,000+ ج.م",
        gulf: "$10,000 – $15,000 / شهر",
        remote: "$120 – $180+ / ساعة"
      },
      skillChecks: [
        { label: "AI/LLM Inference Deployment on Kubernetes", moduleRef: "m7-2" },
        { label: "Capstone End-to-End Platform Architecture", moduleRef: "m7-1" }
      ]
    },
    {
      id: "stage-5",
      years: "8–10 years",
      role: "Principal Engineer / Architect",
      scopeBadge: "Architecture",
      themeColor: "rose",
      headline: "قراراتك تؤثر على أنظمة متعددة — تضع المعايير وتقود التوسع طويل المدى",
      summary: "Your decisions now affect multiple systems. You're thinking about architecture, standards, reliability, cost, security and long-term scalability.",
      bullets: [
        "وضع استراتيجية المنصة ومعايير الحوكمة عبر فرق الهندسة",
        "تصميم معماريات موزعة عالية التوسع (Multi-region / Multi-cluster)",
        "قيادة مبادرات الأتمتة وبنية الذكاء الاصطناعي على مستوى المؤسسة",
        "الموازنة الصارمة بين الأمان والتكلفة والاعتمادية"
      ],
      salarySnapshot: {
        egyptLocal: "قيادي / استشاري",
        egyptOutsourcing: "220,000+ ج.م",
        gulf: "$13,000 – $18,000+ / شهر",
        remote: "$150,000+ / سنوياً"
      },
      skillChecks: []
    },
    {
      id: "stage-6",
      years: "10+ years",
      role: "Platform / AI Infrastructure Architect (CTO Track)",
      scopeBadge: "Strategy",
      themeColor: "slate",
      headline: "رسم الاستراتيجية التقنية الشاملة ومواءمة البنية التحتية مع عوائد الشركة",
      summary: "The scope expands further: technical strategy, platform architecture, AI infrastructure and the trade-offs behind large-scale systems.",
      bullets: [
        "تحديد استراتيجية السحاب والذكاء الاصطناعي بعيدة المدى للشركة",
        "بناء وقيادة فرق هندسية عالية الأداء",
        "ربط القرارات المعمارية بالتأثير التجاري (Business Impact & ROI)",
        "إدارة المقايضات الهندسية (Trade-offs) للأنظمة العملاقة"
      ],
      salarySnapshot: {
        egyptLocal: "تنفيذي / C-Level",
        egyptOutsourcing: "استشاري دولي",
        gulf: "$18,000+ / شهر",
        remote: "$200,000+ / سنوياً"
      },
      skillChecks: []
    }
  ],

  whenToApply: [
    {
      period: "الشهور 1 – 4 (ديسمبر 2026 – مارس 2027)",
      title: "مرحلة البناء والتركيز الصامت (ممنوع التقديم الآن)",
      status: "لا تقدم على وظائف الآن",
      details: "أكمل Python و Bash و GitHub Actions و Kubernetes (Kind) مع تسليم HiveBox Phases 2 و 3 و 4 قبل التفكير في التقديم."
    },
    {
      period: "الشهر 5 (مايو 2027)",
      title: "دخول Upwork بمهام محددة وصغيرة (Micro-Gigs)",
      status: "فريلانس مصغر",
      details: "تقديم على مهام محددة: كتابة Dockerfiles، إعداد Nginx SSL، سكريبتات Bash للنسخ الاحتياطي، وبناء GitHub Actions CI."
    },
    {
      period: "الشهر 6 (يونيو 2027)",
      title: "بداية التقديم الفعلي لشركات السوفتوير والـ Outsourcing",
      status: "انطلاق التقديم",
      details: "بعد تسليم HiveBox Phases 5–6 (Terraform + Argo CD + Loki)، أرسل الـ CV بمسمى MIS Degree بمعدل 10–15 شركة أسبوعياً."
    },
    {
      period: "الشهور 7 – 8 (يوليو – أغسطس 2027)",
      title: "معسكر المقابلات + اقتناص الوظيفة + شهادة CKA",
      status: "حسم العرض + الترقية",
      details: "ترقية AutoTele + AI Workload، اجتياز مقابلات Junior DevOps/SRE، والبدء في امتحان CKA لفتح أبواب البنوك والشركات الخليجية."
    }
  ],

  // REAL PROJECT BUILD TIMELINE FOR "WHEN TO USE WHAT"
  whenToUseWhat: [
    {
      step: "01",
      stage: "بداية أي مشروع — الأتمتة والسكربتات",
      title: "Bash Scripting مقابل Python",
      leftName: "Bash",
      leftWhen: "أوامر لينكس المباشرة، سكريبتات Health Check (مثل فحص /version بـ curl)، و Entrypoint للحاويات.",
      rightName: "Python",
      rightWhen: "بناء الـ API نفسه (FastAPI/Flask)، سحب بيانات JSON من openSenseMap عبر requests، أو أتمتة تتخطى 50 سطراً.",
      example: "في HiveBox Phase 2: كتبنا التطبيق بـ Python، بينما سكريبت الـ Health Check السريع على RHEL VM بـ Bash.",
      rule: "استخدم Bash للمهام النظامية السريعة (< 50 سطراً)، و Python لأي منطق برمجي، معالجة JSON، أو اتصال بـ APIs."
    },
    {
      step: "02",
      stage: "بناء التطبيق وتخزين البيانات",
      title: "Valkey (Redis) Cache مقابل MinIO (S3) Object Storage",
      leftName: "Valkey (In-Memory Cache)",
      leftWhen: "تخزين قراءات الحرارة المؤقتة السريعة (TTL 5 دقائق) لتقليل الضغط عن openSenseMap API.",
      rightName: "MinIO / AWS S3 (Object Storage)",
      rightWhen: "الأرشفة الدائمة للبيانات التاريخية، ملفات الـ Backups، والملفات الثابتة.",
      example: "في HiveBox Phase 5: يقرأ /temperature من Valkey أولاً (سريع)، بينما يحفظ /store نسخة دائمة في MinIO.",
      rule: "Cache للسرعة اللحظية والبيانات المؤقتة، و Object Storage للأرشفة الدائمة والملفات."
    },
    {
      step: "03",
      stage: "تشغيل الحاويات (التطوير vs الإنتاج)",
      title: "Docker / Compose مقابل Kubernetes (Kind / EKS)",
      leftName: "Docker & Compose",
      leftWhen: "التشغيل المحلي السريع على جهازك أو RHEL VM، أو تطبيق بسيط على خادم منفرد (مثل AutoTele مبدئياً).",
      rightName: "Kubernetes",
      rightWhen: "توزيع الحاويات، Self-healing عبر /readyz، التوسع التلقائي (HPA)، وإدارة Ingress و Secrets.",
      example: "في HiveBox Phase 2–3 شغلنا Docker منفرداً، وفي Phase 4 نقلناه إلى Kind Kubernetes + Ingress-Nginx.",
      rule: "ابدأ بـ Docker محلياً للسرعة، وانتقل إلى Kubernetes عندما تحتاج اعتمادية وتوسعاً وتنسيقاً متعدد الخدمات."
    },
    {
      step: "04",
      stage: "أتمتة الاختبار والبناء (CI)",
      title: "GitHub Actions مقابل Jenkins",
      leftName: "GitHub Actions (المعتمد لدينا)",
      leftWhen: "مشاريع GitHub الحديثة: مجاني للمستودعات العامة، بدون صيانة سيرفرات، ومليء بإضافات جاهزة (Hadolint, Trivy, OpenSSF).",
      rightName: "Jenkins",
      rightWhen: "الأنظمة القديمة (Legacy On-Premise) التي تتطلب سيرفرات داخلية معقدة وصيانة Groovy Plugins.",
      example: "نعتمد GitHub Actions حصرياً في HiveBox لتشغيل Pylint و pytest و Hadolint و OpenSSF ورفع الصورة إلى GHCR.",
      rule: "تخطّ Jenkins الآن؛ ركز 100% على GitHub Actions لأنه الأسرع والأكثر طلباً في الشركات الحديثة."
    },
    {
      step: "05",
      stage: "إنشاء البنية التحتية مقابل تهيئة السيرفرات",
      title: "Terraform مقابل Ansible",
      leftName: "Terraform (Provisioning)",
      leftWhen: "إنشاء الموارد السحابية والكلاسترات بالكود (VPC, EKS, S3, Kind via Terraform).",
      rightName: "Ansible (Configuration)",
      rightWhen: "تثبيت الحزم وضبط الإعدادات وتأمين الـ SSH داخل خوادم لينكس قائمة.",
      example: "في HiveBox Phase 5 نبني الكلاستر بـ Terraform، وفي Module 7 نستخدم Ansible لتجهيز السيرفرات وتأمينها.",
      rule: "تيرافورم يبني العمارة والأرضية (Infrastructure)، وأنسبل يجهز الغرف من الداخل (Configuration)."
    },
    {
      step: "06",
      stage: "تغليف تطبيقات Kubernetes",
      title: "Helm مقابل Kustomize",
      leftName: "Helm",
      leftWhen: "تغليف تطبيقك كحزمة برمجية موحدة مع قوالب (Templates) وقيم متغيرة (values.yaml) أو تنزيل أدوات جاهزة (Prometheus, Argo CD).",
      rightName: "Kustomize",
      leftExample: "",
      rightWhen: "تخصيص ملفات YAML خام لكل بيئة (Dev / Stage / Prod) عبر Patches بدون تعقيد لغات الـ Templating.",
      example: "في HiveBox Phase 5 نستخدم Helm لتطبيق HiveBox، و Kustomize لتخصيص بيئات Valkey و MinIO.",
      rule: "Helm ممتاز لتوزيع التطبيقات وحزم الطرف الثالث، و Kustomize ممتاز لفصل إعدادات البيئات بنظافة."
    },
    {
      step: "07",
      stage: "النشر المستمر على الكلاستر (CD)",
      title: "Argo CD (GitOps) مقابل CI-Push",
      leftName: "CI-Push (kubectl apply من CI)",
      leftWhen: "بسيط للتجارب الأولية لكنه يتطلب حفظ صلاحيات الكلاستر خارجياً في GitHub Secrets.",
      rightName: "GitOps (Argo CD Pull)",
      rightWhen: "الإنتاج الاحترافي: يعمل Argo CD داخل الكلاستر ويسحب التغييرات من Git تلقائياً ويصلح أي Drift.",
      example: "في HiveBox Phase 6 يسحب Argo CD أي تعديل على الـ Helm Chart من Git ويحدث الكلاستر ذاتياً.",
      rule: "استخدم GitHub Actions للـ CI (بناء وفحص الصورة)، و Argo CD للـ CD (النشر الآمن على Kubernetes)."
    },
    {
      step: "08",
      stage: "المراقبة والأمان بعد الإطلاق",
      title: "Prometheus (Metrics) مقابل Grafana Loki (Logs) مقابل Trivy/SonarQube",
      leftName: "Prometheus + Grafana",
      leftWhen: "قياس الأرقام والاتجاهات (RPS، استهلاك الذاكرة، عدد قراءات الحرارة) عبر /metrics.",
      rightName: "Grafana Loki + Trivy",
      rightWhen: "Loki لتتبع السجلات النصية ومعرفة سبب الخطأ، و Trivy/SonarQube لاكتشاف الثغرات والأخطاء الأمنية قبل النشر.",
      example: "في HiveBox: يخبرك Prometheus بارتفاع أخطاء 500، ويكشف Loki السطر البرمجي المسبب للخطأ.",
      rule: "Metrics تكتشف وجود خلل (What)، والـ Logs تشرح سببه (Why)، و Trivy يمنع الخطر قبل وصوله للإنتاج."
    }
  ],

  // INTERACTIVE QUIZ MODE CARDS (6 Domain Cards x 5 Real Questions = 30 Questions)
  interviewQuizzes: [
    {
      id: "quiz-1",
      domain: "Linux, Networking & Troubleshooting",
      badge: "Card 01 • 5 أسئلة",
      desc: "تشخيص أعطال الخوادم، الـ Systemd، الشبكات، الـ Inodes والذاكرة.",
      questions: [
        {
          id: "q1-1",
          question: "سيرفر لينكس به مساحة فارغة 40% حسب df -h، لكن التطبيق يفشل في إنشاء أي ملف جديد برسالة 'No space left on device'. ما السبب الأرجح وما أمر فحصه؟",
          options: [
            "امتلاء الـ Inodes بسبب ملايين الملفات الصغيرة — نتحقق عبر df -i",
            "امتلاء الـ RAM — نتحقق عبر free -m",
            "توقف خدمة Systemd — نتحقق عبر systemctl status",
            "مشكلة في الـ DNS — نتحقق عبر dig"
          ],
          correctIndex: 0,
          hint: "تذكر أن لينكس يخصص رقماً تعريفياً لكل ملف حتى لو كان حجمه 0 بايت.",
          explanation: "استنفاد الـ Inodes (ملفات صغيرة كثيرة مثل logs أو sessions) يمنع إنشاء ملفات جديدة رغم وجود مساحة جيجابايت متاحة. الأمر df -i يكشف نسبة استهلاك الـ Inodes فوراً."
        },
        {
          id: "q1-2",
          question: "تطبيق ويب خلف Nginx يرجع خطأ 502 Bad Gateway. ماذا يعني هذا الخطأ تقنياً؟",
          options: [
            "العميل أرسل Request بصيغة خاطئة",
            "Nginx يعمل لكن التطبيق الخلفي (Upstream) متوقف أو لا يستمع على المنفذ المتوقع",
            "شهادة الـ SSL منتهية الصلاحية",
            "ملف index.html غير موجود في المسار"
          ],
          correctIndex: 1,
          hint: "فرق بين 502 و 504: أحدهما يعني أن الخادم الخلفي رفض الاتصال تماماً، والآخر يعني أنه تأخر في الرد.",
          explanation: "502 Bad Gateway تعني أن Nginx تواصل مع الـ Upstream (مثل تطبيق FastAPI) فحصل على Connection Refused لأن الخدمة متوقفة أو البورت خطأ. نفحص ss -tulnp و journalctl."
        },
        {
          id: "q1-3",
          question: "ما الأمر الدقيق لقراءة آخر 100 سطر من سجلات خدمة nginx في systemd بدون توقف الـ pager؟",
          options: [
            "systemctl logs nginx --tail 100",
            "journalctl -u nginx -n 100 --no-pager",
            "cat /etc/systemd/nginx.log",
            "ss -tulnp | grep nginx"
          ],
          correctIndex: 1,
          hint: "نستخدم أداة journalctl مع علم -u للوحدة و -n لعدد السطور.",
          explanation: "journalctl -u <service> -n 100 --no-pager يعرض آخر 100 سطر من سجل الخدمة في systemd مباشرة."
        },
        {
          id: "q1-4",
          question: "على سيرفر RHEL VM، تريد التحقق فوراً هل خدمة بايثون تستمع على البورت 8000 على localhost فقط أم 0.0.0.0. ما الأمر الأسرع؟",
          options: [
            "ping localhost:8000",
            "ss -tulnp | grep 8000",
            "ip addr show",
            "chmod +x 8000"
          ],
          correctIndex: 1,
          hint: "أداة فحص الـ Sockets الحديثة البديلة لـ netstat.",
          explanation: "الأمر ss -tulnp يعرض جميع المنافذ المفتوحة TCP/UDP مع رقم العملية (PID) وعنوان الاستماع (127.0.0.1 vs 0.0.0.0)."
        },
        {
          id: "q1-5",
          question: "عملية (Process) توقفت فجأة على السيرفر مع رسالة Killed في الطرفية، وفي dmesg ظهر Out of memory. ما رقم إشارة الإغلاق (Exit Code) المعتاد لهذه الحالة؟",
          options: [
            "Exit Code 0",
            "Exit Code 137 (SIGKILL / OOMKiller)",
            "Exit Code 404",
            "Exit Code 2"
          ],
          correctIndex: 1,
          hint: "128 + رقم إشارة SIGKILL (9).",
          explanation: "عندما يقتل نظام التشغيل (Kernel OOMKiller) عملية لاستهلاكها الذاكرة، يرسل إشارة SIGKILL (9)، فيكون كود الخروج 128 + 9 = 137."
        }
      ]
    },
    {
      id: "quiz-2",
      domain: "Python, Bash & Git",
      badge: "Card 02 • 5 أسئلة",
      desc: "أساسيات بايثون للأتمتة، باش الصارم، واستراتيجيات Git.",
      questions: [
        {
          id: "q2-1",
          question: "لماذا نضع `set -euo pipefail` في بداية سكربتات Bash الإنتاجية؟",
          options: [
            "لتسريع تنفيذ الحلقات التكرارية",
            "لإيقاف السكربت فوراً عند أي خطأ (-e)، منع المتغيرات غير المعرفة (-u)، واكتشاف فشل أي أمر داخل الـ Pipe (-o pipefail)",
            "لتشغيل السكربت بصلاحيات Root تلقائياً",
            "لضغط ملفات السجلات تلقائياً"
          ],
          correctIndex: 1,
          hint: "كل حرف يمثل خيار أمان: e = exit on error, u = unset vars, o pipefail = pipe failure.",
          explanation: "بدون set -euo pipefail يستمر Bash في التنفيذ بعد الأخطاء الصامتة وقد يحذف مجلدات خاطئة لو كان متغير فارغاً! هذا السطر هو معيار الأمان الأول في Bash."
        },
        {
          id: "q2-2",
          question: "في بايثون، متى تستخدم مكتبة `subprocess.run()` بدلاً من `os.system()` لتنفيذ أوامر نظام التشغيل؟",
          options: [
            "لأن subprocess أسهل في الطباعة فقط",
            "لأن subprocess آمنة ضد Command Injection عند تمرير قائمة Arguments وتسمح بالتقاط stdout و stderr و returncode بدقة",
            "لأن os.system لا تعمل على لينكس",
            "لأن subprocess لا تحتاج إلى Python 3"
          ],
          correctIndex: 1,
          hint: "فكر في الأمان (shell=False) وفي التقاط مخرجات الأمر وكود الخروج.",
          explanation: "تُعد subprocess.run(['cmd', 'arg'], capture_output=True, text=True, check=True) المعيار الاحترافي في بايثون لأنها تفصل المعاملات عن الـ Shell وتلتقط المخرجات والأخطاء."
        },
        {
          id: "q2-3",
          question: "لماذا نستخدم Virtual Environment (venv) في مشاريع بايثون مثل HiveBox قبل توليد requirements.txt؟",
          options: [
            "لتقليص حجم كود بايثون على الهارد",
            "لعزل مكتبات المشروع وإصداراتها عن بايثون النظام ومنع تضارب الحزم بين المشاريع",
            "لجعل بايثون يعمل بدون Docker",
            "لتسريع الاتصال بالإنترنت"
          ],
          correctIndex: 1,
          hint: "تخيل أن مشروعاً يحتاج requests 2.28 ومشروعاً آخر يحتاج 2.32 على نفس الجهاز.",
          explanation: "venv تعزل تبعيات كل مشروع في مجلد مستقل، بحيث يعكس pip freeze > requirements.txt مكتبات هذا المشروع فقط دون تلوث باقي النظام."
        },
        {
          id: "q2-4",
          question: "ما الفائدة الرئيسية لاتباع Conventional Commits (مثل `feat:`, `fix:`, `chore:`) في مستودع HiveBox؟",
          options: [
            "تلوين النصوص في VS Code",
            "تسهيل قراءة سجل Git وأتمتة تحديد أرقام الإصدارات (Semantic Versioning) وتوليد Changelogs تلقائياً",
            "تجاوز فحص Pylint في GitHub Actions",
            "السماح بالـ Push المباشر إلى فرع main"
          ],
          correctIndex: 1,
          hint: "تذكر Semantic Versioning (MAJOR.MINOR.PATCH) — كيف تعرف أداة الـ CI هل ترفع رقم الـ MINOR أم الـ PATCH؟",
          explanation: "Conventional Commits تجعل رسائل الـ Commit مقروءة آلياً؛ فـ fix يرفع رقم الـ Patch و feat يرفع رقم الـ Minor تلقائياً في أنظمة النشر."
        },
        {
          id: "q2-5",
          question: "الفرق الجوهري بين `git merge` و `git rebase` عند دمج فرع feature في main هو:",
          options: [
            "merge يحذف الكود القديم بينما rebase يحتفظ به",
            "merge ينشئ Merge Commit جديداً ويحافظ على التاريخ المتفرع، بينما rebase يعيد كتابة الـ commits خطياً فوق أحدث commit",
            "rebase يعمل فقط بدون إنترنت",
            "لا يوجد أي فرق بينهما"
          ],
          correctIndex: 1,
          hint: "أحدهما يحافظ على شكل الشجرة المتفرعة والآخر يصنع تاريخاً خطياً نظيفاً.",
          explanation: "merge يحفظ التاريخ الفعلي بإنشاء commit دمج جديد، بينما rebase ينقل تغييرات فرعك لتُبنى فوق آخر نقطة في main (يُفضل عدم عمل rebase على فروع عامة يشاركها فريق كامل)."
        }
      ]
    },
    {
      id: "quiz-3",
      domain: "Docker & Container Security",
      badge: "Card 03 • 5 أسئلة",
      desc: "تقليص حجم الصور، Layer Caching، Non-root، و Hadolint.",
      questions: [
        {
          id: "q3-1",
          question: "لماذا ننسخ `requirements.txt` وننفذ `pip install` قبل `COPY . .` في Dockerfile؟",
          options: [
            "لأن Docker يرفض البناء بغير هذا الترتيب",
            "لاستغلال Layer Caching؛ فلا يعاد تثبيت الحزم عند تعديل ملفات الكود إلا إذا تغير requirements.txt",
            "لتشغيل التطبيق بصلاحيات Non-root",
            "لتقليل استهلاك الرام وقت التشغيل"
          ],
          correctIndex: 1,
          hint: "أي طبقة تتغير في Dockerfile تكسر الكاش لجميع الطبقات التي تليها.",
          explanation: "عند تعديل كود التطبيق مع بقاء requirements.txt ثابتاً، يعيد Docker استخدام طبقة pip install المخزنة في الكاش مما يوفر دقائق في كل عملية بناء."
        },
        {
          id: "q3-2",
          question: "ما الهدف الأساسي من Multi-stage Builds في Docker؟",
          options: [
            "تشغيل أكثر من حاوية في نفس الوقت",
            "استخدام مرحلة لبناء الكود وتثبيت المترجمات ثم نسخ المخرجات فقط لصورة نهائية صغيرة وآمنة بدون أدوات البناء",
            "تشغيل Docker Compose أسرع",
            "الاستغناء عن .dockerignore"
          ],
          correctIndex: 1,
          hint: "هل يحتاج تطبيقك في الإنتاج إلى gcc و pip و git داخل الصورة النهائية؟",
          explanation: "Multi-stage Builds تفصل بيئة البناء الضخمة عن بيئة التشغيل المصغرة (مثل slim أو distroless)، مما يقلل حجم الصورة بنسبة قد تصل لـ 80% ويقلص سطح الهجوم."
        },
        {
          id: "q3-3",
          question: "لماذا تحذر أداة Hadolint من استخدام `CMD uvicorn main:app` (Shell Form) وتنصح بـ `CMD [\"uvicorn\", \"main:app\"]` (Exec Form)؟",
          options: [
            "لأن Exec Form يشغل الـ Container كـ Root",
            "لأن Shell Form يضع `/bin/sh -c` كـ PID 1 مما يمنع وصول إشارات الإغلاق SIGTERM للتطبيق نفسه",
            "لأن Shell Form لا يدعم Python 3",
            "لأن Exec Form يضغط الصورة تلقائياً"
          ],
          correctIndex: 1,
          hint: "تذكر من يستقبل إشارة الإغلاق (PID 1) عند عمل docker stop أو إغلاق Pod.",
          explanation: "في صيغة Exec Form تصبح عمليتك هي PID 1 مباشرة، فتستلم إشارة SIGTERM وتغلق اتصالات قاعدة البيانات بسلام (Graceful Shutdown) دون انتظار انتهاء مهلة الـ 10 ثواني وقتلها بـ SIGKILL."
        },
        {
          id: "q3-4",
          question: "إذا قمت بحذف ملف ضخم في سطر RUN لاحق (مثلاً RUN rm -rf large_file) بعد إضافته في RUN سابقة، هل يقل حجم الصورة؟",
          options: [
            "نعم، ينقص الحجم فوراً",
            "لا! لأن كل طبقة في Docker Image غير قابلة للتعديل (Immutable)، والملف يظل موجوداً في الطبقة السابقة",
            "يقل فقط عند استخدام Docker Compose",
            "يقل فقط لو كان الملف نصياً"
          ],
          correctIndex: 1,
          hint: "فكر في نظام الطبقات (UnionFS) في Docker.",
          explanation: "الطبقات في Docker تراكمية وغير قابلة للحذف من طبقات سابقة؛ الحذف في طبقة لاحقة يخفي الملف فقط. لذلك ندمج التنزيل والتنظيف في نفس سطر الـ RUN بـ &&."
        },
        {
          id: "q3-5",
          question: "ما الخطر الأمني الرئيسي من تشغيل الحاوية بالمستخدم الافتراضي `root`؟",
          options: [
            "زيادة استهلاك الذاكرة",
            "إذا نجح مهاجم في اختراق التطبيق والهروب من الحاوية (Container Escape)، سيملك صلاحيات Root على الخادم المضيف",
            "فشل اتصال الحاوية بالإنترنت",
            "عدم عمل ملف .dockerignore"
          ],
          correctIndex: 1,
          hint: "تذكر مبدأ Least Privilege — هل تطبيق FastAPI يحتاج صلاحيات مدير النظام؟",
          explanation: "النواة (Kernel) مشتركة بين الحاوية والـ Host؛ تشغيل الحاوية بـ USER 10001 غير متميز يحدّ من الأضرار بشكل جذري ويجبره على العمل في نطاق صلاحيات مقيدة."
        }
      ]
    },
    {
      id: "quiz-4",
      domain: "CI/CD, Testing & DevSecOps",
      badge: "Card 04 • 5 أسئلة",
      desc: "GitHub Actions، الفرق بين Unit/Integration/E2E، و SAST/Trivy.",
      questions: [
        {
          id: "q4-1",
          question: "ما الفرق العملي بين Unit Test (بـ pytest) و End-to-End Test (بـ Venom في HiveBox Phase 5)؟",
          options: [
            "لا فرق؛ كلاهما يفحص سرعة المعالج",
            "Unit Test يفحص دالة معزولة بسرعة باستخدام Mock، بينما E2E يفحص تدفق المنظومة الحقيقية كاملة (API + Valkey + MinIO داخل K8s)",
            "Venom يُستخدم لتشغيل Docker فقط",
            "Unit Test يعمل في الإنتاج فقط"
          ],
          correctIndex: 1,
          hint: "تذكر هرم الاختبارات (Testing Pyramid): القاعدة سريعة ومعزولة، والقمة شاملة وحقيقية.",
          explanation: "Unit Tests سريعة وتعزل التبعيات الخارجية (مثل محاكاة openSenseMap)، أما E2E Tests بأداة Venom فتختبر النظام الحقيقي متصلاً بكل مكوناته داخل الكلاستر."
        },
        {
          id: "q4-2",
          question: "ما الفرق بين أداة SonarQube (SAST) وأداة Trivy في خط الـ CI؟",
          options: [
            "SonarQube تفحص جودة الكود المصدري والثغرات البرمجية، بينما Trivy تفحص حزم نظام التشغيل والمكتبات داخل Docker Image بحثاً عن CVEs",
            "كلاهما يفحص ملفات Terraform فقط",
            "Trivy أداة لبناء الـ Docker Images",
            "SonarQube بديل لـ GitHub Actions"
          ],
          correctIndex: 0,
          hint: "أحدهما يقرأ كود بايثون الذي كتبته، والآخر يفحص طبقات الـ Image الجاهزة.",
          explanation: "SAST (SonarQube/Semgrep) تحلل الكود المصدري لاكتشاف الأخطاء المنطقية والأسرار المكشوفة، بينما Trivy تفحص صور الحاويات والمكتبات ضد قواعد ثغرات CVEs العالمية."
        },
        {
          id: "q4-3",
          question: "ماذا يعني مبدأ Shift-Left Security في DevSecOps؟",
          options: [
            "نقل السيرفرات إلى منطقة زمنية أخرى",
            "نقل الفحوصات الأمنية مبكراً إلى مراحل التطوير والـ CI (مثل Hadolint و Trivy و Pre-commit) بدلاً من الانتظار لما بعد النشر",
            "تشفير قاعدة البيانات فقط",
            "منع المطورين من استخدام Git"
          ],
          correctIndex: 1,
          hint: "تخيل خط الـ SDLC من اليسار (Code) إلى اليمين (Production).",
          explanation: "اكتشاف الثغرة في IDE أو Pull Request أقل تكلفة بـ 100 مرة من اكتشافها بعد النشر في الإنتاج؛ لذلك نزرع الفحوصات الأمنية في بداية الخط (على اليسار)."
        },
        {
          id: "q4-4",
          question: "ما فائدة أداة Terrascan التي نضيفها في HiveBox Phase 4؟",
          options: [
            "بناء كلاستر Kind محلياً",
            "فحص ملفات IaC و Kubernetes Manifests لاكتشاف أخطاء الإعدادات والثغرات الأمنية قبل نشرها",
            "تشغيل اختبارات بايثون",
            "إدارة الـ DNS تلقائياً"
          ],
          correctIndex: 1,
          hint: "تخيل أنك نسيت تحديد readOnlyRootFilesystem أو فتحت منفذاً خطيراً في YAML.",
          explanation: "Terrascan تحلل ملفات Terraform و Kubernetes YAML و Helm قبل تطبيقها لمنع نشر إعدادات غير آمنة إلى الكلاستر."
        },
        {
          id: "q4-5",
          question: "لماذا نفعّل Dependabot في مستودعات GitHub مثل HiveBox؟",
          options: [
            "لإغلاق الـ Pull Requests تلقائياً",
            "لمراقبة تبعيات Python و GitHub Actions و Docker وإرسال PRs تلقائية عند صدور تحديثات أمنية",
            "لتشغيل الكود على Windows",
            "لتوليد ملفات YAML لكوبرنيتس"
          ],
          correctIndex: 1,
          hint: "كيف تتأكد أن مكتبات requirements.txt أو إضافات Actions لا تصبح قديمة ومعرضة للثغرات؟",
          explanation: "Dependabot يفحص ملفات التبعيات دورياً ويفتح Pull Requests تلقائية لتحديث الحزم المصابة بثغرات، مما يشغل خط الـ CI لاختبار التوافق أوتوماتيكياً."
        }
      ]
    },
    {
      id: "quiz-5",
      domain: "Kubernetes, Helm & Observability",
      badge: "Card 05 • 5 أسئلة",
      desc: "تشخيص CrashLoopBackOff، الفارق بين Probes، و PromQL/Loki.",
      questions: [
        {
          id: "q5-1",
          question: "Pod ظهر بحالة `CrashLoopBackOff`. ما أول أمرين تنفذهما فوراً لتشخيص السبب؟",
          options: [
            "kubectl delete pod ثم إعادة تشغيل الجهاز",
            "kubectl describe pod <name> (لفحص Events و Exit Code) ثم kubectl logs <name> --previous",
            "kubectl get nodes فقط",
            "تغيير نوع الـ Service إلى NodePort"
          ],
          correctIndex: 1,
          hint: "أنت بحاجة لقراءة سجل الحاوية التي انهارت قبل أن تعيد التشغيل، وقراءة أحداث الجدولة.",
          explanation: "describe يكشف الـ Events و Exit Code (مثل 137 لـ OOM)، و logs --previous يعرض رسائل الخطأ من آخر محاولة تشغيل منهارة قبل إعادة التشغيل."
        },
        {
          id: "q5-2",
          question: "ما الفرق بين `Liveness Probe` و `Readiness Probe` في Kubernetes (مثل نقطة `/readyz` في HiveBox)؟",
          options: [
            "لا فرق بينهما",
            "Liveness إذا فشل يعيد تشغيل الحاوية، بينما Readiness إذا فشل يزيل الـ Pod مؤقتاً من الـ Service Load Balancer دون قتله",
            "Readiness يعمل مرة واحدة فقط عند الإقلاع",
            "Liveness مخصص لقواعد البيانات فقط"
          ],
          correctIndex: 1,
          hint: "ماذا يحدث لو فقدت الحاوية الاتصال مؤقتاً بـ Valkey أو openSenseMap؟ هل نقتلها أم نمنع إرسال الترافيك إليها مؤقتاً؟",
          explanation: "إذا فشل /readyz (Readiness) يتوقف إرسال الترافيك للـ Pod حتى يتعافى، أما فشل Liveness فيعني أن التطبيق تجمد تماماً ويحتاج Restart."
        },
        {
          id: "q5-3",
          question: "في Kubernetes، ما الفرق بين `ClusterIP` و `NodePort` و `Ingress`؟",
          options: [
            "ClusterIP للوصول الداخلي داخل الكلاستر، NodePort يفتح بورتاً على كل Node، و Ingress يوجه HTTP/HTTPS حسب الدومين والمسار إلى Services",
            "Ingress بديل للـ Deployment",
            "ClusterIP يعرض الخدمة للإنترنت مباشرة",
            "NodePort يدعم شهادات TLS تلقائياً"
          ],
          correctIndex: 0,
          hint: "كيف نصل لنقطة /temperature عبر مسار HTTP من خارج كلاستر Kind؟",
          explanation: "الخدمات تتواصل داخلياً عبر ClusterIP، بينما يدير Ingress-Nginx التوجيه الذكي للترافيك الخارجي (Routing + TLS) نحو الـ ClusterIP Services."
        },
        {
          id: "q5-4",
          question: "لماذا نحتاج `Horizontal Pod Autoscaler (HPA)` ومعه `Resource Requests`؟",
          options: [
            "لأن HPA لا يستطيع حساب نسبة استهلاك الـ CPU/Memory للـ Pods بدون معرفة الـ Requests المحددة",
            "لتقليص حجم Docker Image",
            "لتخزين البيانات الدائمة في MinIO",
            "لإصدار شهادات Let's Encrypt"
          ],
          correctIndex: 0,
          hint: "كيف يحسب HPA أن استهلاك المعالج وصل لـ 80% إذا لم تحدد له الـ 100% المطلوبة في requests؟",
          explanation: "يعتمد HPA على Metrics Server لمقارنة الاستهلاك الفعلي بنسبة من resources.requests؛ بدون تحديد Requests لا يعمل الـ Autoscaling بالـ CPU/Memory."
        },
        {
          id: "q5-5",
          question: "ما دور `Cert-Manager` و `ExternalDNS` في مرحلة الإنتاج (HiveBox Phase 6)؟",
          options: [
            "تشغيل اختبارات بايثون",
            "Cert-Manager يصدر ويجدد شهادات TLS من Let's Encrypt آلياً، و ExternalDNS يربط سجلات الدومين DNS تلقائياً مع الـ Ingress",
            "تنظيف الـ Logs القديمة",
            "تثبيت نظام التشغيل لينكس"
          ],
          correctIndex: 1,
          hint: "تذكر أيقونتي Let's Encrypt و FreeDNS في الرسم المعماري لـ HiveBox.",
          explanation: "يؤتمتان البنية التحتية للشبكة: بمجرد إنشاء Ingress بدومين جديد، ينشئ ExternalDNS سجل الـ DNS ويستخرج Cert-Manager شهادة HTTPS سارية ويجددها تلقائياً."
        }
      ]
    },
    {
      id: "quiz-6",
      domain: "Terraform, GitOps & SRE Architecture",
      badge: "Card 06 • 5 أسئلة",
      desc: "إدارة Terraform State، نمط GitOps بـ Argo CD، والاعتمادية SRE.",
      questions: [
        {
          id: "q6-1",
          question: "لماذا يُمنع تماماً رفع ملف `terraform.tfstate` إلى مستودع Git العام أو الخاص؟",
          options: [
            "لأنه يبطئ git clone فقط",
            "لأنه قد يحتوي على أسرار وكلمات مرور بنص واضح (Plaintext) ولا يوفر State Locking لمنع التضارب بين الفريق",
            "لأن Git لا يدعم صيغة JSON",
            "لأن Terraform يحذفه تلقائياً"
          ],
          correctIndex: 1,
          hint: "فكر في الأمان وفي حالة قيام مهندسين اثنين بتشغيل terraform apply في نفس اللحظة.",
          explanation: "ملف الـ State يحوي تفاصيل دقيقة وأحياناً Secrets، لذا يُحفظ في Remote Backend مشفر (مثل S3 + Versioning) مع آلية قفل (DynamoDB أو Terraform Cloud)."
        },
        {
          id: "q6-2",
          question: "كيف يحل `Argo CD` مشكلة الـ Configuration Drift في Kubernetes؟",
          options: [
            "بإيقاف الكلاستر كل ليلة",
            "بمراقبة حالة الكلاستر المستمرة ومقارنتها بمستودع Git، وعند تفعيل Self-Heal يعيد الكلاستر فوراً للحالة المسجلة في Git",
            "بمنع المهندسين من استخدام الإنترنت",
            "بتشغيل Terraform كل دقيقة"
          ],
          correctIndex: 1,
          hint: "ماذا لو عدّل شخص عداد Replicas يدوياً بـ kubectl scale؟",
          explanation: "في نموذج Pull-based GitOps، يكتشف Argo CD أن الحالة الحية (Live State) اختلفت عن الحالة المطلوبة في Git (Desired State) ويصلح الانحراف تلقائياً."
        },
        {
          id: "q6-3",
          question: "ما الفرق بين SLI و SLO و SLA في هندسة الاعتمادية (SRE)؟",
          options: [
            "SLI هو المقياس الفعلي (مثل نسبة نجاح الطلبات)، SLO هو الهدف الداخلي للفريق (مثل 99.9%)، و SLA هو العقد القانوني مع العميل وعقوباته",
            "ثلاثتها تعني وقت استجابة السيرفر فقط",
            "SLA يحدده المبرمجون و SLI يحدده المحامون",
            "SLO أقل صرامة دائماً من SLA"
          ],
          correctIndex: 0,
          hint: "Indicator (مؤشر) → Objective (هدف) → Agreement (اتفاقية/عقد).",
          explanation: "نراقب الـ SLI (مثلاً p95 latency) لنحقق الـ SLO الداخلي (الذي يكون أكثر صرامة من الـ SLA حتى نصلح الخلل قبل كسر العقد التجاري)."
        },
        {
          id: "q6-4",
          question: "ما المقصود بالـ `Twelve-Factor App` في سياق الـ Config و الـ Logs؟",
          options: [
            "كتابة 12 ملف YAML لكل تطبيق",
            "فصل الإعدادات عن الكود بتخزينها في Environment Variables، ومعاملة السجلات كـ Event Streams تخرج لـ stdout",
            "استخدام 12 لغة برمجة",
            "تشغيل 12 Pod كحد أدنى"
          ],
          correctIndex: 1,
          hint: "تذكر متطلبات HiveBox Phase 4 في قراءة senseBox IDs ومخرجات السجلات.",
          explanation: "فصل التكوين في Env Vars يجعل نفس صورة Docker تعمل في Dev و Stage و Prod بدون إعادة بناء، وتوجيه الـ Logs لـ stdout يسهل جمعها مركزياً بـ Loki."
        },
        {
          id: "q6-5",
          question: "على الـ Virtual Machine أو في كوبرنيتس، ما وظيفة `Kyverno` المذكورة في HiveBox Phase 6؟",
          options: [
            "مراقبة استهلاك الشبكة",
            "محرك Policy-as-Code خاص بـ Kubernetes يرفض أو يعدّل الموارد التي تخالف سياسات الأمان (مثل منع تشغيل Pods كـ root)",
            "أداة لضغط صور بايثون",
            "بديل لـ Valkey Cache"
          ],
          correctIndex: 1,
          hint: "كيف تجبر الكلاستر برمجياً على رفض أي Deployment لا يحدد Memory Limits أو Non-root؟",
          explanation: "Kyverno يفرض سياسات الحوكمة والأمان (Policy-as-Code) مكتوبة بـ YAML مباشرة على مستوى Kubernetes Admission Controller."
        }
      ]
    }
  ]
};
