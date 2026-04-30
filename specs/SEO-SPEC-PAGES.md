# SEO-SPEC-PAGES.md — Phase 4: New Pages (Services, Projects, Locations)

> **Goal:** create 6 high-value SEO pages that target service-intent and local-intent keywords, fill competitive gaps (alsourayia.com, kaffary.com both have dedicated service pages), and build internal-linking depth for the main category pages.
> **Apply after:** SEO-SPEC-TECHNICAL.md (NAP unification) — these pages all import from `@/constants/business`.

---

## Page 1 — `/services/installation`

### Purpose & SEO value

Captures **service-intent** queries: "فني تركيب موكيت بالرياض" (28 imp / pos 37.89), "تركيب موكيت" (~30 imp), "تركيب باركيه", "تركيب فينيل". Currently we rank poorly because no dedicated landing page exists.

### Metadata

```ts
export const metadata: Metadata = {
  title: 'تركيب الموكيت والباركيه والفينيل بالرياض — فنيون معتمدون',
  description: 'خدمة تركيب احترافية للموكيت والباركيه والفينيل في الرياض. فنيون معتمدون، أدوات حديثة، ضمان كامل، تنفيذ في يوم واحد. اطلب فنّي اليوم.',
  keywords: ['تركيب موكيت', 'تركيب باركيه', 'تركيب فينيل', 'فني تركيب الرياض', 'فرش موكيت', 'تركيب أرضيات الرياض'],
  alternates: { canonical: '/services/installation' },
  openGraph: {
    title: 'تركيب احترافي للموكيت والباركيه — العمودي للمفروشات',
    description: 'فنيون معتمدون لتركيب جميع أنواع الأرضيات في الرياض. ضمان كامل وتنفيذ سريع.',
    type: 'website',
    locale: 'ar_SA',
    url: 'https://www.elamoudifurniture.com/services/installation',
    siteName: 'العمودي للمفروشات',
    images: [{ url: '/og/installation.jpg', width: 1200, height: 630, alt: 'خدمة تركيب الأرضيات' }],
  },
  twitter: { card: 'summary_large_image', title: 'تركيب احترافي للأرضيات بالرياض', description: 'فنيون معتمدون، ضمان كامل', images: ['/og/installation.jpg'] },
};
```

### H1
`تركيب احترافي للموكيت والباركيه والفينيل في الرياض`

### Content outline (Arabic — minimum 1,000 words)

- **مقدمة** — لماذا التركيب الاحترافي يصنع الفرق (متانة، مظهر، عمر افتراضي، الضمان)
- **## ما يشمل خدمة التركيب لدينا**
  - معاينة وقياس مجاني داخل الرياض
  - إزالة الأرضيات القديمة (موكيت، بلاط)
  - تجهيز الأرضية وتسويتها
  - تركيب احترافي بأدوات حديثة
  - التنظيف وتسليم نهائي
- **## الأنواع التي نُركّبها**
  - ### تركيب الموكيت بأنواعه
  - ### تركيب الباركيه (طبيعي وصناعي وضد الماء)
  - ### تركيب الفينيل رول والـ LVT
  - ### تركيب العشب الصناعي للحدائق
  - ### تركيب موكيت المساجد بمواصفات شرعية
- **## فنيونا — خبرة تتحدث عن نفسها**
  - فريق معتمد، 15+ سنة خبرة
  - شهادات وتدريب مستمر
  - التزام بالمواعيد
- **## كيف تتم العملية — خطوة بخطوة**
  - حجز الموعد (واتساب/اتصال/زيارة المعرض)
  - معاينة وقياس مجاني
  - عرض سعر مكتوب وموقّع
  - يوم التركيب
  - متابعة ما بعد البيع وضمان
- **## أسعار التركيب 2026**
  - جدول أسعار تقديرية لكل نوع (شامل العمالة)
  - عوامل تؤثر على السعر (المساحة، النوع، الإكسسوارات)
- **## ضمان الخدمة**
  - ضمان سنة على عمل التركيب
  - ضمان المُصنّع على الخامات
- **## أسئلة قبل الحجز** (FAQ block)
- **## احجز فنيًا اليوم** — CTA block مع رقم الواتساب

### JSON-LD schema

`Service` + `LocalBusiness` (mainEntityOfPage):

