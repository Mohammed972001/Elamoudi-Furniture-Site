# Feature Specification: Phase 1 — Critical Technical SEO Fixes

**Feature Branch**: `001-phase1-technical-fixes`
**Created**: 2026-04-27
**Status**: Draft (pending `/speckit.plan`)
**Input**: User description: "Apply Phase 1 of `SEO-PLAN-EN.md` — the 10 critical technical fixes documented in `SEO-SPEC-TECHNICAL.md`."
**Constitution version applied**: 1.0.0

> ⚠ **Authoring boundary.** Produced by the Planning Agent. Consumed by a
> separate Implementation Agent that has **no access to the conversation
> that produced this spec**. Every requirement, file path, and acceptance
> check below is self-contained.

---

## 1. Evidence Base *(Constitution Principle II)*

### Google Search Console signals (last 90 days, audit dated 2026-04-27)

| Signal | Number | Source |
|---|---|---|
| Total clicks | ~466 | `SEO-KNOWLEDGE-BASE.md §4.1` |
| Total impressions | ~12,864 | `SEO-KNOWLEDGE-BASE.md §4.1` |
| Avg CTR | 3.6% (industry benchmark 5–10%) | `SEO-KNOWLEDGE-BASE.md §4.1` |
| Avg position | 10.9 (start of page 2) | `SEO-KNOWLEDGE-BASE.md §4.1` |
| Indexed / Not indexed | 18 / 11 | `SEO-KNOWLEDGE-BASE.md §4.7` |
| `/products` status | "Discovered – currently not indexed" | `SEO-KNOWLEDGE-BASE.md §4.8` |
| `/decor` status | "Discovered – currently not indexed" | `SEO-KNOWLEDGE-BASE.md §4.8` |
| Review snippet items trend | Dropped 13 → 4 between Apr 15-25 | `SEO-KNOWLEDGE-BASE.md §4.11` |
| Mobile share of clicks | 90% | `SEO-KNOWLEDGE-BASE.md §4.5` |
| Saudi share of clicks | 89% | `SEO-KNOWLEDGE-BASE.md §4.4` |

### Per-page evidence used in this feature

| Page | Imp / CTR / Position | Issue cited |
|---|---|---|
| `/` | 7,255 / 4.8% / 10.79 | Owns global JSON-LD, GA4 not installed |
| `/carpets` | 1,128 / 5.59% / 7.19 | Title-template duplication |
| `/products` | (not indexed) | Title duplication + thin content |
| `/decor` | (not indexed) | Title duplication + thin content |
| `/products/parket` | 831 / 0.84% / 22.26 | Long-form `detailedDescription` not rendering due to regex bug |
| `/garden` | 270 / 0.37% / 27.9 | Missing breadcrumbs, missing OG image, two phone numbers |
| `/contact` | 567 / 3.88% / 8.78 | Wrong `streetAddress` in JSON-LD; uses 2nd phone number |
| `/curtains` | 15 / 0% / 25.73 | 307 (not 301) redirect — link equity not consolidated |
| `/kitchens` | 16 / 0% / 5.81 | Same |

### Competitor signal

| Competitor | Finding | Source |
|---|---|---|
| `alsourayia.com` (السريّع) | Indexes >50 pages, in Local Pack with rating, has GA4 + service pages | `SEO-KNOWLEDGE-BASE.md §7.2` |
| `kaffary.com`, `mafrushat-alriyad.com` | Both rank top-3 for "موكيت الرياض"; we rank 11.93 | `SEO-KNOWLEDGE-BASE.md §7.1` |

### Why this feature, why now

Phase 1 closes the **technical correctness gap** that suppresses every
later content/CTR improvement. Without title-template fixes, `/products`
indexing recovery, NAP consistency, and the `aggregateRating` policy
guard, the impact of Phase 2 (CTR rewrites) and Phase 3 (blog) is
substantially blunted because Google either deduplicates our snippets,
keeps two pages out of the index, suppresses Local-Pack visibility, or
penalizes structured-data fabrication.

---

## 2. User Scenarios & Testing

> The "user" varies per story — sometimes a SERP user, sometimes a Riyadh
> caller, sometimes Googlebot. This is intentional and matches the
> Constitution's Saudi-targeted, evidence-driven framing.

---

### User Story 1 — NAP unification (Single Source of Truth) (Priority: P1) 🎯 MVP-foundational

A Riyadh customer who finds the site through Google sees the **same**
address (`حي العزيزية، شارع عبدالله بن صالح`), the **same** WhatsApp
number (`+966 55 835 2924`), and the **same** opening hours **on every
page** (homepage, `/contact`, `/garden`, footer) and in **every JSON-LD
schema** (Organization, LocalBusiness, ContactPage). The deprecated
phone number `+966 56 774 6257` no longer appears anywhere on the site.

