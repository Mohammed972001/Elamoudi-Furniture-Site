# SEO-SPEC-TECHNICAL.md — Phase 1 Technical Fixes

> **Audience:** Implementation agent (Gemini). Apply each task literally — exact paths, exact code.
> **Repo root:** `D:/work/Elamoudi-Furniture-Site/` (Next.js 16 App Router, TypeScript, Tailwind v4)
> **Source of truth for issues:** `SEO-KNOWLEDGE-BASE.md` (audit dated 2026-04-27)
> **Apply order:** Top to bottom. Tasks are independent unless noted.

---

## TASK 1 — Fix Title Template Duplication

**Problem.** The root layout sets `title.template = "%s | العمودي للمفروشات"`. Pages that already include `| العمودي للمفروشات` in their `title` get the brand appended a second time, producing rendered titles like:
`تشكيلة السجاد | العمودي للمفروشات | العمودي للمفروشات`

Duplicated brand wastes pixel budget in SERP, dilutes the primary keyword position (which Google weighs by leftmost token), and looks low-quality to users → measurable CTR loss.

### 1.1 — `src/app/carpets/page.tsx`

**Before** (lines 6–12):
```ts
export const metadata: Metadata = {
  title: "تشكيلة السجاد | العمودي للمفروشات",
  description: "اكتشف أحدث تشكيلات السجاد الفاخر من العمودي للمفروشات. تصاميم متنوعة تناسب كل الأذواق.",
  alternates: {
    canonical: "/carpets",
  },
};
```

**After** (the title body is replaced with a CTR-optimized one — see SEO-SPEC-CTR §1; this task only removes the brand suffix so the template appends it cleanly):
```ts
export const metadata: Metadata = {
  title: "موكيت وسجاد الرياض — تشكيلة فاخرة بتركيب مجاني",
  description: "اكتشف أحدث تشكيلات السجاد الفاخر من العمودي للمفروشات. تصاميم متنوعة تناسب كل الأذواق.",
  alternates: {
    canonical: "/carpets",
  },
};
```

### 1.2 — `src/app/products/page.tsx`

**Before** (lines 6–12):
```ts
export const metadata: Metadata = {
  title: "المنتجات | العمودي للمفروشات",
  description: "تصفح جميع منتجات العمودي للمفروشات من سجاد وديكور وأثاث منزلي بجودة عالية وتصاميم عصرية.",
  alternates: {
    canonical: "/products",
  },
};
```

**After:**
```ts
export const metadata: Metadata = {
  title: "جميع المنتجات — موكيت وأرضيات وباركيه وفينيل",
  description: "تصفّح كل تشكيلات الموكيت والأرضيات والباركيه والفينيل من العمودي للمفروشات بالرياض. جودة مضمونة، توصيل وتركيب مجاني.",
  alternates: {
    canonical: "/products",
  },
};
```

### 1.3 — `src/app/decor/page.tsx`

**Before** (lines 6–12):
```ts
export const metadata: Metadata = {
  title: "الديكور | العمودي للمفروشات",
  description: "تسوق أفضل قطع الديكور والإكسسوارات المنزلية من العمودي للمفروشات لضمان الفخامة والأناقة في منزلك.",
  alternates: {
    canonical: "/decor",
  },
};
```

**After:**
```ts
export const metadata: Metadata = {
  title: "الديكور والإكسسوارات المنزلية — ستائر ومفروشات",
  description: "تشكيلة ديكور وإكسسوارات منزلية فاخرة من العمودي للمفروشات بالرياض. ستائر، مفروشات، وقطع تكميلية لإطلالة عصرية.",
  alternates: {
    canonical: "/decor",
  },
};
```

### 1.4 — `src/app/products/[id]/page.tsx`

**Problem.** Lines 37 and 44 set `title: \`${product.title} | العمودي للمفروشات\``. Many product titles in `src/data/products.ts` already contain "| العمودي" — this triple-duplicates after the layout template is applied.

**Before** (lines 36–45):
```ts
  return {
    title: `${product.title} | العمودي للمفروشات`,
    description: product.metaDescription,
    keywords: product.keywords?.join(", "),
    alternates: {
      canonical: `/products/${id}`,
    },
    openGraph: {
      title: `${product.title} | العمودي للمفروشات`,
      description: product.metaDescription,
```

