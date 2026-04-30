---
description: "Task list for Phase 1 — Critical Technical SEO Fixes"
---

# Tasks: Phase 1 — Critical Technical SEO Fixes

**Input**: Design documents from `specs/001-phase1-technical-fixes/`
**Prerequisites**: `plan.md` ✅, `spec.md` ✅, `quickstart.md` ✅, `research.md` ✅, `data-model.md` ✅, `contracts/` ✅
**Constitution version applied**: 1.0.0

> ⚠ **AUDIENCE.** This task list is consumed by an **Implementation
> Agent** with **no conversation context**. Read `quickstart.md`
> first, then `spec.md`, then `plan.md`, then this file. Each task
> below names: (a) the exact file path, (b) a pointer to the
> authoritative before/after section in `SEO-SPEC-TECHNICAL.md`, and
> (c) the verification command to confirm the task is done.
>
> **You are NOT permitted to invoke `/speckit.implement`.** Execute
> tasks one by one, run verification, mark the box, then move on.

---

## Format

`- [ ] [TaskID] [P?] [Story?] Description (file: path) — ref: <SEO-SPEC-TECHNICAL.md §X.Y> — verify: <V-ID>`

- **[P]** = parallelizable (different file, no upstream dependency).
- **[Story]** = `[US1]`–`[US10]` per `spec.md §2`.
- Foundation, Setup, and Polish tasks have **no** `[Story]` label.

---

## Phase 1 — Setup (Shared infrastructure)

**Purpose**: zero-effort prerequisites that must exist before any code change runs.

- [ ] **T001** Create directory `public/og/` if missing (file: `public/og/.gitkeep`) — no verification needed beyond `ls`.

---

## Phase 2 — Foundational (BLOCKS every user story)

**Purpose**: NAP single source of truth + the `aggregateRating` typed prop. These are imported by stories US-2…US-10, so they must land first.

**⚠ CRITICAL**: No US-N task may begin until **all** Phase 2 tasks are complete and `V-NAP` returns empty.

### Constants & data layer

- [ ] **T002** Create `src/constants/business.ts` with the canonical `BUSINESS` const (file: `src/constants/business.ts`) — ref: `SEO-SPEC-TECHNICAL.md §5.1` — verify: file exists; `npx tsc --noEmit` exits 0.

### Schema component contracts

- [ ] **T003** Update `src/components/seo/JsonLd.tsx` — extend `ProductSchemaProps` with the optional `aggregateRating?` prop and its docblock (Constitution III citation), and update `ProductSchema` body to emit the field only when supplied (file: `src/components/seo/JsonLd.tsx`) — ref: `SEO-SPEC-TECHNICAL.md §10.2` — verify: V-LINT, V-BUILD; `grep -n "aggregateRating" src/components/seo/JsonLd.tsx` shows the prop, the docblock, and the conditional render only.

- [ ] **T004** [P] Update `src/components/seo/JsonLd.tsx` `WebSiteSchema` — replace the function with the truthful version (no SearchAction, with `alternateName: ['مفروشات العمودي', 'العمودي للسجاد', 'Al-Amoudi Furniture']`) and the new docblock (file: `src/components/seo/JsonLd.tsx`) — ref: `SEO-SPEC-TECHNICAL.md §8.2` — verify: V-LINT, V-BUILD.

> T003 and T004 touch the same file but different functions; if your editor handles concurrent edits cleanly, do them as one PR-internal commit. Otherwise, sequence T003 → T004.

