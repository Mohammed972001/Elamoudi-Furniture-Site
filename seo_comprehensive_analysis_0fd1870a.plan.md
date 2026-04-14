---
name: SEO Comprehensive Analysis
overview: تحليل شامل لنقاط القوة والضعف في SEO لموقع العمودي للمفروشات (elamoudifurniture.com) بناءً على تحليل الكود المصدري + الموقع اللايف + بيانات Google Search Console.
todos:
  - id: fix-critical-c1
    content: "صفحات /carpets و /decor بتجيب ترافيك من جوجل (93+6 نقرة) لكن مش موجودة = 404! لازم نرجعها أو نعمل redirect"
    status: pending
  - id: fix-critical-c2
    content: إنشاء صفحة /products - بترجع 404 والـ breadcrumbs بتربط ليها
    status: pending
  - id: fix-critical-c3
    content: إصلاح robots.txt الفاضي على الموقع اللايف
    status: pending
  - id: fix-critical-c4
    content: إنشاء ملف og-image.jpg بمقاس 1200x630 في public/
    status: pending
  - id: fix-critical-c5
    content: إنشاء favicon احترافي بدل WhatsApp.jpeg
    status: pending
  - id: fix-critical-c6
    content: "التحقيق في 10 صفحات غير مفهرسة في GSC وإصلاحها"
    status: pending
  - id: fix-important-i1
    content: تغيير h1 في Logo.tsx لـ span/p عشان يبقى h1 واحد بس
    status: pending
  - id: fix-important-i2
    content: إزالة main المتكرر من page.tsx
    status: pending
  - id: fix-important-i3
    content: تصحيح اسم البراند في صفحة about من العالمية للعمودي
    status: pending
  - id: fix-important-i4
    content: إضافة canonical و twitter metadata لصفحة garden
    status: pending
  - id: fix-important-i5
    content: إزالة aggregateRating الوهمي من ProductSchema
    status: pending
  - id: fix-important-i6
    content: إصلاح WebSiteSchema - إضافة SearchAction أو إزالة الـ comment
    status: pending
  - id: fix-important-i7
    content: "تحسين CTR للكلمات Generic (موكيت = 698 ظهور / 11 نقرة = 1.6% CTR)"
    status: pending
  - id: fix-important-i8
    content: "التأكد من redirect من non-www لـ www (elamoudifurniture.com -> www)"
    status: pending
  - id: fix-minor
    content: إصلاح المشاكل الثانوية (Logo alt, robots paths, loading states)
    status: pending
isProject: false
---

# تحليل SEO شامل - موقع العمودي للمفروشات

## الحالة العامة

الموقع مبني بـ **Next.js 16 (App Router)** مع **React 19** و **TypeScript** - وده أساس تقني ممتاز لـ SEO لأن Next.js بيدعم SSR/SSG بشكل أصلي.

---

## بيانات Google Search Console (آخر 3 شهور)

### ملخص الأداء
- **إجمالي النقرات**: 439 نقرة
- **إجمالي مرات الظهور**: 11,900 (11.9 ألف)
- **متوسط نسبة النقر (CTR)**: 3.7%
- **متوسط ترتيب الموقع**: 10.9 (= بداية الصفحة الثانية في جوجل)

### أهم الكلمات المفتاحية (Top Queries)
| الكلمة | الظهور | النقرات | CTR | ملاحظة |
|--------|--------|---------|-----|--------|
| العمودي للمفروشات | 196 | 66 | 33.7% | Brand - ممتاز |
| مفروشات العمودي | 186 | 62 | 33.3% | Brand - ممتاز |
| محلات العمودي | 71 | 26 | 36.6% | Brand - ممتاز |
| العمودي للمفروشات والديكورات | 143 | 20 | 14% | Brand |
| العمودي للمفروشات والديكورات بالرياض | 64 | 13 | 20.3% | Brand + Location |
| **موكيت** | **698** | **11** | **1.6%** | **Generic - ضعيف جداً** |
| العمودي للسجاد | 28 | 8 | 28.6% | Brand |
| مفروشات موكيت | 273 | 7 | 2.6% | Generic - ضعيف |
| موكيت سجاد | 99 | 7 | 7.1% | Generic |
| العمودي للموكيت | 17 | 5 | 29.4% | Brand |

