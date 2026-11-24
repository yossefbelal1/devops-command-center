# Youssef.DevOps — منصة المسار الهندسي وسوق العمل (Glassy V5 Light Edition)

تطبيق ويب تفاعلي كامل مبني بـ **React.js + Vite + Tailwind CSS + GSAP + Lenis Smooth Scroll + Lucide Icons**، بتصميم فاتح نظيف ومريح للعين (`#F6F6F2` + Glassmorphism أزرق وأبيض)، مقسم إلى **5 أقسام منفصلة ومنظمة** بدون أي تكدس في صفحة واحدة.

---

## 🎯 المعمارية والأقسام الخمسة للمنصة

1. **المسار والموديولات (Roadmaps — 7 Module Cards + Timeline Journey):**
   - الصفحة الرئيسية تعرض **كروت الموديولات السبعة (01 – 07)** بألوان مميزة وأيقونات التقنيات ونسبة إنجاز كل موديول.
   - الضغط على أي موديول يفتح **شاشة رحلة التعلم (Learning Journey)** بنظام:
     - **شريط Timeline جانبي ثابت (Sticky Sidebar)** يجمع الأجزاء والنقاط ويعرض التقدم اللحظي.
     - **بطاقات زمنية قابلة للفتح والطي (Timeline Scrolling Accordions)** عبر Lenis Smooth Scroll.
     - **شيك ليست فرعية دقيقة** داخل كل نقطة (مثلاً 6 نقاط تفصيلية داخل `2.1 Python Fundamentals`) + ملاحظات شخصية تُحفظ تلقائياً في `LocalStorage`.

2. **المشاريع والتدقيق (Projects & Audits):**
   - **مشروع HiveBox (Phases 1–6):** تتبع تفصيلي للمراحل الست مع المخرجات (Deliverables) ومعيار الإنجاز (Definition of Done).
   - **تدقيق أمان الحاويات (15 Container Best Practices):** فحص الامتثال لـ 15 معياراً من `devopsroadmap.io/projects/container-best-practices/`.

3. **الرواتب وخطة التقديم (Career & Market Strategy):**
   - حسم موقف DEPI الرسمي وخطة الـ 3 ركائز (Outsourcing + GitHub/Upwork + CKA / AWS SAA + AI Workloads).
   - استراتيجية صياغة شهادة **Bachelor's in Management Information Systems (MIS)** لتجاوز فلاتر الـ ATS.
   - مؤشرات الرواتب الواقعية (مصر محلي و Outsourcing، الخليج، الريموت بالدولار) + خريطة **"امتى تقدم على شغل؟"** (4 مراحل زمنية).

4. **القرارات والمقابلات (Engineering Playbook):**
   - دليل **"امتى أستخدم إيه؟"** (Bash vs Python، Compose vs K8s، Terraform vs Ansible، ArgoCD vs CI-Push، Prometheus vs Loki).
   - **بنك أسئلة المقابلات** بإطار STAR مع نموذج الإجابة وتحديد الأسئلة التي تم التدرب عليها.

5. **التحليلات والنسخ الاحتياطي (Glassy Analytics & Backup):**
   - رسوم بيانية تفاعلية لنسب الإنجاز لكل موديول، مسجل ساعات المذاكرة اليومية، وتصدير/استيراد النسخة الاحتياطية بصيغة JSON.

---

## 🚀 التشغيل
- التطبيق يعمل حالياً عبر الخادم المحلي على الرابط: **`http://localhost:8080`**
- لإعادة تشغيله في أي وقت مستقبلاً، اضغط نقراً مزدوجاً على: **`run_dashboard.bat`** أو **`start_server.bat`**.
- لتطوير الكود لاحقاً:
  ```bash
  npm install
  npm run dev     # وضع التطوير
  npm run build   # بناء النسخة الإنتاجية في dist/
  ```