- [ ] **T005** [P] Fix the regex bug in `src/components/seo/SEOContent.tsx` `formatContent` — replace every `\\` with `\` so the splitter matches real newlines (file: `src/components/seo/SEOContent.tsx`) — ref: `SEO-SPEC-TECHNICAL.md §9.1` — verify: V-LINT, V-BUILD; visual smoke after T040.

### Root layout — NAP unification

- [ ] **T006** [US1] Update `src/app/layout.tsx` — add `import { BUSINESS } from '@/constants/business'`, replace the hardcoded `OrganizationSchema` and `LocalBusinessSchema` props with `BUSINESS.*` references, keep the title template unchanged (file: `src/app/layout.tsx`) — ref: `SEO-SPEC-TECHNICAL.md §5.2` — verify: V-LINT, V-BUILD.

### Audit pass — replace remaining hardcoded NAP

- [ ] **T007** [US1] Update `src/app/contact/page.tsx` — import `BUSINESS`; rebuild the inline `jsonLd` const using it; replace WhatsApp link on line 291 (`wa.me/966567746257`) with `BUSINESS.phone.whatsappLink`; replace hardcoded address text and hours with `BUSINESS.address.full` / `BUSINESS.hours.display.*` (file: `src/app/contact/page.tsx`) — ref: `SEO-SPEC-TECHNICAL.md §5.3` — verify: V-LINT, V-BUILD; V-NAP after this task.

- [ ] **T008** [P] [US1] Update `src/app/garden/GardenClient.tsx` — import `BUSINESS`; replace lines 107, 113, **195, 201** with `BUSINESS.phone.telLink` / `BUSINESS.phone.whatsappLink` (the `+966567746257` number must NOT remain) (file: `src/app/garden/GardenClient.tsx`) — ref: `SEO-SPEC-TECHNICAL.md §5.4` — verify: V-LINT, V-BUILD.

- [ ] **T009** [P] [US1] Audit and update `src/components/ui/Footer.tsx` — `grep` for any hardcoded NAP and replace with `BUSINESS.*`; if no hardcoded values exist, this task is a no-op confirmed by the audit grep (file: `src/components/ui/Footer.tsx`) — ref: `SEO-SPEC-TECHNICAL.md §5.5` — verify: V-LINT, V-BUILD.

- [ ] **T010** [P] [US1] Audit and update `src/components/navbar/MobileContactIcons.tsx` — same pattern as T009 (file: `src/components/navbar/MobileContactIcons.tsx`) — ref: `SEO-SPEC-TECHNICAL.md §5.5` — verify: V-LINT, V-BUILD.

- [ ] **T011** [US1] Run repo-wide NAP audit: `grep -rn "966558352924\|966567746257\|طريق الملك فهد" src/ --include="*.tsx" --include="*.ts" \| grep -v "src/constants/business.ts"` — verify: command output is **empty**. If any hits remain, fix them before proceeding.

**Checkpoint (Phase 2)**: NAP unified, regex bug fixed, ProductSchema guarded, WebSiteSchema honest. **All US-N phases may now begin in parallel** (subject to file-level conflicts noted per task).

---

## Phase 3 — User Story 1: NAP unification (Priority: P1) ✅

**Goal**: every NAP value across the site flows from `src/constants/business.ts`. Deprecated `+966567746257` is gone.

**Independent test**: V-NAP returns empty AND Rich Results Test on `/` and `/contact` shows identical `streetAddress` and `telephone`.

> US-1's implementation tasks (T006–T011) live in Phase 2 because they are foundational — every other story imports `BUSINESS`. The verification tasks below complete US-1.

### Verification

- [ ] **T012** [US1] **V-NAP** — already executed as T011, paste output to PR description.
- [ ] **T013** [US1] **V-RRT** on `/` and `/contact` — paste validator URLs; expect: 0 errors, 0 warnings; `LocalBusiness.streetAddress` = `حي العزيزية، شارع عبدالله بن صالح`; `LocalBusiness.telephone` = `+966558352924`.
- [ ] **T014** [US1] **V-LINT + V-BUILD** — both exit 0.

**Checkpoint (US-1)**: foundation locked. PR may be opened against this checkpoint as an MVP increment.

---

## Phase 4 — User Story 2: Title-template duplication eliminated (Priority: P1)

**Goal**: every page renders `العمودي للمفروشات` exactly once in its `<title>`.

**Independent test**: V-CRAWL-TITLE for the 8+ representative URLs.

### Implementation

- [ ] **T015** [US2] Update `src/app/carpets/page.tsx` `metadata.title` to `موكيت وسجاد الرياض — تشكيلة فاخرة بتركيب مجاني` (file: `src/app/carpets/page.tsx`) — ref: `SEO-SPEC-TECHNICAL.md §1.1` — verify: V-CRAWL-TITLE on `/carpets`.

- [ ] **T016** [P] [US2] Update `src/app/products/page.tsx` `metadata.title` to `جميع المنتجات — موكيت وأرضيات وباركيه وفينيل` (file: `src/app/products/page.tsx`) — ref: `§1.2` — verify: V-CRAWL-TITLE on `/products`.

- [ ] **T017** [P] [US2] Update `src/app/decor/page.tsx` `metadata.title` to `الديكور والإكسسوارات المنزلية — ستائر ومفروشات` (file: `src/app/decor/page.tsx`) — ref: `§1.3` — verify: V-CRAWL-TITLE on `/decor`.

- [ ] **T018** [P] [US2] Update `src/app/garden/page.tsx` `metadata.title`, `openGraph.title`, and `twitter.title` per `§1.5` (file: `src/app/garden/page.tsx`) — ref: `SEO-SPEC-TECHNICAL.md §1.5` — verify: V-CRAWL-TITLE on `/garden`.

- [ ] **T019** [P] [US2] Update `src/app/contact/page.tsx` `metadata.title` and `openGraph.title` per `§1.6` (drop keyword stuffing) (file: `src/app/contact/page.tsx`) — ref: `§1.6` — verify: V-CRAWL-TITLE on `/contact`.

- [ ] **T020** [P] [US2] Update `src/app/about/page.tsx` `metadata.title` and align H1 per `§1.7` (file: `src/app/about/page.tsx`) — ref: `§1.7` — verify: V-CRAWL-TITLE on `/about`.

- [ ] **T021** [US2] Update `src/app/products/[id]/page.tsx` `generateMetadata` — strip trailing `| العمودي للمفروشات` from `product.title` via the regex `/\s*\|\s*العمودي للمفروشات.*$/`, use `cleanTitle` for `metadata.title`, use `${cleanTitle} | العمودي للمفروشات` for `openGraph.title` (file: `src/app/products/[id]/page.tsx`) — ref: `SEO-SPEC-TECHNICAL.md §1.4` — verify: V-CRAWL-TITLE on `/products/turky-mshager`, `/products/parket`, `/products/vinyl-roll`.

### Verification

- [ ] **T022** [US2] **V-CRAWL-TITLE** for all 8+ routes (paste outputs).
- [ ] **T023** [US2] **V-LINT + V-BUILD** — both exit 0.

**Checkpoint (US-2)**: titles clean across the site.

---

## Phase 5 — User Story 3: 308 permanent redirects (Priority: P1)

**Goal**: `/curtains` and `/kitchens` emit HTTP 308 instead of 307.

### Implementation

- [ ] **T024** [P] [US3] Replace `redirect('/decor')` with `permanentRedirect('/decor')` and switch the import in `src/app/curtains/page.tsx` (file: `src/app/curtains/page.tsx`) — ref: `SEO-SPEC-TECHNICAL.md §2.1` — verify: V-CRAWL-REDIRECT on `/curtains`.

- [ ] **T025** [P] [US3] Replace `redirect('/products')` with `permanentRedirect('/products')` and switch the import in `src/app/kitchens/page.tsx` (file: `src/app/kitchens/page.tsx`) — ref: `§2.2` — verify: V-CRAWL-REDIRECT on `/kitchens`.

### Verification

- [ ] **T026** [US3] **V-CRAWL-REDIRECT** for both URLs (paste headers).
- [ ] **T027** [US3] **V-LINT + V-BUILD**.

**Checkpoint (US-3)**: link equity will consolidate to the redirect targets.

---

## Phase 6 — User Story 4: `/products` and `/decor` content + FAQ (Priority: P2)

**Goal**: both pages cross the indexing threshold (≥ 800 words + valid `FAQPage`).

> Depends on T005 (SEOContent regex fix) — without it, the `\n\n` separators in the new copy will not split into paragraphs.

### Implementation

- [ ] **T028** [US4] Update `src/app/products/page.tsx` — add `import SEOContent` and `import FAQ`, define `productsCopy` (≥ 400 words, three sections from `SEO-SPEC-TECHNICAL.md §3.1`) and `productsFaq` (5 questions from §3.1), render `<SEOContent />` and `<FAQ />` after the `ContainerSection` map (file: `src/app/products/page.tsx`) — ref: `SEO-SPEC-TECHNICAL.md §3.1` — verify: V-CRAWL-COPY, V-RRT.

- [ ] **T029** [P] [US4] Update `src/app/decor/page.tsx` — same pattern with `decorCopy` and `decorFaq` from `§3.2` (file: `src/app/decor/page.tsx`) — ref: `§3.2` — verify: V-CRAWL-COPY, V-RRT.

### Verification

- [ ] **T030** [US4] **V-CRAWL-COPY** on `/products` and `/decor` — each ≥ 800 words.
- [ ] **T031** [US4] **V-RRT** on `/products` and `/decor` — each: BreadcrumbList valid + FAQPage valid (5 entities, conforms to `contracts/faqpage.contract.json`).
- [ ] **T032** [US4] **V-LINT + V-BUILD**.
- [ ] **T033** [US4] (post-deploy) **V-GSC** — submit `/products` and `/decor` in GSC URL Inspection → Request Indexing; track for ≤ 14 days; expect status "URL is on Google".

**Checkpoint (US-4)**: indexing recovery in motion.

---

## Phase 7 — User Story 5: SEOContent paragraph rendering (Priority: P2)

**Goal**: long-form `detailedDescription` content on product pages renders as multiple paragraphs and headings.

> The component fix is in T005 (Phase 2). This phase audits and fixes the **data**.

### Implementation

- [ ] **T034** [US5] Audit `src/data/products.ts` — `grep -nE '\\\\n\\\\n' src/data/products.ts` — for every hit, edit the corresponding template literal so the literal escape `\\n\\n` becomes two real newline characters inside the backticks. Do **not** change product values, prices, keywords, or titles (file: `src/data/products.ts`, audit only) — ref: `SEO-SPEC-TECHNICAL.md §9.2` — verify: V-DATA-AUDIT (empty grep).

### Verification

- [ ] **T035** [US5] **V-DATA-AUDIT** — `grep -nE '\\\\n\\\\n' src/data/products.ts` returns empty.
- [ ] **T036** [US5] **V-DOM** — Inspect `/products/parket` after build; confirm `.seo-content-wrapper > p` ≥ 3 and `.seo-content-wrapper > h2` ≥ 1.
- [ ] **T037** [US5] **V-LINT + V-BUILD**.

**Checkpoint (US-5)**: long-form copy ranks again.

---

## Phase 8 — User Story 6: Per-page OpenGraph & Twitter (Priority: P2)

**Goal**: each of `/carpets`, `/products`, `/decor`, `/garden` emits its own OG image and metadata.

### Asset prerequisite (must clear before T038–T041 can complete)

- [ ] **T038** [US6] Confirm `public/og/{carpets,products,decor,garden}.jpg` exist as real binary assets (1200×630 each, ≤ 200 KB). If not delivered: substitute `/og-image.jpg` in the four metadata blocks AND add a TODO line at the top of the PR description listing the four missing assets and a target deadline. Do **not** create placeholder PNGs.

### Implementation

- [ ] **T039** [US6] Update `src/app/carpets/page.tsx` `metadata` — add `keywords`, `openGraph` (with `images: [{ url: '/og/carpets.jpg', width: 1200, height: 630, alt: '…' }]`), and `twitter` per `§4.1` (file: `src/app/carpets/page.tsx`) — ref: `SEO-SPEC-TECHNICAL.md §4.1` — verify: V-OG on `/carpets`.

- [ ] **T040** [P] [US6] Update `src/app/products/page.tsx` `metadata` — same pattern with `/og/products.jpg` per `§4.2` (file: `src/app/products/page.tsx`) — ref: `§4.2` — verify: V-OG on `/products`.

- [ ] **T041** [P] [US6] Update `src/app/decor/page.tsx` `metadata` — same pattern with `/og/decor.jpg` per `§4.3` (file: `src/app/decor/page.tsx`) — ref: `§4.3` — verify: V-OG on `/decor`.

- [ ] **T042** [P] [US6] Update `src/app/garden/page.tsx` `metadata.openGraph` block — replace lines 11–22 with the populated version from `§4.4` (adds `images` and `url`); add `const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elamoudifurniture.com';` at the top above `metadata` (file: `src/app/garden/page.tsx`) — ref: `§4.4` — verify: V-OG on `/garden`.

