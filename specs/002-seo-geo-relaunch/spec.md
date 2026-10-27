# Feature Specification: SEO + GEO relaunch for elamoudifurniture.com

**Feature Branch**: `002-seo-geo-relaunch`
**Created**: 2026-10-27
**Status**: Draft, waiting for the user's two decisions (see «Open decisions»)
**Input**: User: «حطلي خطة وبلان لأعادة تحسين وهيكلة السيو والجيو using spec kit الخاصين بموقع العمودي، خطة كاملة لرفع الموقع زي ما تم رفع وتحسين مفروشات السريع».

## Why now: the evidence

Search Console data, monthly. October covers the 1st to the 25th.

| Month | Clicks | Impressions | Avg position |
|---|---|---|---|
| Apr 2026 | 135 | 3,749 | 10.1 |
| Jun 2026 | 122 | 6,668 | 15.8 |
| Aug 2026 | 143 | 6,447 | 18.6 |
| Sep 2026 | 157 | 5,991 | 20.1 |
| Oct 2026 (1–25) | 89 | 4,549 | 20.8 |

**Average position has slid from 10 to 21 in six months.** Clicks are flat, and most of them are
brand searches.

**Last 28 days (27 Sep–25 Oct), by page:**

| Page | Clicks | Impressions | Position | Notes |
|---|---|---|---|---|
| Homepage | 54 | 1,471 | 12.4 | Brand searches. |
| /products/parket | 10 | 606 | 24.3 | |
| /products/vinyl-roll | 13 | 554 | 15.6 | |
| /products/turky-mshager | 5 | 544 | 13.9 | |
| /products/mokite | 2 | 300 | 32.0 | |
| /products/artificial-grass | 1 | 397 | 16.4 | |
| /garden | 1 | 354 | 84.4 | |

- About 75% of impressions are on mobile; 89% come from Saudi Arabia.

**Brand confusion.** People searching «العمودي جازان», «العمودي للمفروشات خميس مشيط», «العمودي غاليري»,
«العمودي للاثاث» and «العمودي للكهرباء» find other businesses with the same name. Google and AI
assistants cannot yet tell *which* Elamoudi this is.

**What this site lacks that the sister site mafrushat-alsurye.com got in its rescue (spec 001 there):**
- No articles at all. The April blog plan (`specs/SEO-SPEC-BLOG.md`) was never built. The sister site
  shipped 11 articles.
- No FAQ, and so no FAQPage data, on any product page. The sister site has both on its main products.
- No answer-first summaries that AI assistants can quote.
- No baseline for AI visibility, no Bing presence check, no llms.txt.
- Three rubber pages and /decor were still not indexed on 16 Oct; 21 of 24 URLs were indexed.

**What the sister site gained from the same playbook:** July 19 clicks and 1,609 impressions; August
64 clicks and 3,859 impressions. That is 3.4× the clicks within a month of its technical and content
relaunch.

## User Scenarios & Testing *(mandatory)*

### User Story 1: a Riyadh homeowner searching for parquet or vinyl for a room (Priority: P1)

A homeowner searches «باركيه حمامات», «باركيه خشب ضد الماء», «افضل انواع الفينيل» or «فينيل ارضيات الرياض».
They want to know which floor suits that room, roughly what it involves, and how to get a visit or a
price. Today the parquet page sits at position 24 and the vinyl page at 15.6, and neither answers
room-specific questions.

**Why this priority**: parquet and vinyl are what the owner actually closes and what the ads pay for.
Every organic visitor here is a call that costs no ad money.

**Independent Test**: publish the improved parquet, vinyl and medical-vinyl pages plus one
room-angle article. Then watch their position and clicks in Search Console over the next 4 weeks.

**Acceptance Scenarios**:

1. **Given** a visitor lands on the parquet page from «باركيه حمامات», **When** they read the first
   screen, **Then** they see a direct answer about parquet in wet rooms, and both a call button and
   a WhatsApp button.
