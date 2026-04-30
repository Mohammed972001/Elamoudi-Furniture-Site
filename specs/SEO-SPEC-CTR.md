# SEO-SPEC-CTR.md — Phase 2 CTR Optimization

> **Goal:** rewrite titles, meta descriptions, and H1s for every page in the sitemap — and add FAQ sections to 6 high-impression pages — to lift the site's CTR from **3.6%** to **6%+** within 90 days. Apply *after* SEO-SPEC-TECHNICAL.md (so the title-template fix is already in place).

---

## CTR strategy (rationale baked into every rewrite)

Each meta title / description below follows this template:
- **Title:** `[primary keyword] [+ benefit / qualifier] [— الرياض]` — under 60 visible chars; the layout template appends ` | العمودي للمفروشات`.
- **Description:** `[primary keyword] in first 60 chars + competitive advantage + CTA + Riyadh signal` — under 160 chars.
- **H1:** mirrors the title's primary keyword for ranking signal coherence.

Reference benchmarks pulled from `SEO-KNOWLEDGE-BASE.md` §4 — every recommendation cites the impressions/CTR/position that justifies it.

---

## Section 1 — Page-by-page title/description/H1 rewrites

### 1.1 — Homepage (`/`)

GSC: 348 clicks / 7,255 imp / 4.8% CTR / pos 10.79 — **strong CTR but average position 10.8 means we're fighting for page-1 visibility.** A sharper primary keyword wins more clicks at the same position.

| Field | Current (`src/app/layout.tsx`) | New |
|---|---|---|
| `title.default` | `العمودي للمفروشات \| موكيت وأرضيات في الرياض` | `العمودي للمفروشات — موكيت وسجاد وأرضيات بالرياض` |
| `description` | `العمودي للمفروشات - متخصصون في موكيت وأرضيات وباركيه وفينيل في الرياض. موكيت مساجد، أرضيات عالية الجودة. توصيل وتركيب مجاني.` | `موكيت وسجاد وأرضيات وباركيه وفينيل في الرياض. موكيت مساجد، توصيل وتركيب مجاني، ضمان الجودة. اطلب الآن من العمودي للمفروشات.` |
| H1 (homepage hero) | "كل لمسة تبدأ من الأرض" | keep (brand line); add an SEO `<h1>` "العمودي للمفروشات — موكيت وسجاد بالرياض" visually de-emphasized but crawlable |

**File changes:** `src/app/layout.tsx` lines 27, 30 (and the matching `openGraph.title/description`, `twitter.title/description`).

### 1.2 — Carpets (`/carpets`)

GSC: 63 clicks / 1,128 imp / 5.59% CTR / pos 7.19 — **best-performing category.** Scale this with a sharper title.

| Field | Current | New |
|---|---|---|
| Title | `تشكيلة السجاد \| العمودي للمفروشات` | `موكيت وسجاد الرياض — تشكيلة فاخرة بتركيب مجاني` |
| Description | `اكتشف أحدث تشكيلات السجاد الفاخر من العمودي للمفروشات. تصاميم متنوعة تناسب كل الأذواق.` | `أكبر تشكيلة موكيت وسجاد في الرياض ✓ موكيت تركي مشجر، موكيت مساجد، موكيت منازل ✓ توصيل وتركيب مجاني ✓ اطلب اليوم!` |
| H1 | `السجاد والموكيت` | `موكيت وسجاد الرياض — العمودي للمفروشات` |

**File:** `src/app/carpets/page.tsx`.

### 1.3 — Products listing (`/products`)

GSC: not indexed — rewrite is part of the indexing recovery plan.

| Field | Current | New |
|---|---|---|
| Title | `المنتجات \| العمودي للمفروشات` | `جميع المنتجات — موكيت وأرضيات وباركيه وفينيل` |
| Description | `تصفح جميع منتجات العمودي للمفروشات من سجاد وديكور وأثاث منزلي بجودة عالية وتصاميم عصرية.` | `تصفّح كل تشكيلات الموكيت والأرضيات والباركيه والفينيل من العمودي للمفروشات بالرياض. توصيل وتركيب مجاني، ضمان الجودة.` |
| H1 | `جميع المنتجات` | keep |

### 1.4 — Decor (`/decor`)

GSC: not indexed.