### Verification

- [ ] **T043** [US6] **V-OG** on all four routes — each returns `/og/{slug}.jpg` (or documented fallback).
- [ ] **T044** [US6] **V-LINT + V-BUILD**.
- [ ] **T045** [US6] (post-deploy) **V-OG-PREVIEW** in Facebook Sharing Debugger + Twitter Card Validator for all four URLs; paste screenshots / links.

**Checkpoint (US-6)**: social shares render correctly.

---

## Phase 9 — User Story 7: GA4 install (Priority: P3)

**Goal**: GA4 Realtime shows live traffic from production.

> No code change — environmental only.

### Implementation

- [ ] **T046** [US7] Operator action: create the GA4 property and copy the Measurement ID per `SEO-SPEC-TECHNICAL.md §6.1`. Implementation Agent records the masked ID (e.g., `G-XXXX****`) in the PR description.

- [ ] **T047** [US7] Operator action: set `NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX` in Vercel for **Production**, **Preview**, and **Development**, then redeploy. Implementation Agent confirms the redeploy completed.

### Verification

- [ ] **T048** [US7] (post-deploy) **V-GA** — `curl -s https://www.elamoudifurniture.com/ \| grep -oE "gtag\('config', 'G-[A-Z0-9]+'\)"` returns ≥ 1 match with the configured ID; GA4 → Realtime shows ≥ 1 active user during a smoke test from another device.

