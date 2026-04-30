# SEO Knowledge Base — Al-Amoudi Furniture (elamoudifurniture.com)
## Complete Context Dump for Claude Code

> This file contains ALL findings, data, and analysis gathered during a comprehensive SEO audit session.
> It serves as the single source of truth for creating detailed SEO specs.
> Date: April 27, 2026

---

## 1. ABOUT THE BUSINESS

- **Brand Name (Arabic):** العمودي للمفروشات / مفروشات العمودي
- **English Name:** Al-Amoudi Furniture
- **Website:** https://www.elamoudifurniture.com
- **Location:** Al-Aziziyah district, Abdullah bin Saleh Street, Riyadh, Saudi Arabia
- **Business Type:** Carpet, flooring & home furnishing retail store
- **Products:** Carpet (موكيت), mosque carpet, vinyl roll, parquet, hospital flooring, artificial grass, Turkish patterned carpet, water-resistant carpet, waterfalls/fountains, plants, office flooring, garden flooring
- **Services:** Free delivery, professional installation, free representative visit, warranty

---

## 2. TECH STACK

- **Framework:** Next.js 16.1.1 (App Router) with Turbopack
- **React:** 19.0.0
- **TypeScript:** 5.x
- **CSS:** Tailwind CSS v4 via `@tailwindcss/postcss`
- **Font:** Cairo (Arabic + Latin, display: swap)
- **Image handling:** `next/image` with WebP + AVIF formats
- **Hosting:** Vercel (inferred from `.vercel` in .gitignore)
- **Domain:** www.elamoudifurniture.com (301 redirect from non-www in next.config.ts)
- **HTML attributes:** `lang="ar"`, `dir="rtl"`
- **Analytics:** Google Ads tag `AW-17506948956` (NO GA4 installed)
- **Environment vars:** `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GA4_ID` (not set)

---

## 3. COMPLETE PROJECT STRUCTURE

```
src/
├── app/
│   ├── layout.tsx          # Root layout with global metadata, JSON-LD, GA tags
│   ├── page.tsx            # Homepage: hero, sections, FAQ
│   ├── globals.css         # Tailwind imports, theme, dark mode
│   ├── favicon.svg         # SVG favicon
│   ├── robots.ts           # Robots.txt generator
│   ├── sitemap.ts          # Sitemap.xml generator
│   ├── about/page.tsx      # About page
│   ├── carpets/page.tsx    # Carpets category page
│   ├── contact/page.tsx    # Contact page
│   ├── curtains/page.tsx   # REDIRECTS to /decor (uses redirect(), NOT permanentRedirect!)
│   ├── decor/page.tsx      # Decor category page
│   ├── garden/
│   │   ├── page.tsx        # Garden page (server)
│   │   └── GardenClient.tsx # Garden client component
│   ├── kitchens/page.tsx   # REDIRECTS to /products (uses redirect(), NOT permanentRedirect!)
│   ├── products/
│   │   ├── page.tsx        # Products listing page
│   │   └── [id]/
│   │       ├── page.tsx    # Product detail (SSG via generateStaticParams)
│   │       ├── ProductView.tsx
│   │       └── not-found.tsx
│   └── api/feed/route.ts   # XML product feed (Google Merchant style)
├── components/
│   ├── hero/               # HeroSection, HeroContainer
│   ├── navbar/             # Logo, NavBar components
│   ├── seo/
│   │   ├── JsonLd.tsx      # All JSON-LD schemas
│   │   ├── Breadcrumbs.tsx # BreadcrumbList schema + UI
│   │   ├── FAQ.tsx         # FAQPage schema + UI
│   │   └── SEOContent.tsx  # Long-form content renderer
│   └── ui/                 # Shared UI components
├── constants/navigation.ts  # Nav links, APP_CONFIG
├── data/
│   ├── products.ts         # All product data (titles, descriptions, keywords, images, prices)
│   └── containers.ts       # Category container data
├── styles/fonts.css
└── types/index.ts

public/
├── home/                   # hero-bg.png, logo.svg, social SVGs
├── NavBar/                 # Navigation icons
├── og-image.jpg            # Default OG image (1200x630)
├── WhatsApp.jpeg           # Old favicon (still referenced somewhere)
├── manifest.json           # PWA manifest (not linked in layout)
└── favicon.svg → src/app/favicon.svg
```

