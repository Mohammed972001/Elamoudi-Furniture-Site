# Tasks: SEO + GEO relaunch for elamoudifurniture.com

**Input**: Design documents from `specs/002-seo-geo-relaunch/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/content-contract.md, quickstart.md

**Tests**: no automated test suites; the client-site-testing policy applies. Each task is verified
through the release gates in `quickstart.md`: types, lint, build, a grep of the build output, a
live curl and dupcheck.

**Releases**: `(R0)`…`(R10)` marks the weekly release a task ships in (plan.md, «Release calendar»).
Nothing ships outside its release. Titles stay locked for 21 days.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: can run in parallel (different files, no dependency on an unfinished task).
- **[Story]**: US1…US5 from spec.md.
- **Owner**: marks input that the shop owner must supply through the user.

---

## Phase 1: Setup and baseline (W1, R0; no site changes)

**Purpose**: record the starting point and collect owner inputs. Nothing on the site changes.

- [x] T001 Create `C:/Users/mohammed/.claude/scripts/seo-report-elamoudi.mjs`. It pulls Search Console data for the last 28 days and the 28 days before: totals; clicks per page and per query with brand and non-brand split by the regex `العمودي|عمودي|العامودي`; and positions of parket, vinyl-roll and turky-mshager. It also pulls GA4 `contact_click` by session source and URL Inspection for every sitemap URL. Output is markdown, using the key from `google-sa.mjs`. Never put the script in the repo.
- [x] T002 Run T001 and paste the baseline into `C:/Users/mohammed/.claude/scripts/seo-log/elamoudi.md` under «2026-10-28 R0 baseline», with the figures behind each spec success criterion (SC-001…SC-008).
- [x] T003 [P] Record mobile PageSpeed (LCP, CLS, INP) for /, /products/parket, /products/vinyl-roll, /products/turky-mshager, /products/hospital-flooring and /carpets in `seo-log/elamoudi.md`.
- [ ] T004 [P] Ask the 10 fixed questions (research.md R5) in ChatGPT, Gemini, Perplexity and a Google search with AI Overview. Log one row per answer (data-model «AI check») in `seo-log/elamoudi.md`. *Run on 4 Nov from the built-in browser: Google AI Mode 10 of 10, Perplexity 8 of 10, Gemini 3 of 10, ChatGPT 5 of 10 (signed in, temporary chats). Rows are in seo-log/elamoudi.md. The shop's real address is still being settled, so the «wrong address» notes there are provisional.*
- [x] T005 [P] Write the owner request in Egyptian Arabic for the user to forward (plan.md, «Owner inputs», items 1–5) to `specs/002-seo-geo-relaunch/owner-request.md`.
- [x] T006 Record the user's answers to Q1 (garden) and Q2 (lane) in spec.md under «Decisions». Update article 6 in plan.md's content map to match. *Q1 = C, Q2 = A, 27 Oct.*

**Checkpoint**: the baseline is logged, owner inputs are requested, and Q1 and Q2 are answered.

---

## Phase 2: Foundation (W2, R1; blocks every story)

**Purpose**: indexing, the entity and trust fixes that every later page relies on.

- [x] T007 Extend `src/constants/business.ts` with `id` (`https://www.elamoudifurniture.com/#business`), `sameAs` (Owner-confirmed; may be empty), `knowsAbout` (product names from `src/data/products.ts`) and `facts` (Owner-confirmed, each with a source note).
- [x] T008 Make every JSON-LD block in `src/components/seo/JsonLd.tsx` reference the business `@id` and read name, phone, address and hours only from `business.ts`. Remove any duplicate business node. Verify in the build output that `/` and `/products/parket` each emit exactly one business entity.
- [x] T009 [P] In `src/app/sitemap.ts`, replace the build-time `new Date()` with a real `lastModified` per page: a `updated` date in product data, and the article date later. Keep /kitchens and /curtains (308) out of the sitemap.
- [x] T010 [P] Remove or reword every claim the owner did not confirm (T005 item 1). Search all of `src/` for «تركيب مجاني», «توصيل مجاني», «التوصيل مجاني», «1-3 أيام», «أسعار جملة», «ضمان» and «مجاني», and list each hit and its fate in the commit message.
- [x] T011 [P] For the 3 rubber pages and /decor, read the URL Inspection result from T001. Fix the cause (thin content, canonical, or no internal links), or record the decision to leave them in `seo-log/elamoudi.md`. *Done 3 Nov: all four were already linked from /products; the footer now links gym, bathroom and horse rubber and foam on every page. /decor is indexed. gym-rubber and horse-rubber stay on the manual indexing list.*
- [x] T012 [P] Photo audit across `public/` and `src/data/products.ts`: *Done 3 Nov: 24 images compressed, photos with a person who might be a woman removed. Closed 4 Nov: the user decided shared photos stay as they are, and not to raise them again.*
  - flag any image identical to another client's site or ads by comparing hashes with the sister repos under `D:/work/`;
  - add descriptive Arabic alt text where it is missing;
  - compress images over 250 KB.