**Checkpoint (US-7)**: telemetry on.

---

## Phase 10 — User Story 8: Garden breadcrumbs (Priority: P3)

### Implementation

- [ ] **T049** [US8] Update `src/app/garden/GardenClient.tsx` — add `import Breadcrumbs from '@/components/seo/Breadcrumbs'`, define `breadcrumbItems = [{ name: 'الرئيسية', href: '/' }, { name: 'تنسيق الحدائق' }]`, render `<Breadcrumbs items={breadcrumbItems} />` immediately after the outer wrapper opens and before the hero section (file: `src/app/garden/GardenClient.tsx`) — ref: `SEO-SPEC-TECHNICAL.md §7.1` — verify: V-BC.

### Verification

- [ ] **T050** [US8] **V-BC** — `curl -s https://www.elamoudifurniture.com/garden \| grep -c "BreadcrumbList"` returns `1`.
- [ ] **T051** [US8] **V-RRT** on `/garden` — `BreadcrumbList` validates with 2 items per `contracts/breadcrumblist.contract.json`.

**Checkpoint (US-8)**: garden joins the breadcrumb-rich set.

---

## Phase 11 — User Story 9: ProductSchema policy guard (Priority: P3)

**Goal**: `aggregateRating` cannot be silently reintroduced.

> The implementation lives in Phase 2 (T003). This phase verifies.

