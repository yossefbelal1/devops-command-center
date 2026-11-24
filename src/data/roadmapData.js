export const ROADMAP_META = {
  studentName: 'يوسف بلال (yossefbelal1)',
  location: 'دمياط، مصر',
  degree: "Bachelor's in Management Information Systems (MIS)",
  targetRole: 'Junior DevOps / Cloud / SRE Engineer',
  environment:
    'Windows + VS Code + GitHub | RHEL VM (yossef@RedHatLap) with Docker 29.9.3 & Python 3.9.25',
  portfolioRepos: [
    {
      name: 'Hivebox',
      url: 'https://github.com/yossefbelal1/Hivebox',
      desc: 'مشروع Dynamic DevOps Roadmap الرئيسي (Iterative MVP على مستودع واحد)'
    },
    {
      name: 'AutoTele',
      url: 'https://github.com/yossefbelal1/AutoTele',
      desc: 'منصة SaaS لتبادل الإعلانات على تليجرام (Python asyncio, Telethon, Multiple Workers, PostgreSQL, Docker)'
    }
  ],
  currentModuleId: 'module-2',
  currentTopicId: 'm2-5',
  pace: '10 – 15 ساعة أسبوعياً (~40 ساعة شهرياً)',
  timelineRange: 'ديسمبر 2026 – منتصف 2027 (6–8 شهور)',
  totalEstimatedHours: 320,
  constraints: [
    'Dynamic DevOps Roadmap (https://devopsroadmap.io/) هو المسار الأساسي.',
    'استخدام GitHub Actions للـ CI/CD (تخطي Jenkins).',
    'عدم القفز إلى Kubernetes أو Terraform أو AWS قبل إغلاق Module 2 و HiveBox Phase 2.',
    'الالتزام ببناء HiveBox تدريجياً على نفس المستودع yossefbelal1/Hivebox عبر Pull Requests.'
  ]
};