**التحليل**: البراند queries (اسم المحل) عندها CTR ممتاز (30%+)، لكن الكلمات العامة (generic) زي "موكيت" و "مفروشات موكيت" عندها CTR ضعيف جداً (1.6%-2.6%). ده معناه إن الـ title/description مش جذاب كفاية للباحثين عن المنتجات بشكل عام.

### أهم الصفحات (Top Pages)
| الصفحة | الظهور | النقرات | ملاحظة |
|--------|--------|---------|--------|
| / (الرئيسية) | 6,070 | 314 | تسيطر على أغلب الترافيك |
| **/carpets** | **1,008** | **93** | **الصفحة مش موجودة في الكود = 404!** |
| /products/mosque-carpets | 656 | 18 | |
| /contact | 482 | 18 | |
| /products/vinyl-roll | 1,150 | 14 | ظهور عالي، نقرات قليلة |
| /products/huky-mihager | 995 | 11 | ظهور عالي، نقرات قليلة |
| elamoudifurniture.com (بدون www) | 200 | 10 | نسخة non-www منفصلة! |
| /products/parket | 770 | 7 | ظهور عالي، نقرات قليلة |
| **/decor** | **413** | **6** | **الصفحة مش موجودة في الكود = 404!** |
| /products/vinyl-mosque | 70 | 6 | |

### التوزيع الجغرافي
- السعودية: 381 نقرة (87% من الترافيك) - 8,195 ظهور
- مصر: 23 نقرة - 881 ظهور
- الكويت: 6 نقرات - 231 ظهور
- الأردن: 5 نقرات - 249 ظهور
- البحرين: 4 نقرات - 147 ظهور

### التوزيع حسب الأجهزة
- الموبايل: 394 نقرة (90%) - 9,786 ظهور
- الديسكتوب: 43 نقرة (10%) - 2,002 ظهور
- التابلت: 1 نقرة - 75 ظهور

### حالة الفهرسة (Indexing)
- **صفحات مفهرسة**: 17 صفحة
- **صفحات غير مفهرسة**: 10 صفحات (بعضها "تم الزحف إليها، لم تتم فهرستها حاليًا")

### ملفات Sitemap
- الـ sitemap.xml مقدم ومقبول
- عدد الروابط المكتشفة: 17
- أخطاء: 0

### Core Web Vitals
- **الموبايل**: لا تتوفر بيانات كافية
- **الديسكتوب**: لا تتوفر بيانات كافية

### الأمان والإجراءات اليدوية
- إجراءات يدوية: **لا يوجد** (ممتاز)
- مشاكل أمان: **لا يوجد** (ممتاز)

### التحسينات (Enhancements)
- مسارات التنقل (Breadcrumbs): **13 صالحة** / 0 أخطاء
- الأسئلة الشائعة (FAQ): **1 صالحة** / 0 أخطاء

### الروابط (Links)
- **روابط خارجية**: 100 نطاق مختلف
- **أهم الصفحات المرتبطة داخلياً**: /about (17 رابط)، /contact (17)، /garden (17)

---

## نقاط القوة

### 1. البنية التقنية قوية
- **Static Generation (SSG)** لصفحات المنتجات عبر `generateStaticParams` في [`src/app/products/[id]/page.tsx`](src/app/products/[id]/page.tsx)
- **Metadata API** مستخدم بشكل صحيح مع `title`, `description`, `keywords`, `canonical`, `openGraph`, `twitter`
- **`metadataBase`** معرف صح في [`src/app/layout.tsx`](src/app/layout.tsx)

### 2. Structured Data (JSON-LD) ممتاز - ومتحقق من GSC
- **13 Breadcrumbs صالحة** + **1 FAQ صالحة** بدون أخطاء في GSC
- **LocalBusinessSchema**, **ProductSchema**, **OrganizationSchema**, **WebSiteSchema**
- **BreadcrumbList** + **FAQPage** schema

