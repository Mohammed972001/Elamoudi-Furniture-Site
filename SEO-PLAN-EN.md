# Comprehensive SEO Strategy - Al-Amoudi Furniture (elamoudifurniture.com)

## Current State (April 27, 2026)

### Key Metrics (Google Search Console - Last 3 Months)
- **Total Clicks:** ~466 (avg 5 clicks/day)
- **Total Impressions:** ~12,864
- **Average CTR:** 3.6% (industry avg is 5-10%)
- **Average Position:** 10.9 (start of page 2)
- **Indexed Pages:** 18 | **Not Indexed:** 11 (5 different reasons)
- **Backlinks:** Only 4 referring domains (extremely weak)
- **90% mobile traffic** | **89% from Saudi Arabia**

### Overall Rating: 5/10 — Strong technical foundation, massive room for improvement

---

## Tech Stack
- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS v4
- **Hosting:** Vercel (inferred from .gitignore)
- **Domain:** www.elamoudifurniture.com (with 301 redirect from non-www)
- **Language:** Arabic (RTL), locale ar_SA

---

## Competitor Analysis

### Top Competitors

| Competitor | Domain | Strengths |
|-----------|--------|-----------|
| **Al-Sourayia (السريّع)** | alsourayia.com | 75 years history, full e-commerce, blog, Tamara/Tabby payments, catalogs, installation guides |
| **Al-Kaffary (القفاري)** | kaffary.com | Blog, custom carpets, premium branding, certifications |
| **Mafrushat Al-Riyadh** | mafrushat-alriyad.com | Location-based domain, e-commerce, promotions |

### Key Competitive Gaps (What They Have, We Don't)
1. **No blog** — Competitors have informational content that captures top-of-funnel searches
2. **Only 4 backlinks** — Competitors likely have hundreds
3. **No e-commerce** (no prices, cart, checkout on our site)
4. **No dedicated service pages** (installation, free visit, warranty)
5. **No optimized Google My Business** profile
6. **No real customer reviews** on site (currently using fake aggregateRating in JSON-LD)
7. **Not appearing in top 10** for primary generic keywords like "موكيت الرياض" (carpet Riyadh)

---

## Phase 1: Critical Technical Fixes (Week 1-2)

### 1.1 Fix Title Template Duplication
**Problem:** Pages like `/carpets` render as "تشكيلة السجاد | العمودي للمفروشات | العمودي للمفروشات" (brand name doubled).
**Cause:** Child pages set `title: "X | العمودي للمفروشات"` but the root layout template `"%s | العمودي للمفروشات"` appends it again.

**Fix in:** `src/app/carpets/page.tsx`, `src/app/products/page.tsx`, `src/app/decor/page.tsx`, and all pages with this pattern.
- Change `title` from `"X | العمودي للمفروشات"` to just `"X"` — the template will append the brand automatically.

### 1.2 Fix Redirects (307 → 301)
**Problem:** `/curtains` and `/kitchens` use `redirect()` which produces 307 (temporary), not 301 (permanent).

**Fix in:** `src/app/curtains/page.tsx`, `src/app/kitchens/page.tsx`
- Replace `redirect()` with `permanentRedirect()` from `next/navigation`

### 1.3 Get Non-Indexed Pages Indexed
**Problem:** `/products` and `/decor` are "discovered but not indexed" in GSC.

**Fix:**
- Request indexing in GSC for `/products` and `/decor`
- Add richer text content to both pages so Google sees value to index them
- The `/products` page needs more descriptive content, not just product cards

### 1.4 Add Page-Specific Open Graph Metadata
**Problem:** Pages `/carpets`, `/products`, `/decor` have NO page-level OG metadata — they inherit the generic homepage OG, so sharing these URLs on social media shows homepage text.

**Fix:** Add `openGraph` and `twitter` objects to the `metadata` export in each of these pages with page-specific title, description, and image.

### 1.5 Unify NAP Data (Name, Address, Phone)
**CRITICAL Problem — NAP Inconsistency:**
- `src/app/contact/page.tsx` JSON-LD has address "طريق الملك فهد" (King Fahd Road)
- `src/components/seo/JsonLd.tsx` (LocalBusinessSchema) has "شارع عبدالله بن صالح" (Abdullah bin Saleh Street)
- Two different WhatsApp numbers used across the site: `966558352924` and `966567746257`

**Fix:** Create a single source of truth for business data (e.g., in `src/constants/business.ts`) with the correct address and phone, then import it everywhere.

### 1.6 Install Google Analytics 4
**Problem:** No GA4 — only Google Ads tag (`AW-17506948956`). No visitor behavior data at all.

**Fix in** `src/app/layout.tsx`:
- The code already supports `NEXT_PUBLIC_GA4_ID` env var
- Add the actual GA4 measurement ID to `.env`

### 1.7 Add Breadcrumbs to Garden Page
**Problem:** `/garden` is the only page without `Breadcrumbs` component.