**After** (rely on the root template — pass the bare product title; if a product's title already contains the brand, strip it first):
```ts
  // Strip any pre-existing brand suffix so the layout template can append it once.
  const cleanTitle = product.title.replace(/\s*\|\s*العمودي للمفروشات.*$/, '').trim();

  return {
    title: cleanTitle,
    description: product.metaDescription,
    keywords: product.keywords?.join(", "),
    alternates: {
      canonical: `/products/${id}`,
    },
    openGraph: {
      title: `${cleanTitle} | العمودي للمفروشات`,
      description: product.metaDescription,
```

> Note: OG titles are independent of the Next title-template, so the OG title must spell the brand explicitly once.

### 1.5 — `src/app/garden/page.tsx`

**Before** (line 5):
```ts
  title: "تنسيق الحدائق - العمودي للمفروشات",
```

**After** (CTR-optimized — see SEO-SPEC-CTR; remove brand suffix and let template handle it):
```ts
  title: "تنسيق حدائق الرياض — عشب صناعي وشلالات ونوافير",
```

Apply the same change to the `openGraph.title` and `twitter.title` on lines 12 and 20 (replace the literal string `"تنسيق الحدائق - العمودي للمفروشات"` with `"تنسيق حدائق الرياض — عشب صناعي وشلالات ونوافير | العمودي للمفروشات"`).

### 1.6 — `src/app/contact/page.tsx`

**Before** (lines 6, 43):
```ts
  title: 'اتصل بنا - العمودي للمفروشات | سجاد الرياض | موكيت الرياض | موكيت مساجد',
```

**After** (drop keyword stuffing — Google penalizes; the layout template adds the brand):
```ts
  title: 'اتصل بنا — موكيت وسجاد الرياض',
```

Apply the same replacement to the `openGraph.title` on line 43; for that field append `" | العمودي للمفروشات"` since OG isn't templated.

### 1.7 — `src/app/about/page.tsx` (verify and apply)

Open the file. If `metadata.title` contains the literal substring `العمودي للمفروشات`, remove that suffix. Update the H1 in the page body to match the new title concept (`من نحن` → `من نحن — خبرة في موكيت وسجاد الرياض`) so H1 ↔ title align. Knowledge base §5.8 flags this mismatch as MEDIUM.

### Verification (TASK 1)

```bash
# After build, curl each route and confirm <title> contains the brand exactly once.
npx next build && npx next start &
for path in / /carpets /products /decor /garden /contact /about /products/vinyl-roll; do
  echo "=== $path ===";
  curl -s "http://localhost:3000$path" | grep -oE '<title>[^<]+</title>' | head -1;
done
```

**Acceptance:** Each `<title>` contains `العمودي للمفروشات` exactly **once**. Length ≤ 60 visible Arabic characters where possible.

---

## TASK 2 — `redirect()` → `permanentRedirect()` (307 → 301)

**Problem.** `redirect()` from `next/navigation` issues HTTP **307** (temporary). Search engines do not consolidate link equity to the target on a 307. The two redirected pages (`/curtains`, `/kitchens`) have backlinks/impressions in GSC and need a **301** so the destination inherits the equity.

### 2.1 — `src/app/curtains/page.tsx`

**Before** (full file):
```ts
import { redirect } from 'next/navigation';

// Redirect /curtains to /decor (permanent 301)
// These pages were indexed by Google but no longer exist as standalone pages.
// The curtains content now lives under /decor which shows the curtains collection.
export default function CurtainsPage() {
  redirect('/decor');
}
```

**After:**
```ts
import { permanentRedirect } from 'next/navigation';

export default function CurtainsPage() {
  permanentRedirect('/decor');
}
```

### 2.2 — `src/app/kitchens/page.tsx`

**Before** (full file):
```ts
import { redirect } from 'next/navigation';

// Redirect /kitchens to /products (permanent 301)
// These pages were indexed by Google but no longer exist as standalone pages.
// Kitchen-related products can be found in the main products listing.
export default function KitchensPage() {
  redirect('/products');
}
```

**After:**
```ts
import { permanentRedirect } from 'next/navigation';

export default function KitchensPage() {
  permanentRedirect('/products');
}
```

### Verification (TASK 2)

```bash
curl -sI https://www.elamoudifurniture.com/curtains | grep -iE '^(HTTP|location)'
# Expected: HTTP/2 308   (Next.js permanentRedirect emits 308, which is the modern equivalent of 301 and treated identically by Google)
# Location: /decor

curl -sI https://www.elamoudifurniture.com/kitchens | grep -iE '^(HTTP|location)'
# Expected: HTTP/2 308
# Location: /products
```

**Acceptance:** Status code is **308** (or 301 if a host-level rewrite is added). It must NOT be 307.

> If the team wants a literal 301 (some legacy crawlers misread 308), add this to `next.config.ts` instead and remove the route handlers entirely:
> ```ts
> async redirects() {
>   return [
>     { source: '/curtains', destination: '/decor', permanent: true },
>     { source: '/kitchens', destination: '/products', permanent: true },
>   ];
> }
> ```
> `permanent: true` in `next.config.ts` emits a **308**, but tools like screaming-frog still flag it correctly as a permanent move. Either approach is acceptable; pick one and remove the other.

---

## TASK 3 — Get `/products` and `/decor` Indexed (content enrichment)

**Problem.** Both pages are "Discovered — currently not indexed" in GSC (knowledge base §4.8). They render only a short heading + grid of cards. Google's quality threshold for indexing rejects pages with thin content. We add ~400 words of unique, keyword-targeted Arabic copy to each page using the existing `<SEOContent>` component and a new `<FAQ>` block, plus stronger internal-linking from cards.

### 3.1 — `src/app/products/page.tsx`

**Before** (lines 14–39 — the entire component body):
```tsx
export default function ProductsPage() {
  const breadcrumbItems = [
    { name: "الرئيسية", href: "/" },
    { name: "المنتجات" }
  ];

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-[60vh]">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="mt-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">جميع المنتجات</h1>
          <p className="text-xl text-gray-600">تصفح تشكيلتنا الواسعة من المفروشات والديكورات</p>
        </div>
        {containerSections.map((section) => (
          <ContainerSection
            key={section.id}
            section={section}
            className="mb-16"
            mobileCols="grid-cols-2"
          />
        ))}
      </div>
    </div>
  );
}
```

**After** (add `SEOContent` import, an intro paragraph block, and an FAQ block — keep ContainerSection grid):
```tsx
import SEOContent from "@/components/seo/SEOContent";
import FAQ from "@/components/seo/FAQ";

const productsCopy = `موكيت وأرضيات وباركيه وفينيل في الرياض

العمودي للمفروشات هو وجهتك الأولى في الرياض لكل ما يخص الأرضيات والمفروشات. منذ سنوات ونحن نقدّم لعملائنا تشكيلة شاملة من **الموكيت** بأنواعه، **أرضيات الفينيل رول**، **الباركيه الخشبي الطبيعي والصناعي**، **العشب الصناعي**، و**موكيت المساجد**، إلى جانب أرضيات المستشفيات والمكاتب وموكيت السيارات. كل منتج نقدّمه يخضع لمعايير دقيقة في الجودة والمتانة، ويأتي مدعومًا بخدمة **توصيل مجاني داخل الرياض** و**تركيب احترافي** على يد فنيين متخصصين.

ماذا تجد في هذه الصفحة

تجد هنا الفهرس الكامل لجميع منتجاتنا مرتبة في أقسام واضحة: قسم السجاد والموكيت يضم الموكيت التركي المشجر والموكيت الفاخر وموكيت السيارات؛ قسم الأرضيات يضم الفينيل رول والباركيه ضد الماء وأرضيات المستشفيات؛ قسم الحدائق يضم العشب الصناعي والشلالات والنوافير والنباتات المنسقة. اضغط على أي بطاقة منتج للاطلاع على الصور والمواصفات والأسعار وطلب عرض مخصّص.

لماذا العمودي للمفروشات؟

نمتلك معرضًا في حي العزيزية على شارع عبدالله بن صالح بالرياض، يمكنك زيارته لمعاينة الخامات بنفسك قبل الشراء. نقدّم خدمة **زيارة المندوب المجانية** لقياس المساحة وتقديم عرض سعر دقيق في موقعك. نوفّر **ضمانًا** على التركيب وسياسة استبدال مرنة. كما نتعاون مع أصحاب المساجد والمستشفيات والمكاتب لتقديم عروض جملة بأسعار تنافسية.`;

const productsFaq = [
  {
    question: "ما هي أنواع الأرضيات المتوفرة لدى العمودي للمفروشات؟",
    answer: "نوفّر تشكيلة كاملة تشمل الموكيت بأنواعه (تركي، مشجر، مساجد، منازل)، أرضيات الفينيل رول، الباركيه الطبيعي والصناعي، العشب الصناعي، أرضيات المستشفيات والمكاتب، إضافة إلى موكيت السيارات. كل منتج معروض في قسمه الخاص ضمن هذه الصفحة."
  },
  {
    question: "هل تقدّمون خدمة التركيب؟",
    answer: "نعم — التركيب الاحترافي متوفّر داخل الرياض على يد فنيين متخصصين. التوصيل مجاني، وأسعار التركيب تختلف بحسب نوع الأرضية والمساحة. اطلب عرض سعر مخصّصًا عبر الواتساب أو زيارة المعرض."
  },
  {
    question: "هل يمكن طلب زيارة مندوب لقياس المساحة؟",
    answer: "نعم — خدمة زيارة المندوب لقياس المساحة وتقديم عرض سعر دقيق متوفّرة مجانًا داخل الرياض. تواصل معنا عبر الواتساب على 0558352924 لحجز موعد."
  },
  {
    question: "ما هي مدة التوصيل والتركيب؟",
    answer: "في الغالب نُسلّم الطلبات خلال 1-3 أيام عمل من تأكيد الطلب داخل الرياض، وتركيب الموكيت/الفينيل يكتمل عادةً في يوم واحد للمساحات المتوسطة."
  },
  {
    question: "هل تقدّمون عروض جملة للمساجد والمكاتب والمستشفيات؟",
    answer: "نعم — لدينا قسم مخصّص للعملاء المؤسسيين بأسعار جملة تنافسية. للمساجد نوفّر موكيت مساجد بمواصفات شرعية، وللمستشفيات أرضيات فينيل طبية مضادة للبكتيريا، وللمكاتب موكيت تجاري مقاوم للاستهلاك."
  }
];

export default function ProductsPage() {
  const breadcrumbItems = [
    { name: "الرئيسية", href: "/" },
    { name: "المنتجات" }
  ];

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-[60vh]">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="mt-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">جميع المنتجات</h1>
          <p className="text-xl text-gray-600">موكيت وأرضيات وباركيه وفينيل بأفضل الأسعار في الرياض</p>
        </div>
        {containerSections.map((section) => (
          <ContainerSection
            key={section.id}
            section={section}
            className="mb-16"
            mobileCols="grid-cols-2"
          />
        ))}
        <SEOContent content={productsCopy} title="عن تشكيلة منتجاتنا" />
        <div className="mt-12">
          <FAQ items={productsFaq} title="أسئلة شائعة عن منتجاتنا" />
        </div>
      </div>
    </div>
  );
}
```

> **Note:** the `\\n\\n` separator inside `productsCopy` will work correctly **only after TASK 9** (paragraph splitting fix) is applied. Apply both tasks in the same PR.

### 3.2 — `src/app/decor/page.tsx`

**Before** (lines 14–48 — the component body):
```tsx
export default function DecorPage() {
  const breadcrumbItems = [
    { name: "الرئيسية", href: "/" },
    { name: "الديكور" }
  ];

  const curtains = getContainerById("curtains-collection");
  const garden = getContainerById("garden-services");

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-[60vh]">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="mt-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">الديكور والإكسسوارات</h1>
          <p className="text-xl text-gray-600">تسوق أفضل قطع الديكور وأضف لمسة جمالية لمنزلك</p>
        </div>
        {curtains && (
          <ContainerSection
            section={curtains}
            className="mb-16"
            mobileCols="grid-cols-2"
          />
        )}
        {garden && (
          <ContainerSection
            section={garden}
            className="mb-16"
            mobileCols="grid-cols-2"
          />
        )}
      </div>
    </div>
  );
}
```

**After:**
```tsx
import SEOContent from "@/components/seo/SEOContent";
import FAQ from "@/components/seo/FAQ";

const decorCopy = `الديكور المنزلي من العمودي للمفروشات

نقدّم في العمودي للمفروشات تشكيلة من قطع الديكور والإكسسوارات المنزلية المختارة بعناية لتكمل مفهوم بيتك. من **الستائر العصرية** بألوانها وخاماتها المتنوعة إلى **خدمات تنسيق الحدائق** التي تشمل العشب الصناعي والشلالات والنوافير والنباتات المنسقة، كل عنصر مصمّم ليتناغم مع الذوق السعودي الحديث ويرفع من قيمة المساحة سواء كانت سكنية أو تجارية.

كيف نختار قطع الديكور؟

نختار كل منتج بناءً على ثلاثة محاور: **الجودة** (خامات تدوم لسنوات)، **التصميم** (ألوان ونقوش متناغمة مع التريندات الحديثة)، و**التركيب** (سهل أو ضمن خدمتنا الاحترافية). نتعاون مع موردين معتمدين محليًا وعالميًا، ونوفّر استشارة مجانية لاختيار القطع المناسبة لمساحتك ومُيزانيتك.

خدمات تكميلية

إلى جانب البيع، نوفّر **زيارة مندوب مجانية** للمعاينة والقياس داخل الرياض، **تركيبًا احترافيًا** بضمان، و**استشارات تنسيق** للديكور الكامل. تواصل عبر الواتساب لحجز موعد أو زيارة المعرض في حي العزيزية.`;

const decorFaq = [
  {
    question: "ما القطع التي تشملها صفحة الديكور؟",
    answer: "تشمل الستائر بأنواعها (الستائر الكلاسيكية، الرولر، الزيبرا) وخدمات تنسيق الحدائق (عشب صناعي، شلالات، نوافير، نباتات منسقة)، إلى جانب إكسسوارات تكميلية للمنزل."
  },
  {
    question: "هل تقدّمون استشارات ديكور؟",
    answer: "نعم — نقدّم استشارات مجانية عبر الواتساب أو في المعرض لاختيار القطع المناسبة لذوقك ومساحتك وميزانيتك."
  },
  {
    question: "هل التركيب مشمول في السعر؟",
    answer: "التركيب خدمة منفصلة بأسعار تنافسية، أما التوصيل داخل الرياض فمجاني. اطلب عرض سعر شامل التركيب عبر الواتساب."
  },
  {
    question: "هل هناك ضمان على قطع الديكور؟",
    answer: "نعم — كل المنتجات لدينا تأتي بضمان جودة، وسياسة استبدال خلال 14 يومًا للقطع غير المُركّبة."
  },
  {
    question: "هل يمكنني زيارة المعرض؟",
    answer: "نرحّب بكم في معرضنا في حي العزيزية، شارع عبدالله بن صالح بالرياض. ساعات العمل: السبت-الخميس 9 ص - 10 م، الجمعة 2 م - 10 م."
  }
];

export default function DecorPage() {
  const breadcrumbItems = [
    { name: "الرئيسية", href: "/" },
    { name: "الديكور" }
  ];

  const curtains = getContainerById("curtains-collection");
  const garden = getContainerById("garden-services");

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-[60vh]">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="mt-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">الديكور والإكسسوارات</h1>
          <p className="text-xl text-gray-600">تسوّق أفضل قطع الديكور وأضف لمسة جمالية لمنزلك</p>
        </div>
        {curtains && (
          <ContainerSection section={curtains} className="mb-16" mobileCols="grid-cols-2" />
        )}
        {garden && (
          <ContainerSection section={garden} className="mb-16" mobileCols="grid-cols-2" />
        )}
        <SEOContent content={decorCopy} title="عن قسم الديكور" />
        <div className="mt-12">
          <FAQ items={decorFaq} title="أسئلة شائعة عن الديكور" />
        </div>
      </div>
    </div>
  );
}
```

### 3.3 — Submit URLs to GSC

After deployment, the human operator (not the agent) opens **Google Search Console → URL Inspection** for both `/products` and `/decor` and clicks **"Request Indexing"** for each. Document this step in the PR description so it isn't missed.

### Verification (TASK 3)

```bash
curl -s https://www.elamoudifurniture.com/products | grep -c "FAQPage"
# Expected: ≥ 1 (FAQ JSON-LD now present)
curl -s https://www.elamoudifurniture.com/products | wc -w
# Expected: > 800 visible words (was ~150)
```

After 7-14 days check GSC URL Inspection: status should change from "Discovered – currently not indexed" to "Submitted and indexed."

**Acceptance:** Both pages now contain ≥ 400 words of unique copy + FAQPage JSON-LD; GSC indexing requested.

---

## TASK 4 — Page-Specific OpenGraph & Twitter Metadata

**Problem.** Pages `/carpets`, `/products`, `/decor` only set `title/description/canonical` — they inherit the homepage OG image and OG title from the layout. When users share a URL like `https://www.elamoudifurniture.com/carpets` on WhatsApp/Twitter/Facebook, the preview shows generic homepage text → low click-through from social.

> Garden already has OG (but no `images` array). Contact already has OG. Product detail already has OG.

For each page below, create a single dedicated OG image at `public/og/{slug}.jpg` (1200×630 px, JPG, ≤ 200 KB, with the page-relevant Arabic title burned in). Coordinate with the design team — placeholder `og-image.jpg` is acceptable until then.

### 4.1 — `src/app/carpets/page.tsx`

**After** (extend the metadata object — adding new fields below `alternates`):
```ts
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elamoudifurniture.com';

export const metadata: Metadata = {
  title: "موكيت وسجاد الرياض — تشكيلة فاخرة بتركيب مجاني",
  description: "اكتشف أحدث تشكيلات الموكيت والسجاد الفاخر في الرياض من العمودي للمفروشات. توصيل وتركيب مجاني، ضمان الجودة.",
  keywords: ["موكيت", "سجاد", "موكيت الرياض", "سجاد الرياض", "موكيت مساجد", "موكيت تركي", "موكيت مشجر"],
  alternates: { canonical: "/carpets" },
  openGraph: {
    title: "موكيت وسجاد الرياض — تشكيلة فاخرة | العمودي للمفروشات",
    description: "أحدث تشكيلات الموكيت والسجاد الفاخر بأفضل الأسعار في الرياض. توصيل وتركيب مجاني.",
    type: "website",
    url: `${baseUrl}/carpets`,
    locale: "ar_SA",
    siteName: "العمودي للمفروشات",
    images: [{ url: "/og/carpets.jpg", width: 1200, height: 630, alt: "تشكيلة الموكيت والسجاد - العمودي للمفروشات" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "موكيت وسجاد الرياض — العمودي للمفروشات",
    description: "أحدث تشكيلات الموكيت والسجاد الفاخر بأفضل الأسعار في الرياض.",
    images: ["/og/carpets.jpg"],
  },
};
```

### 4.2 — `src/app/products/page.tsx`

**After:**
```ts
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elamoudifurniture.com';

export const metadata: Metadata = {
  title: "جميع المنتجات — موكيت وأرضيات وباركيه وفينيل",
  description: "تصفّح كل تشكيلات الموكيت والأرضيات والباركيه والفينيل من العمودي للمفروشات بالرياض. جودة مضمونة، توصيل وتركيب مجاني.",
  keywords: ["منتجات", "موكيت", "أرضيات", "باركيه", "فينيل", "أرضيات الرياض"],
  alternates: { canonical: "/products" },
  openGraph: {
    title: "جميع المنتجات | العمودي للمفروشات",
    description: "موكيت، أرضيات، باركيه، فينيل، عشب صناعي وأكثر — كل ما يخص الأرضيات في مكان واحد.",
    type: "website",
    url: `${baseUrl}/products`,
    locale: "ar_SA",
    siteName: "العمودي للمفروشات",
    images: [{ url: "/og/products.jpg", width: 1200, height: 630, alt: "جميع منتجات العمودي للمفروشات" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "جميع المنتجات | العمودي للمفروشات",
    description: "موكيت، أرضيات، باركيه، فينيل وأكثر بأفضل الأسعار في الرياض.",
    images: ["/og/products.jpg"],
  },
};
```

### 4.3 — `src/app/decor/page.tsx`

**After:**
```ts
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elamoudifurniture.com';

export const metadata: Metadata = {
  title: "الديكور والإكسسوارات المنزلية — ستائر ومفروشات",
  description: "تشكيلة ديكور وإكسسوارات منزلية فاخرة من العمودي للمفروشات بالرياض. ستائر، مفروشات، وقطع تكميلية لإطلالة عصرية.",
  keywords: ["ديكور", "إكسسوارات منزلية", "ستائر", "ديكور الرياض", "تنسيق منازل"],
  alternates: { canonical: "/decor" },
  openGraph: {
    title: "الديكور والإكسسوارات المنزلية | العمودي للمفروشات",
    description: "ستائر وقطع ديكور فاخرة لإطلالة عصرية في منزلك. توصيل وتركيب مجاني داخل الرياض.",
    type: "website",
    url: `${baseUrl}/decor`,
    locale: "ar_SA",
    siteName: "العمودي للمفروشات",
    images: [{ url: "/og/decor.jpg", width: 1200, height: 630, alt: "الديكور والإكسسوارات - العمودي للمفروشات" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "الديكور والإكسسوارات | العمودي للمفروشات",
    description: "ستائر وقطع ديكور فاخرة لإطلالة عصرية.",
    images: ["/og/decor.jpg"],
  },
};
```

### 4.4 — `src/app/garden/page.tsx`

The existing OG block lacks `images` and `url`. Replace lines 11–22 with:
```ts
  openGraph: {
    title: "تنسيق حدائق الرياض — عشب صناعي وشلالات | العمودي للمفروشات",
    description: "خدمات تنسيق حدائق احترافية في الرياض. عشب صناعي، شلالات، نوافير ونباتات منسقة بأيدي خبراء.",
    type: "website",
    url: `${baseUrl}/garden`,
    locale: "ar_SA",
    siteName: "العمودي للمفروشات",
    images: [{ url: "/og/garden.jpg", width: 1200, height: 630, alt: "تنسيق الحدائق - العمودي للمفروشات" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "تنسيق حدائق الرياض — العمودي للمفروشات",
    description: "خدمات تنسيق حدائق احترافية لحديقة أحلامك.",
    images: ["/og/garden.jpg"],
  },
```

Add `const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elamoudifurniture.com';` at the top of the file (above `metadata`).

### Verification (TASK 4)

For each path, paste the URL into Facebook Sharing Debugger and Twitter Card Validator. The preview must show the page-specific image and title, not the homepage one.

```bash
for path in /carpets /products /decor /garden; do
  echo "=== $path ===";
  curl -s "https://www.elamoudifurniture.com$path" | grep -oE 'property="og:image" content="[^"]+"';
done
```

**Acceptance:** Each page returns its own `/og/{slug}.jpg` URL — never `/og-image.jpg`.

---

## TASK 5 — Unify NAP (Name, Address, Phone) — Single Source of Truth

**Problem.** Knowledge base §5.9 confirmed and code review re-confirmed:
- `src/app/contact/page.tsx` JSON-LD line 72: `streetAddress: 'طريق الملك فهد'`
- `src/app/layout.tsx` LocalBusinessSchema line 151: `streetAddress: "حي العزيزية، شارع عبدالله بن صالح"`
- The visible address text on the contact page (line 222) **also** says "حي العزيزية، شارع عبدالله بن صالح" — so the contact JSON-LD is the wrong one.
- Two phone numbers used inconsistently: `+966558352924` (most places) and `+966567746257` (CTA on contact page line 291; CTA on `GardenClient.tsx` lines 195 & 201).

NAP inconsistency is one of the strongest negative ranking signals for local SEO — Google can't determine which is canonical and may show the wrong info or suppress the listing.

### 5.1 — Create `src/constants/business.ts` (new file)

```ts
/**
 * Single source of truth for all NAP data (Name, Address, Phone).
 * Import from here in every component, JSON-LD schema, and metadata file.
 * Changing a value here propagates everywhere — never hardcode NAP.
 */
export const BUSINESS = {
  name: 'العمودي للمفروشات',
  legalName: 'العمودي للأرضيات والمفروشات',
  description:
    'متجر متخصص في موكيت وأرضيات وباركيه وفينيل في الرياض. موكيت مساجد وأرضيات عالية الجودة بتوصيل وتركيب مجاني.',
  url: 'https://www.elamoudifurniture.com',
  logo: '/favicon.svg',

  // ONE phone number across the site. The 0567... line was deprecated.
  phone: {
    primary: '+966558352924',
    waMessage: 'مرحباً، أريد الاستفسار عن منتجاتكم',
    get whatsappLink() {
      return `https://wa.me/${this.primary.replace('+', '')}?text=${encodeURIComponent(this.waMessage)}`;
    },
    get telLink() {
      return `tel:${this.primary}`;
    },
    get displayIntl() {
      return '+966 55 835 2924';
    },
    get displayLocal() {
      return '0558352924';
    },
  },

  address: {
    streetAddress: 'حي العزيزية، شارع عبدالله بن صالح',
    addressLocality: 'الرياض',
    addressRegion: 'منطقة الرياض',
    postalCode: '12345',
    addressCountry: 'SA',
    addressCountryName: 'المملكة العربية السعودية',
    full: 'حي العزيزية، شارع عبدالله بن صالح، الرياض، المملكة العربية السعودية',
  },

  geo: {
    latitude: 24.597427,
    longitude: 46.730596,
    googleMapsUrl: 'https://maps.google.com/?q=24.597427,46.730596',
  },

  hours: {
    schemaOrg: ['Mo-Th 09:00-22:00', 'Fr 14:00-22:00', 'Sa-Su 09:00-22:00'],
    display: {
      sunThu: 'الأحد - الخميس: 9:00 ص - 10:00 م',
      friday: 'الجمعة: 2:00 م - 10:00 م',
      saturday: 'السبت: 9:00 ص - 10:00 م',
    },
  },

  social: {
    tiktok: 'https://www.tiktok.com/@elamoudi_furniture',
    instagram: 'https://www.instagram.com/elamoudi_furniture',
    // Add as profiles are claimed.
  },

  areaServed: ['الرياض', 'المملكة العربية السعودية'],
  priceRange: '$$',
} as const;
```

### 5.2 — `src/app/layout.tsx`

**Before** (lines 132–169 — the JSON-LD invocations):
```tsx
        <OrganizationSchema
          name="العمودي للمفروشات"
          description="متخصصون في موكيت وأرضيات وباركيه وفينيل في الرياض. موكيت مساجد، أرضيات عالية الجودة."
          url="https://www.elamoudifurniture.com"
          logo="/favicon.svg"
          telephone="+966558352924"
          address={{
            addressLocality: "الرياض",
            addressCountry: "SA",
          }}
          sameAs={[
            "https://wa.me/966558352924",
          ]}
        />
        <LocalBusinessSchema
          name="العمودي للمفروشات"
          description="متجر متخصص في موكيت وأرضيات وباركيه في الرياض. نوفر موكيت مساجد، أرضيات فينيل وباركيه بأعلى جودة وأفضل الأسعار."
          telephone="+966558352924"
          address={{
            streetAddress: "حي العزيزية، شارع عبدالله بن صالح",
            addressLocality: "الرياض",
            addressRegion: "الرياض",
            postalCode: "12345",
            addressCountry: "SA",
          }}
          geo={{
            latitude: 24.597427,
            longitude: 46.730596,
          }}
          openingHours={[
            "Mo-Th 09:00-22:00",
            "Fr 14:00-22:00",
            "Sa-Su 09:00-22:00",
          ]}
          priceRange="$$"
          image="/favicon.svg"
          areaServed={["الرياض", "المملكة العربية السعودية"]}
        />