### 3. SEO On-Page جيد
- **Sitemap** مقبول في GSC بـ 17 رابط، بدون أخطاء
- **Internal Linking** ممتاز (17 رابط لكل صفحة رئيسية)
- **FAQ Section** بتظهر في نتائج البحث
- **`lang="ar"` و `dir="rtl"`** مضبوطين

### 4. Brand SEO ممتاز
- الـ Brand queries عندها CTR عالي جداً (30%+)
- البراند بيظهر في المراتب الأولى للكلمات المرتبطة باسم المحل

### 5. أمان تام
- **لا يوجد إجراءات يدوية أو مشاكل أمان** في GSC

### 6. Performance تقني
- **Font**: Cairo مع `display: "swap"`
- **Images**: `next/image` مع `webp` و `avif`
- **100 نطاق خارجي** بيربط للموقع

---

## نقاط الضعف (مرتبة بالأولوية)

### مشاكل حرجة (Critical) - بتخسر ترافيك فعلي

#### C1: صفحتين `/carpets` و `/decor` بتجيب ترافيك لكن بترجع 404!
- **المشكلة**: صفحة `/carpets` عندها **93 نقرة و 1,008 ظهور** في جوجل، وصفحة `/decor` عندها **6 نقرات و 413 ظهور** - لكن الصفحتين **مش موجودين في الكود!**
- **التأثير**: **خسارة فعلية لترافيك** - الزوار بيضغطوا على نتيجة البحث وبيلاقوا صفحة 404
- **الحل**: إعادة إنشاء الصفحتين أو عمل redirect لأقرب صفحة منتجات مناسبة

#### C2: صفحة `/products` ترجع 404
- **المشكلة**: الـ breadcrumbs في [`src/app/products/[id]/page.tsx`](src/app/products/[id]/page.tsx) (سطر 77) بتربط لـ `/products` لكن مفيش `src/app/products/page.tsx`
- **الحل**: إنشاء صفحة `/products` تعرض كل المنتجات

#### C3: ملف `robots.txt` فاضي على الموقع اللايف
- **المشكلة**: رغم وجود [`src/app/robots.ts`](src/app/robots.ts) في الكود، الـ robots.txt بيظهر **فاضي تماماً** على الموقع اللايف
- **التأثير**: جوجل مش بيلاقي رابط الـ sitemap.xml في robots.txt (رغم إنه لقى الـ sitemap بطريقة تانية)

#### C4: ملف `og-image.jpg` غير موجود
- **المشكلة**: الـ metadata بتشير لـ `/og-image.jpg` لكن **الملف مش موجود** في `public/`
- **التأثير**: مشاركة الموقع على السوشيال ميديا من غير صورة

#### C5: أيقونة الموقع (Favicon) غير مناسبة
- **المشكلة**: الـ favicon = `/WhatsApp.jpeg` - غير احترافي

#### C6: 10 صفحات غير مفهرسة
- **المشكلة**: من أصل 27 صفحة، **10 صفحات "تم الزحف إليها لكن لم تتم فهرستها"**
- **التأثير**: محتوى موجود لكن مش بيظهر في نتائج البحث

### مشاكل مهمة (Important)

#### I1: متوسط الترتيب 10.9 = بداية الصفحة الثانية
- **التأثير**: الأبحاث بتقول 75% من المستخدمين مش بيروحوا الصفحة التانية
- **الحل**: تحسين المحتوى والـ backlinks للوصول للصفحة الأولى

#### I2: CTR ضعيف جداً للكلمات العامة
- كلمة "موكيت" (698 ظهور / 11 نقرة = **1.6% CTR**)
- "مفروشات موكيت" (273 ظهور / 7 نقرات = **2.6% CTR**)
- **الحل**: تحسين الـ title tags والـ meta descriptions عشان تكون أكثر جاذبية

#### I3: نسخة non-www منفصلة
- `elamoudifurniture.com` (بدون www) بتظهر كصفحة منفصلة بـ **10 نقرات**
- **الحل**: التأكد من redirect 301 من non-www لـ www

#### I4: تعدد H1 في الصفحة الواحدة
- [`src/components/navbar/Logo.tsx`](src/components/navbar/Logo.tsx) فيها `<h1>` + [`src/components/hero/HeroSection.tsx`](src/components/hero/HeroSection.tsx) فيها `<h1>` تاني
- **الحل**: تغيير `<h1>` في `Logo.tsx` لـ `<span>`

