import Link from 'next/link';
import { listReviews, aggregate, formatReviewDate } from '@/lib/reviews';

const stars = (n: number) => '★'.repeat(n) + '☆'.repeat(5 - n);

/**
 * Homepage reviews strip — reads the newest real reviews submitted through
 * /reviews. Renders nothing until there are some, so the page is simply
 * shorter rather than showing placeholders.
 */
export default async function TestimonialsSection() {
  const reviews = await listReviews(3);
  if (reviews.length === 0) return null;

  const agg = aggregate(reviews);

  return (
    <section className="py-16 sm:py-20 bg-carpet-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-primary mb-3">ماذا قال عملاؤنا</h2>
          <span className="block h-0.5 w-14 bg-carpet-gold mx-auto mb-4" />
          {agg && (
            <p className="text-gray-600 text-lg">
              <span className="text-carpet-gold align-middle">{stars(Math.round(agg.ratingValue))}</span>{' '}
              <span className="font-bold text-gray-900">{agg.ratingValue}</span> من 5
            </p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.id} className="bg-white border border-gray-200 rounded-2xl p-7 flex flex-col">
              <span className="text-carpet-gold mb-4" aria-label={`${r.rating} من 5`}>
                {stars(r.rating)}
              </span>
              <blockquote className="text-gray-700 leading-relaxed flex-1 mb-5">{r.body}</blockquote>
              <figcaption className="pt-4 border-t border-gray-200">
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

        <div className="text-center mt-10">
          <Link
            href="/reviews"
            className="inline-flex items-center justify-center border border-primary text-primary hover:bg-primary hover:text-white font-bold rounded-lg px-8 py-3 transition-colors"
          >
            اقرأ كل الآراء أو أضف تقييمك
          </Link>
        </div>
      </div>
    </section>
  );
}