**Why this priority**: Constitution Principle IV — NAP inconsistency is
one of Google's strongest negative ranking signals for local SEO, and
the audit found two different addresses + two different WhatsApp
numbers across the codebase (`SEO-KNOWLEDGE-BASE.md §5.9`,
`§6 issue 3`). This is also the foundational story because every other
story (US-6 OG metadata, US-7 GA4, US-8 breadcrumbs) imports from the
new constants module.

**Independent Test**: a single grep returns zero hits outside the
constants module, AND Rich Results Test on `/` and `/contact` returns
identical `LocalBusiness.streetAddress` and `LocalBusiness.telephone`
values.

**Acceptance Scenarios**:

1. **Given** a fresh checkout of the branch, **When** running
   `grep -rn "966558352924\|966567746257\|طريق الملك فهد\|عبدالله بن صالح" src/ --include="*.tsx" --include="*.ts" | grep -v "src/constants/business.ts"`,
   **Then** the command produces **zero lines of output**.
2. **Given** the deployed branch, **When** running Rich Results Test
   on `https://www.elamoudifurniture.com/` and on `/contact`,
   **Then** both schemas report identical `streetAddress` and
   `telephone` values matching `BUSINESS.address.streetAddress` and
   `BUSINESS.phone.primary`.
3. **Given** the deployed branch, **When** any user clicks the WhatsApp
   CTA on the contact page footer or the Garden page CTA section,
   **Then** the link target is `https://wa.me/966558352924?text=...`
   (NOT `wa.me/966567746257`).

---

### User Story 2 — Title-template duplication eliminated (Priority: P1)

A user searching Google for "تشكيلة السجاد" sees a SERP title that
includes `العمودي للمفروشات` exactly **once** for every page, instead of
twice. This applies to `/carpets`, `/products`, `/decor`, `/garden`,
`/contact`, `/about`, and every product detail page.

**Why this priority**: titles are the strongest on-page CTR lever; the
duplication wastes pixel budget, dilutes the primary keyword (which
Google weighs by leftmost token), and signals low quality. Affects 18+
indexable pages including the highest-CTR category page (`/carpets` —
5.59%).

**Independent Test**: curl every public route, extract the
`<title>` tag, confirm it contains `العمودي للمفروشات` exactly once.

**Acceptance Scenarios**:

1. **Given** the deployed build, **When** running
   `curl -s {URL} | grep -oE '<title>[^<]+</title>'` for each of the
   routes listed in §3 FR-002 (table column "Path"), **Then** the
   substring `العمودي للمفروشات` appears **exactly once** in each
   response and the visible character count of the title is ≤ 60
   characters where stated.
2. **Given** product detail page `/products/turky-mshager` whose
   `product.title` in the data layer contains `| العمودي للمفروشات`,
   **When** the page is rendered, **Then** the rendered title **still**
   contains the brand exactly once (i.e., the brand suffix is stripped
   from the product title before the layout template re-appends it).

---

### User Story 3 — Permanent (308) redirects for `/curtains` and `/kitchens` (Priority: P1)

Googlebot and link-equity-tracking tools recognize `/curtains` and
`/kitchens` as **permanently** moved (HTTP 308 or 301), not temporary
(307). Backlink and ranking signals consolidate to `/decor` and
`/products` respectively.

**Why this priority**: cheap to fix, immediately preserves any external
link equity pointing at the legacy URLs, and removes a lingering item
from `SEO-KNOWLEDGE-BASE.md §12 CRITICAL`.

**Independent Test**: a `curl -sI` on each redirected URL returns 308
(or 301 if implemented at the host level).

**Acceptance Scenarios**:

1. **Given** the deployed build, **When** running
   `curl -sI https://www.elamoudifurniture.com/curtains`,
   **Then** the first response line is `HTTP/2 308` and the
   `location:` header is `/decor`.
2. **Given** the deployed build, **When** running
   `curl -sI https://www.elamoudifurniture.com/kitchens`,
   **Then** the first response line is `HTTP/2 308` and the
   `location:` header is `/products`.
3. The previously emitted 307 status is no longer observed.

---

### User Story 4 — `/products` and `/decor` become eligible for indexing (Priority: P2)

Googlebot, when next crawling `/products` and `/decor`, finds **enough
unique, keyword-relevant Arabic content** (≥ 400 visible words plus an
`FAQPage` JSON-LD) to move both pages from "Discovered – currently not
indexed" to "Submitted and indexed" within 14 days.

**Why this priority**: thin content is the documented reason these two
URLs are not indexed (`§4.8`). Indexing recovery unlocks ranking for
the keyword cluster currently captured only by the homepage.

**Independent Test**: each page renders ≥ 400 words plus a valid
`FAQPage` schema; after deploy the human operator submits both URLs to
GSC URL Inspection → Request Indexing; within 14 days status changes.

**Acceptance Scenarios**:

1. **Given** the deployed build, **When** running
   `curl -s https://www.elamoudifurniture.com/products | wc -w`,
   **Then** the count exceeds **800** words (was ~150).
