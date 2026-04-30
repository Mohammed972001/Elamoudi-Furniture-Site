---
description: "Task list template for feature implementation — Implementation Agent edition"
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: `plan.md` (required), `spec.md` (required), `quickstart.md` (required), `research.md`, `data-model.md`, `contracts/` (optional)
**Constitution version applied**: [e.g., 1.0.0]

> ⚠ **AUDIENCE.** This task list is consumed by an **Implementation Agent**
> with **no conversation context**. Every task MUST therefore name:
> (a) the exact file path it touches, (b) the exact change in before/after
> form (or a pointer to a `specs/SEO-SPEC-*.md` section that already contains
> it), and (c) the verification step to confirm done. Vague tasks like
> "Update the carpets page" are forbidden — they MUST be concrete enough
> to execute against a cold-start agent.

---

## Format

`- [ ] [TaskID] [P?] [Story?] Description with exact file path`

- **[P]** = parallelizable (touches different files, no upstream dependency).
- **[Story]** = `[US1]`, `[US2]`, … maps to user stories in `spec.md`. Required for User-Story phase tasks; omitted for Setup, Foundational, Verification, and Polish phases.

---

## Path Conventions for this project

- App Router routes: `src/app/<route>/page.tsx`
- SEO components: `src/components/seo/{JsonLd,FAQ,Breadcrumbs,SEOContent}.tsx`
- Data: `src/data/*.ts`
- Constants: `src/constants/{business,navigation}.ts`
- Sitemap: `src/app/sitemap.ts`
- Robots: `src/app/robots.ts`
- OG images: `public/og/<slug>.jpg`

---

<!--
============================================================================
The phases below MUST be replaced by /speckit.tasks with concrete tasks for
this feature. Sample text is for shape only and MUST NOT remain in the
final tasks.md.
============================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Anything that must exist before any user story can start (constants, data files, OG asset placeholders, env vars).

- [ ] T001 [Description] — file: `[exact path]` — verify: [command]
- [ ] T002 [P] [Description] — file: `[exact path]` — verify: [command]

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Project-wide foundations that block every user story (e.g., `src/constants/business.ts`, root-layout JSON-LD, title-template fix). NAP-consistency tasks ALWAYS belong here.

**⚠ CRITICAL**: No user-story phase may begin until Phase 2 is complete.

### Foundational task categories

- **Constants & data layer** — create / update `src/constants/business.ts`, `src/data/*.ts`, etc.
- **NAP consistency** — replace all hardcoded NAP values; ban `0567...`. (Constitution IV.)
- **Schema components** — touch `src/components/seo/JsonLd.tsx`, `FAQ.tsx`, `SEOContent.tsx`.
- **Root layout / metadata** — title template, OG defaults, GA4, root JSON-LD.
- **Build prerequisites** — env vars, image directories, sitemap/robots scaffolding.

- [ ] T0XX [Description] — file: `[exact path]` — before/after: see `SEO-SPEC-TECHNICAL.md §[X]`
- [ ] T0XX [P] [Description]

**Checkpoint**: Foundation ready — user-story phases may begin.

---

## Phase 3: User Story 1 — [Title] (Priority: P1) 🎯 MVP

**Goal**: [What this story delivers, copied from spec.md.]

**Independent Test**: [Standalone verification — copied from spec.md.]

### Implementation tasks

- [ ] T0XX [P] [US1] [Description] — file: `[exact path]`
  - **Before/after**: see `specs/SEO-SPEC-TECHNICAL.md §[X.Y]` (or inline below if not previously documented)
  - **Constitution check**: [I / II / III / IV / VII as applicable]

- [ ] T0XX [US1] [Description] — file: `[exact path]`
  - **Depends on**: T0XX (must complete first because [reason])

### Verification tasks (Constitution Principle V — mandatory before checkpoint)

> **Verification tasks always live inside the user-story phase that they verify.** They are not a separate phase.

