import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles, getArticle } from '@/data/articles';
import { BUSINESS } from '@/constants/business';
import { pageOpenGraph } from '@/constants/openGraph';
import { Breadcrumbs } from '@/components/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

type Props = { params: Promise<{ slug: string }> };

async function findArticle(params: Props['params']) {
  return getArticle(decodeURIComponent((await params).slug));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await findArticle(params);
  if (!article) return {};
  const path = `/articles/${article.slug}`;
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: path },
    openGraph: pageOpenGraph(path, article.title, article.description, article.image ? [article.image] : undefined),
  };
}

/** A table of contents only helps once an article has more than 4 sections. */
const TOC_MIN_SECTIONS = 5;

export default async function ArticlePage({ params }: Props) {
  const article = await findArticle(params);
  if (!article) notFound();

  const path = `/articles/${article.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.published,
    dateModified: article.updated,
    inLanguage: 'ar',
    mainEntityOfPage: `${BUSINESS.url}${path}`,
    ...(article.image && { image: `${BUSINESS.url}${article.image}` }),
    author: { '@id': BUSINESS.id },
    publisher: { '@id': BUSINESS.id },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="min-h-screen bg-custom-background pt-20">
        <article className="max-w-3xl mx-auto px-4 py-12 text-right" dir="rtl">
          <Breadcrumbs
            items={[
              { name: 'الرئيسية', href: '/' },
              { name: 'مقالات', href: '/articles' },
              { name: article.title },
            ]}
          />
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">{article.title}</h1>
          <p className="text-lg leading-relaxed text-gray-800 mb-8 bg-gray-50 p-6 rounded-lg">{article.answer}</p>

          {article.sections.length >= TOC_MIN_SECTIONS && (
            <nav aria-label="محتويات المقال" className="mb-10">
              <h2 className="text-xl font-semibold mb-3">محتويات المقال</h2>
              <ol className="list-decimal pr-6 space-y-1">
                {article.sections.map((section, index) => (
                  <li key={section.heading}>
                    <a href={`#section-${index + 1}`} className="text-primary hover:underline">
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {article.sections.map((section, index) => (
            <section key={section.heading} id={`section-${index + 1}`} className="mb-10">
              <h2 className="text-2xl font-bold text-primary mb-4">{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="text-lg leading-relaxed text-gray-700 mb-4">
                  {paragraph}
                </p>
              ))}
              {section.productLinks && section.productLinks.length > 0 && (
                <ul className="flex flex-wrap gap-3">
                  {section.productLinks.map((link) => (
                    <li key={link.id}>
                      <Link
                        href={`/products/${link.id}`}
                        className="inline-block bg-white border border-primary text-primary px-4 py-2 rounded-lg hover:bg-gray-50"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <div className="text-center bg-carpet-gold p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-6">تواصل مع المحل</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={BUSINESS.phone.telLink}
                className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
              >
                اتصل الآن
              </a>
              <a
                href={BUSINESS.phone.whatsappLink}
                className="bg-white text-carpet-gold px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                تواصل معنا عبر الواتساب
              </a>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