2. **Given** the deployed build, **When** running Rich Results Test
   on `/products` and `/decor`, **Then** both pages report a valid
   `FAQPage` with **5 entities**, plus a valid `BreadcrumbList`.
3. **Given** the deployed build, **When** GSC URL Inspection is run on
   each page within 14 days post-merge, **Then** status reads
   "URL is on Google".

---

### User Story 5 — Long-form product copy renders correctly (Priority: P2)

A user landing on `/products/parket` (831 imp / pos 22.26 — currently
worst CTR among top-impression pages) sees the long-form
`detailedDescription` rendered as **multiple paragraphs and headings**
instead of a single unbroken text block.

**Why this priority**: the bug in `src/components/seo/SEOContent.tsx`
line 14 (`text.split('\\n\\n')` matches the literal 4-character string,
not real newlines — `SEO-KNOWLEDGE-BASE.md §12 issue 10`) silently
breaks every product page that uses the component. The
`detailedDescription` data is good; we are throwing it away in the
renderer.

**Independent Test**: inspect the DOM of `/products/parket` — there
must be ≥ 3 `<p>` elements inside `.seo-content-wrapper`, and at least
one rendered `<h2>` and `<h3>` where `**bold**` and `1.` markers exist
in the source.

**Acceptance Scenarios**:

1. **Given** the deployed build, **When** loading `/products/parket`
   and inspecting DOM, **Then** `.seo-content-wrapper > p` count is
   **≥ 3** and `.seo-content-wrapper > h2` count is **≥ 1**.
2. **Given** the deployed build, **When** running
   `grep -nE '\\\\n\\\\n' src/data/products.ts` (audit), **Then** the
   command returns zero hits (no escaped newline literals remaining in
   data).

---

### User Story 6 — Page-specific OpenGraph & Twitter previews (Priority: P2)

A user who shares `https://www.elamoudifurniture.com/carpets` (or
`/products`, `/decor`, `/garden`) on WhatsApp, X, or Facebook sees a
preview that uses **the page's own** title, description, and image —
not the homepage defaults.

**Why this priority**: social shares of category URLs currently look
identical to homepage shares, killing CTR from social. Garden's OG
block already has title/description but **no `images` array** —
critical for visual platforms. (`SEO-KNOWLEDGE-BASE.md §5.7, §12
issue 7`.)

**Independent Test**: for each path, `curl -s {URL} | grep -oE
'property="og:image" content="[^"]+"'` returns the page-specific URL
(`/og/{slug}.jpg`), never `/og-image.jpg`.

**Acceptance Scenarios**:

1. **Given** the deployed build, **When** running the og:image grep
   above for `/carpets`, `/products`, `/decor`, `/garden`, **Then**
   each response contains its own `/og/{slug}.jpg` URL.
2. **Given** the deployed build, **When** pasting each URL into
   Facebook Sharing Debugger / Twitter Card Validator, **Then** the
   preview displays the page-specific title, description, and image.

> **Asset dependency**: the four images at `public/og/carpets.jpg`,
> `public/og/products.jpg`, `public/og/decor.jpg`, `public/og/garden.jpg`
> (1200×630, JPG, ≤ 200 KB each) MUST exist before merge. If brand
> assets are not ready, a temporary fallback to the existing
> `public/og-image.jpg` is acceptable **only** if logged as a
> follow-up TODO with a deadline.

---

### User Story 7 — GA4 traffic is recorded (Priority: P3)

The site owner can open Google Analytics 4 → Realtime and see live
traffic from the production site. The Google Ads tag (`AW-17506948956`)
keeps working unchanged.

**Why this priority**: existing code in `src/app/layout.tsx` (lines
120-128) already supports `NEXT_PUBLIC_GA4_ID`; the fix is
environmental. No analytics ⇒ no behavior data ⇒ no way to validate
Phase 2/3 outcomes. P3 because it does not directly change rankings,
only the team's ability to measure them.

**Independent Test**: on the deployed site, the inline `gtag` script
contains a `gtag('config', 'G-XXXXXXXXXX')` line where `G-XXXXXXXXXX`
matches the configured Measurement ID; GA4 Realtime shows ≥ 1 user
within 30 seconds of test browsing.

**Acceptance Scenarios**:

1. **Given** the deployed build with `NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX`
   set in Vercel Production env, **When** running
   `curl -s https://www.elamoudifurniture.com/ | grep -oE "gtag\('config', 'G-[A-Z0-9]+'\)"`,
   **Then** at least one match contains the configured Measurement ID.
2. **Given** the deployed build, **When** the operator visits the site
   from a different device, **Then** GA4 → Reports → Realtime shows
   ≥ 1 active user within 30 seconds.

---

### User Story 8 — Breadcrumbs on `/garden` (Priority: P3)

A user landing on `/garden` sees a visible breadcrumb (`الرئيسية ←
تنسيق الحدائق`) above the hero, and Googlebot finds a `BreadcrumbList`
JSON-LD entity for the URL.