- [ ] T0XX [US1] **V-LINT**: run `npm run lint` — expect exit 0
- [ ] T0XX [US1] **V-BUILD**: run `npm run build` — expect exit 0
- [ ] T0XX [US1] **V-CRAWL**: `curl -sI http://localhost:3000{path}` — expect status [200/308]; `curl -s http://localhost:3000{path} | grep -oE '<title>[^<]+</title>'` — expect [exact title]
- [ ] T0XX [US1] **V-RRT**: paste Rich Results Test URL for {path} — expect 0 errors, 0 warnings; required schemas present: [list]
- [ ] T0XX [US1] **V-NAP** (if NAP-relevant): `grep -rn "966558352924\|966567746257\|طريق الملك فهد" src/ --include="*.tsx" --include="*.ts" | grep -v "src/constants/business.ts"` — expect empty
- [ ] T0XX [US1] **V-LH**: Lighthouse mobile on {path} — expect SEO ≥ 95, no CWV regression
- [ ] T0XX [US1] **V-GSC** (post-deploy): submit {path} to GSC URL Inspection → Request Indexing — expect "URL is on Google" within 14 days

**Checkpoint**: User Story 1 fully functional and independently verified.

---

## Phase 4: User Story 2 — [Title] (Priority: P2)

[Same structure as Phase 3.]

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple stories (docs, sitemap re-submission, GSC indexing requests for the whole feature batch, OG image audit).

- [ ] TXXX Update `src/app/sitemap.ts` to include any new public routes added in this feature
- [ ] TXXX Update `src/app/robots.ts` allow-list if new public route prefixes were added
- [ ] TXXX Re-submit `sitemap.xml` in Google Search Console
- [ ] TXXX Document post-merge actions in PR description (GBP updates, citation updates, social posts)
- [ ] TXXX [P] Audit `public/og/` for missing per-page images
- [ ] TXXX Run quickstart.md end-to-end as a final validation pass

---

## Dependencies & Execution Order

### Phase dependencies

- **Phase 1 Setup**: no dependencies; can start immediately.
- **Phase 2 Foundational**: depends on Phase 1; **blocks all user stories**.
- **Phase 3+ User Stories**: depend on Phase 2 only; can run in parallel.
- **Polish phase**: depends on all in-scope user stories being complete.

### Within each user story

- Implementation tasks before verification tasks within the same story.
- A user story is **not done** until **all** its verification tasks pass.

### Parallel opportunities

- All `[P]`-marked tasks in the same phase touch different files and can run concurrently.
- Different user stories can be implemented in parallel after Phase 2.

---

## Implementation strategy

### MVP first (User Story 1 only)

1. Phase 1 + Phase 2 + Phase 3 (US1) → Verify → Deploy → Done.

### Incremental delivery

After each user-story phase completes its checkpoint, the feature can be deployed independently.

---

## Constitution Compliance Summary

> Final review the Implementation Agent runs before opening the PR.

| # | Principle | Verified by tasks | Notes |
|---|-----------|-------------------|-------|
| I | Arabic-First | [task IDs] | All user-facing strings inspected |
| II | Data-Driven | spec §1 | GSC numbers cited |
| III | No Black-Hat | [task IDs] | No fabricated structured data introduced |
| IV | NAP Single Source of Truth | V-NAP tasks | grep returns empty |
| V | Verification Before Done | All V-* tasks | Each story has its V-* block |
| VI | Mobile-First / Performance | V-LH tasks | Lighthouse SEO ≥ 95 |
| VII | Structured Data Integrity | V-RRT tasks | Rich Results Test 0 errors / 0 warnings |

---

## Notes for the Implementation Agent

- **You have no conversation context.** Read in order: `quickstart.md`, `spec.md`, `plan.md`, this file, then any referenced `SEO-SPEC-*.md` sections.
- **You may not skip verification tasks.** A verification failure → fix the implementation, do not relax the criterion.
- **You may not edit anything outside the file paths listed in the tasks above** without explicit approval.
- **You may not introduce new dependencies** (npm packages, env vars, external services) unless a task explicitly says so.
- **Stop conditions**: any failing V-* task that cannot be resolved → halt and surface in the PR description; any new `[NEEDS CLARIFICATION]` finding during implementation → halt and surface for the Planning Agent.
- **Forbidden**: creating real reviews data, fabricating ratings, hardcoding NAP, using `redirect()` instead of `permanentRedirect()` for permanent moves, removing the layout title template.