```

**After:**
```tsx
        <OrganizationSchema
          name={BUSINESS.name}
          description={BUSINESS.description}
          url={BUSINESS.url}
          logo={BUSINESS.logo}
          telephone={BUSINESS.phone.primary}
          address={{
            addressLocality: BUSINESS.address.addressLocality,
            addressCountry: BUSINESS.address.addressCountry,
          }}
          sameAs={[
            `https://wa.me/${BUSINESS.phone.primary.replace('+', '')}`,
            BUSINESS.social.tiktok,
            BUSINESS.social.instagram,
          ]}
        />
        <LocalBusinessSchema
          name={BUSINESS.name}
          description={BUSINESS.description}
          telephone={BUSINESS.phone.primary}
          address={{
            streetAddress: BUSINESS.address.streetAddress,
            addressLocality: BUSINESS.address.addressLocality,
            addressRegion: BUSINESS.address.addressRegion,
            postalCode: BUSINESS.address.postalCode,
            addressCountry: BUSINESS.address.addressCountry,
          }}
          geo={{ latitude: BUSINESS.geo.latitude, longitude: BUSINESS.geo.longitude }}
          openingHours={BUSINESS.hours.schemaOrg}
          priceRange={BUSINESS.priceRange}
          image={BUSINESS.logo}
          areaServed={[...BUSINESS.areaServed]}
        />