---

## 4. GOOGLE SEARCH CONSOLE DATA (April 27, 2026 — Last 3 Months)

### 4.1 Performance Summary
- **Total Clicks:** ~466
- **Total Impressions:** ~12,864
- **Average CTR:** 3.6%
- **Average Position:** 10.9

### 4.2 Top Queries (ALL 432 keywords — showing top 50)

| Query | Clicks | Impressions | CTR | Position | Type |
|-------|--------|------------|-----|----------|------|
| مفروشات العمودي | 69 | 209 | 33% | 3.1 | Branded |
| العمودي للسجاد | 67 | 207 | 32.4% | 2.08 | Branded |
| سجاد العمودي | 28 | 75 | 37.3% | 2.05 | Branded |
| العمودي للمفروشات | 21 | 157 | 13.4% | 2.94 | Branded |
| العمودي للسجاد والموكيت | 15 | 67 | 22.4% | 1.84 | Branded |
| **موكيت** | **11** | **746** | **1.47%** | **19.63** | **Generic - HIGH OPPORTUNITY** |
| العامودي للسجاد | 8 | 27 | 29.6% | 2.04 | Branded |
| **مفروشات موكيت** | **7** | **282** | **2.48%** | **7.88** | **Generic** |
| **موكيت مساجد** | **6** | **96** | **6.25%** | **10.71** | **Generic** |
| للموكيت | 5 | 73 | 6.85% | 6.88 | Generic |
| العمودي للموكيت | 5 | 17 | 29.4% | 1.71 | Branded |
| موكيت تركي مشجر | 4 | 102 | 3.92% | 5.44 | Generic |
| موكيت الرياض | 4 | 76 | 5.26% | 11.93 | Generic+Location |
| **موكيت مشجر** | **3** | **173** | **1.73%** | **7.46** | **Generic - HIGH OPP** |
| **أرضيات فينيل رول** | **3** | **171** | **1.75%** | **2.5** | **Generic - HIGH OPP** |
| **موكيت سجاد** | **2** | **206** | **0.97%** | **12.89** | **Generic - HIGH OPP** |
| فينيل رول | 2 | 49 | 4.08% | 6.53 | Generic |
| سجاد الرياض | 2 | 44 | 4.55% | 13.66 | Generic+Location |
| سجاد موكيت | 1 | 180 | 0.56% | 14.52 | Generic |
| موكيت وسجاد | 1 | 101 | 0.99% | 7.21 | Generic |
| مفروشات سجاد | 1 | 99 | 1.01% | 14.48 | Generic |
| موكيت ارضيات | 1 | 73 | 1.37% | 14.97 | Generic |
| رول فينيل ارضيات | 1 | 54 | 1.85% | 5.39 | Generic |

**Zero-click but high-impression keywords (TOP opportunities):**

