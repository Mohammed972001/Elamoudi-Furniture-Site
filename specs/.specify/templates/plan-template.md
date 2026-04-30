# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link to spec.md]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`
**Constitution version applied**: [e.g., 1.0.0]

> ⚠ **Authoring boundary.** This plan is produced by the **Planning Agent**.
> A separate **Implementation Agent** with **no conversation context** will
> read this plan plus `tasks.md` and execute. Be explicit about every file
> path, function signature, and verification step.

---

## 1. Summary

[Extract from spec: primary requirement + the technical approach chosen during research.]

---

## 2. Technical Context

**This project's stack is fixed by the Constitution. Do not reopen these decisions in a feature plan.**

**Language / Version**: TypeScript 5.x, React 19, Next.js 16.1.1 (App Router, Turbopack)
**Styling**: Tailwind CSS v4 via `@tailwindcss/postcss`
**Font**: Cairo (subsets: arabic + latin), `display: swap`
**Routing**: App Router; metadata via the Metadata API; SSG via `generateStaticParams` where applicable
**Storage**: Static data files under `src/data/*.ts`. No database.
**Testing**: No test framework currently installed. Verification is **evidence-based** (curl, Rich Results Test, Lighthouse, GSC URL Inspection) — see §6.
**Target Platform**: Web (mobile-first; 81.6% of traffic is mobile per GSC)
**Project Type**: Single-project Next.js web app
**Performance Goals**: Lighthouse SEO ≥ 95 on every changed page; CWV no regression vs prior deploy
**Constraints (locale & NAP)**:
- `lang="ar"`, `dir="rtl"`, `locale: ar_SA`
- All NAP from `src/constants/business.ts`
- Title template owned by root layout: `"%s | العمودي للمفروشات"`
**Scale / Scope (current)**: ~18 indexed pages, ~12,864 imp / 90 days, 4 referring domains. Targets in `SEO-PLAN-EN.md` Phase 7.
**Feature-specific additions**: [Only document NEW dependencies or NEW constraints introduced by THIS feature. If none, write "None."]

---

## 3. Constitution Check

> **GATE**: this section MUST pass before Phase 0 research starts and MUST be re-evaluated after Phase 1 design. Any "No" requires a justification row in §8 Complexity Tracking.

### Principle gates

| # | Principle | Pass? | Evidence in this plan |
|---|-----------|-------|------------------------|
| I | Arabic-First, Saudi-Targeted | [ ] | [Section/line where every user-facing string is confirmed Arabic + ar_SA] |
| II | Data-Driven Decisions | [ ] | [Reference to spec §1 Evidence Base] |
| III | No Black-Hat / No Fake Signals | [ ] | [Confirm no fabricated structured data introduced] |
| IV | NAP Single Source of Truth | [ ] | [Confirm any NAP usage routes through `src/constants/business.ts`] |
| V | Verification Before Completion | [ ] | [Pointer to §6 Verification Plan] |
| VI | Mobile-First, Performance-Aware | [ ] | [Lighthouse target + asset budget] |
| VII | Structured Data Integrity | [ ] | [Schemas added/changed + Rich Results Test plan] |

### SEO Quality Gates (from Constitution §"SEO Quality Gates & Development Workflow")

- [ ] GSC evidence cited (Principle II) — Spec §1 contains a populated metric or competitor finding.
- [ ] NAP audit script in plan — `grep -rn "966558352924\|966567746257\|طريق الملك فهد" src/ --include="*.tsx" --include="*.ts" | grep -v "src/constants/business.ts"` returns zero hits after implementation.
- [ ] Sitemap update planned (if a new public route is added).
- [ ] Robots allow-list update planned (if a new public route is added).
- [ ] Mobile + Lighthouse plan — which page(s) will be measured, target ≥ 95.
- [ ] Smoke crawl plan — which routes will be curl-verified.
- [ ] Post-merge actions identified — GSC URL Inspection requests, OG image uploads, citation updates, etc.

> **If any gate fails:** stop. Either revise the plan to pass, or open a Constitution amendment PR (see Constitution §Governance).

---