```

Also add `import { BUSINESS } from '@/constants/business';` at the top of `layout.tsx`.

### 5.3 — `src/app/contact/page.tsx`

Replace the entire `jsonLd` constant (lines 63–95) with:
```ts
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    mainEntity: {
      '@type': 'LocalBusiness',
      '@id': `${BUSINESS.url}/#business`,
      name: BUSINESS.name,
      telephone: BUSINESS.phone.primary,
      address: {
        '@type': 'PostalAddress',
        streetAddress: BUSINESS.address.streetAddress,
        addressLocality: BUSINESS.address.addressLocality,
        addressRegion: BUSINESS.address.addressRegion,
        postalCode: BUSINESS.address.postalCode,
        addressCountry: BUSINESS.address.addressCountry,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: BUSINESS.geo.latitude,
        longitude: BUSINESS.geo.longitude,
      },
      openingHours: BUSINESS.hours.schemaOrg,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: BUSINESS.phone.primary,
        contactType: 'customer service',
        availableLanguage: ['Arabic'],
      },
    },
  };
```

Then in the JSX:
- Line ~140 hardcoded `+966 55 835 2924` → replace with `{BUSINESS.phone.displayIntl}`.
- Lines 140, 154, 169, 184 hardcoded `https://wa.me/966558352924?text=...` → use `{BUSINESS.phone.whatsappLink}` (or build a query-string variant if a custom message is needed).
- **Line 291 `https://wa.me/966567746257?text=...`** → replace with `{BUSINESS.phone.whatsappLink}`. **This is the inconsistent number — must be fixed.**
- Line 237 hardcoded maps URL → `{BUSINESS.geo.googleMapsUrl}`.
- Hours block lines 230–232 → use `{BUSINESS.hours.display.sunThu}`, etc.

