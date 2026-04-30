# Implementation Plan: Phase 1 — Critical Technical SEO Fixes

**Branch**: `001-phase1-technical-fixes` | **Date**: 2026-04-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/001-phase1-technical-fixes/spec.md`
**Constitution version applied**: 1.0.0

> ⚠ **Authoring boundary.** Produced by the **Planning Agent**. Consumed by
> a separate **Implementation Agent** with **no conversation context**. The
> Implementation Agent reads `quickstart.md` first, then `tasks.md`. This
> plan is the design rationale; the Implementation Agent uses it to
> reason about *why*, not *what*.

---

## 1. Summary

Apply the 10 technical-correctness fixes from `SEO-SPEC-TECHNICAL.md` as
**one feature, ten user stories**, in three priority bands:

- **P1 (foundational + brand-pixel-budget)**: NAP single source of
  truth, title-template duplication elimination, permanent (308)
  redirects.
- **P2 (indexing recovery + share previews)**: enrich
  `/products` and `/decor` with content + FAQ, fix the
  `SEOContent` paragraph-splitting regex, add page-specific OG /
  Twitter on the four category pages.
- **P3 (telemetry + schema integrity)**: install GA4, add
  Garden breadcrumbs, install the `aggregateRating` policy guard,
  rewrite the `WebSiteSchema` docblock + add `alternateName`.

Technical approach is **change-only-what-is-listed**: zero new
dependencies, zero refactors, zero rework of existing component APIs.
Where new exports appear (`BUSINESS` const), they are additive and
do not change the shape of what exists.

---

## 2. Technical Context

**This project's stack is fixed by the Constitution. Not reopened by this plan.**

**Language / Version**: TypeScript 5.x, React 19, Next.js 16.1.1 (App Router, Turbopack)
**Styling**: Tailwind CSS v4 via `@tailwindcss/postcss`
**Font**: Cairo (subsets: arabic + latin), `display: swap`
**Routing**: App Router; metadata via the Metadata API; SSG via `generateStaticParams` for product detail pages
**Storage**: Static data files under `src/data/*.ts`. No database touched.
**Testing**: No test framework currently installed. Verification is **evidence-based** (curl, Rich Results Test, Lighthouse, GSC URL Inspection) — see §6.3.
**Target Platform**: Web (mobile-first; 90% of traffic is mobile per GSC)
**Project Type**: Single-project Next.js web app
**Performance Goals**: Lighthouse SEO ≥ 95 on every changed page; CWV no regression vs. prior deploy.
**Constraints (locale & NAP)**: `lang="ar"`, `dir="rtl"`, `locale: ar_SA`; all NAP from `src/constants/business.ts`; title template owned by root layout: `"%s | العمودي للمفروشات"`.
**Scale / Scope (current baseline)**: ~18 indexed pages, ~12,864 imp / 90 days, 4 referring domains. Targets in `SEO-PLAN-EN.md` Phase 7.
**Feature-specific additions**:
- New file `src/constants/business.ts` (zero runtime cost — tree-shaken when unused).
- New env var `NEXT_PUBLIC_GA4_ID` (already referenced in `src/app/layout.tsx`; only needs to be **set**).
- New static assets under `public/og/`.

No `[NEEDS CLARIFICATION]` markers remain in `spec.md` — research phase
(§5 Phase 0 below) consequently has no unknowns to resolve.

---

## 3. Constitution Check

> **GATE**: must pass before Phase 0 research. Re-checked after Phase 1 design (§7).

### Principle gates

| # | Principle | Pass? | Evidence in this plan |
|---|---|---|---|
| I | Arabic-First, Saudi-Targeted | [x] | All new strings (titles, FAQ, SEOContent copy in §6.3, OG titles) are Arabic. `locale: ar_SA` preserved in OG metadata for every modified page. |
| II | Data-Driven Decisions | [x] | Every story justified in `spec.md §1` with GSC impressions/CTR/position. |
| III | No Black-Hat / No Fake Signals | [x] | US-9 (`aggregateRating` guard) and US-10 (`SearchAction` removal + truthful docblock) actively REMOVE policy violations. No new fabricated structured data. |
| IV | NAP Single Source of Truth | [x] | US-1 creates `src/constants/business.ts`; FR-101–FR-106 + AC-001 enforce zero hardcoded NAP. The deprecated `+966567746257` is removed everywhere. |
| V | Verification Before Completion | [x] | `spec.md §5` lists 14 acceptance criteria, each with a runnable verification command. Quickstart §4 (this plan) makes them mandatory pre-PR. |
| VI | Mobile-First, Performance-Aware | [x] | AC-012 enforces Lighthouse mobile SEO ≥ 95 per touched page. Asset budget for OG images: ≤ 200 KB each (asset constraint in `quickstart.md` §3). No new JS deps; FAQ block uses native `<details>` element (zero JS). |
| VII | Structured Data Integrity | [x] | AC-005 (FAQPage), AC-009 (BreadcrumbList), AC-011 (WebSite), AC-013 (overall) enforce Rich Results Test 0/0 on each touched URL. |

### SEO Quality Gates (from Constitution §"SEO Quality Gates")

- [x] **GSC evidence cited** — `spec.md §1` is fully populated.
- [x] **NAP audit** in plan — script in §6.3 V-NAP.
- [x] **Sitemap update** — not needed (no new public routes in Phase 1).
- [x] **Robots allow-list update** — not needed.
- [x] **Mobile + Lighthouse plan** — listed in §6.3 V-LH for the 7 most-affected pages.
- [x] **Smoke crawl plan** — listed in §6.3 V-CRAWL.
- [x] **Post-merge actions** identified — see §9 (GSC URL Inspection on `/products` and `/decor`; Vercel env-var configuration for `NEXT_PUBLIC_GA4_ID`; Facebook / Twitter Sharing Debugger rerun).

**Gate result**: PASS. No violations. §8 Complexity Tracking left empty.

---

## 4. Project Structure

### Documentation (this feature)

```text
specs/001-phase1-technical-fixes/
├── spec.md                 # /speckit.specify output — DONE
├── plan.md                 # this file — /speckit.plan output
├── research.md             # Phase 0 output — minimal (no unknowns)
├── data-model.md           # Phase 1 output — BUSINESS interface
├── quickstart.md           # Phase 1 output — Implementation-Agent quickstart
├── contracts/              # Phase 1 output — JSON-LD schema contracts
│   ├── local-business.contract.json
│   ├── organization.contract.json
│   ├── product.contract.json
│   ├── faqpage.contract.json
│   ├── breadcrumblist.contract.json
│   └── website.contract.json
├── checklists/
│   └── requirements.md     # /speckit.specify quality checklist — DONE
└── tasks.md                # /speckit.tasks output — NEXT
```

### Source code touched in this feature

```text
src/
├── app/
│   ├── layout.tsx                       # MODIFY — NAP imports (FR-102), title template untouched (FR-201)
│   ├── carpets/page.tsx                 # MODIFY — title (FR-202), OG/Twitter (FR-601)
│   ├── products/page.tsx                # MODIFY — title (FR-202), OG/Twitter (FR-602), SEOContent + FAQ (FR-401)
│   ├── decor/page.tsx                   # MODIFY — title (FR-202), OG/Twitter (FR-603), SEOContent + FAQ (FR-402)
│   ├── garden/
│   │   ├── page.tsx                     # MODIFY — title (FR-202), OG with images (FR-604)
│   │   └── GardenClient.tsx             # MODIFY — Breadcrumbs (FR-801), NAP via BUSINESS (FR-104)
│   ├── contact/page.tsx                 # MODIFY — title (FR-202), inline JSON-LD via BUSINESS (FR-103)
│   ├── about/page.tsx                   # MODIFY — title (FR-202), H1 alignment
│   ├── curtains/page.tsx                # MODIFY — permanentRedirect (FR-301)
│   ├── kitchens/page.tsx                # MODIFY — permanentRedirect (FR-302)
│   └── products/[id]/page.tsx           # MODIFY — title strip+template (FR-203)
├── components/
│   ├── seo/
│   │   ├── JsonLd.tsx                   # MODIFY — ProductSchema prop+guard (FR-901), WebSiteSchema rewrite (FR-1001)
│   │   ├── SEOContent.tsx               # MODIFY — regex bug fix (FR-501)
│   │   ├── FAQ.tsx                      # READ-ONLY (consumed by US-4)
│   │   └── Breadcrumbs.tsx              # READ-ONLY (consumed by US-8)
│   ├── ui/
│   │   └── Footer.tsx                   # MODIFY (audit only) — replace any hardcoded NAP (FR-105)
│   └── navbar/
│       └── MobileContactIcons.tsx       # MODIFY (audit only) — replace any hardcoded NAP (FR-105)
├── constants/
│   ├── business.ts                      # CREATE (FR-101)
│   └── navigation.ts                    # READ-ONLY (Phase 1 doesn't touch nav)
└── data/
    └── products.ts                      # AUDIT — replace any literal `\\n\\n` with real newlines (FR-502)

public/
└── og/                                  # CREATE directory + 4 images (FR-605)
    ├── carpets.jpg
    ├── products.jpg
    ├── decor.jpg
    └── garden.jpg
```

**Structure decision**: single-project Next.js layout, additive only.
No directory moves. No new top-level configuration files. The
Implementation Agent MUST NOT modify any `src/` file outside this list.

---

## 5. Phase 0 — Outline & Research

The spec contains zero `[NEEDS CLARIFICATION]` markers and zero novel
technologies. Phase 0 is therefore minimal:

| Question | Decision | Rationale | Alternatives considered |
|---|---|---|---|
| 308 (`permanentRedirect`) vs. host-level 301 in `next.config.ts`? | **308 via `permanentRedirect()`** in the route file. | Closest to existing code; no `next.config.ts` change needed; Google treats 308 identically to 301. | (a) `next.config.ts redirects` array — equally valid but adds a config touch-point; rejected to keep diff small. (b) Leave 307 — rejected (Constitution V + §1 evidence). |
| Where to put `/products` enrichment copy? | Inline export `productsCopy` and `productsFaq` consts at top of `src/app/products/page.tsx`. | Co-location keeps the page self-contained; no new file. | Move to `src/data/staticCopy.ts` — rejected; introduces a file with one consumer. |
| Should we add `Service` schema to `/services/installation` etc.? | **No** — out of scope (§8). Phase 4. | Keeps Phase 1 focused on correctness, not new pages. | Pull forward — rejected; widens blast radius. |
| Use `<Image>` for OG cover assets? | **No.** OG images are referenced by URL in metadata, not rendered as `<Image>`. | Standard pattern for Next.js metadata API. | N/A. |
| `BUSINESS.phone.whatsappLink` as getter vs. plain string? | **Getter** (returns `https://wa.me/${primary}?text=${encoded(waMessage)}`). | Encapsulates encoding; allows changing `waMessage` in one place. | Plain string — rejected; loses URL-encoding correctness. |

**Output (research.md)** confirms no further research needed. Plan
proceeds to Phase 1.

---

## 6. Phase 1 — Design & Verification

### 6.1 — Schema / JSON-LD contracts

For every JSON-LD type touched by this feature, a contract file lives
under `contracts/` with: required fields, forbidden fields, exact
example payload, validator. Contracts are descriptive — they document
the **expected shape** the Implementation Agent must produce.

| Schema | File | Used by | Notes |
|---|---|---|---|
| `LocalBusiness` (HomeAndConstructionBusiness) | `contracts/local-business.contract.json` | layout, contact | NAP fields all from `BUSINESS`; `@id` shared across pages |
| `Organization` | `contracts/organization.contract.json` | layout | `sameAs` populated from `BUSINESS.social`; `@id` referenced by other schemas |
| `Product` | `contracts/product.contract.json` | each `/products/[id]` | **`aggregateRating` field is FORBIDDEN unless real data is supplied** (Constitution III) |
| `FAQPage` | `contracts/faqpage.contract.json` | `/`, `/products`, `/decor` (US-4) | Exactly 5 entities each on `/products` and `/decor` |
| `BreadcrumbList` | `contracts/breadcrumblist.contract.json` | every page (incl. `/garden` after US-8) | Items array length matches visible breadcrumb |
| `WebSite` | `contracts/website.contract.json` | layout | `alternateName` array required (US-10); `potentialAction.SearchAction` FORBIDDEN until `/search` exists |

Files written into `contracts/` after this plan is finalized; see §6.5.

### 6.2 — Data model (`data-model.md`)

This feature introduces one entity: `BUSINESS`. Full TypeScript shape +
JSDoc lives in `data-model.md` (companion file). Summary:

```ts
export const BUSINESS = {
  name: 'العمودي للمفروشات',
  legalName: 'العمودي للأرضيات والمفروشات',
  description: '…',
  url: 'https://www.elamoudifurniture.com',
  logo: '/favicon.svg',
  phone: { primary, waMessage, get whatsappLink, get telLink, get displayIntl, get displayLocal },
  address: { streetAddress, addressLocality, addressRegion, postalCode, addressCountry, addressCountryName, full },
  geo: { latitude, longitude, googleMapsUrl },
  hours: { schemaOrg: string[], display: { sunThu, friday, saturday } },
  social: { tiktok, instagram /* expandable */ },
  areaServed: ['الرياض', 'المملكة العربية السعودية'],
  priceRange: '$$',
} as const;
```

The full canonical implementation lives in
`SEO-SPEC-TECHNICAL.md §5.1`. The Implementation Agent uses that as
the authoritative before/after.

### 6.3 — Verification plan *(Constitution Principle V — mandatory)*

Each row below maps a **Verification ID** to a runnable check. Every
user-story phase in `tasks.md` (output of `/speckit.tasks`) MUST include
at least the V-* tasks marked "Required for **all** stories" plus any
story-specific ones.

| ID | What is verified | How (exact command or tool) | Expected | Required for |
|---|---|---|---|---|
| **V-LINT** | Code style | `npm run lint` (run at repo root) | Exit 0 | All stories |
| **V-BUILD** | Build integrity | `npm run build` | Exit 0 | All stories |
| **V-NAP** | NAP unicity (Constitution IV) | `grep -rn "966558352924\|966567746257\|طريق الملك فهد" src/ --include="*.tsx" --include="*.ts" \| grep -v "src/constants/business.ts"` | Empty output | US-1, post-merge audit |
| **V-CRAWL-TITLE** | Title template renders correctly | `curl -s {URL} \| grep -oE '<title>[^<]+</title>'` | Brand `العمودي للمفروشات` exactly once; ≤ 60 visible Arabic chars | US-2 (run for `/`, `/carpets`, `/products`, `/decor`, `/garden`, `/contact`, `/about`, `/products/vinyl-roll`, `/products/parket`, `/products/turky-mshager`) |
| **V-CRAWL-REDIRECT** | Permanent redirects | `curl -sI https://www.elamoudifurniture.com/curtains` and `…/kitchens` | First line `HTTP/2 308`; `location:` matches target | US-3 |
| **V-CRAWL-COPY** | Content enrichment | `curl -s {URL} \| wc -w` | ≥ 800 visible words | US-4 (`/products`, `/decor`) |
| **V-DOM** | SEOContent renders multi-paragraph | DOM inspection of `/products/parket` (devtools or Puppeteer) | `.seo-content-wrapper > p` count ≥ 3, `> h2` ≥ 1 | US-5 |
| **V-DATA-AUDIT** | No literal `\\n\\n` in product data | `grep -nE '\\\\n\\\\n' src/data/products.ts` | Empty | US-5 |
| **V-OG** | Per-page OG | `curl -s {URL} \| grep -oE 'property="og:image" content="[^"]+"'` | Returns `/og/{slug}.jpg` (never `/og-image.jpg`) | US-6 (4 paths) |
| **V-OG-PREVIEW** | Visual preview | Facebook Sharing Debugger + Twitter Card Validator | Page-specific image and title shown | US-6 (manual, post-merge) |
| **V-GA** | GA4 tag rendered | `curl -s https://www.elamoudifurniture.com/ \| grep -oE "gtag\('config', 'G-[A-Z0-9]+'\)"` AND GA4 → Reports → Realtime | ≥ 1 match with the configured ID; ≥ 1 active user during smoke test | US-7 (post-deploy) |
| **V-BC** | Breadcrumb schema on garden | `curl -s https://www.elamoudifurniture.com/garden \| grep -c "BreadcrumbList"` | `1` | US-8 |
| **V-AR** | aggregateRating absent | `curl -s https://www.elamoudifurniture.com/products/parket \| grep -o '"aggregateRating"' \| wc -l` AND repo grep | `0`; only the prop/docblock/conditional in `JsonLd.tsx` | US-9 |
| **V-WEBSITE** | WebSite schema honest | Rich Results Test on `/` | `WebSite` valid with `alternateName`; **no** `potentialAction` | US-10 |
| **V-RRT** | Schema integrity (Constitution VII) | Rich Results Test on `/`, `/contact`, `/products/parket`, `/garden`, `/products`, `/decor` | 0 errors, 0 warnings | All stories that touch JSON-LD |
| **V-LH** | Performance + SEO | Lighthouse mobile on `/`, `/carpets`, `/products`, `/decor`, `/garden`, `/contact`, `/products/parket` | SEO ≥ 95 each; CWV no regression vs. baseline | All stories |
| **V-GSC** | Index health (post-deploy) | GSC URL Inspection within 14 days | `/products` and `/decor`: "URL is on Google" | US-4 (manual, post-merge) |

