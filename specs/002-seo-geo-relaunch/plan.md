# Implementation Plan: SEO + GEO relaunch for elamoudifurniture.com

**Branch**: `002-seo-geo-relaunch` | **Date**: 2026-10-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/002-seo-geo-relaunch/spec.md`

## Summary

The site's average position slid from 10 to 21 between April and October 2026, and clicks are now
mostly brand searches. This plan repeats the playbook that lifted mafrushat-alsurye.com. That site
went from 19 to 64 clicks a month within one month, through a technical fix-up, a CTR and FAQ pass,
and an article section.

The plan adds two things the sister site never had:
1. **GEO.** The shop becomes an entity that AI assistants can name correctly: identical business
   data everywhere, answer-first page openings, a machine-readable summary, Bing, and a monthly
   AI-visibility check.
2. **A lane** that does not fight the sister clients: the home as one project, with parquet and
   vinyl covered from the room angle.

Work ships as **one batched release a week over 12 weeks**. Titles are locked for 21 days. Week 1
only measures and changes nothing on the site.

## Technical Context

**Language/Version**: TypeScript, Next.js 16 (App Router), React 19
**Primary Dependencies**: Tailwind CSS v4; OpenNext adapter for Cloudflare Workers
**Storage**: static data modules (`src/data/products.ts`; new `src/data/articles/`); no database for content
**Testing**: `npx tsc --noEmit`, `npm run lint`, `npm run build`, and grep of the build output plus
curl of the live site. The client-site-testing policy applies: no e2e or unit suites for content.
**Target Platform**: Cloudflare Workers. Deploy runs through GitHub Actions on push to `main`.
**Project Type**: static-first marketing website (Arabic, RTL)
**Performance Goals**: LCP under 2.5 s on mobile and CLS under 0.1 on the 6 main pages
**Constraints**:
- Titles are locked for 21 days. The current locks are parket until 2026-11-07 and
  artificial-grass until 2026-11-06.
- At most one release a week.
- Lane rules apply (constitution).
- Only the owner's facts and photos are used.
- Ads keep running on the parquet, vinyl and medical pages.
**Scale/Scope**:
- 24 URLs today, growing to about 30 (6 articles and an articles index).
- 6 product pages deepened, 3 weak pages fixed, 12 weekly releases.

## Constitution Check

| Principle | How the plan complies | Gate |
|---|---|---|
| I. No unsourced claims | FR-017 and FR-018. Claims are cleaned in R1. FAQ answers and prices come from the owner only (owner input list below). | ✅ |
| II. Verify live | Every release ends with build-output grep, live curl and a rich-results check (quickstart.md). | ✅ |
| III. Unique pages | Content map checked against sister-site articles. Dupcheck under 30% is a release gate. | ✅ |
| IV. Few changes | 12 weekly releases. A title lock table travels with the plan. Week 1 makes no changes. | ✅ |
| V. Own assets | Photo audit in R1 (tasks T012). Articles use the owner's photos or none. | ✅ |

There are no violations, so Complexity Tracking stays empty. Re-checked after design: still all ✅.

## Project Structure

### Documentation (this feature)

```text
specs/002-seo-geo-relaunch/
├── spec.md
├── plan.md              # this file
├── research.md          # decisions: lanes, GEO tactics, measurement
├── data-model.md        # content entities: article, FAQ, page registry, release, AI check
├── quickstart.md        # how to run one weekly release end to end
├── contracts/
│   └── content-contract.md   # what every product page / article / llms.txt must contain
├── checklists/requirements.md
└── tasks.md             # /speckit-tasks
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── articles/                 # NEW: index + [slug] (static, generateStaticParams, dynamicParams=false)
│   ├── products/[id]/            # ProductView gains answer-first block, room section, FAQ
│   ├── about/                    # entity facts from the owner
│   ├── llms.txt/route.ts         # NEW: machine-readable business summary (static)
│   └── sitemap.ts                # articles added; real lastModified per page
├── components/seo/               # FAQ.tsx (reuse), JsonLd.tsx (Article, FAQPage, entity @id/sameAs)
├── data/
│   ├── products.ts               # + answer, rooms, faq fields per product
│   └── articles/                 # NEW: one module per article + index
└── constants/business.ts         # single source for name, phone, address, hours, profiles
public/<indexnow-key>.txt         # NEW: IndexNow key file
```

**Structure Decision**: keep the single Next.js app.
- Articles live under `/articles` rather than `/blog`. The sister sites all use `/blog`, and a
  different path and component set keeps the codebases from converging again.
- Content stays in typed data modules, like the products.
- The measurement scripts stay **outside the repo** in `C:/Users/mohammed/.claude/scripts/`,
  because they use the service-account key, which must never be committed.

## Release calendar (one release a week)

| Week | Dates | Release | Content |
|---|---|---|---|
| W1 | 27 Oct–3 Nov | **R0: baseline only** | GSC and GA4 baseline, index report, mobile speed, AI-visibility baseline (10 questions × 4 assistants). Collect owner inputs. **No site change.** Started 27 Oct. |
| W2 | 3–10 Nov (started 3 Nov) | **R1: foundation** | Index fixes; sitemap with real dates; entity data (one `@id`, `sameAs`, about facts); llms.txt; claims clean-up (the word «مجاني» goes; «تركيب» stays, per the user on 3 Nov); /garden and /products/garden-flooring 301 to artificial grass (Q1 = C); photo and alt audit; Bing Webmaster and IndexNow. Off-site: Business Profile text handed to the owner (moved up from W6, see the GEO workstream). |
| W3 | 11–17 Nov | **R2: closing lines A** | Parquet (lock ended 7 Nov), vinyl roll, hospital/medical. Each gets an answer-first opening, a room section, 4–6 FAQ with schema, and a photo-to-WhatsApp prompt. |
| W4 | 18–24 Nov | **R3: closing lines B + articles base** | Turkish patterned carpet (snippet and content), water-resistant carpet, mokite rebuild or merge. Articles index and article 1. |
| W5 | 25 Nov–1 Dec | R4 | Article 2. /decor fix. |
| W6 | 2–8 Dec | R5 | Article 3. Off-site: Business Profile photos (owner), Bing Places, the first 5 directories. |
| W7 | 9–15 Dec | R6 | Article 4. Ask for real reviews (link sent to recent customers). |
| W8 | 16–22 Dec | R7 + **checkpoint** | Article 5. Mid-way report against every success criterion; adjust the remaining weeks. |
| W9 | 23–29 Dec | R8 | Article 6. Internal-link pass (products ↔ articles). |
| W10–11 | 30 Dec–12 Jan | R9–R10 | Expand the 2 best-moving pages; re-angle or merge the weakest; second AI-visibility check. |
| W12 | 13–24 Jan | **Final report** | All SCs versus baseline; plan the second wave. |

There is a report every 2 weeks (FR-002, SC tracking). The ads review of 3 Nov falls in W1, before
any landing page changes, so the ads results stay readable.

## Content map (first wave, 6 articles; lane option A of Q2)

| # | Article (working title) | Real queries behind it (GSC, 28 days) | Links to | Sister-site overlap check |
|---|---|---|---|---|
| 1 | باركيه للحمامات والمطابخ: ينفع ولا لأ؟ | باركيه حمام / حمامات (20 impressions @8–9), باركيه خشب ضد الماء (33 @10.1), افضل باركيه ضد الماء (8 @16.6) | parket, vinyl-roll, water-resistant-carpet | alsurye «الباركيه الطبيعي أم SPC» is a material comparison; this one is about the room. |
| 2 | أرضيات البيت غرفة غرفة: المجلس، النوم، الأطفال، المطبخ | ارضية خشبية للمنازل, أرضيات مطابخ فينيل (5 @4.4), أرضيات خشبية (11 @23) | parket, vinyl-roll, turky-mshager, mokite | No sister article is organised by room. |
| 3 | الموكيت التركي المشجر: تختار اللون والنقشة إزاي لكل غرفة | موكيت تركي (102 @8.6), موكيت مشجر (92 @8.0), الوان موكيت مشجر | turky-mshager, mokite, /carpets | alsurye «اختيار سجاد المجلس» covers loose rugs; this one covers wall-to-wall patterned carpet. |
| 4 | أنواع الفينيل للبيت: رول، بلجيكي، طبي، وأيهم لأي غرفة | افضل انواع الفينيل (10 @4.0), اشكال الفينيل, فينيل بديل الباركيه (Ads terms) | vinyl-roll, hospital-flooring, parket | alsurye «دليل الفينيل رول» covers roll specs; this one is a home-room chooser. **Highest overlap risk**: dupcheck before publishing. |
| 5 | تركيب الباركيه والفينيل فوق السيراميك: إمتى ينفع؟ | تركيب الباركيه فوق السيراميك (Ads search term 27 Oct), تركيب باركيه | parket, vinyl-roll | alsurye «كيف يتم تركيب الأرضيات» is the general process; this one is the renovation case. |
| 6 | ديكور المجلس: تنسيق الأرضية مع الستائر والإكسسوارات (Q1 = C, so no garden article) | ديكور مجالس, موكيت مجالس, موكيت تركي (102 @8.6) | /decor, turky-mshager, /carpets | Depends on the owner confirming a decor range; if he has none, the W8 checkpoint picks another topic. Check against alsurye «اختيار سجاد المجلس». |

The **second wave** is chosen in W10 from whichever of these gain impressions. It is not written in
advance.

## Product pages (closing lines first)

| Page | Today (28 days) | Work | Release |
|---|---|---|---|
| /products/parket | 606 impressions @24.3, 10 clicks | Answer-first opening; «حسب الغرفة» section; FAQ 6; snippet after the lock | R2 |
| /products/vinyl-roll | 554 @15.6, 13 clicks | Answer-first; Belgian, regular and medical explained for the home; FAQ 6 | R2 |
| /products/hospital-flooring | 197 @9.9 | Answer-first; medical vinyl for homes and clinics; FAQ 4 | R2 |
| /products/turky-mshager | 544 @13.9, 5 clicks | Snippet (no lock); colours and patterns by room; FAQ 5 | R3 |
| /products/water-resistant-carpet | 200 @9.4 | Answer-first; FAQ 4. No lock here; the 12 Oct lock is on the sister site's page of the same name | R3 |
| /products/mokite | 300 @32.0 | Rebuild around home carpet by room, or merge into /carpets (decided with the W1 data) | R3 |
| /garden, /products/garden-flooring | 350 @84.0 | Q1 = C: 301 to /products/artificial-grass, out of the sitemap | R1 |
| /products/shlal, /products/planets | 137 @20.8, 12 @10.4 | Keep or redirect once the owner says whether he sells fountains and plants | R1 or R4 |
| /decor | not indexed | Real content from the owner's decor range, or remove from the sitemap | R4 |
| rubber ×3 | not indexed on 16 Oct | Check the index reason. No new content; that is mokeet-elsuarye's lane | R1 |

## GEO workstream

1. **One entity.**
   - `constants/business.ts` is the only source for the business data.
   - JSON-LD gets one stable `@id` used on every page, `sameAs` (Business Profile, social
     profiles from the owner), `areaServed` Riyadh, and `knowsAbout` with the product list.
   - The about page states the confirmed facts.
2. **Answer-first openings** on the 6 product pages and the 6 articles (contract in
   `contracts/content-contract.md`).
3. **FAQPage** on the product pages, from real queries and the owner's answers.
4. **`/llms.txt`**: name, city, what the shop sells, how to order, and the main pages with one-line
   summaries. It is generated from the same data modules, so it can't drift.
5. **Bing Webmaster Tools** (import from Search Console) plus **IndexNow**, pinged after each release.
6. **Off-site consistency.** The Business Profile, Bing Places and 5–10 Saudi directories carry the
   identical name, phone and address. Real reviews are requested after jobs.
   - **The Business Profile moved up to W2.** The R0 check on 27 Oct showed that Google's AI Mode
     builds every «where do I buy X in Riyadh» answer from Maps listings with ratings. It also mixed
     this shop up with 3 other «العمودي» listings (أسواق الخليج، المنفوحة، طريق الملك سلمان). Without a
     correct listing of its own, the shop can't be named in those answers.
7. **Monthly AI-visibility check**: 10 fixed questions (research.md) in Google AI Mode, ChatGPT,
   Gemini and Perplexity, logged in `seo-log/elamoudi.md`. The last three need a signed-in browser.

## Owner inputs (requested in W1, through the user)

1. Confirm or deny: «أسعار جملة», free inspection, and the warranty terms (length; product,
   installation or both). Answered: installation is **not** free and a warranty exists (27 Oct); no free
   shipping, delivery in 1–3 days (3 Nov); installation per metre, wholesale yes, no 14-day returns (4 Nov).
2. Real photos: parquet and vinyl jobs in homes (bathrooms and kitchens if any), Turkish carpet in
   rooms, and decor.
3. Answers for the FAQ drafts. The questions come from search terms and the owner answers them.
4. Social profiles: done on 4 Nov. The user said on 3 Nov that there is no Maps listing: the owner creates the
   profile from gbp-and-directories.md.
5. Optional: price ranges per square metre he is willing to publish.

## Out of scope

- A price catalogue page (alsurye's lane).
- Sector guides for gyms, hospitals as institutions, offices and mosques (mafroshat-elriyadh's lane).
- New rubber content (mokeet-elsuarye's lane).
- Visual redesign.
- Paid links.
- Any change to the Google Ads campaigns.

## Risks

| Risk | Mitigation |
|---|---|
| Cannibalising a sister client on parquet and vinyl | Lane table, dupcheck gate, and a GSC check of both sites in the 2-week reports |
| Owner inputs arrive late | R1 and R3 do not depend on them except the claims; articles can use no photo rather than a borrowed one |
| Landing-page changes confuse the ads read | Changes are dated in the log. The 3 Nov ads review was dropped: the ads were stopped for payment |
| AI answers are noisy | Fixed questions, same wording, logged monthly; judged as a trend |
| Google update mid-plan | 2-week reports compare with the sister sites; if all drop together it is the market |

## Complexity Tracking

No constitution violations, so nothing to justify.
