import type { Metadata } from 'next';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import ReviewForm from '@/components/sections/ReviewForm';
import { listReviews, aggregate, formatReviewDate } from '@/lib/reviews';

export const dynamic = 'force-dynamic';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elamoudifurniture.com';

export const metadata: Metadata = {
  title: 'آراء العملاء وتقييماتهم',
  description:
    'تجارب عملاء العمودي للمفروشات مع الموكيت والسجاد والأرضيات في الرياض. شارك تقييمك لتساعد غيرك على الاختيار.',
  alternates: { canonical: '/reviews' },
};

const stars = (n: number) => '★'.repeat(n) + '☆'.repeat(5 - n);

export default async function ReviewsPage() {
  const reviews = await listReviews(50);
  const agg = aggregate(reviews);

  /**
   * Review markup only from reviews submitted through this site's own form and
   * shown on this page. Nothing is emitted until at least one real review exists.
   */
  const jsonLd = agg
    ? {
        '@context': 'https://schema.org',
        '@type': 'HomeAndConstructionBusiness',
        '@id': `${siteUrl}/#business`,
        name: 'العمودي للمفروشات',
        url: siteUrl,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: agg.ratingValue,
          reviewCount: agg.reviewCount,
          bestRating: 5,
          worstRating: 1,
        },
        review: reviews.slice(0, 20).map((r) => ({
          '@type': 'Review',
          author: { '@type': 'Person', name: r.name },
          datePublished: r.createdAt.slice(0, 10),
          reviewBody: r.body,
          reviewRating: {
            '@type': 'Rating',
            ratingValue: r.rating,
            bestRating: 5,
            worstRating: 1,
          },
        })),
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <div className="min-h-screen bg-custom-background pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <Breadcrumbs items={[{ name: 'الرئيسية', href: '/' }, { name: 'آراء العملاء' }]} />

          <header className="text-center mb-10 mt-4">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">آراء العملاء</h1>
            <span className="block h-0.5 w-16 bg-carpet-gold mx-auto mb-4" />
            {agg ? (
              <p className="text-gray-600 text-lg">
                <span className="text-carpet-gold text-xl align-middle">{stars(Math.round(agg.ratingValue))}</span>{' '}
                <span className="font-bold text-gray-900">{agg.ratingValue}</span> من 5 — بناءً على{' '}
                {agg.reviewCount} تقييم
              </p>
            ) : (
              <p className="text-gray-600 text-lg">لا توجد تقييمات بعد. كن أول من يشارك تجربته.</p>
            )}
          </header>

          {reviews.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 mb-14">
              {reviews.map((r) => (
                <figure key={r.id} className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col">
                  <span className="text-carpet-gold text-lg mb-3" aria-label={`${r.rating} من 5`}>
                    {stars(r.rating)}
                  </span>
                  <blockquote className="text-gray-700 leading-relaxed flex-1 mb-4">{r.body}</blockquote>
                  <figcaption className="pt-3 border-t border-gray-200">
                    <span className="block font-bold text-gray-900">
                      {r.name}
                      {r.verified && (
                        <span className="mr-2 align-middle text-xs font-semibold text-primary">✓ عميل موثّق</span>
                      )}
                    </span>
                    <span className="block text-sm text-gray-500 mt-0.5">
                      {r.location} · {r.service} · <time dateTime={r.createdAt}>{formatReviewDate(r.createdAt)}</time>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          )}

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 text-center">أضف تقييمك</h2>
            <ReviewForm />
          </section>
        </div>
      </div>
    </>
  );
}
