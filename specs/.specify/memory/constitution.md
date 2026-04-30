<!--
SYNC IMPACT REPORT
==================
Version change: (initial) → 1.0.0
Bump rationale: First ratification of the project constitution. Establishes seven
non-negotiable principles, technology constraints, and an SEO quality-gate workflow.

Modified principles: N/A (initial ratification)
Added sections:
  - Core Principles (I–VII)
  - Technology Stack & Constraints
  - SEO Quality Gates & Development Workflow
  - Governance

Removed sections: N/A

Templates / artifacts requiring updates:
  - .specify/templates/plan-template.md         ⚠ pending — add a "Constitution Check"
                                                 sub-section that verifies each principle
                                                 (Arabic-first, GSC-justified, schema integrity,
                                                 NAP consistency, verification-before-done,
                                                 mobile-first/CWV, no black-hat).
  - .specify/templates/spec-template.md         ⚠ pending — every spec must include a
                                                 "GSC evidence" field and an "Acceptance
                                                 criteria" block.
  - .specify/templates/tasks-template.md        ⚠ pending — task categories must include
                                                 verification tasks (Rich Results Test,
                                                 curl/header check, Lighthouse, GSC inspection)
                                                 and NAP-consistency tasks.
  - .specify/templates/checklist-template.md    ✅ no change required (generic).
  - CLAUDE.md / AGENTS.md                       ⚠ pending — add a one-liner pointing agents
                                                 at this constitution as the source of truth.
  - SEO-SPEC-TECHNICAL.md / -CTR / -BLOG /
    -PAGES / -OFFPAGE.md                        ✅ aligned (these are the seed specs and were
                                                 written under these principles even though
                                                 the constitution post-dates them).

Deferred TODOs:
  - TODO(RATIFICATION_DATE_CONFIRMED): the date below (2026-04-27) is the date the
    constitution was first written. Owner to confirm whether to backdate to the start
    of the audit cycle.
  - TODO(REAL_REVIEWS_PIPELINE): Principle III bans fake aggregateRating; an explicit
    review-collection design is referenced from SEO-SPEC-OFFPAGE §5 and will be promoted
    to a separate spec when implementation starts.
-->

# Al-Amoudi Furniture SEO Constitution
<!-- العمودي للمفروشات — دستور تحسين محركات البحث -->

> **Project:** elamoudifurniture.com — an Arabic-language Next.js 16 storefront
> for a Riyadh-based carpet, flooring, and home-furnishing retailer.
> **Constitution scope:** every SEO-related change to this site (on-page,
> technical, content, off-page). Every spec, plan, task, and PR
> in this repository **MUST** comply with the principles below.

## Core Principles

### I. Arabic-First, Saudi-Targeted (NON-NEGOTIABLE)
Every user-facing artifact (titles, meta descriptions, H1s, body copy, FAQ,
JSON-LD `name`/`description`, OG text) **MUST** be written in Arabic with
`locale: ar_SA` and serve a Saudi audience. RTL rendering, the Cairo font,
and `lang="ar"` `dir="rtl"` markup **MUST NOT** regress. English may appear
only in source code, schema field names, and developer-only files.
**Rationale:** 89% of organic traffic and 100% of brand demand originate in
Saudi Arabia (GSC §4.4); any drift to English-first defaults erodes
ranking signals for our entire keyword universe.

### II. Data-Driven Decisions (NON-NEGOTIABLE)
Every proposed SEO change **MUST** cite at least one of:
(a) a specific Google Search Console metric (impressions, CTR, position) for
the affected query or page, or (b) a documented competitor finding, or
(c) a structured-data validator output. Vague justifications such as
"this looks better" or "industry best practice" without a citation are
**NOT** acceptable in spec, plan, or PR descriptions. The single source of
historical evidence is `SEO-KNOWLEDGE-BASE.md` and the live GSC console;
new evidence **MUST** be appended to the knowledge base when discovered.
**Rationale:** the audit found prior changes (e.g. fabricated review
ratings) that lacked evidence and actively harmed rankings; "test-first"
for SEO means "evidence-first."

### III. No Black-Hat, No Fake Signals (NON-NEGOTIABLE)
The codebase **MUST NOT** emit fabricated structured data — including but
not limited to fake `aggregateRating`, fake `Review`, fake `Offer.price`,
or fake `inventory`. Keyword stuffing in titles or descriptions is
prohibited. Paid link schemes, comment spam, and PBN backlinks are
prohibited. `aggregateRating` and `Review` JSON-LD **MUST** be populated
**only** from a verified review-collection pipeline. When real data is
absent, the field **MUST** be omitted entirely (`undefined` so
`JSON.stringify` drops it).
**Rationale:** Review-snippet count already dropped from 13 → 4
(GSC, April 15-25 2026), consistent with Google enforcement against
fabricated ratings. One manual action would erase months of legitimate
work; this principle is the cheapest insurance policy we have.

