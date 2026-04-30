# Research: Phase 1 — Critical Technical SEO Fixes

**Feature**: `001-phase1-technical-fixes`
**Date**: 2026-04-27
**Author**: Planning Agent

## Status

`spec.md` was authored without `[NEEDS CLARIFICATION]` markers. The
project's stack is locked by Constitution §"Technology Stack &
Constraints" — no novel technology is introduced. This research
document therefore contains **only the small number of design choices
the Planning Agent made on behalf of the Implementation Agent**, each
with rationale and rejected alternatives.

---

## R-1 — Permanent redirect mechanism (US-3)

**Decision**: use `permanentRedirect()` from `next/navigation` inside
the existing route files (`src/app/curtains/page.tsx`,
`src/app/kitchens/page.tsx`).

**Rationale**:
- Smallest possible diff — the files already exist as redirect-only
  routes. Swapping the imported function plus the call site is a
  one-line semantic change.
- `permanentRedirect()` emits HTTP **308**, which is the modern HTTP
  status with identical SEO behavior to **301** (Google explicitly
  treats them the same for link-equity consolidation).
- Keeps redirect logic colocated with the route, easier to discover.

**Alternatives considered & rejected**:

- **Move redirects to `next.config.ts`** via the `redirects()`
  function with `permanent: true`. *Rejected*: same SEO effect, but
  introduces a new config touchpoint and forces deletion of the route
  files. Wider blast radius.
- **Leave 307**. *Rejected*: violates the citation in
  `SEO-KNOWLEDGE-BASE.md §12 CRITICAL` and loses any link equity
  pointing at `/curtains` and `/kitchens`.

---

## R-2 — Location of `/products` and `/decor` enrichment copy (US-4)

**Decision**: define `productsCopy: string` and `productsFaq: FAQItem[]`
as inline `const`s at the top of `src/app/products/page.tsx`. Same
pattern for `/decor`.

**Rationale**:
- One file, one purpose — the copy is page-specific and unlikely to be
  reused.
- Avoids creating a new `src/data/staticCopy.ts` with one consumer
  (premature abstraction).
- Trivially diffable in PR review.

**Alternatives considered & rejected**:

- Move to `src/data/staticCopy.ts`. *Rejected*: adds indirection
  without payoff.
- Move to JSON file under `src/content/`. *Rejected*: requires
  build-time imports and a typed loader; out of scope for Phase 1.
- Pull copy from a CMS. *Rejected*: no CMS exists; introducing one is
  multi-feature scope.

---

## R-3 — Encoding `BUSINESS.phone.whatsappLink`

**Decision**: implement as a TypeScript getter that returns
`https://wa.me/${primary.replace('+', '')}?text=${encodeURIComponent(waMessage)}`.

**Rationale**:
- Encapsulates URL encoding (Arabic message) so callers cannot forget
  to encode.
- `as const` on the parent object preserves literal types except for
  the getter return, which is acceptable.
- A single call site can override the encoded message in the rare case
  where a custom WhatsApp text is needed (e.g., quote-request flow) by
  composing manually — but the default getter handles the common case.

**Alternatives considered & rejected**:

- **Plain string**. *Rejected*: introduces drift between the encoded
  link in the constants module and any caller that forgets to encode.
- **Function call** (`whatsappLink()`). *Rejected*: callers in JSX
  prefer property access over function-call syntax; getter satisfies
  both ergonomics.

---

## R-4 — Forbidden vs. optional `aggregateRating` (US-9)

**Decision**: declare `aggregateRating?` as an **optional** prop on
`ProductSchemaProps` whose docblock cites Constitution Principle III
and the GSC review-snippet drop incident; emit the schema field only
when the prop is supplied.

**Rationale**:
- Keeps the door open for the future real-reviews pipeline
  (`SEO-SPEC-OFFPAGE.md §5`) without re-opening the file.
- `JSON.stringify` drops `undefined` keys, so an unsupplied prop
  results in zero on-page footprint.
- The docblock makes intent unmistakable to future contributors —
  "test-first" via documentation.

**Alternatives considered & rejected**:

- **Remove the field entirely** and add it back later. *Rejected*:
  removing then re-adding signals indecision; the field was already
  shaped wrongly before, the safer move is to define it correctly now.
- **Throw at runtime** if a hardcoded value is detected. *Rejected*:
  runtime guards on JSON-LD generation are fragile; preferred mechanism
  is the compile-time prop type + lint-style audit (`grep`).

