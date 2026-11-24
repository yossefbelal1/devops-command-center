export const QUIZ_MODULES = [
  {
    "id": "quiz-m1",
    "moduleId": "module-1",
    "moduleNumber": "01",
    "title": "Module 1: Welcome to the DevOps World",
    "description": "اختبار عملي لمفاهيم دورة حياة البرمجيات (SDLC)، الفروق بين Agile و DevOps و DevSecOps، مبدأ Shift-Left، ركائز CALMS، مقدمة 12-Factor App، وإدارة العمل عبر Kanban و Pull Requests.",
    "questions": [
      {
        "id": "q1-1",
        "topic": "SDLC Stages",
        "difficulty": "Easy",
        "question": "أثناء تطوير ميزة جديدة في تطبيق إنتاجي، اكتشف الفريق ارتفاعاً مفاجئاً في زمن الاستجابة (Latency) بعد الإطلاق بساعتين. أي مرحلة في دورة SDLC مسؤولة مباشرة عن رصد هذا السلوك وتغذية الفريق ببيانات التحسين؟",
        "options": [
          "مرحلة Build لأنها تجمع الحزم وتقيس حجم الملفات",
          "مرحلة Monitor لأنها تجمع المقاييس والسجلات وترسل التنبيهات في الإنتاج",
          "مرحلة Plan لأنها تحدد متطلبات العمل قبل كتابة الكود",
          "مرحلة Code لأنها تعتمد على مراجعة الأقران في Git"
        ],
        "correctIndex": 1,
        "hint": "تذكّر حلقة DevOps اللانهائية: ما المرحلة التي تلي Operate وتُغذي مرحلة Plan التالية بالملاحظات الفعلية؟",
        "explanation": "مرحلة Monitor تراقب أداء التطبيق وتوافره في الإنتاج (Metrics, Logs, Traces)، وعند رصد تراجع في زمن الاستجابة تُطلق تنبيهات وتوفر بيانات تدخل في تخطيط التحسينات التالية."
      },
      {
        "id": "q1-2",
        "topic": "Agile vs DevOps",
        "difficulty": "Easy",
        "question": "شركة تعتمد Scrum وتُنهي كل Sprint بنجاح كل أسبوعين، لكن نشر الكود إلى الإنتاج يستغرق 3 أسابيع إضافية من التسليمات اليدوية بين المطورين وفريق التشغيل. ما التشخيص الأدق لهذه الفجوة؟",
        "options": [
          "تطبيق DevOps يعني إلغاء اجتماعات Agile تماماً",
          "الفريق يحتاج لزيادة مدة الـ Sprint إلى شهرين لحل المشكلة",
          "مشكلة في لغة البرمجة المستخدمة ويجب إعادة كتابة التطبيق",
          "الفريق يطبق Agile لكنه يفتقد ممارسات DevOps لأتمتة التسليم وتوحيد المسؤولية"
        ],
        "correctIndex": 3,
        "hint": "أين تنتهي مسؤولية Agile عادةً، وأين يبدأ دور DevOps في جسر الفجوة حتى الإنتاج؟",
        "explanation": "تركز Agile على سرعة وتيرة التطوير والتكرار بين المطورين والمنتج، بينما يمد DevOps هذا التدفق حتى التشغيل الإنتاجي عبر CI/CD والأتمتة والتعاون المشترك لإزالة عنق الزجاجة في التسليم."
      },
      {
        "id": "q1-3",
        "topic": "Shift-Left Security",
        "difficulty": "Medium",
        "question": "في مراجعة ما قبل الإطلاق، تكرر اكتشاف ثغرات حقن SQL ومفاتيح API مكشوفة في مرحلة الاختبار النهائي قبل النشر بيوم واحد، مما يؤخر الإطلاق أسبوعاً. ما الإجراء الأكثر توافقاً مع مبدأ Shift-Left Security؟",
        "options": [
          "دمج فحص الأسرار والـ SAST والـ Linting تلقائياً داخل IDE المطور وفي كل Pull Request",
          "تأجيل فحوصات الأمان لما بعد الإطلاق لتسريع التسليم",
          "تعيين فريق اختبار يدوي أكبر قبل النشر بيومين",
          "منع المطورين من استخدام مكتبات خارجية نهائياً"
        ],
        "correctIndex": 0,
        "hint": "كلمة Left تعني التحرك نحو المراحل الأبكر في SDLC (التطوير وبداية الـ CI).",
        "explanation": "مبدأ Shift-Left ينقل الاختبارات والفحوصات الأمنية مبكراً إلى بيئة المطور وخطوط الـ CI على كل PR، لأن اكتشاف الثغرة مبكراً يقلل تكلفة ووقت إصلاحها أضعافاً مضاعفة."
      },
      {
        "id": "q1-4",
        "topic": "DevSecOps",
        "difficulty": "Medium",
        "question": "ما الفرق الجوهري بين إضافة بوابة فحص أمني (Security Gate) يدوية في نهاية مسار النشر وبين تبنّي ثقافة DevSecOps الحقيقية؟",
        "options": [
          "DevSecOps يلغي دور مهندسي الأمان تماماً من المؤسسة",
          "DevSecOps يقتصر على استخدام جدار حماية (Firewall) أمام السيرفرات فقط",
          "في DevSecOps تصبح المسؤولية الأمنية مدمجة ومؤتمتة ومشتركة في كل مرحلة من الكود حتى التشغيل",
          "البوابة اليدوية النهائية أسرع لأنها تفحص الكود مرة واحدة فقط"
        ],
        "correctIndex": 2,
        "hint": "فكّر في دمج كلمة Sec في منتصف DevOps وليس في نهايتها.",
        "explanation": "DevSecOps يعني أن الأمان مسؤولية مشتركة (Shared Responsibility) مدمجة تلقائياً داخل خطوط CI/CD، وفحص الصور والاعتماديات والسياسات باستمرار، وليس نقطة تفتيش متأخرة تبطئ الفريق."
      },
      {
        "id": "q1-5",
        "topic": "DevOps Pillars (CALMS)",
        "difficulty": "Easy",
        "question": "اشترت مؤسسة أغلى أدوات الـ CI/CD والمراقبة، ومع ذلك ما زال كل فريق يلوم الآخر عند حدوث الأعطال وترفض الفرق مشاركة صلاحيات النشر. أي ركيزة أساسية من ركائز DevOps تم إهمالها؟",
        "options": [
          "ركيزة التخزين السحابي (Cloud Storage)",
          "ركيزة تسريع المعالجات (Hardware Scaling)",
          "ركيزة المحاكاة الافتراضية (Virtualization)",
          "ركيزة الثقافة والتعاون (Culture & Shared Ownership)"
        ],
        "correctIndex": 3,
        "hint": "الأدوات وحدها لا تغير طريقة عمل الفرق المنعزلة (Silos).",
        "explanation": "الركائز الثلاث/الخمس للـ DevOps تبدأ بالثقافة (Culture) وكسر الصوامع (Silos) وبناء ثقة ومسؤولية مشتركة، تليها الأتمتة (Automation) والقياس (Measurement)."
      },
      {
        "id": "q1-6",
        "topic": "Measurement & DORA Metrics",
        "difficulty": "Medium",
        "question": "طلب منك مدير الهندسة قياس مدى تحسّن أداء تسليم البرمجيات بعد تطبيق DevOps بدلاً من الاعتماد على عدد ساعات العمل أو عدد الـ Commits. أي مجموعة مقاييس هي المعيار الصناعي الأفضل؟",
        "options": [
          "عدد أسطر الكود المكتوبة يومياً لكل مطور",
          "مقاييس DORA: Deployment Frequency, Lead Time for Changes, Change Failure Rate, MTTR",
          "نسبة استهلاك الذاكرة في أجهزة المطورين",
          "عدد الاجتماعات الأسبوعية التي يحضرها الفريق"
        ],
        "correctIndex": 1,
        "hint": "ابحث عن المقاييس الأربعة المرتبطة بالسرعة والاستقرار في أبحاث DevOps.",
        "explanation": "مقاييس DORA تقيس السرعة (تكرار النشر وزمن وصول التغيير) والاستقرار (نسبة فشل التغييرات ومتوسط زمن الاستعادة MTTR)، مما يعطي صورة متوازنة دون تحيز."
      },
      {
        "id": "q1-7",
        "topic": "Measurement Trade-off",
        "difficulty": "Hard",
        "question": "فريق نجح في رفع Deployment Frequency من مرة شهرياً إلى 10 مرات يومياً، لكن Change Failure Rate قفز من 4% إلى 38% وارتفع MTTR. ما الاستنتاج الهندسي السليم؟",
        "options": [
          "الأداء ممتاز لأن السرعة هي الهدف الوحيد في DevOps",
          "يجب إيقاف استخدام Git والعودة للنشر عبر FTP",
          "التسريع تم على حساب الجودة والاختبارات الآلية واستراتيجية التراجع (Rollback)، ويجب تعزيز بوابات الجودة",
          "ارتفاع Change Failure Rate أمر طبيعي ولا يؤثر على المستخدمين"
        ],
        "correctIndex": 2,
        "hint": "السرعة دون اختبارات ومراقبة واستعادة سريعة تعني ضخ الأعطال للإنتاج بسرعة أكبر.",
        "explanation": "مقاييس السرعة والاستقرار مترابطة؛ النشر المتكرر غير المحمي بـ Automated Tests و Canary/Rollback و Observability يؤدي إلى أعطال متكررة وبطء استعادة الخدمة."
      },
      {
        "id": "q1-8",
        "topic": "12-Factor App Intro",
        "difficulty": "Medium",
        "question": "قام مطور بكتابة رابط قاعدة البيانات وكلمة المرور داخل ملف `config.py` ورفعه إلى Git، ثم اضطر لبناء Docker Image منفصلة لكل بيئة (Dev, Staging, Prod). أي مبدأ من مبادئ 12-Factor App تم خرقه؟",
        "options": [
          "Factor III (Config): تخزين الإعدادات والأسرار في متغيرات البيئة (Environment Variables) وفصلها عن الكود",
          "Factor IX (Disposability): سرعة إقلاع وإيقاف العملية",
          "Factor XI (Logs): إرسال السجلات إلى stdout",
          "Factor I (Codebase): استخدام مستودع كود واحد"
        ],
        "correctIndex": 0,
        "hint": "الاختلاف بين البيئات لا يجب أن يغيّر الكود أو صورة البناء نفسها.",
        "explanation": "مبدأ Config في 12-Factor ينص على فصل الإعدادات المتغيرة بين البيئات (روابط قواعد البيانات، مفاتيح API) وحفظها في Environment Variables بحيث يعمل نفس الـ Build Artifact في أي بيئة."
      },
      {
        "id": "q1-9",
        "topic": "12-Factor App Statelessness",
        "difficulty": "Medium",
        "question": "تطبيق ويب يخزن جلسات المستخدمين (Sessions) والملفات المرفوعة على القرص المحلي للحاوية. عند تشغيل نسختين خلف Load Balancer، اشتكى المستخدمون من تسجيل خروجهم عشوائياً. ما المبدأ المنتهك؟",
        "options": [
          "Admin Processes",
          "Dev/Prod Parity",
          "Processes (Stateless & Share-Nothing): يجب أن تكون عمليات التطبيق عديمة الحالة وتخزن الحالة في Backing Services خارجية",
          "Build, Release, Run"
        ],
        "correctIndex": 2,
        "hint": "أين يجب أن تُحفظ البيانات المشتركة عندما تتعدد نسخ التطبيق؟",
        "explanation": "مبدأ Processes في 12-Factor يتطلب أن تكون عمليات التطبيق Stateless، بحيث تُحفظ الجلسات في مخزن خارجي مثل Valkey/Redis والملفات في Object Storage مثل S3/MinIO."
      },
      {
        "id": "q1-10",
        "topic": "12-Factor App Logs & Parity",
        "difficulty": "Easy",
        "question": "لماذا يوصي منهج 12-Factor App بأن يكتب التطبيق سجلاته (Logs) كـ Event Stream إلى `stdout` بدلاً من إدارة تدوير الملفات (Log Rotation) داخل التطبيق نفسه؟",
        "options": [
          "لأن `stdout` أبطأ فيضمن عدم امتلاء القرص",
          "لإخفاء رسائل الأخطاء عن المطورين",
          "لأن نظام Linux لا يدعم الكتابة في ملفات نصية",
          "لأن بيئة التشغيل (Docker/Kubernetes/Log Collector) هي المسؤولة عن جمع وتوجيه وتخزين السجلات بشكل موحد"
        ],
        "correctIndex": 3,
        "hint": "افصل منطق التطبيق عن البنية التحتية التي تجمع السجلات.",
        "explanation": "التطبيق يركز على إخراج السجلات كتيار أحداث غير مخزن مؤقتاً إلى stdout/stderr، بينما تتولى البنية التحتية (مثل Fluent Bit أو Promtail/Loki) التجميع والفهرسة والاحتفاظ."
      },
      {
        "id": "q1-11",
        "topic": "Kanban & WIP Limits",
        "difficulty": "Medium",
        "question": "في لوحة Kanban لمشروع HiveBox، لاحظت وجود 9 بطاقات في عمود \"In Progress\" لمطور واحد فقط منذ أسبوعين دون انتقال أي بطاقة إلى \"Done\". ما الإجراء العملي الصحيح؟",
        "options": [
          "تطبيق حد العمل قيد التنفيذ (WIP Limit) وإنهاء المهام المفتوحة قبل سحب مهام جديدة",
          "فتح 5 بطاقات جديدة في Todo لتعويض البطء",
          "حذف عمود In Progress ونقل البطاقات مباشرة إلى Done",
          "إلغاء استخدام لوحة Kanban والاكتفاء برسائل البريد"
        ],
        "correctIndex": 0,
        "hint": "كثرة المهام المفتوحة بالتوازي تزيد Context Switching وتؤخر التسليم.",
        "explanation": "جوهر Kanban هو تحديد WIP Limits لتقليل تشتيت السياق، كشف الاختناقات مبكراً، وضمان إتمام المهام الحالية (Stop starting, start finishing)."
      },
      {
        "id": "q1-12",
        "topic": "GitHub PR Discipline",
        "difficulty": "Easy",
        "question": "ما السبب الهندسي الرئيسي وراء منع الدفع المباشر (Direct Push) إلى فرع `main` وفرض Pull Requests حتى في المشاريع الفردية مثل HiveBox؟",
        "options": [
          "لإطالة وقت رفع الكود دون فائدة تقنية",
          "لضمان تشغيل فحوصات CI التلقائية، مراجعة التغييرات في نطاقات صغيرة، وتوثيق سجل القرارات قبل الدمج",
          "لأن GitHub لا يسمح بتعديل الملفات على فرع `main` تقنياً",
          "لتقليل حجم مستودع Git على القرص الصلب"
        ],
        "correctIndex": 1,
        "hint": "ماذا يحدث تلقائياً عند فتح Pull Request قبل الدمج؟",
        "explanation": "فرض Pull Requests على فرع محمي يضمن مرور الكود عبر اختبارات CI والفحوصات الأمنية، ويجعل التغييرات ذرية (Atomic) وقابلة للمراجعة والتراجع بسهولة."
      },
      {
        "id": "q1-13",
        "topic": "Iterative MVP Delivery",
        "difficulty": "Hard",
        "question": "لماذا يعتمد Dynamic DevOps Roadmap بناء مشروع HiveBox على مراحل متدرجة (v0.0.1 ثم API ثم K8s ثم Cache/Storage ثم GitOps) في نفس المستودع بدلاً من بناء المعمارية الكاملة من اليوم الأول؟",
        "options": [
          "لإعادة كتابة المشروع من الصفر في كل مرحلة",
          "لأن GitHub يمنع رفع أكثر من 10 ملفات في المرة الواحدة",
          "لأن Kubernetes لا يعمل مع أكواد Python البسيطة",
          "لتجنب التعقيد المبكر، والتحقق من كل طبقة بقيمة عملية قابلة للاختبار، ومحاكاة التطور الواقعي للأنظمة الإنتاجية"
        ],
        "correctIndex": 3,
        "hint": "فكر في مفهوم Iterative MVP مقابل Big Bang Architecture.",
        "explanation": "التطوير التكراري (Iterative Delivery) يقلل المخاطر التقنية، ويثبت صحة كل طبقة (الكود، الحاوية، الـ CI، الأوركسترا، المراقبة) قبل إضافة الطبقة التالية."
      },
      {
        "id": "q1-14",
        "topic": "Blameless Post-mortem",
        "difficulty": "Hard",
        "question": "تسبب مهندس حديث الانضمام في تعطل البيئة الإنتاجية بتشغيل أمر ترحيل خاطئ. في اجتماع ما بعد الحادثة (Post-mortem) وفق ثقافة DevOps، ما السؤال الأول الذي يجب طرحه؟",
        "options": [
          "من المهندس المسؤول ولماذا لم يقرأ الوثائق جيداً؟",
          "كم يوماً يجب خصمه من تقييم المهندس السنوي؟",
          "لماذا سمح النظام والضوابط التشغيلية بتنفيذ أمر خطير بدون تحقق أو حماية آلية؟",
          "كيف نخفي الحادثة عن بقية الفرق؟"
        ],
        "correctIndex": 2,
        "hint": "المبدأ الأساسي هو Blameless Post-mortem: التركيز على ثغرات النظام لا لوم الأفراد.",
        "explanation": "في ثقافة DevOps/SRE، الخطأ البشري متوقع؛ الحل الدائم هو تحسين الضوابط الآلية (Guardrails, Staging checks, Least Privilege) لمنع تكرار الخطأ أياً كان الشخص."
      },
      {
        "id": "q1-15",
        "topic": "Dev/Prod Parity & Environment Drift",
        "difficulty": "Medium",
        "question": "يعمل تطبيق Python بشكل مثالي على جهاز المطور (Windows + Python 3.12) لكنه يفشل عند التشغيل على خادم RHEL الإنتاجي (Python 3.9). ما المصطلح الدقيق لهذه المشكلة وما الحل الجذري؟",
        "options": [
          "Environment Drift (عدم تطابق البيئات)، والحل توحيد بيئة التشغيل بالحاويات (Containers) وتقليص الفجوة بين Dev و Prod",
          "Network Latency، والحل زيادة سرعة الإنترنت",
          "Memory Leak، والحل زيادة مساحة الـ Swap",
          "Race Condition، والحل إزالة الـ Logs"
        ],
        "correctIndex": 0,
        "hint": "مشكلة \"Works on my machine\" يصفها أي عامل في 12-Factor App؟",
        "explanation": "مشكلة عدم تطابق البيئات (Environment Drift) تنتهك مبدأ Dev/Prod Parity؛ تغليف التطبيق وتبعياته داخل Container Image يضمن تشغيل نفس الإصدار والمكتبات في كل البيئات."
      }
    ]
  },
  {
    "id": "quiz-m2",
    "moduleId": "module-2",
    "moduleNumber": "02",
    "title": "Module 2: Basics — DevOps Core",
    "description": "اختبار عملي لمهارات نظام RHEL Linux (systemd, journalctl, permissions, inodes)، تشخيص الشبكات، Git & Conventional Commits، أساسيات Docker، مكتبات Python الـ 6 + FastAPI، وسكربتات Bash الإنتاجية.",
    "questions": [
      {
        "id": "q2-1",
        "topic": "RHEL Systemd & Journalctl",
        "difficulty": "Easy",
        "question": "توقفت خدمة `hivebox.service` فجأة على خادم RHEL. أي أمر يعرض السجلات الزمنية الخاصة بهذه الخدمة فقط منذ آخر إقلاع للنظام لتشخيص سبب التوقف؟",
        "options": [
          "systemctl list-units --all",
          "dmesg | grep network",
          "journalctl -u hivebox.service -b",
          "cat /etc/systemd/system/hivebox.service"
        ],
        "correctIndex": 2,
        "hint": "نحتاج أداة قراءة سجل systemd مع تصفية باسم الوحدة (`-u`) والإقلاع الحالي (`-b`).",
        "explanation": "الأمر `journalctl -u hivebox.service -b` يرشح سجلات الـ systemd journal للوحدة المحددة خلال الإقلاع الحالي (`-b`)، مما يظهر رسالة الخطأ أو كود الخروج بدقة."
      },
      {
        "id": "q2-2",
        "topic": "Linux Disk & Inodes",
        "difficulty": "Hard",
        "question": "يرفض تطبيق كتابة ملفات مؤقتة برسالة `No space left on device` رغم أن الأمر `df -h` يظهر توفر 40% مساحة فارغة على القسم `/var`. ما الفحص التالي الأكثر منطقية؟",
        "options": [
          "فحص استهلاك المعالج عبر `top`",
          "تغيير صلاحيات المجلد إلى 777",
          "إعادة تشغيل خدمة SSH",
          "تشغيل `df -i` للتحقق من استنفاد الـ Inodes بسبب وجود ملايين الملفات الصغيرة"
        ],
        "correctIndex": 3,
        "hint": "القرص قد يمتلئ بطريقتين: سعة البلوكات أو عدد معرفات الملفات.",
        "explanation": "كل ملف في أنظمة ملفات Linux (مثل ext4/xfs) يستهلك Inode؛ وجود عدد ضخم من الملفات الصغيرة يستنفد الـ Inodes قبل امتلاء المساحة التخزينية، ويكشفه `df -i`."
      },
      {
        "id": "q2-3",
        "topic": "Linux File Permissions",
        "difficulty": "Medium",
        "question": "أنشأتَ سكربت `/opt/scripts/healthcheck.sh` بصلاحية `640` مملوكاً للمستخدم `root` والمجموعة `devops`. مستخدم عادي ضمن مجموعة `devops` يحاول تشغيله بـ `/opt/scripts/healthcheck.sh` فيتلقى `Permission denied`. لماذا؟",
        "options": [
          "لأن السكربتات لا تعمل من داخل المجلد `/opt`",
          "لأن الصلاحية 640 تعطي قراءة وكتابة للمالك وقراءة للمجموعة دون بت التنفيذ `x`",
          "لأن نظام RHEL يمنع تشغيل أي سكربت امتداده `.sh`",
          "لأن المجموعة تحتاج صلاحية الكتابة `w` لتشغيل السكربت"
        ],
        "correctIndex": 1,
        "hint": "ترجم الرقم 640 إلى r/w/x للمالك والمجموعة والآخرين.",
        "explanation": "الرقم `640` يعني `rw-r-----`؛ المجموعة تملك حق القراءة (`4`) فقط وتفتقد حق التنفيذ (`x`). لتشغيله مباشرة يجب إضافة `x` للمجموعة (`chmod 750`) مع التأكد من حق التنفيذ `x` على المجلد الأب."
      },
      {
        "id": "q2-4",
        "topic": "Linux Networking Troubleshooting",
        "difficulty": "Medium",
        "question": "تطبيق FastAPI يعمل داخل سيرفر RHEL على المنفذ 8000، وعند اختباره محلياً بـ `curl localhost:8000` يستجيب فوراً، لكن من جهاز آخر في نفس الشبكة يفشل الاتصال بـ Timeout. أي أمرين تتحقق بهما أولاً من واجهة الاستماع وجدار الحماية؟",
        "options": [
          "lsblk و fdisk -l",
          "git status و git log",
          "ss -tulpn | grep 8000 (للتأكد من 0.0.0.0 وليس 127.0.0.1) و firewall-cmd --list-all",
          "chmod +x /etc/hosts و ping 127.0.0.1"
        ],
        "correctIndex": 2,
        "hint": "تأكد من أن التطبيق يستمع على كل الواجهات وليس localhost فقط، وأن firewalld يسمح بالمنفذ.",
        "explanation": "الربط على `127.0.0.1:8000` يمنع الاتصالات الخارجية حتى لو كان المنفذ مفتوحاً، كما أن `firewalld` على RHEL يغلق المنافذ غير المصرح بها افتراضياً؛ لذا `ss -tulpn` و `firewall-cmd --list-all` هما نقطة البداية الدقيقة."
      },
      {
        "id": "q2-5",
        "topic": "DNS Resolution",
        "difficulty": "Easy",
        "question": "ما الغرض العملي من استخدام الأمر `dig +short api.opensensemap.org` أو `nslookup` قبل فحص اتصال HTTP عند تعطل استدعاء API خارجي؟",
        "options": [
          "للتحقق مما إذا كان اسم النطاق يُترجم فعلياً إلى عنوان IP صحيح أم أن العطل في DNS",
          "لضغط حزم TCP وتسريع نقل البيانات",
          "لإصدار شهادة TLS جديدة للنطاق",
          "لتشغيل حاوية Docker تلقائياً"
        ],
        "correctIndex": 0,
        "hint": "العطل قد يكون في ترجمة الاسم قبل الوصول أصلاً إلى السيرفر.",
        "explanation": "أداة `dig` تختبر طبقة DNS وتكشف إن كانت المشكلة في فشل ترجمة اسم النطاق (NXDOMAIN/SERVFAIL/Timeout) قبل حتى محاولة فتح اتصال TCP."
      },
      {
        "id": "q2-6",
        "topic": "Git & Conventional Commits",
        "difficulty": "Easy",
        "question": "أضفت نقطة `/temperature` جديدة في مشروع HiveBox. أي رسالة Commit تتبع معيار Conventional Commits بدقة وتفيد أدوات توليد الـ Changelog والـ Semantic Versioning؟",
        "options": [
          "updated code and fixed stuff",
          "Version 2 added today!!!",
          "feat(api): add /temperature endpoint with openSenseMap integration",
          "git commit -m \"done\""
        ],
        "correctIndex": 2,
        "hint": "الصيغة القياسية تبدأ بنوع التغيير مثل `feat` أو `fix` متبوعاً بنطاق اختياري ونقطتين.",
        "explanation": "معيار Conventional Commits يستخدم الصيغة `<type>(<scope>): <description>` مثل `feat(api): ...` للميزات الجديدة (Minor bump) و `fix:` للإصلاحات (Patch bump)."
      },
      {
        "id": "q2-7",
        "topic": "Git Conflict Resolution",
        "difficulty": "Medium",
        "question": "أثناء فتح Pull Request لفرع `feature/bash-check` نحو `main`، ظهر Merge Conflict في ملف `README.md` بسبب تعديلات حديثة على `main`. ما التسلسل الآمن لحل التعارض؟",
        "options": [
          "تشغيل `git push --force` على فرع `main` مباشرة",
          "تجاهل التعارض لأن GitHub يدمجه عشوائياً تلقائياً",
          "حذف المستودع وإعادة إنشائه من جديد",
          "جلب تحديثات `main`، دمجها أو عمل Rebase لفرع الميزة محلياً، حل التعارضات، اختبار التغييرات، ثم الدفع للفرع"
        ],
        "correctIndex": 3,
        "hint": "التعارض يُحل دائماً على فرع الميزة بعد سحب أحدث حالة من `main`.",
        "explanation": "التحديث الآمن يكون بسحب `origin/main` ودمجه/إعادة بنائه على فرع الميزة، مراجعة علامات التعارض (`<<<<<<<`, `=======`, `>>>>>>>`) يدوياً، التحقق من الاختبارات، ثم `git push` ليتحدث الـ PR."
      },
      {
        "id": "q2-8",
        "topic": "Docker Core & Port Mapping",
        "difficulty": "Easy",
        "question": "تطبيق FastAPI يستمع داخل الحاوية على المنفذ `8000`، وتريد الوصول إليه من متصفح المضيف (Host) على المنفذ `8080`. ما الصيغة الصحيحة لخيار `-p` في `docker run`؟",
        "options": [
          "docker run -p 8080:8000 hivebox:0.0.1",
          "docker run -p 8000:8080 hivebox:0.0.1",
          "docker run -e PORT=8080:8000 hivebox:0.0.1",
          "docker run --expose 8080 hivebox:0.0.1"
        ],
        "correctIndex": 0,
        "hint": "الترتيب في `-p` هو دائماً `HOST_PORT:CONTAINER_PORT`.",
        "explanation": "الصيغة `-p <host_port>:<container_port>` تربط المنفذ `8080` على الجهاز المضيف بالمنفذ `8000` داخل الحاوية، بينما `--expose` لا ينشر المنفذ للمضيف."
      },
      {
        "id": "q2-9",
        "topic": "Docker Rootless / Group Permissions",
        "difficulty": "Medium",
        "question": "بعد تثبيت Docker على RHEL VM، ظهر الخطأ `permission denied while trying to connect to the Docker daemon socket` عند تشغيل `docker ps` كمستخدم `yossef`. ما السبب والحل القياسي؟",
        "options": [
          "الـ Docker Daemon معطل؛ يجب حذف Docker وإعادة تثبيته",
          "المستخدم لا يملك صلاحية الوصول إلى `/var/run/docker.sock`؛ يُضاف لمجموعة `docker` (أو يُفعّل Rootless Docker) مع إعادة تسجيل الدخول",
          "يجب تشغيل Docker فقط من داخل مجلد `/root`",
          "تغيير امتداد `/var/run/docker.sock` إلى `.exe`"
        ],
        "correctIndex": 1,
        "hint": "مقبس Docker يملكه `root:docker` افتراضياً.",
        "explanation": "مقبس `/var/run/docker.sock` محصور لـ `root` ومجموعة `docker`. إضافة المستخدم بـ `usermod -aG docker $USER` (وتجديد الجلسة) أو استخدام Rootless mode يحل المشكلة."
      },
      {
        "id": "q2-10",
        "topic": "Python venv & pip",
        "difficulty": "Easy",
        "question": "لماذا ننشئ بيئة افتراضية (`python3 -m venv .venv`) ونثبت بها الحزم قبل تجميدها في `requirements.txt` بدلاً من التثبيت العام (Global `pip install`) على سيرفر RHEL؟",
        "options": [
          "لتجاوز الحاجة لكتابة ملف `Dockerfile`",
          "لأن `pip` لا يعمل مطلقاً بدون `venv` في Linux",
          "لأن `venv` يحول كود Python إلى لغة C تلقائياً",
          "لعزل اعتمادات كل مشروع ومنع تعارض الإصدارات أو كسر أدوات النظام في RHEL التي تعتمد على بايثون النظام"
        ],
        "correctIndex": 3,
        "hint": "مدير الحزم `dnf` في RHEL يعتمد على Python النظام وإصدارات مكتباته.",
        "explanation": "عزل الحزم عبر `venv` يمنع تضارب الإصدارات بين المشاريع ويحمي حزم Python الأساسية للنظام، كما يضمن أن `pip freeze > requirements.txt` يعكس حزم المشروع فقط."
      },
      {
        "id": "q2-11",
        "topic": "Python json & requests",
        "difficulty": "Medium",
        "question": "في سكربت Python يتصل بـ `openSenseMap API` عبر مكتبة `requests`، ما أفضل ممارسة لتجنب تعليق السكربت للأبد أو ابتلاع أخطاء HTTP بصمت عند تعطل الخادم البعيد؟",
        "options": [
          "استخدام `requests.get(url)` بدون أي معاملات وطباعة `response.text` مباشرة",
          "استخدام `json.dumps()` قبل إرسال طلب GET",
          "تمرير `timeout=(5, 10)` واستدعاء `response.raise_for_status()` داخل `try/except requests.RequestException` قبل `response.json()`",
          "تشغيل الطلب داخل حلقة `while True` بدون تأخير"
        ],
        "correctIndex": 2,
        "hint": "بشكل افتراضي، `requests.get()` قد ينتظر بلا نهاية ولا يرفع استثناءً عند 404 أو 500.",
        "explanation": "مكتبة `requests` لا تفرض `timeout` افتراضياً ولا تفشل تلقائياً عند رموز 4xx/5xx؛ لذا تحديد `timeout` واستدعاء `raise_for_status()` مع معالجة `RequestException` ضروري في أكواد الإنتاج."
      },
      {
        "id": "q2-12",
        "topic": "Python os & subprocess Security",
        "difficulty": "Hard",
        "question": "تحتاج لتشغيل أمر نظام Linux من داخل Python مع تمرير متغير اسم مستخدم قادم من طلب API. أي استخدام لمكتبة `subprocess` يمنع ثغرة Command Injection؟",
        "options": [
          "subprocess.run([\"id\", username], shell=False, check=True, capture_output=True, text=True)",
          "os.system(\"id \" + username)",
          "subprocess.run(f\"id {username}\", shell=True)",
          "eval(f\"id {username}\")"
        ],
        "correctIndex": 0,
        "hint": "تجنب تمرير السلسلة النصية إلى الـ Shell (`shell=True`) واستخدم قائمة المعاملات.",
        "explanation": "تمرير قائمة `[\"id\", username]` مع `shell=False` (الافتراضي) يمرر المتغير كمعامل مستقل للعملية دون تفسير الـ Shell لأحرف خطيرة مثل `;` أو `&&`، مما يمنع Command Injection."
      },
      {
        "id": "q2-13",
        "topic": "FastAPI Basics",
        "difficulty": "Medium",
        "question": "في تطبيق FastAPI، قمت بتعريف مسار `@app.get(\"/sensors/{box_id}\")` واستخدمت Type Hints (`box_id: str`) و Pydantic Model للاستجابة. ما الفائدة الفورية التي يقدمها FastAPI تلقائياً؟",
        "options": [
          "إنشاء قاعدة بيانات PostgreSQL تلقائياً داخل نفس الحاوية",
          "تحقق تلقائي من نوع البيانات (Validation) وتوليد توثيق OpenAPI/Swagger تفاعلي على `/docs`",
          "بناء Kubernetes Cluster بمجرد تشغيل `uvicorn`",
          "تشغيل اختبارات Terraform في الخلفية"
        ],
        "correctIndex": 1,
        "hint": "تذكّر سبب شهرة FastAPI مع Type Hints و Pydantic.",
        "explanation": "FastAPI يعتمد على Python Type Hints و Pydantic للتحقق من صحة المدخلات والمخرجات تلقائياً مع توليد وثائق OpenAPI تفاعلية على `/docs` دون كتابة كود إضافي."
      },
      {
        "id": "q2-14",
        "topic": "Bash Strict Mode",
        "difficulty": "Medium",
        "question": "في بداية سكربت Bash للصيانة على RHEL، وجدت السطر `set -euo pipefail`. ماذا يعني الحرف `o pipefail` تحديداً ولماذا هو حرج في سكربتات CI/CD؟",
        "options": [
          "يجعل السكربت يطبع كل سطر قبل تنفيذه في السجل",
          "يغلق جميع الاتصالات الشبكية أثناء تنفيذ السكربت",
          "يمنع السكربت من استخدام المتغيرات البيئية",
          "يجعل كود الخروج للـ Pipeline هو كود أول أمر يفشل داخل سلسلة أنابيب (`cmd1 | cmd2`) بدلاً من الاكتفاء بنجاح الأمر الأخير"
        ],
        "correctIndex": 3,
        "hint": "بدون `pipefail`، ما كود خروج `failing_cmd | tee log.txt`؟",
        "explanation": "افتراضياً في Bash يُرجع الأنبوب كود خروج آخر أمر فيه (`tee` الذي ينجح دائماً)، مما يخفي فشل `failing_cmd`. تفعيل `pipefail` يجعل الأنبوب كله يفشل إذا فشل أي جزء منه."
      },
      {
        "id": "q2-15",
        "topic": "Bash Exit Codes & Trap",
        "difficulty": "Hard",
        "question": "تكتب سكربت Bash ينشئ ملفاً مؤقتاً بـ `mktemp` ويحتاج لحذفه تلقائياً سواء انتهى السكربت بنجاح أو فشل بخطأ أو أُوقف بـ `Ctrl+C`. ما الآلية القياسية لذلك؟",
        "options": [
          "تعريف دالة تنظيف وربطها بـ `trap cleanup EXIT INT TERM`",
          "كتابة `rm -f \"$TMPFILE\"` في السطر الأخير فقط من السكربت",
          "استخدام `chmod 000 \"$TMPFILE\"` في بداية السكربت",
          "وضع السكربت داخل حلقة `for` لا نهائية"
        ],
        "correctIndex": 0,
        "hint": "أداة Bash تلتقط الإشارات وخروج السكربت لتنفيذ أمر تنظيف.",
        "explanation": "الأمر `trap cleanup EXIT INT TERM` يضمن تنفيذ دالة التنظيف عند أي خروج طبيعي أو خطأ (`-e`) أو مقاطعة، بينما `rm` في النهاية لن يُنفذ إذا خرج السكربت مبكراً."
      }
    ]
  },
  {
    "id": "quiz-m3",
    "moduleId": "module-3",
    "moduleNumber": "03",
    "title": "Module 3: Start — Laying the Foundation",
    "description": "اختبار عملي لهيكلة الكود المعيارية (Modularity)، فحص Pylint، اختبارات الوحدات بـ pytest مع Mocking، أفضل ممارسات Docker (Multi-stage, Non-root, Hadolint)، خطوط GitHub Actions CI، و OIDC/ARC و OpenSSF Scorecard.",
    "questions": [
      {
        "id": "q3-1",
        "topic": "Code Modularity",
        "difficulty": "Easy",
        "question": "في مشروع HiveBox، كانت كل الدوال (قراءة البيئة، الاتصال بـ openSenseMap، حساب المتوسط، ونقاط FastAPI) مكتوبة في ملف `main.py` واحد. ما الفائدة العملية المباشرة لتقسيمها إلى وحدات (`config.py`, `sensors.py`, `app.py`)؟",
        "options": [
          "زيادة سرعة بطاقة الشبكة بمقدار الضعف",
          "تقليل عدد ملفات المستودع إلى ملف واحد",
          "تسهيل كتابة Unit Tests معزولة لكل منطق، وتقليل الاقتران (Coupling)، وتبسيط الصيانة وإعادة الاستخدام",
          "إلغاء الحاجة لاستخدام `requirements.txt`"
        ],
        "correctIndex": 2,
        "hint": "لماذا يصعب اختبار منطق الحساب إذا كان ملتصقاً باستدعاء HTTP حقيقي ومسار FastAPI؟",
        "explanation": "فصل المسؤوليات (Separation of Concerns) يسمح باختبار دالة حساب متوسط الحرارة منفصلة عن الشبكة والإعدادات، ويجعل التعديل في طبقة معينة لا يكسر الطبقات الأخرى."
      },
      {
        "id": "q3-2",
        "topic": "Pylint & Static Analysis",
        "difficulty": "Easy",
        "question": "أضفت خطوة `pylint src/` في GitHub Actions CI. متى يجب أن تفشل خطوة Pylint بناء الـ Pull Request؟",
        "options": [
          "عندما يعيد `pylint` كود خروج غير صفري نتيجة وجود أخطاء أو مخالفات تتجاوز الحد المسموح (`--fail-under`)",
          "فقط عندما يكون اسم الملف أطول من 10 أحرف",
          "عندما يحتوي الكود على تعليقات توضيحية (Docstrings)",
          "Pylint أداة لتنسيق أقراص التخزين ولا تفحص الكود"
        ],
        "correctIndex": 0,
        "hint": "كيف يتعامل CI Runner مع كود خروج أي أداة فحص؟",
        "explanation": "Pylint يفحص جودة الكود (متغيرات غير مستخدمة، أخطاء استيراد، تعارض مع PEP8)، وإذا أعاد كود خروج غير صفري أو درجة أقل من `--fail-under` يوقف الـ CI الدمج قبل دخوله لـ `main`."
      },
      {
        "id": "q3-3",
        "topic": "pytest Mocking",
        "difficulty": "Medium",
        "question": "تختبر نقطة `/temperature` في `pytest` التي تستدعي `openSenseMap API` الحقيقي. ما الخطر في الاعتماد على الـ API الخارجي داخل Unit Tests في الـ CI، وما الحل الصحيح؟",
        "options": [
          "حذف اختبار `/temperature` والاعتماد على الاختبار اليدوي بعد النشر",
          "تشغيل الاختبار 100 مرة حتى ينجح مرة واحدة",
          "الاختبار يصبح بطيئاً وهشاً (Flaky) إذا تعطل الإنترنت أو الـ API الخارجي؛ والحل استخدام `monkeypatch` أو `unittest.mock.patch` لمحاكاة الاستجابة",
          "نسخ بيانات الـ API الحقيقية إلى ملف `Dockerfile`"
        ],
        "correctIndex": 2,
        "hint": "Unit Test يجب أن يكون سريعاً وحتمياً (Deterministic) ومعزولاً عن الشبكة الخارجية.",
        "explanation": "الاعتماد على خدمات خارجية في Unit Tests يجعل الـ CI يفشل لأسباب خارجة عن كودك. استخدام `mock`/`monkeypatch` يحاكي استجابات مختلفة (ناجحة، فارغة، أو منتهية المهلة) بسرعة وحتمية."
      },
      {
        "id": "q3-4",
        "topic": "pytest Edge Cases",
        "difficulty": "Medium",
        "question": "في مواصفات HiveBox، يجب استبعاد قراءات الحساسات الأقدم من ساعة واحدة عند حساب متوسط الحرارة. كيف تصمم اختبار `pytest` للتحقق من هذا الشرط بدقة؟",
        "options": [
          "الانتظار ساعة كاملة في الـ CI بين كل اختبار وآخر",
          "تغيير ساعة خادم GitHub Actions يدوياً",
          "التحقق فقط من أن كود الاستجابة هو 200 OK دون فحص القيمة",
          "تجميد الوقت أو تمرير طوابع زمنية نسبية في بيانات Mock (قراءة قبل 10 دقائق وأخرى قبل 90 دقيقة) والتحقق من استبعاد القديمة في المتوسط"
        ],
        "correctIndex": 3,
        "hint": "تحكم بالمدخلات الزمنية عبر بيانات Mock أو `freezegun`/تجاوز دالة الوقت.",
        "explanation": "اختبار الحالات الحدية (Boundary/Edge Cases) عبر حقن قراءات حديثة وأخرى أقدم من 60 دقيقة داخل الـ Mock يتحقق من المنطق في أجزاء من الثانية دون اعتماد على الوقت الفعلي."
      },
      {
        "id": "q3-5",
        "topic": "Multi-stage Dockerfile",
        "difficulty": "Medium",
        "question": "صورة Docker لتطبيق Python بلغ حجمها 980MB بسبب وجود `gcc` و `build-essential` وذاكرة `pip` المؤقتة داخل الصورة النهائية. ما الأثر الأمني والتشغيلي لإعادة كتابتها بـ Multi-stage Build؟",
        "options": [
          "نسخ الحزم المبنية فقط إلى صورة تشغيل خفيفة (مثل `python:3.11-slim`) مما يقلص الحجم ويزيل أدوات البناء ويقلل سطح الهجوم (Attack Surface)",
          "زيادة حجم الصورة إلى الضعف لتضمين المرحلتين",
          "منع الحاوية من قراءة متغيرات البيئة",
          "إلغاء الحاجة لملف `CMD` أو `ENTRYPOINT`"
        ],
        "correctIndex": 0,
        "hint": "المرحلة الأولى للبناء (Builder) والمرحلة الثانية للتشغيل (Runtime) فقط.",
        "explanation": "Multi-stage builds تفصل أدوات التجميع الثقيلة في مرحلة `builder` وتنقل الـ wheels أو الـ `.venv` فقط إلى مرحلة `runtime` نحيفة، مما يسرّع السحب والنشر ويقلص الثغرات."
      },
      {
        "id": "q3-6",
        "topic": "Docker Layer Caching & .dockerignore",
        "difficulty": "Medium",
        "question": "في كل مرة تغير سطراً واحداً في كود `app.py`، يعيد Docker تحميل وتثبيت كل مكتبات `requirements.txt` من الإنترنت أثناء `docker build`. ما الترتيب الصحيح للتعليمات في `Dockerfile` لحل البطء؟",
        "options": [
          "وضع `COPY . .` ثم `RUN pip install -r requirements.txt`",
          "نسخ `requirements.txt` وتشغيل `pip install` أولاً، ثم نسخ بقية ملفات الكود (`COPY src/ ...`) في خطوة لاحقة",
          "تشغيل `docker build --no-cache` في كل مرة",
          "حذف ملف `.dockerignore` لتسريع البناء"
        ],
        "correctIndex": 1,
        "hint": "تُبطَل ذاكرة التخزين المؤقت (Layer Cache) لكل الطبقات التي تلي أول طبقة تتغير ملفاتها.",
        "explanation": "وضع `COPY requirements.txt .` متبوعاً بـ `RUN pip install` قبل `COPY . .` يجعل Docker يعيد استخدام طبقة الاعتماديات المخزنة مؤقتاً طالما لم يتغير `requirements.txt`، كما يمنع `.dockerignore` إرسال `.git` و `.venv` في Build Context."
      },
      {
        "id": "q3-7",
        "topic": "Non-root Container Security",
        "difficulty": "Medium",
        "question": "لماذا تُعتبر إضافة `USER appuser` (مستخدم غير `root`) في نهاية `Dockerfile` قاعدة ذهبية في أمان الحاويات؟",
        "options": [
          "لأن `USER appuser` يضغط حجم الصورة بنسبة 50%",
          "لأن Docker يرفض تشغيل أكثر من حاوية إذا كانت تعمل بـ `root`",
          "لأن المستخدم غير `root` يتجاوز جدار الحماية تلقائياً",
          "لأن الحاوية التي تعمل بصلاحية `root` تزيد من خطورة اختراق المضيف (Container Breakout) وتعديل ملفات حساسة حال استغلال ثغرة بالتطبيق"
        ],
        "correctIndex": 3,
        "hint": "تطبيق مبدأ Least Privilege داخل الحاوية.",
        "explanation": "تطبيق مبدأ أقل الصلاحيات (Principle of Least Privilege) عبر مستخدم Non-root يحد من الضرر إذا تمكن مهاجم من تنفيذ كود داخل التطبيق، كما تفرضه سياسات Kubernetes الأمنية."
      },
      {
        "id": "q3-8",
        "topic": "Hadolint",
        "difficulty": "Easy",
        "question": "أثناء تشغيل `hadolint Dockerfile`، ظهر تحذير `DL3008: Pin versions in apt get install` وتحذير باستخدام `:latest` في `FROM`. ما الغرض من إصلاح هذه التحذيرات؟",
        "options": [
          "تحسين ألوان الطرفية فقط",
          "تسريع كتابة ملف `README.md`",
          "ضمان قابلية إعادة البناء بنفس النتيجة (Reproducible Builds) وتجنب تغييرات مفاجئة غير متوقعة بين البناءات",
          "تحويل Dockerfile إلى Helm Chart"
        ],
        "correctIndex": 2,
        "hint": "ماذا يحدث إذا بنيت الصورة اليوم وغداً باستخدام وسم متحرك مثل `:latest`؟",
        "explanation": "Hadolint يفحص أفضل ممارسات Dockerfile؛ تثبيت الإصدارات والـ Base Image tags (أو SHA digests) يمنع كسر البناء المفاجئ عند تغير `:latest` أو حزم المستودعات."
      },
      {
        "id": "q3-9",
        "topic": "GitHub Actions CI Triggers & Matrix",
        "difficulty": "Medium",
        "question": "في ملف `.github/workflows/ci.yml` لمشروع HiveBox، تريد تشغيل الـ CI تلقائياً عند كل Pull Request نحو `main`، مع عدم تشغيل خطوة بناء ونشر الصورة إلا إذا نجحت اختبارات `pylint` و `pytest` و `hadolint`. كيف تنفذ الاعتمادية بين الـ Jobs؟",
        "options": [
          "استخدام `needs: [lint, test]` في الـ Job الخاص بالبناء والنشر",
          "وضع كل الـ Jobs في ملفات مستودع مختلفة وتشغيلها يدوياً",
          "استخدام `if: always()` على خطوة النشر حتى لو فشل الاختبار",
          "تشغيل `sleep 60` في بداية job البناء"
        ],
        "correctIndex": 0,
        "hint": "الـ Jobs في GitHub Actions تعمل بالتوازي افتراضياً ما لم تحدد علاقة الاعتمادية.",
        "explanation": "الكلمة المفتاحية `needs` تحدد ترتيب التنفيذ وتمنع تشغيل job البناء أو الدمج إذا فشل أي من jobs الفحص والاختبار السابقة، بعكس `if: always()` التي تشغلها حتى عند الفشل."
      },
      {
        "id": "q3-10",
        "topic": "GitHub Actions Live Container Smoke Test",
        "difficulty": "Hard",
        "question": "في خطوة Smoke Test داخل GitHub Actions CI، بنيت صورة Docker وشغلتها في الخلفية (`docker run -d -p 8000:8000`) ثم نفذت `curl -f http://localhost:8000/version` مباشرة في السطر التالي ففشل بـ `Connection refused` أحياناً. ما السبب والحل؟",
        "options": [
          "الصورة فاسدة ولا تعمل داخل GitHub Actions",
          "Race Condition: الـ `curl` نُفذ قبل انتهاء إقلاع FastAPI داخل الحاوية؛ الحل استخدام حلقة انتظار (Retry loop / Healthcheck wait) قبل الاختبار",
          "منفذ 8000 محجوز دائماً لنظام Windows في GitHub",
          "يجب استبدال `curl` بأمر `git pull`"
        ],
        "correctIndex": 1,
        "hint": "`docker run -d` يعيد التحكم فوراً بمجرد بدء العملية وليس بعد جاهزية السيرفر للاستقبال.",
        "explanation": "تشغيل الحاوية في الخلفية لا يعني أن تطبيق الويب بدأ الاستماع على المنفذ بعد؛ إضافة فحص جاهزية متكرر بمهلة محددة (مثل `curl --retry` أو loop مع `sleep`) يزيل الهشاشة في الـ CI."
      },
      {
        "id": "q3-11",
        "topic": "GitHub Actions OIDC vs Static Secrets",
        "difficulty": "Hard",
        "question": "لماذا يُوصى باستخدام GitHub Actions **OIDC (OpenID Connect)** للاتصال بـ AWS/Cloud بدلاً من تخزين `AWS_ACCESS_KEY_ID` و `AWS_SECRET_ACCESS_KEY` طويلة الأمد في GitHub Secrets؟",
        "options": [
          "لأن مفاتيح AWS الثابتة تعمل ساعة واحدة فقط ثم تنحذف تلقائياً",
          "لأن GitHub Secrets لا تدعم النصوص الإنجليزية",
          "لأن OIDC يجعل خطوة البناء لا تحتاج إلى الإنترنت",
          "لأن OIDC يصدر بيانات اعتماد مؤقتة وقصيرة العمر (Short-lived tokens) عبر IAM Trust Policy دون مفاتيح ثابتة قد تتسرب أو تحتاج تدوير يدوي"
        ],
        "correctIndex": 3,
        "hint": "تخلص من الأسرار الثابتة (Zero Standing Credentials).",
        "explanation": "OIDC يسمح لـ GitHub Runner بمبادلة JWT موثق ومقيد بالفرع/المستودع مع مزود السحابة للحصول على صلاحيات مؤقتة عبر STS، مما يزيل خطر تسرب المفاتيح الثابتة."
      },
      {
        "id": "q3-12",
        "topic": "Actions Runner Controller (ARC)",
        "difficulty": "Hard",
        "question": "تحتاج مؤسسة لتشغيل GitHub Actions Runners داخل شبكتها الخاصة على Kubernetes بحيث تنشأ Pods مؤقتة لكل Workflow وتتوسع تلقائياً ثم تُحذف بعد الانتهاء. ما الأداة القياسية لذلك؟",
        "options": [
          "Actions Runner Controller (ARC) على Kubernetes",
          "Jenkins Master-Agent Plugin",
          "CronJob يدوي داخل سيرفر RHEL",
          "تثبيت GitHub Desktop على كل عقدة"
        ],
        "correctIndex": 0,
        "hint": "المشروع الرسمي لإدارة Self-hosted GitHub Runners على Kubernetes.",
        "explanation": "ARC (Actions Runner Controller) هو Kubernetes Operator يدير Ephemeral Self-hosted Runners على شكل Pods تتوسع تلقائياً حسب ضغط الـ Workflows وتُزال نظيفة بعد كل مهمة."
      },
      {
        "id": "q3-13",
        "topic": "OpenSSF Scorecard",
        "difficulty": "Medium",
        "question": "بعد تفعيل **OpenSSF Scorecard** على مستودع HiveBox، ظهر تحذير منخفض الدرجة في فحص `Pinned-Dependencies` و `Token-Permissions`. ما التعديل المطلوب لرفع الدرجة الأمنية؟",
        "options": [
          "إعطاء `GITHUB_TOKEN` صلاحية `write-all` وتحديد Actions بـ `@main`",
          "جعل المستودع الخاص عاماً دون ملف LICENSE",
          "تقييد `permissions` في الـ Workflow بأقل صلاحية (`read-all` افتراضياً) وتثبيت GitHub Actions بـ Commit SHA كامل بدلاً من وسم متحرك مثل `@v4`",
          "إلغاء حماية فرع `main`"
        ],
        "correctIndex": 2,
        "hint": "OpenSSF يبحث عن تقييد صلاحيات `GITHUB_TOKEN` ومنع هجمات تغير الوسوم (Tag Hijacking).",
        "explanation": "تثبيت Actions بـ Commit SHA يمنع تنفيذ كود خبيث إذا تم اختراق وسم `@v4`، وتحديد `permissions:` بأقل صلاحية مطلوبة يحمي المستودع إذا اخترقت خطوة في الـ CI."
      },
      {
        "id": "q3-14",
        "topic": "CI Caching & Artifacts",
        "difficulty": "Easy",
        "question": "ما الفرق العملي بين `actions/cache` و `actions/upload-artifact` داخل GitHub Actions؟",
        "options": [
          "لا يوجد أي فرق وكلاهما ينشر الصور إلى Docker Hub",
          "`actions/cache` يحفظ أسرار قاعدة البيانات بشكل غير مشفر للجمهور",
          "`upload-artifact` يعمل فقط على Linux بينما `cache` يعمل فقط على Windows",
          "`actions/cache` يحفظ الاعتماديات لتسريع التشغيلات المستقبلية بين الـ Runs، بينما `upload-artifact` يحفظ مخرجات البناء/التقارير لتمريرها بين Jobs أو تنزيلها من الـ Run الحالي"
        ],
        "correctIndex": 3,
        "hint": "أحدهما لتسريع البناء المتكرر والآخر لحفظ مخرجات الـ Build أو التقارير للمراجعة.",
        "explanation": "نستخدم `actions/cache` لتخزين حزم `pip` أو طبقات Docker بين التشغيلات المتتالية، ونستخدم `upload-artifact` لحفظ تقارير الاختبار أو ملفات البناء الخاصة بتلك الجولة."
      },
      {
        "id": "q3-15",
        "topic": "PR Check Discipline & Branch Protection",
        "difficulty": "Medium",
        "question": "أضفت `ci.yml` إلى المستودع، لكن أحد المتعاونين استطاع دمج Pull Request رغم فشل اختبار `pytest`. ما الإعداد الناقص في GitHub؟",
        "options": [
          "تغيير اسم الملف إلى `cd.yml`",
          "تفعيل Branch Protection Rules (أو Rulesets) على `main` مع تحديد Status Checks المطلوب نجاحها قبل الدمج",
          "إضافة وسم `#required` داخل ملف Python",
          "تقليل عدد الاختبارات في `pytest`"
        ],
        "correctIndex": 1,
        "hint": "الـ CI يبلغ بالحالة فقط، لكن من يمنع زر Merge فعلياً؟",
        "explanation": "وجود Workflow وحده يعرض علامة فشل حمراء فقط؛ لفرض المنع الفعلي يجب تفعيل Branch Protection / Ruleset على `main` وتحديد الـ Status Checks الإلزامية."
      }
    ]
  },
  {
    "id": "quiz-m4",
    "moduleId": "module-4",
    "moduleNumber": "04",
    "title": "Module 4: Expand — Constructing a Shell",
    "description": "اختبار متعمق في مبادئ 12-Factor App، معمارية وكائنات Kubernetes الأساسية (Kind, Ingress-Nginx, Probes, HPA)، المراقبة عبر Prometheus `/metrics` و Grafana، خدمات AWS Core، وأنماط System Design.",
    "questions": [
      {
        "id": "q4-1",
        "topic": "12-Factor Config & Port Binding",
        "difficulty": "Easy",
        "question": "في HiveBox Phase 4، أصبحت معرفات `senseBox` تُمرر عبر متغير البيئة `SENSEBOX_IDS` بدلاً من كتابتها داخل الكود. أي فائدة يحققها ذلك عند النشر على Kubernetes؟",
        "options": [
          "تشفير كود Python إلى ثنائيات تلقائياً",
          "زيادة سرعة استجابة الحساسات الفيزيائية في ألمانيا",
          "إلغاء الحاجة إلى Service داخل Kubernetes",
          "استخدام نفس صورة الحاوية المبنية عبر بيئات Dev و Staging و Prod مع تغيير الإعدادات فقط عبر ConfigMap أو Env Vars"
        ],
        "correctIndex": 3,
        "hint": "Build once, run anywhere with different config.",
        "explanation": "فصل الإعدادات عن الصورة يحقق مبدأ 12-Factor Config و Build/Release/Run، فلا تعيد بناء الصورة لكل عميل أو بيئة، بل تغير الـ ConfigMap/Env فقط."
      },
      {
        "id": "q4-2",
        "topic": "Kubernetes Control Plane",
        "difficulty": "Medium",
        "question": "عند تنفيذ `kubectl apply -f deployment.yaml`، أي مكون في Control Plane يستقبل الطلب ويتحقق من الصلاحيات والمخطط (Schema) ثم يحفظ الحالة المرغوبة في `etcd`؟",
        "options": [
          "kube-apiserver",
          "kubelet",
          "kube-proxy",
          "Container Runtime (containerd)"
        ],
        "correctIndex": 0,
        "hint": "هو البوابة الوحيدة التي تتصل بـ `etcd` مباشرة.",
        "explanation": "`kube-apiserver` هو الواجهة المركزية لـ Kubernetes Control Plane؛ يستقبل طلبات REST، ينفذ Authentication/Authorization/Admission، ويخزن الحالة في `etcd`."
      },
      {
        "id": "q4-3",
        "topic": "Kubernetes Scheduling Failure",
        "difficulty": "Medium",
        "question": "بعد نشر Deployment، بقي أحد الـ Pods في حالة `Pending` وأظهر `kubectl describe pod` الرسالة: `0/2 nodes are available: 2 Insufficient memory`. ما المكون الذي أصدر هذا القرار وما السبب؟",
        "options": [
          "CoreDNS فشل في ترجمة اسم الصورة",
          "kube-scheduler لم يجد عقدة تملك الذاكرة الحرة المطلوبة في `resources.requests.memory`",
          "Ingress-Nginx أغلق المنفذ 80",
          "etcd امتلأ بملفات الـ Logs"
        ],
        "correctIndex": 1,
        "hint": "تذكّر الفرق بين `requests` (للتوزيع/الجدولة) و `limits` (للحد الأقصى وقت التشغيل).",
        "explanation": "`kube-scheduler` يختار العقدة المناسبة بناءً على `resources.requests`؛ إذا لم تتوفر عقدة تملك الذاكرة المطلوبة المتاحة، يبقى الـ Pod في حالة `Pending`."
      },
      {
        "id": "q4-4",
        "topic": "Kubernetes Probes (Liveness vs Readiness)",
        "difficulty": "Hard",
        "question": "تطبيق HiveBox عالق في Deadlock داخلي ولا يرد على الطلبات (يحتاج لإعادة تشغيل)، بينما تطبيق آخر ما زال يحمّل كاش كبير عند الإقلاع وسيصبح جاهزاً بعد 20 ثانية. أي Probe تضبط لكل حالة؟",
        "options": [
          "Readiness Probe لإعادة تشغيل العالق، و Liveness Probe لفترة التحميل الأولية",
          "استخدام Service من نوع NodePort بدلاً من Probes",
          "إزالة جميع الـ Probes واستبدالها بـ HPA",
          "Liveness Probe لإعادة تشغيل الحاوية عند الـ Deadlock، و Startup/Readiness Probe لمنع إرسال الترافيك قبل الجاهزية دون قتله مبكراً"
        ],
        "correctIndex": 3,
        "hint": "Liveness يقرر \"هل أُعيد تشغيل الحاوية؟\"، و Readiness يقرر \"هل تستقبل الحاوية ترافيك من Service؟\".",
        "explanation": "فشل `livenessProbe` يؤدي إلى Restart للـ Container (مفيد للـ Deadlock)، بينما فشل `readinessProbe` يزيل الـ Pod مؤقتاً من Endpoints الـ Service دون قتله، و`startupProbe` يحمي التطبيقات بطيئة الإقلاع."
      },
      {
        "id": "q4-5",
        "topic": "Kubernetes Services & Ingress-Nginx",
        "difficulty": "Medium",
        "question": "في كلاستر Kind المحلي، نشرت Deployment مع Service من نوع `ClusterIP`، ثم أضفت `Ingress` مرتبطاً بـ `Ingress-Nginx` يوجه `/temperature` إلى تلك الـ Service. لماذا لا تحتاج Service التطبيق أن تكون `LoadBalancer` هنا؟",
        "options": [
          "لأن Kind يحذف طبقة الـ Services عند وجود Ingress",
          "لأن `ClusterIP` يفتح منفذاً عاماً على الإنترنت تلقائياً",
          "لأن Ingress-Nginx يعمل كـ Reverse Proxy في الطبقة السابعة (L7) داخل الكلاستر ويوجه الطلبات داخلياً إلى `ClusterIP` للـ Service عبر Endpoints",
          "لأن `Ingress` يعمل في الطبقة الثانية (Data Link) فقط"
        ],
        "correctIndex": 2,
        "hint": "من نقطة دخول واحدة (Ingress Controller)، كيف يصل الترافيك إلى عدة خدمات داخلية؟",
        "explanation": "الـ Ingress Controller يستقبل الترافيك الخارجي ويعمل Routing حسب الـ Host/Path (Layer 7) إلى خدمات `ClusterIP` الداخلية مباشرة عبر الـ Pod IPs المسجلة في Endpoints."
      },
      {
        "id": "q4-6",
        "topic": "Kubernetes HPA Prerequisites",
        "difficulty": "Medium",
        "question": "أنشأت `HorizontalPodAutoscaler` (HPA) يستهدف 70% CPU utilization، لكن `kubectl get hpa` يعرض `<unknown>/70%` ولا يتوسع التطبيق أبداً. ما السببان الأكثر شيوعاً؟",
        "options": [
          "عدم وجود `metrics-server` في الكلاستر أو عدم تحديد `resources.requests.cpu` في مواصفات الـ Pod",
          "استخدام `ClusterIP` بدلاً من `NodePort`",
          "كتابة ملف الـ Manifest بصيغة YAML بدلاً من JSON",
          "وجود أكثر من حاوية واحدة في الكلاستر"
        ],
        "correctIndex": 0,
        "hint": "كيف يحسب HPA النسبة المئوية لاستهلاك الـ CPU ومن أين يقرأ الاستهلاك الحالي؟",
        "explanation": "HPA يحتاج إلى `metrics-server` لجمع قراءات CPU/Memory الحالية من Kubelet، كما يحتاج إلى `resources.requests` ليحسب النسبة المئوية (الاستهلاك الفعلي ÷ الطلب المحدد)."
      },
      {
        "id": "q4-7",
        "topic": "Kubernetes Pod Troubleshooting",
        "difficulty": "Hard",
        "question": "دخل Pod في حالة `CrashLoopBackOff` مع سبب آخر إنهاء `OOMKilled (Exit Code 137)`. ما التشخيص الدقيق وما الإجراء السليم؟",
        "options": [
          "صورة الحاوية غير موجودة في Registry؛ يجب إصلاح `imagePullSecrets`",
          "الحاوية تجاوزت حد الذاكرة `resources.limits.memory` فقتلتها نواة Linux؛ يجب فحص استهلاك الذاكرة/تسربها ورفع الـ limit بشكل مناسب",
          "القرص الصلب ممتلئ بالسجلات؛ يجب حذف `ConfigMap`",
          "الكود يحتوي على خطأ في صيغة YAML للـ Ingress"
        ],
        "correctIndex": 1,
        "hint": "OOM تعني Out Of Memory و Exit Code 137 = 128 + 9 (SIGKILL).",
        "explanation": "`OOMKilled` (Exit Code 137) يعني أن الـ cgroup kernel killer أنهى العملية لتجاوزها `memory limit`. يجب تحليل سبب الاستهلاك (Memory leak أو قلة الموارد) وضبط حدود الذاكرة."
      },
      {
        "id": "q4-8",
        "topic": "Prometheus Pull Model & /metrics",
        "difficulty": "Medium",
        "question": "كيف يجمع Prometheus المقاييس من نقطة `/metrics` في HiveBox افتراضياً، وما أهمية استخدام أنواع المقاييس المناسبة مثل `Counter` مقابل `Gauge`؟",
        "options": [
          "يدفع التطبيق المقاييس عبر UDP إلى Prometheus؛ و `Counter` يقل مع الوقت",
          "`Gauge` لا يقبل الأرقام العشرية في Prometheus",
          "يقرأ Prometheus قاعدة البيانات مباشرة عبر SQL",
          "يسحب Prometheus المقاييس دورياً عبر HTTP (`scrape`)؛ `Counter` تزيد تراكمياً فقط (مثل عدد الطلبات) و`Gauge` ترتفع وتنخفض (مثل الحرارة أو الذاكرة)"
        ],
        "correctIndex": 3,
        "hint": "تذكّر: Pull/Scrape model، وأي مقياس يصف درجة حرارة متغيرة مقابل عدد الطلبات التراكمي؟",
        "explanation": "Prometheus يعتمد نموذج السحب (Pull via HTTP scrape). نستخدم `Counter` للأحداث المتزايدة كإجمالي الطلبات (ويُحسب معدلها بـ `rate()`)، و`Gauge` للقيم اللحظية القابلة للزيادة والنقصان كدرجة الحرارة."
      },
      {
        "id": "q4-9",
        "topic": "PromQL & Grafana Visualization",
        "difficulty": "Hard",
        "question": "لديك مقياس Counter باسم `http_requests_total` وتريد رسم معدل الطلبات في الثانية (RPS) داخل لوحة Grafana على نافذة 5 دقائق. أي تعبير PromQL صحيح؟",
        "options": [
          "rate(http_requests_total[5m])",
          "sum(http_requests_total)",
          "avg_over_time(http_requests_total[5m])",
          "delta(http_requests_total)"
        ],
        "correctIndex": 0,
        "hint": "الدالة القياسية لحساب معدل التغير في الثانية للـ Counters مع معالجة Reset هي...",
        "explanation": "الدالة `rate(http_requests_total[5m])` تحسب متوسط معدل الزيادة في الثانية خلال 5 دقائق وتعالج تلقائياً إعادة ضبط العداد (Counter Reset) عند إعادة تشغيل الـ Pod."
      },
      {
        "id": "q4-10",
        "topic": "AWS IAM Least Privilege",
        "difficulty": "Easy",
        "question": "تطبيق يعمل على خادم EC2 يحتاج فقط لقراءة ملفات من Bucket محدد في Amazon S3. ما الطريقة الأكثر أماناً لمنحه هذه الصلاحية؟",
        "options": [
          "وضع مفاتيح Root User داخل متغيرات البيئة على الـ EC2",
          "جعل الـ S3 Bucket عاماً (Public Read) لجميع الإنترنت",
          "إنشاء IAM Role بصلاحية `s3:GetObject` مقيدة على ARN ذلك الـ Bucket وربطه بالـ EC2 عبر Instance Profile",
          "مشاركة مفاتيح IAM User ثابتة داخل مستودع Git"
        ],
        "correctIndex": 2,
        "hint": "استخدم أدوار IAM بدلاً من المفاتيح الثابتة على موارد AWS.",
        "explanation": "IAM Roles المرتبطة بـ EC2 توفر بيانات اعتماد مؤقتة تلقائياً عبر Instance Metadata دون تخزين مفاتيح ثابتة، مع تطبيق مبدأ أقل الصلاحيات على الـ Bucket المستهدف فقط."
      },
      {
        "id": "q4-11",
        "topic": "AWS VPC Networking",
        "difficulty": "Medium",
        "question": "أطلقت خادم قاعدة بيانات داخل Private Subnet في AWS VPC، وخادم تطبيق في Public Subnet. لماذا يجب ألا يملك خادم القاعدة Public IP ولماذا يوضع خلف Security Group مقيد؟",
        "options": [
          "لتقليل مساحة القرص الصلب على EC2",
          "لأن Security Group يحل محل نظام التشغيل Linux",
          "لأن AWS تمنع تشغيل قواعد البيانات داخل Public Subnet تقنياً",
          "لعزل قاعدة البيانات عن الإنترنت العام وحصر الوصول إليها فقط من Security Group الخاص بخادم التطبيق على منفذ القاعدة"
        ],
        "correctIndex": 3,
        "hint": "الدفاع المتعمق (Defense in Depth) في تصميم VPC.",
        "explanation": "الـ Private Subnet لا يملك مساراً مباشراً إلى Internet Gateway، وإشارة Security Group القاعدة إلى Security Group التطبيق (SG-to-SG referencing) تحصر الاتصال بالخدمة المصرح لها فقط."
      },
      {
        "id": "q4-12",
        "topic": "AWS ECR & S3",
        "difficulty": "Easy",
        "question": "ما الاستخدام المعماري الصحيح لكل من Amazon S3 و Amazon ECR في مشروع سحابي على AWS؟",
        "options": [
          "S3 لتخزين الحاويات وتشغيلها، و ECR لحفظ قواعد البيانات العلائقية",
          "ECR كمستودع خاص لصور Docker/OCI، و S3 كـ Object Storage لحفظ الملفات والنسخ الاحتياطية والأصول الثابتة",
          "كلاهما أداتان لتوجيه حركة DNS",
          "ECR يُستخدم فقط لتخزين ملفات Terraform State"
        ],
        "correctIndex": 1,
        "hint": "ECR اختصار Elastic Container Registry.",
        "explanation": "Amazon ECR مستودع مُدار لصور الحاويات يدعم فحص الثغرات والتكامل مع EKS/ECS، بينما Amazon S3 مخزن كائنات عالي المتانة للملفات والأصول والنسخ الاحتياطية وملفات State."
      },
      {
        "id": "q4-13",
        "topic": "System Design: Caching",
        "difficulty": "Medium",
        "question": "خدمة قراءة تتلقى 5,000 طلب/ثانية لنفس بيانات الطقس التي تتغير كل 5 دقائق فقط، مما يسبب ضغطاً هائلاً على قاعدة البيانات والـ API الخارجي. ما نمط الـ System Design الأنسب؟",
        "options": [
          "إلغاء أي تخزين مؤقت واستدعاء المصدر الخارجي في كل طلب",
          "كتابة النتائج في ملف CSV على قرص الـ Pod عند كل طلب",
          "تطبيق نمط Cache-Aside باستخدام مخزن سريع في الذاكرة (مثل Valkey/Redis) مع TTL مضبوط بـ 5 دقائق",
          "تقليل عدد الـ Pods إلى Pod واحد فقط"
        ],
        "correctIndex": 2,
        "hint": "تخفيف الضغط على المصدر البطيء عبر طبقة ذاكرة سريعة بمدة صلاحية محددة.",
        "explanation": "نمط Cache-Aside مع TTL مناسب يقدم البيانات المتكررة من الذاكرة في أجزاء من المللي ثانية، ويحمي قاعدة البيانات والـ API الخارجي من الاستهلاك المفرط والـ Rate Limiting."
      },
      {
        "id": "q4-14",
        "topic": "System Design: Message Queues",
        "difficulty": "Medium",
        "question": "عند تسجيل مستخدم جديد، يحتاج الخادم لإرسال بريد ترحيبي ومعالجة صورة كبيرة، مما يستغرق 6 ثوانٍ ويجعل واجهة المستخدم تتجمد. كيف تحل المشكلة معمارياً؟",
        "options": [
          "فصل المهام الثقيلة غير المتزامنة (Decoupling) بإرسال رسالة إلى Message Queue (مثل RabbitMQ/SQS) ليعالجها Workers في الخلفية وإرجاع رد فوري للمستخدم",
          "رفع مهلة المتصفح إلى 10 دقائق",
          "نقل المعالجة إلى طبقة DNS",
          "إلغاء إرسال البريد ومعالجة الصور"
        ],
        "correctIndex": 0,
        "hint": "Async Processing + Decoupling بين المسار التفاعلي والمهام الخلفية.",
        "explanation": "استخدام طابور رسائل (Message Queue) يفصل استجابة الـ API السريعة عن المهام الثقيلة، ويمتص ذروات الضغط (Load Leveling) ويسمح بإعادة المحاولة عند الفشل."
      },
      {
        "id": "q4-15",
        "topic": "System Design: Replication & Self-Healing",
        "difficulty": "Hard",
        "question": "ما الفارق المعماري بين **Replication** في قواعد البيانات و **Self-Healing** في Kubernetes؟",
        "options": [
          "Self-Healing ينسخ قواعد البيانات تلقائياً بين AWS و Azure",
          "كلاهما يعني عمل نسخة احتياطية يدوية كل شهر على قرص خارجي",
          "Replication ينسخ البيانات عبر عدة عقد لتوفير High Availability وتوزيع القراءات، بينما Self-Healing في K8s يعيد إنشاء أو جدولة الـ Pods الفاشلة تلقائياً لمطابقة الحالة المرغوبة",
          "Replication يعمل فقط مع الملفات النصية ولا يدعم قواعد البيانات"
        ],
        "correctIndex": 2,
        "hint": "أحدهما يضمن توفر البيانات وتوزيع أحمالها، والآخر يضمن استمرار تشغيل وحدات الحوسبة.",
        "explanation": "Database Replication يحمي من فقدان البيانات أو تعطل عقدة البيانات الأساسية ويزيد قدرة القراءة (Read Replicas)، بينما Reconciliation Loop في Kubernetes يحقق Self-Healing للـ Pods."
      }
    ]
  },
  {
    "id": "quiz-m5",
    "moduleId": "module-5",
    "moduleNumber": "05",
    "title": "Module 5: Transform — Finishing the Structure",
    "description": "اختبار عملي في دمج Valkey Cache و MinIO Object Storage، منطق فحص `/readyz` الذكي، الفرق بين Integration Tests و Venom E2E، البنية التحتية ككود بـ Terraform (State, Locking, Modules)، والتغليف بـ Helm و Kustomize.",
    "questions": [
      {
        "id": "q5-1",
        "topic": "Valkey Caching Strategy",
        "difficulty": "Easy",
        "question": "في HiveBox Phase 5، لماذا استبدلنا الاستعلام المباشر عن `openSenseMap` في كل طلب `/temperature` بمخزن **Valkey** يعمل بدورة تحديث كل 5 دقائق؟",
        "options": [
          "لأن Valkey يترجم كود Python إلى Go تلقائياً",
          "لتخزين صور Docker داخل الذاكرة العشوائية",
          "لأن Kubernetes يمنع الحاويات من الاتصال بالإنترنت",
          "لتقليل زمن الاستجابة وتجنب تجاوز حدود طلبات الـ API الخارجي (Rate Limits) واستمرار الخدمة مؤقتاً لو تعطل المصدر لحظياً"
        ],
        "correctIndex": 3,
        "hint": "فوائد In-memory caching أمام API خارجي متغير ببطء.",
        "explanation": "Valkey (البديل المفتوح لـ Redis) يوفر قراءة فائقة السرعة من الذاكرة، ويقلل الاعتماد اللحظي على openSenseMap مع حماية التطبيق من Rate Limiting."
      },
      {
        "id": "q5-2",
        "topic": "MinIO S3 Storage",
        "difficulty": "Medium",
        "question": "لماذا نستخدم **MinIO** داخل بيئة التطوير والكلاستر بدلاً من حفظ لقطات البيانات التاريخية في ملفات محلية أو التعلق بخدمة سحابية مدفوعة أثناء التطوير؟",
        "options": [
          "لأنه أداة فحص ثغرات لصور الحاويات",
          "لأنه قاعدة بيانات علائقية تدعم JOINs المعقدة",
          "لأنه يوفر واجهة S3-compatible API مفتوحة المصدر يمكن تشغيلها محلياً في Kubernetes وبنفس كود الـ SDK المستخدم مع AWS S3 لاحقاً",
          "لأنه يستبدل خادم الـ DNS داخل الكلاستر"
        ],
        "correctIndex": 2,
        "hint": "مبدأ Dev/Prod Parity مع واجهة S3 القياسية.",
        "explanation": "MinIO متوافق تماماً مع بروتوكول AWS S3 API، مما يتيح بناء واختبار منطق التخزين (Buckets/Objects) محلياً بنفس المكتبات مثل `boto3` ثم الانتقال لـ S3 في السحابة دون تغيير الكود."
      },
      {
        "id": "q5-3",
        "topic": "Smart /readyz Probe Logic",
        "difficulty": "Hard",
        "question": "في مواصفات HiveBox، متى يجب أن يُرجع `/readyz` حالة فشل (503 Service Unavailable) رغم أن عملية FastAPI نفسها ما زالت حية؟",
        "options": [
          "عندما يفشل توفر أغلبية الحساسات (أقل من 50% + 1) أو تصبح بيانات Valkey/MinIO قديمة (أقدم من دورتين / 10 دقائق) مما يجعل الخدمة غير جاهزة لتلقي ترافيك موثوق",
          "عندما ينجح الاتصال بجميع الحساسات وتكون بيانات Valkey محدثة منذ دقيقة واحدة",
          "عندما يطلب المستخدم نقطة `/version`",
          "في كل مرة يقرأ فيها Prometheus نقطة `/metrics`"
        ],
        "correctIndex": 0,
        "hint": "Readiness يعني: هل التطبيق قادر على خدمة المستخدمين ببيانات حديثة وموثوقة الآن؟",
        "explanation": "نقطة `/readyz` الذكية تتحقق من صحة التبعيات وحداثة البيانات (أغلبية 50%+1 للحساسات وحداثة Cache/Store أقل من دورتين)، فإذا فسدت تمنع Kubernetes من توجيه الترافيك للنسخة المتأثرة."
      },
      {
        "id": "q5-4",
        "topic": "Liveness vs Dependency Checks",
        "difficulty": "Hard",
        "question": "أضاف مطور فحص الاتصال بـ Valkey و MinIO داخل `livenessProbe` بدلاً من `readinessProbe`. ما السيناريو الكارثي الذي قد يحدث إذا توقف Valkey لـ 30 ثانية؟",
        "options": [
          "تتحسن سرعة الاستجابة تلقائياً",
          "يدخل كل التطبيق في موجة إعادة تشغيل متكررة (Cascading Restart Storm) بدلاً من مجرد انتظار تعافي Valkey مع إبقاء الـ Pods حية",
          "يقوم Kubernetes بترقية إصدار Valkey وحده",
          "لا يحدث أي تأثير لأن الكلاستر يتجاهل `livenessProbe`"
        ],
        "correctIndex": 1,
        "hint": "هل إعادة تشغيل الـ App Pod تُصلح تعطل Valkey الخارجي؟",
        "explanation": "تضمين التبعيات الخارجية في `livenessProbe` خطأ شائع؛ إعادة تشغيل الـ App لن يصلح تعطل Valkey، بل يسبب Restart Loop يستهلك الموارد ويبطئ التعافي. تبعيات الشبكة مكانها `readinessProbe`."
      },
      {
        "id": "q5-5",
        "topic": "Integration Tests vs Venom E2E",
        "difficulty": "Medium",
        "question": "ما الفرق العملي بين Integration Tests داخل `pytest` وبين اختبارات **Venom E2E** على كلاستر Kind الحي؟",
        "options": [
          "لا يوجد فرق وكلاهما يحل محل `pylint`",
          "Venom يختبر صياغة Dockerfile فقط قبل البناء",
          "Integration Tests تعمل فقط في مرحلة الإنتاج النهائية",
          "Integration Tests تتحقق من تكامل مكونات التطبيق (مثل FastAPI + Valkey/MinIO)، بينما Venom E2E يختبر المنظومة الكاملة من منظور خارجي عبر Ingress والشبكة والبيئة الحقيقية"
        ],
        "correctIndex": 3,
        "hint": "قارن بين اختبار تكامل أجزاء التطبيق وبين اختبار المسار الكامل (End-to-End) داخل كلاستر فعلي.",
        "explanation": "Integration Tests تختبر تفاعل الخدمات معاً، بينما Venom يشغل سيناريوهات HTTP/CLI حقيقية ضد الكلاستر المنشور بالكامل (Ingress, App, Cache, Store, Metrics) للتحقق من سلوك النظام كوحدة واحدة."
      },
      {
        "id": "q5-6",
        "topic": "Terraform Providers & Lockfile",
        "difficulty": "Easy",
        "question": "عند تشغيل `terraform init`، يُنشأ ملف `.terraform.lock.hcl`. ما وظيفة هذا الملف ولماذا يُرفع إلى مستودع Git؟",
        "options": [
          "يثبت الإصدار الدقيق وبصمات التشفير (Hashes) للـ Providers لضمان أن كل عضو في الفريق والـ CI يستخدم نفس إصدار الـ Provider",
          "يخزن كلمات مرور قاعدة البيانات بشكل نصي",
          "يقفل مستودع GitHub ويمنع أي شخص من عمل Push",
          "يحتوي على سجل جميع الموارد المنشأة في السحابة (State)"
        ],
        "correctIndex": 0,
        "hint": "يقابل فكرة `package-lock.json` أو `poetry.lock` لكن لـ Terraform Providers.",
        "explanation": "ملف `.terraform.lock.hcl` يضمن الحتمية (Determinism) في اختيار إصدارات الـ Providers عبر أجهزة المطورين وخطوط CI/CD، لذا يُحفظ في Git."
      },
      {
        "id": "q5-7",
        "topic": "Terraform State & Remote Backend",
        "difficulty": "Medium",
        "question": "لماذا يُعد حفظ ملف `terraform.tfstate` محلياً ورفعه إلى Git خطأً جسيماً في المشاريع الإنتاجية، وما البديل الصحيح؟",
        "options": [
          "لأن Terraform يرفض تنفيذ `terraform plan` إذا وجد ملف State محلي",
          "لأن ملف State يتجاوز دائماً حجم 100GB",
          "لأن State قد يحتوي على أسرار حساسة بنص واضح كما يسبب تعارضات عند عمل فريق؛ البديل Remote Backend مشفر مثل S3 مع State Locking",
          "لأن GitHub يحذف ملفات `.tfstate` تلقائياً"
        ],
        "correctIndex": 2,
        "hint": "فكّر في الأمان (Secrets in state) والعمل المتزامن (Concurrency).",
        "explanation": "ملف State يعكس الحالة الفعلية وقد يتضمن قيم أسرار مثل كلمات المرور والمفاتيح، ورفعه لـ Git يعرضها للخطر ويمنع التزامن؛ الحل هو Remote Backend (مثل S3 + DynamoDB أو native S3 lockfile) مع تشفير."
      },
      {
        "id": "q5-8",
        "topic": "Terraform State Locking",
        "difficulty": "Medium",
        "question": "قام مهندسان بتشغيل `terraform apply` في نفس اللحظة على نفس البيئة. ما الآلية التي تمنع تلف ملف الـ State (State Corruption) وتنازع الموارد؟",
        "options": [
          "استخدام متغيرات `locals` بدلاً من `variables`",
          "إعادة تسمية ملف `main.tf` أثناء التشغيل",
          "تشغيل `terraform fmt` قبل الـ apply",
          "State Locking (قفل الحالة) في الـ Remote Backend الذي يمنع تشغيل عملية تعديل ثانية حتى تنتهي الأولى"
        ],
        "correctIndex": 3,
        "hint": "آلية تمنع الكتابة المتزامنة على نفس ملف الحالة.",
        "explanation": "State Locking يحجز قفلاً أثناء أي عملية تكتب إلى State (`apply`, `destroy`) ويرفض التنفيذ المتوازي فوراً لحماية البنية التحتية وملف State من التضارب."
      },
      {
        "id": "q5-9",
        "topic": "Terraform Plan vs Apply & Drift",
        "difficulty": "Medium",
        "question": "قام زميل بتعديل قاعدة Security Group يدوياً من لوحة AWS Console. عند تشغيل `terraform plan` لاحقاً، ماذا سيكتشف Terraform؟",
        "options": [
          "لن يلاحظ شيئاً لأن Terraform لا يقرأ الحالة الفعلية أبداً",
          "سيكتشف Configuration Drift أثناء تحديث الحالة (Refresh) ويقترح إعادة المورد إلى الحالة الموصوفة في الكود",
          "سيحذف الـ VPC بالكامل دون استئذان",
          "سيقوم بتعديل ملفات `.tf` تلقائياً لتطابق التعديل اليدوي"
        ],
        "correctIndex": 1,
        "hint": "Terraform يقارن بين 3 أشياء: الكود (`.tf`)، وملف State، والواقع في السحابة أثناء Refresh.",
        "explanation": "في `plan`، يحدّث Terraform قراءته من السحابة، فيكتشف الانحراف (Drift) بين الواقع والكود المصدري، ويعرض خطة لإعادة المورد للحالة التصريحية المطلوبة."
      },
      {
        "id": "q5-10",
        "topic": "Terraform Modules",
        "difficulty": "Easy",
        "question": "تدير ثلاث بيئات (`dev`, `staging`, `prod`) تملك نفس هيكلية الشبكة وكلاستر Kubernetes مع اختلاف الأحجام فقط. ما أفضل طريقة لتجنب نسخ ولصق مئات أسطر Terraform؟",
        "options": [
          "تجاهل بيئتي `dev` و `staging` والعمل على `prod` مباشرة",
          "كتابة كل البيئات داخل ملف `main.tf` واحد بأسماء عشوائية",
          "إنشاء Terraform Module قابل لإعادة الاستخدام وتمرير معاملات البيئة عبر `variables` / `.tfvars`",
          "استخدام `sed` لتعديل النصوص قبل كل تشغيل"
        ],
        "correctIndex": 2,
        "hint": "تطبيق مبدأ DRY (Don’t Repeat Yourself) في IaC.",
        "explanation": "Terraform Modules تغلف الموارد المترابطة في وحدة قياسية قابلة للاستدعاء عبر بيئات متعددة بمتغيرات مختلفة مع ضمان نفس البنية والأمان."
      },
      {
        "id": "q5-11",
        "topic": "Helm Charts vs Kustomize",
        "difficulty": "Medium",
        "question": "في HiveBox Phase 5، متى يكون **Helm** هو الأنسب مقارنة بـ **Kustomize** (أو كيف يتكاملان)؟",
        "options": [
          "Helm مثالي لتغليف التطبيقات بقوالب ونسخ إصدارات (Release versioning/rollback) وتوزيع حزم معقدة، بينما Kustomize ممتاز لتعديل وتخصيص Manifests جاهزة بدون قوالب (Overlays لكل بيئة)",
          "Kustomize ينشئ بنية AWS S3 بينما Helm يدير قواعد البيانات فقط",
          "Helm لا يدعم المتغيرات بينما Kustomize يستخدم قوالب Go Templates المعقدة",
          "Kustomize يتطلب تشغيل خادم Tiller داخل الكلاستر"
        ],
        "correctIndex": 0,
        "hint": "تذكّر: Helm = Package Manager & Templating، Kustomize = Template-free Patching & Overlays.",
        "explanation": "Helm يوفر إدارة الحزم، القوالب (`values.yaml`)، وسجل الإصدارات والـ Rollback، بينما Kustomize يبقي الـ YAML نظيفاً ويطبق Overlays فوق Base واحد (ويمكن حتى استخدام Helm لتوليد YAML ثم تخصيصه بـ Kustomize)."
      },
      {
        "id": "q5-12",
        "topic": "Helm Values & Rollback",
        "difficulty": "Easy",
        "question": "نشرت ترقية فاشلة لـ Helm Release باسم `hivebox` عبر `helm upgrade`. أي أمر يعيد الخدمة سريعاً إلى الإصدار السابق السليم دون تعديل ملفات Chart يدوياً؟",
        "options": [
          "helm delete hivebox --purge",
          "kubectl delete namespace default",
          "helm rollback hivebox <revision>",
          "helm init --force"
        ],
        "correctIndex": 2,
        "hint": "Helm يحتفظ بتاريخ الـ Revisions لكل Release في Secrets داخل الـ Namespace.",
        "explanation": "الأمر `helm rollback hivebox <revision>` (أو بدون رقم للرجوع لآخر نسخة سابقة) يستعيد الحالة السابقة فوراً من سجل إصدارات Helm."
      },
      {
        "id": "q5-13",
        "topic": "Kustomize Base & Overlays",
        "difficulty": "Medium",
        "question": "لديك مجلد `base/` يحتوي على ملفات Valkey و MinIO، وتريد في بيئة `prod` فقط رفع عدد النسخ `replicas: 3` وتغيير وسم الصورة، دون تكرار كامل الـ YAML. كيف ينفذ Kustomize ذلك؟",
        "options": [
          "تشغيل `helm template` داخل `Dockerfile`",
          "نسخ مجلد `base/` كاملاً وتعديله يدوياً في كل مرة",
          "استخدام `if/else` داخل ملف `Deployment.yaml` الأصلي",
          "إنشاء مجلد `overlays/prod/` يحتوي `kustomization.yaml` يشير إلى `../../base` مع تطبيق Patches و `images` transformer"
        ],
        "correctIndex": 3,
        "hint": "هيكل Base + Overlays باستخدام `patches` أو `replicas` في `kustomization.yaml`.",
        "explanation": "Kustomize يجمع ملفات `base` المشتركة ويطبق عليها تعديلات محددة في `overlays/<env>/kustomization.yaml` عبر Strategic Merge Patches أو JSON6902 Patches أو محولات `replicas`/`images`."
      },
      {
        "id": "q5-14",
        "topic": "Terraform Destroy & Prevent Destroy",
        "difficulty": "Hard",
        "question": "كيف تحمي قاعدة بيانات إنتاجية أو S3 Bucket في كود Terraform من الحذف غير المقصود إذا شغّل أحدهم `terraform destroy` أو عدّل اسماً بالخطأ؟",
        "options": [
          "إضافة `lifecycle { prevent_destroy = true }` داخل كتلة المورد الحساس وتقييد صلاحيات التشغيل الإنتاجي",
          "تعليق كود المورد في Git فقط",
          "تغيير امتداد الملف إلى `.txt`",
          "إزالة الـ Provider من الملف"
        ],
        "correctIndex": 0,
        "hint": "توجد كتلة `lifecycle` مخصصة لحماية الموارد الحرجة من التدمير.",
        "explanation": "الإعداد `lifecycle { prevent_destroy = true }` يجعل Terraform يرفض الخطة ويفشل فوراً إذا تضمنت خطة التنفيذ حذف ذلك المورد، مما يضيف طبقة حماية قوية بجانب صلاحيات الـ CI."
      },
      {
        "id": "q5-15",
        "topic": "Helm Lint & Template Dry Run",
        "difficulty": "Easy",
        "question": "قبل نشر Helm Chart إلى كلاستر فعلي، ما الأمران اللذان يتحققان من صحة بنية الـ Chart ويُظهران ملفات Kubernetes YAML النهائية المولدة محلياً دون لمس الكلاستر؟",
        "options": [
          "helm uninstall و helm repo remove",
          "helm lint و helm template",
          "kubectl exec و kubectl logs",
          "terraform taint و terraform import"
        ],
        "correctIndex": 1,
        "hint": "أحدهما يفحص الأخطاء والقيم، والآخر يطبع الـ YAML المُصيّر محلياً.",
        "explanation": "`helm lint` يتحقق من أخطاء البنية والمخطط في الـ Chart، و`helm template` يعرض الـ Manifests النهائية المولدة لدمجها في فحوصات CI مثل Terrascan أو Kyverno قبل النشر."
      }
    ]
  },
  {
    "id": "quiz-m6",
    "moduleId": "module-6",
    "moduleNumber": "06",
    "title": "Module 6: Optimize — Keep Improving",
    "description": "اختبار متقدم في DevSecOps وأمان سلسلة التوريد (Supply Chain)، فحص الثغرات بـ Trivy، المقارنة بين SonarQube/Semgrep و Terrascan، سياسات Kyverno، تجميع السجلات عبر Grafana Loki، ونشر GitOps عبر Argo CD و ExternalDNS و Cert-Manager.",
    "questions": [
      {
        "id": "q6-1",
        "topic": "Supply Chain Security & SBOM",
        "difficulty": "Medium",
        "question": "ظهر فجر اليوم ثغرة حرجة (Zero-Day) في مكتبة بايثون شهيرة. كيف تساعدك قائمة **SBOM (Software Bill of Materials)** وفحصها في تحديد الخدمات المصابة بسرعة؟",
        "options": [
          "تسرع تنزيل حزم `pip` من الإنترنت",
          "توثق بدقة كل المكتبات والحزم وإصداراتها داخل كل صورة أو بناء، مما يسمح بمسحها فوراً دون إعادة فحص الشيفرة يدوياً",
          "تقوم بإصلاح الثغرة في الكود تلقائياً دون مراجعة",
          "تحجب حركة الـ DNS عن جميع المستخدمين"
        ],
        "correctIndex": 1,
        "hint": "SBOM تشبه قائمة المكونات الغذائية الدقيقة لكل Artifact منتَج.",
        "explanation": "SBOM (مثل صيغ SPDX أو CycloneDX) تسرد كل الاعتماديات وحزم النظام داخل الصورة، وعند ظهور CVE جديد يمكنك الاستعلام عن الصور المتأثرة فوراً عبر أدوات مثل Trivy."
      },
      {
        "id": "q6-2",
        "topic": "Trivy CVE Scanning Gate",
        "difficulty": "Medium",
        "question": "في الـ CI، تريد فحص صورة Docker باستخدام **Trivy** ومنع استمرار النشر إذا وُجدت ثغرات `CRITICAL` أو `HIGH` لها إصلاح متوفر، دون إيقاف البناء على ثغرات لا يوجد لها Fix بعد. ما الخيارات المناسبة؟",
        "options": [
          "docker inspect <image> | grep CVE",
          "trivy image --severity LOW --exit-code 0 <image>",
          "trivy fs --skip-files \"*\" .",
          "trivy image --severity CRITICAL,HIGH --ignore-unfixed --exit-code 1 <image>"
        ],
        "correctIndex": 3,
        "hint": "تحتاج لتحديد الشدة (`--severity`) وتجاهل غير القابلة للإصلاح (`--ignore-unfixed`) وإرجاع فشل (`--exit-code 1`).",
        "explanation": "تمرير `--severity CRITICAL,HIGH --ignore-unfixed --exit-code 1` يجعل Trivy يكسر خط الـ CI فقط عند وجود ثغرات خطيرة قابلة للترقية والإصلاح، مما يقلل الضجيج غير القابل للتنفيذ."
      },
      {
        "id": "q6-3",
        "topic": "SonarQube/Semgrep vs Terrascan",
        "difficulty": "Medium",
        "question": "في HiveBox، ما الدور المتكامل لكل من **SonarQube / Semgrep** مقارنةً بـ **Terrascan** داخل خط الـ CI؟",
        "options": [
          "SonarQube/Semgrep يفحصان جودة وأمان الكود المصدري (SAST مثل Python)، بينما Terrascan يفحص ملفات البنية التحتية ككود (IaC مثل Kubernetes/Terraform/Dockerfile) بحثاً عن أخطاء التهيئة الأمنية",
          "كلاهما مخصص فقط لقياس استهلاك الذاكرة في المتصفح",
          "Terrascan يفحص Python و SonarQube يدير شهادات TLS",
          "SonarQube ينشئ حاويات Docker و Semgrep يحذف قواعد البيانات"
        ],
        "correctIndex": 0,
        "hint": "فرّق بين SAST لكود التطبيق وبين IaC Misconfiguration Scanning.",
        "explanation": "أدوات SAST (SonarQube/Semgrep) تكشف العيوب البرمجية والثغرات في منطق الكود، بينما أدوات IaC security (Terrascan/Checkov/Trivy config) تكشف أخطاء التهيئة مثل `privileged: true` أو فتح منافذ خطرة في K8s/Terraform."
      },
      {
        "id": "q6-4",
        "topic": "Kyverno Policy-as-Code",
        "difficulty": "Hard",
        "question": "تريد فرض سياسة على مستوى كلاستر Kubernetes ترفض نشر أي Pod لا يحدد `resources.limits` أو يستخدم وسوم `:latest` أو يعمل بصلاحية `root`، حتى لو نُشر يدوياً متجاوزاً الـ CI. ما دور **Kyverno** هنا؟",
        "options": [
          "يستبدل `kube-apiserver` بالكامل",
          "يعمل كمتصفح ويب لعرض لوحات Grafana",
          "يعمل كـ Admission Controller داخل Kubernetes يفحص الموارد لحظة إنشائها ويرفض المخالفة (`Enforce`) أو يسجل تنبيهاً (`Audit`) بصيغة YAML أصلية لـ K8s",
          "يقوم ببناء صور Docker بدلاً من GitHub Actions"
        ],
        "correctIndex": 2,
        "hint": "Policy-as-Code عند بوابة Admission في Kubernetes.",
        "explanation": "Kyverno يعمل كـ Dynamic Admission Controller في الكلاستر، يتحقق من كل Resource (عبر سياسات `ClusterPolicy` مكتوبة بـ YAML) ويمنع أو يعدل الموارد المخالفة لمعايير الأمان قبل حفظها في `etcd`."
      },
      {
        "id": "q6-5",
        "topic": "Dependabot & Dependency Hygiene",
        "difficulty": "Easy",
        "question": "ما الفائدة العملية من تفعيل **Dependabot** في مستودع HiveBox على GitHub؟",
        "options": [
          "إلغاء الحاجة لاختبارات `pytest`",
          "تشغيل كلاستر Kind على خوادم GitHub مجاناً للأبد",
          "تحويل كود FastAPI إلى JavaScript",
          "إصدار Pull Requests تلقائية لتحديث حزم Python و GitHub Actions وصور الأساس عند اكتشاف ثغرات أمنية أو إصدارات أحدث"
        ],
        "correctIndex": 3,
        "hint": "أتمتة متابعة تحديثات الاعتماديات عبر PRs.",
        "explanation": "Dependabot يراقب ملفات مثل `requirements.txt` و `Dockerfile` و `.github/workflows/*.yml` ويفتح PRs محدثة لتقليل نافذة التعرض للثغرات المعروفة، وتمر تلك الـ PRs عبر اختبارات الـ CI."
      },
      {
        "id": "q6-6",
        "topic": "Grafana Loki Architecture",
        "difficulty": "Medium",
        "question": "بماذا يتميز **Grafana Loki** في تجميع سجلات الحاويات مقارنةً بـ Elasticsearch (ELK) في البيئات السحابية وكلاستر Kubernetes؟",
        "options": [
          "Loki لا يدعم البحث عن النصوص داخل السجلات مطلقاً",
          "Loki يفهرس البيانات الوصفية/الوسوم (Labels مثل `namespace`, `pod`, `app`) فقط ويخزن السجلات مضغوطة في Object Storage دون فهرسة كاملة لكل نص السجل، مما يخفض استهلاك الذاكرة والتكلفة",
          "Loki يعمل فقط على أنظمة Windows",
          "Loki يخزن السجلات داخل `etcd` مباشرة"
        ],
        "correctIndex": 1,
        "hint": "شعار Loki: \"Like Prometheus, but for logs\".",
        "explanation": "على عكس Elasticsearch الذي يبني Inverted Index لكل الكلمات، يفهرس Loki الـ Labels فقط (مطابقاً لتسميات Prometheus) ويضغط الـ Log streams في chunks، ما يجعله خفيفاً وسهل التشغيل."
      },
      {
        "id": "q6-7",
        "topic": "Log Aggregation Pipeline (Promtail/Alloy & Loki)",
        "difficulty": "Medium",
        "question": "في كلاستر Kubernetes، لماذا يُنشر جامع السجلات (مثل Promtail أو Grafana Alloy) كـ **DaemonSet** غالباً؟",
        "options": [
          "لتحويل DaemonSet إلى LoadBalancer خارجي",
          "لأنه لا يمكن تشغيل أكثر من Pod واحد في الكلاستر كله",
          "لضمان تشغيل نسخة واحدة على كل Node لقراءة سجلات حاويات تلك العقدة من `/var/log/pods` وإرسالها إلى Loki",
          "لإيقاف كتابة السجلات في `stdout`"
        ],
        "correctIndex": 2,
        "hint": "ملفات سجلات الـ Pods تُكتب على قرص كل Node.",
        "explanation": "كل Node يحفظ سجلات حاوياته محلياً؛ تشغيل جامع السجلات كـ `DaemonSet` يضمن وجود Agent على كل عقدة يجمع السجلات ويربطها ببيانات K8s الوصفية (Pod, Namespace, Labels) ويرسلها لـ Loki."
      },
      {
        "id": "q6-8",
        "topic": "Pull-based GitOps (Argo CD)",
        "difficulty": "Medium",
        "question": "ما الميزة الأمنية والتشغيلية الأساسية لنشر التطبيقات عبر **Argo CD (Pull-based GitOps)** مقارنةً بـ Push-based CI (`kubectl apply` من داخل GitHub Actions)؟",
        "options": [
          "لا يحتاج GitHub Actions إلى صلاحيات Admin أو kubeconfig للوصول المباشر للكلاستر؛ Argo CD داخل الكلاستر يسحب التغييرات من Git ويكشف ويعالج الانحراف (Drift/Self-Heal) باستمرار",
          "Push-based أسرع لأن الكود يُرفع بالبريد الإلكتروني",
          "Argo CD يلغي الحاجة لاستخدام مستودعات Git تماماً",
          "Argo CD يبني صور Docker بدلاً من GitHub Actions"
        ],
        "correctIndex": 0,
        "hint": "أين تبقى بيانات اعتماد الكلاستر، وكيف يكتشف الكلاستر أي تعديل يدوي لاحق؟",
        "explanation": "في نموذج Pull-based GitOps مع Argo CD، تبقى صلاحيات الكلاستر داخل الكلاستر نفسه (لا حاجة لكشف Cluster credentials للـ CI الخارجي)، مع مراقبة مستمرة لـ Git لإصلاح أي Drift تلقائياً."
      },
      {
        "id": "q6-9",
        "topic": "Argo CD Sync, Self-Heal & Prune",
        "difficulty": "Hard",
        "question": "قمت بتفعيل `automated: { prune: true, selfHeal: true }` في Argo CD Application. ماذا يحدث إذا عدّل أحدهم عدد النسخ بـ `kubectl scale` يدوياً، وماذا يحدث إذا حذفت ملف Service من مستودع GitOps؟",
        "options": [
          "يتجاهل Argo CD كلا التغييرين حتى يعيد المهندس تثبيت الكلاستر",
          "`prune` يعيد تشغيل الكلاستر كله و`selfHeal` يحذف مستودع Git",
          "`selfHeal` يعيد عدد النسخ لما هو محدد في Git، و`prune` يحذف الـ Service المحذوفة من الكلاستر لمطابقة Git",
          "يحذف Argo CD كل الـ Namespaces في الكلاستر"
        ],
        "correctIndex": 2,
        "hint": "فكّر في: Self-Heal ضد التعديلات اليدوية داخل الكلاستر، و Prune للموارد التي لم تعد في Git.",
        "explanation": "`selfHeal: true` يصحح تلقائياً أي انحراف يدوي في الكلاستر ليعود مطابقاً لـ Git، بينما `prune: true` يزيل من الكلاستر الموارد التي حُذفت من مستودع Git."
      },
      {
        "id": "q6-10",
        "topic": "CI vs GitOps Repo Separation",
        "difficulty": "Hard",
        "question": "لماذا يُفضل في أنظمة GitOps المتقدمة فصل مستودع الكود المصدري عن مستودع الـ GitOps Manifests (أو منع حلقة التكرار اللانهائية في نفس المستودع)؟",
        "options": [
          "لأن GitHub يمنع وجود أكثر من فرع واحد في المستودع",
          "لأن Argo CD لا يدعم قراءة ملفات YAML إذا وُجد ملف `.py` في نفس الحساب",
          "لزيادة استهلاك مساحة التخزين في GitHub",
          "لأن تحديث وسم الصورة في ملفات النشر لا يجب أن يشغّل بناء صورة Docker جديدة بلا نهاية، ولفصل صلاحيات المطورين عن صلاحيات النشر الإنتاجي وتوضيح سجل النشرات (Audit Trail)"
        ],
        "correctIndex": 3,
        "hint": "تجنب CI infinite loops وفصل Audit Trail وتراخيص التعديل.",
        "explanation": "فصل المستودعين (أو عزل المسارات بـ `paths-ignore`) يمنع CI من إعادة بناء الصورة عند تغير YAML فقط، ويوفر تاريخ تدقيق نظيف لعمليات النشر وصلاحيات أدق على بيئة الإنتاج."
      },
      {
        "id": "q6-11",
        "topic": "ExternalDNS",
        "difficulty": "Medium",
        "question": "ما المشكلة التي يحلها **ExternalDNS** عند نشر تطبيقات متعددة عبر Kubernetes Ingress أو Services؟",
        "options": [
          "يراقب موارد Ingress/Service في Kubernetes ويُنشئ أو يحدث سجلات DNS (مثل A/TXT في Route53 أو Cloudflare) تلقائياً دون تدخل يدوي",
          "يصنع صور Docker تلقائياً عند كل Commit",
          "يشفر قرص تخزين عقدة Kubernetes",
          "يستبدل kube-proxy داخل العقد"
        ],
        "correctIndex": 0,
        "hint": "أتمتة ربط أسماء النطاقات بعنوان الـ LoadBalancer/Ingress تلقائياً.",
        "explanation": "ExternalDNS يقرأ الـ Hostnames من الـ Ingress/Service annotations ويحدث مزود الـ DNS الخارجي تلقائياً، مما يحذف خطوة إنشاء السجلات يدوياً مع كل خدمة جديدة."
      },
      {
        "id": "q6-12",
        "topic": "Cert-Manager & Let’s Encrypt",
        "difficulty": "Medium",
        "question": "لإتاحة HTTPS تلقائياً على نطاق HiveBox في Kubernetes باستخدام **Cert-Manager** و **Let’s Encrypt**، ما الكائن الذي تهيئه لتحديد مزود الشهادات وطريقة التحقق (مثل HTTP-01 أو DNS-01)؟",
        "options": [
          "HorizontalPodAutoscaler",
          "ClusterIssuer (أو Issuer) مع الإشارة إليه في annotations الخاصة بـ Ingress لإنشاء Certificate و TLS Secret تلقائياً",
          "PersistentVolumeClaim",
          "ConfigMap داخل kube-public"
        ],
        "correctIndex": 1,
        "hint": "الـ Issuer يمثل جهة الإصدار، و Ingress يطلب الشهادة لتُحفظ في Secret.",
        "explanation": "Cert-Manager يقرأ `ClusterIssuer`/`Issuer` (مثلاً Let’s Encrypt ACME)، ينفذ تحدي التحقق (HTTP-01 عبر Ingress أو DNS-01)، ويحفظ الشهادة والمفتاح الخاص في Kubernetes Secret ويجددها قبل انتهائها."
      },
      {
        "id": "q6-13",
        "topic": "K8s NetworkPolicies & RBAC",
        "difficulty": "Hard",
        "question": "افتراضياً في Kubernetes، هل يستطيع أي Pod في Namespace `default` الاتصال بقاعدة بيانات في Namespace `data`؟ وكيف تقيد هذا الوصول تطبيقاً لمبدأ Zero Trust؟",
        "options": [
          "نضع كلمة مرور على ملف `Ingress.yaml`",
          "لا، Kubernetes يمنع أي تواصل بين الـ Pods افتراضياً",
          "نستخدم `chmod 700` على ملف الـ Service",
          "نعم، كل الـ Pods تتواصل بحرية افتراضياً؛ نطبق `NetworkPolicy` (Deny-All افتراضياً ثم السماح فقط لـ Pods التطبيق المحددة بـ Labels على منفذ القاعدة)"
        ],
        "correctIndex": 3,
        "hint": "السلوك الافتراضي لشبكة Kubernetes هو Flat/Open network ما لم تُفرض سياسات شبكة.",
        "explanation": "شبكة Kubernetes تسمح بكل الاتصالات بين الـ Pods افتراضياً؛ فرض `NetworkPolicy` (بشرط دعم الـ CNI مثل Calico/Cilium) يعزل الخدمات في الطبقة L3/L4 وفق Least Privilege."
      },
      {
        "id": "q6-14",
        "topic": "Kubernetes Secrets Management",
        "difficulty": "Hard",
        "question": "في نموذج GitOps، لماذا يُمنع وضع ملف Kubernetes `Secret` عادي (المشفّر بـ Base64 فقط) داخل مستودع Git العام، وما البدائل الآمنة؟",
        "options": [
          "لأن Argo CD يحذف أي ملف اسمه `secret.yaml`",
          "لأن Kubernetes لا يقرأ صيغة Base64 أصلاً",
          "لأن Base64 مجرد ترميز وليس تشفيراً ويمكن فكه فوراً؛ البدائل استخدام External Secrets Operator (مع AWS Secrets Manager/Vault) أو Sealed Secrets أو SOPS",
          "لأن Base64 يزيد حجم الملف بمقدار 100 ضعف"
        ],
        "correctIndex": 2,
        "hint": "`echo \"...\" | base64 -d` يكشف أي Secret عادي في ثانية.",
        "explanation": "الـ Base64 ليس تشفيراً. في GitOps نستخدم أدوات مثل External Secrets Operator لسحب الأسرار من مخزن آمن، أو Sealed Secrets / SOPS لتخزين أسرار مشفرة فعلياً داخل Git."
      },
      {
        "id": "q6-15",
        "topic": "Pod Security & Immutable RootFS",
        "difficulty": "Easy",
        "question": "ما أثر تفعيل `readOnlyRootFilesystem: true` و `allowPrivilegeEscalation: false` في `securityContext` الخاص بحاوية التطبيق على Kubernetes؟",
        "options": [
          "منع التطبيق والمهاجم المحتمل من تعديل ملفات النظام داخل الحاوية أو رفع الصلاحيات، مع توجيه أي كتابة مؤقتة ضرورية إلى `emptyDir` volume فقط",
          "منع الحاوية من قراءة متغيرات البيئة",
          "منع الخدمة من استقبال طلبات HTTP GET",
          "حذف سجل الحاوية من `kubectl logs`"
        ],
        "correctIndex": 0,
        "hint": "تصلب الحاوية (Container Hardening) في وقت التشغيل.",
        "explanation": "تقييد نظام الملفات الجذري للقراءة فقط ومنع تصعيد الصلاحيات يصعّب على المهاجم تثبيت أدوات خبيثة أو تعديل ملفات التشغيل، وتُوجه الملفات المؤقتة إلى `emptyDir` مخصص."
      }
    ]
  },
  {
    "id": "quiz-m7",
    "moduleId": "module-7",
    "moduleNumber": "07",
    "title": "Module 7: Capstone Project & Career Readiness",
    "description": "اختبار شامل بمستوى المقابلات الهندسية: معمارية End-to-End، مبادئ SRE (SLI/SLO/SLA/Error Budgets, Incident Management, Post-mortems)، مقايضات System Design، تشغيل أحمال AI/ML و LLM المحاواة، وسيناريوهات الـ CV والمقابلات.",
    "questions": [
      {
        "id": "q7-1",
        "topic": "SRE: SLI vs SLO vs SLA",
        "difficulty": "Easy",
        "question": "أي ترتيب يصف العلاقة الدقيقة بين **SLI** و **SLO** و **SLA** في هندسة موثوقية المواقع (SRE)؟",
        "options": [
          "SLO يجب أن يكون دائماً 100% وإلا يفشل الفريق",
          "SLA هو المقياس اللحظي في Prometheus، و SLI هو العقد القانوني",
          "SLI هو المقياس الفعلي (مثل نسبة نجاح الطلبات)، SLO هو الهدف الداخلي (مثل 99.9%)، و SLA هو العقد القانوني مع العميل وعقوباته عند تجاوز عتبة أشد",
          "المصطلحات الثلاثة متطابقة تماماً وتُستخدم بالتبادل"
        ],
        "correctIndex": 2,
        "hint": "Indicator (قياس) ← Objective (هدف داخلي) ← Agreement (التزام تعاقدي).",
        "explanation": "SLI يقيس الخدمة كمياً (Latency/Availability)، SLO يحدد العتبة المستهدفة داخلياً لحساب Error Budget، و SLA التزام خارجي مع العملاء بعواقب تجارية ويكون عادة أقل تشدداً من SLO."
      },
      {
        "id": "q7-2",
        "topic": "SRE: Error Budgets",
        "difficulty": "Hard",
        "question": "حددتَ SLO للتوافر بنسبة 99.9% شهرياً (ما يعادل ~43 دقيقة Error Budget). بحلول اليوم العشرين من الشهر، استهلك الفريق 100% من ميزانية الأخطاء بسبب نشر ميزات غير مستقرة. وفق منهجية SRE، ما القرار الصحيح؟",
        "options": [
          "رفع SLO فوراً إلى 100% ليعمل المطورون بجد أكبر",
          "فصل مهندس التشغيل المناوب",
          "إيقاف نظام المراقبة لبقية الشهر حتى لا تُسجل أعطال جديدة",
          "تجميد إطلاق الميزات الجديدة (Feature Freeze) وتوجيه جهد الفريق لتحسين الاختبارات والموثوقية والاسترداد حتى يتعافى الـ Error Budget"
        ],
        "correctIndex": 3,
        "hint": "Error Budget هو الآلية الموضوعية للموازنة بين سرعة الإطلاق واستقرار النظام.",
        "explanation": "عند نفاد Error Budget، تتحول الأولوية من إطلاق ميزات جديدة إلى استقرار النظام (إصلاح أسباب الأعطال، تحسين الاختبارات، أتمتة التراجع) لأن الموثوقية وصلت لحد المخاطرة بالـ SLA."
      },
      {
        "id": "q7-3",
        "topic": "SRE: Incident Management Roles",
        "difficulty": "Medium",
        "question": "خلال حادثة انقطاع حاد (SEV-1) في الإنتاج، تشارك 6 مهندسين في نفس قناة التواصل وكل منهم يحاول إعادة تشغيل خدمات مختلفة دون تنسيق. ما دور **Incident Commander (IC)** لحل هذه الفوضى؟",
        "options": [
          "كتابة كود الإصلاح بنفسه وإغلاق قناة التواصل",
          "تنسيق الاستجابة، توزيع المهام الواضحة (Ops/Comms)، اتخاذ القرارات الحاسمة، ومنع الإجراءات المتعارضة حتى استعادة الخدمة",
          "الانتظار حتى تنتهي الحادثة ثم البدء بكتابة الـ CV",
          "إلقاء اللوم على مزود السحابة وإغلاق التذكرة"
        ],
        "correctIndex": 1,
        "hint": "القيادة والتنسيق لا تعني تنفيذ كل شيء يدوياً.",
        "explanation": "في Incident Management، الـ Incident Commander يدير الصورة الكاملة ويوزع الأدوار (مثل Communications Lead و Operations) لضمان سرعة الاستعادة (MTTR) دون تضارب."
      },
      {
        "id": "q7-4",
        "topic": "SRE: Alert Fatigue & Actionable Alerts",
        "difficulty": "Medium",
        "question": "يتلقى المهندس المناوب (On-Call) 80 تنبيهاً في منتصف الليل لأن استهلاك CPU وصل 75% لثلاثين ثانية ثم عاد طبيعياً دون تأثير على المستخدمين. ما التعديل الصحيح على سياسة التنبيهات؟",
        "options": [
          "إطفاء كل التنبيهات من الهاتف ليلاً",
          "تقليل حد التنبيه إلى 30% CPU ليزداد عدد الرسائل",
          "التنبيه على الأعراض المؤثرة على المستخدم أو حرق الـ Error Budget (Symptom-based / Burn-rate alerts) وتحويل تنبيهات الموارد العابرة إلى Dashboard/Ticket غير عاجل",
          "تعيين 10 مهندسين لقراءة نفس التنبيهات المزعجة"
        ],
        "correctIndex": 2,
        "hint": "كل تنبيه يوقظ بشراً ليلاً يجب أن يكون عاجلاً وقابلاً للتنفيذ (Actionable).",
        "explanation": "Alert Fatigue يؤدي لتجاهل التنبيهات الحرجة؛ أفضل ممارسة هي استهداف الأعراض (مثل ارتفاع 5xx أو Latency أو SLO burn rate) بدلاً من الأسباب العابرة كقفزة CPU قصيرة."
      },
      {
        "id": "q7-5",
        "topic": "End-to-End Architecture Flow",
        "difficulty": "Medium",
        "question": "في مشروع Capstone متكامل، ما التسلسل الدقيق لحركة التغيير من جهاز المطور حتى وصول طلب المستخدم لخدمة محدثة بأمان؟",
        "options": [
          "Push إلى Git ← CI (Lint, Unit/Integration Test, SAST, Build Image, Trivy Scan, Push to Registry) ← تحديث GitOps Repo ← Argo CD Sync على K8s ← طلب المستخدم عبر DNS/TLS Ingress إلى Pod سليم عبر `/readyz`",
          "تعديل الكود مباشرة على السيرفر عبر SSH ← حذف الاختبارات ← فتح المنفذ 22 للجميع",
          "Argo CD يبني الكود أولاً ← ثم يقوم المطور بعمل Commit ← ثم تشغيل Hadolint",
          "Terraform يرسل طلبات HTTP المستخدمين مباشرة إلى Valkey"
        ],
        "correctIndex": 0,
        "hint": "تتبع مسار CI ثم Artifact ثم CD/GitOps ثم مسار الطلب الحي.",
        "explanation": "الخط المتكامل يفصل مرحلة CI (التحقق وبناء وفحص الـ Artifact) عن مرحلة CD/GitOps (Argo CD يزامن الحالة التصريحية) ثم مسار التشغيل المحمي بـ TLS و Ingress و Probes و Observability."
      },
      {
        "id": "q7-6",
        "topic": "System Design Trade-offs: Deployment Strategies",
        "difficulty": "Hard",
        "question": "تريد إطلاق نسخة جديدة عالية المخاطرة من خدمة دفع إلكتروني مع تقليل عدد المستخدمين المتأثرين إلى 5% فقط في البداية ومراقبة الأخطاء قبل التعميم، مع أقل تكلفة موارد إضافية مقارنة بمضاعفة البيئة 100%. ما الاستراتيجية الأنسب؟",
        "options": [
          "Recreate Deployment (إيقاف القديم كله ثم تشغيل الجديد)",
          "Blue-Green مع تشغيل 200% موارد ثابتة لمدة شهر دون مراقبة",
          "Canary Release مع مراقبة المقاييس والقدرة على التراجع الفوري",
          "إيقاف الـ Load Balancer أثناء التحديث"
        ],
        "correctIndex": 2,
        "hint": "تحويل نسبة صغيرة من الترافيك تدريجياً للتجربة الحية.",
        "explanation": "Canary Deployment يوجه نسبة محدودة (مثل 5%) من الطلبات للإصدار الجديد ويراقب معدلات الخطأ والكمون (Automated Rollback عند الفشل)، موازناً بين الأمان وتكلفة الموارد مقارنة بـ Blue-Green الكامل."
      },
      {
        "id": "q7-7",
        "topic": "System Design Trade-offs: Managed vs Self-Hosted",
        "difficulty": "Medium",
        "question": "فريق ناشئ مكوّن من 3 مهندسين يبني منصة SaaS إنتاجية ويقارن بين تشغيل قاعدة بيانات PostgreSQL مع Replication و Backups يدوياً داخل Kubernetes مقابل استخدام خدمة مُدارة مثل AWS RDS. ما الاعتبار الهندسي الأرجح؟",
        "options": [
          "تشغيل كل شيء يدوياً دائماً أسهل لأنه لا يحتاج خبرة في النسخ الاحتياطي والترقيات",
          "Kubernetes لا يستطيع تشغيل أي تطبيق يتصل بقاعدة بيانات خارجية",
          "AWS RDS لا تدعم الاتصالات المشفرة TLS",
          "الخدمة المُدارة تقلل العبء التشغيلي (Toil) ومخاطر فقدان البيانات وتسمح للفريق الصغير بالتركيز على المنتج، بينما Self-hosted يبرَّر فقط عند قيود تكلفة ضخمة أو متطلبات خصوصية/تحكم خاصة"
        ],
        "correctIndex": 3,
        "hint": "قيّم التكلفة الخفية للوقت والعمليات (Operational Toil) مقابل تكلفة الفاتورة المباشرة.",
        "explanation": "إدارة قواعد البيانات ذات الحالة (Stateful) بإتاحة عالية ونسخ احتياطي واستعادة نقطة زمنية (PITR) تتطلب جهداً تخصصياً كبيراً؛ الفرق الصغيرة تستفيد غالباً من الخدمات المُدارة لتقليل المخاطر والـ Toil."
      },
      {
        "id": "q7-8",
        "topic": "Containerized AI/ML & LLM Serving",
        "difficulty": "Hard",
        "question": "تنشر خدمة AI/ML Inference (نموذج LLM أو Embeddings) داخل حاوية على Kubernetes، ولاحظت أن تحميل الأوزان (Model Weights بحجم 6GB) يسبب فشل `livenessProbe` وتضخم صورة Docker. ما التصميم الصحيح؟",
        "options": [
          "فصل أوزان النموذج عن صورة الكود (جلبها في InitContainer أو تخزينها على Volume/S3-MinIO مشترك)، وضبط `startupProbe` بمهلة مناسبة لوقت التحميل، وتحديد حدود GPU/CPU/Memory بدقة",
          "تضمين أوزان الـ 6GB داخل صورة Docker ووضع `initialDelaySeconds: 5`",
          "إزالة الـ Probes وتحميل النموذج عند كل طلب HTTP من المستخدم",
          "تشغيل النموذج بصلاحية `root` دون حدود ذاكرة لتجنب OOMKilled"
        ],
        "correctIndex": 0,
        "hint": "تذكّر حجم الصور، بطء الإقلاع أثناء تحميل الأوزان إلى الذاكرة، وفصل البيانات عن الكود.",
        "explanation": "حشر عدة جيجابايت من الأوزان داخل الصورة يبطئ السحب والبناء؛ فصلها عبر PV/Object Storage أو InitContainer مع استخدام `startupProbe` يحمي الحاوية من القتل المبكر أثناء تحميل النموذج."
      },
      {
        "id": "q7-9",
        "topic": "LLM Serving Metrics & Scaling",
        "difficulty": "Hard",
        "question": "عند مراقبة خدمة LLM Inference API في الإنتاج باستخدام Prometheus، لماذا لا يكفي الاعتماد على `CPU Utilization` وحده لضبط Auto-scaling (HPA)، وما المقاييس الأفضل؟",
        "options": [
          "لأن Prometheus لا يدعم جمع أي مقاييس من تطبيقات Python",
          "لأن أحمال الـ LLM قد تكون مقيدة بذاكرة/استهلاك الـ GPU أو بطوابير الطلبات والكمون (TTFT - Time To First Token، Queue Depth، Tokens/sec)، لذا نستخدم Custom/External Metrics للتوسع",
          "لأن المعالج المركزي يرتفع دائماً إلى 100% حتى بدون طلبات",
          "لأن Kubernetes HPA يعمل فقط على قواعد بيانات SQL"
        ],
        "correctIndex": 1,
        "hint": "مقاييس تجربة المستخدم وأنماط الاختناق في LLM تختلف عن خادم CRUD تقليدي.",
        "explanation": "في خدمات الاستدلال والـ LLM، قد يكون الاختناق في GPU VRAM أو KV-cache أو طول طابور الطلبات أو زمن أول رمز (TTFT) وليس CPU؛ التوسع المبني على مقاييس مخصصة (مثل KEDA + Prometheus metrics) أدق بكثير."
      },
      {
        "id": "q7-10",
        "topic": "Kubernetes Resource Governance & Cost Optimization",
        "difficulty": "Medium",
        "question": "في بيئة سحابية بعد الإطلاق، ارتفعت فاتورة Kubernetes بشكل مفاجئ رغم قلة عدد المستخدمين، واكتشفت أن المطورين طلبوا `requests: 4Gi` لكل خدمة صغيرة تستهلك فعلياً 150Mi فقط. ما الأدوات والآليات التي تعالج هذا الهدر؟",
        "options": [
          "إيقاف تشغيل الكلاستر أثناء ساعات العمل",
          "إزالة كل `requests` و `limits` من جميع الـ Pods في الإنتاج",
          "نقل كل الخدمات إلى Pod واحد ضخم بعملية واحدة",
          "مراجعة المقاييس الفعلية (Prometheus/VPA)، تطبيق `LimitRange` و `ResourceQuota` على الـ Namespaces، وضبط Requests واقعية (Rightsizing)"
        ],
        "correctIndex": 3,
        "hint": "HPA و Cluster Autoscaler يحجزان العقد بناءً على `requests` لا الاستهلاك الفعلي.",
        "explanation": "تضخيم `requests` (Over-provisioning) يجبر الكلاستر على تشغيل عقد أكثر بتكلفة عالية؛ الحقن الصحيح عبر Rightsizing + `LimitRange`/`ResourceQuota` يضبط التكلفة دون الإضرار بالاستقرار."
      },
      {
        "id": "q7-11",
        "topic": "Interview Scenario: Debugging \"502 Bad Gateway\"",
        "difficulty": "Hard",
        "question": "في مقابلة تقنية سُئلت: \"المستخدمون يواجهون `502 Bad Gateway` من Ingress-Nginx عند طلب `/api/temperature`، كيف تشخص المشكلة منهجياً؟\" ما التسلسل الهندسي الأدق؟",
        "options": [
          "إعادة تشغيل اللابتوب وتغيير متصفح الإنترنت",
          "حذف شهادة TLS من Cert-Manager فوراً",
          "التحقق من وجود Endpoints سليمة للـ Service (`kubectl get endpoints`)، حالة جاهزية الـ Pods و`/readyz` (`describe pod`)، مطابقة `targetPort` مع منفذ الحاوية، ثم فحص سجلات الـ Pod وسجلات Ingress Controller",
          "زيادة حجم `S3 Bucket` في AWS"
        ],
        "correctIndex": 2,
        "hint": "`502` تعني أن الـ Proxy (Ingress) تواصل مع الخلفية أو حاول التوجيه ولم يتلقَّ استجابة صالحة.",
        "explanation": "فحص سلسلة التوجيه من الأعلى للأسفل (`Ingress` ← `Service/Endpoints` ← `Pod Readiness/Port` ← `App Logs`) يكشف سريعاً إن كان السبب غياب Pods جاهزة، خطأ `targetPort`، أو انهيار التطبيق أثناء معالجة الطلب."
      },
      {
        "id": "q7-12",
        "topic": "Portfolio & ATS CV Storytelling (STAR)",
        "difficulty": "Easy",
        "question": "أثناء كتابة مشروع HiveBox أو AutoTele في السيرة الذاتية المتوافقة مع ATS، أي صياغة أقوى تقنياً أمام مسؤولي التوظيف ومهندسي المقابلات؟",
        "options": [
          "\"صممت ونشرت Microservice بـ FastAPI و Docker (Multi-stage, Non-root) مع CI/CD عبر GitHub Actions (pytest, Hadolint, Trivy) ونشر GitOps بـ Argo CD على Kubernetes مع مراقبة Prometheus/Loki.\"",
          "\"عملت على Docker و Kubernetes و CI/CD في مشروع تدريبي.\"",
          "\"كتبت كل الملفات بسرعة وحفظتها على سطح المكتب.\"",
          "\"أعرف جميع أدوات DevOps بنسبة 100%.\""
        ],
        "correctIndex": 0,
        "hint": "تجنب الجمل العامة واذكر الأدوات والممارسات والأثر القابل للتحقق.",
        "explanation": "السيرة القوية تربط المهارات التنفيذية بسياق هندسي واضح (ماذا بنيت، بأي معايير أمان واختبار، وما النتيجة/الأتمتة المحققة)، ما يرفع التوافق مع ATS ويوفر محاور نقاش غنية في المقابلة."
      },
      {
        "id": "q7-13",
        "topic": "Interview Scenario: Stateful Architecture & Backup",
        "difficulty": "Medium",
        "question": "عند بناء مشروع مثل **AutoTele** (workers متعددة مع PostgreSQL و Docker)، سألك المحاور: \"ماذا يحدث لو تكرر تنفيذ مهمة (Job) بسبب إعادة محاولة عامل (Worker Retry)؟\" ما المبدأ الذي يضمن سلامة البيانات؟",
        "options": [
          "حذف قاعدة البيانات عند كل محاولة فاشلة",
          "Idempotency (التكرار الآمن): تصميم العمليات ومفاتيح التكرار بحيث لا يؤدي تنفيذ الرسالة أكثر من مرة إلى آثار مكررة أو فاسدة في قاعدة البيانات",
          "منع العمال من إعادة المحاولة نهائياً عند أي خطأ شبكي",
          "تشغيل عامل واحد فقط وإلغاء التوازي"
        ],
        "correctIndex": 1,
        "hint": "في الأنظمة الموزعة (At-least-once delivery)، نفس الرسالة قد تصل مرتين.",
        "explanation": "الأنظمة الموزعة تعتمد غالباً تسليم At-least-once؛ ضمان Idempotency (عبر Idempotency Keys أو قيود Unique في PostgreSQL) يمنع إرسال إعلانات مكررة أو خصم أرصدة مرتين عند إعادة المحاولة."
      },
      {
        "id": "q7-14",
        "topic": "Post-mortem & Continuous Improvement",
        "difficulty": "Medium",
        "question": "بعد إصلاح انقطاع في الإنتاج، ما المخرجات الإلزامية لأي Post-mortem احترافي يغلق الحادثة فعلياً؟",
        "options": [
          "حذف سجلات Grafana Loki الخاصة بيوم الحادثة",
          "كتابة سطر واحد: \"تم الإصلاح بنجاح\" وإغلاق المحادثة",
          "إرسال اسم المطور الذي كتب الكود للإدارة العليا",
          "ملخص الجدول الزمني، الأثر على المستخدمين، الأسباب الجذرية (Root Causes - 5 Whys)، ما سار جيداً وما تعثر، و Action Items محددة بمالك وموعد تنفيذ"
        ],
        "correctIndex": 3,
        "hint": "الهدف من Post-mortem هو تحويل الألم التشغيلي إلى تحسينات وقائية ملموسة.",
        "explanation": "الـ Post-mortem الفعّال بلا لوم يوثق الوقائع بدقة، يحلل السبب الجذري التقني والتنظيمي، ويُنشئ مهام وقائية قابلة للتتبع تمنع تكرار الفشل مستقبلاً."
      },
      {
        "id": "q7-15",
        "topic": "Seniority Mindset & Architecture Trade-offs",
        "difficulty": "Hard",
        "question": "في نهاية المقابلة، سألك قائد الفريق: \"متى ترفض إضافة Kubernetes أو Microservices لمشروع جديد وتختار بنية أبسط؟\" ما الإجابة التي تعكس نضجاً هندسياً حقيقياً؟",
        "options": [
          "عندما يكون الفريق صغيراً ونطاق العمل والزيارات لا يبرران التعقيد التشغيلي لـ K8s وتوزيع الخدمات؛ حينها Modular Monolith أو حاويات مُدارة أبسط تحقق سرعة تسليم وتكلفة وموثوقية أعلى حتى يظهر مبرر التوسع",
          "أبداً؛ Kubernetes إلزامي لأي مشروع حتى لو كان موقعاً تعريفياً من صفحة واحدة",
          "عندما لا تتوفر أيقونات جميلة في لوحة التحكم",
          "لأن Kubernetes لا يدعم تشغيل قواعد البيانات أو الشبكات"
        ],
        "correctIndex": 0,
        "hint": "الهندسة الجيدة تعني اختيار أبسط معمارية تحقق المتطلبات الحالية والمستقبلية القريبة دون تعقيد مجاني.",
        "explanation": "مهندس DevOps/SRE الناضج لا يطارد الأدوات الرائجة (Resume-Driven Development)، بل يوازن بين التعقيد التشغيلي وحجم الفريق ومتطلبات النطاق، مختاراً الحل الأبسط القابل للتطور لاحقاً."
      }
    ]
  }
];