| Field | Current | New |
|---|---|---|
| Title | `الديكور \| العمودي للمفروشات` | `الديكور والإكسسوارات المنزلية — ستائر ومفروشات` |
| Description | `تسوق أفضل قطع الديكور والإكسسوارات المنزلية...` | `ستائر، إكسسوارات، وقطع ديكور فاخرة لإطلالة عصرية في منزلك. توصيل وتركيب مجاني داخل الرياض من العمودي للمفروشات.` |
| H1 | `الديكور والإكسسوارات` | keep |

### 1.5 — Garden (`/garden`)

GSC: 1 click / 270 imp / 0.37% CTR / pos 27.9 — **awful CTR; "تنسيق حدائق" cluster sits at pos 139.** Title needs the location signal aggressively.

| Field | Current | New |
|---|---|---|
| Title | `تنسيق الحدائق - العمودي للمفروشات` | `تنسيق حدائق الرياض — عشب صناعي وشلالات ونوافير` |
| Description | `خدمات تنسيق حدائق احترافية. حوّل حديقتك إلى واحة خضراء جميلة...` | `خدمات تنسيق حدائق احترافية في الرياض ✓ عشب صناعي، شلالات، نوافير، نباتات منسقة ✓ تصميم وتنفيذ بأيدي خبراء.` |
| H1 | `تنسيق الحدائق` | `تنسيق حدائق الرياض — تصميم وتنفيذ احترافي` |

### 1.6 — About (`/about`)

GSC: 7 clicks / 484 imp / 1.45% CTR / pos 7.47.

| Field | Current | New |
|---|---|---|
| Title | `من نحن - العمودي للمفروشات \| خبرة في موكيت وسجاد الرياض` | `من نحن — خبرتنا في موكيت وسجاد الرياض` |
| Description | (current — verify) | `العمودي للمفروشات: خبرة موثوقة في موكيت وأرضيات الرياض. تعرّف على رحلتنا، فريقنا، والتزامنا بالجودة وخدمة العملاء.` |
| H1 | `معلومات عنا` | `من نحن — العمودي للمفروشات` (matches title) |

### 1.7 — Contact (`/contact`)

GSC: 22 clicks / 567 imp / 3.88% CTR / pos 8.78. Current title is keyword-stuffed (Phase 1 task fixes this).

| Field | New |
|---|---|
| Title | `اتصل بنا — موكيت وسجاد الرياض` |
| Description | `تواصل مع العمودي للمفروشات: واتساب 0558352924، معرض حي العزيزية بالرياض. استفسار، طلب مندوب، أو زيارة المعرض.` |
| H1 | `اتصل بنا` |

### 1.8 — Product detail pages

For each product below, the table shows the **current** title/metaDescription pulled from `src/data/products.ts` and the **new** versions. The implementation agent edits each entry in `productsDetails`.

> **Note on titles:** after SEO-SPEC-TECHNICAL TASK 1.4, the `[id]/page.tsx` strips trailing `| العمودي للمفروشات` and the layout template re-appends once. So the *final* SERP title becomes `<new title> | العمودي للمفروشات`. Keep new titles ≤ 38 visible Arabic chars to leave room for the brand suffix.

#### `/products/vinyl-roll` (1,256 imp / 1.27% CTR / pos 7.92 — top-impression product)

- **Current title:** `أرضيات فينيل رول بالرياض | أسعار تنافسية وتركيب مجاني`
- **New title:** `فينيل رول الرياض — أرضيات بأسعار تنافسية وتركيب مجاني`
- **Current desc:** `أرضيات فينيل رول بالرياض ✓ تركيب مجاني ✓ تصميمات عصرية للمنازل والمحلات. اطلب معاينة مجانية من العمودي للمفروشات الآن!`
- **New desc:** `فينيل رول للأرضيات بالرياض ✓ تشكيلة واسعة للمنازل والمحلات والمكاتب ✓ تركيب وتوصيل مجاني ✓ ضمان الجودة. اطلب معاينة مجانية!`
- **Why:** "فينيل رول" alone earned 49 imp, "ارضيات فينيل رول" 171 imp at pos 2.5 — leading with that exact phrase boosts ranking at the strongest position.

#### `/products/parket` (831 imp / 0.84% CTR / pos 22.26 — page 3, lowest CTR)