### 6.4 — Quickstart (`quickstart.md`)

The Implementation Agent's first read. See companion file
`quickstart.md`. It contains:

1. The locked tech-stack constraints from §2 (copied verbatim because
   the agent has no context).
2. The forbidden actions from `spec.md §9`.
3. The exact list of files to create vs. modify.
4. The verification commands from §6.3 (so the agent does not need to
   parse the table here).
5. Pointers into `SEO-SPEC-TECHNICAL.md` per story.
6. The constitution principles in 7 bullet points.

### 6.5 — Agent context update

This plan is the **active plan**. Update the SPECKIT block in `CLAUDE.md`
and `AGENTS.md` to point to `specs/001-phase1-technical-fixes/plan.md`.
(Done as part of finalizing this `/speckit.plan` invocation, see §10.)

---

## 7. Re-check Constitution gates after Phase 1

Identical evaluation to §3 — no design changes introduced new
violations. All gates remain PASS:

| # | Principle | Re-check | Evidence |
|---|---|---|---|
| I | Arabic-First | [x] | OG titles include Arabic; SEOContent copy in §6.3 referenced is Arabic |
| II | Data-Driven | [x] | All design choices in §5 cite §1 of the spec or the constitution |
| III | No Black-Hat | [x] | Contract §6.1 explicitly forbids `aggregateRating` and `SearchAction` without backing |
| IV | NAP Single Source of Truth | [x] | `data-model.md` defines the only allowed source |
| V | Verification | [x] | §6.3 = 16 verification entries; tasks.md will host them inline |
| VI | Mobile-First | [x] | V-LH explicitly mobile target |
| VII | Schema Integrity | [x] | 6 contracts, V-RRT covers each |