| Query | Impressions | Position | Opportunity |
|-------|------------|----------|-------------|
| العمودي | 204 | 17.42 | Brand - needs content |
| ارضيات خشب | 149 | 67.92 | Way too low position |
| موكيت تركي | 84 | 14.14 | Page 2 |
| صور موكيت | 83 | 1.13 | Position 1 but 0 clicks! Image issue |
| العامودي | 83 | 10.33 | Brand misspelling |
| موكيت الراضي الرياض | 59 | 8.51 | Misspelling but relevant |
| للسجاد والموكيت | 53 | 12.68 | Generic |
| سجاد وموكيت | 50 | 17.2 | Generic |
| فينيل | 44 | 16.98 | Generic |
| رول فينيل | 42 | 7.5 | Generic |
| محل موكيت | 40 | 10.45 | Local intent |
| رول ارضيات | 38 | 3.37 | Great position, 0 clicks |
| تنسيق حدائق | 36 | 139 | Very low position |
| فينيل رول ارضيات | 35 | 5.71 | Good position, 0 clicks |
| الموكيت | 35 | 15.14 | Generic |
| موكيت فاخر | 34 | 23.79 | Luxury intent |
| مفروشات طريق الملك سلمان | 33 | 5.33 | Local |
| فني تركيب موكيت بالرياض | 28 | 37.89 | Service intent |
| موكيت مسجد | 25 | 9.16 | Near page 1 |
| ارضية المستشفيات | 23 | 5 | Good position |
| رولات فينيل | 23 | 8.04 | Generic |
| ارضيات فينيل رول | 21 | 2.1 | Great position! |
| فينيل ارضيات | 20 | 13.7 | Generic |
| موكيت مكاتب | 18 | 78.94 | Very low position |
| أرضيات فينيل | 17 | 7.06 | Near page 1 |
| باركيه خشب طبيعي | 17 | 13.53 | Generic |
| شلالات ونوافير | 17 | 33.65 | Service |

### 4.3 Top Pages Performance

| Page | Clicks | Impressions | CTR | Position |
|------|--------|------------|-----|----------|
| / (homepage www) | 348 | 7,255 | 4.8% | 10.79 |
| /carpets | 63 | 1,128 | 5.59% | 7.19 |
| /contact | 22 | 567 | 3.88% | 8.78 |
| /products/vinyl-roll | 16 | 1,256 | 1.27% | 7.92 |
| /products/mosque-carpets | 16 | 677 | 2.36% | 7.21 |
| /products/turky-mshager | 10 | 673 | 1.49% | 6.64 |
| /products/parket | 7 | 831 | 0.84% | 22.26 |
| /about | 7 | 484 | 1.45% | 7.47 |
| /products/vinyl-mosque | 7 | 70 | 10% | 5.54 |
| /products/hospital-flooring | 4 | 396 | 1.01% | 5.23 |
| /products/artificial-grass | 3 | 303 | 0.99% | 6.19 |
| / (homepage non-www) | 3 | 77 | 3.9% | 9.13 |
| /products/shlal | 2 | 167 | 1.2% | 10.46 |
| /products/water-resistant-carpet | 2 | 135 | 1.48% | 8.27 |
| /garden | 1 | 270 | 0.37% | 27.9 |
| /products/mokite | 1 | 173 | 0.58% | 4.74 |
| /products/office-flooring | 1 | 64 | 1.56% | 8.23 |
| /products/planets | 0 | 40 | 0% | 5.4 |
| /kitchens | 0 | 16 | 0% | 5.81 |
| /curtains | 0 | 15 | 0% | 25.73 |
| /products/garden-flooring | 0 | 11 | 0% | 14.82 |

### 4.4 Geographic Distribution

| Country | Clicks | Impressions | CTR | Position |
|---------|--------|------------|-----|----------|
| Saudi Arabia | 412 | 8,845 | 4.66% | 12.27 |
| Egypt | 16 | 914 | 1.75% | 8.42 |
| Yemen | 7 | 274 | 2.55% | 6.61 |
| Jordan | 5 | 287 | 1.74% | 6.72 |
| Kuwait | 4 | 159 | 2.52% | 9.58 |
| Qatar | 3 | 100 | 3% | 7.95 |
| Syria | 2 | 257 | 0.78% | 5.46 |
| UAE | 2 | 210 | 0.95% | 10 |

### 4.5 Device Distribution

| Device | Clicks | Impressions | CTR | Position |
|--------|--------|------------|-----|----------|
| Mobile | 419 | 10,494 | 3.99% | 9.36 |
| Desktop | 46 | 2,290 | 2.01% | 17.16 |
| Tablet | 1 | 80 | 1.25% | 9.39 |