```ts
const installationServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'تركيب الأرضيات',
  name: 'تركيب الموكيت والباركيه والفينيل',
  description: 'خدمة تركيب احترافي للموكيت والباركيه وأرضيات الفينيل والعشب الصناعي وموكيت المساجد في الرياض.',
  provider: { '@id': `${BUSINESS.url}/#business` }, // refs LocalBusiness from layout
  areaServed: { '@type': 'City', name: 'الرياض' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'خدمات التركيب',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'تركيب الموكيت' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'تركيب الباركيه' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'تركيب الفينيل رول' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'تركيب العشب الصناعي' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'تركيب موكيت المساجد' } },
    ],
  },
};
```

Plus `BreadcrumbList` (الرئيسية → الخدمات → تركيب الأرضيات) and `FAQPage`.

### Internal links
- From: navbar (add `/services` dropdown), `/products/parket`, `/products/vinyl-roll`, `/products/mokite`, every relevant blog article
- To: each product page mentioned + `/contact` + `/services/free-visit`

### Component structure
- Reuse `<Breadcrumbs>`, `<FAQ>`, `<SEOContent>`. Create one new component `<ServiceHero>` (title + bg-image + CTA) reused across all 4 service pages.

### Acceptance
- [ ] `/services/installation` returns 200 with H1 matching keyword
- [ ] Service + BreadcrumbList + FAQPage schemas validate
- [ ] ≥ 1,000 words rendered text
- [ ] Internal linkbacks added to 6 pages

---

## Page 2 — `/services/free-visit`

### Purpose
Captures local-intent: "زيارة مندوب", "معاينة موكيت مجانية", "قياس موكيت" — strong purchase signal.

### Metadata
```ts
export const metadata: Metadata = {
  title: 'زيارة مندوب مجانية لقياس ومعاينة الأرضيات في الرياض',
  description: 'احجز زيارة مندوب مجانية من العمودي للمفروشات لقياس ومعاينة الأرضيات في موقعك بالرياض. عرض سعر فوري بدون أي التزام.',
  keywords: ['زيارة مندوب مجانية', 'معاينة موكيت', 'قياس أرضيات', 'مندوب موكيت الرياض'],
  alternates: { canonical: '/services/free-visit' },
  // ...openGraph + twitter as above with /og/free-visit.jpg
};
```

### H1
`زيارة مندوب مجانية لمنزلك أو منشأتك في الرياض`

### Content outline (≥ 800 words)

- **ما هي خدمة زيارة المندوب المجانية؟**
- **ما تشمله الزيارة:** معاينة، قياس، عرض عينات، استشارة، عرض سعر مكتوب
- **متى تطلبها؟** قبل قرار الشراء، عند الترميم، للعملاء المؤسسيين
- **كيف تحجز موعدًا؟** خطوات بسيطة عبر الواتساب/الهاتف
- **مناطق التغطية** — كل أحياء الرياض
- **ماذا بعد الزيارة؟** قرار الشراء، الجدولة، التركيب
- **شهادات عملاء** (لاحقًا، بعد جمع تقييمات حقيقية)
- **CTA** — احجز الآن

### JSON-LD
`Service` (serviceType: "Free Consultation") + BreadcrumbList + FAQPage

### Internal links
From: `/contact`, `/services/installation`, `/products/*`, blog article 5 (الأسعار)

---

## Page 3 — `/services/warranty`

### Purpose
Trust signal — addresses "ضمان موكيت", "سياسة الإرجاع", "الاستبدال" queries. Also strengthens E-E-A-T (Experience-Expertise-Authoritativeness-Trustworthiness) per Google quality guidelines.

### Metadata
```ts
title: 'الضمان وسياسة الاستبدال والإرجاع — العمودي للمفروشات'
description: 'سياسة ضمان شاملة على الموكيت والباركيه والفينيل، حق الاستبدال والإرجاع خلال 14 يومًا، ضمان التركيب لمدة سنة كاملة. اطمئن قبل الشراء.'
keywords: ['ضمان موكيت', 'سياسة الإرجاع', 'استبدال أرضيات', 'ضمان التركيب']
canonical: '/services/warranty'
```

### H1
`سياسة الضمان والاستبدال والإرجاع`

### Content outline (≥ 700 words)

- **التزامنا بالجودة**
- **## ضمان المنتج** — مدة الضمان حسب النوع، ما يشمله
- **## ضمان التركيب** — سنة كاملة، ما يشمله الضمان
- **## سياسة الاستبدال** — 14 يومًا للقطع غير المُركّبة، شروط
- **## سياسة الإرجاع** — متى يحق، استثناءات، خطوات
- **## كيف تطالب بالضمان؟** — خطوات، الوثائق المطلوبة
- **## أسئلة شائعة** (FAQ — هل الضمان يشمل سوء الاستخدام؟ ما الذي لا يشمله الضمان؟ هل يجب الاحتفاظ بالفاتورة؟)
- **CTA** — تواصل لمزيد من التفاصيل

### JSON-LD
`WebPage` + `BreadcrumbList` + `FAQPage`. No commercial schema needed — this is a policy page.

### Internal links
Footer link "الضمان وسياسة الإرجاع" + every product page sidebar/below-fold.

---

## Page 4 — `/services/delivery`

### Purpose
Addresses "توصيل موكيت", "توصيل أرضيات الرياض" — trust + logistics confidence.

### Metadata
```ts
title: 'توصيل مجاني للموكيت والأرضيات داخل الرياض'
description: 'العمودي للمفروشات يوصّل لك مجانًا داخل الرياض. تغطية كاملة لكل الأحياء، توصيل في 1-3 أيام عمل، تنسيق مع التركيب لتوفير الوقت.'
keywords: ['توصيل موكيت', 'توصيل أرضيات الرياض', 'شحن موكيت السعودية']
canonical: '/services/delivery'
```

### H1
`توصيل مجاني داخل الرياض — في كل الأحياء`

### Content outline (≥ 600 words)

- **التوصيل المجاني — لماذا نقدّمه؟**
- **## مناطق التغطية** — قائمة الأحياء (شمال، جنوب، شرق، غرب الرياض)
- **## مواعيد التوصيل** — 1-3 أيام عمل من التأكيد
- **## للمشاريع الكبيرة والمؤسسات** — توصيل مخصّص، ميقات معيّن
- **## التوصيل خارج الرياض** — الدمام، جدة، مكة (بأسعار شحن قياسية)
- **## كيف يعمل؟** — من التأكيد إلى الاستلام
- **CTA** — اطلب الآن

### JSON-LD
`Service` (serviceType: "Delivery") + `OfferShippingDetails` block (shippingRate=0, areaServed=Riyadh).

---

## Page 5 — `/projects`

### Purpose
**E-E-A-T booster + visual portfolio** — competitor `alsourayia.com` has this; it captures bottom-funnel intent ("شركة موكيت تنفّذ مشاريع كبيرة") and serves as social proof. Also great for image SEO ("صور موكيت" had 83 imp at pos 1.13 with 0% CTR — image gallery pages can capture image-search clicks).

### Metadata
```ts
title: 'مشاريعنا — معرض أعمال العمودي للمفروشات بالرياض'
description: 'تصفّح مشاريعنا الأخيرة من توريد وتركيب موكيت وأرضيات لمنازل، مساجد، مكاتب، مستشفيات في الرياض. صور حقيقية لأعمال نفخر بها.'
keywords: ['مشاريع موكيت', 'أعمال العمودي للمفروشات', 'صور موكيت', 'معرض أعمال أرضيات']
canonical: '/projects'
```

### H1
`مشاريعنا — أعمال نفخر بها في الرياض`

### Content outline

- **مقدمة** — رحلة 15 سنة + عدد المشاريع
- **## فلتر الفئات** — مساجد، منازل، مكاتب، مستشفيات، حدائق (`<select>` أو tabs)
- **## المعرض** — grid من البطاقات؛ كل بطاقة: صورة كبيرة + عنوان + وصف قصير + النوع + التاريخ
- **## دراسة حالة بارزة** — 1-2 مشروع كبير بالتفصيل (مسجد كبير، مستشفى)
- **## كيف نعمل** — رابط لـ `/services/installation`
- **CTA** — احجز معاينة لمشروعك

### Data structure — `src/data/projects.ts`

```ts
export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'mosque' | 'home' | 'office' | 'hospital' | 'garden';
  date: string;                  // ISO yyyy-mm
  location: string;              // 'حي العزيزية، الرياض'
  area: string;                  // '450 m²'
  productsUsed: string[];        // product IDs
  images: { src: string; alt: string }[];
}

export const projects: Project[] = [
  // Seed with 12 projects (real or staged) on launch
];
```

### JSON-LD
- `BreadcrumbList`
- `CollectionPage` (`mainEntity` → `ItemList` of project URLs)
- Each project gets an `ImageGallery` schema in its detail card (or detail page if expanded later)

### Internal links
- From: every category page footer ("شاهد مشاريعنا"), homepage hero CTA, blog articles
- To: `/services/installation`, `/contact`, relevant product pages

### Component structure
- Reuse `<Card>` from `src/components/ui/Card.tsx`
- New `<ProjectGalleryGrid>` and `<ProjectCard>` components

### Acceptance
- [ ] `/projects` returns 200 with ≥ 8 project cards
- [ ] All images use `next/image` with descriptive `alt`
- [ ] Filter `<select>` works without JavaScript reload (use URL search param `?category=`)
- [ ] CollectionPage schema validates

---

## Page 6 — `/locations/riyadh`

### Purpose
**Local SEO powerhouse.** Captures "موكيت الرياض" (76 imp), "سجاد الرياض" (44), "مفروشات الرياض" (27), "محلات موكيت في الرياض" (33), "مفروشات طريق الملك سلمان" (33). Today only the homepage attempts to rank for these — a dedicated location page can outrank the homepage on geo-modified queries because it concentrates local signals (NAP, schema, district names).

### Metadata
```ts
title: 'موكيت وسجاد الرياض — معرض العمودي للمفروشات في حي العزيزية'
description: 'العمودي للمفروشات في الرياض — معرض في حي العزيزية على شارع عبدالله بن صالح. تشكيلة كاملة من الموكيت والسجاد والباركيه. توصيل وتركيب مجاني لكل أحياء الرياض.'
keywords: ['موكيت الرياض', 'سجاد الرياض', 'مفروشات الرياض', 'محلات موكيت الرياض', 'موكيت حي العزيزية', 'مفروشات طريق الملك سلمان']
canonical: '/locations/riyadh'
```

### H1
`موكيت وسجاد الرياض — معرضنا في حي العزيزية`

### Content outline (≥ 1,000 words)

- **مقدمة** — عن المعرض الفعلي + ما يميّزنا في الرياض
- **## موقع المعرض** — العنوان كاملًا + خريطة Google مدمجة + رابط الاتجاهات
- **## ساعات العمل**
- **## ما تجده في المعرض** — 5+ أقسام بالصور
- **## نخدم كل أحياء الرياض** — قائمة 30+ حي (حي العليا، الملز، النخيل، السليمانية، حي العزيزية، الياسمين، الندى، حطين، النرجس، الملقا، طريق الملك سلمان، طريق الملك فهد، حي الورود، الروضة، الإزدهار، البطحاء، المرسلات، النموذجية، السويدي، الشفا، النسيم، السلام، النهضة، الفلاح، اليمامة، الربوة، الحمراء، الفيحاء، المعذر، الديرة، البديعة، السلي…)
  - عبارة قصيرة تربط كل حي بـ "نوصّل ونركّب في حي [X]"
- **## لماذا نختارنا في الرياض؟** — 5 نقاط (خبرة، أسعار، ضمان، توصيل مجاني، فنيون معتمدون)
- **## مشاريعنا في الرياض** — رابط لـ `/projects`
- **## شهادات عملاء من الرياض** — 5 reviews (real after collection)
- **## كيف تصل إلينا** — اتجاهات من معالم الرياض (طريق الملك فهد، طريق الملك سلمان، الدائري الشمالي، البطحاء)
- **CTA** — زورنا أو احجز زيارة مندوب

### JSON-LD

```ts
const locationSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${BUSINESS.url}/locations/riyadh#business`,
  name: BUSINESS.name,
  url: `${BUSINESS.url}/locations/riyadh`,
  telephone: BUSINESS.phone.primary,
  priceRange: BUSINESS.priceRange,
  image: `${BUSINESS.url}${BUSINESS.logo}`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: BUSINESS.address.streetAddress,
    addressLocality: BUSINESS.address.addressLocality,
    addressRegion: BUSINESS.address.addressRegion,
    postalCode: BUSINESS.address.postalCode,
    addressCountry: BUSINESS.address.addressCountry,
  },
  geo: { '@type': 'GeoCoordinates', latitude: BUSINESS.geo.latitude, longitude: BUSINESS.geo.longitude },
  hasMap: BUSINESS.geo.googleMapsUrl,
  openingHoursSpecification: BUSINESS.hours.schemaOrg.map(h => /* same parser as JsonLd.tsx */),
  areaServed: { '@type': 'City', name: 'الرياض' },
  sameAs: [BUSINESS.social.tiktok, BUSINESS.social.instagram],
};
```

Plus `BreadcrumbList`, `FAQPage`.

### Internal links
- From: footer (badge "زر معرضنا في الرياض"), `/contact`, every category page, homepage hero
- To: `/contact`, `/services/free-visit`, `/projects`, all main category pages

### Acceptance
- [ ] `/locations/riyadh` returns 200 with embedded Google Map iframe
- [ ] LocalBusiness schema with `@id` distinct from layout (acceptable — same business, different page entity)
- [ ] ≥ 30 Riyadh districts mentioned in body text
- [ ] Footer contains a permanent link to this page

---

## Cross-page implementation

### `/services` index page (optional but recommended)

Create a small landing at `/services/page.tsx` that lists the 4 service sub-pages with cards. Useful as a navigation hub and as a target for "خدمات العمودي للمفروشات" queries.

### Navigation — `src/constants/navigation.ts`

Add a "خدماتنا" dropdown:
```ts
{ label: 'خدماتنا', href: '/services', children: [
  { label: 'تركيب الأرضيات', href: '/services/installation' },
  { label: 'زيارة مندوب مجانية', href: '/services/free-visit' },
  { label: 'الضمان والاستبدال', href: '/services/warranty' },
  { label: 'التوصيل', href: '/services/delivery' },
]},
{ label: 'مشاريعنا', href: '/projects' },
```

If the existing nav doesn't support dropdowns, ship `/services` as a single nav link and put the 4 sub-links inside that page.

### Sitemap — `src/app/sitemap.ts`

Add to `staticPages`:
```ts
{ url: `${baseUrl}/services`, priority: 0.7, changeFrequency: 'monthly', lastModified: currentDate },
{ url: `${baseUrl}/services/installation`, priority: 0.8, changeFrequency: 'monthly', lastModified: currentDate },
{ url: `${baseUrl}/services/free-visit`, priority: 0.8, changeFrequency: 'monthly', lastModified: currentDate },
{ url: `${baseUrl}/services/warranty`, priority: 0.6, changeFrequency: 'yearly', lastModified: currentDate },
{ url: `${baseUrl}/services/delivery`, priority: 0.7, changeFrequency: 'monthly', lastModified: currentDate },
{ url: `${baseUrl}/projects`, priority: 0.9, changeFrequency: 'monthly', lastModified: currentDate },
{ url: `${baseUrl}/locations/riyadh`, priority: 0.9, changeFrequency: 'monthly', lastModified: currentDate },
```

### Robots — `src/app/robots.ts`

Update the `Allow` list to include `/services/`, `/projects`, `/locations/`.

### Footer — `src/components/ui/Footer.tsx`

Add a "خدماتنا" column with the 4 service links + a "مواقعنا" column with `/locations/riyadh`.

### Acceptance criteria (cross-page)

- [ ] Navigation includes "خدماتنا" + "مشاريعنا"
- [ ] Footer has both columns
- [ ] Sitemap.xml regenerated with all new URLs
- [ ] Each new page has its own OG image at `/public/og/`
- [ ] Lighthouse SEO ≥ 95 on every new page
- [ ] Internal-link graph: every new page is reachable in ≤ 2 clicks from homepage
- [ ] All structured data validates in Rich Results Test
- [ ] Submit each new URL to GSC URL Inspection → Request Indexing

---

## Roll-out timeline

| Week | Pages |
|---|---|
| 1 | `/services/installation`, `/services/free-visit` (highest commercial intent) |
| 2 | `/services/warranty`, `/services/delivery` |
| 3 | `/locations/riyadh` (depends on real photos + map embed) |
| 4 | `/projects` (depends on photos from past jobs) |

> Don't ship `/projects` with placeholder/stock photos — Google's image search detects duplicates and the page loses authority. Wait for real project photos.