Also add `import { BUSINESS } from '@/constants/business';` at the top.

### 5.4 — `src/app/garden/GardenClient.tsx`

- Lines 107 and 113: `tel:+966558352924` and `https://wa.me/966558352924` — these match the primary number; replace with `BUSINESS.phone.telLink` / `BUSINESS.phone.whatsappLink` for consistency (requires removing `'use client';` constraints? — it's a client component, BUSINESS is a plain const, safe to import).
- **Lines 195 & 201: `tel:+966567746257` and `https://wa.me/966567746257`** → **replace with the primary number constants.** This is the bug.

Add `import { BUSINESS } from '@/constants/business';` at the top of `GardenClient.tsx`.

### 5.5 — `src/components/ui/Footer.tsx` and `src/components/navbar/MobileContactIcons.tsx`

Search both files for hardcoded phone numbers, addresses, or hours. Replace all with `BUSINESS.*` references.

```bash
# Quick audit before editing:
grep -rn "966558352924\|966567746257\|عبدالله بن صالح\|طريق الملك فهد" src/ --include="*.tsx" --include="*.ts"
```

Every hit outside `src/constants/business.ts` must be replaced.

### Verification (TASK 5)

```bash
# After fix, this command should return ZERO hits outside src/constants/business.ts:
grep -rn "966558352924\|966567746257\|طريق الملك فهد" src/ --include="*.tsx" --include="*.ts" \
  | grep -v "src/constants/business.ts"
```

In the live site:
- Use Google's [Rich Results Test](https://search.google.com/test/rich-results) on `/` and `/contact`.
- Both `LocalBusiness` schemas must report identical `streetAddress` and `telephone`.

**Acceptance:** Every NAP value across the codebase resolves to `BUSINESS.*`. No `0567...` number remains anywhere.

---

## TASK 6 — Install Google Analytics 4

**Problem.** No GA4 — only Google Ads tag (`AW-17506948956`). Zero behavior data: bounce rate, scroll depth, conversion paths, traffic sources.

The code in `src/app/layout.tsx` lines 120–128 already supports a `NEXT_PUBLIC_GA4_ID` env var. The fix is **environmental + verification**, not code.

### 6.1 — Create the GA4 property (human action)

1. Go to https://analytics.google.com/ → Admin → Create Property.
2. Property name: "العمودي للمفروشات", time zone: Riyadh (GMT+3), currency: SAR.
3. Add a Data Stream → Web → URL `https://www.elamoudifurniture.com`, name "Production Web".
4. Copy the **Measurement ID** (looks like `G-XXXXXXXXXX`).

### 6.2 — Set the env var

**Local development** (`.env.local`):
```
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
```

**Vercel Production**:
- Vercel Dashboard → Project → Settings → Environment Variables
- Add `NEXT_PUBLIC_GA4_ID` = `G-XXXXXXXXXX` for **Production**, **Preview**, and **Development**.
- Redeploy (env var changes don't auto-redeploy).

### 6.3 — Optional: split GA4 from Ads tag for cleaner config

Currently both tags share one `gtag.js` script tag pointing to the Ads ID. For best practice, also load the GA4 tag explicitly. This is optional — the existing setup works.

### 6.4 — Configure GA4 events (human action, post-install)

Mark these as **conversions** in GA4 → Admin → Events → Mark as conversion:
- `click` on `tel:` links → custom event `phone_click`
- `click` on `wa.me` links → custom event `whatsapp_click`
- Pageviews on `/contact`

Add the click events via gtag in a small client component or inline `onClick`. (Out of scope for this task — file under follow-up.)

### Verification (TASK 6)

```bash
curl -s https://www.elamoudifurniture.com/ | grep -oE "gtag\('config', 'G-[A-Z0-9]+'\)"
# Expected: gtag('config', 'G-XXXXXXXXXX')   ← your real ID
```

Open GA4 → Reports → Realtime. Visit the live site from another device. Within 30 seconds the realtime user count should increment.

**Acceptance:** GA4 shows realtime traffic. PR description includes the masked Measurement ID (`G-XXXX****`).

---

## TASK 7 — Add Breadcrumbs to Garden Page

**Problem.** Knowledge base §5.7: garden is the only navigable category page without breadcrumbs. Breadcrumb schema improves SERP appearance and adds an internal navigation signal.

### 7.1 — `src/app/garden/GardenClient.tsx`

Add the Breadcrumbs component near the top of the JSX (immediately after the `<div className="min-h-screen bg-gradient-to-br ...">` opening, **before** the hero section).

**Before** (lines 44–47):
```tsx
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
```

**After:**
```tsx
import Breadcrumbs from '@/components/seo/Breadcrumbs';

// ... existing imports & component header ...

  const breadcrumbItems = [
    { name: 'الرئيسية', href: '/' },
    { name: 'تنسيق الحدائق' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
```

### Verification (TASK 7)

```bash
curl -s https://www.elamoudifurniture.com/garden | grep -c "BreadcrumbList"
# Expected: 1
```

Rich Results Test → `/garden` → BreadcrumbList valid with 2 items.

**Acceptance:** Visible breadcrumb above hero; BreadcrumbList JSON-LD present.

---

## TASK 8 — WebSite SearchAction (or Remove Misleading Comment)

**Problem.** `src/components/seo/JsonLd.tsx` lines 268–271 have a docblock claiming "WebSite Schema with SearchAction — Enables sitelinks search box in Google" but the implementation has **no** `potentialAction`. Misleading.

The site has a `SearchBar` component (`src/components/navbar/SearchBar.tsx`) but no `/search` route exists. Two valid resolutions: implement search, or remove the claim.

### 8.1 (Recommended) — Add a real `/search` route + SearchAction

This is bigger scope; defer to SEO-SPEC-PAGES.md. For Phase 1, do TASK 8.2 instead.

### 8.2 (Phase 1) — Remove the misleading claim

**Before** (`src/components/seo/JsonLd.tsx` lines 268–294):
```tsx
/**
 * WebSite Schema with SearchAction
 * Enables sitelinks search box in Google
 */
export function WebSiteSchema() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elamoudifurniture.com';

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: 'العمودي للمفروشات',
        description: 'متجر العمودي للمفروشات - أفضل موكيت وأرضيات في الرياض',
        publisher: {
            '@id': `${baseUrl}/#organization`,
        },
        inLanguage: 'ar-SA',
    };
    // ...
}
```

**After:**
```tsx
/**
 * WebSite Schema (basic).
 * Identifies the site to Google. SearchAction is intentionally NOT included
 * because the site does not yet expose a public /search?q= endpoint.
 * To enable the sitelinks search box, build the /search route then add a
 * potentialAction: SearchAction to this schema.
 */