### 4.6 Search Appearance

| Type | Clicks | Impressions | CTR | Position |
|------|--------|------------|-----|----------|
| Review snippets | 39 | 2,175 | 1.79% | 13.55 |
| Product snippets | 4 | 133 | 3.01% | 22.95 |
| Merchant data | 1 | 1 | 100% | 2 |

### 4.7 Indexing Status (from GSC screenshots)
- **Indexed:** 18 pages
- **Not Indexed:** 11 pages (5 reasons):
  - Redirect pages: 3
  - Not found (404): 2
  - Alternate page with canonical: 2
  - Discovered but not indexed: 2
  - Crawled but not indexed: 2

### 4.8 URL Inspection Results

**Homepage (/):** Indexed, HTTPS valid, FAQ detected (1 valid element), breadcrumbs detected

**Carpets (/carpets):** Indexed, HTTPS valid, breadcrumbs detected (1 valid element)

**/products:** NOT INDEXED — "Discovered but not indexed"
- Discovery source: sitemap.xml
- Referring pages: /products/parket, /products/planets
- Crawl info: ALL "not available" (never crawled by Google yet!)
- After live test: page IS fetchable, indexing IS allowed, canonical is /products

**/decor:** NOT INDEXED — "Discovered but not indexed"
- Discovery source: sitemap.xml
- No referring pages detected
- Crawl info: ALL "not available"
- After live test: page IS fetchable, indexing IS allowed, canonical is /decor

### 4.9 Backlinks (External Links)

**Only 4 referring domains:**

| Domain | Linking Pages | Target Pages |
|--------|--------------|-------------|
| baaeed.com | 1 | 1 |
| github.com | 1 | 1 |
| mohammedelsayed.tech | 1 | 1 |
| tiktok.com | 1 | 1 |

**All links point to homepage only.**

**Anchor text distribution:**
1. (empty) — most common
2. "live"
3. "www elamoudifurniture com"
4. "شركة العمودي للأثاث والسجاد"

### 4.10 Enhancements (from GSC)
- **Breadcrumbs:** Valid (multiple pages)
- **FAQ:** 1 valid item (homepage)
- **Review snippets:** 4 valid items (product pages: shlal, artificial-grass, water-resistant-carpet, planets)
- **No critical issues, no warnings**

### 4.11 Indexing Trend (Review Snippets Items)
- Jan 28: 1 item → steadily grew to 13 items by March 15
- April 15: started dropping from 13 → down to 4 by April 25
- **This drop coincides with recent site changes and needs investigation**

---

## 5. DETAILED SEO AUDIT OF EVERY PAGE

### 5.1 Root Layout (`src/app/layout.tsx`)
- **Title template:** `%s | العمودي للمفروشات`
- **Default title:** `العمودي للمفروشات | موكيت وأرضيات في الرياض`
- **Description:** `العمودي للمفروشات - متخصصون في موكيت وأرضيات وباركيه وفينيل في الرياض. موكيت مساجد، أرضيات عالية الجودة. توصيل وتركيب مجاني.`
- **Keywords:** 15 Arabic phrases
- **metadataBase:** `NEXT_PUBLIC_SITE_URL` or `https://www.elamoudifurniture.com`
- **Canonical:** `/`
- **OG:** type: website, locale: ar_SA, images: `/og-image.jpg` (1200x630)
- **Twitter:** summary_large_image
- **JSON-LD:** WebSiteSchema + OrganizationSchema + LocalBusinessSchema (HomeAndConstructionBusiness)
- **GA:** Google Ads `AW-17506948956`, optional GA4 via env var
- **Google verification:** COMMENTED OUT

### 5.2 Homepage (`src/app/page.tsx`)
- **Title:** Inherits default from layout
- **H1:** "العمودي للمفروشات والموكيت / كل لمسة تبدأ / من الأرض"
- **JSON-LD:** FAQPage (5 Q&As)
- **Content:** Hero, icon strip, 2x ContainerSection, 2x HeroContainer CTAs, product grid with 6 internal links, FAQ
- **Issues:** Title/OG are generic site-wide; no page-specific OG override