### IV. NAP Consistency — Single Source of Truth (NON-NEGOTIABLE)
Name, Address, Phone, hours, geo-coordinates, and social profile URLs
**MUST** flow from exactly one module: `src/constants/business.ts`. No
component, JSON-LD schema, footer, page metadata, or external citation
may hardcode a phone number, street address, or hours string. Any
external citation (Google Business Profile, directory listings, social
profiles) **MUST** match this module byte-for-byte. The deprecated phone
number `+966567746257` is forbidden and **MUST** be removed wherever it
appears.
**Rationale:** the audit found two different addresses and two different
WhatsApp numbers across the codebase (`SEO-KNOWLEDGE-BASE.md` §5.9). NAP
inconsistency is one of the strongest negative signals for local SEO and
directly suppresses Local Pack visibility.

### V. Verification Before Completion (NON-NEGOTIABLE)
No spec item, task, or PR may be marked "done" until its **acceptance
criteria** have produced a passing verification artifact. Acceptance
criteria **MUST** be expressed as one of: a curl/header command with the
expected output, a Rich Results Test pass screenshot/URL, a Lighthouse
score threshold, a GSC URL Inspection state, or a deterministic build
output (sitemap entry, schema validator). Tasks **MUST** include the
verification step explicitly; checking off "implementation done" without
running the verification step is a process violation.
**Rationale:** SEO changes have long, asymmetric feedback loops (days
to weeks for re-crawl). A discipline of explicit verification at merge
time prevents drift from compounding silently.