- **Current title:** `أرضيات باركيه بالرياض | خشب طبيعي فاخر مع ضمان`
- **New title:** `باركيه خشب طبيعي بالرياض — أرضيات فاخرة مع ضمان`
- **Current desc:** `باركيه خشب طبيعي بالرياض ✓ تركيب احترافي مجاني ✓ ضمان شامل ✓ أضف فخامة لمنزلك مع العمودي للمفروشات!`
- **New desc:** `باركيه خشب طبيعي وصناعي بالرياض ✓ مقاوم للماء، تركيب احترافي مجاني، ضمان شامل ✓ خامات أوروبية. اطلب عينة مجانية اليوم!`
- **Why:** "باركيه خشب طبيعي" 17 imp pos 13.53 + "ارضيات خشب" 149 imp pos 67.92 — covering both terms moves us toward page 1.

#### `/products/turky-mshager` (673 imp / 1.49% CTR / pos 6.64)

- **Current title:** `موكيت تركي مشجر بالرياض | تصميمات أصيلة وأسعار مميزة`
- **New title:** `موكيت تركي مشجر — تصميمات أصيلة بأسعار الرياض`
- **Current desc:** `موكيت تركي مشجر فاخر بالرياض ✓ تصميمات تركية أصيلة ✓ توصيل وتركيب مجاني ✓ اطلب عينة مجانية الآن!`
- **New desc:** `موكيت تركي مشجر فاخر في الرياض ✓ نقوش أصيلة، خامات متينة ✓ توصيل وتركيب مجاني ✓ ضمان الجودة. اطلب عينة مجانية اليوم!`
- **Why:** keyword "موكيت تركي مشجر" 102 imp pos 5.44 (already great) + "موكيت مشجر" 173 imp pos 7.46. Description leads with the stronger phrase.

#### `/products/mosque-carpets` (677 imp / 2.36% CTR / pos 7.21)

- **Current title:** `موكيت مساجد بالرياض | جودة عالية وتصميم إسلامي أصيل`
- **New title:** `موكيت مساجد بالرياض — تصميم إسلامي وجودة فاخرة`
- **Current desc:** `موكيت مساجد عالي الجودة بتصميمات إسلامية أصيلة. مقاوم للاهتراء ومناسب للمساجد والمراكز الإسلامية.`
- **New desc:** `موكيت مساجد بالرياض ✓ تصاميم إسلامية أصيلة ✓ مقاوم للاهتراء وسهل التنظيف ✓ توصيل وتركيب مجاني للمساجد. اطلب عرض جملة!`
- **Why:** "موكيت مساجد" 96 imp pos 10.71, plus "موكيت للمساجد" 17 imp, "موكيت مسجد" 25 imp — total cluster ~140 imp.

#### `/products/hospital-flooring` (396 imp / 1.01% CTR / pos 5.23)

- **Current title:** `أرضيات مستشفيات - معايير طبية عالية`
- **New title:** `أرضيات مستشفيات وعيادات — فينيل طبي بمعايير عالمية`
- **Current desc:** `أرضيات طبية للمستشفيات والعيادات. مطابقة للمعايير الطبية العالمية، مضادة للبكتيريا، سهلة التعقيم.`
- **New desc:** `أرضيات فينيل طبية للمستشفيات والعيادات بالرياض ✓ مطابقة للمعايير العالمية ✓ مضادة للبكتيريا، سهلة التعقيم ✓ تركيب احترافي.`
- **Why:** "ارضية المستشفيات" 23 imp pos 5 — already top results, the rewrite captures more variants.

#### `/products/artificial-grass` (303 imp / 0.99% CTR / pos 6.19)

- **Current title:** `العشب الصناعي - حديقة خضراء طوال السنة`
- **New title:** `عشب صناعي للحدائق بالرياض — تركيب احترافي وضمان`
- **Current desc:** `عشب صناعي طبيعي المظهر للحدائق والملاعب. جودة عالية، مقاوم للطقس، بدون صيانة. اجعل حديقتك خضراء طوال العام.`
- **New desc:** `عشب صناعي للحدائق والملاعب بالرياض ✓ مقاوم للشمس ودون صيانة ✓ تركيب احترافي وضمان ✓ خضرة دائمة بأقل تكلفة. اطلب عرضًا!`

#### `/products/mokite` (173 imp / 0.58% CTR / pos 4.74 — strong position, terrible CTR)

