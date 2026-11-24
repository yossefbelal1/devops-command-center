// ==============================================================================
// CAREER PROGRESSION TIMELINE & REALISTIC MARKET ESTIMATES
// ==============================================================================

export const CAREER_BENCHMARK_NOTE =
  'السنوات المذكورة هي متوسطات استرشادية في السوق (Indicative Industry Benchmarks) وليست ترقيات تلقائية؛ الانتقال بين المراحل يعتمد على الخبرة الإنتاجية الفعلية وإدارة الأنظمة تحت الضغط.';

export const CAREER_EVOLUTION_STAGES = [
  {
    id: 'stage-1',
    years: '0–2 years (Indicative Benchmark)',
    role: 'Junior DevOps Engineer',
    scopeBadge: 'Tasks',
    themeColor: 'emerald',
    isCurrentTarget: true,
    isFutureStage: false,
    userStatus: 'الهدف الحالي — التركيز الكامل على إغلاق المسار وبناء البورتفوليو',
    roleScope: 'تنفيذ المهام اليومية المحددة بإشراف هندسي وبناء الأساسيات التقنية.',
    responsibilities: [
      'إدارة خوادم لينكس الأساسية وتشخيص أعطال الشبكة والمنافذ.',
      'كتابة سكربتات أتمتة بـ Python و Bash (Health checks, Backups).',
      'تغليف الخدمات في Docker وبناء أول خطوط CI/CD بـ GitHub Actions.',
      'نشر تطبيقات بسيطة على سحابة AWS و Kubernetes محلياً واستكشاف AI workloads.'
    ],
    requiredSkills: ['Linux (RH124/134)', 'Git & PRs', 'Python & Bash', 'Docker Best Practices', 'GitHub Actions CI', 'K8s & AWS Basics'],
    tools: ['RHEL / Ubuntu', 'Git', 'Python', 'Bash', 'Docker', 'GitHub Actions', 'Kind', 'AWS Core'],
    productionExpectations: 'القدرة على تصحيح أخطاء الحاويات والـ CI المكسورة وكتابة توثيق تشغيل واضح بدون كسر بيئة الإنتاج.',
    practicalProjects: ['HiveBox Phases 1–4', 'AutoTele SaaS Dockerization'],
    skillsGapCheck: [
      { id: 'sg-1', label: 'Linux RH124/134 & Networking (CCNA)', topicId: 'm2-1' },
      { id: 'sg-2', label: 'Git & GitHub + Conventional Commits', topicId: 'm2-2' },
      { id: 'sg-3', label: 'Docker Core & Best Practices (Multi-stage/Hadolint)', topicId: 'm3-3' },
      { id: 'sg-4', label: 'Python DevOps Libraries & FastAPI', topicId: 'm2-5' },
      { id: 'sg-5', label: 'Bash Scripting Labs & Health Check', topicId: 'm2-6' },
      { id: 'sg-6', label: 'GitHub Actions CI + pytest', topicId: 'm3-4' }
    ],
    readinessChecklist: [
      'تسليم HiveBox Phases 1–4 كاملة على مستودع عام.',
      'تجهيز CV بمسمى Bachelor’s in MIS وحل 105+ سؤال في بنك المقابلات.',
      'تنفيذ مهام مصغرة على Upwork في الشهر الخامس–السادس.'
    ]
  },
  {
    id: 'stage-2',
    years: '2–4 years (Indicative Benchmark)',
    role: 'DevOps Engineer',
    scopeBadge: 'Systems',
    themeColor: 'blue',
    isCurrentTarget: false,
    isFutureStage: true,
    userStatus: 'مرحلة مستقبلية — تتطلب خبرة إنتاجية فعلية (2–4 سنوات)',
    roleScope: 'امتلاك عمليات النشر اليومية وأتمتة البنية التحتية عبر البيئات المختلفة.',
    responsibilities: [
      'بناء وصيانة خطوط CI/CD متعددة البيئات (Dev / Stage / Prod).',
      'تشييد البنية السحابية ككود بـ Terraform وتغليف التطبيقات بـ Helm & Kustomize.',
      'تشغيل GitOps عبر Argo CD وإدارة الكاش (Valkey) والتخزين (MinIO/S3).',
      'دعم نشر خدمات الـ AI/ML في الإنتاج ومراقبتها.'
    ],
    requiredSkills: ['Terraform Modules & State', 'Helm & Kustomize', 'Argo CD GitOps', 'Production AWS/Cloud', 'E2E Testing (Venom)'],
    tools: ['Terraform', 'Helm', 'Kustomize', 'Argo CD', 'Valkey', 'MinIO', 'AWS EKS', 'Cert-Manager'],
    productionExpectations: 'تسليم التحديثات بثبات بدون توقف (Zero-downtime) وإدارة الأعطال المتكررة باستقلالية تامة.',
    practicalProjects: ['HiveBox Phases 5–6', 'Standalone Capstone Project'],
    skillsGapCheck: [
      { id: 'sg-7', label: 'Terraform IaC & Modules', topicId: 'm5-3' },
      { id: 'sg-8', label: 'Helm & Kustomize Packaging', topicId: 'm5-2' },
      { id: 'sg-9', label: 'Argo CD GitOps & Cert-Manager', topicId: 'm6-3' }
    ],
    readinessChecklist: [
      'خبرة إنتاجية حقيقية 2–4 سنوات في إدارة الكلاسترات (ليس فقط دراسة نظرية).',
      'اجتياز شهادة عملية مثل CKA أو AWS SAA.'
    ]
  },
  {
    id: 'stage-3',
    years: '4–6 years (Indicative Benchmark)',
    role: 'Senior DevOps Engineer',
    scopeBadge: 'Systems+',
    themeColor: 'indigo',
    isCurrentTarget: false,
    isFutureStage: true,
    userStatus: 'مرحلة مستقبلية — تتطلب خبرة إنتاجية فعلية (4–6 سنوات)',
    roleScope: 'الانتقال من إدارة الأدوات إلى هندسة الأنظمة: الاعتمادية والأمان والتوسع وإدارة الأزمات.',
    responsibilities: [
      'قيادة موثوقية الأنظمة (SLIs/SLOs/Error Budgets) وإدارة الـ Incidents (Post-mortems).',
      'تصميم مكدس المراقبة المتكامل (Prometheus + Grafana + Loki) والتنبيه الذكي.',
      'تطبيق DevSecOps و Supply Chain Security (Trivy, Kyverno, KCSA, Least Privilege).',
      'تمكين فرق التطوير من تشغيل AI/ML Workflows على نطاق واسع.'
    ],
    requiredSkills: ['SRE Principles', 'Deep K8s Troubleshooting', 'DevSecOps & Policy-as-Code', 'High Availability Design'],
    tools: ['Prometheus', 'Grafana', 'Loki', 'Trivy', 'Kyverno', 'SonarQube', 'Vault', 'Istio'],
    productionExpectations: 'تحسين زمن الاستجابة وتقليل MTTR وقيادة القرارات المعمارية الحرجة تحت الضغط.',
    practicalProjects: ['Multi-region HA Production Architecture', 'Zero-Trust Supply Chain Pipeline'],
    skillsGapCheck: [
      { id: 'sg-10', label: 'DevSecOps & Kyverno Security', topicId: 'm6-1' },
      { id: 'sg-11', label: 'Grafana Loki & SRE Fundamentals', topicId: 'm7-2' }
    ],
    readinessChecklist: [
      'قيادة أنظمة إنتاجية ضخمة وإدارة Incidents فعلية لـ 4+ سنوات.',
      'التمييز بين حلول الأدوات وحلول التصميم المعماري (System Design).'
    ]
  },
  {
    id: 'stage-4',
    years: '6–8 years (Indicative Benchmark)',
    role: 'Platform / AI Infrastructure Engineer',
    scopeBadge: 'Platforms',
    themeColor: 'purple',
    isCurrentTarget: false,
    isFutureStage: true,
    userStatus: 'مرحلة مستقبلية — تتطلب خبرة إنتاجية فعلية (6–8 سنوات)',
    roleScope: 'بناء منصات المطورين الداخلية (IDPs) وتشغيل بنية الذكاء الاصطناعي والـ GPUs.',
    responsibilities: [
      'تصميم وبناء Internal Developer Platforms ذاتية الخدمة (Self-service) لفرق البرمجة.',
      'هندسة بنية الـ GPU Clusters وتشغيل Model Serving (vLLM, KServe, LLM-D).',
      'تحسين تكلفة السحاب والـ AI Inference (FinOps) والأداء والأمان.',
      'تمكين فرق الـ ML من تدريب ونشر النماذج بسرعة ومعايير موحدة.'
    ],
    requiredSkills: ['Platform Engineering', 'Golang / Operators', 'GPU Scheduling', 'vLLM / KServe', 'Cloud FinOps'],
    tools: ['Go', 'Kubernetes Operators', 'Crossplane / Backstage', 'vLLM', 'KServe', 'Istio'],
    productionExpectations: 'رفع إنتاجية عشرات المطورين عبر منصات موحدة تقلل زمن إطلاق أي خدمة جديدة من أسابيع إلى دقائق.',
    practicalProjects: ['Internal Developer Platform', 'Kubernetes FinOps & LLM Serving Infra'],
    skillsGapCheck: [],
    readinessChecklist: [
      'إتقان المسار المتقدم (Bonus Track: Golang, Istio, KServe, vLLM & GPUs).',
      'خبرة عميقة 6–8 سنوات في بناء منصات متكاملة.'
    ]
  },
  {
    id: 'stage-5',
    years: '8–10 years (Indicative Benchmark)',
    role: 'Principal Engineer / Architect',
    scopeBadge: 'Architecture',
    themeColor: 'rose',
    isCurrentTarget: false,
    isFutureStage: true,
    userStatus: 'مرحلة مستقبلية — تتطلب خبرة معمارية وقيادية (8–10 سنوات)',
    roleScope: 'قرارات تؤثر على عدة أنظمة ومؤسسات — وضع المعايير والحوكمة والتوسع طويل المدى.',
    responsibilities: [
      'وضع استراتيجية المنصة ومعايير الهندسة عبر الفرق المتعددة.',
      'تصميم أنظمة موزعة عالية التوافر مع موازنة التكلفة والأمان والأداء.',
      'قيادة مبادرات الأتمتة وبنية الذكاء الاصطناعي على مستوى الشركة.'
    ],
    requiredSkills: ['Enterprise Architecture', 'Governance & Compliance', 'Multi-Cloud Strategy', 'Technical Leadership'],
    tools: ['Architecture Decision Records (ADRs)', 'Multi-cluster Mesh', 'FinOps Frameworks'],
    productionExpectations: 'منع الديون التقنية الكبرى وتوجيه الاستثمار السحابي والهندسي للشركة.',
    practicalProjects: ['Enterprise Multi-Cloud Standard Blueprint'],
    skillsGapCheck: [],
    readinessChecklist: ['خبرة قيادية وتصميمية موثقة عبر أنظمة متشعبة لمدة 8+ سنوات.'],
    skillsGapNote: 'يتطلب سنوات خبرة معمارية فعلية، ولا يُقاس فقط بإنهاء كورسات المسار.'
  },
  {
    id: 'stage-6',
    years: '10+ years (Indicative Benchmark)',
    role: 'Platform / AI Infrastructure Architect',
    scopeBadge: 'Strategy',
    themeColor: 'slate',
    isCurrentTarget: false,
    isFutureStage: true,
    userStatus: 'مرحلة مستقبلية — تتطلب خبرة قيادية واستراتيجية (10+ سنوات)',
    roleScope: 'تحديد الاستراتيجية طويلة المدى للسحاب والذكاء الاصطناعي وربط البنية بعوائد الشركة.',
    responsibilities: [
      'وضع خارطة الطريق التقنية طويلة المدى للسحاب والـ AI Infrastructure.',
      'بناء وتوجيه فرق هندسية عالية الأداء وتطوير القادة التقنيين.',
      'مواءمة القرارات المعمارية مع الأثر التجاري والعائد على الاستثمار (ROI).'
    ],
    requiredSkills: ['Executive Tech Strategy', 'Org Design', 'Large-Scale Trade-offs', 'AI Infra Economics'],
    tools: ['Executive Roadmaps', 'Vendor & Build-vs-Buy Evaluation'],
    productionExpectations: 'قيادة التحول التقني الكامل للمؤسسة وإدارة المخاطر والميزانيات المليونية.',
    practicalProjects: ['Company-wide AI & Cloud Transformation'],
    skillsGapCheck: [],
    readinessChecklist: ['سجل قيادي ومعماري ممتد لأكثر من 10 سنوات.']
  }
];

