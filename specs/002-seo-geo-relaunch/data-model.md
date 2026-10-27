# Data model: SEO + GEO relaunch

These are content entities held in typed data modules. There is no database.

## Business (`src/constants/business.ts`, extended)

| Field | Rule |
|---|---|
| name | «العمودي للمفروشات». The only name used anywhere. |
| id | Stable entity id, `https://www.elamoudifurniture.com/#business`, used by every JSON-LD block. |
| phone, address, hours | One value each. Must match the Business Profile character for character. |
| sameAs | Business Profile URL and social profiles. Owner-confirmed only; an empty list is allowed. |
| knowsAbout | The product names the shop sells. |
| facts | Owner-confirmed «about» facts. Each one carries a note on its source. |

## Product (`src/data/products.ts`, new fields)

| Field | Rule |
|---|---|
| answer | 2–3 sentences: what it is, who or which room it suits, how to order. No unsourced numbers. |
| rooms | A list of {room, guidance}. Only rooms the product really suits. |
| faq | A list of 4–6 {question, answer}. Questions come from real queries; answers are owner-confirmed. |
| titleLockedUntil | A date. Title and description edits are rejected before it. It is mirrored in `seo-log/elamoudi.md`. |

## Article (`src/data/articles/*.ts`, new)

| Field | Rule |
|---|---|
| slug | Arabic, hyphenated. Must not equal any sister-site blog slug. |
| title, description | A unique pair. The description is 120–155 characters. |
| answer | The answer-first opening, 2–3 sentences. |
| sections | Ordered list of {heading, body}. Each section may carry `productLinks` (at least 2 per article overall). |
| queries | The GSC or Ads queries the article targets (from the plan's content map). |
| image | The owner's photo or none. Never another client's. |
| published, updated | Real dates. They feed the sitemap `lastModified` and the Article schema. |

## Release (log entry in `C:/Users/mohammed/.claude/scripts/seo-log/elamoudi.md`)

`date · release id (R0…R10) · pages touched · why · lock dates set · review date · commit`

## AI check (rows in the same log, monthly)

`date · question # · assistant · named? (y/n) · cited URL · details correct? · note`

## State: page lifecycle

`draft → published → indexed → (ranking) → expanded | re-angled | merged`

- Moving to **merged** requires a 301 redirect and removal from the sitemap.
- Moving to **re-angled** resets the 21-day lock.