### Verification

- [ ] **T052** [US9] **V-AR** — `curl -s https://www.elamoudifurniture.com/products/parket \| grep -o '"aggregateRating"' \| wc -l` returns `0`. Repo grep `grep -rn "aggregateRating" src/ --include="*.tsx" --include="*.ts"` shows only the prop, the docblock, and the conditional render in `JsonLd.tsx`; no caller passes a hardcoded value.

**Checkpoint (US-9)**: policy guard verified.

---

## Phase 12 — User Story 10: WebSite schema cleanup (Priority: P3)

**Goal**: WebSite schema is honest (no fake SearchAction) and exposes brand variants via `alternateName`.

> Implementation lives in Phase 2 (T004). This phase verifies.

### Verification

- [ ] **T053** [US10] **V-WEBSITE** — Rich Results Test on `/`: `WebSite` validates with `alternateName: ['مفروشات العمودي', 'العمودي للسجاد', 'Al-Amoudi Furniture']`; `potentialAction` field absent.

**Checkpoint (US-10)**: schema honesty restored.

---

## Phase 13 — Polish & Cross-Cutting Concerns

**Purpose**: aggregate verification, post-merge actions, documentation.

- [ ] **T054** **V-RRT (full sweep)** — Rich Results Test on `/`, `/contact`, `/products/parket`, `/garden`, `/products`, `/decor`. Paste each validator URL in the PR description. Expect 0 errors, 0 warnings everywhere.