### VI. Mobile-First, Performance-Aware
All page-level changes **MUST** be designed and reviewed on a mobile
viewport first. Lighthouse SEO score on the changed page **MUST** be
≥ 95. Core Web Vitals (LCP, INP, CLS) **MUST NOT** regress on the
changed page versus the previous deploy. Heavy assets (hero images,
videos, JSON-LD) **MUST** justify their byte cost against a CWV budget;
unverified third-party scripts are forbidden in the critical path.
**Rationale:** 81.6% of traffic is mobile (GSC §4.5) and mobile users
already convert at higher CTR (3.99% vs desktop's 2.01%). Performance
is a published Google ranking factor and the cheapest CTR lever
we have on already-ranking queries.

### VII. Structured Data Integrity
JSON-LD on every page **MUST** validate in Google's Rich Results Test
without warnings on the schema types we claim to emit. Required schemas
per page type:
- Every page → `BreadcrumbList`.
- Every product page → `Product` (+ `Offer` only when a real price
  exists; never `aggregateRating` without real data).
- Layout (site-wide) → `WebSite`, `Organization`, `LocalBusiness`.
- Article pages → `Article` with `publisher.@id` referencing the
  Organization node.
- FAQ pages → exactly one `FAQPage` per URL (no duplicates).
- Contact-style pages → `ContactPage` referencing the same
  `LocalBusiness` `@id` from the layout.

A schema **MUST NOT** claim a feature the site does not implement
(e.g. `SearchAction` is forbidden until a real `/search?q=` route
exists). Schema entities for the same business **MUST** share `@id`s
across pages.
**Rationale:** structured data is how we earn rich snippets; misconfigured
or duplicated schemas trigger warnings that suppress all rich features
for the property.

## Technology Stack & Constraints

The following constraints are non-discretionary; deviations require a
constitution amendment, not a one-off override:

- **Framework:** Next.js 16 (App Router), TypeScript 5.x, React 19.
- **Routing & metadata:** Next.js Metadata API + `generateMetadata` +
  `generateStaticParams` for any indexable route. No `_document.js`,
  no Pages Router.
- **Styling:** Tailwind CSS v4 via `@tailwindcss/postcss`. No CSS-in-JS
  runtime libraries.
- **Font:** Cairo (subsets: arabic + latin), `display: swap`.
- **Images:** `next/image` only. WebP + AVIF. Every `<Image>` **MUST**
  have a non-empty Arabic `alt`.
- **Redirects:** Permanent redirects use `permanentRedirect()` from
  `next/navigation` (308) or `redirects()` in `next.config.ts`
  (`permanent: true`). Use of `redirect()` for SEO-relevant URL changes
  is forbidden because 307 does not consolidate link equity.
- **Title template:** Root layout owns `title.template = "%s | العمودي
  للمفروشات"`. Page-level `title` strings **MUST NOT** include the
  brand suffix; product titles in the data layer **MUST** be stripped of
  pre-existing brand suffixes before being passed to metadata.
- **Hosting:** Vercel. Environment variables: `NEXT_PUBLIC_SITE_URL`
  (required), `NEXT_PUBLIC_GA4_ID` (required in Production).
- **Analytics:** Google Ads tag `AW-17506948956` + GA4. No additional
  trackers without a privacy review.
- **Sitemap:** `src/app/sitemap.ts` is the single source of truth for
  indexable URLs and **MUST** include every new public route in the
  same PR that introduces the route.
- **Robots:** allow-list approach in `src/app/robots.ts`; new public
  paths must be explicitly allowed.

## SEO Quality Gates & Development Workflow

Every PR that touches an indexable surface (any file under `src/app/`,
`src/components/seo/`, `src/data/`, `src/constants/business.ts`, or
`public/og/`) **MUST** clear these gates before merge:

1. **Constitution Check** (the principles above): each PR description
   includes a checkbox for I–VII confirming compliance.
2. **GSC evidence cited** (Principle II): the description names at
   least one keyword/page metric or competitor finding the change
   serves.
3. **Build & lint:** `npm run lint` and `npm run build` pass locally
   and in CI.
4. **NAP audit** (Principle IV) when relevant:
   `grep -rn "966558352924\|966567746257\|طريق الملك فهد" src/
   --include="*.tsx" --include="*.ts"` returns zero hits outside
   `src/constants/business.ts`.
5. **Structured-data validation** (Principle VII): paste the Rich
   Results Test result URL for each new/changed page schema in the PR.
6. **Smoke crawl** (Principle V): for routing changes, run the curl
   smoke loop in `SEO-SPEC-TECHNICAL.md` cross-cutting verification
   and paste the output.
7. **Sitemap & robots updated** when adding routes.
8. **Mobile + Lighthouse** (Principle VI): Lighthouse SEO ≥ 95 on the
   changed page, attached as a screenshot or numeric report.
9. **Post-merge actions** documented in the PR description: GSC URL
   Inspection requests, social-profile updates, citation updates.

The five seed specs (`SEO-SPEC-TECHNICAL.md`, `-CTR.md`, `-BLOG.md`,
`-PAGES.md`, `-OFFPAGE.md`) at the repository root are reference
material; new work proceeds under the spec-kit workflow
(`/speckit.specify` → `/speckit.plan` → `/speckit.tasks` →
`/speckit.implement`) and **MUST** cite the relevant section of the seed
specs as input.

## Governance

This constitution supersedes any conflicting practice, README guidance,
or ad-hoc decision recorded elsewhere in the repository. When a code
review surfaces a conflict, the constitution wins; if the constitution
is wrong, fix the constitution by amendment first, then update the code.

**Amendment procedure.** Any contributor may propose an amendment by
opening a PR that edits this file together with all dependent templates
flagged in the resulting Sync Impact Report. The PR description
**MUST** include: (a) the version bump and rationale, (b) the diff of
principles or sections, (c) a migration note for any existing code that
becomes non-compliant under the amendment.

**Versioning policy** (semantic):
- **MAJOR**: a non-negotiable principle is removed, replaced, or
  redefined in a way that invalidates existing artifacts.
- **MINOR**: a new principle or section is added; an existing principle
  is materially expanded.
- **PATCH**: clarifications, wording fixes, typo corrections, or
  evidence updates that do not change the substantive rules.

**Compliance review.** At the end of every spec-kit `/speckit.analyze`
run, the agent **MUST** check the proposed plan/tasks against this
constitution and emit a "Constitution Compliance" section. Reviewers
treat any violation as a blocking comment.

**Runtime guidance.** For day-to-day implementation guidance, see the
five seed specs at the repository root and the per-feature
`specs/<feature>/` artifacts produced by `/speckit.specify`. When this
constitution and a seed spec disagree, the constitution wins.

**Source of truth for evidence.** `SEO-KNOWLEDGE-BASE.md` is the
authoritative store of GSC data, competitor analysis, and audit
findings. New evidence **MUST** be appended there with a date stamp;
specs reference it by section number.

**Version**: 1.0.0 | **Ratified**: 2026-04-27 | **Last Amended**: 2026-04-27