---

## 8. Complexity Tracking

> Empty — no Constitution violations to justify.

| Violation | Why needed | Simpler alternative rejected because |
|---|---|---|
| *(none)* | — | — |

---

## 9. Post-merge actions (mandatory PR description content)

The Implementation Agent's PR description MUST include this checklist
verbatim:

- [ ] **GSC URL Inspection**: submit `/products` and `/decor` → Request Indexing.
- [ ] **GA4 env var**: confirm `NEXT_PUBLIC_GA4_ID` set in Vercel for Production, Preview, Development; redeploy triggered. PR description shows masked ID (`G-XXXX****`).
- [ ] **OG preview audit**: re-fetch `/carpets`, `/products`, `/decor`, `/garden` in Facebook Sharing Debugger and Twitter Card Validator; paste screenshots or links.
- [ ] **NAP audit**: paste output of the V-NAP grep (must be empty).
- [ ] **Lighthouse**: paste numbers for the 7 pages in §6.3 V-LH.
- [ ] **Rich Results Test**: paste validator URLs / screenshots for `/`, `/contact`, `/products/parket`, `/garden`, `/products`, `/decor`.
- [ ] **Brand-cache window note**: SERP titles may show old values for up to 14 days; do not treat that as a regression in week 1.

---

## 10. Handoff to `/speckit.tasks`

- [x] `spec.md` finalized — no `[NEEDS CLARIFICATION]` markers.
- [x] `plan.md` finalized (this file).
- [x] `research.md` will be written alongside this plan (no unknowns).
- [x] `data-model.md` will be written alongside this plan (BUSINESS shape).
- [x] `contracts/` will be populated with 6 schema contracts.
- [x] `quickstart.md` will be written alongside this plan.
- [x] Agent context (`CLAUDE.md`, `AGENTS.md`) updated to point at this plan.

After all six artifacts exist, run `/speckit.tasks` to generate
`tasks.md` from this plan. **Stop after `tasks.md`. Do not invoke
`/speckit.implement`.**
