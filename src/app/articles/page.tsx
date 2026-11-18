import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles, hasArticles } from '@/data/articles';
import { getProductById } from '@/data/products';
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
    <div className="min-h-screen bg-custom-background pt-2 md:pt-20">
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-12" dir="rtl">
        <Breadcrumbs items={[{ name: 'الرئيسية', href: '/' }, { name: 'مقالات' }]} />
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8 text-right">مقالات</h1>
        <ul className="space-y-6">
          {articles.map((article) => {
            // The article's own photo, else the first product it links to.
            const firstProduct = article.sections.flatMap((section) => section.productLinks ?? [])[0];
            const image = article.image ?? (firstProduct && getProductById(firstProduct.id)?.images[0]);
            return (
              <li key={article.slug}>
                <Link
                  href={`/articles/${article.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-md text-right transition-shadow hover:shadow-xl md:flex-row"
                >
                  {image && (
                    <div className="relative aspect-[4/3] md:aspect-auto md:w-64 md:shrink-0">
                      <Image src={image} alt={article.title} fill sizes="(max-width: 768px) 100vw, 256px" className="object-cover" />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-700">{article.title}</h2>
                    <p className="flex-1 text-gray-700 leading-relaxed">{article.description}</p>
                    <span className="mt-4 font-semibold text-blue-700">اقرأ المقال</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