#### I5: `<main>` متكرر (nested)
- [`src/app/layout.tsx`](src/app/layout.tsx) (سطر 171) + [`src/app/page.tsx`](src/app/page.tsx) (سطر 35) = اتنين `<main>`
- **الحل**: إزالة `<main>` من `page.tsx`

#### I6: عدم تناسق اسم البراند في صفحة "من نحن"
- [`src/app/about/page.tsx`](src/app/about/page.tsx) بتقول **"العالمية"** بدل **"العمودي"** في سطر 94 و 219

#### I7: صفحة Garden ناقصة metadata
- [`src/app/garden/page.tsx`](src/app/garden/page.tsx) مفيهاش `canonical`, `twitter`, `locale`

#### I8: Product Schema فيه `aggregateRating` وهمي
- [`src/components/seo/JsonLd.tsx`](src/components/seo/JsonLd.tsx) (سطر 209-215): `ratingValue: 4.8`, `reviewCount: 150` ثابت لكل المنتجات
- **خطر**: مخالف لسياسات جوجل - ممكن يسبب Manual Action

#### I9: صفحات المنتجات عندها ظهور عالي ونقرات قليلة
- `/products/vinyl-roll`: 1,150 ظهور / 14 نقرة = **1.2% CTR**
- `/products/huky-mihager`: 995 ظهور / 11 نقرة = **1.1% CTR**
- `/products/parket`: 770 ظهور / 7 نقرات = **0.9% CTR**
- **الحل**: تحسين title و description لهذه المنتجات

### مشاكل ثانوية (Minor)

#### M1: Logo alt text ضعيف
- `alt="logo"` بدل "شعار العمودي للمفروشات"

#### M2: `robots.ts` فيه مسارات غير موجودة
- `/carpets`, `/curtains`, `/kitchens` في الـ allow list

#### M3: مفيش `loading.tsx` أو `Suspense`
- ممكن يأثر على Core Web Vitals (لسه مفيش بيانات كافية في GSC)

#### M4: `WebSiteSchema` ناقص `SearchAction`
- الـ comment بيقول بيدعم sitelinks search box لكن مفيش implementation

---

## نقاط إضافية من تحليل Claude Code (تم التحقق منها ودمجها)

> المصدر: [`SEO-Analysis-Report.md`](.claude/worktrees/loving-sanderson/SEO-Analysis-Report.md) -- تم إعداده بالتوازي. النقاط أدناه هي **فقط** ما هو جديد وصحيح ومش مذكور أعلاه.

### تفصيل أسباب عدم الفهرسة (10 صفحات)
| السبب | العدد | تفاصيل |
|-------|-------|--------|
| 404 صفحة غير موجودة | 3 | صفحات اتمسحت |
| إعادة توجيه (Redirect) | 3 | بتحول لصفحات تانية |
| صفحة بديلة بعلامة canonical | 2 | `/kitchens` و `/curtains` |
| تم الزحف لكن لم تُفهرس | 2 | جوجل زارها لكن قرر ميعرضهاش |

### مفيش Google Analytics (GA4) -- فقط Google Ads
- الكود فيه tag لـ **Google Ads** فقط (`AW-17506948956`)
- **مفيش GA4** (اللي بيكون `G-XXXXXXX`) -- يعني مفيش تتبع لسلوك الزوار على الموقع (bounce rate, session duration, pages per visit)
- ده معناه إنك مش شايف **إزاي** الناس بتتعامل مع الموقع -- فقط بتشوف هل جت من جوجل ولا لأ

### أرقام إضافية من GSC
- **إجمالي الكلمات المفتاحية**: 405 كلمة بحث
- **إجمالي الصفحات في البحث**: 32 صفحة
- **معيار الصناعة**: CTR 3.7% أقل من المتوسط الطبيعي (5-10%) -- فرصة كبيرة للتحسين