2. **Given** the page is live, **When** Google's rich-results test runs on it, **Then** Product,
   BreadcrumbList and FAQPage are valid and contain no invented ratings or prices.
3. **Given** an article about room floors is live, **When** a reader reaches the section that fits
   them, **Then** an in-text link takes them to the matching product page.

---

### User Story 2: someone asks an AI assistant where to buy flooring in Riyadh (Priority: P1)

A buyer asks ChatGPT, Gemini, Perplexity or Google's AI Overview something like «وين ألقى باركيه
وفينيل في الرياض؟» or «العمودي للمفروشات وين مكانه؟». The assistant should be able to name this shop
correctly, with its city, products and contact, and cite its pages.

**Why this priority**: AI answers are now a real discovery channel. Brand confusion with other
«العمودي» businesses is a concrete risk that makes this site invisible or mis-described.

**Independent Test**: ask the same 10 fixed questions in 4 assistants. Record the answers on day 1
as a baseline, then again monthly. The test is whether the shop is named or cited, and whether the
details are right.

**Acceptance Scenarios**:

1. **Given** the entity information is published consistently (name, Riyadh address, phone, hours,
   products and the same profiles everywhere), **When** an assistant is asked «العمودي للمفروشات
   الرياض», **Then** it describes this shop, not a namesake in another city or trade.
2. **Given** a product page opens with a 2–3 sentence answer, **When** an assistant is asked that
   question, **Then** the page is eligible to be quoted. Measured by citation, not by promise.

---

### User Story 3: a family furnishing a new home as one project (Priority: P2)

A family moving into a new home in Riyadh plans floors, rugs, curtains, decor and possibly the garden
together. They search for ideas and for «تجهّز إيه قبل الزيارة». They need guidance, room by room,
that leads to one shop for all of it.

**Why this priority**: this is the angle no sister client owns. It matches what this shop sells
(carpet, Turkish patterned carpet, decor, garden), and it builds topical authority without fighting
the sister sites.

**Independent Test**: publish the first 2 home-project articles. Check in Search Console that they
gain impressions on terms no sister site ranks for, and that the dupcheck stays under 30%.

**Acceptance Scenarios**:

1. **Given** a reader opens a room-by-room article, **When** they finish a room section, **Then** they
   find the matching product page linked in the text and a way to send photos of their room on
   WhatsApp.
2. **Given** any new article, **When** dupcheck runs against the 3 sister sites, **Then** no page
   exceeds 30% similarity.

---

### User Story 4: a buyer searching for Turkish or patterned carpet (Priority: P2)

Queries «موكيت تركي» (102 impressions, position 8.6) and «موكيت مشجر» (92 impressions, position 8.0)
are already on page 1 but get almost no clicks. «الوان موكيت مشجر» also appears. The buyer wants to
see colours and patterns and to know which suits a majlis or a bedroom.

**Why this priority**: the page already sits on page 1. Better answers and a better snippet are the
cheapest gain here.

**Independent Test**: once the title lock allows it, ship the snippet and content change. Compare
click-through on these queries over the 4 weeks before and after.

**Acceptance Scenarios**:

1. **Given** the page shows in results, **When** a searcher reads the snippet, **Then** it names
   Turkish patterned carpet in Riyadh and what they will find (colours and patterns, rooms, visit or
   photos).

---

### User Story 5: the agency owner judging progress (Priority: P3)

The user reports to the shop owner. They need one place showing, every 2 weeks, organic clicks
(brand and non-brand), positions of the main pages, index coverage, organic calls and WhatsApp
taps, and AI mentions, each against the baseline.

**Why this priority**: without it the relaunch can't be judged or defended. It does not move
rankings by itself.

**Independent Test**: the first report exists in week 1 with the baseline filled in.

**Acceptance Scenarios**:

