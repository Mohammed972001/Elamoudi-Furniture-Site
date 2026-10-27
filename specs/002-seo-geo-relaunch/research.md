# Research and decisions: SEO + GEO relaunch

## R1. Why the position slid from 10 to 21

- **Decision**: treat it as three causes. The fixes are differentiation, depth and entity.
- **Rationale**:
  - **Sister sites were forked from this template.** On 6 Oct, 13 of 24 pages here were 71–79%
    similar to them. Google then had four near-copies of each page competing for one slot. The
    dupcheck is down to 6/24, but the trust lost takes time to rebuild.
  - **No topical depth.** There are no articles and no FAQ, while the sister sites added 11
    articles each.
  - **The brand entity is ambiguous.** Searches for other «العمودي» businesses in Jazan, Khamis
    Mushait, and furniture and electrical trades all reach this site.
- **Alternatives considered**: blaming a Google update. Rejected, because the decline is steady
  over six months, not a step.

## R2. Lanes against the sister clients

- **Decision**: option A of Q2. This site covers the home as one project; parquet and vinyl are
  covered from the room angle.
- **Rationale**:
  - The sister site's articles are spec and comparison pieces. Room-angle pieces target different
    queries: «باركيه حمامات», «أرضيات مطابخ فينيل», «موكيت تركي».
  - Those queries already show here at positions 4–10.
- **Alternatives**:
  - **B**, this site leads parquet and vinyl. It risks pushing down a paying sister client.
  - **C**, no parquet or vinyl content. It throws away the owner's best-closing lines.

## R3. Articles path

- **Decision**: `/articles`, not `/blog`.
- **Rationale**:
  - All three sister sites use `/blog` with the same component set.
  - A different structure reduces template similarity, and «مقالات» reads naturally in Arabic.
- **Alternatives**: `/blog`. Rejected for the reason above.

## R4. GEO tactics worth doing (and not)

| Tactic | Decision | Why |
|---|---|---|
| Consistent entity data everywhere (site, Business Profile, Bing Places, directories) | **Do** | Assistants build answers from agreeing sources. The namesake confusion is the main GEO problem here. |
| Answer-first 2–3 sentences at the top of key pages | **Do** | Quotable passages are what assistants and snippets lift. It costs nothing and helps humans too. |
| FAQPage on products | **Do** | Real Q&A text in a structured form. Google limits the FAQ rich result, but the text and its structure still help understanding. |
| `/llms.txt` | **Do (cheap)** | Not a ranking factor and not proven. It costs 1 file generated from existing data. |
| Bing Webmaster + IndexNow | **Do** | ChatGPT search and Copilot draw on Bing's index. The site has never been checked there. |
| Allow AI crawlers | **Keep** | Verified on 27 Oct: GPTBot, ClaudeBot, PerplexityBot and OAI-SearchBot all get 200. |
| Mass AI-written pages, keyword stuffing, fake reviews | **Don't** | Against the constitution and a known penalty risk. |

## R5. Measurement

- **Decision**: measure five things.
  1. **Search Console** through the service account. Brand and non-brand are split by a regex on
     «العمودي|عمودي|العامودي».
  2. **GA4** `contact_click` events, by session source = organic.
  3. **URL Inspection** for index state.
  4. **PageSpeed Insights** (mobile) for the 6 main pages.
  5. **AI-visibility log**, run by hand monthly.
- The scripts live in `C:/Users/mohammed/.claude/scripts/`, never in the repo.
- **The 10 fixed AI questions** (same wording each month):
  1. وين ألقى محل باركيه في الرياض؟
  2. أفضل محل فينيل أرضيات في الرياض
  3. العمودي للمفروشات الرياض
  4. العمودي للمفروشات وين مكانه ورقمه؟
  5. محل موكيت تركي مشجر في الرياض
  6. هل ينفع باركيه في الحمام؟
  7. أرضيات فينيل طبي للبيت في الرياض
  8. مين يركب باركيه فوق السيراميك في الرياض؟
  9. محلات مفروشات وأرضيات في الرياض تجي تقيس البيت
  10. ديكور مجالس وأرضيات في الرياض (Q1 = C, so not the garden question)
- **Where they are asked:** Google AI Mode (`google.com/search?udm=50&hl=ar&gl=sa`) works without
  signing in. ChatGPT and Perplexity ask for an account, so they are run in a browser the user is
  already signed in to, with his go. Gemini is the same.

## R6. Baseline numbers (27 Sep–25 Oct 2026)

| Measure | Value |
|---|---|
| Total clicks | about 124 |
| Clicks to the homepage | 54 (mostly brand) |
| Clicks to all other pages | about 70 |
| Impressions | about 5,300 (3,968 mobile, 1,315 desktop) |
| Indexed URLs (16 Oct) | 21 of 24 |