### 5.3 Carpets Page (`src/app/carpets/page.tsx`)
- **Title:** `تشكيلة السجاد | العمودي للمفروشات` — **BUG: template will double to "...| العمودي | العمودي"**
- **Description:** `اكتشف أحدث تشكيلات السجاد الفاخر...`
- **H1:** `السجاد والموكيت`
- **JSON-LD:** BreadcrumbList only
- **Canonical:** `/carpets`
- **Issues:** No keywords, no OG, no Twitter, title template duplication

### 5.4 Products Listing (`src/app/products/page.tsx`)
- **Title:** `المنتجات | العمودي للمفروشات` — **same duplication bug**
- **Description:** mentions "أثاث منزلي" which is broader than actual positioning
- **H1:** `جميع المنتجات`
- **JSON-LD:** BreadcrumbList
- **Issues:** Not indexed in Google, no OG, weak content for indexing

### 5.5 Product Detail (`src/app/products/[id]/page.tsx`)
- **Title:** `${product.title} | العمودي للمفروشات` — potential triple duplication if product.title already contains brand
- **Description:** `product.metaDescription` (per product)
- **Keywords:** `product.keywords` joined as string
- **Canonical:** `/products/{id}`
- **OG:** Full setup with product images, locale, siteName
- **Twitter:** summary_large_image with first product image
- **JSON-LD:** Product (+ optional Offer when price exists) + BreadcrumbList
- **Issues:** `og:type` is "website" instead of "product"; products without price miss Offer in JSON-LD

### 5.6 Decor Page (`src/app/decor/page.tsx`)
- **Title:** `الديكور | العمودي للمفروشات` — duplication bug
- **H1:** `الديكور والإكسسوارات`
- **JSON-LD:** BreadcrumbList
- **Issues:** Not indexed, no OG, no keywords

### 5.7 Garden Page (`src/app/garden/page.tsx` + `GardenClient.tsx`)
- **Title:** `تنسيق الحدائق - العمودي للمفروشات` (uses hyphen, not pipe)
- **Keywords:** Set (ground cover, Riyadh, etc.)
- **OG:** Set but NO og:image
- **Twitter:** Set but NO images
- **JSON-LD:** NONE on garden page
- **H1:** `تنسيق الحدائق`
- **Issues:** No breadcrumbs, no JSON-LD, phone number inconsistency (two different numbers), weak internal linking