**Why this priority**: only navigable category page without breadcrumb
schema (`SEO-KNOWLEDGE-BASE.md §5.7`). Cheap, deterministic.

**Acceptance Scenarios**:

1. **Given** the deployed build, **When** running
   `curl -s https://www.elamoudifurniture.com/garden | grep -c "BreadcrumbList"`,
   **Then** the result is `1`.
2. **Given** the deployed build, **When** running Rich Results Test on
   `/garden`, **Then** a `BreadcrumbList` validates with **2 items**.

---

### User Story 9 — `ProductSchema` policy guard (Priority: P3)

The `ProductSchema` component **never** emits a fabricated
`aggregateRating`. The only way `aggregateRating` appears in rendered
JSON-LD is when a real value is passed via the new optional prop. The
prop's docblock cites the Constitution and the GSC review-snippet drop
incident.

**Why this priority**: review-snippet count dropped from 13 → 4 between
April 15-25 — consistent with Google enforcement against fabricated
ratings. The current file does not contain a fake rating (already
removed), but the **guard** ensures it cannot be reintroduced
silently. This is the cheapest insurance policy in Phase 1.

**Acceptance Scenarios**:

1. **Given** the deployed build, **When** running
   `curl -s https://www.elamoudifurniture.com/products/parket | grep -o '"aggregateRating"' | wc -l`,
   **Then** the result is `0`.
2. **Given** the changed `src/components/seo/JsonLd.tsx`, **When**
   reading the new `aggregateRating?` prop docblock,
   **Then** it cites Constitution Principle III and instructs callers
   to populate only from a verified review pipeline.

---

### User Story 10 — Honest `WebSite` schema with brand variants (Priority: P3)