export const SALARY_BENCHMARKS = {
  badge: 'Indicative Market Estimates',
  disclaimer: 'تقديرات استرشادية للسوق (Indicative Market Estimates) — تختلف حسب حجم الشركة، إجادة الإنجليزية، ومهارات المقابلة.',
  sourceNote: 'المصادر (Source): مسوحات سوق العمل التقني في مصر، عروض التوظيف المنشورة، ومنصات العمل عن بُعد (Glassdoor / Levels.fyi / Remote boards).',
  lastVerified: 'November 2026 (نوفمبر 2026)',
  markets: [
    {
      market: 'شركات محلية في مصر (Local Egyptian Tech Companies)',
      currency: 'EGP / شهر',
      junior: '18,000 – 32,000 ج.م',
      mid: '38,000 – 65,000 ج.م',
      senior: '75,000 – 130,000+ ج.م',
      notes: 'تعتمد على المهارة العملية في Linux و Docker و GitHub Actions و AWS؛ ترحب بخريجي MIS مع بورتفوليو قوي.'
    },
    {
      market: 'شركات عالمية و Outsourcing في مصر (Multinationals: _VOIS, DXC, Orange, Wipro)',
      currency: 'EGP / شهر',
      junior: '35,000 – 55,000 ج.م',
      mid: '65,000 – 105,000 ج.م',
      senior: '120,000 – 190,000+ ج.م',
      notes: 'بوابة أساسية لدخول مشاريع البنوك والشركات الأوروبية دون شرط كلية الهندسة. تتطلب إنجليزية قوية و Kubernetes.'
    },
    {
      market: 'فرص العمل عن بُعد دولياً (International Remote USD / EUR)',
      currency: 'USD / EUR',
      junior: '$1,500 – $2,800 (~€1,400–€2,600) / شهر',
      mid: '$3,500 – $6,000 (~€3,250–€5,550) / شهر',
      senior: '$6,500 – $11,000+ (~€6,000–€10,200+) / شهر',
      notes: 'لا تنظر للشهادة الأكاديمية؛ تحكم فقط بجودة مستودعات GitHub (HiveBox + AutoTele) وسرعة حل المشكلات.'
    }
  ]
};

