# Elamoudi Furniture (elamoudifurniture.com) — Constitution

Binding rules for every change to this site. Each one is here because breaking it already cost
this site, or a sister site in the same agency, something real.

## Core principles

### I. No number or claim without a source (non-negotiable)

Every price, time, warranty, rating, count or "free" promise shown to visitors or to Google must
come from the owner or from an official measurement export.

- No placeholder numbers in structured data (no invented `aggregateRating`, no price `0`).
- Keywords come from Search Console and Google Ads search terms, not guesses.

**Why:** the site carried «تركيب مجاني», «التوصيل مجاني», «1-3 أيام عمل» and «ضمان شامل» that the owner
never confirmed. A sister site's fake 4.8/150 rating likely broke its product rich results.

### II. Verify on the live output, not on the code

A change is done only when it is visible in the built HTML and then on the live domain.

- `grep` the build output, then `curl` the live URL after deploy.
- Deploys go through GitHub Actions to Cloudflare Workers on push to `main`. Never `vercel --prod`.

### III. Every page earns its own place

No two pages, here or on a sister client's site, share a text skeleton.

- Run `node C:/Users/mohammed/.claude/scripts/dupcheck.mjs elamoudi` after publishing; every page < 30%.
- Sister sites (mafrushat-alsurye, mafroshat-elriyadh, mokeet-elsuarye) were forked from this
  codebase. Their topics are off-limits unless the angle is clearly different (see «Lanes»).

### IV. Few changes, batched and measured

Ranking and ad learning both suffer from churn. The user: «مش عايز تغيير كتير… ده بيأثر بالسلب».

- A page's title or description is locked for 21 days after a change (dates in `seo-log/elamoudi.md`).
- Changes ship in one planned weekly release, never as a stream of small edits.
- Each release records what changed, why, and the date to judge it.

### V. Only this shop's own assets

Photos, names and phone numbers belong to Elamoudi alone. Photos byte-identical to another client's
site or ads are not used. No other client's tracking tag ships in this build.

**Why:** rubber photos from another shop's site and another account's Ads tag both shipped here once.

## Market context

- **The shop:** a furnishing and flooring shop in Riyadh. Visitors arrive on mobile (about 75% of
  impressions). The conversion is a phone call (calls close) or WhatsApp (mostly price questions).
- **Products the owner actually closes:** parquet, vinyl (Belgian and regular), and medical vinyl
  for rooms.
- **Ads:** the same products run as Google Ads, so their landing pages serve both SEO and the ads'
  page-experience score.

## Lanes (sister clients of the same agency)

| Site | Owns |
|---|---|
| **elamoudi (this site)** | The home as one project: rooms, decor, carpet and rugs, garden. Parquet and vinyl from the *home-room* angle. |
| mafrushat-alsurye | Spec and price catalogue, material comparisons. |
| mafroshat-elriyadh | Sector guides: gyms, hospitals, offices, shops, mosques. |
| mokeet-elsuarye | Rubber flooring: gyms, bathrooms, stables. |

## Quality gates (in order; any failure stops the release)

1. `npx tsc --noEmit` is clean and `npm run lint` passes.
2. `npm run build` succeeds and generates every page.
3. The change is checked in the build output.
4. Deploy, then `curl` the live domain.
5. Run dupcheck for any new or rewritten text.
6. The commit message says **why**. It ends with the trailer
   `Assisted-by: Claude (Anthropic) — review, planning & commit message (not code authorship)`.

## Governance

This constitution outranks style preferences. A direct request from the user or the owner is
carried out; any conflict with a principle is written into the commit message with its expected
effect. Amendments need the user's explicit approval.

**Version**: 1.0.0 | **Ratified**: 2026-10-27 | **Last amended**: 2026-10-27