- **Current title:** `موكيت بالرياض | تشكيلة واسعة مع توصيل وتركيب مجاني`
- **New title:** `موكيت منازل فاخر بالرياض — تشكيلة واسعة بأفضل الأسعار`
- **Current desc:** `موكيت فاخر بالرياض ✓ تشكيلة واسعة للمنازل والمكاتب ✓ توصيل وتركيب مجاني ✓ جودة عالية تدوم سنوات!`
- **New desc:** `موكيت منازل فاخر بالرياض ✓ ألوان وخامات متعددة ✓ توصيل وتركيب مجاني ✓ ضمان الجودة. اطلب عينة من معرضنا اليوم!`
- **Why:** Position 4.74 with 0.58% CTR means the snippet isn't compelling enough. "موكيت" alone gets 746 imp at pos 19.63 — sharper title pulls some of that volume here.

#### `/products/water-resistant-carpet` (135 imp / 1.48% CTR / pos 8.27)

- **Current title:** `باركيه ضد الماء - مقاوم للرطوبة والماء`
- **New title:** `باركيه ضد الماء — للمطابخ والحمامات بضمان مقاومة الرطوبة`
- **Current desc:** `باركيه مقاوم للماء عالي الجودة للحمامات والمطابخ. جمال الخشب الطبيعي مع مقاومة فائقة للماء والرطوبة.`
- **New desc:** `باركيه ضد الماء بالرياض ✓ مثالي للمطابخ والحمامات والمناطق الرطبة ✓ مظهر الخشب الطبيعي مع مقاومة كاملة للماء ✓ ضمان شامل.`

#### `/products/shlal` (167 imp / 1.2% CTR / pos 10.46)

- **Current title:** `شلالات ونوافير - جمال مائي ينبض بالحياة`
- **New title:** `شلالات ونوافير حدائق — جمال مائي بتصميم فاخر`
- **Current desc:** `شلالات ونوافير حدائق فاخرة. تصميمات مائية ساحرة تضفي جمالاً وهدوءاً على منزلك مع أصوات المياه المهدئة.`
- **New desc:** `شلالات ونوافير حدائق بالرياض ✓ تصميمات مائية فاخرة ✓ تركيب وصيانة احترافية ✓ أضف لمسة هدوء وجمال لحديقتك مع العمودي للمفروشات.`

#### `/products/planets` (40 imp / 0% CTR / pos 5.4)

- **Current title:** `نباتات منسقة - زراعة جاهزة للتزيين`
- **New title:** `نباتات منسقة للمنزل والحديقة — تشكيلة فاخرة بضمان`
- **Current desc:** `نباتات طبيعية منسقة للمنزل والحديقة. تشكيلة واسعة من النباتات الجميلة مع العناية والضمان.`
- **New desc:** `نباتات طبيعية منسقة للمنزل والحديقة بالرياض ✓ تشكيلة واسعة ✓ توصيل وتنسيق احترافي ✓ ضمان النمو والصحة. اطلب اليوم!`

#### `/products/office-flooring` (64 imp / 1.56% CTR / pos 8.23)

- **Current title:** `أرضيات مكتبية - حلول أنيقة للبيئة المهنية`
- **New title:** `أرضيات مكاتب بالرياض — موكيت وفينيل تجاري متين`
- **Current desc:** `أرضيات مكتبية عصرية ومتينة للشركات والمكاتب. تصميمات أنيقة وجودة عالية لبيئة عمل مريحة ومهنية.`
- **New desc:** `أرضيات مكاتب بالرياض ✓ موكيت وفينيل تجاري مقاوم للاستهلاك ✓ تصاميم احترافية ✓ تركيب سريع بأقل توقف لعملك. اطلب عرضًا!`
- **Why:** "موكيت مكاتب" 18 imp pos 78.94 — currently ranking very low; clearer keyword match needed.

#### `/products/garden-flooring` (11 imp / 0% CTR / pos 14.82)

- **Current title:** `تنسيق حدائق - حوّل حديقتك إلى جنة خضراء`
- **New title:** `أرضيات حدائق ومسابح — مقاومة للماء والشمس`
- **Current desc:** `تنسيق حدائق احترافي بأيدي خبراء. تصميم وتنفيذ حدائق خضراء جميلة لمنزل أحلامك مع ضمان الجودة والإتقان.`
- **New desc:** `أرضيات حدائق خارجية بالرياض ✓ مقاومة للماء والشمس والاستهلاك ✓ تشكيلة واسعة من الخامات والألوان ✓ تركيب احترافي بضمان.`