export function WebSiteSchema() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elamoudifurniture.com';

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: 'العمودي للمفروشات',
        alternateName: ['مفروشات العمودي', 'العمودي للسجاد', 'Al-Amoudi Furniture'],
        description: 'متجر العمودي للمفروشات — أفضل موكيت وأرضيات في الرياض',
        publisher: { '@id': `${baseUrl}/#organization` },
        inLanguage: 'ar-SA',
    };
    // ... unchanged return
}
```

> Bonus: `alternateName` helps Google connect brand variants the user audit shows ("مفروشات العمودي", "العمودي للسجاد") — saw 200+ impressions on these as separate queries.

### Verification (TASK 8)

Rich Results Test → `/` → WebSite schema validates with `alternateName` array. No `potentialAction` field present (we explicitly avoid the lie).

**Acceptance:** Comment is truthful; `alternateName` covers the 4 brand variants.

---

## TASK 9 — Fix `SEOContent` Paragraph Splitting

**Problem.** `src/components/seo/SEOContent.tsx` line 14: `text.split('\\n\\n')` splits on the literal 4-character sequence `\n\n` (backslash-n backslash-n) — that's a TypeScript-source escape that, once compiled, produces the literal string `\\n\\n`. Real newline characters in the input never match → entire content renders as one block. Same bug repeats on lines 20 (`replace(/\\*\\*/g, '')`), 26 (`/^\\d+\\./`), 27 (`split('\\n')`), 40 (`/\\*\\*([^\\*]+)\\*\\*/g`), and 52.

These all need to be the *real* regex/string forms.

### 9.1 — `src/components/seo/SEOContent.tsx`

Replace the entire `formatContent` function. Note every `\\` becomes `\`.

**After** (the corrected function — replaces lines 11–57):
```tsx
  const formatContent = (text: string) => {
    return text.split('\n\n').map((paragraph, index) => {
      // H2 Headers: a single line wrapped in **
      if (paragraph.startsWith('**') && paragraph.endsWith('**') && !paragraph.slice(2, -2).includes('**')) {
        return (
          <h2 key={index} className="text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4">
            {paragraph.replace(/\*\*/g, '')}
          </h2>
        );
      }

      // Numbered "1. Title\nDescription" blocks render as h3 + body
      if (paragraph.match(/^\d+\./)) {
        const lines = paragraph.split('\n');
        const heading = lines[0];
        const bodyParts = lines.slice(1);

        return (
          <div key={index} className="mb-6">
            <h3 className="text-xl font-semibold text-primary mb-2">
              {heading.replace(/\*\*/g, '')}
            </h3>
            {bodyParts.length > 0 && (
              <p
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: bodyParts.join('<br />').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>'),
                }}
              />
            )}
          </div>
        );
      }

      // Plain paragraph (with bold support)
      return (
        <p
          key={index}
          className="mb-5 text-lg text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: paragraph.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>'),
          }}
        />
      );
    });
  };
