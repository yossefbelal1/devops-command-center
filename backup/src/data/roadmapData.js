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
        masteryCriteria: 'القدرة على رسم وشرح تدفق SDLC الكامل وتوضيح موقع الأتمتة والأمان في كل خطوة.',
        whatYouDo: 'دراسة المفاهيم الأساسية من Dynamic DevOps Roadmap و KodeKloud DevOps Pre-Requisite.',
        deliverable: 'خريطة ذهنية لمراحل SDLC ومسؤولية مهندس الـ DevOps في كل مرحلة.',
        resources: [
          { label: 'Dynamic DevOps Roadmap', url: 'https://devopsroadmap.io/', type: 'Roadmap' },
          { label: 'KodeKloud: DevOps Pre-Requisite Course (Mumshad M.)', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'KodeKloud: Fundamentals of DevOps (Michael Forrester)', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'KodeKloud: 12 Factor App (Mumshad M.)', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'YouTube: KodeKloud DevOps Pre-Requisite', url: 'https://www.youtube.com/watch?v=PfjVXb-YXbQ', type: 'YouTube' },
          { label: 'Vishakha Sadhwani: DevOps + AI Roadmap [2027]', url: 'http://www.youtube.com/watch?v=eew2ePnl5JI', type: 'YouTube' },
          { label: 'Vishakha Sadhwani Channel', url: 'https://www.youtube.com/@VishakhaSadhwani', type: 'YouTube' }
        ],
        subtasks: [
          { id: 'm1-1-s1', text: 'فهم دورة حياة البرمجيات SDLC (Plan → Code → Build → Test → Deploy → Operate → Monitor)', done: true },
          { id: 'm1-1-s2', text: 'استيعاب الفروق بين Agile و DevOps و DevSecOps ومبدأ Shift-Left Security', done: true },
          { id: 'm1-1-s3', text: 'فهم المحاور الأساسية (Culture, Automation, Measurement) ومقدمة 12-Factor App', done: true }
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
        masteryCriteria: 'اجتياز كافة أسئلة الموديول الأول بثقة.',
        whatYouDo: 'مراجعة أسئلة المقابلات النظرية الخاصة بثقافة DevOps والـ SDLC والـ Shift-Left.',
        deliverable: 'اجتياز كويز الموديول الأول بنجاح.',
        resources: [{ label: 'Dynamic DevOps Roadmap', url: 'https://devopsroadmap.io/getting-started/', type: 'Roadmap' }],
        subtasks: [
          { id: 'm1-2-s1', text: 'اجتياز كويز الإنترفيو الخاص بالموديول الأول بنجاح', done: true }
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
        masteryCriteria: 'مستودع عام نظيف بـ README، لوحة Kanban نشطة، وكارت Phase 1 في Done.',
        whatYouDo: 'إنشاء مستودع Hivebox وتجهيز README ولوحة GitHub Project Kanban وتحديد 3 senseBox IDs.',
        deliverable: 'مستودع HiveBox جاهز ومربوط بلوحة Kanban ونظام Pull Requests.',
        resources: [{ label: 'HiveBox Phase 1', url: 'https://devopsroadmap.io/projects/hivebox/', type: 'Project' }],
        subtasks: [
          { id: 'm1-3-s1', text: 'إنشاء مستودع عام باسم Hivebox على GitHub (yossefbelal1/Hivebox)', done: true },
          { id: 'm1-3-s2', text: 'كتابة README.md يوضح فكرة المشروع وخارطة المراحل', done: true },
          { id: 'm1-3-s3', text: 'إنشاء لوحة GitHub Project (Kanban: Todo, In Progress, Done) وإتمام Phase 1', done: true }
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
        masteryCriteria: 'القدرة على تشخيص أعطال الشبكة والخدمات على RHEL VM بدون الاعتماد على الواجهة الرسومية.',
        whatYouDo: 'إدارة أنظمة لينكس والشبكات مع تقوية مستمرة في عقلية الـ Troubleshooting العملي.',
        deliverable: 'سيرفر RHEL VM (yossef@RedHatLap) مهيأ وجاهز للعمل.',
        resources: [
          { label: 'RedHat Admin II (Alaa Mohamed)', url: 'https://www.youtube.com/', type: 'YouTube' },
          { label: 'KodeKloud: Learning Linux Basics Course & Labs', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'KodeKloud: Networks and Communications (Alan C.)', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'KodeKloud Linux Playgrounds', url: 'https://kodekloud.com/playgrounds/#LinuxPlaygrounds', type: 'Playground' }
        ],
        subtasks: [
          { id: 'm2-1-s1', text: 'إدارة أنظمة لينكس بمستوى RH124 / RH134 (Alaa Mohamed & KodeKloud Labs)', done: true },
          { id: 'm2-1-s2', text: 'أساسيات الشبكات (CCNA: IP, Subnetting, Routing, DNS, Firewall, Ports)', done: true },
          { id: 'm2-1-s3', text: 'تجهيز RHEL VM (yossef@RedHatLap) بمستخدم غير root و Python 3.9.25', done: true }
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
        masteryCriteria: 'عدم الدفع المباشر إلى main أبداً واستخدام PRs نظيفة.',
        whatYouDo: 'إتقان دورة العمل الأساسية (clone, config, add, commit, branch, push, pull) على VS Code و GitHub.',
        deliverable: 'حساب GitHub مربوط مع VS Code وسير عمل نظيف.',
        resources: [
          { label: 'KodeKloud: GIT for Beginners (Lydia Hallie)', url: 'https://kodekloud.com/', type: 'KodeKloud' }
        ],
        subtasks: [
          { id: 'm2-2-s1', text: 'إتقان clone, config, add, commit, branch, push, pull', done: true },
          { id: 'm2-2-s2', text: 'إتقان Branching, PRs و Conventional Commits', done: true }
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
        masteryCriteria: 'القدرة على كتابة Dockerfile أساسي وتشغيل واختبار حاوية محلياً.',
        whatYouDo: 'فهم الصور والحاويات، كتابة Dockerfile مبدئي، وإدارة المنافذ ومتغيرات البيئة.',
        deliverable: 'Docker 29.9.3 يعمل بسلاسة بصلاحيات المستخدم على RHEL VM.',
        resources: [
          { label: 'KodeKloud: Docker Training for Absolute Beginner (Mumshad M.)', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'Ahmed Elfakharany: Docker Arabic', url: 'https://www.youtube.com/watch?v=l_R7rdrurdE', type: 'YouTube' },
          { label: 'Vishakha Sadhwani: Docker & Kubernetes EXPLAINED', url: 'http://www.youtube.com/watch?v=WEf2X7Ai2bg', type: 'YouTube' }
        ],
        subtasks: [
          { id: 'm2-3-s1', text: 'فهم Images & Containers وكتابة Dockerfile مبدئي', done: true },
          { id: 'm2-3-s2', text: 'إدارة Ports و Env Vars وتشغيل Docker 29.9.3 بدون sudo على RHEL', done: true }
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
        masteryCriteria: 'فهم Functions, Loops, Dicts, Exceptions, File I/O, Unit Tests.',
        whatYouDo: 'إنهاء الجانب النظري للغة من بلاي ليست CS50P بالعربي (Super Salman).',
        deliverable: 'قاعدة برمجية صلبة جاهزة للتطبيق على أدوات DevOps.',
        resources: [
          { label: 'CS50P Arabic Playlist (Super Salman)', url: 'https://youtube.com/playlist?list=PLMEwJLan85pi3UCtLYDvGvORU9UYBkBAW', type: 'YouTube' },
          { label: 'KodeKloud: Programming Fundamentals & PCAP (Lydia H.)', url: 'https://kodekloud.com/', type: 'KodeKloud' }
        ],
        subtasks: [
          { id: 'm2-4-s1', text: 'إنهاء الجانب النظري من CS50P بالعربي (Variables..Unit Tests باستثناء RegEx و OOP عمداً)', done: true }
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
          { label: 'KodeKloud: Python Basics Labs (from Literals)', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'KodeKloud: Python API Development with FastAPI (Sanjeev T.)', url: 'https://kodekloud.com/', type: 'KodeKloud' }
        ],
        subtasks: [
          { id: 'm2-5-s1', text: 'تطبيق 1 & 2: venv + pip (عزل بيئة العمل وتوليد requirements.txt)', done: false },
          { id: 'm2-5-s2', text: 'تطبيق 3 & 4: json + requests (استدعاء APIs ومعالجة JSON)', done: false },
          { id: 'm2-5-s3', text: 'تطبيق 5 & 6: os + subprocess (تشغيل أوامر لينكس بأمان من بايثون)', done: false },
          { id: 'm2-5-s4', text: 'حل اللابات المتبقية في Python Basics على KodeKloud (بدءاً من Literals)', done: false },
          { id: 'm2-5-s5', text: 'دراسة أساسيات FastAPI (Sanjeev T.) لبناء HiveBox Endpoints', done: false }
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
        tags: ['Bash', 'KodeKloud Labs', 'Mostafa Magdy'],
        objectives: [
          'تحويل المعرفة النظرية في Bash إلى سكربتات إنتاجية صارمة (set -euo pipefail).',
          'بناء سكريبت Health Check عملي على RHEL VM.'
        ],
        masteryCriteria: 'حل لابات Shell Scripts for Beginners وتشغيل سكريبت Health Check يختبر الاستجابة.',
        whatYouDo: 'حل اللابات فقط من Shell Scripts for Beginners + مشاريع Mostafa Magdy + سكريبت RHEL VM.',
        deliverable: 'سكريبت Health Check عملي مرفوع ومجرب على RHEL VM.',
        resources: [
          { label: 'KodeKloud: Shell Scripts for Beginners (Labs Only)', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'Mostafa Magdy: Bash Crash Course (4 Projects)', url: 'https://www.youtube.com/', type: 'YouTube' }
        ],
        subtasks: [
          { id: 'm2-6-s1', text: 'مراجعة المفاهيم النظرية (Shebang, Args, Conditions, Loops, $?, Signals & Trap)', done: true },
          { id: 'm2-6-s2', text: 'حل لابات فقط من كورس Shell Scripts for Beginners على KodeKloud', done: false },
          { id: 'm2-6-s3', text: 'تطبيق Mostafa Magdy Bash Crash Course + كتابة Health Check على RHEL VM', done: false }
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
        masteryCriteria: 'حاوية v0.0.1 تعمل وتطبع الإصدار بدقة + اجتياز كويز Module 2.',
        whatYouDo: 'إنهاء متطلبات HiveBox Phase 2 وتوثيق خطوات الاختبار وتحديث لوحة Kanban.',
        deliverable: 'إغلاق Module 2 بالكامل والاستعداد للموديول الثالث.',
        resources: [{ label: 'HiveBox Phase 2 Spec', url: 'https://devopsroadmap.io/projects/hivebox/', type: 'Project' }],
        subtasks: [
          { id: 'm2-7-s1', text: 'تنفيذ دالة HiveBox v0.0.1 وبناء Dockerfile وتشغيله على RHEL VM', done: false },
          { id: 'm2-7-s2', text: 'توثيق خطوات الاختبار ورفع PR إلى yossefbelal1/Hivebox وتحديث Kanban', done: false },
          { id: 'm2-7-s3', text: 'اجتياز كويز Module 2 بنجاح', done: false }
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
        masteryCriteria: 'صفر تحذيرات Pylint وهيكلية مجلدات نظيفة.',
        whatYouDo: 'تنظيم هيكل كود HiveBox وإضافة نقاط /version و /temperature المتصلة بـ openSenseMap.',
        deliverable: 'REST API نظيف ومتوافق مع معايير Pylint.',
        resources: [{ label: 'Module 3 Roadmap', url: 'https://devopsroadmap.io/learning-plan', type: 'Roadmap' }],
        subtasks: [
          { id: 'm3-1-s1', text: 'فصل المنطق البرمجي عن الإعدادات وتثبيت إضافة Pylint في VS Code', done: false },
          { id: 'm3-1-s2', text: 'تطبيق Conventional Commits وبناء /version و /temperature', done: false }
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
        masteryCriteria: 'نجاح جميع اختبارات /version و /temperature بما يشمل استبعاد البيانات الأقدم من ساعة.',
        whatYouDo: 'كتابة اختبارات وحدات أوتوماتيكية لكود بايثون.',
        deliverable: 'مجموعة اختبارات pytest سريعة وموثوقة.',
        resources: [{ label: 'HiveBox Phase 3', url: 'https://devopsroadmap.io/projects/hivebox/', type: 'Project' }],
        subtasks: [
          { id: 'm3-2-s1', text: 'كتابة Unit Tests لنقطة /version وحساب متوسط الحرارة', done: false },
          { id: 'm3-2-s2', text: 'اختبار حالة البيانات الأقدم من ساعة باستخدام Mock لـ openSenseMap', done: false }
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
        masteryCriteria: 'صورة إنتاجية خفيفة تمر من Hadolint نظيفة 100%.',
        whatYouDo: 'تحسين Dockerfile HiveBox وفق 15 قاعدة Container Best Practices.',
        deliverable: 'Multi-stage Dockerfile آمن وصغير الحجم.',
        resources: [{ label: 'Container Best Practices', url: 'https://devopsroadmap.io/projects/container-best-practices/', type: 'Docs' }],
        subtasks: [
          { id: 'm3-3-s1', text: 'تطبيق Multi-stage Build و Base Image مصغرة + .dockerignore', done: false },
          { id: 'm3-3-s2', text: 'التشغيل بمستخدم Non-root واجتياز فحص Hadolint', done: false }
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
        masteryCriteria: 'CI أخضر على كل PR يختبر نقطة /version حياً داخل الحاوية.',
        whatYouDo: 'دراسة كورس GitHub Actions Certification وتطبيق ci.yml في HiveBox.',
        deliverable: 'Workflow CI متكامل في .github/workflows/ci.yml.',
        resources: [
          { label: 'KodeKloud: GitHub Actions Certification (Barahalikar S.)', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'YouTube: glich.stream GitHub Actions (E1–E7)', url: 'https://www.youtube.com/', type: 'YouTube' },
          { label: 'Vishakha Sadhwani: CI/CD CRASH COURSE', url: 'http://www.youtube.com/watch?v=ixNNyLcWXX8', type: 'YouTube' }
        ],
        subtasks: [
          { id: 'm3-4-s1', text: 'بناء ci.yml لتشغيل Pylint, Hadolint, pytest وبناء الصورة', done: false },
          { id: 'm3-4-s2', text: 'تشغيل الحاوية في الـ CI واختبار نقطة /version', done: false },
          { id: 'm3-4-s3', text: 'إضافة OpenSSF Scorecard Action ومعالجة النتائج', done: false }
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
        masteryCriteria: 'نجاح كافة اختبارات CI و OpenSSF على المستودع.',
        whatYouDo: 'مراجعة كل متطلبات Phase 3 وتسليمها.',
        deliverable: 'إغلاق HiveBox Phase 3 بالكامل.',
        resources: [{ label: 'HiveBox Phase 3 Spec', url: 'https://devopsroadmap.io/projects/hivebox/', type: 'Project' }],
        subtasks: [
          { id: 'm3-5-s1', text: 'إتمام PR Phase 3 ونقل الكارت إلى Done في Kanban', done: false }
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
        masteryCriteria: 'نفس الصورة تعمل بأي senseBox IDs عبر متغيرات البيئة فقط.',
        whatYouDo: 'تطبيق مبادئ Twelve-Factor App وتحديث /temperature.',
        deliverable: 'تطبيق Stateless يقرأ الإعدادات من Env Vars.',
        resources: [{ label: '12-Factor App', url: 'https://12factor.net/', type: 'Docs' }],
        subtasks: [
          { id: 'm4-1-s1', text: 'قراءة senseBox IDs من Environment Variables', done: false },
          { id: 'm4-1-s2', text: 'إضافة تصنيف status (<10 Too Cold, 11–36 Good, >37 Too Hot)', done: false }
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
        masteryCriteria: 'نشر التطبيق داخل Kind والوصول إليه عبر Ingress مع عمل Probes و HPA.',
        whatYouDo: 'إنهاء كورسات K8s و CKA و Troubleshooting على KodeKloud + تطبيق Kind.',
        deliverable: 'ملفات Deployment, Service, Ingress شغالة على Kind.',
        resources: [
          { label: 'KodeKloud: Kubernetes for the Absolute Beginners (Mumshad M.)', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'KodeKloud: Certified Kubernetes Administrator (CKA) (Mumshad M.)', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'KodeKloud: K8s Troubleshooting for App Developers (Nourhan K.)', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'Ahmed Elfakharany: Kubernetes Arabic', url: 'https://www.youtube.com/watch?v=-ezhA_YALDs', type: 'YouTube' },
          { label: 'Vishakha Sadhwani: Visual K8s & Cloud Explainers', url: 'https://www.youtube.com/@VishakhaSadhwani', type: 'YouTube' }
        ],
        subtasks: [
          { id: 'm4-2-s1', text: 'إتقان Architecture (API Server, etcd, Scheduler, Kubelet) وتشغيل Kind', done: false },
          { id: 'm4-2-s2', text: 'كتابة Manifests: Deployment, Service, ConfigMap, Secret, Ingress-Nginx', done: false },
          { id: 'm4-2-s3', text: 'تطبيق Probes و Resource Limits و HPA + كورس K8s Troubleshooting', done: false }
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
        masteryCriteria: 'نقطة /metrics تعيد مقاييس HTTP والعملية وتظهر في Prometheus.',
        whatYouDo: 'دراسة Prep Course - Prometheus Certified Associate (PCA) وتطبيق /metrics.',
        deliverable: 'مراقبة حية لـ HiveBox عبر Prometheus و Grafana.',
        resources: [
          { label: 'KodeKloud: Prometheus Certified Associate (PCA) (Sanjeev T.)', url: 'https://kodekloud.com/', type: 'KodeKloud' }
        ],
        subtasks: [
          { id: 'm4-3-s1', text: 'إضافة Endpoint /metrics وتصدير Default Prometheus Metrics', done: false },
          { id: 'm4-3-s2', text: 'ربط Prometheus & Grafana وعرض المقاييس', done: false }
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
        masteryCriteria: 'إعداد شبكة VPC معزولة وصلاحيات IAM آمنة وحفظ صور في ECR.',
        whatYouDo: 'دراسة كورسات AWS على KodeKloud و AWS SAA-C03 بالعربي.',
        deliverable: 'بنية AWS أساسية جاهزة للمرحلة التالية.',
        resources: [
          { label: 'KodeKloud: AWS Cloud Practitioner (CLF-C02)', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'KodeKloud: AWS For Beginners with Hands-On Labs', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'Ahmed Elfakharany: AWS SAA-C03 Arabic', url: 'https://www.youtube.com/', type: 'YouTube' }
        ],
        subtasks: [
          { id: 'm4-4-s1', text: 'IAM (Users, Roles, Policies) + S3 + ECR', done: false },
          { id: 'm4-4-s2', text: 'VPC (Subnets, Route Tables, Security Groups) + EC2', done: false }
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
        masteryCriteria: 'استيعاب أنماط Caching, Queues, Replication و Self-Healing.',
        whatYouDo: 'إكمال كورس System Design For Beginners على KodeKloud.',
        deliverable: 'إغلاق كورس System Design كاملاً.',
        resources: [
          { label: 'KodeKloud: System Design For Beginners (Aditya C.)', url: 'https://app.kodekloud.com/learn/course/system-design-for-beginners/overview', type: 'KodeKloud' }
        ],
        subtasks: [
          { id: 'm4-5-s1', text: 'إنهاء Module 1 (مكتمل مسبقاً)', done: true },
          { id: 'm4-5-s2', text: 'استكمال Modules 2–5 + 7 Labs (Caching, Queues, Replication, Self-Healing)', done: false }
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
        masteryCriteria: 'الـ CI يفحص الكود والمانيفستس والـ CD ينشر الصورة برقم إصدار على GHCR.',
        whatYouDo: 'تنفيذ متطلبات Phase 4 الكاملة ورفعها كـ PR.',
        deliverable: 'إغلاق HiveBox Phase 4 على GitHub.',
        resources: [{ label: 'HiveBox Phase 4 Spec', url: 'https://devopsroadmap.io/projects/hivebox/', type: 'Project' }],
        subtasks: [
          { id: 'm4-6-s1', text: 'تشغيل Integration Tests + SonarQube/Semgrep + Terrascan في CI', done: false },
          { id: 'm4-6-s2', text: 'بناء CD Workflow لرفع الصورة الموسومة بالإصدار إلى GHCR', done: false }
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
        masteryCriteria: 'تحقق /readyz من توفر 50%+1 من الحساسات وحداثة بيانات Valkey و MinIO (< دورتين).',
        whatYouDo: 'دمج Valkey و MinIO في HiveBox وتحديث /temperature ليقرأ من الكاش.',
        deliverable: 'نقاط /cache, /store, /readyz ومقاييس مخصصة شغالة.',
        resources: [{ label: 'HiveBox Phase 5 Spec', url: 'https://devopsroadmap.io/projects/hivebox/', type: 'Project' }],
        subtasks: [
          { id: 'm5-1-s1', text: 'دمج Valkey Cache بدورة 5 دقائق + Endpoint /cache', done: false },
          { id: 'm5-1-s2', text: 'دمج MinIO S3-compatible Storage + Endpoint /store', done: false },
          { id: 'm5-1-s3', text: 'تطوير /readyz Probe وتوسيع /metrics بمقاييس مخصصة', done: false }
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
        masteryCriteria: 'نشر كامل المنظومة بـ Helm و Kustomize مع ضبط /readyz كـ Readiness Probe.',
        whatYouDo: 'دراسة كورسات Helm و Kustomize على KodeKloud وتطبيقها على HiveBox.',
        deliverable: 'Helm Chart + Kustomize Manifests متكاملة.',
        resources: [
          { label: 'KodeKloud: Helm for Beginners (Mumshad M.)', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'KodeKloud: Kustomize (Sanjeev T.)', url: 'https://kodekloud.com/', type: 'KodeKloud' }
        ],
        subtasks: [
          { id: 'm5-2-s1', text: 'إنشاء Helm Chart لتطبيق HiveBox وتفعيل /readyz probe', done: false },
          { id: 'm5-2-s2', text: 'إنشاء Kustomize manifests للبنية التحتية (Valkey, MinIO) ومراجعة K8s Security', done: false }
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
        masteryCriteria: 'إنشاء الكلاستر كاملاً عبر Terraform IaC بدون خطوات يدوية.',
        whatYouDo: 'إتمام كورس Terraform Basics (Vijin Palazhi) وبناء بنية Phase 5.',
        deliverable: 'كود Terraform منظم بالـ Modules والـ State الآمن.',
        resources: [
          { label: 'KodeKloud: Terraform Basics Training (Vijin Palazhi)', url: 'https://kodekloud.com/', type: 'KodeKloud' }
        ],
        subtasks: [
          { id: 'm5-3-s1', text: 'إتقان Providers, Resources, State, Variables, Outputs, Modules', done: false },
          { id: 'm5-3-s2', text: 'إنشاء Kubernetes Cluster بـ Terraform + نشر Grafana Agent (Loki/Grafana)', done: false }
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
        masteryCriteria: 'الـ Pipeline ينشئ Kind ويشغل البنية ويجتاز اختبارات Venom.',
        whatYouDo: 'إنشاء Venom Test Suite وإتمام Phase 5.',
        deliverable: 'إغلاق HiveBox Phase 5 بالكامل.',
        resources: [{ label: 'HiveBox Phase 5 Spec', url: 'https://devopsroadmap.io/projects/hivebox/', type: 'Project' }],
        subtasks: [
          { id: 'm5-4-s1', text: 'بناء Venom E2E Test Suite وتشغيله على Kind مع البنية الكاملة', done: false }
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
        masteryCriteria: 'أتمتة كاملة لأمان الصور والاعتماديات وسياسات الكلاستر.',
        whatYouDo: 'دراسة كورسات DevSecOps و KCSA وتطبيقها في HiveBox.',
        deliverable: 'خط إنتاج مؤمن بالكامل من الكود حتى التشغيل.',
        resources: [
          { label: 'KodeKloud: DevSecOps - K8s DevOps & Security (Barahalikar S.)', url: 'https://kodekloud.com/courses/devsecops', type: 'KodeKloud' },
          { label: 'KodeKloud: K8s & Cloud Native Security Associate (KCSA)', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'Ahmed Elfakharany: DevSecOps Arabic', url: 'https://www.youtube.com/watch?v=swJNs0Opg6E', type: 'YouTube' }
        ],
        subtasks: [
          { id: 'm6-1-s1', text: 'تفعيل Trivy Scanner و Dependabot وتطبيق Least Privilege', done: false },
          { id: 'm6-1-s2', text: 'إعداد سياسات Kyverno أو معايير KCSA الأمنية', done: false }
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
        masteryCriteria: 'جمع وتحليل كافة سجلات الحاويات في Grafana Loki بنجاح.',
        whatYouDo: 'دراسة كورس Grafana Loki (Nourhan M.) وتشغيله داخل Kubernetes.',
        deliverable: 'مكدس مراقبة وسجلات Open-Source ذاتي الاستضافة.',
        resources: [
          { label: 'KodeKloud: Grafana Loki (Nourhan M.)', url: 'https://kodekloud.com/', type: 'KodeKloud' }
        ],
        subtasks: [
          { id: 'm6-2-s1', text: 'تشغيل Grafana Loki & Promtail واستعراض السجلات في Grafana', done: false }
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
        masteryCriteria: 'أي تحديث في مستودع الـ GitOps ينعكس على الكلاستر تلقائياً مع شهادة HTTPS.',
        whatYouDo: 'دراسة كورس GitOps with ArgoCD وفيديو أحمد الفخراني وتطبيقها.',
        deliverable: 'نظام نشر GitOps متكامل مع TLS و DNS تلقائي.',
        resources: [
          { label: 'KodeKloud: GitOps with ArgoCD (Barahalikar S.)', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'Ahmed Elfakharany: Argo CD Arabic', url: 'https://www.youtube.com/watch?v=C0xRfrNIRak', type: 'YouTube' }
        ],
        subtasks: [
          { id: 'm6-3-s1', text: 'تثبيت Argo CD وتفعيل Auto-Sync و Self-Heal', done: false },
          { id: 'm6-3-s2', text: 'تجهيز ExternalDNS و Cert-Manager (Let’s Encrypt)', done: false }
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
        masteryCriteria: 'اكتمال HiveBox من Phase 1 إلى Phase 6 بجودة إنتاجية.',
        whatYouDo: 'إنهاء التحسينات وتوثيقها وإطلاق عروض Upwork المصغرة.',
        deliverable: 'مشروع HiveBox كامل في البورتفوليو.',
        resources: [{ label: 'HiveBox Phase 6 Spec', url: 'https://devopsroadmap.io/projects/hivebox/', type: 'Project' }],
        subtasks: [
          { id: 'm6-4-s1', text: 'تسليم HiveBox Phase 6 كاملاً على GitHub', done: false },
          { id: 'm6-4-s2', text: 'بدء التقديم على تاسكات Upwork المصغرة (Docker, Nginx, Backup, CI)', done: false }
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
        masteryCriteria: 'مشروع أصيل موثق بمعمارية واضحة و CI/CD و Observability كاملة.',
        whatYouDo: 'تطبيق أفكار المشاريع القيّمة من الفيديوهات الاستراتيجية وترقية AutoTele.',
        deliverable: 'مشروع Capstone مستقل + توثيق AutoTele المحدث.',
        resources: [
          { label: 'Vishakha Sadhwani: 5 RESUME PROJECTS', url: 'http://www.youtube.com/watch?v=X6Kw2_wZr1E', type: 'YouTube' },
          { label: 'Vishakha Sadhwani: DevOps Project That Will Get You Hired in 2026!', url: 'http://www.youtube.com/watch?v=oSxFHRf_AT4', type: 'YouTube' },
          { label: 'AutoTele Repo', url: 'https://github.com/yossefbelal1/AutoTele', type: 'Project' }
        ],
        subtasks: [
          { id: 'm7-1-s1', text: 'تطوير Capstone Project مستقل يجمع IaC + CI/CD + K8s + GitOps + Observability', done: false },
          { id: 'm7-1-s2', text: 'نشر خدمة AI/ML Inference API على Kubernetes مع مراقبة الأداء', done: false },
          { id: 'm7-1-s3', text: 'توثيق AutoTele برسومات معمارية و CI/CD محسن', done: false }
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
        masteryCriteria: 'حل تحديات عملية واقعية تحت ضغط المشاكل الإنتاجية.',
        whatYouDo: 'دراسة كورس Fundamentals of SRE وحل تحديات KodeKloud Engineer & 100 Days of DevOps.',
        deliverable: 'جاهزية عملية عالية لحل المشاكل اليومية.',
        resources: [
          { label: 'KodeKloud: Fundamentals of SRE (Jake P.)', url: 'https://kodekloud.com/courses/fundamentals-of-sre', type: 'KodeKloud' },
          { label: 'KodeKloud Engineer Practice', url: 'https://engineer.kodekloud.com/practice', type: 'Playground' },
          { label: '100 Days of DevOps', url: 'https://kodekloud.com/100-days-of-devops', type: 'Playground' }
        ],
        subtasks: [
          { id: 'm7-2-s1', text: 'إتمام Fundamentals of SRE (Jake P.)', done: false },
          { id: 'm7-2-s2', text: 'حل تحديات يومية على KodeKloud Engineer و 100 Days of DevOps', done: false }
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
        masteryCriteria: 'CV صفحة واحدة واضح الأرقام والإنجازات + ملف LinkedIn محسن.',
        whatYouDo: 'صياغة الـ CV والـ Cover Letter وتجهيز Skills Radar.',
        deliverable: 'CV & LinkedIn جاهزان للتقديم الفوري.',
        resources: [{ label: 'Interview Best Practices', url: 'https://devopsroadmap.io/interview/best-practices/', type: 'Docs' }],
        subtasks: [
          { id: 'm7-3-s1', text: 'إعداد CV احترافي بمسمى Bachelor’s in MIS ونتائج المشاريع', done: false },
          { id: 'm7-3-s2', text: 'كتابة Cover Letter ورسم Skills Radar وتجهيز LinkedIn', done: false }
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
        masteryCriteria: 'ثقة تامة في مقابلات Junior DevOps / Cloud / SRE.',
        whatYouDo: 'إنهاء DevOps Interview Prep و System Design for Interview Prep على KodeKloud.',
        deliverable: 'جاهزية كاملة للتوظيف في منتصف 2027 + خطة CKA.',
        resources: [
          { label: 'KodeKloud: DevOps Interview Prep (Raghunandana S.)', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'KodeKloud: System Design for Interview Prep (Aditya C.)', url: 'https://kodekloud.com/', type: 'KodeKloud' },
          { label: 'Common Interview Questions', url: 'https://devopsroadmap.io/interview/common-questions/', type: 'Docs' }
        ],
        subtasks: [
          { id: 'm7-4-s1', text: 'إكمال DevOps Interview Prep & System Design for Interview Prep', done: false },
          { id: 'm7-4-s2', text: 'بدء التقديم المكثف والتحضير لامتحان CKA الدولي', done: false }
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
