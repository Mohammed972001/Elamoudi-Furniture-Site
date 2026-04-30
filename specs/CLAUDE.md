<!-- SPECKIT START -->
# Project agent guide — Al-Amoudi Furniture SEO

**Project:** Spec-Driven SEO program for `elamoudifurniture.com` (Next.js 16
App Router, Arabic / `ar_SA`, Riyadh-focused).

## Sources of truth (read in this order)

1. **`.specify/memory/constitution.md`** — non-negotiable principles.
   When this file disagrees with anything else in the repo, it wins. Do not
   propose code that violates it; propose a constitution amendment first.
2. **`SEO-KNOWLEDGE-BASE.md`** (repo root) — GSC data, competitor analysis,
   page-by-page audit, keyword cluster opportunities. The single store of
   evidence used to justify every change.
3. **`SEO-PLAN-EN.md`** (repo root) — 7-phase strategic plan.
4. **`SEO-SPEC-TECHNICAL.md` / `-CTR.md` / `-BLOG.md` / `-PAGES.md` /
   `-OFFPAGE.md`** (repo root) — seed specifications with detailed
   before/after code blocks, used as input to the spec-kit workflow.
5. **`specs/<###-feature>/`** — current feature artifacts (spec, plan,
   tasks, contracts, quickstart) produced by `/speckit.specify`,
   `/speckit.plan`, `/speckit.tasks`. **For implementation, read this
   feature directory first**, then any referenced `SEO-SPEC-*.md` section.

## Roles & strict workflow boundary

This project enforces a **two-agent split**:

- **Planning Agent** (this assistant). Authors the constitution,
  specifications, plans, and task lists. **MUST NOT** write production
  code. **MUST NOT** run `/speckit.implement`. Only edits under
  `.specify/`, `specs/`, and project-meta files (`CLAUDE.md`,
  `AGENTS.md`).
- **Implementation Agent** (separate, cold-start). Reads
  `specs/<feature>/quickstart.md` first, then `tasks.md`, then executes
  tasks in order. Has no access to the Planning Agent's conversation
  history. Writes code under `src/`. Runs every V-* verification task
  before claiming completion.

If the user asks the Planning Agent to write code, the Planning Agent
**MUST** decline and remind the user of this boundary.

## Spec-kit slash-command flow

| Command | Phase | Output |
|---|---|---|
| `/speckit.constitution` | (one-time, amendments only) | `.specify/memory/constitution.md` |
| `/speckit.specify <prompt>` | Feature scoping | `specs/<feature>/spec.md` + `checklists/requirements.md` |
| `/speckit.clarify` | Optional (resolve `[NEEDS CLARIFICATION]`) | Updates `spec.md` |
| `/speckit.plan` | Design | `specs/<feature>/{plan,research,data-model,quickstart}.md` + `contracts/` |
| `/speckit.tasks` | Task breakdown | `specs/<feature>/tasks.md` |
| `/speckit.analyze` | Compliance check | Constitution gate report |
| `/speckit.implement` | **Implementation Agent only** | Code under `src/` |

## Mandatory PR gates (Constitution §SEO Quality Gates)

Every PR that touches an indexable surface must:

1. Cite at least one GSC metric or competitor finding (Constitution II).
2. Pass the NAP audit:
   `grep -rn "966558352924\|966567746257\|طريق الملك فهد" src/ --include="*.tsx" --include="*.ts" | grep -v "src/constants/business.ts"` → empty.
3. Pass `npm run lint && npm run build`.
4. Pass Rich Results Test on every URL whose schema changed.
5. Show Lighthouse mobile SEO ≥ 95 on every changed page.
6. Update `src/app/sitemap.ts` and `src/app/robots.ts` for any new public route.
7. Document post-merge actions (GSC URL Inspection, GBP, citations).

## Current feature pointer

[The most recent `/speckit.plan` run updates the line below to point to
that feature's plan.]

**Active plan:** [`specs/001-phase1-technical-fixes/plan.md`](specs/001-phase1-technical-fixes/plan.md)
**Active spec:** [`specs/001-phase1-technical-fixes/spec.md`](specs/001-phase1-technical-fixes/spec.md)
**Active quickstart:** [`specs/001-phase1-technical-fixes/quickstart.md`](specs/001-phase1-technical-fixes/quickstart.md)
<!-- SPECKIT END -->