```

### 9.2 — Audit all `detailedDescription` strings in `src/data/products.ts`

Many product `detailedDescription` template literals were authored expecting the broken behavior — they may use literal `\n\n` text. Open each product entry and confirm paragraphs are separated by **real** blank lines (i.e., a literal newline followed by another literal newline inside the backtick template). If any product entry contains the **escape sequence** `\\n\\n` as visible text in the source, replace it with two real newlines.

```bash
# Audit:
grep -nE '\\\\n\\\\n' src/data/products.ts
# Expected: zero hits after audit; the file should use real line breaks inside template literals.
```

### Verification (TASK 9)

Visit `/products/parket` (or any product with a long `detailedDescription`). The body must show **multiple distinct paragraphs**, with H2/H3 headings rendered where `**` wrappers exist. Inspect the DOM — there should be ≥ 3 `<p>` tags inside `.seo-content-wrapper`, not one giant text blob.

**Acceptance:** Long-form product copy renders with proper paragraph breaks and headings.

---

## TASK 10 — Remove Fake `aggregateRating` from ProductSchema

**Problem.** Knowledge base §5.5 and §6 flag fake `aggregateRating` (4.8 / 150 reviews) hardcoded in `ProductSchema`. **Google policy violation** — risk of manual action that wipes review snippets across the site (review snippet count already dropped from 13 → 4 between April 15-25, possibly because of this).

### 10.1 — Verify (current state of `src/components/seo/JsonLd.tsx`)

Reading the actual file: the `ProductSchema` function (lines 135–217) currently does **not** contain an `aggregateRating` field. Either it has been removed already since the knowledge base was generated, or the knowledge base reflects a different branch.

**Required action regardless:** add an explicit no-fake-ratings policy comment + a guard block so a future contributor doesn't reintroduce it.

### 10.2 — Update `src/components/seo/JsonLd.tsx`

**Before** (line 135 area, the function signature and the schema construction):
```ts
export function ProductSchema({
    name,
    description,
    image,
    sku,
    brand = 'العمودي للمفروشات',
    offers,
}: ProductSchemaProps) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elamoudifurniture.com';

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name,
        description,
        sku,
        brand: { '@type': 'Brand', name: brand },
        image: image.map((img, index) => ({ ... })),
        offers: offers ? { ... } : undefined,
    };
    ...
}
```

**After** — add the comment and an `aggregateRating` field that is **only** populated from real props (none exist yet, so this stays undefined and is dropped from JSON):
```ts
interface ProductSchemaProps {
    name: string;
    description: string;
    image: string[];
    sku: string;
    brand?: string;
    offers?: {
        price?: number;
        priceCurrency?: string;
        availability?: string;
    };
    /**
     * REAL aggregate rating only. Pass undefined unless populated from a verified
     * reviews source (Google Business Profile API, on-site review collection, etc.).
     * NEVER hardcode fabricated ratings — Google's structured data policy explicitly
     * prohibits this and the site already saw review snippet count drop from 13 → 4
     * in April 2026 (knowledge base §4.11). When real reviews exist, plumb them
     * through this prop from the product data layer.
     */
    aggregateRating?: {
        ratingValue: number;
        reviewCount: number;
        bestRating?: number;
        worstRating?: number;
    };
}