1. **Given** two weeks have passed, **When** the report is produced, **Then** every success
   criterion below has a current value next to its baseline.

---

### Edge Cases

- **The owner never provides prices.** No page shows a price; pages explain what drives the price
  and invite a visit or photos instead.
- **A title is still inside its 21-day lock** (parket until 2026-11-07, artificial-grass until
  2026-11-06). Content can change; the title and description wait.
- **A new article ranks for a sister site's query and pushes that site down.** The affected page
  is re-angled or merged in the next batched release; the lane table decides who keeps it.
- **An AI assistant keeps describing a namesake business.** Entity fixes continue: the Business
  Profile, consistent directory entries and the about page. The case is logged; no claims are made
  about the other business.
- **The garden service is no longer offered.** The garden page and its article are dropped and
  /garden redirects to the artificial-grass page (decision Q1).
- **Ads and SEO pull on the same page.** Parquet, vinyl and medical vinyl are ad landing pages. A
  change is checked against the ads' page-experience goal before release, and its date is noted
  so ad results are not misread.

## Requirements *(mandatory)*

### Functional Requirements

**Measurement first**
- **FR-001**: A baseline MUST be recorded before any site change. It covers clicks, impressions and
  positions per page and query (brand and non-brand split), index coverage, mobile speed of the
  6 main pages, organic call and WhatsApp taps, and answers from 4 AI assistants to 10 fixed questions.
- **FR-002**: Every release MUST be logged with its date, the pages it touched, the reason and the
  review date.

**Indexing and technical**
- **FR-003**: Every URL in the sitemap MUST be indexable. Any URL Google has not indexed MUST get a
  recorded reason and a fix or an explicit decision.
- **FR-004**: Internal links MUST run both ways: product pages link to their articles and articles
  link to their products in the text. There MUST be no broken internal links.
- **FR-005**: The main pages MUST load fast on a mid-range phone: LCP under 2.5 s and no layout jumps
  on the 6 main pages.
- **FR-006**: Images MUST be the shop's own, with descriptive Arabic alt text, and compressed.

**Entity and GEO**
- **FR-007**: The business identity MUST be identical everywhere: name «العمودي للمفروشات», city
  Riyadh, one phone, hours and address. That means the site, its structured data, the Google
  Business Profile, Bing Places and the directories.
- **FR-008**: The about page and structured data MUST state what distinguishes this shop: city, trade
  and products. Only facts the owner confirms are used.
- **FR-009**: Each main product page and each article MUST open with a 2–3 sentence direct answer
  (what it is, who it suits, how to order). AI assistants and snippets can quote it as is.
- **FR-010**: The site MUST publish a plain machine-readable summary of the business and its main
  pages for AI crawlers, and MUST keep AI crawlers allowed (they are today).
- **FR-011**: The site MUST be submitted to Bing, which feeds several AI assistants, and new or
  changed URLs MUST be notified to search engines when published.

**Product pages (the closing lines first)**
- **FR-012**: Parquet, vinyl roll, medical vinyl, Turkish patterned carpet, water-resistant carpet
  and hospital flooring MUST each have:
  - an FAQ of 4–6 questions drawn from real search terms and the owner's answers, with valid FAQ
    structured data;
  - a section by room or use;
  - a WhatsApp prompt to send photos of the space.
- **FR-013**: Weak pages MUST be either rebuilt with real substance or merged: mokite at position 32,
  /garden at 84, and /decor not indexed.

**Content (lane-safe)**
- **FR-014**: The site MUST gain an article section with a first wave of 6 articles on the
  «home as one project» angle (plan.md, «content map»). They are published about one a week, never
  all at once.
- **FR-015**: No article may cover a topic a sister site already covers unless the angle is clearly
  different. Each MUST pass dupcheck under 30%.
- **FR-016**: Every article MUST link in its text to at least 2 product pages, offer the call and
  WhatsApp actions, and carry Article and Breadcrumb structured data.