#### `/products/vinyl-mosque` (70 imp / 10% CTR / pos 5.54 — best CTR product, keep!)

- **Current title:** `فينيل مساجد - أناقة وطهارة للمساجد`
- **New title:** `فينيل مساجد بالرياض — سهل التنظيف وتصاميم إسلامية`
- **Current desc:** `فينيل مساجد عالي الجودة بتصميمات إسلامية جميلة. سهل التنظيف، مقاوم للاهتراء، مناسب للاستخدام الديني.`
- **New desc:** `فينيل أرضيات للمساجد بالرياض ✓ تصاميم إسلامية أنيقة ✓ سهل التنظيف ومقاوم للاهتراء ✓ تركيب وتوصيل مجاني للمساجد.`

---

## Section 2 — FAQ sections (FAQPage schema)

Implement using the existing `<FAQ>` component (`src/components/seo/FAQ.tsx`). Pattern:

```tsx
import FAQ from '@/components/seo/FAQ';

const productFaq = [
  { question: '…؟', answer: '…' },
  // 5 items
];

// In the JSX, after <ProductView /> and before <ContainerSection>:
<div className="max-w-7xl mx-auto px-4 my-12">
  <FAQ items={productFaq} title="أسئلة شائعة" />
</div>
```

The FAQ component renders both visual accordion + FAQPage JSON-LD. **Don't duplicate** the FAQPage on the homepage if a product page already adds one — they nest fine but each page must have one and only one FAQPage.

### 2.1 — `/carpets`

```tsx
const carpetsFaq = [
  {
    question: 'ما الفرق بين الموكيت التركي المشجر والموكيت العادي؟',
    answer: 'الموكيت التركي المشجر يتميّز بنقوش وزخارف تركية أصيلة وألوان دافئة، وغالبًا ما يكون أكثر سُمكًا ومتانة من الموكيت السادي. مناسب جدًا للمجالس والصالات الكلاسيكية، بينما الموكيت السادي أنسب لغرف النوم والمكاتب.',
  },
  {
    question: 'كم تتراوح أسعار الموكيت في الرياض؟',
    answer: 'تختلف الأسعار حسب النوع والخامة: الموكيت العادي يبدأ من ~30 ريال/متر، الموكيت التركي المشجر من ~60 ريال، وموكيت المساجد بأسعار جملة تنافسية. يشمل السعر التركيب والتوصيل المجاني داخل الرياض.',
  },
  {
    question: 'هل التركيب مجاني؟',
    answer: 'التوصيل مجاني داخل الرياض، أما تركيب الموكيت فبأسعار تنافسية يحدّدها نوع الموكيت ومساحة الغرفة. اطلب عرض سعر شامل التركيب عبر الواتساب 0558352924.',
  },
  {
    question: 'هل تقدّمون موكيت مساجد بأسعار جملة؟',
    answer: 'نعم — لدينا قسم متخصّص لموكيت المساجد بمواصفات شرعية، بأسعار جملة وعروض خاصة لمشاريع المساجد الكبيرة. تواصل معنا لطلب عرض مخصّص.',
  },
  {
    question: 'كيف أحافظ على الموكيت لأطول فترة ممكنة؟',
    answer: 'اشفط الموكيت أسبوعيًا بمكنسة كهربائية، نظّف البقع فورًا بمنظّف خاص بالموكيت دون فرك قوي، وقم بغسل عميق احترافي مرة كل 6-12 شهرًا. تجنّب التعرّض المباشر لأشعة الشمس لمنع بهتان الألوان.',
  },
];
```

### 2.2 — `/products/vinyl-roll`