export function ProductSchema({
    name,
    description,
    image,
    sku,
    brand = 'العمودي للمفروشات',
    offers,
    aggregateRating,
}: ProductSchemaProps) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elamoudifurniture.com';

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name,
        description,
        sku,
        brand: { '@type': 'Brand', name: brand },
        image: image.map((img, index) => ({
            '@type': 'ImageObject',
            '@id': `${baseUrl}${img}#image${index}`,
            url: `${baseUrl}${img}`,
            contentUrl: `${baseUrl}${img}`,
            caption: `${name} - صورة ${index + 1}`,
        })),
        offers: offers ? {
            // ...unchanged offer block...
        } : undefined,
        aggregateRating: aggregateRating ? {
            '@type': 'AggregateRating',
            ratingValue: aggregateRating.ratingValue,
            reviewCount: aggregateRating.reviewCount,
            bestRating: aggregateRating.bestRating ?? 5,
            worstRating: aggregateRating.worstRating ?? 1,
        } : undefined,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
```

> The `JSON.stringify` call drops `undefined` keys, so when `aggregateRating` is not passed, it does not appear in the rendered JSON-LD.

### 10.3 — Audit callers

```bash
grep -rn "aggregateRating" src/ --include="*.tsx" --include="*.ts"
```

If any caller passes a hardcoded value, **remove it**. Real reviews come later via Google Business Profile or an on-site collection system (see SEO-SPEC-OFFPAGE).

### Verification (TASK 10)

```bash
curl -s https://www.elamoudifurniture.com/products/parket | grep -o '"aggregateRating"' | wc -l
# Expected: 0
```

Rich Results Test → any product page → no review snippet eligibility flagged. (Loss of fake stars is intentional; we'll re-earn them with real reviews.)

**Acceptance:** No product page emits an `aggregateRating` until a verified reviews pipeline is in place.

---

## Cross-cutting verification

After applying all 10 tasks, run:

```bash
npm run lint
npm run build
npm run start &

# Smoke crawl:
for path in / /carpets /products /decor /garden /contact /about /curtains /kitchens \
            /products/vinyl-roll /products/parket /products/turky-mshager; do
  printf "%-32s " "$path"
  curl -sI "http://localhost:3000$path" | head -1
done
```

Expected exit codes:
- `200` for content pages.
- `308` for `/curtains` and `/kitchens`.

Run **Rich Results Test** + **Schema.org validator** on each top-level URL once deployed.

Submit the updated `sitemap.xml` to GSC and request indexing for `/products`, `/decor`, `/garden`.

---

## Roll-out checklist (PR description)

- [ ] TASK 1: Title duplication fixed on 6 pages
- [ ] TASK 2: 307 → 308 on `/curtains` and `/kitchens`
- [ ] TASK 3: SEOContent + FAQ added to `/products` and `/decor`; URLs submitted to GSC
- [ ] TASK 4: Per-page OG/Twitter on carpets/products/decor/garden + 4 new images in `public/og/`
- [ ] TASK 5: `src/constants/business.ts` created; all hardcoded NAP replaced; `0567...` removed
- [ ] TASK 6: `NEXT_PUBLIC_GA4_ID` set in Vercel; realtime traffic confirmed
- [ ] TASK 7: Breadcrumbs on `/garden`
- [ ] TASK 8: WebSite schema doc-comment fixed; `alternateName` added
- [ ] TASK 9: SEOContent regex bug fixed; product detailedDescriptions audited
- [ ] TASK 10: ProductSchema accepts only real `aggregateRating`; no fake data anywhere
- [ ] Rich Results Test passes on `/`, `/contact`, `/products/parket`, `/garden`
- [ ] Sitemap re-submitted to GSC