### فرصة: كلمات مفتاحية جديدة للاستهداف
الكلمات دي عندها volume عالي ومناسبة للموقع لكن مش مستهدفة بشكل كافي:
- "سجاد الرياض" / "موكيت الرياض" (كلمات جغرافية)
- "أسعار الموكيت" / "أسعار الباركيه" (كلمات نية الشراء)
- "أفضل أنواع الموكيت" / "أنواع الفينيل" (كلمات معلوماتية)
- "موكيت مساجد الرياض" (كلمة متخصصة)
- "تركيب باركيه" (كلمة خدمات)

### فرصة: إضافة مدونة
- مدونة بمقالات عن أنواع الموكيت والأرضيات وطرق الاختيار ممكن تجيب ترافيك من الكلمات المعلوماتية ("أفضل أنواع..."، "كيف تختار..."، "الفرق بين...")
- ده بيبني authority في جوجل

### تحذير: خطر فقدان الترتيب عند التحديثات
- **أي تحديث للموقع لازم يحافظ على كل الـ URLs الحالية** (اللي بتجيب ترافيك)
- لو URL اتغير لازم يكون فيه **redirect 301** من القديم للجديد
- الصفحات اللي لازم تتحفظ: `/`, `/carpets`, `/contact`, `/about`, `/garden`, `/products/*`, `/decor`

### Dark mode CSS غير ضروري
- [`src/app/globals.css`](src/app/globals.css) سطر 18 فيه `@media (prefers-color-scheme: dark)` -- ده بيحمل CSS زيادة بدون فايدة لو الموقع مش بيدعم dark mode

### تقييم شامل بالدرجات (متفق عليه من التحليلين)
| الجانب | التقييم | ملاحظات |
|--------|---------|---------|
| Branded SEO | 7/10 | CTR 30%+ للكلمات المرتبطة بالاسم |
| Generic SEO | 2/10 | CTR 1-3% للكلمات العامة |
| الفهرسة | 6/10 | 17 مفهرسة / 10 غير مفهرسة |
| CTR | 3/10 | 3.7% أقل من المتوسط |
| Sitemap | 9/10 | يشتغل بدون أخطاء |
| Structured Data | 8/10 | JSON-LD + Breadcrumbs + FAQ كلها صالحة |
| أمان | 10/10 | لا إجراءات يدوية ولا مشاكل أمان |
| البنية التقنية | 7/10 | Next.js + SSG + metadata |
| **التقييم العام** | **5.5/10** | **أساس قوي لكن فرص تحسين كبيرة** |

---

## ملخص تنفيذي

```
الأداء العام:
  - 439 نقرة / 11,900 ظهور في 3 شهور
  - CTR 3.7% (محتاج تحسين)
  - ترتيب 10.9 (الصفحة الثانية - محتاج يوصل للأولى)
  - 90% ترافيك من الموبايل
  - 87% ترافيك من السعودية

التقييم العام: 5.5/10

نقاط القوة: 6 (بنية تقنية + JSON-LD + On-Page + Brand SEO + أمان + Performance)
مشاكل حرجة: 6 (صفحات 404 بتخسر ترافيك + robots فاضي + og-image + favicon + صفحات غير مفهرسة)
مشاكل مهمة: 9 (ترتيب ضعيف + CTR ضعيف + www redirect + H1 + main + brand + garden + fake ratings + product CTR)
مشاكل ثانوية: 4
فرص: مدونة + كلمات مفتاحية جديدة + GA4
```

---

## الخطوات القادمة المقترحة (بالترتيب)

1. **إصلاح المشاكل الحرجة** (C1-C6) - خصوصاً صفحات الـ 404 اللي بتخسر ترافيك
2. **تحسين الـ Title Tags والـ Meta Descriptions** لرفع CTR للكلمات العامة
3. **إصلاح المشاكل المهمة** (I1-I9)
4. **إنشاء صفحات جديدة** للمسارات المفقودة (curtains, kitchens)
5. **التحقيق في الصفحات غير المفهرسة** وإصلاحها
6. **إضافة Google Analytics (GA4)** لتتبع سلوك الزوار
7. **إصلاح المشاكل الثانوية**
8. **استهداف كلمات مفتاحية جديدة** (أسعار، أنواع، تركيب)
9. **(اختياري) إنشاء مدونة** لاستهداف الكلمات المعلوماتية