```tsx
const vinylRollFaq = [
  {
    question: 'ما هو الفينيل رول وما الفرق بينه وبين البلاط؟',
    answer: 'الفينيل رول هو لفائف أرضيات مرنة من البولي فينيل تتميّز بسهولة التركيب (لا حاجة لمواد لاصقة في كثير من الحالات) وعدم وجود فواصل، عكس البلاط الذي يحتاج مونة وتنظيف للفواصل. مثالي للمنازل والمكاتب والمحلات.',
  },
  {
    question: 'هل الفينيل رول مقاوم للماء؟',
    answer: 'نعم — الفينيل رول مقاوم للماء بدرجة عالية، لذا يصلح للمطابخ والحمامات والممرات. استخدم الأنواع الأكثر سُمكًا (3 مم وأعلى) للمناطق ذات الحركة الكثيفة.',
  },
  {
    question: 'كم سُمك الفينيل المناسب للمنازل والمحلات؟',
    answer: 'للمنازل: 1.5-2.5 مم كافٍ. للمكاتب والمحلات التجارية: 2.5-4 مم لتحمّل الحركة الكثيفة. للمستشفيات والمصانع: 4-6 مم بمواصفات طبية. نساعدك في اختيار السُمك المناسب لمساحتك.',
  },
  {
    question: 'هل يمكن تركيب الفينيل فوق البلاط أو الموكيت القديم؟',
    answer: 'نعم — يمكن تركيب الفينيل فوق البلاط شريطة أن يكون السطح مستويًا ونظيفًا. أما الموكيت القديم فيُفضّل إزالته أولًا لأنه يجعل السطح غير ثابت. يقوم فنيونا بفحص الأرضية مجانًا قبل التركيب.',
  },
  {
    question: 'ما هو ضمان الفينيل رول لديكم؟',
    answer: 'نقدّم ضمانًا على التركيب لمدة سنة كاملة، وضمان المُصنِّع على المنتج (يختلف حسب النوع، عادة 5-10 سنوات). جميع منتجاتنا من موردين معتمدين بشهادات جودة.',
  },
];
```

### 2.3 — `/products/parket`

```tsx
const parketFaq = [
  {
    question: 'ما الفرق بين الباركيه الطبيعي والصناعي (HDF/الليمنت)؟',
    answer: 'الباركيه الطبيعي يُصنع من خشب صلب 100%، ويتميّز بمظهر فاخر وعمر طويل (20+ سنة) لكنه أعلى سعرًا. الباركيه الصناعي (HDF/Laminate) يتكوّن من ألواح ضغط عالية الكثافة مع طبقة ديكور علوية، أرخص وأسهل تركيبًا، ويدوم 10-15 سنة.',
  },
  {
    question: 'هل الباركيه مناسب للمطابخ والحمامات؟',
    answer: 'الباركيه الخشبي العادي ليس مثاليًا للمناطق الرطبة. لذلك نقدّم تشكيلة "باركيه ضد الماء" مصمّمة خصيصًا للمطابخ والحمامات بطبقة عازلة كاملة للرطوبة.',
  },
  {
    question: 'كم سعر الباركيه في الرياض؟',
    answer: 'يبدأ سعر الباركيه الصناعي من ~40 ريال/متر، والباركيه الطبيعي من ~150 ريال/متر، يختلف حسب نوع الخشب ودرجة الجودة. يشمل السعر التركيب والتوصيل المجاني والضمان.',
  },
  {
    question: 'كيف يتم تركيب الباركيه؟',
    answer: 'يتم تجهيز الأرضية وفردها بطبقة عازلة (Underlay)، ثم تركيب ألواح الباركيه بنظام النقر والتعشيق (Click System). لا تحتاج إلى مواد لاصقة في معظم الأنواع. التركيب يتم في يوم واحد للغرف المتوسطة.',
  },
  {
    question: 'هل الباركيه يخدش بسهولة؟',
    answer: 'الباركيه الحديث مغلّف بطبقة حماية (AC3-AC5) مقاومة للخدش والاستهلاك. للحفاظ عليه: استخدم لباد تحت الأثاث، لا تجرّ القطع الثقيلة، نظّف بقطعة قماش رطبة فقط (تجنّب الماء الكثير). نقدّم ضمانًا شاملًا على التركيب والمنتج.',
  },
];
```

### 2.4 — `/products/mosque-carpets`

