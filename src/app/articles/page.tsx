import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles, hasArticles } from '@/data/articles';
import { pageOpenGraph } from '@/constants/openGraph';
import { Breadcrumbs } from '@/components/seo';

const TITLE = 'مقالات عن الأرضيات والموكيت للبيت';
const DESCRIPTION =
  'مقالات قصيرة من العمودي للمفروشات بالرياض تساعدك على اختيار أرضية كل غرفة: الباركيه والفينيل والموكيت، وأين يناسب كل نوع وكيف يُركَّب.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/articles' },
  openGraph: pageOpenGraph('/articles', TITLE, DESCRIPTION),
};

export default function ArticlesPage() {
  if (!hasArticles) notFound();

  return (
    <div className="min-h-screen bg-custom-background pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12" dir="rtl">
        <Breadcrumbs items={[{ name: 'الرئيسية', href: '/' }, { name: 'مقالات' }]} />
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8 text-right">مقالات</h1>
        <ul className="space-y-6">
          {articles.map((article) => (
            <li key={article.slug} className="bg-white p-6 rounded-lg shadow-md text-right">
              <h2 className="text-2xl font-semibold mb-2">
                <Link href={`/articles/${article.slug}`} className="text-primary hover:underline">
                  {article.title}
                </Link>
              </h2>
              <p className="text-gray-700 leading-relaxed">{article.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