- [ ] **T055** [P] **V-LH (full sweep)** — Lighthouse mobile on `/`, `/carpets`, `/products`, `/decor`, `/garden`, `/contact`, `/products/parket`. Paste numeric SEO score (≥ 95 each) and CWV deltas. Compare CWV against the pre-merge baseline; if any CWV regresses, halt and surface to Planning Agent.

- [ ] **T056** [P] **V-LINT + V-BUILD (final)** — confirm both exit 0 on the full diff.

- [ ] **T057** [P] **NAP final audit** — re-run V-NAP one last time after the entire PR diff is staged. Output must be empty.

- [ ] **T058** Update PR description with the complete checklist from `quickstart.md §8`. Include masked GA4 ID, OG fallback notes (if any), and post-merge action owners.

- [ ] **T059** (post-merge, ≤ 14 days) Track GSC URL Inspection on `/products` and `/decor` until both report "URL is on Google". File a follow-up to the Planning Agent if either remains unindexed at +14 days.

---

## Dependencies & execution order

### Phase dependencies

- **Phase 1 Setup** → no dependency.
- **Phase 2 Foundational** → blocks every US phase.
- **Phase 3 (US-1)** → fully covered by Phase 2 + verification; can be MVP-shipped on its own.
- **Phase 4 (US-2)** → depends on Phase 2 only. Internally: T015–T020 are `[P]`; T021 touches a different file (`[id]/page.tsx`) and is also `[P]`. T022/T023 verifications depend on T015–T021.
- **Phase 5 (US-3)** → depends on Phase 2 only. T024 and T025 are `[P]`.
- **Phase 6 (US-4)** → depends on Phase 2 (specifically T005 — without the SEOContent regex fix the new copy will not render correctly). T028 and T029 are `[P]`.
- **Phase 7 (US-5)** → depends on Phase 2 (T005). T034 audit + T036 visual smoke.
- **Phase 8 (US-6)** → depends on Phase 2. T038 (asset check) gates T039–T042 only conceptually; if assets are missing, the metadata still ships with documented fallback.
- **Phase 9 (US-7)** → no code dependency on other phases. Operator-driven.
- **Phase 10 (US-8)** → depends on Phase 2. T049 modifies `GardenClient.tsx` — already touched by T008 (US-1 NAP). **T049 must run AFTER T008** (otherwise merge conflict in same file). Mark T049 sequential after T008 in your workflow.
- **Phase 11 (US-9)** → verification only; depends on T003.
- **Phase 12 (US-10)** → verification only; depends on T004.
- **Phase 13 Polish** → depends on all in-scope user stories.

### Within each user story

- All implementation tasks **before** verification tasks.
- A user story is **not done** until **all** its V-* tasks pass.