```tsx
const mosqueFaq = [
  {
    question: 'ما المواصفات الشرعية والعملية لموكيت المساجد؟',
    answer: 'موكيت المساجد يجب أن يكون: نظيفًا وسهل التنظيف، خاليًا من الصور والأشكال المنهي عنها، بنقوش هندسية إسلامية، مع علامات صفوف واضحة لتسوية الصفوف. يفضّل الخامات الطبيعية كالصوف أو الألياف المتينة.',
  },
  {
    question: 'كم سعر متر موكيت المساجد بالجملة؟',
    answer: 'نقدّم أسعار جملة خاصة لمشاريع المساجد، تبدأ من ~25 ريال/متر للنوع العادي حتى ~80 ريال/متر للأنواع الفاخرة بصوف طبيعي. اطلب عرضًا مخصّصًا حسب مساحة المسجد ونوع الموكيت.',
  },
  {
    question: 'هل تقدّمون خدمة التركيب لجميع مساجد الرياض؟',
    answer: 'نعم — نوفّر تركيبًا احترافيًا لجميع مساجد الرياض، مع توصيل مجاني للمشاريع الكبيرة. لدينا فرق متخصصة في تركيب موكيت المساجد بسرعة ودقة لتقليل أيام إغلاق المسجد.',
  },
  {
    question: 'كيف يُنظَّف موكيت المساجد ويُحافظ عليه؟',
    answer: 'شفط أسبوعي بمكنسة قوية، تنظيف البقع فورًا بمنظّف موكيت معتمد، وغسل عميق سنوي بماكينات رش متخصّصة. تجنّب المنظّفات الكيميائية القاسية التي تُتلف الألياف.',
  },
  {
    question: 'هل لديكم موكيت مساجد بألوان وتصاميم متعددة؟',
    answer: 'نعم — تشكيلتنا تشمل عشرات الألوان (أخضر، أحمر، أزرق، ذهبي) وتصاميم محاريب متعددة بنقوش إسلامية كلاسيكية وعصرية. يمكنك زيارة المعرض لمعاينة العينات أو طلب عيّنات مجانية.',
  },
];
```

### 2.5 — `/products/turky-mshager`

```tsx
const turkyFaq = [
  {
    question: 'ما الذي يميّز الموكيت التركي المشجر؟',
    answer: 'الموكيت التركي المشجر يجمع بين النقوش التركية الأصيلة (زخارف عثمانية، ورود، أشكال هندسية) والخامات المتينة وعمق الألوان. مثالي للمجالس العربية والصالات الكلاسيكية ويضفي طابعًا فاخرًا.',
  },
  {
    question: 'هل الموكيت التركي المشجر مناسب لغرف الأطفال؟',
    answer: 'نعم لكن نوصي باختيار النقوش الأقل تعقيدًا والألوان الفاتحة لغرف الأطفال، مع التأكّد من خلوّ الموكيت من المواد الكيميائية المؤذية. لدينا تشكيلة معتمدة بشهادات سلامة.',
  },
  {
    question: 'هل ألوان الموكيت تبهت مع الوقت؟',
    answer: 'الموكيت التركي عالي الجودة (الذي نوفّره) يحتفظ بألوانه لسنوات إذا تم تجنّب التعرّض المباشر للشمس. استخدم ستائر معتمة في الغرف المشمسة، ولا تستخدم منظّفات قاسية.',
  },
  {
    question: 'كم تستغرق عملية التركيب؟',
    answer: 'التركيب يستغرق عادة 2-6 ساعات للغرف المتوسطة (حتى 30 م²)، ويوم واحد للمساحات الأكبر. فنيونا يقومون بنقل الأثاث وإعادته بعد الانتهاء.',
  },
  {
    question: 'هل أستطيع طلب عيّنة قبل الشراء؟',
    answer: 'نعم — نوفّر عينات مجانية يمكنك استلامها من المعرض أو طلب توصيلها لمنزلك. تواصل عبر الواتساب 0558352924.',
  },
];
```

### 2.6 — `/products/hospital-flooring`