export const ROADMAP_MODULES = [
  {
    id: 'module-1',
    number: '01',
    badge: 'مكتمل 100%',
    title: 'Welcome to the DevOps World',
    subtitle: 'SDLC، Agile vs DevOps vs DevSecOps، مبدأ Shift-Left، و 12-Factor App Intro + HiveBox Phase 1.',
    monthRange: 'مكتمل مسبقاً',
    estimatedHours: 20,
    cardTheme: 'from-[#0F3460] via-[#0B2545] to-[#081A33]',
    techIcons: ['linux', 'git', 'github', 'docker'],
    sections: [
      { title: 'المفاهيم التأسيسية', topicIds: ['m1-1', 'm1-2'] },
      { title: 'التقييم والمشروع', topicIds: ['m1-3'] }
    ],
    topics: [
      {
        id: 'm1-1',
        code: '1.1',
        title: 'دورة حياة البرمجيات (SDLC) و DevOps Culture & 12-Factor Intro',
        hours: 8,
        estimatedMinutes: 480,
        category: 'Video / Reading',
        difficulty: 'Easy',
        defaultStatus: 'done',
        tags: ['SDLC', 'Agile', 'DevSecOps', '12-Factor'],
        objectives: [
          'استيعاب مراحل SDLC السبع: Plan, Code, Build, Test, Deploy, Operate, Monitor.',
          'التمييز العملي بين Agile و DevOps و DevSecOps ومبدأ Shift-Left Security.',
          'فهم الأعمدة الثلاثة للـ DevOps: Culture, Automation, Measurement/Monitoring ومقدمة 12-Factor App.'
        ],
        bestPractices: [
          'تطبيق مبدأ Shift-Left بدمج الاختبارات وفحوصات الأمان منذ مرحلة الكود والـ PR وليس بعد النشر.',
          'ربط كل مرحلة من SDLC بمقياس أداء واضح (DORA Metrics: Lead Time, Deployment Frequency, MTTR).',
          'بناء التطبيقات كخدمات Stateless تفصل الإعدادات عن الكود (12-Factor App).'
        ],
        requiredTools: ['Dynamic DevOps Roadmap', 'Git', 'GitHub', '12-Factor Checklist'],
        exampleCode: `# تدفق SDLC التلقائي في DevOps:
Plan (Kanban) -> Code (Feature Branch + PR) -> Build (Docker)
  -> Test (Lint + pytest + Security Scan) -> Deploy (CD / GitOps)
  -> Operate & Monitor (Prometheus + Grafana + Loki)`,
        masteryCriteria: 'القدرة على رسم وشرح تدفق SDLC الكامل وتوضيح موقع الأتمتة والأمان في كل خطوة.',
        whatYouDo: 'دراسة المفاهيم الأساسية من Dynamic DevOps Roadmap و KodeKloud DevOps Pre-Requisite.',
        deliverable: 'خريطة ذهنية لمراحل SDLC ومسؤولية مهندس الـ DevOps في كل مرحلة.',
        resources: [
          { label: 'Dynamic DevOps Roadmap', url: 'https://devopsroadmap.io/', type: 'Roadmap / Docs' },
          { label: 'KodeKloud: DevOps Pre-Requisite Course (Mumshad Mannambeth)', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'KodeKloud: Fundamentals of DevOps (Michael Forrester)', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'KodeKloud: 12 Factor App (Mumshad Mannambeth)', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'YouTube: KodeKloud DevOps Pre-Requisite Intro', url: 'https://www.youtube.com/watch?v=PfjVXb-YXbQ', type: 'YouTube' },
          { label: 'Vishakha Sadhwani: All DevOps Concepts EXPLAINED In 25 Minutes!', url: 'https://www.youtube.com/watch?v=C4IAGERO3o8', type: 'YouTube' },
          { label: 'Vishakha Sadhwani: DevOps + AI Roadmap [2027]', url: 'https://www.youtube.com/watch?v=eew2ePnl5JI', type: 'YouTube' }
        ],
        subtasks: [
          {
            id: 'm1-1-s1',
            text: 'فهم دورة حياة البرمجيات SDLC (Plan → Code → Build → Test → Deploy → Operate → Monitor)',
            details: 'تحديد مدخلات ومخرجات كل مرحلة ومكان تدخل الأتمتة لتقليل الأخطاء اليدوية',
            estimatedHours: 2,
            done: true
          },
          {
            id: 'm1-1-s2',
            text: 'استيعاب الفروق بين Agile و DevOps و DevSecOps ومبدأ Shift-Left Security',
            details: 'مقارنة دورة التطوير في Agile مع التسليم المستمر والأمان المبكر في DevSecOps',
            estimatedHours: 2,
            done: true
          },
          {
            id: 'm1-1-s3',
            text: 'فهم المحاور الأساسية (Culture, Automation, Measurement) ومقدمة 12-Factor App',
            details: 'مراجعة مبادئ فصل الإعدادات عن الكود (Config) وبناء خدمات Stateless',
            estimatedHours: 2,
            done: true
          },
          {
            id: 'm1-1-s4',
            text: 'ربط مقاييس DORA Metrics الأربعة بجودة التسليم الإنتاجي',
            details: 'توثيق Deployment Frequency و Lead Time for Changes و Change Failure Rate و MTTR',
            estimatedHours: 2,
            done: true
          }
        ]
      },
      {
        id: 'm1-2',
        code: '1.2',
        title: 'اجتياز كويز الإنترفيو الخاص بالموديول الأول',
        hours: 4,
        estimatedMinutes: 240,
        category: 'Quiz',
        difficulty: 'Easy',
        defaultStatus: 'done',
        tags: ['Interview Quiz', 'Foundations'],
        objectives: ['اختبار استيعاب المفاهيم النظرية للموديول الأول عبر أسئلة المقابلات.'],
        bestPractices: [
          'تفسير كل مفهوم بمثال عملي من بيئة الإنتاج وليس بتعريف نظري مجرد.',
          'مراجعة الأسئلة الخاطئة وفهم سبب استبعاد البدائل الأخرى.'
        ],
        requiredTools: ['Quiz Module 01', 'Dynamic DevOps Roadmap'],
        exampleCode: `# أسئلة مقابلات شائعة في Module 1:
- الفرق بين CI و Continuous Delivery و Continuous Deployment؟
- لماذا نفصل الإعدادات عن الكود في 12-Factor App؟
- كيف يقلل Shift-Left تكلفة إصلاح الثغرات؟`,
        masteryCriteria: 'اجتياز كافة أسئلة الموديول الأول بثقة.',
        whatYouDo: 'مراجعة أسئلة المقابلات النظرية الخاصة بثقافة DevOps والـ SDLC والـ Shift-Left.',
        deliverable: 'اجتياز كويز الموديول الأول بنجاح.',
        resources: [{ label: 'Dynamic DevOps Roadmap', url: 'https://devopsroadmap.io/getting-started/', type: 'Roadmap / Docs' }],
        subtasks: [
          {
            id: 'm1-2-s1',
            text: 'اجتياز كويز الإنترفيو الخاص بالموديول الأول بنجاح',
            details: 'حل جميع أسئلة الفهم والتطبيق الخاصة بمفاهيم SDLC و DevOps',
            estimatedHours: 1,
            done: true
          },
          {
            id: 'm1-2-s2',
            text: 'تلخيص إجابات الفروق بين CI / Continuous Delivery / Continuous Deployment',
            details: 'كتابة إجابات مركزة بصيغة مقابلات العمل التقنية',
            estimatedHours: 1,
            done: true
          },
          {
            id: 'm1-2-s3',
            text: 'مراجعة سيناريوهات Shift-Left Security وأهمية الأتمتة في تقليل MTTR',
            details: 'ربط الفحوصات المبكرة بسرعة الاستعادة وتقليل الأعطال',
            estimatedHours: 1,
            done: true
          },
          {
            id: 'm1-2-s4',
            text: 'التحقق من تطبيق مبادئ 12-Factor على خطة مشروع HiveBox',
            details: 'تجهيز قائمة تحقق لمواءمة الخدمة القادمة مع العوامل الـ 12',
            estimatedHours: 1,
            done: true
          }
        ]
      },
      {
        id: 'm1-3',
        code: '1.3',
        title: 'تسليم HiveBox Phase 1 (Setup & GitHub Kanban)',
        hours: 8,
        estimatedMinutes: 480,
        category: 'Project Delivery',
        difficulty: 'Easy',
        defaultStatus: 'done',
        tags: ['HiveBox', 'GitHub', 'Kanban'],
        objectives: [
          'تجهيز المستودع العام yossefbelal1/Hivebox.',
          'تنظيم لوحة العمل Kanban وتحديد 3 معرفات senseBox من openSenseMap.'
        ],
        bestPractices: [
          'فتح كل مرحلة في HiveBox عبر Pull Request مستقل وربطها بلوحة Kanban.',
          'عدم القفز لكتابة كود المراحل المتقدمة قبل إغلاق متطلبات المرحلة الحالية.'
        ],
        requiredTools: ['GitHub', 'GitHub Projects Kanban', 'Git', 'openSenseMap'],
        exampleCode: `git clone https://github.com/yossefbelal1/Hivebox.git
cd Hivebox
git remote -v
# تجهيز README + Kanban (Todo / In Progress / Done)`,
        masteryCriteria: 'مستودع عام نظيف بـ README، لوحة Kanban نشطة، وكارت Phase 1 في Done.',
        whatYouDo: 'إنشاء مستودع Hivebox وتجهيز README ولوحة GitHub Project Kanban وتحديد 3 senseBox IDs.',
        deliverable: 'مستودع HiveBox جاهز ومربوط بلوحة Kanban ونظام Pull Requests.',
        resources: [
          { label: 'HiveBox Phase 1 Spec', url: 'https://devopsroadmap.io/projects/hivebox/', type: 'Roadmap / Docs' },
          { label: 'HiveBox GitHub Repo (yossefbelal1/Hivebox)', url: 'https://github.com/yossefbelal1/Hivebox', type: 'Roadmap / Docs' }
        ],
        subtasks: [
          {
            id: 'm1-3-s1',
            text: 'إنشاء مستودع عام باسم Hivebox على GitHub (yossefbelal1/Hivebox)',
            details: 'تهيئة المستودع العام وإضافة ملف الترخيص و .gitignore مناسب لبايثون',
            estimatedHours: 2,
            done: true
          },
          {
            id: 'm1-3-s2',
            text: 'كتابة README.md يوضح فكرة المشروع وخارطة المراحل',
            details: 'شرح هدف الخدمة التراكمي وأقسام المشروع الستة',
            estimatedHours: 2,
            done: true
          },
          {
            id: 'm1-3-s3',
            text: 'إنشاء لوحة GitHub Project (Kanban: Todo, In Progress, Done) وإتمام Phase 1',
            details: 'إعداد الأعمدة وربط مهام المشروع ببطاقات واضحة',
            estimatedHours: 2,
            done: true
          },
          {
            id: 'm1-3-s4',
            text: 'اعتماد سياسة العمل عبر Pull Requests فقط وحماية فرع main',
            details: 'توثيق قواعد المساهمة وعدم الدفع المباشر على الفرع الرئيسي',
            estimatedHours: 2,
            done: true
          }
        ]
      }
    ]
  },

  {
    id: 'module-2',
    number: '02',
    badge: 'المحطة الحالية • قيد التنفيذ',
    title: 'Basics — DevOps Core',
    subtitle: 'Linux & Git & Docker Core منتهية — التركيز الحالي على أدوات Python الـ 6 + لابات KodeKloud + Bash + HiveBox Phase 2.',
    monthRange: 'ديسمبر 2026 (الشهر 1)',
    estimatedHours: 50,
    cardTheme: 'from-[#1D4ED8] via-[#1E40AF] to-[#172554]',
    techIcons: ['python', 'bash', 'linux', 'docker'],
    sections: [
      { title: 'الأساسيات المنتهية (Linux, Git, Docker Core, CS50P Theory)', topicIds: ['m2-1', 'm2-2', 'm2-3', 'm2-4'] },
      { title: 'التركيز الحالي (Python DevOps Tools, Bash Labs, HiveBox Phase 2)', topicIds: ['m2-5', 'm2-6', 'm2-7'] }
    ],
    topics: [
      {
        id: 'm2-1',
        code: '2.1',
        title: 'Linux & Networking (RH124/RH134 + CCNA Troubleshooting)',
        hours: 12,
        estimatedMinutes: 720,
        category: 'Hands-on Lab',
        difficulty: 'Medium',
        defaultStatus: 'done',
        tags: ['Linux', 'RHEL', 'Networking'],
        objectives: [
          'إتقان إدارة أنظمة Red Hat (RH124/RH134): الصلاحيات، Systemd، journalctl، وإدارة التخزين.',
          'تطبيق تشخيص الشبكات عملياً: DNS, Routing, Firewall, Ports باستخدام ss/dig/curl.'
        ],
        bestPractices: [
          'استخدام مستخدم عادي مع sudo محدود بدلاً من العمل الدائم بحساب root.',
          'الاعتماد على journalctl -u و ss -tulpn و dig للتشخيص المنهجي قبل تعديل أي إعدادات.',
          'تأمين خدمات RHEL عبر firewalld و SELinux بدلاً من تعطيلها.'
        ],
        requiredTools: ['RHEL VM', 'systemd / journalctl', 'ss / ip / dig / curl', 'firewalld'],
        exampleCode: `# تشخيص خدمة ومنفذ وشبكة على RHEL VM:
sudo systemctl status docker --no-pager
journalctl -u docker -n 50 --no-pager
ss -tulpn | grep 8080
dig +short opensensemap.org && curl -I https://api.opensensemap.org/boxes`,
        masteryCriteria: 'القدرة على تشخيص أعطال الشبكة والخدمات على RHEL VM بدون الاعتماد على الواجهة الرسومية.',
        whatYouDo: 'إدارة أنظمة لينكس والشبكات مع تقوية مستمرة في عقلية الـ Troubleshooting العملي.',
        deliverable: 'سيرفر RHEL VM (yossef@RedHatLap) مهيأ وجاهز للعمل.',
        resources: [
          { label: 'Alaa Mohamed: RedHat Admin RH124/RH134 (Arabic)', url: 'https://www.youtube.com/', type: 'YouTube' },
          { label: 'KodeKloud: Learning Linux Basics Course & Labs', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'KodeKloud: Networks and Communications (Alan C.)', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'KodeKloud Linux Playgrounds', url: 'https://kodekloud.com/playgrounds/#LinuxPlaygrounds', type: 'Playground' },
          { label: 'Vishakha Sadhwani: Learn Networking In 25 MINUTES', url: 'https://www.youtube.com/@VishakhaSadhwani', type: 'YouTube' }
        ],
        subtasks: [
          {
            id: 'm2-1-s1',
            text: 'إدارة أنظمة لينكس بمستوى RH124 / RH134 (Alaa Mohamed & KodeKloud Labs)',
            details: 'إتقان الصلاحيات chmod/chown وإدارة الخدمات systemd والسجلات والتخزين',
            estimatedHours: 3,
            done: true
          },
          {
            id: 'm2-1-s2',
            text: 'أساسيات الشبكات (CCNA: IP, Subnetting, Routing, DNS, Firewall, Ports)',
            details: 'فهم CIDR و NAT و DNS Resolution وحل مشاكل الاتصال عبر ss و dig',
            estimatedHours: 3,
            done: true
          },
          {
            id: 'm2-1-s3',
            text: 'تجهيز RHEL VM (yossef@RedHatLap) بمستخدم غير root و Python 3.9.25',
            details: 'تهيئة بيئة التطوير على RedHatLap مع SSH ومفاتيح GitHub',
            estimatedHours: 3,
            done: true
          },
          {
            id: 'm2-1-s4',
            text: 'تدريب تشخيص الأعطال العملي عبر KodeKloud Linux Playgrounds',
            details: 'إصلاح سيناريوهات تعطل خدمات ومنافذ وأذونات ملفات بدون واجهة رسومية',
            estimatedHours: 3,
            done: true
          }
        ]
      },
      {
        id: 'm2-2',
        code: '2.2',
        title: 'Git & GitHub Workflow',
        hours: 5,
        estimatedMinutes: 300,
        category: 'Hands-on Lab',
        difficulty: 'Easy',
        defaultStatus: 'done',
        tags: ['Git', 'GitHub', 'Conventional Commits'],
        objectives: [
          'إتقان الفروع (Branching) والـ Pull Requests وحل التعارضات.',
          'الالتزام برسائل Conventional Commits في مشاريع GitHub.'
        ],
        bestPractices: [
          'كتابة commits ذرية صغيرة بصيغة Conventional Commits (feat:, fix:, chore:, docs:).',
          'عدم استخدام git push --force على الفروع المشتركة واستخدام feature branches نظيفة.'
        ],
        requiredTools: ['Git', 'GitHub', 'VS Code Git', 'SSH Keys'],
        exampleCode: `git checkout -b feat/hivebox-version
git add src/app.py
git commit -m "feat(api): add v0.0.1 version printer"
git push -u origin feat/hivebox-version`,
        masteryCriteria: 'عدم الدفع المباشر إلى main أبداً واستخدام PRs نظيفة.',
        whatYouDo: 'إتقان دورة العمل الأساسية (clone, config, add, commit, branch, push, pull) على VS Code و GitHub.',
        deliverable: 'حساب GitHub مربوط مع VS Code وسير عمل نظيف.',
        resources: [
          { label: 'KodeKloud: GIT for Beginners (Lydia Hallie)', url: 'https://kodekloud.com/', type: 'KodeKloud' }
        ],
        subtasks: [
          {
            id: 'm2-2-s1',
            text: 'إتقان clone, config, add, commit, branch, push, pull',
            details: 'ضبط user.name و user.email و SSH authentication مع GitHub',
            estimatedHours: 1.5,
            done: true
          },
          {
            id: 'm2-2-s2',
            text: 'إتقان Branching, PRs و Conventional Commits',
            details: 'إنشاء فروع مخصصة ودمجها عبر Pull Requests نظيفة',
            estimatedHours: 1.5,
            done: true
          },
          {
            id: 'm2-2-s3',
            text: 'حل تعارضات الدمج (Merge Conflicts) و Rebase الأساسي',
            details: 'التعامل الآمن مع التعديلات المتعارضة داخل VS Code والطرفية',
            estimatedHours: 1,
            done: true
          },
          {
            id: 'm2-2-s4',
            text: 'استخدام .gitignore و git diff لمراجعة التغييرات قبل الـ Commit',
            details: 'منع تسرب الملفات المؤقتة وبيئات venv والأسرار للمستودع',
            estimatedHours: 1,
            done: true
          }
        ]
      },
      {
        id: 'm2-3',
        code: '2.3',
        title: 'Docker Core (Completed up to Compose)',
        hours: 7,
        estimatedMinutes: 420,
        category: 'Hands-on Lab',
        difficulty: 'Medium',
        defaultStatus: 'done',
        tags: ['Docker 29.9.3', 'Containers'],
        objectives: [
          'بناء Docker Images وتشغيل الحاويات مع Ports و Env Vars.',
          'تشغيل Docker بدون sudo على RHEL VM.'
        ],
        bestPractices: [
          'إضافة المستخدم لمجموعة docker وتجنب تشغيل الحاويات بامتيازات root غير ضرورية.',
          'تثبيت إصدار الصورة الأساسية وتمرير الإعدادات عبر -e أو .env أثناء التشغيل.'
        ],
        requiredTools: ['Docker 29.9.3', 'Dockerfile', 'Docker Compose', 'RHEL VM'],
        exampleCode: `docker build -t myapp:v1 .
docker run -d --name myapp -p 8000:8000 -e APP_ENV=dev myapp:v1
docker logs -f myapp`,
        masteryCriteria: 'القدرة على كتابة Dockerfile أساسي وتشغيل واختبار حاوية محلياً.',
        whatYouDo: 'فهم الصور والحاويات، كتابة Dockerfile مبدئي، وإدارة المنافذ ومتغيرات البيئة.',
        deliverable: 'Docker 29.9.3 يعمل بسلاسة بصلاحيات المستخدم على RHEL VM.',
        resources: [
          { label: 'KodeKloud: Docker Training for Absolute Beginner (Mumshad M.)', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'Ahmed Elfakharany: Docker Arabic (YouTube)', url: 'https://www.youtube.com/watch?v=l_R7rdrurdE', type: 'YouTube' },
          { label: 'Ahmed Elfakharany: Learn Docker Arabic (Udemy)', url: 'https://www.udemy.com/course/learn-docker-arabic/', type: 'Udemy Arabic' },
          { label: 'Vishakha Sadhwani: Docker CRASH COURSE', url: 'https://www.youtube.com/watch?v=WEf2X7Ai2bg', type: 'YouTube' },
          { label: 'Vishakha Sadhwani: COMPLETE Docker Project Part 2', url: 'https://www.youtube.com/watch?v=M2fOJA6U5PE', type: 'YouTube' }
        ],
        subtasks: [
          {
            id: 'm2-3-s1',
            text: 'فهم Images & Containers وكتابة Dockerfile مبدئي',
            details: 'استيعاب الطبقات (Layers) وأوامر FROM و WORKDIR و COPY و RUN و CMD',
            estimatedHours: 2,
            done: true
          },
          {
            id: 'm2-3-s2',
            text: 'إدارة Ports و Env Vars وتشغيل Docker 29.9.3 بدون sudo على RHEL',
            details: 'ربط المنافذ -p وتمرير المتغيرات -e وتشغيل الحاويات بمستخدم yossef',
            estimatedHours: 2,
            done: true
          },
          {
            id: 'm2-3-s3',
            text: 'إدارة Volumes و Networks وتشغيل خدمات متعددة بـ Docker Compose',
            details: 'ربط حاويات التطبيق وقاعدة البيانات عبر شبكات Compose المعزولة',
            estimatedHours: 1.5,
            done: true
          },
          {
            id: 'm2-3-s4',
            text: 'فحص وتشخيص الحاويات باستخدام docker logs و docker exec و docker inspect',
            details: 'متابعة السجلات والدخول للطرفية داخل الحاوية لتشخيص الأعطال',
            estimatedHours: 1.5,
            done: true
          }
        ]
      },
      {
        id: 'm2-4',
        code: '2.4',
        title: 'Python Fundamentals Theory (CS50P Arabic — Completed)',
        hours: 8,
        estimatedMinutes: 480,
        category: 'Video / Reading',
        difficulty: 'Easy',
        defaultStatus: 'done',
        tags: ['Python', 'CS50P', 'Theory Done'],
        objectives: ['إتقان أساسيات بايثون النظرية قبل التطبيق العملي للأتمتة والـ APIs.'],
        bestPractices: [
          'معالجة الاستثناءات (try/except) بشكل صريح للأخطاء المتوقعة مثل فشل الشبكة أو JSON غير صالح.',
          'كتابة دوال صغيرة واضحة النوع والغرض قابلة للاختبار بـ pytest.'
        ],
        requiredTools: ['Python 3.9.25', 'VS Code', 'CS50P Notes'],
        exampleCode: `def parse_temps(items: list[dict]) -> float:
    values = [float(x["value"]) for x in items if "value" in x]
    return round(sum(values) / len(values), 2) if values else 0.0`,
        masteryCriteria: 'فهم Functions, Loops, Dicts, Exceptions, File I/O, Unit Tests.',
        whatYouDo: 'إنهاء الجانب النظري للغة من بلاي ليست CS50P بالعربي (Super Salman).',
        deliverable: 'قاعدة برمجية صلبة جاهزة للتطبيق على أدوات DevOps.',
        resources: [
          { label: 'CS50P Arabic Playlist (Super Salman)', url: 'https://youtube.com/playlist?list=PLMEwJLan85pi3UCtLYDvGvORU9UYBkBAW', type: 'YouTube' },
          { label: 'KodeKloud: Python Basics & Programming Fundamentals', url: 'https://kodekloud.com/', type: 'KodeKloud' }
        ],
        subtasks: [
          {
            id: 'm2-4-s1',
            text: 'إنهاء الجانب النظري من CS50P بالعربي (Variables..Unit Tests باستثناء RegEx و OOP عمداً)',
            details: 'تغطية المتغيرات والشروط والحلقات والدوال والقواميس والملفات والاختبارات',
            estimatedHours: 2,
            done: true
          },
          {
            id: 'm2-4-s2',
            text: 'إتقان هياكل البيانات (Lists, Dicts, Sets) و List Comprehensions',
            details: 'تحويل بيانات JSON المعقدة إلى مخرجات نظيفة لسكربتات الـ DevOps',
            estimatedHours: 2,
            done: true
          },
          {
            id: 'm2-4-s3',
            text: 'التعامل مع Exceptions (try/except/finally) و File I/O (with open)',
            details: 'ضمان عدم توقف السكربتات المفاجئ وإغلاق الملفات تلقائياً',
            estimatedHours: 2,
            done: true
          },
          {
            id: 'm2-4-s4',
            text: 'تطبيق كتابة اختبارات الوحدات الأساسية (Unit Tests & assertions)',
            details: 'اختبار الدوال المستقلة قبل الانتقال إلى مكتبات DevOps العملية',
            estimatedHours: 2,
            done: true
          }
        ]
      },
      {
        id: 'm2-5',
        code: '2.5',
        title: 'Python DevOps Libraries & FastAPI (التركيز الحالي الآن)',
        hours: 10,
        estimatedMinutes: 600,
        category: 'Coding',
        difficulty: 'Medium',
        defaultStatus: 'in_progress',
        tags: ['Current Focus', 'Corey Schafer', 'KodeKloud', 'FastAPI'],
        objectives: [
          'إتقان مكتبات DevOps الست بالترتيب: venv → pip → json → requests → os → subprocess.',
          'إنهاء لابات Python Basics على KodeKloud بدءاً من درس Literals.',
          'بناء نقاط الـ API بـ FastAPI (دورة Sanjeev T.) لخدمة HiveBox.'
        ],
        bestPractices: [
          'إنشاء بيئة افتراضية venv لكل مشروع وتثبيت الاعتماديات في requirements.txt بأرقام إصدارات محددة.',
          'تمرير timeout=5 دائماً في requests.get() والتحقق من response.raise_for_status().',
          'عدم تمرير shell=True مع مدخلات غير موثوقة في subprocess.run() وتمرير قائمة أوامر بدلاً من نص.'
        ],
        requiredTools: ['Python 3.9.25', 'venv & pip', 'json & requests', 'os & subprocess', 'FastAPI'],
        exampleCode: `python3 -m venv .venv && source .venv/bin/activate
pip install requests fastapi uvicorn && pip freeze > requirements.txt

# مثال requests + timeout + subprocess آمن:
import os, requests, subprocess
res = requests.get("https://api.opensensemap.org/boxes/5eba5fbad46fb8001b799786", timeout=5)
res.raise_for_status()
subprocess.run(["docker", "ps"], check=True)`,
        masteryCriteria: 'تشغيل سكريبتات بايثون معزولة بـ venv تتصل بـ openSenseMap API وتنفذ أوامر النظام عبر subprocess.',
        whatYouDo: 'تطبيق فيديوهات Corey Schafer الـ 6 عملياً على RHEL VM + حل لابات KodeKloud + FastAPI.',
        deliverable: 'سكربتات أتمتة نظيفة + إغلاق لابات Python Basics على KodeKloud.',
        resources: [
          { label: '1. Corey Schafer: venv', url: 'https://www.youtube.com/watch?v=Kg1Yvry_Ydk', type: 'YouTube' },
          { label: '2. Corey Schafer: pip', url: 'https://www.youtube.com/watch?v=U2ZN104hIcc', type: 'YouTube' },
          { label: '3. Corey Schafer: json', url: 'https://www.youtube.com/watch?v=9N6a-VLBa2I', type: 'YouTube' },
          { label: '4. Corey Schafer: requests', url: 'https://www.youtube.com/watch?v=tb8gHvYlCFs', type: 'YouTube' },
          { id: 'res-os', label: '5. Corey Schafer: os', url: 'https://www.youtube.com/watch?v=tJxcKyFMTGo', type: 'YouTube' },
          { label: '6. Corey Schafer: subprocess', url: 'https://www.youtube.com/watch?v=2Fp1N6dof0Y', type: 'YouTube' },
          { label: 'Vishakha Sadhwani: COMPLETE APIs Crash Course', url: 'https://www.youtube.com/@VishakhaSadhwani', type: 'YouTube' },
          { label: 'KodeKloud: Python Basics Labs (from Literals)', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'KodeKloud: Python API Development with FastAPI (Sanjeev T.)', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'KodeKloud: PCAP Python Certification', url: 'https://kodekloud.com/', type: 'KodeKloud' }
        ],
        subtasks: [
          {
            id: 'm2-5-s1',
            text: 'تطبيق 1 & 2: venv + pip (عزل بيئة العمل وتوليد requirements.txt)',
            details: 'إنشاء .venv على RHEL VM وتثبيت الحزم وحفظها بـ pip freeze',
            estimatedHours: 2,
            done: false
          },
          {
            id: 'm2-5-s2',
            text: 'تطبيق 3 & 4: json + requests (استدعاء APIs ومعالجة JSON)',
            details: 'جلب بيانات senseBox من openSenseMap وتحليل قراءات الحرارة مع timeout',
            estimatedHours: 2,
            done: false
          },
          {
            id: 'm2-5-s3',
            text: 'تطبيق 5 & 6: os + subprocess (تشغيل أوامر لينكس بأمان من بايثون)',
            details: 'قراءة متغيرات البيئة os.environ وتشغيل أوامر النظام بـ subprocess.run بدون shell=True',
            estimatedHours: 2,
            done: false
          },
          {
            id: 'm2-5-s4',
            text: 'حل اللابات المتبقية في Python Basics على KodeKloud (بدءاً من Literals)',
            details: 'إغلاق كافة تمارين KodeKloud العملية لتثبيت سرعة الكتابة البرمجية',
            estimatedHours: 2,
            done: false
          },
          {
            id: 'm2-5-s5',
            text: 'دراسة أساسيات FastAPI (Sanjeev T.) لبناء HiveBox Endpoints',
            details: 'بناء نقاط GET و Pydantic schemas وتشغيل الخادم بـ uvicorn',
            estimatedHours: 2,
            done: false
          }
        ]
      },
      {
        id: 'm2-6',
        code: '2.6',
        title: 'Bash Scripting Practical Labs & RHEL Health Check',
        hours: 5,
        estimatedMinutes: 300,
        category: 'Hands-on Lab',
        difficulty: 'Medium',
        defaultStatus: 'in_progress',
        tags: ['Bash', 'Shell', 'KodeKloud Labs', 'Mostafa Magdy'],
        objectives: [
          'تحويل المعرفة النظرية في Bash إلى سكربتات إنتاجية صارمة (set -euo pipefail).',
          'بناء سكريبت Health Check عملي على RHEL VM.'
        ],
        bestPractices: [
          'بدء كل سكربت إنتاجي بـ #!/usr/bin/env bash و set -euo pipefail لتفادي الأخطاء الصامتة.',
          'وضع علامات الاقتباس المزدوجة "${VAR}" حول المتغيرات وفحصها بأداة ShellCheck.'
        ],
        requiredTools: ['Bash', 'ShellCheck', 'curl / systemctl', 'RHEL VM'],
        exampleCode: `#!/usr/bin/env bash
set -euo pipefail
trap 'echo "Health check failed on line $LINENO" >&2' ERR

IMAGE="hivebox:v0.0.1"
docker build -t "$IMAGE" .
OUTPUT="$(docker run --rm "$IMAGE")"
echo "$OUTPUT" | grep -q "v0.0.1" && echo "OK: $OUTPUT"`,
        masteryCriteria: 'حل لابات Shell Scripts for Beginners وتشغيل سكريبت Health Check يختبر الاستجابة.',
        whatYouDo: 'حل اللابات فقط من Shell Scripts for Beginners + مشاريع Mostafa Magdy + سكريبت RHEL VM.',
        deliverable: 'سكريبت Health Check عملي مرفوع ومجرب على RHEL VM.',
        resources: [
          { label: 'KodeKloud: Shell Scripts for Beginners (Labs Only)', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'Mostafa Magdy: Bash Crash Course (4 Projects)', url: 'https://www.youtube.com/', type: 'YouTube' }
        ],
        subtasks: [
          {
            id: 'm2-6-s1',
            text: 'مراجعة المفاهيم النظرية (Shebang, Args, Conditions, Loops, $?, Signals & Trap)',
            details: 'ترسيخ رموز الخروج exit codes ومعالجة الإشارات',
            estimatedHours: 1,
            done: true
          },
          {
            id: 'm2-6-s2',
            text: 'حل لابات فقط من كورس Shell Scripts for Beginners على KodeKloud',
            details: 'تطبيق اللابات العملية دون إعادة مشاهدة المحاضرات النظرية',
            estimatedHours: 1.5,
            done: false
          },
          {
            id: 'm2-6-s3',
            text: 'تطبيق Mostafa Magdy Bash Crash Course + كتابة Health Check على RHEL VM',
            details: 'بناء سكربت فحص حالة Docker والخدمات وتنظيف الموارد',
            estimatedHours: 1.5,
            done: false
          },
          {
            id: 'm2-6-s4',
            text: 'تفعيل set -euo pipefail وفحص السكربتات بـ ShellCheck',
            details: 'ضمان خلو السكربت من أخطاء المتغيرات غير المعرفة والمسافات',
            estimatedHours: 1,
            done: false
          }
        ]
      },
      {
        id: 'm2-7',
        code: '2.7',
        title: 'تسليم HiveBox Phase 2 + كويز Module 2',
        hours: 3,
        estimatedMinutes: 180,
        category: 'Project Delivery',
        difficulty: 'Medium',
        defaultStatus: 'pending',
        tags: ['HiveBox Phase 2', 'v0.0.1', 'Docker'],
        objectives: [
          'كتابة النسخة v0.0.1 من HiveBox (تطبع الإصدار وتخرج).',
          'تغليفها في Dockerfile وتشغيلها على RHEL VM ورفعها عبر PR.'
        ],
        bestPractices: [
          'الالتزام التام بنطاق v0.0.1 (طباعة الإصدار والخروج) وعدم إضافة FastAPI قبل Phase 3.',
          'توثيق أوامر البناء والتشغيل والاختبار في README قبل فتح Pull Request.'
        ],
        requiredTools: ['Python', 'Docker 29.9.3', 'Bash', 'GitHub PR'],
        exampleCode: `git checkout -b feat/phase-2-basic-api
docker build -t hivebox:v0.0.1 .
docker run --rm hivebox:v0.0.1`,
        masteryCriteria: 'حاوية v0.0.1 تعمل وتطبع الإصدار بدقة + اجتياز كويز Module 2.',
        whatYouDo: 'إنهاء متطلبات HiveBox Phase 2 وتوثيق خطوات الاختبار وتحديث لوحة Kanban.',
        deliverable: 'إغلاق Module 2 بالكامل والاستعداد للموديول الثالث.',
        resources: [
          { label: 'HiveBox Phase 2 Spec', url: 'https://devopsroadmap.io/projects/hivebox/', type: 'Roadmap / Docs' },
          { label: 'HiveBox GitHub Repo (yossefbelal1/Hivebox)', url: 'https://github.com/yossefbelal1/Hivebox', type: 'Roadmap / Docs' }
        ],
        subtasks: [
          {
            id: 'm2-7-s1',
            text: 'تنفيذ دالة HiveBox v0.0.1 وبناء Dockerfile وتشغيله على RHEL VM',
            details: 'طباعة HiveBox version: v0.0.1 والخروج برمز نجاح 0 من داخل الحاوية',
            estimatedHours: 1,
            done: false
          },
          {
            id: 'm2-7-s2',
            text: 'توثيق خطوات الاختبار ورفع PR إلى yossefbelal1/Hivebox وتحديث Kanban',
            details: 'إرفاق سكربت التحقق وتحديث README ودمج الـ Pull Request',
            estimatedHours: 0.75,
            done: false
          },
          {
            id: 'm2-7-s3',
            text: 'اجتياز كويز Module 2 بنجاح',
            details: 'تحقيق 15/15 في كويز Module 2 (Linux, Networking, Git, Docker, Python, Bash)',
            estimatedHours: 0.75,
            done: false
          },
          {
            id: 'm2-7-s4',
            text: 'مراجعة إغلاق كافة مهام المرحلة الثانية قبل الانتقال إلى Module 3',
            details: 'التحقق من جاهزية المستودع ووسم الإصدار v0.0.1',
            estimatedHours: 0.5,
            done: false
          }
        ]
      }
    ]
  },

  {
    id: 'module-3',
    number: '03',
    badge: 'يناير 2027 • الشهر 2',
    title: 'Start — Laying the Foundation',
    subtitle: 'Modularity، اختبارات pytest، Docker Best Practices (Multi-stage, Non-root, Hadolint)، و GitHub Actions CI + OpenSSF.',
    monthRange: 'يناير 2027 (الشهر 2)',
    estimatedHours: 45,
    cardTheme: 'from-[#065F46] via-[#064E3B] to-[#022C22]',
    techIcons: ['python', 'docker', 'github', 'security'],
    sections: [
      { title: 'جودة الكود والاختبارات', topicIds: ['m3-1', 'm3-2'] },
      { title: 'Docker Best Practices و GitHub Actions CI', topicIds: ['m3-3', 'm3-4', 'm3-5'] }
    ],
    topics: [
      {
        id: 'm3-1',
        code: '3.1',
        title: 'Code Modularity, Pylint & Conventional Commits',
        hours: 6,
        estimatedMinutes: 360,
        category: 'Coding',
        difficulty: 'Medium',
        defaultStatus: 'pending',
        tags: ['Python', 'Pylint', 'Modularity'],
        objectives: ['فصل منطق التطبيق عن الإعدادات وتطبيق Pylint والالتزام بـ Conventional Commits.'],
        bestPractices: [
          'فصل طبقة الـ API Routes عن منطق جلب بيانات openSenseMap وحساب المتوسط لتسهيل الاختبار.',
          'فرض فحص Pylint تلقائياً في المحرر والـ CI للحفاظ على نظافة الكود.'
        ],
        requiredTools: ['FastAPI', 'Pylint', 'VS Code', 'Conventional Commits'],
        exampleCode: `@app.get("/version")
def get_version():
    return {"version": APP_VERSION}

@app.get("/temperature")
def get_temperature():
    # استبعاد أي قراءة أقدم من 60 دقيقة
    return {"average_temperature": compute_recent_avg()}`,
        masteryCriteria: 'صفر تحذيرات Pylint وهيكلية مجلدات نظيفة.',
        whatYouDo: 'تنظيم هيكل كود HiveBox وإضافة نقاط /version و /temperature المتصلة بـ openSenseMap.',
        deliverable: 'REST API نظيف ومتوافق مع معايير Pylint.',
        resources: [{ label: 'Module 3 Roadmap', url: 'https://devopsroadmap.io/learning-plan', type: 'Roadmap / Docs' }],
        subtasks: [
          {
            id: 'm3-1-s1',
            text: 'فصل المنطق البرمجي عن الإعدادات وتثبيت إضافة Pylint في VS Code',
            details: 'تقسيم src/ إلى وحدات للخدمات والإعدادات ونقاط الـ API',
            estimatedHours: 1.5,
            done: false
          },
          {
            id: 'm3-1-s2',
            text: 'تطبيق Conventional Commits وبناء /version و /temperature',
            details: 'تنفيذ النقطتين وحساب متوسط الحرارة من الحساسات الثلاثة',
            estimatedHours: 1.5,
            done: false
          },
          {
            id: 'm3-1-s3',
            text: 'إضافة فلتر استبعاد القراءات الأقدم من ساعة واحدة في /temperature',
            details: 'التحقق من الطابع الزمني لكل قراءة مقارنة بالوقت الحالي UTC',
            estimatedHours: 1.5,
            done: false
          },
          {
            id: 'm3-1-s4',
            text: 'معالجة حالات فشل openSenseMap API وإرجاع أخطاء HTTP واضحة',
            details: 'استخدام Timeout ومعالجة أخطاء الشبكة بدون إسقاط الخادم',
            estimatedHours: 1.5,
            done: false
          }
        ]
      },
      {
        id: 'm3-2',
        code: '3.2',
        title: 'Quality Assurance & Unit Testing (pytest)',
        hours: 10,
        estimatedMinutes: 600,
        category: 'Coding',
        difficulty: 'Medium',
        defaultStatus: 'pending',
        tags: ['pytest', 'Unit Tests', 'QA'],
        objectives: ['كتابة Unit Tests معزولة لجميع Endpoints باستخدام pytest و mocking.'],
        bestPractices: [
          'عزل Unit Tests عن الشبكة الخارجية تماماً باستخدام monkeypatch أو unittest.mock.',
          'اختبار الحالات الحدية (Edge Cases) مثل قراءة أقدم من ساعة أو استجابة فارغة.'
        ],
        requiredTools: ['pytest', 'FastAPI TestClient', 'unittest.mock', 'pytest-cov'],
        exampleCode: `def test_temperature_ignores_stale_readings(client, mocker):
    mocker.patch("src.sensors.fetch_boxes", return_value=[{"temp": 25.0, "age_min": 10}, {"temp": 99.0, "age_min": 75}])
    res = client.get("/temperature")
    assert res.status_code == 200
    assert res.json()["average_temperature"] == 25.0`,
        masteryCriteria: 'نجاح جميع اختبارات /version و /temperature بما يشمل استبعاد البيانات الأقدم من ساعة.',
        whatYouDo: 'كتابة اختبارات وحدات أوتوماتيكية لكود بايثون.',
        deliverable: 'مجموعة اختبارات pytest سريعة وموثوقة.',
        resources: [{ label: 'HiveBox Phase 3', url: 'https://devopsroadmap.io/projects/hivebox/', type: 'Roadmap / Docs' }],
        subtasks: [
          {
            id: 'm3-2-s1',
            text: 'كتابة Unit Tests لنقطة /version وحساب متوسط الحرارة',
            details: 'التحقق من صيغة JSON والـ status code 200 عبر TestClient',
            estimatedHours: 2.5,
            done: false
          },
          {
            id: 'm3-2-s2',
            text: 'اختبار حالة البيانات الأقدم من ساعة باستخدام Mock لـ openSenseMap',
            details: 'محاكاة قراءات حديثة وأخرى قديمة والتأكد من استبعاد القديمة',
            estimatedHours: 2.5,
            done: false
          },
          {
            id: 'm3-2-s3',
            text: 'اختبار حالات الفشل (Timeout / 5xx من openSenseMap)',
            details: 'التأكد من التعامل السليم مع تعطل المصدر الخارجي',
            estimatedHours: 2.5,
            done: false
          },
          {
            id: 'm3-2-s4',
            text: 'قياس تغطية الاختبارات بـ pytest-cov والوصول لتغطية عالية للمنطق الأساسي',
            details: 'توليد تقرير التغطية والتأكد من سرعة تنفيذ الاختبارات',
            estimatedHours: 2.5,
            done: false
          }
        ]
      },
      {
        id: 'm3-3',
        code: '3.3',
        title: 'Docker Best Practices (Multi-stage, Non-root & Hadolint)',
        hours: 9,
        estimatedMinutes: 540,
        category: 'Hands-on Lab',
        difficulty: 'Medium',
        defaultStatus: 'pending',
        tags: ['Docker', 'Hadolint', 'Non-root'],
        objectives: [
          'تطبيق Multi-stage builds وتقليص حجم الصورة.',
          'التشغيل بمستخدم Non-root واجتياز فحص Hadolint بدون تحذيرات.'
        ],
        bestPractices: [
          'نسخ requirements.txt وتثبيتها قبل نسخ الكود لاستغلال Docker Build Cache.',
          'إنشاء مستخدم بـ UID محدد (Non-root) وتثبيت علامات الإصدار في FROM.'
        ],
        requiredTools: ['Docker', 'Multi-stage Dockerfile', 'Hadolint', '.dockerignore'],
        exampleCode: `FROM python:3.9.25-slim AS builder
WORKDIR /build
COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

FROM python:3.9.25-slim
RUN useradd --create-home --uid 10001 appuser
WORKDIR /app
COPY --from=builder /install /usr/local
COPY --chown=10001:10001 src/ ./src/
USER 10001
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]`,
        masteryCriteria: 'صورة إنتاجية خفيفة تمر من Hadolint نظيفة 100%.',
        whatYouDo: 'تحسين Dockerfile HiveBox وفق 15 قاعدة Container Best Practices.',
        deliverable: 'Multi-stage Dockerfile آمن وصغير الحجم.',
        resources: [{ label: 'Container Best Practices', url: 'https://devopsroadmap.io/projects/container-best-practices/', type: 'Roadmap / Docs' }],
        subtasks: [
          {
            id: 'm3-3-s1',
            text: 'تطبيق Multi-stage Build و Base Image مصغرة + .dockerignore',
            details: 'فصل مرحلة بناء التبعيات عن صورة التشغيل النهائية وتقليص الحجم',
            estimatedHours: 2.5,
            done: false
          },
          {
            id: 'm3-3-s2',
            text: 'التشغيل بمستخدم Non-root واجتياز فحص Hadolint',
            details: 'تعيين USER غير root ومعالجة كافة تحذيرات hadolint Dockerfile',
            estimatedHours: 2.5,
            done: false
          },
          {
            id: 'm3-3-s3',
            text: 'تثبيت إصدار الصورة الأساسية وتفعيل Exec Form في CMD',
            details: 'ضمان وصول إشارة SIGTERM مباشرة للعملية الرئيسية PID 1',
            estimatedHours: 2,
            done: false
          },
          {
            id: 'm3-3-s4',
            text: 'مراجعة ومقارنة حجم الصورة قبل وبعد التحسين',
            details: 'التحقق عبر docker images وتجربة التشغيل المحلي بصلاحيات مقيدة',
            estimatedHours: 2,
            done: false
          }
        ]
      },
      {
        id: 'm3-4',
        code: '3.4',
        title: 'GitHub Actions CI & OpenSSF Scorecard',
        hours: 12,
        estimatedMinutes: 720,
        category: 'Hands-on Lab',
        difficulty: 'Hard',
        defaultStatus: 'pending',
        tags: ['GitHub Actions', 'CI', 'OpenSSF Scorecard'],
        objectives: [
          'بناء CI Pipeline تلقائي يجمع Pylint + Hadolint + pytest + Docker Build.',
          'تفعيل OpenSSF Scorecard ومعالجة الملاحظات الأمنية.'
        ],
        bestPractices: [
          'تثبيت GitHub Actions الرسمية بـ Commit SHA كامل وتحديد أقل صلاحيات permissions: read-all.',
          'تشغيل الحاوية فعلياً داخل خط الـ CI وفحص استجابة /version قبل قبول الـ PR.'
        ],
        requiredTools: ['GitHub Actions', 'Pylint', 'Hadolint', 'pytest', 'OpenSSF Scorecard'],
        exampleCode: `permissions:
  contents: read
jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pylint src/ && pytest -v
      - run: docker build -t hivebox:ci . && docker run -d -p 8000:8000 hivebox:ci
      - run: sleep 3 && curl -f http://localhost:8000/version`,
        masteryCriteria: 'CI أخضر على كل PR يختبر نقطة /version حياً داخل الحاوية.',
        whatYouDo: 'دراسة كورس GitHub Actions Certification وتطبيق ci.yml في HiveBox.',
        deliverable: 'Workflow CI متكامل في .github/workflows/ci.yml.',
        resources: [
          { label: 'KodeKloud: GitHub Actions Certification (Barahalikar S.)', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'YouTube: glich.stream GitHub Actions (7 eps OIDC/ARC)', url: 'https://www.youtube.com/@glichstream', type: 'YouTube' },
          { label: 'Vishakha Sadhwani: CI/CD CRASH COURSE', url: 'https://www.youtube.com/watch?v=ixNNyLcWXX8', type: 'YouTube' }
        ],
        subtasks: [
          {
            id: 'm3-4-s1',
            text: 'بناء ci.yml لتشغيل Pylint, Hadolint, pytest وبناء الصورة',
            details: 'إعداد مهام متوازية أو متسلسلة تفشل فوراً عند أي خطأ جودة',
            estimatedHours: 3,
            done: false
          },
          {
            id: 'm3-4-s2',
            text: 'تشغيل الحاوية في الـ CI واختبار نقطة /version',
            details: 'التحقق الفعلي من عمل الصورة المبنية عبر curl داخل الـ runner',
            estimatedHours: 3,
            done: false
          },
          {
            id: 'm3-4-s3',
            text: 'إضافة OpenSSF Scorecard Action ومعالجة النتائج',
            details: 'تفعيل فحص سلسلة التوريد وصلاحيات الـ Token وتثبيت الـ Actions بـ SHA',
            estimatedHours: 3,
            done: false
          },
          {
            id: 'm3-4-s4',
            text: 'فهم آلية OIDC Authentication و Self-hosted Runners (ARC)',
            details: 'متابعة سلسلة glich.stream لاستبدال المفاتيح الثابتة بـ OIDC tokens',
            estimatedHours: 3,
            done: false
          }
        ]
      },
      {
        id: 'm3-5',
        code: '3.5',
        title: 'تسليم HiveBox Phase 3',
        hours: 8,
        estimatedMinutes: 480,
        category: 'Project Delivery',
        difficulty: 'Medium',
        defaultStatus: 'pending',
        tags: ['HiveBox Phase 3', 'Release'],
        objectives: ['دمج مخرجات Phase 3 كاملة عبر PR نظيف وتحديث Kanban.'],
        bestPractices: [
          'مراجعة كافة فحوصات CI و OpenSSF على الـ PR قبل الدمج.',
          'وسم الإصدار الدلالي v0.1.0 بعد الدمج في main.'
        ],
        requiredTools: ['GitHub PR', 'GitHub Actions', 'Kanban', 'HiveBox Repo'],
        exampleCode: `git tag -a v0.1.0 -m "release: HiveBox Phase 3 MVP API & CI"
git push origin v0.1.0`,
        masteryCriteria: 'نجاح كافة اختبارات CI و OpenSSF على المستودع.',
        whatYouDo: 'مراجعة كل متطلبات Phase 3 وتسليمها.',
        deliverable: 'إغلاق HiveBox Phase 3 بالكامل.',
        resources: [{ label: 'HiveBox Phase 3 Spec', url: 'https://devopsroadmap.io/projects/hivebox/', type: 'Roadmap / Docs' }],
        subtasks: [
          {
            id: 'm3-5-s1',
            text: 'إتمام PR Phase 3 ونقل الكارت إلى Done في Kanban',
            details: 'فتح Pull Request نظيف بجميع ملفات الكود والاختبارات والـ CI',
            estimatedHours: 2,
            done: false
          },
          {
            id: 'm3-5-s2',
            text: 'توثيق نقاط /version و /temperature وأوامر الاختبار في README',
            details: 'تحديث توثيق الـ API ومتطلبات التشغيل المحلي',
            estimatedHours: 2,
            done: false
          },
          {
            id: 'm3-5-s3',
            text: 'اجتياز كويز Module 3 (15/15) ومراجعة ملاحظات OpenSSF',
            details: 'التحقق من استيعاب كل مفاهيم CI و Container Best Practices',
            estimatedHours: 2,
            done: false
          },
          {
            id: 'm3-5-s4',
            text: 'إصدار Tag v0.1.0 بعد دمج المرحلة الثالثة بنجاح',
            details: 'ربط الإصدار بسجل تغييرات واضح على GitHub',
            estimatedHours: 2,
            done: false
          }
        ]
      }
    ]
  },

  {
    id: 'module-4',
    number: '04',
    badge: 'فبراير – مارس 2027 • شهران',
    title: 'Expand — Constructing a Shell',
    subtitle: '12-Factor App، Kubernetes (Kind + Ingress-Nginx)، Prometheus & Grafana، AWS Core، استكمال System Design، و HiveBox Phase 4.',
    monthRange: 'فبراير – مارس 2027 (الشهران 3 و 4)',
    estimatedHours: 70,
    cardTheme: 'from-[#1E3A8A] via-[#172554] to-[#0F172A]',
    techIcons: ['kubernetes', 'prometheus', 'aws', 'nginx'],
    sections: [
      { title: '12-Factor & Kubernetes Core', topicIds: ['m4-1', 'm4-2'] },
      { title: 'Observability, AWS Core & System Design Part 2', topicIds: ['m4-3', 'm4-4', 'm4-5'] },
      { title: 'تسليم HiveBox Phase 4', topicIds: ['m4-6'] }
    ],
    topics: [
      {
        id: 'm4-1',
        code: '4.1',
        title: 'Twelve-Factor App & REST API Enhancements',
        hours: 8,
        estimatedMinutes: 480,
        category: 'Coding',
        difficulty: 'Medium',
        defaultStatus: 'pending',
        tags: ['12-Factor', 'Env Vars', 'REST API'],
        objectives: ['جعل senseBox IDs قابلة للتهيئة عبر Env Vars وإضافة حقل status لقراءة الحرارة.'],
        bestPractices: [
          'قراءة كل الإعدادات المتغيرة من Environment Variables مع قيم افتراضية آمنة للتطوير.',
          'تحديث اختبارات pytest لتغطية تصنيفات الحرارة الثلاثة بدقة.'
        ],
        requiredTools: ['12-Factor App', 'os.environ', 'FastAPI', 'pytest'],
        exampleCode: `SENSEBOX_IDS = os.getenv("SENSEBOX_IDS", "").split(",")
status = "Too Cold" if avg < 10 else ("Good" if avg <= 36 else "Too Hot")`,
        masteryCriteria: 'نفس الصورة تعمل بأي senseBox IDs عبر متغيرات البيئة فقط.',
        whatYouDo: 'تطبيق مبادئ Twelve-Factor App وتحديث /temperature.',
        deliverable: 'تطبيق Stateless يقرأ الإعدادات من Env Vars.',
        resources: [
          { label: '12-Factor App Official Methodology', url: 'https://12factor.net/', type: 'Roadmap / Docs' },
          { label: 'KodeKloud: 12 Factor App (Mumshad Mannambeth)', url: 'https://kodekloud.com/', type: 'KodeKloud' }
        ],
        subtasks: [
          {
            id: 'm4-1-s1',
            text: 'قراءة senseBox IDs من Environment Variables',
            details: 'إلغاء المعرفات الثابتة في الكود وقراءتها من SENSEBOX_IDS',
            estimatedHours: 2,
            done: false
          },
          {
            id: 'm4-1-s2',
            text: 'إضافة تصنيف status (<10 Too Cold, 11–36 Good, >37 Too Hot)',
            details: 'إرجاع الحقل status في استجابة /temperature مع اختبارات الحالات الحدية',
            estimatedHours: 2,
            done: false
          },
          {
            id: 'm4-1-s3',
            text: 'تطبيق مبدأ Logs as Event Streams (الإخراج إلى stdout)',
            details: 'تجهيز سجلات مهيكلة جاهزة للالتقاط في Kubernetes',
            estimatedHours: 2,
            done: false
          },
          {
            id: 'm4-1-s4',
            text: 'تطبيق مبدأ Disposability عبر الإغلاق النظيف (Graceful Shutdown)',
            details: 'التحقق من سرعة بدء التشغيل وإغلاق الاتصالات عند SIGTERM',
            estimatedHours: 2,
            done: false
          }
        ]
      },
      {
        id: 'm4-2',
        code: '4.2',
        title: 'Kubernetes Core & Kind + Ingress-Nginx',
        hours: 24,
        estimatedMinutes: 1440,
        category: 'Hands-on Lab',
        difficulty: 'Hard',
        defaultStatus: 'pending',
        tags: ['Kubernetes', 'Kind', 'CKA', 'Troubleshooting'],
        objectives: [
          'إتقان معمارية Kubernetes وكائناته الأساسية (Pods, Deployments, Services, Ingress, ConfigMaps, Secrets, Probes, HPA).',
          'تشغيل كلاستر Kind محلياً مع Ingress-Nginx وتطوير مهارات K8s Troubleshooting.'
        ],
        bestPractices: [
          'تحديد requests و limits و livenessProbe/readinessProbe لكل Deployment في الإنتاج.',
          'اتباع تسلسل تشخيص منهجي: kubectl get pods -> describe -> logs -> events.'
        ],
        requiredTools: ['Kind', 'kubectl', 'Ingress-Nginx', 'HPA', 'ConfigMap & Secret'],
        exampleCode: `kind create cluster --name hivebox-dev --config kind-config.yaml
kubectl apply -f k8s/
kubectl get pods,svc,ingress -A
kubectl describe pod -l app=hivebox`,
        masteryCriteria: 'نشر التطبيق داخل Kind والوصول إليه عبر Ingress مع عمل Probes و HPA.',
        whatYouDo: 'إنهاء كورسات K8s و CKA و Troubleshooting على KodeKloud + تطبيق Kind.',
        deliverable: 'ملفات Deployment, Service, Ingress شغالة على Kind.',
        resources: [
          { label: 'KodeKloud: Kubernetes for the Absolute Beginners (Mumshad M.)', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'KodeKloud: Certified Kubernetes Administrator (CKA) (Mumshad M.)', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'KodeKloud: K8s Troubleshooting for App Developers (Nourhan K.)', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'Ahmed Elfakharany: Kubernetes Arabic (YouTube)', url: 'https://www.youtube.com/watch?v=-ezhA_YALDs', type: 'YouTube' },
          { label: 'Ahmed Elfakharany: Kubernetes From Beginner to Master (Udemy Arabic)', url: 'https://www.udemy.com/course/kubernetes-from-beginner-to-master-arabic/', type: 'Udemy Arabic' },
          { label: 'Vishakha Sadhwani: The ONLY Kubernetes Course', url: 'https://www.youtube.com/watch?v=H_a5DTKSEjY', type: 'YouTube' }
        ],
        subtasks: [
          {
            id: 'm4-2-s1',
            text: 'إتقان Architecture (API Server, etcd, Scheduler, Kubelet) وتشغيل Kind',
            details: 'فهم Control Plane و Worker Nodes وتشغيل كلاستر Kind محلياً',
            estimatedHours: 6,
            done: false
          },
          {
            id: 'm4-2-s2',
            text: 'كتابة Manifests: Deployment, Service, ConfigMap, Secret, Ingress-Nginx',
            details: 'توجيه الطلبات من Ingress-Nginx إلى Service وتمرير الإعدادات بـ ConfigMap',
            estimatedHours: 6,
            done: false
          },
          {
            id: 'm4-2-s3',
            text: 'تطبيق Probes و Resource Limits و HPA + كورس K8s Troubleshooting',
            details: 'ضبط التوسع التلقائي والتشخيص العملي لأعطال CrashLoopBackOff و ImagePullBackOff',
            estimatedHours: 6,
            done: false
          },
          {
            id: 'm4-2-s4',
            text: 'إتمام لابات CKA الأساسية (Networking, Storage, RBAC, Scheduling)',
            details: 'حل تمارين الإدارة العملية في بيئة Kubernetes',
            estimatedHours: 6,
            done: false
          }
        ]
      },
      {
        id: 'm4-3',
        code: '4.3',
        title: 'Observability Basics (/metrics, Prometheus & Grafana)',
        hours: 10,
        estimatedMinutes: 600,
        category: 'Hands-on Lab',
        difficulty: 'Medium',
        defaultStatus: 'pending',
        tags: ['Prometheus', 'PCA', 'Grafana'],
        objectives: ['تصدير مقاييس Prometheus على /metrics وربط Grafana لقراءتها.'],
        bestPractices: [
          'استخدام مقاييس Counter و Histogram للطلبات وزمن الاستجابة، وتجنب High-Cardinality labels.',
          'تتبع إشارات RED (Rate, Errors, Duration) لكل Endpoint مهم.'
        ],
        requiredTools: ['Prometheus', 'prometheus_client', 'Grafana', 'PromQL'],
        exampleCode: `# استعلام PromQL لمعدل الأخطاء وزمن الاستجابة:
rate(http_requests_total{status=~"5.."}[5m])
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))`,
        masteryCriteria: 'نقطة /metrics تعيد مقاييس HTTP والعملية وتظهر في Prometheus.',
        whatYouDo: 'دراسة Prep Course - Prometheus Certified Associate (PCA) وتطبيق /metrics.',
        deliverable: 'مراقبة حية لـ HiveBox عبر Prometheus و Grafana.',
        resources: [
          { label: 'KodeKloud: Prometheus Certified Associate (PCA) (Sanjeev T.)', url: 'https://kodekloud.com/', type: 'KodeKloud' }
        ],
        subtasks: [
          {
            id: 'm4-3-s1',
            text: 'إضافة Endpoint /metrics وتصدير Default Prometheus Metrics',
            details: 'دمج مكتبة prometheus_client أو prometheus-fastapi-instrumentator',
            estimatedHours: 2.5,
            done: false
          },
          {
            id: 'm4-3-s2',
            text: 'ربط Prometheus & Grafana وعرض المقاييس',
            details: 'ضبط Scrape Configs وإنشاء لوحة Grafana لمراقبة HTTP requests و latency',
            estimatedHours: 2.5,
            done: false
          },
          {
            id: 'm4-3-s3',
            text: 'إتقان استعلامات PromQL الأساسية (rate, sum by, histogram_quantile)',
            details: 'حل لابات كورس PCA على KodeKloud',
            estimatedHours: 2.5,
            done: false
          },
          {
            id: 'm4-3-s4',
            text: 'إعداد Alerting Rules أولية لحالات التوقف أو ارتفاع الأخطاء',
            details: 'تحديد تنبيهات واضحة عند غياب الـ target أو زيادة 5xx',
            estimatedHours: 2.5,
            done: false
          }
        ]
      },
      {
        id: 'm4-4',
        code: '4.4',
        title: 'Cloud Computing Fundamentals (AWS Core)',
        hours: 12,
        estimatedMinutes: 720,
        category: 'Hands-on Lab',
        difficulty: 'Medium',
        defaultStatus: 'pending',
        tags: ['AWS', 'EC2', 'VPC', 'IAM', 'S3', 'ECR'],
        objectives: ['فهم وإتقان خدمات AWS الأساسية: EC2, VPC, Subnets, Security Groups, IAM, S3, ECR.'],
        bestPractices: [
          'تطبيق مبدأ Least Privilege في IAM Policies واستخدام IAM Roles بدلاً من مفاتيح دائمة.',
          'عزل قواعد البيانات والخدمات الداخلية في Private Subnets داخل VPC.'
        ],
        requiredTools: ['AWS IAM', 'AWS VPC', 'AWS EC2', 'AWS S3 & ECR'],
        exampleCode: `# بناء ورفع صورة إلى Amazon ECR:
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <acct>.dkr.ecr.us-east-1.amazonaws.com
docker push <acct>.dkr.ecr.us-east-1.amazonaws.com/hivebox:v0.2.0`,
        masteryCriteria: 'إعداد شبكة VPC معزولة وصلاحيات IAM آمنة وحفظ صور في ECR.',
        whatYouDo: 'دراسة كورسات AWS على KodeKloud و AWS SAA-C03 بالعربي.',
        deliverable: 'بنية AWS أساسية جاهزة للمرحلة التالية.',
        resources: [
          { label: 'KodeKloud: AWS Cloud Practitioner (CLF-C02)', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'KodeKloud: AWS Solutions Architect Associate (SAA) & Labs', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'Ahmed Elfakharany: AWS SAA-C03 Arabic (Udemy)', url: 'https://www.udemy.com/course/aws-solutions-architect-associate-saa-c03-in-arabic/', type: 'Udemy Arabic' },
          { label: 'Vishakha Sadhwani: 200+ AWS Services Explained', url: 'https://www.youtube.com/@VishakhaSadhwani', type: 'YouTube' }
        ],
        subtasks: [
          {
            id: 'm4-4-s1',
            text: 'IAM (Users, Roles, Policies) + S3 + ECR',
            details: 'ضبط الصلاحيات والتخزين الكائني ومستودع صور الحاويات',
            estimatedHours: 3,
            done: false
          },
          {
            id: 'm4-4-s2',
            text: 'VPC (Subnets, Route Tables, Security Groups) + EC2',
            details: 'تصميم شبكة Public/Private Subnets وربط Internet Gateway و NAT',
            estimatedHours: 3,
            done: false
          },
          {
            id: 'm4-4-s3',
            text: 'فهم موازنات الأحمال (ALB/NLB) و Auto Scaling Groups',
            details: 'توزيع الترافيك وتحقيق التوفر العالي عبر أكثر من Availability Zone',
            estimatedHours: 3,
            done: false
          },
          {
            id: 'm4-4-s4',
            text: 'إتمام اللابات التطبيقية لـ AWS For Beginners / SAA',
            details: 'تطبيق نشر خدمة بسيطة خلف Load Balancer على AWS',
            estimatedHours: 3,
            done: false
          }
        ]
      },
      {
        id: 'm4-5',
        code: '4.5',
        title: 'System Design Part 2 (Modules 2–5 + 7 Labs)',
        hours: 8,
        estimatedMinutes: 480,
        category: 'Video / Reading',
        difficulty: 'Medium',
        defaultStatus: 'pending',
        tags: ['System Design', 'Caching', 'Queues', 'Replication'],
        objectives: ['استكمال Modules 2–5 واللابات الـ 7 المتبقية (بعد إتمام Module 1 مسبقاً).'],
        bestPractices: [
          'استخدام Cache-Aside مع TTL مناسب لتخفيف الضغط على APIs الخارجية وقواعد البيانات.',
          'فصل العمليات البطيئة أو القابلة لإعادة المحاولة عبر Message Queues.'
        ],
        requiredTools: ['System Design Patterns', 'Caching', 'Message Queues', 'Load Balancing'],
        exampleCode: `# قرار معماري في HiveBox:
Client -> Ingress -> FastAPI -> Valkey Cache (TTL 5m)
                             -> MinIO S3 (Snapshot Archive)`,
        masteryCriteria: 'استيعاب أنماط Caching, Queues, Replication و Self-Healing.',
        whatYouDo: 'إكمال كورس System Design For Beginners على KodeKloud.',
        deliverable: 'إغلاق كورس System Design كاملاً.',
        resources: [
          { label: 'KodeKloud: System Design For Beginners (Aditya C.) — M2-5 + 7 Labs', url: 'https://app.kodekloud.com/learn/course/system-design-for-beginners/overview', type: 'KodeKloud' },
          { label: 'Vishakha Sadhwani: System Design Crash Course', url: 'https://www.youtube.com/@VishakhaSadhwani', type: 'YouTube' }
        ],
        subtasks: [
          {
            id: 'm4-5-s1',
            text: 'إنهاء Module 1 (مكتمل مسبقاً)',
            details: 'الأساسيات الأولى لمعمارية الأنظمة الموزعة',
            estimatedHours: 2,
            done: true
          },
          {
            id: 'm4-5-s2',
            text: 'استكمال Modules 2–5 + 7 Labs (Caching, Queues, Replication, Self-Healing)',
            details: 'دراسة أنماط التوسع والتخزين المؤقت والموثوقية وتطبيقها',
            estimatedHours: 2,
            done: false
          },
          {
            id: 'm4-5-s3',
            text: 'حل الـ 7 Labs العملية داخل الكورس على KodeKloud',
            details: 'تطبيق سيناريوهات موازنة الأحمال والكاش والتكرار',
            estimatedHours: 2,
            done: false
          },
          {
            id: 'm4-5-s4',
            text: 'مواءمة مفاهيم Caching و Storage مع خطة HiveBox Phase 5',
            details: 'رسم تدفق الكاش والتخزين الكائني قبل البدء بالترميز',
            estimatedHours: 2,
            done: false
          }
        ]
      },
      {
        id: 'm4-6',
        code: '4.6',
        title: 'تسليم HiveBox Phase 4 (Integration Tests, SonarQube, Terrascan & CD)',
        hours: 8,
        estimatedMinutes: 480,
        category: 'Project Delivery',
        difficulty: 'Hard',
        defaultStatus: 'pending',
        tags: ['SonarQube', 'Terrascan', 'GHCR', 'CD'],
        objectives: ['ربط اختبارات التكامل + SonarQube/Semgrep + Terrascan + رفع صورة GHCR عبر CD.'],
        bestPractices: [
          'تطبيق Quality Gates في SonarQube/Semgrep و IaC scan عبر Terrascan في كل PR.',
          'وسم صور GHCR برقم الإصدار Semantic Version وعدم استخدام :latest.'
        ],
        requiredTools: ['Integration Tests', 'SonarQube / Semgrep', 'Terrascan', 'GHCR', 'Kind'],
        exampleCode: `# في CD Workflow بعد الدمج في main:
docker build -t ghcr.io/yossefbelal1/hivebox:v0.2.0 .
docker push ghcr.io/yossefbelal1/hivebox:v0.2.0`,
        masteryCriteria: 'الـ CI يفحص الكود والمانيفستس والـ CD ينشر الصورة برقم إصدار على GHCR.',
        whatYouDo: 'تنفيذ متطلبات Phase 4 الكاملة ورفعها كـ PR.',
        deliverable: 'إغلاق HiveBox Phase 4 على GitHub.',
        resources: [{ label: 'HiveBox Phase 4 Spec', url: 'https://devopsroadmap.io/projects/hivebox/', type: 'Roadmap / Docs' }],
        subtasks: [
          {
            id: 'm4-6-s1',
            text: 'تشغيل Integration Tests + SonarQube/Semgrep + Terrascan في CI',
            details: 'التحقق من تكامل التطبيق وفحص جودة الكود وملفات Kubernetes',
            estimatedHours: 2,
            done: false
          },
          {
            id: 'm4-6-s2',
            text: 'بناء CD Workflow لرفع الصورة الموسومة بالإصدار إلى GHCR',
            details: 'نشر Image مرقمة باستخدام GITHUB_TOKEN تلقائياً',
            estimatedHours: 2,
            done: false
          },
          {
            id: 'm4-6-s3',
            text: 'تشغيل HiveBox على Kind + Ingress-Nginx والتحقق من /temperature و /metrics',
            details: 'اختبار الوصول عبر Ingress وتصدير المقاييس',
            estimatedHours: 2,
            done: false
          },
          {
            id: 'm4-6-s4',
            text: 'دمج PR المرحلة الرابعة وتحديث لوحة Kanban واجتياز كويز Module 4',
            details: 'إغلاق Phase 4 نظيفاً قبل الانتقال إلى Module 5',
            estimatedHours: 2,
            done: false
          }
        ]
      }
    ]
  },

  {
    id: 'module-5',
    number: '05',
    badge: 'أبريل 2027 • الشهر 5',
    title: 'Transform — Finishing the Structure',
    subtitle: 'Valkey Cache، MinIO Storage، اختبارات Venom E2E، Terraform IaC، و Helm & Kustomize + HiveBox Phase 5.',
    monthRange: 'أبريل 2027 (الشهر 5)',
    estimatedHours: 45,
    cardTheme: 'from-[#4C1D95] via-[#3B0764] to-[#2E1065]',
    techIcons: ['terraform', 'helm', 'database', 'kubernetes'],
    sections: [
      { title: 'الكاش والتخزين والتغليف', topicIds: ['m5-1', 'm5-2'] },
      { title: 'Terraform IaC و Venom E2E', topicIds: ['m5-3', 'm5-4'] }
    ],
    topics: [
      {
        id: 'm5-1',
        code: '5.1',
        title: 'Valkey Cache, MinIO Object Storage & /readyz Probe',
        hours: 12,
        estimatedMinutes: 720,
        category: 'Coding',
        difficulty: 'Hard',
        defaultStatus: 'pending',
        tags: ['Valkey', 'MinIO', '/readyz', 'Integration'],
        objectives: [
          'إضافة Valkey (دورة 5 دقائق) + /cache و MinIO S3-compatible (دورة 5 دقائق) + /store.',
          'بناء /readyz الذكي ومقاييس Prometheus المخصصة.'
        ],
        bestPractices: [
          'تحديث الكاش كل 5 دقائق بالخلفية مع دعم التحديث اليدوي عبر /cache و /store.',
          'ربط /readyz بشرط 50%+1 من الحساسات وصلاحية الكاش و MinIO (< دورتين = 10 دقائق).'
        ],
        requiredTools: ['Valkey (Redis-compatible)', 'MinIO (S3)', 'FastAPI', 'Prometheus'],
        exampleCode: `# شروط /readyz:
if unavailable_boxes > total_boxes / 2:
    raise HTTPException(503, "Too many sensors unreachable")
if cache_age_sec > 600 or minio_age_sec > 600:
    raise HTTPException(503, "Stale cache/storage (>2 cycles)")
return {"status": "ready"}`,
        masteryCriteria: 'تحقق /readyz من توفر 50%+1 من الحساسات وحداثة بيانات Valkey و MinIO (< دورتين).',
        whatYouDo: 'دمج Valkey و MinIO في HiveBox وتحديث /temperature ليقرأ من الكاش.',
        deliverable: 'نقاط /cache, /store, /readyz ومقاييس مخصصة شغالة.',
        resources: [{ label: 'HiveBox Phase 5 Spec', url: 'https://devopsroadmap.io/projects/hivebox/', type: 'Roadmap / Docs' }],
        subtasks: [
          {
            id: 'm5-1-s1',
            text: 'دمج Valkey Cache بدورة 5 دقائق + Endpoint /cache',
            details: 'تخزين قراءات الحساسات مؤقتاً وتحديثها من المهام الخلفية',
            estimatedHours: 3,
            done: false
          },
          {
            id: 'm5-1-s2',
            text: 'دمج MinIO S3-compatible Storage + Endpoint /store',
            details: 'حفظ اللقطات الدورية في Bucket عبر S3 SDK',
            estimatedHours: 3,
            done: false
          },
          {
            id: 'm5-1-s3',
            text: 'تطوير /readyz Probe وتوسيع /metrics بمقاييس مخصصة',
            details: 'فحص صحة الاتصال وحداثة البيانات وتصدير مقاييس الكاش والتخزين',
            estimatedHours: 3,
            done: false
          },
          {
            id: 'm5-1-s4',
            text: 'كتابة اختبارات التكامل لنقاط /cache و /store و /readyz',
            details: 'اختبار سيناريوهات تعطل Valkey أو تقادم البيانات',
            estimatedHours: 3,
            done: false
          }
        ]
      },
      {
        id: 'm5-2',
        code: '5.2',
        title: 'Kubernetes Packaging: Helm & Kustomize',
        hours: 11,
        estimatedMinutes: 660,
        category: 'Hands-on Lab',
        difficulty: 'Medium',
        defaultStatus: 'pending',
        tags: ['Helm', 'Kustomize', 'Security'],
        objectives: ['تغليف التطبيق بـ Helm وإدارة Valkey و MinIO عبر Kustomize + K8s Security.'],
        bestPractices: [
          'استخدام Helm لقوالب التطبيق القابلة للتخصيص عبر values.yaml.',
          'استخدام Kustomize Overlays لإدارة بيئات البنية التحتية بدون تكرار YAML.'
        ],
        requiredTools: ['Helm v3', 'Kustomize', 'kubectl', 'Readiness Probes'],
        exampleCode: `helm lint ./charts/hivebox
helm template hivebox ./charts/hivebox -f values.yaml
kubectl apply -k k8s/infra/overlays/dev`,
        masteryCriteria: 'نشر كامل المنظومة بـ Helm و Kustomize مع ضبط /readyz كـ Readiness Probe.',
        whatYouDo: 'دراسة كورسات Helm و Kustomize على KodeKloud وتطبيقها على HiveBox.',
        deliverable: 'Helm Chart + Kustomize Manifests متكاملة.',
        resources: [
          { label: 'KodeKloud: Helm for Beginners (Mumshad M.)', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'KodeKloud: Kustomize (Sanjeev T.)', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'Vishakha Sadhwani: Full Stack AI DevOps Course', url: 'https://www.youtube.com/watch?v=Kb-sw00KJ10', type: 'YouTube' }
        ],
        subtasks: [
          {
            id: 'm5-2-s1',
            text: 'إنشاء Helm Chart لتطبيق HiveBox وتفعيل /readyz probe',
            details: 'بناء Chart.yaml و values.yaml و templates/ وتمرير helm lint',
            estimatedHours: 3,
            done: false
          },
          {
            id: 'm5-2-s2',
            text: 'إنشاء Kustomize manifests للبنية التحتية (Valkey, MinIO) ومراجعة K8s Security',
            details: 'تجهيز base/ و overlays/ وضبط Secrets و SecurityContext',
            estimatedHours: 3,
            done: false
          },
          {
            id: 'm5-2-s3',
            text: 'اختبار نشر التطبيق + Valkey + MinIO داخل Kind عبر Helm & Kustomize',
            details: 'التحقق من ارتباط الخدمات ونجاح /readyz في Kubernetes',
            estimatedHours: 2.5,
            done: false
          },
          {
            id: 'm5-2-s4',
            text: 'تطبيق قواعد NetworkPolicy وحدود الموارد لكل مكون',
            details: 'تقييد التواصل الداخلي لحماية Valkey و MinIO',
            estimatedHours: 2.5,
            done: false
          }
        ]
      },
      {
        id: 'm5-3',
        code: '5.3',
        title: 'Infrastructure as Code: Terraform & Grafana Agent',
        hours: 14,
        estimatedMinutes: 840,
        category: 'Hands-on Lab',
        difficulty: 'Hard',
        defaultStatus: 'pending',
        tags: ['Terraform', 'IaC', 'Grafana Agent'],
        objectives: ['بناء كلاستر Kubernetes بالكود عبر Terraform ونشر Grafana Agent للـ Logs/Metrics.'],
        bestPractices: [
          'تنظيم كود Terraform في Modules قابلة لإعادة الاستخدام مع State Locking و Remote Backend.',
          'عدم تخزين ملفات .tfstate أو الأسرار في Git أبداً.'
        ],
        requiredTools: ['Terraform', 'Terraform Modules', 'Grafana Agent', 'Kind / Cloud Provider'],
        exampleCode: `terraform init
terraform fmt -check
terraform validate
terraform plan -out=tfplan && terraform apply tfplan`,
        masteryCriteria: 'إنشاء الكلاستر كاملاً عبر Terraform IaC بدون خطوات يدوية.',
        whatYouDo: 'إتمام كورس Terraform Basics (Vijin Palazhi) وبناء بنية Phase 5.',
        deliverable: 'كود Terraform منظم بالـ Modules والـ State الآمن.',
        resources: [
          { label: 'KodeKloud: Terraform Basics Training (Vijin Palazhi)', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'Vishakha Sadhwani: Terraform with AWS', url: 'https://www.youtube.com/@VishakhaSadhwani', type: 'YouTube' }
        ],
        subtasks: [
          {
            id: 'm5-3-s1',
            text: 'إتقان Providers, Resources, State, Variables, Outputs, Modules',
            details: 'حل كافة لابات Terraform Basics Training على KodeKloud',
            estimatedHours: 3.5,
            done: false
          },
          {
            id: 'm5-3-s2',
            text: 'إنشاء Kubernetes Cluster بـ Terraform + نشر Grafana Agent (Loki/Grafana)',
            details: 'تعريف الكلاستر و Ingress ووكلاء الرصد بالكود البرمجي',
            estimatedHours: 3.5,
            done: false
          },
          {
            id: 'm5-3-s3',
            text: 'إعداد Remote State آمن وفحص الكود بأدوات terraform fmt و validate',
            details: 'حماية الحالة ومنع التضارب عند التشغيل الآلي',
            estimatedHours: 3.5,
            done: false
          },
          {
            id: 'm5-3-s4',
            text: 'ربط فحص Terrascan على ملفات Terraform في خط الـ CI',
            details: 'منع الإعدادات غير الآمنة قبل تطبيق البنية التحتية',
            estimatedHours: 3.5,
            done: false
          }
        ]
      },
      {
        id: 'm5-4',
        code: '5.4',
        title: 'Venom E2E Tests & تسليم HiveBox Phase 5',
        hours: 8,
        estimatedMinutes: 480,
        category: 'Project Delivery',
        difficulty: 'Hard',
        defaultStatus: 'pending',
        tags: ['Venom', 'E2E', 'HiveBox Phase 5'],
        objectives: ['كتابة اختبارات End-to-End باستخدام Venom على كلاستر Kind الحي.'],
        bestPractices: [
          'اختبار التدفق الكامل داخل الكلاستر: /readyz -> /cache -> /store -> /temperature.',
          'أتمتة إنشاء Kind وتدميره داخل CI job لضمان نظافة الاختبار.'
        ],
        requiredTools: ['Venom E2E', 'Kind', 'GitHub Actions', 'HiveBox Repo'],
        exampleCode: `name: HiveBox E2E Suite
testcases:
  - name: Check readiness and endpoints
    steps:
      - type: http
        method: GET
        url: http://localhost/readyz
        assertions:
          - result.statuscode ShouldEqual 200`,
        masteryCriteria: 'الـ Pipeline ينشئ Kind ويشغل البنية ويجتاز اختبارات Venom.',
        whatYouDo: 'إنشاء Venom Test Suite وإتمام Phase 5.',
        deliverable: 'إغلاق HiveBox Phase 5 بالكامل.',
        resources: [{ label: 'HiveBox Phase 5 Spec', url: 'https://devopsroadmap.io/projects/hivebox/', type: 'Roadmap / Docs' }],
        subtasks: [
          {
            id: 'm5-4-s1',
            text: 'بناء Venom E2E Test Suite وتشغيله على Kind مع البنية الكاملة',
            details: 'تغطية نقاط /version و /temperature و /cache و /store و /readyz و /metrics',
            estimatedHours: 2,
            done: false
          },
          {
            id: 'm5-4-s2',
            text: 'دمج Venom Test Job تلقائياً في GitHub Actions Workflow',
            details: 'تشغيل الكلاستر ونشر Helm/Kustomize وتنفيذ Venom في الـ CI',
            estimatedHours: 2,
            done: false
          },
          {
            id: 'm5-4-s3',
            text: 'تحديث README بمعمارية Valkey/MinIO/Terraform وإصدار Tag v0.3.0',
            details: 'توثيق خطوات تشغيل المنظومة المتكاملة محلياً',
            estimatedHours: 2,
            done: false
          },
          {
            id: 'm5-4-s4',
            text: 'دمج PR المرحلة الخامسة ونقل الكارت إلى Done واجتياز كويز Module 5',
            details: 'تحقيق 15/15 في كويز Module 5 وإغلاق المرحلة',
            estimatedHours: 2,
            done: false
          }
        ]
      }
    ]
  },

  {
    id: 'module-6',
    number: '06',
    badge: 'مايو 2027 • بداية التقديم',
    title: 'Optimize — Keep Improving',
    subtitle: 'DevSecOps (Trivy, KCSA, Kyverno)، سجلات Grafana Loki، و GitOps عبر Argo CD + ExternalDNS/Cert-Manager + HiveBox Phase 6.',
    monthRange: 'مايو 2027 (الشهر 6)',
    estimatedHours: 45,
    cardTheme: 'from-[#0F766E] via-[#115E59] to-[#042F2E]',
    techIcons: ['argocd', 'security', 'grafana', 'prometheus'],
    sections: [
      { title: 'أمان سلسلة التوريد وسجلات Loki', topicIds: ['m6-1', 'm6-2'] },
      { title: 'GitOps عبر Argo CD و Phase 6', topicIds: ['m6-3', 'm6-4'] }
    ],
    topics: [
      {
        id: 'm6-1',
        code: '6.1',
        title: 'DevSecOps & Supply Chain Security (Trivy, KCSA & Kyverno)',
        hours: 12,
        estimatedMinutes: 720,
        category: 'Hands-on Lab',
        difficulty: 'Hard',
        defaultStatus: 'pending',
        tags: ['Trivy', 'KCSA', 'DevSecOps', 'Kyverno'],
        objectives: [
          'فحص الصور بـ Trivy ومنع الثغرات الحرجة وتطبيق Least Privilege.',
          'تفعيل Dependabot واستكشاف Kyverno Policy-as-Code.'
        ],
        bestPractices: [
          'فشل الـ Pipeline تلقائياً عند وجود ثغرات HIGH أو CRITICAL في Trivy.',
          'تفعيل Dependabot لتحديث اعتماديات Python و Docker و GitHub Actions باستمرار.'
        ],
        requiredTools: ['Trivy', 'Dependabot', 'Kyverno', 'KCSA Security Controls'],
        exampleCode: `trivy image --exit-code 1 --severity HIGH,CRITICAL ghcr.io/yossefbelal1/hivebox:v0.3.0
trivy config ./k8s/`,
        masteryCriteria: 'أتمتة كاملة لأمان الصور والاعتماديات وسياسات الكلاستر.',
        whatYouDo: 'دراسة كورسات DevSecOps و KCSA وتطبيقها في HiveBox.',
        deliverable: 'خط إنتاج مؤمن بالكامل من الكود حتى التشغيل.',
        resources: [
          { label: 'KodeKloud: DevSecOps - K8s DevOps & Security (Barahalikar S.)', url: 'https://kodekloud.com/courses/devsecops', type: 'KodeKloud' },
          { label: 'KodeKloud: K8s & Cloud Native Security Associate (KCSA)', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'Ahmed Elfakharany: DevSecOps Arabic', url: 'https://www.youtube.com/watch?v=swJNs0Opg6E', type: 'YouTube' },
          { label: 'Vishakha Sadhwani: K8s Security Best Practices', url: 'https://www.youtube.com/@VishakhaSadhwani', type: 'YouTube' }
        ],
        subtasks: [
          {
            id: 'm6-1-s1',
            text: 'تفعيل Trivy Scanner و Dependabot وتطبيق Least Privilege',
            details: 'دمج فحص Trivy للصور وملفات IaC وإضافة .github/dependabot.yml',
            estimatedHours: 3,
            done: false
          },
          {
            id: 'm6-1-s2',
            text: 'إعداد سياسات Kyverno أو معايير KCSA الأمنية',
            details: 'تطبيق سياسات منع تشغيل الحاويات بصلاحيات root أو صور بدون tag',
            estimatedHours: 3,
            done: false
          },
          {
            id: 'm6-1-s3',
            text: 'تطبيق RBAC وتأمين Kubernetes Secrets و Pod Security Standards',
            details: 'تقييد أذونات ServiceAccounts في الكلاستر',
            estimatedHours: 3,
            done: false
          },
          {
            id: 'm6-1-s4',
            text: 'إنهاء لابات DevSecOps & KCSA على KodeKloud',
            details: 'مراجعة أمن سلسلة التوريد و SBOM وتوقيع الصور',
            estimatedHours: 3,
            done: false
          }
        ]
      },
      {
        id: 'm6-2',
        code: '6.2',
        title: 'Log Aggregation & Observability (Grafana Loki)',
        hours: 10,
        estimatedMinutes: 600,
        category: 'Hands-on Lab',
        difficulty: 'Medium',
        defaultStatus: 'pending',
        tags: ['Grafana Loki', 'Logs', 'Self-hosted'],
        objectives: ['تشغيل Grafana Loki واستبدال الخدمات الخارجية ببدائل Open-Source داخل الكلاستر.'],
        bestPractices: [
          'فهرسة الـ Labels فقط في Loki وتفادي Labels عالية التغير مثل user_id أو request_id.',
          'ربط السجلات مع مقاييس Prometheus في لوحة Grafana موحدة.'
        ],
        requiredTools: ['Grafana Loki', 'Promtail / Grafana Alloy', 'LogQL', 'Grafana'],
        exampleCode: `# استعلام LogQL لتتبع أخطاء HiveBox:
{app="hivebox", namespace="default"} |= "ERROR" | json`,
        masteryCriteria: 'جمع وتحليل كافة سجلات الحاويات في Grafana Loki بنجاح.',
        whatYouDo: 'دراسة كورس Grafana Loki (Nourhan M.) وتشغيله داخل Kubernetes.',
        deliverable: 'مكدس مراقبة وسجلات Open-Source ذاتي الاستضافة.',
        resources: [
          { label: 'KodeKloud: Grafana Loki (Nourhan M.)', url: 'https://kodekloud.com/', type: 'KodeKloud' }
        ],
        subtasks: [
          {
            id: 'm6-2-s1',
            text: 'تشغيل Grafana Loki & Promtail واستعراض السجلات في Grafana',
            details: 'نشر Loki stack داخل Kubernetes وربطه كـ Data Source في Grafana',
            estimatedHours: 2.5,
            done: false
          },
          {
            id: 'm6-2-s2',
            text: 'إتقان استعلامات LogQL لتصفية أخطاء التطبيق وسجلات Ingress',
            details: 'تحليل أخطاء الـ 5xx وتحديد السبب الجذري من السجلات',
            estimatedHours: 2.5,
            done: false
          },
          {
            id: 'm6-2-s3',
            text: 'بناء لوحة Observability موحدة تجمع Metrics (Prometheus) + Logs (Loki)',
            details: 'عرض الحالة الصحية الكاملة للخدمة في شاشة واحدة',
            estimatedHours: 2.5,
            done: false
          },
          {
            id: 'm6-2-s4',
            text: 'إحلال الأدوات ذاتية الاستضافة محل الخدمات السحابية المدفوعة',
            details: 'التحقق من استقلالية مكدس المراقبة بالكامل داخل الكلاستر',
            estimatedHours: 2.5,
            done: false
          }
        ]
      },
      {
        id: 'm6-3',
        code: '6.3',
        title: 'GitOps & Continuous Deployment (Argo CD, ExternalDNS & Cert-Manager)',
        hours: 15,
        estimatedMinutes: 900,
        category: 'Hands-on Lab',
        difficulty: 'Hard',
        defaultStatus: 'pending',
        tags: ['Argo CD', 'GitOps', 'ExternalDNS', 'Cert-Manager'],
        objectives: [
          'أتمتة النشر عبر Argo CD بنمط GitOps التصريحي.',
          'ضبط ExternalDNS و Cert-Manager لإصدار شهادات TLS تلقائياً.'
        ],
        bestPractices: [
          'اعتماد Pull-based GitOps بحيث يكون مستودع Git هو Source of Truth الوحيد.',
          'تفعيل automated sync + prune + selfHeal في Argo CD Application.'
        ],
        requiredTools: ['Argo CD', 'ExternalDNS', 'Cert-Manager', 'Let’s Encrypt'],
        exampleCode: `apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: hivebox
spec:
  syncPolicy:
    automated:
      prune: true
      selfHeal: true`,
        masteryCriteria: 'أي تحديث في مستودع الـ GitOps ينعكس على الكلاستر تلقائياً مع شهادة HTTPS.',
        whatYouDo: 'دراسة كورس GitOps with ArgoCD وفيديو أحمد الفخراني وتطبيقها.',
        deliverable: 'نظام نشر GitOps متكامل مع TLS و DNS تلقائي.',
        resources: [
          { label: 'KodeKloud: GitOps with ArgoCD (Barahalikar S.)', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'Ahmed Elfakharany: Argo CD Arabic (YouTube)', url: 'https://www.youtube.com/watch?v=C0xRfrNIRak', type: 'YouTube' },
          { label: 'Ahmed Elfakharany: Argo CD & GitOps Master Class (Udemy Arabic)', url: 'https://www.udemy.com/course/argo-cd-and-gitops-on-kubernetes-master-class-arabic/', type: 'Udemy Arabic' }
        ],
        subtasks: [
          {
            id: 'm6-3-s1',
            text: 'تثبيت Argo CD وتفعيل Auto-Sync و Self-Heal',
            details: 'ربط Argo CD بمستودع الإعدادات والتحقق من المزامنة التلقائية',
            estimatedHours: 4,
            done: false
          },
          {
            id: 'm6-3-s2',
            text: 'تجهيز ExternalDNS و Cert-Manager (Let’s Encrypt)',
            details: 'إعداد ClusterIssuer وتجديد شهادات TLS تلقائياً للـ Ingress',
            estimatedHours: 4,
            done: false
          },
          {
            id: 'm6-3-s3',
            text: 'اختبار تحديث إصدار الصورة من Git ورصد النشر التلقائي في Argo CD',
            details: 'التحقق من Rollout آمن بدون تدخل kubectl يدوي',
            estimatedHours: 3.5,
            done: false
          },
          {
            id: 'm6-3-s4',
            text: 'إنهاء لابات كورس GitOps with ArgoCD وإدارة الحالات المتعددة',
            details: 'فهم App-of-Apps pattern والتراجع التلقائي عند الفشل',
            estimatedHours: 3.5,
            done: false
          }
        ]
      },
      {
        id: 'm6-4',
        code: '6.4',
        title: 'تسليم HiveBox Phase 6 وبداية Upwork',
        hours: 8,
        estimatedMinutes: 480,
        category: 'Project Delivery',
        difficulty: 'Medium',
        defaultStatus: 'pending',
        tags: ['HiveBox Phase 6', 'Upwork'],
        objectives: ['إغلاق HiveBox Phase 6 بالكامل وبدء مهام Upwork المصغرة.'],
        bestPractices: [
          'إغلاق المتطلبات الأساسية في Phase 6 أولاً مع فصل التحسينات الاختيارية (Kyverno/TestKube/Operator).',
          'استخدام مشروع HiveBox الموثق كدليل عملي في ملف Upwork و GitHub.'
        ],
        requiredTools: ['GitHub', 'Argo CD', 'Upwork Profile', 'HiveBox Repo'],
        exampleCode: `argocd app get hivebox
kubectl get certificate -A
# تحديث حالة Kanban وإطلاق عروض Upwork المصغرة`,
        masteryCriteria: 'اكتمال HiveBox من Phase 1 إلى Phase 6 بجودة إنتاجية.',
        whatYouDo: 'إنهاء التحسينات وتوثيقها وإطلاق عروض Upwork المصغرة.',
        deliverable: 'مشروع HiveBox كامل في البورتفوليو.',
        resources: [{ label: 'HiveBox Phase 6 Spec', url: 'https://devopsroadmap.io/projects/hivebox/', type: 'Roadmap / Docs' }],
        subtasks: [
          {
            id: 'm6-4-s1',
            text: 'تسليم HiveBox Phase 6 كاملاً على GitHub',
            details: 'دمج PR المرحلة السادسة وإغلاق لوحة Kanban الخاصة بـ HiveBox',
            estimatedHours: 2,
            done: false
          },
          {
            id: 'm6-4-s2',
            text: 'بدء التقديم على تاسكات Upwork المصغرة (Docker, Nginx, Backup, CI)',
            details: 'إعداد ملف شخصي احترافي مع عينات حقيقية من HiveBox و AutoTele',
            estimatedHours: 2,
            done: false
          },
          {
            id: 'm6-4-s3',
            text: 'توثيق معمارية HiveBox النهائية (Phases 1–6) في README احترافي',
            details: 'إضافة رسم معماري وأوامر التشغيل السريع والنتائج القابلة للقياس',
            estimatedHours: 2,
            done: false
          },
          {
            id: 'm6-4-s4',
            text: 'اجتياز كويز Module 6 (15/15) لمراجعة DevSecOps و GitOps',
            details: 'التحقق من الجاهزية التقنية لمقابلات العمل',
            estimatedHours: 2,
            done: false
          }
        ]
      }
    ]
  },

  {
    id: 'module-7',
    number: '07',
    badge: 'يونيو – يوليو 2027 • الجاهزية للسوق',
    title: 'Capstone Project & Career Readiness',
    subtitle: 'مشروع Capstone مستقل كامل + SRE & Mock Interviews + الـ CV المتوافق مع ATS + فتح مسار Bonus AI Infra.',
    monthRange: 'يونيو – يوليو 2027 (الشهران 7 و 8)',
    estimatedHours: 45,
    cardTheme: 'from-[#7F1D1D] via-[#6B1313] to-[#450A0A]',
    techIcons: ['ai', 'ansible', 'kubernetes', 'career'],
    sections: [
      { title: 'المشروع النهائي المستقل والـ SRE', topicIds: ['m7-1', 'm7-2'] },
      { title: 'الـ CV والإنترفيوهات والتجهيز للسوق', topicIds: ['m7-3', 'm7-4'] }
    ],
    topics: [
      {
        id: 'm7-1',
        code: '7.1',
        title: 'Separate End-to-End Capstone Project (Full SDLC + AI/ML Workload)',
        hours: 20,
        estimatedMinutes: 1200,
        category: 'Project Delivery',
        difficulty: 'Hard',
        defaultStatus: 'pending',
        tags: ['Capstone', 'AutoTele', 'AI Workload'],
        objectives: [
          'تصميم وتنفيذ مشروع End-to-End مستقل (غير HiveBox) يطبق IaC + CI/CD + K8s + GitOps + Observability.',
          'تضمين خدمة AI/ML Inference محاواة على Kubernetes مع مراقبة Prometheus.'
        ],
        bestPractices: [
          'بناء المشروع في مستودع مستقل تماماً عن HiveBox لإثبات القدرة على التصميم من الصفر.',
          'دمج IaC + CI/CD + Trivy + K8s + Argo CD + Observability + Containerized AI/ML Workload.'
        ],
        requiredTools: ['Terraform', 'GitHub Actions', 'Kubernetes', 'Argo CD', 'Prometheus/Loki', 'AI/ML Inference'],
        exampleCode: `# مستودع مستقل جديد للـ Capstone (بجانب AutoTele):
terraform apply -> GitHub Actions CI/CD -> GHCR -> Argo CD -> K8s + AI Inference Pod`,
        masteryCriteria: 'مشروع أصيل موثق بمعمارية واضحة و CI/CD و Observability كاملة.',
        whatYouDo: 'تطبيق أفكار المشاريع القيّمة من الفيديوهات الاستراتيجية وترقية AutoTele.',
        deliverable: 'مشروع Capstone مستقل + توثيق AutoTele المحدث.',
        resources: [
          { label: 'Vishakha Sadhwani: End-To-End DevOps + AIOps Project', url: 'https://www.youtube.com/watch?v=UBzYwNbFCKs', type: 'YouTube' },
          { label: 'Vishakha Sadhwani: AI Infrastructure CRASH COURSE', url: 'https://www.youtube.com/@VishakhaSadhwani', type: 'YouTube' },
          { label: 'KodeKloud: Fundamentals of MLOps', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'KodeKloud: AI Infrastructure — LLM-D, vLLM and GPUs', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'Tech5ense: DevOps & Cloud Engineering Portal', url: 'https://www.tech5ense.com/', type: 'Roadmap / Docs' },
          { label: 'AutoTele Repo (yossefbelal1/AutoTele)', url: 'https://github.com/yossefbelal1/AutoTele', type: 'Roadmap / Docs' }
        ],
        subtasks: [
          {
            id: 'm7-1-s1',
            text: 'تطوير Capstone Project مستقل يجمع IaC + CI/CD + K8s + GitOps + Observability',
            details: 'تصميم نظام أصيل في مستودع مستقل مع رسومات C4 وبنية Terraform و Argo CD',
            estimatedHours: 5,
            done: false
          },
          {
            id: 'm7-1-s2',
            text: 'نشر خدمة AI/ML Inference API على Kubernetes مع مراقبة الأداء',
            details: 'تغليف نموذج Inference أو LLM Proxy وضبط HPA ومقاييس الاستجابة في Prometheus',
            estimatedHours: 5,
            done: false
          },
          {
            id: 'm7-1-s3',
            text: 'توثيق AutoTele برسومات معمارية و CI/CD محسن',
            details: 'ترقية مستودع AutoTele بملفات Docker واختبارات ورسومات توضيحية',
            estimatedHours: 5,
            done: false
          },
          {
            id: 'm7-1-s4',
            text: 'إجراء اختبار ضغط وتحقق أمني شامل (Trivy + K8s Hardening) للـ Capstone',
            details: 'توثيق نتائج الأداء والاستقرار في ملف README النهائي',
            estimatedHours: 5,
            done: false
          }
        ]
      },
      {
        id: 'm7-2',
        code: '7.2',
        title: 'Fundamentals of SRE & KodeKloud Engineer Practice',
        hours: 9,
        estimatedMinutes: 540,
        category: 'Hands-on Lab',
        difficulty: 'Medium',
        defaultStatus: 'pending',
        tags: ['SRE', '100 Days', 'KodeKloud Engineer'],
        objectives: ['فهم SLIs/SLOs/Error Budgets وتطبيق تحديات يومية حقيقية على KodeKloud Engineer.'],
        bestPractices: [
          'صياغة Post-mortems بدون لوم (Blameless Post-mortems) تركز على السبب الجذري والوقاية.',
          'موازنة سرعة إطلاق الميزات مع Error Budget لحماية استقرار الإنتاج.'
        ],
        requiredTools: ['KodeKloud Engineer', '100 Days of DevOps', 'SRE Metrics (SLI/SLO/SLA)'],
        exampleCode: `# حساب Error Budget لـ SLO = 99.9% شهرياً:
Allowed Downtime = 0.1% * 43,200 min ≈ 43.2 minutes / month`,
        masteryCriteria: 'حل تحديات عملية واقعية تحت ضغط المشاكل الإنتاجية.',
        whatYouDo: 'دراسة كورس Fundamentals of SRE وحل تحديات KodeKloud Engineer & 100 Days of DevOps.',
        deliverable: 'جاهزية عملية عالية لحل المشاكل اليومية.',
        resources: [
          { label: 'KodeKloud: Fundamentals of SRE (Jake P.)', url: 'https://kodekloud.com/courses/fundamentals-of-sre', type: 'KodeKloud' },
          { label: 'KodeKloud Engineer Practice', url: 'https://engineer.kodekloud.com/practice', type: 'Playground' },
          { label: '100 Days of DevOps', url: 'https://kodekloud.com/100-days-of-devops', type: 'Playground' }
        ],
        subtasks: [
          {
            id: 'm7-2-s1',
            text: 'إتمام Fundamentals of SRE (Jake P.)',
            details: 'استيعاب SLIs/SLOs/SLAs و Error Budgets وإدارة الحوادث',
            estimatedHours: 2.5,
            done: false
          },
          {
            id: 'm7-2-s2',
            text: 'حل تحديات يومية على KodeKloud Engineer و 100 Days of DevOps',
            details: 'تنفيذ مهام Linux و Docker و Kubernetes و Git العملية تحت مؤقت',
            estimatedHours: 2.5,
            done: false
          },
          {
            id: 'm7-2-s3',
            text: 'كتابة نموذج Blameless Post-mortem لحادثة إنتاجية محاكاة',
            details: 'توثيق الجدول الزمني للحادثة والسبب الجذري وخطوات المنع المستقبلية',
            estimatedHours: 2,
            done: false
          },
          {
            id: 'm7-2-s4',
            text: 'تطبيق Runbooks عملية لتشخيص الأعطال المتكررة بسرعة',
            details: 'توثيق خطوات الاستجابة لحالات CPU spike و Disk full و CrashLoopBackOff',
            estimatedHours: 2,
            done: false
          }
        ]
      },
      {
        id: 'm7-3',
        code: '7.3',
        title: 'CV / LinkedIn Optimization (MIS ATS) & Skills Radar',
        hours: 6,
        estimatedMinutes: 360,
        category: 'Review',
        difficulty: 'Easy',
        defaultStatus: 'pending',
        tags: ['CV', 'ATS', 'LinkedIn'],
        objectives: ['صياغة CV متوافق مع ATS بمسمى MIS Degree وإبراز HiveBox + AutoTele + Capstone.'],
        bestPractices: [
          'استخدام أفعال إنجاز واضحة مع أرقام ونتائج ملموسة وتجنب الجداول المعقدة في CV.',
          'ربط روابط GitHub المباشرة لمشاريع HiveBox و AutoTele و Capstone في رأس السيرة الذاتية.'
        ],
        requiredTools: ['ATS CV Template', 'LinkedIn', 'GitHub Profile README'],
        exampleCode: `# مثال صياغة نقطة قوية في CV:
- Engineered HiveBox REST API & GitOps pipeline (Python, Docker, Kind, Terraform, Argo CD)
  enforcing Hadolint, Trivy, pytest, and Venom E2E gates via GitHub Actions.`,
        masteryCriteria: 'CV صفحة واحدة واضح الأرقام والإنجازات + ملف LinkedIn محسن.',
        whatYouDo: 'صياغة الـ CV والـ Cover Letter وتجهيز Skills Radar.',
        deliverable: 'CV & LinkedIn جاهزان للتقديم الفوري.',
        resources: [{ label: 'Interview Best Practices', url: 'https://devopsroadmap.io/interview/best-practices/', type: 'Roadmap / Docs' }],
        subtasks: [
          {
            id: 'm7-3-s1',
            text: 'إعداد CV احترافي بمسمى Bachelor’s in MIS ونتائج المشاريع',
            details: 'صياغة السيرة الذاتية بصفحة واحدة متوافقة مع أنظمة ATS',
            estimatedHours: 1.5,
            done: false
          },
          {
            id: 'm7-3-s2',
            text: 'كتابة Cover Letter ورسم Skills Radar وتجهيز LinkedIn',
            details: 'تحديث العنوان والملخص والمشاريع المثبتة على LinkedIn',
            estimatedHours: 1.5,
            done: false
          },
          {
            id: 'm7-3-s3',
            text: 'ترتيب GitHub Profile README وتثبيت HiveBox و AutoTele و Capstone',
            details: 'تحسين الواجهة الأولى التي يراها مسؤول التوظيف التقني',
            estimatedHours: 1.5,
            done: false
          },
          {
            id: 'm7-3-s4',
            text: 'مراجعة نهائية للكلمات المفتاحية المستهدفة لوظائف Junior DevOps / SRE',
            details: 'التأكد من تطابق المهارات المكتوبة مع التطبيقات الفعلية في المستودعات',
            estimatedHours: 1.5,
            done: false
          }
        ]
      },
      {
        id: 'm7-4',
        code: '7.4',
        title: 'Mock Interviews, System Design Prep & CKA Readiness',
        hours: 10,
        estimatedMinutes: 600,
        category: 'Quiz',
        difficulty: 'Hard',
        defaultStatus: 'pending',
        tags: ['Interview Prep', 'CKA', 'Mock Interviews'],
        objectives: ['اجتياز محاكاة الإنترفيوهات التقنية وتجهيز خطة امتحان CKA.'],
        bestPractices: [
          'استخدام أسلوب STAR في الأسئلة السلوكية وشرح المفاضلات المعمارية (Trade-offs) بوضوح.',
          'التدرب على شرح معمارية HiveBox من الصفر على السبورة خلال 5 دقائق.'
        ],
        requiredTools: ['KodeKloud Interview Prep', 'System Design Prep', 'CKA Mock Exams'],
        exampleCode: `# خريطة التحضير للمقابلة:
1) 3-min HiveBox & AutoTele Architecture Pitch
2) Linux / Networking / Docker / K8s Troubleshooting Scenarios
3) CI/CD + Terraform + GitOps Trade-offs`,
        masteryCriteria: 'ثقة تامة في مقابلات Junior DevOps / Cloud / SRE.',
        whatYouDo: 'إنهاء DevOps Interview Prep و System Design for Interview Prep على KodeKloud.',
        deliverable: 'جاهزية كاملة للتوظيف في منتصف 2027 + خطة CKA.',
        resources: [
          { label: 'KodeKloud: DevOps Interview Prep (Raghunandana Sanur)', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'KodeKloud: System Design for Interview Prep (Aditya C.)', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'Vishakha Sadhwani: DevOps + AI COMPLETE Roadmap [2027]', url: 'https://www.youtube.com/watch?v=eew2ePnl5JI', type: 'YouTube' },
          { label: 'Common Interview Questions', url: 'https://devopsroadmap.io/interview/common-questions/', type: 'Roadmap / Docs' }
        ],
        subtasks: [
          {
            id: 'm7-4-s1',
            text: 'إكمال DevOps Interview Prep & System Design for Interview Prep',
            details: 'حل سيناريوهات المقابلات العملية وتصميم الأنظمة الموزعة',
            estimatedHours: 2.5,
            done: false
          },
          {
            id: 'm7-4-s2',
            text: 'بدء التقديم المكثف والتحضير لامتحان CKA الدولي',
            details: 'خطة تقديم منظمة للشركات المحلية والبعيدة مع محاكاة CKA',
            estimatedHours: 2.5,
            done: false
          },
          {
            id: 'm7-4-s3',
            text: 'إجراء 3 مقابلات تجريبية (Mock Interviews) وتدوين نقاط التحسين',
            details: 'التدرب على شرح HiveBox و AutoTele والرد على أسئلة الأعطال',
            estimatedHours: 2.5,
            done: false
          },
          {
            id: 'm7-4-s4',
            text: 'اجتياز كويز Module 7 النهائي (15/15) والتحقق من إغلاق المسار الأساسي',
            details: 'إتمام جميع الموديولات 1–7 قبل فتح مسار Bonus Track',
            estimatedHours: 2.5,
            done: false
          }
        ]
      }
    ]
  }
];