- [x] T013 Add `src/app/llms.txt/route.ts` as a static route that generates the format in `contracts/content-contract.md` from `business.ts` and `products.ts`. Check that `/llms.txt` returns 200 as `text/plain` after the build.
- [x] T014 [P] Add the IndexNow key file to `public/` and the script `C:/Users/mohammed/.claude/scripts/indexnow.mjs <site> <urls…>`. Prepare the Bing Webmaster Tools import-from-Search-Console steps in Arabic for the user. Bing needs the user's sign-in. *Bing steps are in gbp-and-directories.md; the import needs the user.*
- [x] T015 Ship R1 with `quickstart.md` steps 3–10. Ping IndexNow with all sitemap URLs and log the release.

**Checkpoint**: the entity is unified, claims are clean, llms.txt is live, the site is submitted to Bing, and every sitemap URL is indexed or has a decision.

---

## Phase 3: User Story 1, homeowner searching parquet or vinyl for a room (P1) 🎯 MVP

**Goal**: the closing-line pages answer room questions and convert to calls.
**Independent test**: after R2 and R3, the positions of parquet, vinyl and medical vinyl in Search Console improve over 4 weeks, and the rich-results test is valid.

- [ ] T016 [US1] *Drafted on branch `002-r2-prep` with the owner's answers of 4 Nov; the user reads the final sentences before it ships.* Add `answer`, `rooms`, `faq` and `titleLockedUntil` to the product type and to the parket, vinyl-roll and hospital-flooring entries in `src/data/products.ts`:
  - FAQ questions come from GSC and Ads search terms («باركيه حمامات», «باركيه خشب ضد الماء», «افضل انواع الفينيل», «فينيل بديل الباركيه», «ارضية مستشفيات»);
  - answers are Owner-confirmed;
  - there are no numbers without a source.
- [ ] T017 [US1] *Built on branch `002-r2-prep`; the prompt reads «أرسل صورة المكان على الواتساب» to match the site's Arabic.* In `src/app/products/[id]/ProductView.tsx`, render:
  - the answer-first paragraph under the H1;
  - the call button first and WhatsApp second, then the prompt «ابعت صورة المكان على واتساب», keeping `adSource.ts` behaviour;
  - the «حسب الغرفة» section;
  - the FAQ through `src/components/seo/FAQ.tsx`, with FAQPage JSON-LD of the same text.
  Pages without the new fields must render as before.
- [ ] T018 [US1] *The guard denies a new parket title because the page brings contacts. «معاينة وقياس مجاناً» in its description stays: the owner confirmed free inspection on 4 Nov.* Change the parket title and description only if its lock (2026-11-07) has passed by R2. Set new `titleLockedUntil` dates 21 days out and mirror them in `seo-log/elamoudi.md`.
- [ ] T019 [US1] Ship R2 (W3), Run the rich-results test on the 3 pages and log the release, noting it as a landing-page change for the ads.
- [ ] T020 [US1] Build the articles section: *Built on branch `relaunch/R3-articles` on 8 Nov, with no article yet: while the list is empty, /articles is a 404 and the sitemap, llms.txt and nav leave it out. Ships in R3 with T021.*
  - `src/data/articles/types.ts` and `src/data/articles/index.ts`, following data-model «Article»;
  - `src/app/articles/page.tsx` (index);
  - `src/app/articles/[slug]/page.tsx` with `generateStaticParams`, `dynamicParams = false`, Article and Breadcrumb JSON-LD and a table of contents for more than 4 sections;
  - articles added to `src/app/sitemap.ts` and `src/app/llms.txt/route.ts`;
  - a nav link «مقالات» in `src/constants/navigation.ts`.