export const APPLICATION_READINESS_TIMELINE = [
  {
    id: 'app-m1',
    phase: 'المرحلة 1: البناء الصامت (Modules 2–4 | ديسمبر 2026 – مارس 2027)',
    status: 'ممنوع التقديم على وظائف كاملة الآن',
    moduleIds: ['module-2', 'module-3', 'module-4'],
    details: 'أنهِ Corey Schafer الـ 6، لابات KodeKloud، و HiveBox Phases 2, 3, 4 (Docker + CI + Kind K8s) أولاً حتى لا تحرق اسمك في السوق.'
  },
  {
    id: 'app-m2',
    phase: 'المرحلة 2: اختبار السوق بمهام مصغرة (Module 5 | أبريل – مايو 2027)',
    status: 'فريلانس مصغر على Upwork',
    moduleIds: ['module-5'],
    details: 'بعد Terraform و Helm و HiveBox Phase 5، ابدأ بتاسكات Upwork محددة (Dockerizing, Nginx SSL, Bash Backup, GitHub Actions).'
  },
  {
    id: 'app-m3',
    phase: 'المرحلة 3: التقديم للشركات والـ Outsourcing (Module 6 | يونيو 2027)',
    status: 'انطلاق التقديم الفعلي',
    moduleIds: ['module-6'],
    details: 'بعد إغلاق HiveBox Phase 6 (Argo CD + Trivy + Loki)، جهّز CV بمسمى Bachelor’s in MIS وابدأ التقديم بمعدل 10–15 شركة أسبوعياً.'
  },
  {
    id: 'app-m4',
    phase: 'المرحلة 4: التخرج من المسار و CKA (Module 7 | يوليو – أغسطس 2027)',
    status: 'معسكر المقابلات + أول عرض + CKA',
    moduleIds: ['module-7'],
    details: 'أنهِ Capstone Project + AutoTele + 105+ سؤال في بنك المقابلات، اقتنص أول عرض، ثم احجز امتحان CKA.'
  }
];