**Trust**
- **FR-017**: Unverified claims MUST be removed or confirmed by the owner before the relaunch ships:
  «تركيب مجاني», «التوصيل مجاني», «1-3 أيام عمل», «أسعار جملة», «ضمان».
- **FR-018**: Reviews shown or marked up MUST come from real customers. No rating data is published
  until there are real reviews behind it.

**Change discipline**
- **FR-019**: Changes MUST ship in planned weekly batches. A page's title and description are
  locked for 21 days after each change.

### Key Entities

- **Business entity**: the single identity of «العمودي للمفروشات», Riyadh. It covers the name, phone,
  address, hours, products and official profiles, and must match everywhere.
- **Page**: a product, category or article page. It has a target query cluster, a lock date, an
  owner lane, its indexing state and its metrics.
- **Query cluster**: a group of real search terms with one intent, mapped to exactly one page.
- **Release**: a dated batch of changes with its reason and review date.
- **AI check**: one of the 10 fixed questions × one assistant × a date. It records whether the shop
  was named or cited, and whether the details were right.

## Success Criteria *(mandatory)*

Baselines are from Search Console for 27 Sep–25 Oct 2026 unless stated. The targets are for the
**12 weeks to 2027-01-24**.

- **SC-001**: Clicks to non-homepage pages rise from about 70 per 28 days to **140 or more**.
- **SC-002**: Total impressions per 28 days rise from about 5,300 to **8,000 or more**.
- **SC-003**: The average position of parquet, vinyl roll and Turkish patterned carpet is
  **better than 12**. Today it is 24.3, 15.6 and 13.9.
- **SC-004**: **100% of sitemap URLs are indexed**, or each has a recorded decision. Every new
  article is indexed within 14 days of publishing.
- **SC-005**: Of the 10 fixed AI questions, the shop is correctly named or cited in **at least 3**
  across the 4 assistants. The day-1 baseline is expected to be close to 0.
- **SC-006**: Organic call and WhatsApp taps per 28 days are **1.5× the week-1 baseline**. Calls are
  reported separately, because calls close.
- **SC-007**: **Every page is under 30%** similarity to the sister sites.
- **SC-008**: **No page changes its title or description more than once in 21 days.** The release
  log has one entry per week at most.

## Assumptions

- **Lanes:** the angle defaults to option A of decision Q2. This site covers parquet and vinyl from
  the *home-room* angle; the spec and price catalogue stays with mafrushat-alsurye.
- **Owner inputs:** the owner supplies real photos, confirmations of claims, and answers to FAQ
  questions. Prices are optional; without them no price is shown.
- **Business Profile and Bing:** the user or the owner does the Business Profile and Bing account
  steps by hand. The plan prepares the exact text for them.
- **Hosting:** the site stays on its current stack and hosting, with deploys on push to `main`.
- **Ads:** they keep running on parquet, vinyl and medical vinyl during the relaunch. Changes to
  those pages are dated so ad results can be read correctly.
- **Earlier specs:** the April plans in `specs/SEO-SPEC-*.md` are input only. Their blog topics are
  re-checked against the sister sites before reuse.

## Open decisions (for the user)

**Q1: is garden landscaping still sold?**
- **Context:** /garden has 354 impressions at position 84, and the Ads landscaping campaign was
  stopped on the owner's instruction on 13 Oct.
- **A:** yes, as a full service. Rebuild the page with real projects and photos, and write a garden
  article.
- **B:** only artificial grass, fountains and plants are supplied. Re-angle the page around these.
- **C:** no. Redirect /garden to the artificial-grass page and drop the article.

**Q2: who covers parquet and vinyl content between this site and mafrushat-alsurye?**
- **A (recommended):** the home-room angle here; specs, prices and comparisons there.
- **B:** this site leads, and the sister site steps back from these topics.
- **C:** this site avoids parquet and vinyl articles entirely.
