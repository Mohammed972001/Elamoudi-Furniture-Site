# Quickstart for the Implementation Agent — Phase 1

**Feature**: `001-phase1-technical-fixes`
**Constitution version**: 1.0.0
**Audience**: a fresh, cold-start Implementation Agent that has **not**
seen the conversation that produced this feature.

> **READ THIS FILE FIRST**, then `spec.md`, then `plan.md`, then
> `tasks.md`. After that, open the relevant `SEO-SPEC-TECHNICAL.md`
> sections for the exact before/after code blocks.

---

## 1. The 30-second briefing

You are implementing **10 user stories** that fix critical SEO defects
on `elamoudifurniture.com` — an Arabic-language Next.js 16 carpet /
flooring storefront in Riyadh. The stories cover:

- Single source of truth for NAP (US-1, P1)
- Title-template duplication fix (US-2, P1)
- 308 permanent redirects (US-3, P1)
- `/products` and `/decor` content enrichment + FAQ (US-4, P2)
- SEOContent paragraph-splitting regex bug fix (US-5, P2)
- Page-specific OpenGraph + Twitter on category pages (US-6, P2)
- GA4 install (US-7, P3 — env-var only)
- Breadcrumbs on `/garden` (US-8, P3)
- ProductSchema policy guard (US-9, P3)
- WebSite schema honesty + alternateName (US-10, P3)

Total expected diff: ~16 source files modified, **1** new file
(`src/constants/business.ts`), **4** new image assets in `public/og/`.
**Zero new npm packages**, **zero refactors**, **zero API changes**.

---

## 2. The locked tech stack (do NOT reopen)

- Next.js 16 (App Router), TypeScript 5.x, React 19
- Tailwind CSS v4 via `@tailwindcss/postcss`
- Cairo font, `display: swap`
- `lang="ar"`, `dir="rtl"`, `locale: ar_SA`
- Title template owned by root layout: `"%s | العمودي للمفروشات"`
- All NAP from `src/constants/business.ts` (created by you in US-1)
- Permanent redirects: `permanentRedirect()` from `next/navigation` (308) — NEVER `redirect()`
- Hosting: Vercel
- Site URL: `https://www.elamoudifurniture.com` (canonical)
- Env vars: `NEXT_PUBLIC_SITE_URL` (default = canonical), `NEXT_PUBLIC_GA4_ID` (US-7)

---

## 3. Files you may touch

### CREATE

- `src/constants/business.ts` (FR-101, US-1) — exact source code in `SEO-SPEC-TECHNICAL.md §5.1`
- `public/og/carpets.jpg` — 1200×630 JPG ≤ 200 KB, real brand asset
- `public/og/products.jpg`
- `public/og/decor.jpg`
- `public/og/garden.jpg`

> **OG assets fallback**: if the design team has not delivered the
> images by merge time, use the existing `/og-image.jpg` URL in the
> metadata (NOT new placeholder PNGs) and leave a TODO in the PR. Do
> NOT generate placeholder bitmaps.

### MODIFY (the only files allowed)

`src/app/layout.tsx`, `src/app/carpets/page.tsx`,
`src/app/products/page.tsx`, `src/app/decor/page.tsx`,
`src/app/garden/page.tsx`, `src/app/garden/GardenClient.tsx`,
`src/app/contact/page.tsx`, `src/app/about/page.tsx`,
`src/app/curtains/page.tsx`, `src/app/kitchens/page.tsx`,
`src/app/products/[id]/page.tsx`,
`src/components/seo/JsonLd.tsx`, `src/components/seo/SEOContent.tsx`,
`src/components/ui/Footer.tsx`,
`src/components/navbar/MobileContactIcons.tsx`,
`src/data/products.ts` (audit only — replace literal `\\n\\n`
with real newlines; **do not change product values**).

### DO NOT TOUCH

