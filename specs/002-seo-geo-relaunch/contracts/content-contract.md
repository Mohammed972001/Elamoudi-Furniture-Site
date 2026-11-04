# Content contract

Every page type below must meet its contract before a release ships. The contract is checked in
the build output and again on the live page.

## Product page (the 6 closing-line pages)

1. **Opening.** One H1. The answer-first paragraph (2–3 sentences) sits directly under it, above
   the fold on a 390 px-wide phone.
2. **Actions.** A call button, then a WhatsApp button (call first: calls close). A «ابعت صورة
   المكان على واتساب» prompt follows. All WhatsApp links get the ad-source line from
   `adSource.ts` for visitors who came from an ad.
3. **Rooms.** A «حسب الغرفة / الاستخدام» section built from `rooms`.
4. **FAQ.** A visible section of 4–6 questions plus a FAQPage JSON-LD block with the same text.
5. **JSON-LD.** Service, BreadcrumbList and FAQPage, all referencing the business `@id`.
   - No `aggregateRating` unless there are real reviews.
   - A page with a price is a Product with an Offer, and shows the same price. Merchant Center has no
     feed and builds its products from this markup, so removing it gets products rejected (4 Nov).
   - A page with no price is a Service. Google marks a Product with no offer, review or rating as
     invalid (rich-results test, 3 Nov).
6. **Links.** In-text links to at least one article once articles exist.
7. **Metadata.** A unique title and description, a canonical URL, and Arabic alt text on every image.

## Article page (`/articles/<slug>`)

1. **Opening.** One H1, the answer-first paragraph, the published and updated dates, and the
   reading path (table of contents) when there are more than 4 sections.
2. **Product links.** In-text links to 2 or more product pages, inside the sections that discuss
   them.
3. **Closing.** Call and WhatsApp actions at the end.
4. **JSON-LD.** Article with the author set to the business entity, plus BreadcrumbList.
5. **Uniqueness.** Dupcheck against the 3 sister sites is under 30%. The slug matches no sister slug.

## `/llms.txt`

The file is plain text in Markdown style, generated at build time from `business.ts`, `products.ts`
and `articles/`:

```text
# العمودي للمفروشات — الرياض
> <one-line description from business.facts>

## التواصل
- هاتف: <phone> · واتساب: <wa link> · العنوان: <address> · المواعيد: <hours>

## المنتجات
- [<product name>](<url>): <product.answer first sentence>
...

## مقالات
- [<article title>](<url>): <article.answer first sentence>
```

## Sitemap

- Every indexable URL is included, with its real `lastModified` (no build-time "now").
- Redirected or merged URLs are left out.