## 4. Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── spec.md                # Feature specification (/speckit.specify output)
├── plan.md                # This file (/speckit.plan output)
├── research.md            # Phase 0 output (/speckit.plan)
├── data-model.md          # Phase 1 output if entities exist (/speckit.plan)
├── quickstart.md          # Phase 1 output: Implementation-Agent quickstart (/speckit.plan)
├── contracts/             # Phase 1 output: schema/JSON-LD contracts (/speckit.plan)
├── checklists/
│   ├── requirements.md    # Spec quality checklist (/speckit.specify)
│   └── constitution.md    # Constitution compliance checklist
└── tasks.md               # /speckit.tasks output — NOT created here
```

### Source code (repository root) — current layout

```text
src/
├── app/                   # Next.js App Router routes
│   ├── layout.tsx         # Root layout — owns global JSON-LD + title template
│   ├── page.tsx           # Homepage
│   ├── carpets/page.tsx
│   ├── products/page.tsx
│   ├── products/[id]/page.tsx
│   ├── decor/page.tsx
│   ├── garden/page.tsx + GardenClient.tsx
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── curtains/page.tsx  # 308 redirect → /decor
│   ├── kitchens/page.tsx  # 308 redirect → /products
│   ├── api/feed/route.ts  # XML product feed
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── seo/               # JsonLd, Breadcrumbs, FAQ, SEOContent
│   ├── navbar/
│   ├── hero/
│   └── ui/
├── constants/
│   ├── business.ts        # NAP single source of truth (Constitution IV)
│   └── navigation.ts
├── data/
│   ├── products.ts
│   └── containers.ts
└── types/index.ts

public/
├── og/                    # Per-page OG images
└── ...
```

**Structure decision**: [State which directories THIS feature touches and which it MUST leave untouched.]

---

## 5. Phase 0 — Outline & Research

> Resolve all `[NEEDS CLARIFICATION]` markers from spec.md. For each:
> - Decision: …
> - Rationale: …
> - Alternatives considered: …
>
> Output: `research.md`.

[Bullet list of unknowns + how Phase 0 resolves them.]

---

## 6. Phase 1 — Design & Verification Plan

### 6.1 — Schema / JSON-LD contracts (`contracts/`)

For every JSON-LD type added or changed, produce a contract file under
`specs/[###-feature]/contracts/[schema-name].schema.json` with:
- The exact rendered shape (sample with real values).
- Required fields.
- Forbidden fields (e.g., `aggregateRating` unless real data is supplied).

### 6.2 — Data model (`data-model.md`) *(only if feature introduces or changes data)*

[Entities, fields, relationships, validation. For this project, "data model" usually means a TypeScript interface in `src/data/*.ts` or `src/constants/*.ts`.]

### 6.3 — Verification plan *(Constitution Principle V — mandatory)*

| Verification ID | What is verified | How (exact command or tool) | Expected result |
|-----------------|------------------|-----------------------------|-----------------|
| V-LINT | Code style | `npm run lint` | Exit 0 |
| V-BUILD | Build integrity | `npm run build` | Exit 0 |
| V-NAP | NAP unicity | `grep -rn "966558352924\|966567746257\|طريق الملك فهد" src/ --include="*.tsx" --include="*.ts" \| grep -v "src/constants/business.ts"` | Empty output |
| V-CRAWL | Routes reachable | `curl -sI {URL}` for each touched route | `200` for content pages, `308` for redirect pages |
| V-RRT | Schema integrity | Rich Results Test on each touched URL | 0 errors, 0 warnings |
| V-LH | Performance + SEO | Lighthouse mobile on each touched URL | SEO ≥ 95, no CWV regression vs prior deploy |
| V-GSC | Index health | GSC URL Inspection within 14 days post-deploy | Indexed (or "URL is on Google") |
| V-A11Y | A11y baseline | Lighthouse a11y | ≥ 90 (no regression) |
| V-… | […] | […] | […] |

### 6.4 — Quickstart (`quickstart.md`) *(Implementation Agent's first read)*

A standalone document the Implementation Agent reads **first**. Contents:
1. The tech-stack constraints from §2 (copied verbatim, since the agent has no context).
2. The forbidden actions list from spec.md §9.
3. The exact file paths to create and to modify.
4. The verification commands from §6.3 to run before opening a PR.
5. Pointers to the relevant `SEO-SPEC-*.md` section(s) at the repo root for before/after code.

---

## 7. Re-check Constitution gates after Phase 1

[Repeat the table from §3, checking each box again with evidence drawn from §6 design output.]

---

## 8. Complexity Tracking

> Fill **only** if §3 or §7 has any "No" answer. Each violation must justify both why it's needed and why a simpler, constitution-compliant alternative was rejected.

| Violation | Why needed | Simpler alternative rejected because |
|-----------|------------|--------------------------------------|
| […] | […] | […] |

---

## 9. Handoff to `/speckit.tasks`

Once all gates pass and §6.4 quickstart exists:
- Confirm `spec.md` is final (no remaining `[NEEDS CLARIFICATION]`).
- Confirm `research.md`, `data-model.md` (if relevant), `contracts/`, `quickstart.md` exist.
- Update the agent context file (`CLAUDE.md` between the SPECKIT markers) to point to this plan.
- Stop. Do not proceed to implementation. Do not run `/speckit.implement`.

[End of plan template.]