### 5.8 About Page (`src/app/about/page.tsx`)
- **Title:** `من نحن - العمودي للمفروشات | خبرة في موكيت وسجاد الرياض`
- **Keywords:** 10 phrases
- **OG:** Full setup but NO images
- **Twitter:** summary (not large_image)
- **JSON-LD:** Inline AboutPage + Organization
- **H1:** `معلومات عنا` (doesn't match title "من نحن")
- **Issues:** H1 vs title mismatch, no OG images, org name variant

### 5.9 Contact Page (`src/app/contact/page.tsx`)
- **Title:** Long keyword-stuffed: `اتصل بنا - العمودي للمفروشات | سجاد الرياض | ...`
- **Keywords:** 20+ phrases (excessive)
- **OG:** Set with URL
- **Twitter:** summary
- **JSON-LD:** ContactPage + LocalBusiness — **DIFFERENT ADDRESS than layout!**
- **H1:** `اتصل بنا`
- **Issues:** NAP conflict (address: "طريق الملك فهد" vs "شارع عبدالله بن صالح"), two WhatsApp numbers, keyword stuffing risk

### 5.10 Redirect Pages
- `/curtains` → `redirect('/decor')` — **uses redirect() not permanentRedirect(), produces 307 not 301**
- `/kitchens` → `redirect('/products')` — same issue

---

## 6. JSON-LD SCHEMAS INVENTORY

| Location | Schemas |
|----------|---------|
| layout.tsx (global) | WebSite, Organization, LocalBusiness (HomeAndConstructionBusiness) |
| Homepage | FAQPage (5 Q&As) |
| Product detail pages | Product (+ optional Offer), BreadcrumbList |
| Carpets, Products, Decor | BreadcrumbList |
| About | AboutPage + Organization |
| Contact | ContactPage + LocalBusiness (DIFFERENT address!) |
| Garden | NONE (missing!) |

**Issues with schemas:**
1. WebSiteSchema: no SearchAction (comment says it supports sitelinks search box, but not implemented)
2. ProductSchema: hardcoded fake aggregateRating (4.8 stars, 150 reviews) for ALL products — violates Google policy
3. LocalBusiness NAP conflict between layout.tsx and contact/page.tsx
4. No Article/BlogPosting schema (no blog exists)

---

## 7. COMPETITOR ANALYSIS (from live browsing)

### 7.1 Google SERP Analysis for Key Keywords

**"موكيت الرياض" search results:**
1. mokeyat-riyadh.com
2. mafrushat-alriyad.com
3. alsourayia.com (السريّع)
4. Instagram @alsouraya_carpets (25k+ followers)
5. aynaqa.com (directory/review site)
- **elamoudifurniture.com NOT in top 10!**
- Google Local Pack showing with ratings/reviews
- People Also Ask section present

### 7.2 alsourayia.com (السريّع) Analysis
- **Title:** "السريّع للأرضيات والمفروشات | أكبر متجر أرضيات في السعودية"
- **History:** 75 years (est. 1951)
- **Features:**
  - Full e-commerce with cart/checkout
  - Tamara/Tabby installment payments
  - 12+ product categories
  - Weekly product features with countdown timers
  - Service pages: representative visit, floor preview, catalogs, installation guide
  - Blog section
  - Newsletter signup
  - Professional design

### 7.3 kaffary.com (القفاري) Analysis
- **Title:** "سجاد القطن الملكي - راحة فاخرة... بتصاميم حصرية"
- **Features:**
  - Blog section (important for SEO content)
  - Custom carpet tailoring
  - Advanced product filters (style, color, size, origin)
  - Saudi Business Center certification (trust signal)
  - Premium luxury positioning
  - Multiple product categories with deep navigation

### 7.4 mafrushat-alriyad.com Analysis
- **Title:** "مفروشات الرياض للأرضيات - تشكيلة واسعة من الموكيت والمفروشات الفاخرة"
- **Features:**
  - Location-based domain name
  - Full e-commerce with cart
  - Tamara/Tabby with 70% off promotions
  - User accounts
  - Quote request system

### 7.5 Competitive Gaps Summary
1. **Blog/Content marketing** — All top competitors have it, we don't
2. **E-commerce** — Competitors have full shopping carts with installment options
3. **Backlinks** — We have 4, competitors likely have 100+
4. **Google My Business** — Competitors appear in Local Pack with reviews
5. **Service pages** — Competitors have dedicated installation/visit/warranty pages
6. **Social proof** — Competitors show real reviews and ratings
7. **Rich snippets** — Competitors have stars/FAQ showing in SERP
8. **Payment options** — Competitors offer Tamara/Tabby installments

---

## 8. ROBOTS.TXT & SITEMAP

### robots.ts output:
- User-agent: * 
- Allow: /, /products/, /about, /contact, /carpets, /decor, /garden
- Disallow: /api/, /_next/
- Sitemap: {baseUrl}/sitemap.xml

### sitemap.ts includes:
- Home, /products, /carpets, /decor, /about, /contact, /garden
- All /products/{id} from productsDetails
- Does NOT include /curtains, /kitchens (redirect-only — correct)

### Live site issue:
- robots.txt was reported as empty on live site in earlier analysis — needs verification

---

## 9. NEXT.CONFIG.TS

- **Images:** WebP + AVIF, responsive deviceSizes/imageSizes
- **Turbopack:** resolveAlias for `canvas` → `./empty-module.js` (empty-module.js may not exist in repo!)
- **Redirects:** 301 from host `elamoudifurniture.com` → `https://www.elamoudifurniture.com/:path*`
- **Headers:** X-Content-Type-Options: nosniff, X-Frame-Options: DENY, Referrer-Policy: origin-when-cross-origin
- **No:** trailing slash rules, noindex headers, Link headers for canonical

---

## 10. NAVIGATION STRUCTURE

From `src/constants/navigation.ts`:
- Links: `/`, `/products/mokite` (labeled "المتجر"), `/garden`, `/contact`, `/about`
- **Note:** Main nav links to `/products/mokite` (a specific product) instead of `/products` — fewer links to the catalog page from main navigation

---

## 11. PRODUCT DATA STRUCTURE

From `src/data/products.ts`, each product has:
- `id` (URL slug)
- `title` (long SEO-style titles with pipes and keywords)
- `description` (short)
- `detailedDescription` (long-form content — paragraphs in template literals)
- `metaDescription`
- `keywords[]`
- `images[]` (paths to product images)
- `price` (optional — some products have it, some don't)
- `features[]`
- `availableColors[]`

Product IDs found: mokite, mosque-carpets, vinyl-roll, turky-mshager, parket, hospital-flooring, artificial-grass, water-resistant-carpet, shlal, planets, office-flooring, garden-flooring

---

## 12. ISSUES PRIORITY LIST

### CRITICAL (fix immediately):
1. Title template duplication on multiple pages
2. /products and /decor not indexed — need content enrichment + GSC request
3. NAP inconsistency (different address in contact JSON-LD vs layout JSON-LD)
4. Fake aggregateRating in ProductSchema — Google policy violation risk
5. redirect() vs permanentRedirect() for /curtains and /kitchens (307 vs 301)
6. No GA4 installed

### HIGH (fix within 2 weeks):
7. No page-specific OG metadata on carpets, products, decor pages
8. Garden page missing breadcrumbs and JSON-LD
9. WebSiteSchema missing SearchAction
10. SEOContent paragraph splitting bug (`\\n\\n` vs `\n\n`)
11. CTR is 1-2% on high-impression product pages (vinyl-roll, parket, turky-mshager)
12. Phone number inconsistency across site (two different WhatsApp numbers)

### MEDIUM (fix within 1 month):
13. No blog — missing content marketing opportunity
14. Only 4 backlinks — need backlink building strategy
15. No Google My Business optimization
16. No service pages (installation, delivery, warranty)
17. Contact page title is keyword-stuffed
18. manifest.json not linked from layout
19. About page H1 doesn't match title

### LOW (fix within 3 months):
20. Dark mode CSS loaded without dark mode support
21. Some referenced images may be missing (isconsMobile.svg, iscons.svg)
22. No video content strategy
23. No social media content strategy

---

## 13. KEYWORD OPPORTUNITIES ANALYSIS

### Cluster 1: Carpet/Mokeet (highest volume)
- موكيت (746 imp, pos 19.63) — need to reach page 1
- موكيت سجاد (206 imp, pos 12.89)
- سجاد موكيت (180 imp, pos 14.52)
- موكيت مشجر (173 imp, pos 7.46)
- موكيت تركي مشجر (102 imp, pos 5.44)
- موكيت وسجاد (101 imp, pos 7.21)
- مفروشات سجاد (99 imp, pos 14.48)
- موكيت تركي (84 imp, pos 14.14)
- **Total cluster: ~1,700+ impressions**

### Cluster 2: Vinyl/Flooring
- أرضيات فينيل رول (171 imp, pos 2.5) — GREAT position
- فينيل رول (49 imp, pos 6.53)
- فينيل (44 imp, pos 16.98)
- رول فينيل (42 imp, pos 7.5)
- رول ارضيات (38 imp, pos 3.37) — GREAT position
- فينيل رول ارضيات (35 imp, pos 5.71)
- ارضيات فينيل رول (21 imp, pos 2.1) — TOP position
- **Total cluster: ~400+ impressions**

### Cluster 3: Parquet
- ارضيات خشب (149 imp, pos 67.92) — very low, needs work
- باركيه خشب طبيعي (17 imp, pos 13.53)
- أرضيات باركيه خشب طبيعي (12 imp, pos 6.67)
- **Total cluster: ~200+ impressions**

### Cluster 4: Location-based
- موكيت الرياض (76 imp, pos 11.93)
- سجاد الرياض (44 imp, pos 13.66)
- مفروشات طريق الملك سلمان (33 imp, pos 5.33)
- محلات موكيت في الرياض (33 imp, pos 10.27)
- مفروشات الرياض (27 imp, pos 27.52)
- **Total cluster: ~200+ impressions**

### Cluster 5: Mosque/Religious
- موكيت مساجد (96 imp, pos 10.71)
- موكيت مسجد (25 imp, pos 9.16)
- موكيت للمساجد (17 imp, pos 9.29)
- **Total cluster: ~140+ impressions**

### Cluster 6: Garden/Landscaping
- تنسيق حدائق (36 imp, pos 139) — terrible position
- شلالات ونوافير (17 imp, pos 33.65)
- **Total cluster: ~50+ impressions, needs dedicated content**

---

## 14. CONTENT STRATEGY RECOMMENDATIONS

### Blog Article Priority Matrix

| # | Article Title (Arabic) | Target Keywords | Estimated Impressions | Priority |
|---|----------------------|----------------|----------------------|----------|
| 1 | أفضل أنواع الموكيت: دليلك الشامل | موكيت، أنواع الموكيت، موكيت تركي | ~1,100 | Critical |
| 2 | أرضيات فينيل رول: كل ما تحتاج معرفته | فينيل رول، أرضيات فينيل | ~400 | Critical |
| 3 | باركيه ضد الماء للمطابخ والحمامات | باركيه ضد الماء، باركيه خشب | ~200 | High |
| 4 | موكيت مساجد: دليل الاختيار | موكيت مساجد، سجاد مساجد | ~150 | High |
| 5 | أسعار الموكيت في الرياض 2026 | اسعار الموكيت، موكيت الرياض | ~150 | High |
| 6 | الباركيه الطبيعي vs الصناعي | باركيه خشب طبيعي، أرضيات خشبية | ~170 | High |
| 7 | دليل تنسيق الحدائق المنزلية | تنسيق حدائق، عشب صناعي | ~65 | Medium |
| 8 | موكيت المكاتب: دليل الاختيار | موكيت مكاتب، أرضيات مكتبية | ~28 | Medium |
| 9 | أرضيات المستشفيات | أرضية مستشفيات، فينيل طبي | ~40 | Medium |
| 10 | تركيب الموكيت خطوة بخطوة | تركيب موكيت، فرش موكيت | ~30 | Medium |

---

## 15. REVIEW SNIPPETS STATUS

From GSC data, 4 product pages have valid review snippets:
1. /products/shlal (شلالات ونوافير)
2. /products/artificial-grass (العشب الصناعي)
3. /products/water-resistant-carpet (باركيه ضد الماء)
4. /products/planets (نباتات منسقة)

**WARNING:** These appear to be based on fake/hardcoded aggregateRating data in the ProductSchema. The review snippet count dropped from 13 to 4 recently — Google may be cracking down on this.

---

## 16. MANIFEST.JSON

Located at `public/manifest.json`:
- Arabic name and short_name
- RTL direction
- Theme colors set
- **NOT linked** from layout.tsx (no `<link rel="manifest">`)
- References `/home/Heroimage.png` which may not exist

---

## 17. SECURITY & MANUAL ACTIONS
- No manual actions in GSC
- No security issues in GSC
- HTTPS is valid on all pages
- Security headers set in next.config.ts