**Fix:** Add `<Breadcrumbs>` to `src/app/garden/page.tsx` (or `GardenClient.tsx`).

### 1.8 Add WebSite SearchAction to JSON-LD
**Problem:** `WebSiteSchema` in `src/components/seo/JsonLd.tsx` has a comment about sitelinks search box but no actual `potentialAction` / `SearchAction` implementation.

**Fix:** Add `potentialAction` with `SearchAction` to the `WebSiteSchema` if the site has a search feature; otherwise, remove the misleading comment.

### 1.9 Fix SEOContent Paragraph Splitting
**Problem:** `src/components/seo/SEOContent.tsx` splits on `text.split('\\n\\n')` (literal backslash-n pairs) instead of actual newlines, so `detailedDescription` from product data may render as one unbroken block.

**Fix:** Change to `text.split('\n\n')` (actual newline characters).

### 1.10 Remove Fake aggregateRating from ProductSchema
**Problem:** `src/components/seo/JsonLd.tsx` (line ~209-215) has hardcoded `ratingValue: 4.8`, `reviewCount: 150` for ALL products. This is fabricated and violates Google's policies — risk of manual action.

**Fix:** Remove `aggregateRating` entirely until real reviews exist. Later, implement a real review collection system.

---

## Phase 2: CTR Optimization (Week 2-3)

### 2.1 Rewrite Meta Titles for High-Impression Pages

| Page | Impressions | Current CTR | Proposed Title (Arabic) |
|------|------------|-------------|------------------------|
| `/products/vinyl-roll` | 1,256 | 1.27% | فينيل رول أرضيات - أسعار تنافسية مع التركيب |
| `/products/parket` | 831 | 0.84% | باركيه خشب طبيعي وضد الماء - العمودي |
| `/products/turky-mshager` | 673 | 1.49% | موكيت تركي مشجر فاخر - توصيل مجاني الرياض |
| `/products/hospital-flooring` | 396 | 1.01% | أرضيات مستشفيات ومرافق طبية - فينيل طبي |
| `/products/artificial-grass` | 303 | 0.99% | عشب صناعي للحدائق - تركيب احترافي الرياض |
| `/garden` | 270 | 0.37% | تنسيق حدائق الرياض - عشب صناعي وشلالات |
| `/products/mokite` | 173 | 0.58% | موكيت منازل فاخر - أجود الخامات بأفضل الأسعار |

### 2.2 Rewrite Meta Descriptions
Every description must contain:
- Primary keyword
- Competitive advantage (free delivery, installation, warranty)
- Call to Action (order now, contact us)
- Geographic location (الرياض / Riyadh)

### 2.3 Add FAQ Schema to More Pages
Currently FAQ exists only on homepage. Add FAQ sections with `FAQPage` JSON-LD to:
- `/carpets` — Questions about carpet types and prices
- `/products/vinyl-roll` — Questions about vinyl flooring
- `/products/parket` — Questions about parquet
- `/products/mosque-carpets` — Questions about mosque carpet

---

## Phase 3: Blog & Content Strategy (Month 2-3)

### 3.1 Build Blog Infrastructure
Create `/blog` route in Next.js with:
- Blog listing page with pagination
- Individual article pages with `Article` JSON-LD schema
- Breadcrumbs on every article
- Internal linking to related products
- Social share buttons
- Table of Contents for long articles

### 3.2 Article Plan (20 Articles — Priority Ordered)

#### Top Priority (targeting keywords with existing impressions):

1. **"أفضل أنواع الموكيت: دليلك الشامل للاختيار"** (Best Carpet Types: Complete Guide)
   - Keywords: موكيت، أنواع الموكيت، موكيت تركي، موكيت مشجر
   - Potential impressions: ~1,100 (746+173+84+102)

2. **"أرضيات فينيل رول: كل ما تحتاج معرفته قبل الشراء"** (Vinyl Roll Flooring: Everything to Know)
   - Keywords: فينيل رول، أرضيات فينيل، فينيل ارضيات
   - Supporting product page: /products/vinyl-roll (1,256 impressions)

3. **"باركيه ضد الماء للمطابخ والحمامات"** (Waterproof Parquet for Kitchens & Bathrooms)
   - Keywords: باركيه ضد الماء، باركيه خشب، أرضيات باركيه
   - Potential impressions: ~980

4. **"موكيت مساجد: كيف تختار السجاد المناسب لمسجدك"** (Mosque Carpet Selection Guide)
   - Keywords: موكيت مساجد، سجاد مساجد، موكيت مسجد
   - Potential impressions: ~150

5. **"أسعار الموكيت في الرياض 2026"** (Carpet Prices in Riyadh 2026)
   - Keywords: اسعار الموكيت، موكيت الرياض، محلات موكيت
   - Potential impressions: ~150

6. **"الفرق بين الباركيه الطبيعي والصناعي"** (Natural vs Synthetic Parquet)
   - Keywords: باركيه خشب طبيعي، أرضيات خشبية
   - Potential impressions: ~170