### Parallel opportunities (with file-conflict notes)

- **Phase 2**: T002, T005, T006, T009, T010 can run in parallel (different files). T003 and T004 touch the same file (`JsonLd.tsx`) — sequence them.
- **Phase 4 (US-2)**: T015–T021 are all `[P]` (each touches its own page file).
- **Phase 5 (US-3)**: T024 and T025 are `[P]`.
- **Phase 6 (US-4)**: T028 and T029 are `[P]`.
- **Phase 8 (US-6)**: T039–T042 are `[P]`.
- **Phase 10 (US-8) ↔ Phase 3 (US-1)**: T049 conflicts with T008 (same file) — sequence T008 → T049.

---

## Implementation strategy

### MVP first (US-1 only)

1. Phase 1 setup → Phase 2 foundational → Phase 3 verification → ship.
   - This delivers NAP correctness (Constitution IV) and the
     ProductSchema/WebSite guards (Constitution III/VII) — the
     riskiest items, smallest blast radius.

### Incremental delivery (recommended)

1. **PR 1**: Phase 1 + Phase 2 + Phase 3 (US-1) — foundation.
2. **PR 2**: Phase 4 (US-2 titles) + Phase 5 (US-3 redirects) — Constitution-II-justified CTR work.
3. **PR 3**: Phase 6 (US-4 indexing) + Phase 7 (US-5 paragraph fix) — indexing recovery.
4. **PR 4**: Phase 8 (US-6 OG) + Phase 10 (US-8 breadcrumbs) — visual / schema polish.
5. **PR 5**: Phase 9 (US-7 GA4) — operator-driven.
6. **PR 6**: Phase 13 (polish + final V-* sweep) before phase 1 closure.

### Single-PR strategy (also acceptable)

Ship Phases 1–13 as one PR. Larger diff, single review cycle. Verify every V-* before merge.

---

## Constitution compliance summary

| # | Principle | Verified by tasks | Notes |
|---|---|---|---|
| I | Arabic-First | T015–T021, T028, T029 — every new string is Arabic. | OG titles in T039–T042 also Arabic. |
| II | Data-Driven | spec.md §1 — all stories cite GSC numbers. | No re-justification needed at task level. |
| III | No Black-Hat | T003 (ProductSchema guard), T004 (WebSite cleanup), T052, T053. | Active removal of fake/dishonest signals. |
| IV | NAP Single Source of Truth | T002 (create), T006–T011 (replace), T012 (verify). | T011 grep is the gate. |
| V | Verification Before Done | every Phase ends with V-* tasks. | T054–T057 = full final sweep. |
| VI | Mobile-First / Performance | T055 (V-LH on 7 pages). | No new JS deps; FAQ uses native `<details>`. |
| VII | Structured Data Integrity | T013, T031, T051, T053, T054 (V-RRT sweep). | 6 contracts under `contracts/`. |

---

## Notes for the Implementation Agent

- **You have no conversation context.** Read in order: `quickstart.md`, `spec.md`, `plan.md`, this file, then `SEO-SPEC-TECHNICAL.md` sections.
- **You may not skip verification tasks.** A V-* failure → fix the implementation, do not relax the bar.
- **You may not edit anything outside the file paths listed in §3 of `quickstart.md`** without surfacing as a blocker in the PR description.
- **You may not introduce new dependencies** (npm packages, env vars beyond `NEXT_PUBLIC_GA4_ID`, external services).
- **You are NOT permitted to invoke `/speckit.implement`.** This task list is your runbook; execute one task at a time.
- **Stop conditions**: any failing V-* that cannot be resolved → halt and surface in the PR description; any new `[NEEDS CLARIFICATION]` finding → halt and surface for the Planning Agent.
- **Forbidden**: creating real reviews data, fabricating ratings, hardcoding NAP, using `redirect()` instead of `permanentRedirect()`, removing the layout title template, adding `potentialAction.SearchAction` to WebSite without a real `/search?q=` endpoint.