Anything else under `src/` or `public/`. If you find that a task
requires touching a file outside this list, **stop** and surface
`[NEEDS CLARIFICATION]` in the PR description.

---

## 4. Forbidden actions

The following are **non-negotiable**. Violating any of them is a
constitution violation and blocks merge:

1. Modify the layout's `title.template` value.
2. Change product `metaDescription` text or product titles' Arabic
   content (Phase 2 territory — feature 002).
3. Add or fabricate any review data, rating value, or review count
   (Constitution III).
4. Use `redirect()` for permanent moves; always `permanentRedirect()`
   (Constitution stack constraint).
5. Introduce new npm packages or env vars not listed in §2.
6. Remove the layout's existing `OrganizationSchema` /
   `LocalBusinessSchema` invocations — only their props change.
7. Add `potentialAction.SearchAction` to `WebSiteSchema` (US-10
   forbids it explicitly until `/search?q=` exists).
8. Hardcode any phone number, address, or hours in any file other
   than `src/constants/business.ts`.

---

## 5. The 7 constitution principles, in 7 lines

1. **Arabic-First**: every user-facing string is Arabic, `locale: ar_SA`.
2. **Data-Driven**: every change cites GSC numbers in `spec.md §1`.
3. **No Black-Hat**: no fake aggregateRating, no SearchAction lies, no keyword stuffing.
4. **NAP Single Source of Truth**: `src/constants/business.ts` only.
5. **Verification Before Done**: every task has a runnable check; you do NOT mark a task done until its V-* check passes.
6. **Mobile-First**: Lighthouse mobile SEO ≥ 95 on every changed page.
7. **Structured Data Integrity**: every JSON-LD passes Rich Results Test with 0 errors / 0 warnings.

---

## 6. Mandatory verification commands (the V-* table)

You MUST run every command below that applies to the story you just
finished, BEFORE marking the story's checkpoint complete.

| ID | Command (run from repo root unless noted) | Expected |
|---|---|---|
| **V-LINT** | `npm run lint` | Exit 0 |
| **V-BUILD** | `npm run build` | Exit 0 |
| **V-NAP** | `grep -rn "966558352924\|966567746257\|طريق الملك فهد" src/ --include="*.tsx" --include="*.ts" \| grep -v "src/constants/business.ts"` | Empty output |
| **V-CRAWL-TITLE** (one curl per route in spec FR-202 + 5 product detail URLs) | `curl -s {URL} \| grep -oE '<title>[^<]+</title>'` | Brand `العمودي للمفروشات` exactly once |
| **V-CRAWL-REDIRECT** | `curl -sI https://www.elamoudifurniture.com/curtains` then `…/kitchens` | First line `HTTP/2 308`; `location:` matches |
| **V-CRAWL-COPY** | `curl -s {URL} \| wc -w` for `/products` and `/decor` | ≥ 800 visible words each |
| **V-DOM** | DOM inspection on `/products/parket` | `.seo-content-wrapper > p` ≥ 3, `> h2` ≥ 1 |
| **V-DATA-AUDIT** | `grep -nE '\\\\n\\\\n' src/data/products.ts` | Empty |
| **V-OG** | `curl -s {URL} \| grep -oE 'property="og:image" content="[^"]+"'` for `/carpets`, `/products`, `/decor`, `/garden` | Each returns `/og/{slug}.jpg`; never `/og-image.jpg` (or document fallback) |
| **V-OG-PREVIEW** (manual, post-merge) | Facebook Sharing Debugger + Twitter Card Validator | Page-specific image and title shown |
| **V-GA** (post-deploy) | `curl -s https://www.elamoudifurniture.com/ \| grep -oE "gtag\('config', 'G-[A-Z0-9]+'\)"` AND GA4 → Realtime | ≥ 1 match; ≥ 1 active user during smoke test |
| **V-BC** | `curl -s https://www.elamoudifurniture.com/garden \| grep -c "BreadcrumbList"` | `1` |
| **V-AR** | `curl -s https://www.elamoudifurniture.com/products/parket \| grep -o '"aggregateRating"' \| wc -l` AND repo grep | `0` AND only prop/docblock/conditional |
| **V-WEBSITE** | Rich Results Test on `/` | `WebSite` valid with `alternateName`; **no** `potentialAction` |
| **V-RRT** | Rich Results Test on `/`, `/contact`, `/products/parket`, `/garden`, `/products`, `/decor` | 0 errors, 0 warnings |
| **V-LH** | Lighthouse mobile on `/`, `/carpets`, `/products`, `/decor`, `/garden`, `/contact`, `/products/parket` | SEO ≥ 95, no CWV regression |
| **V-GSC** (manual, post-deploy, ≤ 14 days) | GSC URL Inspection on `/products` and `/decor` | "URL is on Google" |