```tsx
const hospitalFaq = [
  {
    question: 'ما المعايير الواجب توفّرها في أرضيات المستشفيات؟',
    answer: 'يجب أن تكون: مضادة للبكتيريا والفطريات، سهلة التعقيم، مقاومة للمواد الكيميائية الطبية، غير زلقة (Anti-slip)، خالية من الفواصل (لمنع تراكم الجراثيم)، ومقاومة للحريق. أرضياتنا الطبية مطابقة لمعايير ISO وCE.',
  },
  {
    question: 'هل الفينيل الطبي مناسب لجميع أنواع العيادات؟',
    answer: 'نعم — الفينيل الطبي مناسب للمستشفيات، العيادات، مراكز الأشعة، غرف العمليات، صيدليات، ومختبرات. لدينا أنواع متخصّصة لكل بيئة (أنواع موصلة كهربيًا لغرف العمليات، أنواع مضادة للأشعة لمراكز الأشعة).',
  },
  {
    question: 'كم تكلف أرضيات المستشفيات بالمتر؟',
    answer: 'تتراوح بين 70-200 ريال/متر حسب النوع والسُمك والمواصفات الطبية المطلوبة. للمشاريع الكبيرة (1000+ متر) نقدّم أسعار جملة وخصومات خاصة.',
  },
  {
    question: 'هل تقدّمون شهادات مطابقة للأرضيات؟',
    answer: 'نعم — نوفّر شهادات المطابقة الكاملة (CE، ISO، شهادات لا-سُمّية) من المُصنّع، مطلوبة من وزارة الصحة لاعتماد المنشأة الطبية.',
  },
  {
    question: 'كم تستغرق عملية التركيب لمشروع مستشفى؟',
    answer: 'يعتمد على المساحة: 200 م² تستغرق 2-3 أيام، 1000 م² تستغرق 7-10 أيام. نعمل على مراحل لتجنّب تعطيل العمل، وأحيانًا نعمل ليلًا حسب طلب الإدارة.',
  },
];
```

### 2.7 — Apply pattern to remaining product pages (lower priority)

Use the same 5-question pattern for `/products/artificial-grass`, `/products/water-resistant-carpet`, `/products/mokite`, `/products/shlal`, `/products/office-flooring`, and `/products/vinyl-mosque`. Suggested topics: differences vs alternatives, price range, installation/maintenance, warranty, ordering process.

---

## Section 3 — Implementation per page

### 3.1 — Where to insert FAQ in `src/app/products/[id]/page.tsx`

Map FAQ data by product ID. Create `src/data/productFaqs.ts`:

```ts
export const productFaqs: Record<string, { question: string; answer: string }[]> = {
  'vinyl-roll': [/* see §2.2 */],
  'parket': [/* see §2.3 */],
  'mosque-carpets': [/* see §2.4 */],
  'turky-mshager': [/* see §2.5 */],
  'hospital-flooring': [/* see §2.6 */],
};
```

Then in `src/app/products/[id]/page.tsx`, after the `<ProductView />` and before `<ContainerSection>`:

```tsx
import { productFaqs } from '@/data/productFaqs';
import FAQ from '@/components/seo/FAQ';

// ...inside the component, after ProductView:
{productFaqs[id] && (
  <div className="max-w-7xl mx-auto px-4 my-12">
    <FAQ items={productFaqs[id]} title={`أسئلة شائعة عن ${product.title}`} />
  </div>
)}
```

### 3.2 — Where to insert FAQ on `/carpets`

Edit `src/app/carpets/page.tsx`:

```tsx
import FAQ from '@/components/seo/FAQ';
const carpetsFaq = [/* see §2.1 */];

// In the JSX, after the existing ContainerSection:
<div className="my-16">
  <FAQ items={carpetsFaq} title="أسئلة شائعة عن الموكيت والسجاد" />
</div>
```

### 3.3 — Acceptance criteria (FAQ work)

- [ ] Each of the 6 pages emits one (and only one) `FAQPage` JSON-LD.
- [ ] Each FAQ has 5 questions, each answer 2-4 sentences in Arabic.
- [ ] Rich Results Test → page → FAQPage validates with 5 entities.
- [ ] Visual accordion renders correctly RTL.

---

## Section 4 — Roll-out checklist

- [ ] All metadata files updated (12 product pages + 6 category/static pages = 18 pages)
- [ ] No `<title>` exceeds 60 visible characters after the layout template appends the brand
- [ ] No meta description exceeds 160 characters
- [ ] FAQ added to `/carpets` + 5 product pages
- [ ] All H1s match their title's primary keyword
- [ ] Diff sample: paste 5 random page titles + descriptions in PR description for review
- [ ] Re-submit sitemap.xml in GSC after merge
- [ ] Watch GSC CTR by-page report 2/4/6 weeks post-deploy; target +1.5pp on top-10 pages by week 6
