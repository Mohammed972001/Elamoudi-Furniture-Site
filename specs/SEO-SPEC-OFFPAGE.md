# SEO-SPEC-OFFPAGE.md — Phase 5–6: Off-Page SEO Action Plan

> **Audience:** the marketing/business owner (manual actions). Not for the implementation agent.
> **Goal:** lift referring domains from **4 → 25+** in 90 days, claim and optimize Google Business Profile, build a real review pipeline, and create a content distribution flywheel that feeds backlinks back to the blog.
> **Why it matters:** technical SEO + content lift on-page rankings, but off-page (backlinks, GBP, reviews) is what unlocks the **Local Pack** and pushes us into the top 3 for "موكيت الرياض" — where we currently don't appear.

---

## 1 — Google Business Profile (GBP) — the highest-leverage 2 hours of off-page work you'll ever do

Knowledge base §7.1 confirms competitors (`alsourayia.com`, `mafrushat-alriyad.com`) appear in the **Local Pack** with star ratings; we don't. Local Pack typically captures 40-60% of clicks for "[product] + الرياض" queries — owning a slot here is worth more than the next 50 backlinks combined.

### 1.1 — Claim / create the profile

1. Go to https://business.google.com/ → "Manage now" → search "العمودي للمفروشات" or "Al-Amoudi Furniture".
2. If a profile already exists (not yet claimed by you), click "Own this business?" and verify via postcard, phone call, or video.
3. If no profile exists, create new → category **"Carpet store"** + secondary categories **"Flooring contractor"**, **"Carpet installer"**, **"Home goods store"**.

### 1.2 — Required fields (fill 100%)

Use these exact values — they must match `src/constants/business.ts` byte-for-byte. Any drift undoes the NAP unification work in SEO-SPEC-TECHNICAL §5.

| Field | Value |
|---|---|
| Business name | **العمودي للمفروشات** (Arabic primary) |
| Categories | **Primary: Carpet store** · Flooring contractor · Carpet installer · Home goods store · Garden center |
| Address | **حي العزيزية، شارع عبدالله بن صالح، الرياض، 12345، المملكة العربية السعودية** |
| Service area | الرياض ومحيطها (50 km radius) |
| Phone | **+966 55 835 2924** |
| Website | **https://www.elamoudifurniture.com** |
| Hours | Sun–Thu 09:00-22:00, Fri 14:00-22:00, Sat 09:00-22:00 |
| Description (750 char max) | See draft below |
| Opening date | (real founding date) |

**Description draft (Arabic, ~700 char):**
> العمودي للمفروشات — وجهتك الموثوقة في الرياض لكل ما يخص الموكيت والأرضيات والباركيه والفينيل. نقدّم تشكيلة شاملة من الموكيت بأنواعه (تركي، مشجر، موكيت مساجد، موكيت منازل) وأرضيات الفينيل رول والباركيه الطبيعي والصناعي والعشب الصناعي وأرضيات المستشفيات والمكاتب. نوفّر توصيلًا مجانيًا لكل أحياء الرياض، تركيبًا احترافيًا على يد فنيين معتمدين، زيارة مندوب مجانية لقياس المساحة، وضمانًا شاملًا على المنتج والتركيب. زر معرضنا في حي العزيزية، شارع عبدالله بن صالح، أو تواصل عبر الواتساب 0558352924.

### 1.3 — Attributes (toggle ON)

- "Identifies as women-owned" / "family-owned" — only if true
- "Online appointments" — for free-visit booking
- "Wheelchair accessible entrance"
- "Free WiFi" (if showroom has it)
- "Wheelchair accessible parking"

### 1.4 — Photos (mandatory minimums)

| Type | Count | Notes |
|---|---|---|
| Logo | 1 | 250×250+, transparent PNG |
| Cover | 1 | 1080×608, hero showroom shot |
| Exterior | 3+ | Storefront from street, signage clear |
| Interior | 5+ | Different angles of showroom |
| Products | 10+ | Each major category — moquette, parquet, vinyl, mosque carpet |
| Team | 2+ | Owner + at least one staff member |
| At work | 3+ | Installation in progress (with customer permission) |

Refresh photos quarterly. Profiles with recent photos rank higher in local pack.

### 1.5 — Services & Products