- [ ] T021 [US1] Write article 1, «باركيه للحمامات والمطابخ: ينفع ولا لأ؟», in `src/data/articles/parquet-bathrooms-kitchens.ts`, following `contracts/content-contract.md`. Use the plan's content map row 1 for its queries and links. Run dupcheck (under 30%) before release. Ships in R3.
- [ ] T022 [US1] Write article 4, «أنواع الفينيل للبيت…», in `src/data/articles/vinyl-types-home.ts`. Because it has the highest overlap risk, compare section by section with alsurye's «دليل-ارضيات-الفينيل-رول» before release. Ships in R6.
- [ ] T023 [US1] Write article 5, «تركيب الباركيه والفينيل فوق السيراميك…», in `src/data/articles/over-tiles.ts`. Ships in R7.
- [ ] T024 [US1] Add in-text links from parket, vinyl-roll and hospital-flooring to articles 1, 4 and 5 in `src/data/products.ts` once each is live.

**Checkpoint**: US1 works on its own: 3 deep product pages and 3 room-angle articles, all linked both ways.

---

## Phase 4: User Story 2, an AI assistant names the shop correctly (P1)

**Goal**: the shop is one clear, consistent entity that assistants can cite.
**Independent test**: the monthly AI check (T004 questions) shows the shop named or cited correctly in 3 or more of the 10 questions by W12.

- [x] T025 [US2] Rewrite the entity part of `src/app/about/page.tsx` with Owner-confirmed facts only: who the shop is, the city, what it sells, how to order. Name it as «العمودي للمفروشات — الرياض». Include no statement about other businesses. *Done 4 Nov with the facts in business.ts. Fountains and plants wait for the owner; curtains, decor and sofas return with his photos. Title locked until 2026-11-25.*
- [x] T026 [P] [US2] Prepare the exact Business Profile text in Arabic in `specs/002-seo-geo-relaunch/gbp-and-directories.md`: name, categories, description, products list, hours, phone and photo list. The user or owner applies it in W6. *Written 3 Nov as a new profile. On 4 Nov the user's Business Profile account turned out to hold 4 profiles, none verified, one being «مفروشات وموكيت العمودي», marked duplicate. The file waits for the user to say which listing and address are this shop's.*
- [x] T027 [P] [US2] *List written 4 Nov; signing up needs the user, and live URLs get recorded as they appear.* In the same file, list 5–10 Saudi directories and Bing Places, with identical name, phone and address and the site URL. The user submits them; the file records each URL once it is live.
- [ ] T028 [US2] Once the Business Profile URL exists, add it to `business.sameAs` in `src/constants/business.ts` (ships in the next release).
- [x] T029 [US2] *Written 4 Nov in gbp-and-directories.md; it goes out once the profile exists.* Prepare a review-request message in Arabic, with the Business Profile review link, for the owner to send to recent customers (W7). Do not show or mark up any rating until real reviews exist (FR-018).
- [ ] T030 [US2] Repeat the AI check in W8 and W12 with the same 10 questions and 4 assistants. Log the rows in `seo-log/elamoudi.md` and note any wrong details for the next entity fix.

**Checkpoint**: entity data is identical on the site and off it; AI visibility is tracked against the baseline.

---

## Phase 5: User Story 3, a family furnishing a new home as one project (P2)

**Goal**: own the «home as one project» angle that no sister client covers.
**Independent test**: articles 2 and 6 gain impressions on queries no sister site ranks for, and every page stays under 30% in dupcheck.

- [ ] T031 [US3] Write article 2, «أرضيات البيت غرفة غرفة…», in `src/data/articles/home-room-by-room.ts`, linking parket, vinyl-roll, turky-mshager and mokite. Ships in R4.
- [x] T032 [US3] Act on decision Q1 = C (moved to R1): 301 `/garden` and `/products/garden-flooring` to `/products/artificial-grass` in `next.config.ts`, drop both from `src/app/sitemap.ts`, and fix any internal links to them. Decide `/products/shlal` and `/products/planets` once the owner answers. The original options were:
  - **A**: rebuild it with real projects and photos (Owner).
  - **B**: re-angle it around supplied artificial grass, fountains and plants.
  - **C**: 301 to `/products/artificial-grass` in `next.config.ts` and remove it from the sitemap.
  Ships in R1.
- [ ] T033 [US3] Write article 6, majlis decor (Q1 = C), in `src/data/articles/majlis-decor.ts`, only if the owner confirms a decor range. Ships in R8.
- [ ] T034 [US3] Fix `/decor` (`src/app/decor/`). Either add real decor content from the owner's range, with links to carpets and articles, or remove it from the sitemap if the owner has no decor range. Ships in R4.
- [ ] T035 [US3] Decide /products/mokite using W1 and W3 data. Either rebuild it around home carpet by room, or 301 it into `/carpets` and update the links in `src/data/products.ts`. Ships in R3.