export const POST_ROADMAP_BONUS_TRACK = {
  title: 'Post-Roadmap / Bonus Track (مقفول لحين إتمام المسار الأساسي 1–7)',
  description:
    'كورسات متقدمة محفوظة في مكتبتك على KodeKloud. لا تفتحها أو تشتت نفسك بها قبل إغلاق Modules 1–7 وتسليم HiveBox بالكامل.',
  courses: [
    { title: 'Golang', instructor: 'Priyanka Yadav', category: 'Programming' },
    { title: 'Istio Service Mesh', instructor: 'Sevi Karaköse', category: 'Service Mesh' },
    { title: 'Learn Ansible Basics & Ansible Advanced', instructor: 'Mumshad Mannambeth', category: 'Config Management' },
    { title: 'AI Infrastructure: LLM-D, vLLM and GPUs', instructor: 'KodeKloud AI Track', category: 'AI Infra' },
    { title: 'KServe Fundamentals', instructor: 'KodeKloud AI Track', category: 'AI Infra' },
    { title: 'Crash Course: AI-Powered DevOps', instructor: 'KodeKloud AI Track', category: 'AI / DevOps' },
    { title: 'Building Kubernetes FinOps AI Agent', instructor: 'KodeKloud AI Track', category: 'FinOps / AI' },
    { title: 'Fundamentals of MLOps', instructor: 'KodeKloud MLOps', category: 'MLOps' },
    { title: 'AIOps Foundations', instructor: 'KodeKloud AIOps', category: 'AIOps' }
  ]
};