If any V-* fails, **fix the implementation, don't relax the bar**.

---

## 7. Per-story pointers into `SEO-SPEC-TECHNICAL.md`

| Story | Reference section (in repo root) |
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

Those sections contain the **exact** before/after code blocks with
real strings and import statements. They are authoritative — use them
verbatim, do not paraphrase.

---

## 8. PR description checklist (paste into your PR)

```markdown
### Phase 1 — Critical Technical SEO Fixes

#### Story checklist
- [ ] US-1 NAP unification
- [ ] US-2 Title duplication
- [ ] US-3 308 redirects
- [ ] US-4 /products + /decor content
- [ ] US-5 SEOContent regex
- [ ] US-6 Per-page OG/Twitter
- [ ] US-7 GA4 env var
- [ ] US-8 Garden breadcrumbs
- [ ] US-9 ProductSchema guard
- [ ] US-10 WebSite schema cleanup

#### Verification artifacts (paste links / outputs)
- [ ] V-LINT, V-BUILD: `npm run lint && npm run build` ✅
- [ ] V-NAP: grep output (must be empty)
- [ ] V-CRAWL-TITLE: 8+ titles confirmed
- [ ] V-CRAWL-REDIRECT: 308 confirmed for /curtains, /kitchens
- [ ] V-CRAWL-COPY: word counts for /products, /decor
- [ ] V-DOM: paragraph count for /products/parket
- [ ] V-DATA-AUDIT: empty grep
- [ ] V-OG: 4 og:image confirmations
- [ ] V-BC: BreadcrumbList count = 1
- [ ] V-AR: aggregateRating count = 0
- [ ] V-RRT: 6 validator URLs (0 errors, 0 warnings each)
- [ ] V-LH: Lighthouse SEO ≥ 95 on 7 pages
- [ ] V-WEBSITE: alternateName confirmed, no SearchAction

#### Post-merge actions
- [ ] GSC URL Inspection: /products, /decor → Request Indexing
- [ ] GA4 env var configured in Vercel; redeploy triggered; masked ID: G-XXXX****
- [ ] OG preview audit in Facebook + Twitter validators (4 URLs)
- [ ] V-GSC follow-up scheduled at +14 days

#### Constitution compliance
- [ ] I Arabic-First   - [ ] II Data-Driven   - [ ] III No Black-Hat   - [ ] IV NAP SoT
- [ ] V Verification   - [ ] VI Mobile-First   - [ ] VII Schema Integrity
```

---

## 9. Stop conditions

You **stop and surface to the Planning Agent (do not improvise)** if:

- A V-* verification fails after a reasonable fix attempt.
- A task forces touching a file outside §3.
- A task requires a new npm package or env var not listed in §2.
- The OG image assets in §3 are not delivered and you can't confidently
  decide between fallback vs. blocking.
- A `[NEEDS CLARIFICATION]` situation arises that wasn't anticipated
  by `spec.md`.

In all stop conditions: open a draft PR with what you have, document
the blocker in the description, and tag the Planning Agent. Do NOT
push speculative fixes that bypass the V-* checks.