The `WebSiteSchema` component no longer claims a feature the site does
not implement (`SearchAction` for sitelinks search box) AND it surfaces
the four documented brand variants ("مفروشات العمودي", "العمودي
للسجاد", "العمودي للمفروشات", "Al-Amoudi Furniture") so Google can
consolidate brand-name impressions.

**Why this priority**: the docblock currently lies (Constitution
violation against truthful structured data); the four variants
together account for 200+ branded impressions per `§4.2`.

**Acceptance Scenarios**:

1. **Given** the deployed build, **When** running Rich Results Test on
   `/`, **Then** the WebSite schema validates with an `alternateName`
   array containing the four documented variants and **without** a
   `potentialAction.SearchAction`.
2. **Given** the changed file, **When** reading the new docblock above
   `WebSiteSchema`, **Then** it explicitly explains why
   `SearchAction` is **not** present.

---

### Edge Cases

- A future product is added whose `title` does not contain a brand
  suffix → the regex strip in US-2 must be a **no-op** (must not
  destroy data).
- `NEXT_PUBLIC_SITE_URL` is unset locally → all components and metadata
  must fall back to `https://www.elamoudifurniture.com`.
- `NEXT_PUBLIC_GA4_ID` is unset (preview deploys, local) → the `gtag`
  block must render the existing comment fallback (no JavaScript
  error).
- Google still serves cached old titles for 7-14 days post-deploy →
  expected; track via GSC Performance for "average position" stability,
  not per-day fluctuation.
- A grep for `عبدالله بن صالح` may legitimately appear in the audit
  for `src/constants/business.ts` (the new file). The audit script in
  US-1 specifically excludes that file.

---

## 3. Functional Requirements

### Cross-cutting

- **FR-001** *(Constitution I)*: Every user-facing string introduced or
  modified in this feature MUST be in Arabic and consistent with
  `locale: ar_SA`.
- **FR-002** *(Constitution IV)*: All NAP values (phone, address,
  hours, geo, social) consumed in this feature MUST flow from
  `src/constants/business.ts`. No new hardcoded NAP allowed.
- **FR-003** *(Constitution VII)*: Any structured data emitted by code
  changed in this feature MUST validate in Google's Rich Results Test
  with **0 errors and 0 warnings** for the schema types we claim.
- **FR-004** *(Constitution V)*: Each task in `tasks.md` MUST carry an
  acceptance command and an expected output.

### US-1 (NAP unification)

- **FR-101**: Create `src/constants/business.ts` exporting a `BUSINESS`
  const that contains `name`, `legalName`, `description`, `url`,
  `logo`, `phone.{primary, waMessage, whatsappLink, telLink,
  displayIntl, displayLocal}`, `address.{streetAddress, addressLocality,
  addressRegion, postalCode, addressCountry, addressCountryName, full}`,
  `geo.{latitude, longitude, googleMapsUrl}`, `hours.{schemaOrg, display}`,
  `social.{tiktok, instagram, …}`, `areaServed`, `priceRange`. The
  full TypeScript shape is documented in
  `SEO-SPEC-TECHNICAL.md §5.1`.
- **FR-102**: `src/app/layout.tsx` MUST import `BUSINESS` and replace
  every literal NAP/contact value (currently lines 132–169) with
  references to it. (Before/after: `SEO-SPEC-TECHNICAL.md §5.2`.)
- **FR-103**: `src/app/contact/page.tsx` MUST import `BUSINESS`,
  rebuild the inline `jsonLd` const using it (before/after:
  `SEO-SPEC-TECHNICAL.md §5.3`), and replace the WhatsApp link on
  current line 291 (`wa.me/966567746257`) with
  `BUSINESS.phone.whatsappLink`.
- **FR-104**: `src/app/garden/GardenClient.tsx` MUST import `BUSINESS`
  and replace lines 107, 113, **195, 201** with `BUSINESS.phone.telLink`
  / `BUSINESS.phone.whatsappLink`. The deprecated `+966567746257`
  number MUST NOT remain anywhere in the file.
- **FR-105**: `src/components/ui/Footer.tsx` and
  `src/components/navbar/MobileContactIcons.tsx` MUST be audited
  (`grep` per FR-100 audit script) and any hardcoded NAP replaced with
  `BUSINESS` references.
- **FR-106**: After all changes, the audit script
  `grep -rn "966558352924\|966567746257\|طريق الملك فهد" src/ --include="*.tsx" --include="*.ts" | grep -v "src/constants/business.ts"`
  MUST return zero lines.

### US-2 (Title duplication)

- **FR-201**: `src/app/layout.tsx` line 26 (`title.template`) MUST
  remain `"%s | العمودي للمفروشات"`. Implementations MUST NOT remove
  or reword the template.
- **FR-202**: For each route below, the page's `metadata.title` MUST be
  changed to **omit** any trailing `| العمودي للمفروشات` so the layout
  template appends the brand exactly once. Final rendered titles MUST
  be ≤ 60 visible Arabic characters.

  | Path | New `metadata.title` value |
  |---|---|
  | `/carpets` | `موكيت وسجاد الرياض — تشكيلة فاخرة بتركيب مجاني` |
  | `/products` | `جميع المنتجات — موكيت وأرضيات وباركيه وفينيل` |
  | `/decor` | `الديكور والإكسسوارات المنزلية — ستائر ومفروشات` |
  | `/garden` | `تنسيق حدائق الرياض — عشب صناعي وشلالات ونوافير` |
  | `/contact` | `اتصل بنا — موكيت وسجاد الرياض` |
  | `/about` | `من نحن — خبرتنا في موكيت وسجاد الرياض` |

  *Authoritative descriptions are in `SEO-SPEC-CTR.md §1.1–1.7` (Phase 2). For Phase 1 the description fields MAY remain as currently written; only the title is in scope here.*

- **FR-203**: `src/app/products/[id]/page.tsx` lines 37 and 44
  (currently `title: \`${product.title} | العمودي للمفروشات\``) MUST
  be replaced with logic that strips any trailing
  `| العمودي للمفروشات` suffix from `product.title`, then uses the
  cleaned title for the metadata `title`, and uses `${cleanTitle} |
  العمودي للمفروشات` for the **OG title** only (since OG title is not
  templated). Exact regex: `/\s*\|\s*العمودي للمفروشات.*$/`.
  (Before/after: `SEO-SPEC-TECHNICAL.md §1.4`.)

### US-3 (308 redirects)

- **FR-301**: `src/app/curtains/page.tsx` MUST replace the
  `redirect('/decor')` call with `permanentRedirect('/decor')` and
  switch the import accordingly. Final file content is documented in
  `SEO-SPEC-TECHNICAL.md §2.1`.
- **FR-302**: `src/app/kitchens/page.tsx` MUST replace the
  `redirect('/products')` call with `permanentRedirect('/products')`.
  (`SEO-SPEC-TECHNICAL.md §2.2`.)

### US-4 (`/products` and `/decor` content)

- **FR-401**: `src/app/products/page.tsx` MUST render an additional
  `<SEOContent>` block with the Arabic copy in
  `SEO-SPEC-TECHNICAL.md §3.1` (≥ 400 words, three sections with `**…**`
  H2 markers) and a `<FAQ>` block with **5 questions** as listed there.
- **FR-402**: `src/app/decor/page.tsx` MUST render the equivalent block
  with the copy and FAQ in `SEO-SPEC-TECHNICAL.md §3.2`.
- **FR-403**: After deploy, the human operator MUST submit `/products`
  and `/decor` to GSC URL Inspection → Request Indexing. The PR
  description MUST include a checkbox for this manual step.

### US-5 (SEOContent regex bug)

- **FR-501**: `src/components/seo/SEOContent.tsx` `formatContent`
  function (currently lines 11-57) MUST be replaced with the corrected
  version in `SEO-SPEC-TECHNICAL.md §9.1`. Every `\\` becomes `\` so
  the splitter matches real newline characters, not literal escape
  sequences.
- **FR-502**: `src/data/products.ts` MUST be audited
  (`grep -nE '\\\\n\\\\n' src/data/products.ts` returns zero lines).
  Any product `detailedDescription` containing the literal escape
  sequence `\\n\\n` MUST have those replaced with two real newline
  characters inside the template literal.

### US-6 (Page-specific OG / Twitter)

- **FR-601**: `src/app/carpets/page.tsx` MUST add an `openGraph`
  object (with `title`, `description`, `type: "website"`, `url`,
  `locale: "ar_SA"`, `siteName`, and a single `images` entry pointing
  at `/og/carpets.jpg`, 1200×630) and a matching `twitter` block. Full
  values: `SEO-SPEC-TECHNICAL.md §4.1`.
- **FR-602**: `src/app/products/page.tsx` — same, image
  `/og/products.jpg`. Values: `§4.2`.
- **FR-603**: `src/app/decor/page.tsx` — same, image
  `/og/decor.jpg`. Values: `§4.3`.
- **FR-604**: `src/app/garden/page.tsx` — replace existing OG block
  (currently lines 11-22, missing `images` and `url`) with the
  populated version in `§4.4`.
- **FR-605**: Each of the four images
  (`public/og/{carpets,products,decor,garden}.jpg`) MUST exist as a
  binary asset in the repo before merge. **Note for Implementation
  Agent**: do NOT create placeholder PNG files; surface a
  blocker if assets are missing and let the Planning Agent decide
  whether to ship with `/og-image.jpg` fallback (and a follow-up TODO).

### US-7 (GA4 install)

- **FR-701**: `src/app/layout.tsx` requires no code change for this
  story (existing template at lines 120-128 already supports
  `NEXT_PUBLIC_GA4_ID`). The change is purely environmental.
- **FR-702**: The Vercel project MUST set
  `NEXT_PUBLIC_GA4_ID` = `G-XXXXXXXXXX` (real Measurement ID,
  obtained via the steps in `SEO-SPEC-TECHNICAL.md §6.1`) for
  Production, Preview, and Development.
- **FR-703**: A redeploy MUST be triggered after the env var is set
  (env-var changes do not auto-redeploy).
- **FR-704**: The PR description MUST list the masked Measurement ID
  (e.g., `G-XXXX****`) so reviewers can confirm without exposing it
  publicly.

### US-8 (Garden breadcrumbs)

- **FR-801**: `src/app/garden/GardenClient.tsx` MUST import
  `Breadcrumbs` from `@/components/seo/Breadcrumbs` and render it
  near the top of the JSX with items
  `[ { name: 'الرئيسية', href: '/' }, { name: 'تنسيق الحدائق' } ]`.
  Insertion point and exact code: `SEO-SPEC-TECHNICAL.md §7.1`.

### US-9 (ProductSchema guard)

- **FR-901**: `src/components/seo/JsonLd.tsx` `ProductSchemaProps`
  interface MUST add an optional `aggregateRating?` field with the
  shape `{ ratingValue: number; reviewCount: number; bestRating?: number; worstRating?: number; }`,
  documented with the docblock in `SEO-SPEC-TECHNICAL.md §10.2` that
  cites Constitution Principle III and the April 15-25 review-snippet
  drop incident.
- **FR-902**: The `ProductSchema` function body MUST conditionally
  emit `aggregateRating` only when the prop is supplied
  (`aggregateRating ? { ... } : undefined`). `JSON.stringify` drops
  `undefined` keys, so when omitted, no field appears in the rendered
  JSON-LD.
- **FR-903**: A repo-wide audit
  `grep -rn "aggregateRating" src/ --include="*.tsx" --include="*.ts"`
  MUST return zero hardcoded values; the only matches must be the
  prop declaration, the docblock, the conditional render in
  `JsonLd.tsx`, and (if any) callers that explicitly pass
  `aggregateRating={undefined}`.

### US-10 (WebSite schema)

- **FR-1001**: `src/components/seo/JsonLd.tsx` `WebSiteSchema`
  function (currently lines 268-294) MUST be replaced with the version
  in `SEO-SPEC-TECHNICAL.md §8.2`: docblock truthful (no
  `SearchAction`), `alternateName` array containing
  `["مفروشات العمودي", "العمودي للسجاد", "Al-Amoudi Furniture"]`
  (3 variants — the canonical name `"العمودي للمفروشات"` already lives
  in the `name` field).

### Key entities introduced

- **`BUSINESS`** *(read-only const in `src/constants/business.ts`)* —
  the canonical NAP record. Every other module that displays NAP MUST
  import it. Schema in FR-101.

---

## 4. Success Criteria

### Measurable outcomes (90 days post-merge unless stated)

- **SC-001**: GSC reports `/products` and `/decor` status as "URL is on
  Google" within **14 days** of merge.
- **SC-002**: GSC reports site-wide CTR ≥ **4.5%** within 30 days
  (baseline 3.6%) — this is half the Phase-2 target and serves as a
  regression-proof anchor for Phase 1.
- **SC-003**: GSC reports zero pages with the "duplicate title"
  enhancement warning within 30 days.
- **SC-004**: Rich Results Test on `/`, `/contact`, `/products/parket`,
  `/garden` reports **0 errors / 0 warnings** at merge.
- **SC-005**: Lighthouse mobile SEO ≥ **95** on `/`, `/carpets`,
  `/products`, `/decor`, `/garden`, `/contact`,
  `/products/parket` immediately after merge. CWV (LCP, INP, CLS) MUST
  NOT regress vs. the pre-merge deploy.
- **SC-006**: GA4 → Realtime reports ≥ **1 active user** during a smoke
  test within 30 seconds of an operator visiting the deployed site.
- **SC-007**: Repo-wide audit script for NAP returns zero hits outside
  `src/constants/business.ts` (Constitution IV).
- **SC-008**: `aggregateRating` audit returns zero hardcoded values
  (Constitution III).

---

## 5. Acceptance Criteria

| ID | Linked FR/SC | Verification command or method | Expected output |
|---|---|---|---|
| AC-001 | FR-106, SC-007 | `grep -rn "966558352924\|966567746257\|طريق الملك فهد" src/ --include="*.tsx" --include="*.ts" \| grep -v "src/constants/business.ts"` | Empty (zero lines) |
| AC-002 | FR-201–FR-203, SC-003 | For each path in FR-202 + 5 product detail URLs: `curl -s {URL} \| grep -oE '<title>[^<]+</title>'` | Brand `العمودي للمفروشات` appears exactly once |
| AC-003 | FR-301, FR-302 | `curl -sI https://www.elamoudifurniture.com/curtains` and `…/kitchens` | First line `HTTP/2 308`; `location: /decor` and `/products` respectively |
| AC-004 | FR-401, FR-402, SC-001 | For `/products` and `/decor`: `curl -s {URL} \| wc -w` | ≥ 800 visible words each |
| AC-005 | FR-401, FR-402 | Rich Results Test on `/products` and `/decor` | Each: `BreadcrumbList` valid + `FAQPage` valid (5 entities) |
| AC-006 | FR-501, FR-502 | DOM inspection of `/products/parket` | `.seo-content-wrapper > p` ≥ 3, `.seo-content-wrapper > h2` ≥ 1; `grep -nE '\\\\n\\\\n' src/data/products.ts` returns zero |
| AC-007 | FR-601–FR-605 | For `/carpets`, `/products`, `/decor`, `/garden`: `curl -s {URL} \| grep -oE 'property="og:image" content="[^"]+"'` | Each returns `/og/{slug}.jpg`; never `/og-image.jpg` |
| AC-008 | FR-702, SC-006 | `curl -s https://www.elamoudifurniture.com/ \| grep -oE "gtag\('config', 'G-[A-Z0-9]+'\)"` AND GA4 → Realtime | ≥ 1 match with the configured ID; ≥ 1 active user |
| AC-009 | FR-801 | `curl -s https://www.elamoudifurniture.com/garden \| grep -c "BreadcrumbList"` | `1` |
| AC-010 | FR-901–FR-903, SC-008 | `curl -s https://www.elamoudifurniture.com/products/parket \| grep -o '"aggregateRating"' \| wc -l` AND `grep -rn "aggregateRating" src/ --include="*.tsx" --include="*.ts"` | `0` AND only the prop/docblock/conditional in `JsonLd.tsx` |
| AC-011 | FR-1001 | Rich Results Test on `/` | `WebSite` validates with `alternateName` array; **no** `potentialAction` |
| AC-012 | SC-005 | Lighthouse mobile run on each touched page | SEO ≥ 95 on each; CWV no regression vs. pre-merge baseline |
| AC-013 | SC-004, FR-003 | Rich Results Test on `/`, `/contact`, `/products/parket`, `/garden` | 0 errors, 0 warnings on each |
| AC-014 | All | `npm run lint && npm run build` | Both exit 0 |

---

## 6. Constitution Compliance

| # | Principle | Compliant? | Notes |
|---|---|---|---|
| I | Arabic-First, Saudi-Targeted | Yes | Every new string in §3 is Arabic; locale unchanged |
| II | Data-Driven Decisions | Yes | §1 cites GSC numbers per page; competitors named |
| III | No Black-Hat / No Fake Signals | Yes | US-9 + US-10 actively REMOVE truthfulness defects |
| IV | NAP Single Source of Truth | Yes | US-1 is the foundational story; AC-001 enforces |
| V | Verification Before Completion | Yes | §5 lists 14 acceptance commands |
| VI | Mobile-First, Performance-Aware | Yes | AC-012 enforces Lighthouse ≥ 95 on each touched page |
| VII | Structured Data Integrity | Yes | AC-005, AC-009, AC-011, AC-013 enforce |

No violations. §8 Complexity Tracking left empty.

---

## 7. Assumptions

- **A-1**: The Vercel project has permission to add a Production env
  var; the human operator will create the GA4 property before US-7
  goes live.
- **A-2**: The four OG images in US-6 are produced by the design team
  before merge. If not, ship with the `/og-image.jpg` fallback and a
  TODO; do **not** ship with placeholder bitmaps.
- **A-3**: Google's recrawl SLA for `/products` and `/decor` is up to
  14 days from "Request Indexing". SC-001 reflects that.
- **A-4**: No real customer reviews exist yet, so US-9 only adds the
  guard; population of `aggregateRating` is out of scope (handled by a
  later feature derived from `SEO-SPEC-OFFPAGE.md §5`).
- **A-5**: The audit found `src/components/seo/JsonLd.tsx`
  ProductSchema currently does **not** contain a hardcoded
  `aggregateRating`. US-9 still applies to add the typed prop and
  docblock; if a fake rating reappears between spec authoring and
  implementation, US-9 also removes it.

---

## 8. Out of Scope

- Phase 2 CTR rewrites of meta descriptions (handled in feature 002).
- Phase 2 FAQ blocks on product detail pages and `/carpets`
  (feature 002). US-4 only adds FAQ to `/products` and `/decor` because
  those are needed for indexing recovery.
- Blog infrastructure (feature 003 — `/speckit.specify` later).
- Service / projects / locations pages (feature 004).
- Off-page SEO (GBP, citations, backlinks, real reviews — manual track,
  not a code feature).
- Implementing a real `/search?q=` route + `SearchAction` schema —
  US-10 only removes the dishonest claim; building search is a
  separate feature.

---

## 9. Implementation Handoff Notes

> **Read order for the Implementation Agent**, in this order:
> 1. `specs/specs/001-phase1-technical-fixes/quickstart.md` (produced by `/speckit.plan`)
> 2. This file (`spec.md`)
> 3. `specs/specs/001-phase1-technical-fixes/plan.md` (produced by `/speckit.plan`)
> 4. `specs/specs/001-phase1-technical-fixes/tasks.md` (produced by `/speckit.tasks`)
> 5. The relevant `SEO-SPEC-TECHNICAL.md` sections for before/after code.
> 6. `.specify/memory/constitution.md` for principle definitions.

### Reference seed-spec sections (containing exact before/after code)

| Story | Reference |
|---|---|
| US-1 NAP | `SEO-SPEC-TECHNICAL.md §5.1–5.5` |
| US-2 Title duplication | `§1.1–1.7` |
| US-3 Redirects | `§2.1–2.2` |
| US-4 Content + FAQ | `§3.1–3.2` |
| US-5 SEOContent regex | `§9.1–9.2` |
| US-6 OG / Twitter | `§4.1–4.4` |
| US-7 GA4 | `§6.1–6.4` |
| US-8 Breadcrumbs | `§7.1` |
| US-9 ProductSchema guard | `§10.1–10.3` |
| US-10 WebSite schema | `§8.2` |

### Source-of-truth files (READ-ONLY context for the agent)

- `src/app/layout.tsx`
- `src/app/{carpets,products,decor,garden,contact,about,curtains,kitchens}/page.tsx`
- `src/app/products/[id]/page.tsx`
- `src/app/garden/GardenClient.tsx`
- `src/components/seo/{JsonLd,FAQ,Breadcrumbs,SEOContent}.tsx`
- `src/data/products.ts`
- `src/components/ui/Footer.tsx`
- `src/components/navbar/MobileContactIcons.tsx`

### Files to CREATE

- `src/constants/business.ts` (FR-101)
- `public/og/carpets.jpg`, `public/og/products.jpg`,
  `public/og/decor.jpg`, `public/og/garden.jpg` (FR-605)

### Files to MODIFY

`src/app/layout.tsx`, `src/app/carpets/page.tsx`, `src/app/products/page.tsx`,
`src/app/decor/page.tsx`, `src/app/garden/page.tsx`,
`src/app/garden/GardenClient.tsx`, `src/app/contact/page.tsx`,
`src/app/about/page.tsx`, `src/app/curtains/page.tsx`,
`src/app/kitchens/page.tsx`, `src/app/products/[id]/page.tsx`,
`src/components/seo/JsonLd.tsx`, `src/components/seo/SEOContent.tsx`,
`src/components/ui/Footer.tsx`,
`src/components/navbar/MobileContactIcons.tsx`,
`src/data/products.ts` (audit only; no value changes).

### Forbidden actions (the Implementation Agent MUST NOT)

- Modify the existing `title.template` in `src/app/layout.tsx`.
- Change product `metaDescription` text or product titles' Arabic
  content (Phase 2 territory).
- Add or fabricate any review data, rating value, or review count.
- Use `redirect()` for permanent moves (must use `permanentRedirect()`).
- Introduce new npm packages.
- Remove the layout's existing `OrganizationSchema` /
  `LocalBusinessSchema` invocations — only their props change.
- Touch any file under `src/` not listed in §9 above without
  surfacing as a `[NEEDS CLARIFICATION]` back to the Planning Agent.