7. **"دليل تنسيق الحدائق المنزلية في الرياض"** (Home Garden Landscaping Guide)
   - Keywords: تنسيق حدائق، عشب صناعي، شلالات

8. **"موكيت المكاتب: كيف تختار الأرضيات المثالية لمكتبك"** (Office Carpet Guide)
   - Keywords: موكيت مكاتب، أرضيات مكتبية

9. **"أرضيات المستشفيات والمرافق الصحية"** (Hospital Flooring Standards)
   - Keywords: أرضية مستشفيات، فينيل طبي

10. **"تركيب الموكيت: دليل خطوة بخطوة"** (Carpet Installation Step-by-Step)
    - Keywords: تركيب موكيت، فرش موكيت

#### Medium Priority (new keyword opportunities):

11. "أفضل أنواع السجاد للمجالس العربية" (Best Carpet for Arabic Majlis)
12. "موكيت الفنادق: المواصفات والأنواع" (Hotel Carpet Specifications)
13. "كيف تحافظ على الموكيت: دليل التنظيف" (Carpet Maintenance Guide)
14. "الفينيل مقابل الباركيه: مقارنة شاملة" (Vinyl vs Parquet Comparison)
15. "أرضيات العشب الصناعي" (Artificial Grass Flooring Guide)

#### Reviews & Comparisons:

16. "مراجعة: أفضل 5 أنواع موكيت تركي في السعودية" (Top 5 Turkish Carpets Review)
17. "مقارنة أسعار الأرضيات في الرياض 2026" (Flooring Prices Comparison)
18. "تجربة عملائنا: مشاريع ناجحة" (Customer Project Showcases)
19. "دليل محلات الموكيت في الرياض" (Carpet Shops Guide in Riyadh)
20. "الأرضيات في المناخ السعودي" (Flooring for Saudi Climate)

---

## Phase 4: New Service & Location Pages (Month 2)

### 4.1 Service Pages to Create
1. **`/services/installation`** — Professional installation service
2. **`/services/free-visit`** — Free representative visit
3. **`/services/warranty`** — Warranty & return policy
4. **`/services/delivery`** — Free delivery service
5. **`/projects`** — Portfolio/project gallery with photos

### 4.2 Location Pages
1. **`/locations/riyadh`** — Main Riyadh branch page (local SEO powerhouse)

---

## Phase 5: Backlink Building (Month 3-6)

### Current State: Only 4 Referring Domains
- baaeed.com, github.com, mohammedelsayed.tech, tiktok.com

### Link Building Strategy

**Tier 1 — Local Business Directories (20+ links):**
- Google My Business (most important)
- Saudi Arabia Yellow Pages
- Foursquare / Yelp
- Local review platforms
- Chamber of Commerce
- Saudi business directories

**Tier 2 — Social Media Profiles (5-10 links):**
- Instagram, TikTok (already exists), YouTube, Snapchat, Twitter/X

**Tier 3 — Content & Partnerships (10+ links):**
- Guest posts on construction/decor blogs
- Articles on Saudi real estate websites
- Partnerships with contractors and interior designers
- Trade show participation with media coverage

**Tier 4 — Linkable Assets:**
- Infographic: "Guide to Choosing Flooring"
- Calculator tool: carpet area calculator
- Downloadable PDF guides

---

## Phase 6: Local SEO (Ongoing)

### 6.1 Google My Business
- Create/optimize full GMB profile
- Add all photos (showroom, products, team)
- Update hours, services, attributes
- Respond to all reviews
- Post weekly offers/updates

### 6.2 Review Collection
- Request reviews from existing customers (Google Reviews)
- Add review link to thank-you messages and WhatsApp
- Display real reviews on website (replacing current fake ratings)

---

## Phase 7: Monitoring & KPIs

### Target KPIs

| Metric | Current | 3-Month Goal | 6-Month Goal |
|--------|---------|-------------|-------------|
| Clicks/month | ~155 | 400 | 1,000 |
| CTR | 3.6% | 6% | 8% |
| Avg Position | 10.9 | 7 | 5 |
| Indexed Pages | 18 | 30 | 50+ |
| Backlinks | 4 | 25 | 50+ |
| Blog Articles | 0 | 10 | 20 |

---

## Deliverable Spec Files

The spec should be broken into these files:

1. **`SEO-SPEC-TECHNICAL.md`** — Technical fixes (Phase 1): exact file changes with before/after code
2. **`SEO-SPEC-CTR.md`** — CTR optimization (Phase 2): new titles, descriptions, FAQ content for every page
3. **`SEO-SPEC-BLOG.md`** — Blog (Phase 3): technical infrastructure + first 10 articles with outlines, keywords, target length
4. **`SEO-SPEC-PAGES.md`** — New pages (Phase 4): service pages and project gallery specs
5. **`SEO-SPEC-OFFPAGE.md`** — Off-page SEO (Phase 5-6): backlink plan, GMB setup, review strategy
