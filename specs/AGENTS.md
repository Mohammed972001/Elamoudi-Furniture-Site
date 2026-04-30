<!-- SPECKIT START -->
# Project agent guide — Al-Amoudi Furniture SEO

This file mirrors `CLAUDE.md` for non-Claude coding agents. The two
agents enforced by this project are:

- **Planning Agent** — authors `.specify/memory/constitution.md`,
  `specs/<feature>/spec.md`, `plan.md`, `tasks.md`, and updates the
  flagged spec-kit templates. **MUST NOT** write production code under
  `src/`. **MUST NOT** invoke `/speckit.implement`.
- **Implementation Agent** — cold-start; reads
  `specs/<feature>/quickstart.md` first, then `tasks.md`. Executes
  tasks in order. Runs every V-* verification task before claiming
  completion.

## Read order

1. `.specify/memory/constitution.md` (non-negotiable principles)
2. `SEO-KNOWLEDGE-BASE.md` (evidence)
3. `SEO-PLAN-EN.md` (strategy)
4. `SEO-SPEC-{TECHNICAL,CTR,BLOG,PAGES,OFFPAGE}.md` (seed specs with before/after code)
5. `specs/<active-feature>/` (current feature)

## Stack constraints (locked)

Next.js 16 (App Router), TypeScript 5.x, React 19, Tailwind CSS v4,
Cairo font, `lang="ar"` `dir="rtl"`, `locale: ar_SA`. NAP from
`src/constants/business.ts` only. Permanent redirects via
`permanentRedirect()` or `next.config.ts redirects({ permanent: true })`.

## Active plan

[Updated automatically by `/speckit.plan`.]

**Active plan:** [`specs/001-phase1-technical-fixes/plan.md`](specs/001-phase1-technical-fixes/plan.md)
**Active spec:** [`specs/001-phase1-technical-fixes/spec.md`](specs/001-phase1-technical-fixes/spec.md)
**Active quickstart:** [`specs/001-phase1-technical-fixes/quickstart.md`](specs/001-phase1-technical-fixes/quickstart.md)
<!-- SPECKIT END -->