---

## R-5 — `WebSiteSchema` `alternateName` content (US-10)

**Decision**: include 3 documented alternate forms — `"مفروشات
العمودي"`, `"العمودي للسجاد"`, `"Al-Amoudi Furniture"` — alongside
the primary `name: "العمودي للمفروشات"` (which already lives in `name`,
not in `alternateName`).

**Rationale**:
- These three forms appear as separate query strings in GSC §4.2 with
  >200 impressions combined. Declaring them as alternate names helps
  Google consolidate brand impressions.
- Including the primary name **also** in `alternateName` is harmless
  but redundant; convention is to keep `name` as the canonical and use
  `alternateName` only for variants.

**Alternatives considered & rejected**:

- **Add Egyptian-spelling variant `"العامودي"`** (83 imp,
  pos 10.33 — `§4.2`). *Rejected* for now: it's a misspelling, not a
  brand variant. Treating misspellings as alternate names risks
  diluting brand-string match. Revisit in Phase 2 with a content/redirect
  approach.

---

## R-6 — OG image asset workflow (US-6)

**Decision**: state in §3 of `quickstart.md` and §9 of the spec that
the four OG images MUST be real binary assets (not placeholders); if
the design team has not delivered them, fall back to existing
`/og-image.jpg` as `temporary_fallback: true` and log a follow-up TODO
in the PR description with a deadline.

**Rationale**:
- Real per-page OG images are the single biggest social-CTR lever for
  category URLs.
- Placeholder PNGs (e.g., a bright red 1200×630 with the slug name)
  would technically pass V-OG but fail V-OG-PREVIEW visually.
- A documented fallback prevents the PR from blocking on asset
  delivery — but forces a follow-up.

**Alternatives considered & rejected**:

- **Block the PR until assets land**. *Rejected*: couples engineering
  velocity to design throughput.
- **Ship without OG images**. *Rejected*: regression vs. current
  behavior (homepage OG image still applies as fallback).

---

## R-7 — How `/products/[id]` resolves the title-suffix collision (US-2)

**Decision**: strip any trailing `| العمودي للمفروشات` suffix from
`product.title` at metadata-generation time using the regex
`/\s*\|\s*العمودي للمفروشات.*$/`. Use the cleaned title for the
metadata `title` (so the layout template can append the brand once)
and use `${cleanTitle} | العمودي للمفروشات` for the OG title (because
OG titles are not templated).

**Rationale**:
- Many entries in `src/data/products.ts` already include a brand
  suffix; the regex is a no-op for entries that don't.
- Anchoring with `$` and using a non-greedy match against everything
  after the brand handles future variations like
  `| العمودي للمفروشات | الرياض` without false negatives.

**Alternatives considered & rejected**:

- **Edit every product title in the data file** to remove the brand
  suffix. *Rejected*: bigger diff in `products.ts`, risk of breaking
  in-page H1s or descriptions that legitimately reference the brand.
- **Drop the layout template** and rely on per-page brand suffixes.
  *Rejected*: violates the locked stack constraint in Constitution
  §Technology Stack and complicates Phase 2 CTR rewrites.

---

## R-8 — GA4 install method (US-7)

**Decision**: configure existing `NEXT_PUBLIC_GA4_ID` env var in Vercel;
**no code change**. The existing `gtag` block in
`src/app/layout.tsx` lines 120-128 already honors the var.

**Rationale**:
- The cheapest possible change. Code is already correct.
- Avoids touching the Google Ads tag (`AW-17506948956`) which the
  business depends on.

**Alternatives considered & rejected**:

- **Replace the inline `<Script>` with a custom React component**.
  *Rejected*: refactor without ranking benefit; Phase-1 is correctness
  only.
- **Use Next.js `@next/third-parties` GoogleAnalytics component**.
  *Rejected*: adds a dependency; existing inline code is documented
  and works.

---

## Open questions

None. All design decisions above are final. No `[NEEDS CLARIFICATION]`
markers remain.

## Sources cited

- `SEO-KNOWLEDGE-BASE.md` §4.2, §4.7, §4.8, §4.11, §5, §12 — page
  audit, indexing status, review-snippet trend, prioritized issue
  list.
- `SEO-PLAN-EN.md` Phase 1 — strategic framing.
- `SEO-SPEC-TECHNICAL.md` §1–10 — authoritative before/after code that
  the Implementation Agent will follow.
- `.specify/memory/constitution.md` v1.0.0 — non-negotiable principles.