- Add each major service (تركيب موكيت / تركيب باركيه / زيارة مندوب) as a "Service" with description.
- Add 10+ products with photos and prices to the "Products" tab.

### 1.6 — Posts (weekly cadence)

Post once per week using GBP's "Updates" feature. Themes: new arrivals, seasonal offers, blog article promotions, project showcases. 75-150 Arabic words + photo + CTA link.

### 1.7 — Acceptance

- [ ] GBP shows "Verified" badge
- [ ] Completeness ≥ 95% (GBP shows the score in the dashboard)
- [ ] Map pin matches lat/lng `24.597427, 46.730596`
- [ ] Profile appears in `https://maps.google.com/?q=العمودي+للمفروشات`

---

## 2 — Local directory submissions (20+ links)

These are **citations** — they confirm NAP consistency to Google and provide low-authority but volume-relevant backlinks. Each submission must use **identical** NAP values from `src/constants/business.ts`.

### 2.1 — High-priority directories (do these first — Saudi-specific or global authority)

| # | Directory | URL | Notes |
|---|---|---|---|
| 1 | Google Business Profile | https://business.google.com/ | Done in §1 above |
| 2 | Bing Places for Business | https://www.bingplaces.com/ | Mirror of GBP |
| 3 | Apple Business Connect | https://businessconnect.apple.com/ | Apple Maps presence |
| 4 | Saudi Yellow Pages | https://www.yellowpages.com.sa/ | Free listing |
| 5 | Daleeli (دليلي) | https://www.daleeli.com/ | Saudi local directory |
| 6 | Mubawab Saudi | https://www.mubawab.sa/ | Real estate / home services adjacent |
| 7 | Saudi Chamber of Commerce | https://www.saudichambers.org.sa/ | Auth signal — only if registered |
| 8 | Riyadh Chamber of Commerce | https://www.chamber.org.sa/ | Same |
| 9 | Foursquare | https://foursquare.com/ | International dataset feeds many apps |
| 10 | Hotfrog Saudi | https://www.hotfrog.com.sa/ | Free directory |
| 11 | Yelp (yes, in MENA) | https://www.yelp.com.sa/ | Lower priority but easy |
| 12 | Brownbook | https://www.brownbook.net/ | Global directory |
| 13 | Cybo Saudi | https://www.cybo.com/SA/ | Aggregator |
| 14 | Cylex Saudi | https://saudi-arabia.cylex-international.com/ | Aggregator |
| 15 | Findez | https://www.findez.com/ | MENA directory |

### 2.2 — Industry-specific directories

| # | Directory | URL | Niche |
|---|---|---|---|
| 16 | Saudi Construction Directory | search "دليل مقاولين السعودية" | Flooring contractor angle |
| 17 | Houzz Saudi (if active) | https://www.houzz.com/ | Home design platform |
| 18 | Bayut Pro / Property Finder Pros | https://www.bayut.com/business/ | Real-estate-services adjacent |
| 19 | Konnect.sa local directory | https://www.konnect.sa/ | Saudi business listings |
| 20 | TruelyMad / similar AR business directories | various | Use any free DA 30+ listing |

### 2.3 — Submission template

Use this exact template for each directory's "About / Description" field:

> **العمودي للمفروشات** متجر متخصص في الرياض في الموكيت والأرضيات والباركيه والفينيل والعشب الصناعي. نقدّم توصيلًا مجانيًا داخل الرياض، تركيبًا احترافيًا، وضمانًا شاملًا. زورونا في حي العزيزية، شارع عبدالله بن صالح. للاستفسار: 0558352924 — www.elamoudifurniture.com

### 2.4 — Tracking

Maintain a Google Sheet with columns: Directory · URL · Submitted Date · Status · Live Link · DA. Aim for 20 active citations within 6 weeks.

### 2.5 — Acceptance