**Checkpoint**: the home-project angle is live, with 2 articles plus the garden or decor page.

---

## Phase 6: User Story 4, buyer searching Turkish or patterned carpet (P2)

**Goal**: turn page-1 impressions on «موكيت تركي / مشجر» into clicks.
**Independent test**: compare CTR on these queries for the 4 weeks before and after R3.

- [ ] T036 [US4] Add `answer`, `rooms` (majlis, bedroom, guest room) and `faq` (5 questions from «موكيت تركي», «موكيت مشجر», «الوان موكيت مشجر») to turky-mshager and water-resistant-carpet in `src/data/products.ts`.
- [ ] T037 [US4] Write a new title and description for turky-mshager that names «موكيت تركي مشجر بالرياض» and the colours and patterns, and set `titleLockedUntil` 21 days out. Ships in R3.
- [ ] T038 [US4] Write article 3, «الموكيت التركي المشجر: تختار اللون والنقشة إزاي لكل غرفة», in `src/data/articles/turkish-carpet-colours.ts`. Check it against alsurye «اختيار-سجاد-المجلس» with dupcheck. Ships in R5.

**Checkpoint**: the Turkish carpet page and its article are live and linked.

---

## Phase 7: User Story 5, the agency judging progress (P3)

**Goal**: one report every 2 weeks against the baseline.
**Independent test**: the W1 report exists, and every later report shows each success criterion with baseline → current.

- [x] T039 [US5] Extend T001's script to print the SC table (SC-001…SC-008) with baseline, current and target. SC-005 comes from the AI-check rows. *Done 5 Nov: the script prints the table first. SC-005 counts a question when any assistant's latest answer cites the shop; accuracy stays a manual call in the log.*
- [ ] T040 [US5] Produce the 2-weekly reports in W3, W5, W7, W9 and W11, and summarise each to the user in Egyptian Arabic.
- [ ] T041 [US5] Run the W8 checkpoint: re-plan W9–W12 in plan.md from the data, for example dropping or adding an article or merging a page. Get the user's go before shipping any change.

---

## Phase 8: Polish and second wave (W10–W12)

- [ ] T042 Internal-link pass: every article links to 2 or more products, and every closing-line product links to its articles. Check the live site for 0 broken internal links.
- [ ] T043 [P] Mobile speed pass on the 6 main pages. Fix the worst LCP or CLS offender per page, re-measure, and log the result (target LCP under 2.5 s, CLS under 0.1).
- [ ] T044 Expand the 2 best-moving pages and re-angle or merge the weakest (data-model lifecycle). Ships in R9 and R10.
- [ ] T045 Run a final dupcheck over all pages, confirming each is under 30%.
- [ ] T046 Write the W12 final report and the second-wave proposal (topics chosen from queries that gained impressions) in `seo-log/elamoudi.md`, and present it to the user for approval.

---

## Dependencies and execution order

- **Phase 1 → Phase 2 → stories.** No site change happens before the baseline (T002).
- **US1** needs Phase 2. T020 (articles section) blocks T021–T023, T031, T033 and T038.
- **US2** needs Phase 2 (T007, T008, T013). T026–T027 are off-site work that runs alongside.
- **US3** needs T020 and T006 (Q1). **US4** needs T016–T017, because it reuses the product fields
  and rendering.
- **US5** needs T001 and runs all through the 12 weeks.
- **Release order:** R1 = Phase 2 + T032; R2 = T016–T019; R3 = T020, T021, T035, T036, T037;
  R4 = T031, T034; R5 = T038; R6 = T022; R7 = T023; R8 = T033; R9–R10 = Phase 8.

## Parallel opportunities

- **Phase 1:** T003, T004 and T005 together.
- **Phase 2:** T009, T010, T011, T012 and T014 together (different files), then T013 and T015.
- **US2:** T026 and T027 alongside any code release.
- **Drafting:** articles can be drafted ahead of time in parallel, but each ships only in its own
  release.

## Implementation strategy

- **MVP = Phase 1 + Phase 2 + US1 (R0–R3).** It fixes the base and deepens the pages that close,
  which also helps the ads' landing-page score.
- Then US4 (cheap CTR gain on page-1 queries) and US3 (lane-owning content). US2 runs alongside
  as off-site work.
- One release a week, with nothing outside the calendar. Each release is judged on its review date
  before the next change to the same page.
