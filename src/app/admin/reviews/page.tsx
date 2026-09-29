import type { Metadata } from 'next';
import { listAllReviews, isReviewsConfigured } from '@/lib/reviews';
import AdminReviewsClient from './AdminReviewsClient';

export const dynamic = 'force-dynamic';

/** Never index the admin screen. robots.txt also disallows /admin/. */
export const metadata: Metadata = {
  title: 'إدارة التقييمات',
  robots: { index: false, follow: false, nocache: true },
};

export default async function AdminReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const token = (await searchParams).token ?? '';
  const expected = process.env.ADMIN_TOKEN;

  if (!isReviewsConfigured() || !expected) {
    return (
      <Shell>
        <p className="text-gray-700">
          نظام التقييمات غير مُهيّأ. اضبط <code className="text-primary">DATABASE_URL</code> و{' '}
          <code className="text-primary">ADMIN_TOKEN</code> أولاً.
        </p>
      </Shell>
    );
  }

  if (token !== expected) {
    return (
      <Shell>
        <p className="text-gray-700">
          هذه الصفحة للمالك فقط. افتحها عبر الرابط الذي يحتوي على رمز الدخول.
        </p>
      </Shell>
    );
  }

  const reviews = await listAllReviews();

  return (
    <Shell>
      <p className="text-gray-600 mb-6">
        {reviews.length} تقييم. «توثيق» يضع علامة «عميل موثّق» بعد تأكدك أن صاحبه عميل فعلي (من البريد أو الطلب). الإخفاء يبقيه محفوظاً لكن لا يظهر للزوار، والحذف نهائي.
      </p>
      <AdminReviewsClient initial={reviews} token={token} />
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-custom-background pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl text-primary mb-2">إدارة التقييمات</h1>
        <span className="block h-0.5 w-14 bg-carpet-gold mb-6" />
        {children}
      </div>
    </div>
  );
}