- [ ] 15+ directories show live, active listings within 6 weeks
- [ ] All listings show identical street address, phone, hours
- [ ] Audit with [Whitespark Local Citation Finder](https://whitespark.ca/) (free trial) or Moz Local — citation consistency score ≥ 90%

---

## 3 — Social media profiles

Already have: TikTok (1 backlink in GSC). Need to claim and optimize 6 more.

### 3.1 — Profile checklist (one row per platform)

| Platform | Action | Bio (Arabic) | Profile URL slug |
|---|---|---|---|
| Instagram | Claim & set up business profile | `العمودي للمفروشات 🏠 موكيت • باركيه • فينيل • عشب صناعي 📍 الرياض - حي العزيزية 🚚 توصيل وتركيب مجاني 📞 0558352924 ⬇️ زورنا الآن` | `@elamoudi_furniture` |
| TikTok (existing) | Optimize bio | Same as Instagram | `@elamoudi_furniture` |
| YouTube | Create channel | `قناة العمودي للمفروشات الرسمية. نشارك أعمال تركيب، نصائح اختيار الأرضيات، وجولات في معرضنا بالرياض.` | `@elamoudifurniture` |
| Snapchat | Claim handle | `العمودي للمفروشات — موكيت وأرضيات الرياض. شاهد جولات يومية ومنتجات جديدة.` | `elamoudifurniture` |
| Twitter/X | Claim handle | (Same compressed version of IG bio) | `@elamoudi_furn` (X has 15-char limit) |
| Pinterest | Create business pinboard | `لقطات وإلهامات لتنسيق أرضيات منازل ومجالس الرياض من العمودي للمفروشات.` | `elamoudifurniture` |
| Facebook Page | Claim & optimize | (Same description as GBP) | `elamoudifurniture` |

### 3.2 — Linking hygiene

- Every profile links to `https://www.elamoudifurniture.com` in the "Website" field.
- Bio includes phone number for one-tap-call from mobile.
- Cross-link: each profile mentions the others where the platform allows.
- Update `src/constants/business.ts → BUSINESS.social` with each new profile URL as it goes live.

### 3.3 — `sameAs` schema update

After each profile is live, add its URL to the `sameAs` arrays in `OrganizationSchema` (driven by `BUSINESS.social` already after Phase 1). Example after profiles are claimed:
```ts
social: {
  tiktok: 'https://www.tiktok.com/@elamoudi_furniture',
  instagram: 'https://www.instagram.com/elamoudi_furniture',
  youtube: 'https://www.youtube.com/@elamoudifurniture',
  facebook: 'https://www.facebook.com/elamoudifurniture',
  twitter: 'https://x.com/elamoudi_furn',
  snapchat: 'https://www.snapchat.com/add/elamoudifurniture',
  pinterest: 'https://www.pinterest.com/elamoudifurniture',
}
```

### 3.4 — Posting cadence (months 1-3)

| Platform | Cadence | Content type |
|---|---|---|
| Instagram | 4×/wk | Product photos, before/after, customer projects, reels |
| TikTok | 2-3×/wk | Installation timelapses, "did you know" tips |
| YouTube | 1×/wk | Long-form: shop tour, installation demo, product comparison |
| Snapchat | Daily story | Showroom live, deliveries, team |
| X/Twitter | 3×/wk | Blog article promotion + customer questions |
| Pinterest | 5 pins/wk | Pin every blog cover + product photos |

---

## 4 — Backlink building (Tier-by-tier outreach plan)

### 4.1 — Tier A: easy wins (target: +5 links in first 30 days)

| Tactic | How | Expected links |
|---|---|---|
| **Supplier reverse links** | Email each carpet/parquet/vinyl manufacturer you stock; ask to be listed on their "Authorized Dealer" / "Where to Buy" page | 2-4 |
| **Trade association membership** | Join Saudi Industrial Development Authority and any flooring trade body — most list members on their site | 1-2 |
| **Local news mention** | Pitch a soft story to riyadhnewspaper.com / sabq.org: "كيف تختار موكيت مسجد بمواصفات شرعية" — they often run reader-help columns | 1 |
| **GitHub README** (already have one) | Add a real link from your GitHub portfolio README to elamoudifurniture.com | already counted |

### 4.2 — Tier B: outreach (target: +10 in days 30-90)

**Targets:** Saudi home / décor / lifestyle blogs. Build a list of 30-40 prospects with a Google search:
```
site:.sa "ديكور" inurl:blog
site:.com "موكيت" "الرياض" inurl:blog
site:.sa "تنسيق منزل"
```

Use [Hunter.io](https://hunter.io/) or [Snov.io](https://snov.io/) to find email addresses.

**Outreach email template (Arabic):**

> **Subject:** اقتراح مقال ضيف — دليل اختيار الموكيت
>
> مرحبًا [اسم الكاتب]،
>
> أنا [اسمك] من العمودي للمفروشات بالرياض، متخصصون في الموكيت والأرضيات منذ 15 سنة.
>
> قرأت مقالك "[عنوان مقال حقيقي من مدونتهم]" وأعجبني تركيزك على [نقطة محدّدة]. أعتقد أن قُرّاءك قد يستفيدون من دليل عملي عن **اختيار الموكيت المناسب لكل غرفة في المنزل** — أعدّه بنفسي بناءً على أسئلة عملاء حقيقيين، بدون أي إعلانات مُقحمة، فقط نصائح وصور.
>
> مقالنا الأخير على هذا الموضوع: https://www.elamoudifurniture.com/blog/best-carpet-types-guide
>
> هل تقبل بنشر مقال حصري لك على هذه النقطة؟ يمكنني إرساله جاهزًا للنشر.
>
> شكرًا — [اسم] · 0558352924

**Conversion goal:** 5-7% of pitched contacts publish a guest article. 30 outreaches → 2 published articles. 30/month for 3 months = 6-9 published guest posts = 6-9 high-quality backlinks.

### 4.3 — Tier C: linkable assets (target: passive +5 in months 3-6)

Build assets so good they earn links without outreach:
- **Carpet area calculator** — JS tool at `/tools/carpet-calculator` that takes room dimensions and returns m² + estimated cost. Other home blogs link to free calculators.
- **Downloadable PDF: "دليل اختيار الأرضيات في 5 خطوات"** — PDF gated behind email. Promote on Pinterest + Instagram.
- **Infographic: "خريطة أنواع الموكيت"** — single PNG comparing all types. Distribute on Twitter; pin on Pinterest.

### 4.4 — Tier D: partnerships (target: +5 in months 3-12)

- **Interior designers** — 5 local designers. Offer commission on referrals; in exchange, ask to be listed on their "preferred suppliers" page.
- **Real estate developers** — partnerships with new compounds for bulk fitting; backlink in their press release.
- **Mosque administrations** — completed projects → ask the mosque imam to publish a thank-you note on their social with link.

### 4.5 — Backlink tracking

Use [Ahrefs Webmaster Tools](https://ahrefs.com/webmaster-tools) (free for site owners) or GSC Links report to track new referring domains. Goal table:

| Month | Referring domains target |
|---|---|
| Now | 4 |
| +30 days | 12 |
| +60 days | 18 |
| +90 days | 25 |
| +6 months | 50 |

### 4.6 — What NOT to do

- ❌ No paid link networks ("PBN"). One Google manual action wipes 6 months of work.
- ❌ No "submit to 500 directories" services — most are spam directories Google has already devalued.
- ❌ No comment-spam or forum-signature links.
- ❌ Don't exchange links with unrelated industries.

---

## 5 — Real review collection system

### 5.1 — Why this matters

Knowledge base §6 flags the **fake aggregateRating** issue — Google already started suppressing review snippets (13 → 4 between April 15-25). After we remove the fake data (TECHNICAL §10), product pages will lose all star snippets in SERP. The only way to earn them back: **collect real reviews and display them with proper Review schema**.

### 5.2 — Three-channel review pipeline

| Channel | Tool | Where they go | Purpose |
|---|---|---|---|
| Google Reviews | GBP review link → SMS/WhatsApp after delivery | Show up in Local Pack & Maps | Local SEO ranking factor |
| On-site reviews | Custom form post-purchase → moderated → published on product page | Show up in product page Review schema | Star snippets in SERP |
| Trustpilot (or similar) | Trustpilot Free → request invitations | Trust badge in footer | Conversion lift |

### 5.3 — Operational flow

1. **Day of delivery:** sales rep sends WhatsApp message:
   > شكرًا لاختيارك العمودي للمفروشات! نتمنى أن المنتج أعجبك. هل تساعدنا بتقييم سريع؟ [Google review link]
2. **Day +3:** auto follow-up if no response, ask for on-site review:
   > كيف هي تجربتك حتى الآن؟ شاركنا تقييمك على الموقع: https://www.elamoudifurniture.com/review/{order-id}
3. **Day +7:** thank-you follow-up + share offer code for next purchase.

### 5.4 — On-site review collection — implementation hooks

(Out of scope for this doc — opens a follow-up implementation task.) A simple form at `/review/[orderId]` that takes a 1-5 star rating + optional comment + photo. Reviews are stored, moderated, then surfaced on the relevant product page with proper `Review` schema:

```ts
{
  '@type': 'Review',
  reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
  author: { '@type': 'Person', name: 'فهد ع.' },
  datePublished: '2026-05-01',
  reviewBody: 'تركيب احترافي وفي الوقت المحدد. الموكيت بجودة ممتازة.',
}
```

After ≥ 5 verified reviews per product, populate the `aggregateRating` prop on `<ProductSchema>` with **real** values.

### 5.5 — Acceptance

- [ ] GBP review request link is in every WhatsApp confirmation
- [ ] First 10 real Google reviews collected within 60 days
- [ ] On-site review form deployed
- [ ] At least 3 product pages display ≥ 5 real reviews + real `aggregateRating`

---

## 6 — Content distribution & promotion (the flywheel)

A blog without distribution is a tree falling in an empty forest. Each new article gets pushed through this checklist on publish day:

### 6.1 — Day-of-publish checklist (per article)

- [ ] Tweet with article cover, primary keyword, 2 hashtags
- [ ] Instagram post: 1 carousel summarizing article in 5 slides + link in bio
- [ ] Pinterest pin (vertical 1000×1500 cover)
- [ ] WhatsApp Business broadcast to existing customer list (if explicit consent)
- [ ] LinkedIn post (owner's profile + company page if exists)
- [ ] Submit to GSC URL Inspection → Request Indexing
- [ ] Internal link from 2 existing pages (homepage, relevant category page)
- [ ] Send to 5 outreach prospects from Tier B as "social proof"

### 6.2 — Day +7 amplification

- Repurpose into a YouTube short or TikTok (60-90 sec narrated summary)
- Email newsletter (once email list exists)

### 6.3 — Day +30 backlink solicitation

- Identify 5 sites whose blog covers the same topic and ping each:
  > رأيت تغطيتك لـ"[topic]". قد يكون مقالنا "[title]" مرجعًا مفيدًا — إن أعجبك، نسعد بالإشارة إليه. شكرًا!

### 6.4 — Acceptance

- [ ] Every article has ≥ 4 social shares within 24 hours of publish
- [ ] Every article gains ≥ 1 external backlink within 90 days
- [ ] Top-3 performing articles get a v2 update (refresh date, expand sections) at month 6

---

## 7 — Master tracking dashboard

Maintain one Google Sheet with these tabs:

| Tab | Tracked |
|---|---|
| GBP | Daily views, calls, direction requests, new reviews |
| Citations | Directory · status · live URL · last verified |
| Backlinks | Domain · URL · target page · DA · acquired date · live? |
| Reviews | Source · stars · text · date · responded? |
| Outreach | Prospect · email · date sent · response · result |
| Social | Followers per platform per week, engagement rate |

Update weekly. The owner reviews monthly against KPI targets in `SEO-PLAN-EN.md` Phase 7.

---

## 8 — Roll-out priority order

If you can only do one thing each week:

| Week | Focus |
|---|---|
| 1 | GBP claim + 100% completion |
| 2 | 5 high-priority citations (Bing, Apple, YPSA, Daleeli, Foursquare) |
| 3 | Claim & set up Instagram/YouTube/Snapchat |
| 4 | First 10 directory submissions |
| 5 | Tier A backlink outreach (suppliers, associations) |
| 6 | Launch review collection workflow + first 10 review requests |
| 7 | Tier B outreach batch 1 (10 home/décor blogs) |
| 8 | Build carpet calculator (linkable asset) |
| 9-12 | Sustained Tier B outreach + content distribution rhythm |

---

## 9 — Final acceptance (90 days)

- [ ] GBP verified, 95%+ complete, 10+ real reviews, 4+ stars average
- [ ] 25+ live citations with consistent NAP
- [ ] 7 social profiles active, posting on schedule
- [ ] 25+ referring domains in GSC (vs 4 baseline)
- [ ] At least 1 product page with ≥ 5 real reviews + real `aggregateRating`
- [ ] Local Pack: site appears in top 3 for **at least one** of: "موكيت الرياض" / "سجاد الرياض" / "محلات موكيت الرياض"
- [ ] CTR (overall site) ≥ 6%
- [ ] Indexed pages ≥ 30
