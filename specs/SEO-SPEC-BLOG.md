# SEO-SPEC-BLOG.md — Phase 3: Blog Infrastructure & First 10 Articles

> **Goal:** ship a fully-functional Arabic blog at `/blog` and seed it with 10 SEO-targeted articles that capture an estimated **2,500+ monthly impressions** of currently-uncaptured intent (per `SEO-KNOWLEDGE-BASE.md` §13–14). All competitors (alsourayia.com, kaffary.com, mafrushat-alriyad.com) have a blog — we don't. This is the highest-leverage content gap.

---

## PART A — Blog Infrastructure

### A.1 — File structure

```
src/
├── app/
│   ├── blog/
│   │   ├── page.tsx                  # /blog listing (paginated)
│   │   ├── layout.tsx                # blog-specific layout (optional shared header)
│   │   ├── [slug]/
│   │   │   └── page.tsx              # /blog/{slug} article detail
│   │   └── page/
│   │       └── [pageNum]/
│   │           └── page.tsx          # /blog/page/2 etc. for pagination
│   └── sitemap.ts                    # MODIFIED — include blog routes
├── components/
│   └── blog/
│       ├── ArticleCard.tsx           # Card for listing
│       ├── ArticleHeader.tsx         # Title + meta + cover image
│       ├── TableOfContents.tsx       # Auto-generated from H2/H3
│       ├── RelatedProducts.tsx       # Internal-link block
│       ├── ShareButtons.tsx          # WhatsApp, Twitter, copy link
│       ├── AuthorBox.tsx             # Author bio block
│       └── BlogPagination.tsx
├── data/
│   ├── blog/
│   │   ├── index.ts                  # Aggregates all articles, exports helpers
│   │   ├── types.ts                  # BlogPost interface
│   │   ├── 01-best-carpet-types.ts
│   │   ├── 02-vinyl-roll-guide.ts
│   │   ├── 03-waterproof-parquet.ts
│   │   ├── 04-mosque-carpet-guide.ts
│   │   ├── 05-carpet-prices-riyadh-2026.ts
│   │   ├── 06-natural-vs-synthetic-parquet.ts
│   │   ├── 07-garden-landscaping-guide.ts
│   │   ├── 08-office-carpet-guide.ts
│   │   ├── 09-hospital-flooring-standards.ts
│   │   └── 10-carpet-installation-step-by-step.ts
└── constants/
    └── blog.ts                       # POSTS_PER_PAGE, AUTHORS map
```

### A.2 — TypeScript data model — `src/data/blog/types.ts`

```ts
export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;        // path under /public
  bio: string;
}

export interface BlogPost {
  /** URL slug, e.g. 'best-carpet-types-guide' */
  slug: string;
  /** Article title (Arabic, used for <title> + h1) */
  title: string;
  /** Sub-headline shown under the title; also used as og:description fallback */
  excerpt: string;
  /** ≤ 160-char meta description */
  metaDescription: string;
  /** SEO keywords list */
  keywords: string[];
  /** Primary keyword the article ranks for — drives prominence in copy */
  primaryKeyword: string;
  /** Cover image (1200x630 recommended for OG) */
  coverImage: string;
  /** Optional gallery images used inline */
  images?: { src: string; alt: string; caption?: string }[];
  /** ISO 8601 date the article was first published */
  publishedAt: string;
  /** ISO 8601 date the article was last updated */
  updatedAt: string;
  /** Author key — looked up in AUTHORS */
  authorKey: string;
  /** Estimated reading time in minutes */
  readingTimeMin: number;
  /** Topical category for filtering */
  category: 'carpets' | 'flooring' | 'parquet' | 'garden' | 'guides' | 'prices';
  /** Body — sections rendered in order. Body uses the same SEOContent renderer to keep one source of truth. */
  body: BlogSection[];
  /** Slugs of related products to show in the bottom block */
  relatedProductIds: string[];
  /** FAQ entries appended at the bottom of the article */
  faq: { question: string; answer: string }[];
}

export type BlogSection =
  | { kind: 'h2'; id: string; text: string }
  | { kind: 'h3'; id: string; text: string }
  | { kind: 'p'; html: string }                 // pre-sanitized HTML allowed (bold/links only)
  | { kind: 'ul'; items: string[] }
  | { kind: 'ol'; items: string[] }
  | { kind: 'image'; src: string; alt: string; caption?: string }
  | { kind: 'quote'; text: string; cite?: string }
  | { kind: 'productCallout'; productId: string; ctaText: string };
```

### A.3 — Authors — `src/constants/blog.ts`

```ts
import type { BlogAuthor } from '@/data/blog/types';

export const POSTS_PER_PAGE = 9;

export const AUTHORS: Record<string, BlogAuthor> = {
  team: {
    name: 'فريق العمودي للمفروشات',
    role: 'فريق الخبراء',
    avatar: '/blog/authors/team.jpg',
    bio: 'فريقنا من خبراء الأرضيات والمفروشات، بخبرة تتجاوز 15 عامًا في خدمة عملاء الرياض والمنطقة.',
  },
  // Add named authors as they're onboarded.
};
```

### A.4 — Listing page — `src/app/blog/page.tsx`

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import FAQ from '@/components/seo/FAQ';
import ArticleCard from '@/components/blog/ArticleCard';
import { getAllPosts, getPaginatedPosts } from '@/data/blog';
import { POSTS_PER_PAGE } from '@/constants/blog';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elamoudifurniture.com';

export const metadata: Metadata = {
  title: 'مدونة العمودي للمفروشات — مقالات عن الأرضيات والديكور',
  description: 'مقالات شاملة عن الموكيت والسجاد والباركيه والفينيل وتنسيق الحدائق. نصائح عملية لاختيار الأرضيات وتركيبها وصيانتها من خبراء العمودي للمفروشات بالرياض.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'مدونة العمودي للمفروشات',
    description: 'مقالات عن الأرضيات، الموكيت، الباركيه، تنسيق الحدائق وأكثر.',
    type: 'website',
    url: `${baseUrl}/blog`,
    locale: 'ar_SA',
    siteName: 'العمودي للمفروشات',
    images: [{ url: '/og/blog.jpg', width: 1200, height: 630, alt: 'مدونة العمودي للمفروشات' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'مدونة العمودي للمفروشات',
    description: 'مقالات عن الأرضيات، الموكيت، الباركيه وأكثر.',
    images: ['/og/blog.jpg'],
  },
};

export default function BlogIndexPage() {
  const { posts, totalPages } = getPaginatedPosts(1);

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-[60vh]">
      <Breadcrumbs items={[{ name: 'الرئيسية', href: '/' }, { name: 'المدونة' }]} />

      <header className="mt-12 text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          مدونة العمودي للمفروشات
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          مقالات شاملة من خبراء الأرضيات والديكور في الرياض. نصائح عملية لاختيار الموكيت والباركيه والفينيل، أسعار، وأدلة تركيب وصيانة.
        </p>
      </header>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => <ArticleCard key={post.slug} post={post} />)}
      </section>

      {totalPages > 1 && (
        <nav className="mt-12 flex justify-center gap-2" aria-label="Blog pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
            <Link
              key={n}
              href={n === 1 ? '/blog' : `/blog/page/${n}`}
              className={`px-4 py-2 rounded ${n === 1 ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {n}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
```

### A.5 — Pagination route — `src/app/blog/page/[pageNum]/page.tsx`

```tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPaginatedPosts, getAllPosts } from '@/data/blog';
import { POSTS_PER_PAGE } from '@/constants/blog';
import ArticleCard from '@/components/blog/ArticleCard';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ pageNum: string }>;
}

export async function generateStaticParams() {
  const total = getAllPosts().length;
  const totalPages = Math.ceil(total / POSTS_PER_PAGE);
  // Pages 2..N (page 1 is the index)
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
    pageNum: String(i + 2),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { pageNum } = await params;
  const n = Number(pageNum);
  return {
    title: `مدونة العمودي للمفروشات — صفحة ${n}`,
    description: `صفحة ${n} من مدونة العمودي للمفروشات: مقالات عن الموكيت والسجاد والباركيه والفينيل.`,
    alternates: { canonical: `/blog/page/${n}` },
    robots: n === 1 ? undefined : { index: true, follow: true }, // optional: noindex pagination beyond page 1 if too thin
  };
}

export default async function BlogPaginatedPage({ params }: PageProps) {
  const { pageNum } = await params;
  const n = Number(pageNum);
  if (!Number.isFinite(n) || n < 2) notFound();

  const { posts, totalPages } = getPaginatedPosts(n);
  if (posts.length === 0) notFound();

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-[60vh]">
      <Breadcrumbs items={[
        { name: 'الرئيسية', href: '/' },
        { name: 'المدونة', href: '/blog' },
        { name: `صفحة ${n}` },
      ]} />
      <h1 className="mt-12 text-3xl font-bold mb-8 text-center">المدونة — صفحة {n}</h1>
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(p => <ArticleCard key={p.slug} post={p} />)}
      </section>
      <nav className="mt-12 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
          <Link
            key={p}
            href={p === 1 ? '/blog' : `/blog/page/${p}`}
            className={`px-4 py-2 rounded ${p === n ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            {p}
          </Link>
        ))}
      </nav>
    </div>
  );
}
```

### A.6 — Article detail — `src/app/blog/[slug]/page.tsx`

```tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import FAQ from '@/components/seo/FAQ';
import TableOfContents from '@/components/blog/TableOfContents';
import RelatedProducts from '@/components/blog/RelatedProducts';
import ShareButtons from '@/components/blog/ShareButtons';
import AuthorBox from '@/components/blog/AuthorBox';
import { getPostBySlug, getAllPosts } from '@/data/blog';
import { AUTHORS } from '@/constants/blog';
import { renderBlogBody } from '@/components/blog/renderBlogBody';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elamoudifurniture.com';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'المقال غير موجود' };

  return {
    title: post.title,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: 'article',
      url: `${baseUrl}/blog/${post.slug}`,
      locale: 'ar_SA',
      siteName: 'العمودي للمفروشات',
      images: [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }],
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [AUTHORS[post.authorKey]?.name ?? 'العمودي للمفروشات'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const author = AUTHORS[post.authorKey];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    image: [`${baseUrl}${post.coverImage}`],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Organization',
      name: author?.name ?? 'العمودي للمفروشات',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      name: 'العمودي للمفروشات',
      logo: { '@type': 'ImageObject', url: `${baseUrl}/favicon.svg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${baseUrl}/blog/${post.slug}` },
    inLanguage: 'ar-SA',
    keywords: post.keywords.join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="pt-24 pb-12 px-4 max-w-4xl mx-auto" dir="rtl">
        <Breadcrumbs items={[
          { name: 'الرئيسية', href: '/' },
          { name: 'المدونة', href: '/blog' },
          { name: post.title },
        ]} />

        <header className="mt-8 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{post.excerpt}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 border-y py-3">
            <span>بواسطة: {author?.name}</span>
            <time dateTime={post.publishedAt}>
              نُشر: {new Date(post.publishedAt).toLocaleDateString('ar-SA')}
            </time>
            <span>مدة القراءة: {post.readingTimeMin} دقيقة</span>
          </div>
        </header>

        <Image
          src={post.coverImage}
          alt={post.title}
          width={1200}
          height={630}
          className="w-full rounded-xl mb-8"
          priority
        />

        <TableOfContents body={post.body} />

        <ShareButtons title={post.title} slug={post.slug} />

        <div className="prose prose-lg max-w-none mt-8">
          {renderBlogBody(post.body)}
        </div>

        {post.faq.length > 0 && (
          <div className="mt-16">
            <FAQ items={post.faq} title="أسئلة شائعة" />
          </div>
        )}

        {post.relatedProductIds.length > 0 && (
          <RelatedProducts productIds={post.relatedProductIds} />
        )}

        <AuthorBox author={author!} />
      </article>
    </>
  );
}
```

### A.7 — Helpers — `src/data/blog/index.ts`

```ts
import type { BlogPost } from './types';
import post01 from './01-best-carpet-types';
import post02 from './02-vinyl-roll-guide';
import post03 from './03-waterproof-parquet';
import post04 from './04-mosque-carpet-guide';
import post05 from './05-carpet-prices-riyadh-2026';
import post06 from './06-natural-vs-synthetic-parquet';
import post07 from './07-garden-landscaping-guide';
import post08 from './08-office-carpet-guide';
import post09 from './09-hospital-flooring-standards';
import post10 from './10-carpet-installation-step-by-step';
import { POSTS_PER_PAGE } from '@/constants/blog';

const ALL: BlogPost[] = [
  post01, post02, post03, post04, post05,
  post06, post07, post08, post09, post10,
].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export const getAllPosts = () => ALL;
export const getPostBySlug = (slug: string) => ALL.find(p => p.slug === slug);
export const getPaginatedPosts = (page: number) => {
  const start = (page - 1) * POSTS_PER_PAGE;
  return {
    posts: ALL.slice(start, start + POSTS_PER_PAGE),
    totalPages: Math.ceil(ALL.length / POSTS_PER_PAGE),
  };
};
```

### A.8 — Body renderer — `src/components/blog/renderBlogBody.tsx`

```tsx
import Image from 'next/image';
import Link from 'next/link';
import type { BlogSection } from '@/data/blog/types';
import { getProductById } from '@/data/products';

export function renderBlogBody(body: BlogSection[]) {
  return body.map((s, i) => {
    switch (s.kind) {
      case 'h2':
        return <h2 key={i} id={s.id} className="text-2xl md:text-3xl font-bold mt-10 mb-4 text-gray-900">{s.text}</h2>;
      case 'h3':
        return <h3 key={i} id={s.id} className="text-xl md:text-2xl font-semibold mt-6 mb-3 text-gray-800">{s.text}</h3>;
      case 'p':
        return <p key={i} className="mb-4 text-lg leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: s.html }} />;
      case 'ul':
        return <ul key={i} className="list-disc pr-6 mb-4 space-y-2 text-gray-700">{s.items.map((it, j) => <li key={j}>{it}</li>)}</ul>;
      case 'ol':
        return <ol key={i} className="list-decimal pr-6 mb-4 space-y-2 text-gray-700">{s.items.map((it, j) => <li key={j}>{it}</li>)}</ol>;
      case 'image':
        return (
          <figure key={i} className="my-8">
            <Image src={s.src} alt={s.alt} width={1000} height={600} className="w-full rounded-lg" />
            {s.caption && <figcaption className="text-center text-sm text-gray-500 mt-2">{s.caption}</figcaption>}
          </figure>
        );
      case 'quote':
        return (
          <blockquote key={i} className="border-r-4 border-primary pr-4 my-6 italic text-gray-700">
            "{s.text}"{s.cite && <cite className="block mt-2 text-sm">— {s.cite}</cite>}
          </blockquote>
        );
      case 'productCallout': {
        const p = getProductById(s.productId);
        if (!p) return null;
        return (
          <Link key={i} href={`/products/${p.id}`} className="block my-8 p-6 bg-primary/5 border border-primary/20 rounded-xl hover:bg-primary/10 transition">
            <div className="text-sm text-primary font-semibold mb-2">منتج مقترح</div>
            <div className="text-xl font-bold text-gray-900">{p.title}</div>
            <div className="text-gray-600 mt-1">{p.metaDescription}</div>
            <div className="mt-3 text-primary font-semibold">{s.ctaText} ←</div>
          </Link>
        );
      }
    }
  });
}
```

### A.9 — Table of Contents — `src/components/blog/TableOfContents.tsx`

```tsx
import type { BlogSection } from '@/data/blog/types';

export default function TableOfContents({ body }: { body: BlogSection[] }) {
  const headings = body.filter((s): s is Extract<BlogSection, { kind: 'h2' | 'h3' }> =>
    s.kind === 'h2' || s.kind === 'h3'
  );
  if (headings.length < 3) return null;

  return (
    <nav aria-label="جدول المحتويات" className="bg-gray-50 rounded-xl p-6 my-8">
      <h2 className="text-lg font-bold mb-3">جدول المحتويات</h2>
      <ol className="space-y-2 list-decimal pr-6">
        {headings.map(h => (
          <li key={h.id} className={h.kind === 'h3' ? 'pr-4 text-sm' : ''}>
            <a href={`#${h.id}`} className="text-primary hover:underline">{h.text}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
```

### A.10 — Related products — `src/components/blog/RelatedProducts.tsx`

```tsx
import Link from 'next/link';
import Image from 'next/image';
import { getProductById } from '@/data/products';

export default function RelatedProducts({ productIds }: { productIds: string[] }) {
  const products = productIds.map(getProductById).filter(Boolean);
  if (products.length === 0) return null;

  return (
    <section className="mt-16 border-t pt-12">
      <h2 className="text-2xl font-bold mb-6">منتجات ذات صلة</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {products.map(p => p && (
          <Link key={p.id} href={`/products/${p.id}`} className="group bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
            <div className="aspect-[4/3] relative">
              <Image src={p.images[0]} alt={p.title} fill className="object-cover group-hover:scale-105 transition" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 line-clamp-2">{p.title}</h3>
              <p className="mt-2 text-sm text-gray-600 line-clamp-2">{p.metaDescription}</p>
              <span className="inline-block mt-3 text-primary font-semibold">عرض المنتج ←</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
```

### A.11 — Share buttons — `src/components/blog/ShareButtons.tsx`

```tsx
'use client';
import { useState } from 'react';
import { BUSINESS } from '@/constants/business';

export default function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = `${BUSINESS.url}/blog/${slug}`;
  const encoded = encodeURIComponent(`${title} — ${url}`);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap gap-3 my-6" dir="rtl">
      <a href={`https://wa.me/?text=${encoded}`} target="_blank" rel="noopener noreferrer"
         className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
        مشاركة عبر واتساب
      </a>
      <a href={`https://twitter.com/intent/tweet?text=${encoded}`} target="_blank" rel="noopener noreferrer"
         className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
        مشاركة على X
      </a>
      <button type="button" onClick={handleCopy}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg">
        {copied ? 'تم النسخ ✓' : 'نسخ الرابط'}
      </button>
    </div>
  );
}
```

### A.12 — Sitemap update — `src/app/sitemap.ts`

Add at the end of the existing file (before the final return):

```ts
import { getAllPosts } from '@/data/blog';

// inside sitemap():
const blogIndex: MetadataRoute.Sitemap = [{
  url: `${baseUrl}/blog`,
  lastModified: currentDate,
  changeFrequency: 'weekly',
  priority: 0.8,
}];

const blogPosts: MetadataRoute.Sitemap = getAllPosts().map(p => ({
  url: `${baseUrl}/blog/${p.slug}`,
  lastModified: new Date(p.updatedAt),
  changeFrequency: 'monthly' as const,
  priority: 0.7,
}));

return [...staticPages, ...productPages, ...blogIndex, ...blogPosts];
```

### A.13 — Navigation — `src/constants/navigation.ts`

Insert a `{ href: '/blog', label: 'المدونة' }` link between `/garden` and `/contact` in the main nav array.

### A.14 — Robots — `src/app/robots.ts`

Add `/blog/` to the `Allow` list. Disallow nothing extra.

### A.15 — Per-article OG image strategy

- Each article gets a custom 1200×630 cover at `/public/blog/{slug}.jpg`.
- Until art is ready, fall back to a single `/og/blog.jpg` template.
- Background: brand-colored, large Arabic title, subtle product photo overlay.

### A.16 — Acceptance criteria (Part A)

- [ ] `/blog` returns 200 and renders 9 cards (we have 10 articles → page 2 has 1)
- [ ] `/blog/page/2` returns 200 with 1 article
- [ ] `/blog/{slug}` returns 200 for all 10 articles
- [ ] Each article page emits `Article` JSON-LD (validate via Rich Results Test)
- [ ] Each article emits `BreadcrumbList` and (if it has FAQ) `FAQPage` JSON-LD
- [ ] Sitemap includes 11 new URLs (blog index + 10 posts)
- [ ] Lighthouse SEO score ≥ 95 on `/blog/{any-slug}`
- [ ] All images use `next/image` and have non-empty `alt`

---

## PART B — First 10 Articles (full specs)

> All articles use the same `BlogPost` shape. Word counts are minimums for the **rendered** body (excluding FAQ and TOC). Internal links must be implemented as anchor tags inside `kind: 'p'` HTML or as `productCallout` blocks.

> The 10 article slugs and IDs map 1:1 to file names in `src/data/blog/`.

---

### Article 1 — أفضل أنواع الموكيت: دليلك الشامل للاختيار

| Field | Value |
|---|---|
| `slug` | `best-carpet-types-guide` |
| `category` | `carpets` |
| `primaryKeyword` | `أنواع الموكيت` |
| `keywords` | `["أنواع الموكيت", "موكيت", "موكيت تركي", "موكيت مشجر", "موكيت منازل", "أفضل موكيت"]` |
| Target impressions | ~1,100/mo (cluster total per knowledge base §13.1) |
| `title` | `أفضل أنواع الموكيت: دليلك الشامل للاختيار في 2026` |
| `metaDescription` | `دليل شامل لأنواع الموكيت: تركي، مشجر، فاخر، موكيت مساجد. تعرّف على المزايا والأسعار والاستخدامات المثلى لكل نوع لتختار الأنسب لبيتك.` |
| `excerpt` | `كيف تختار الموكيت المناسب لكل غرفة في منزلك؟ دليل عملي يقارن بين الأنواع الشائعة بعيون الخبراء.` |
| Min word count | **1,800 words** (pillar content) |
| `relatedProductIds` | `["mokite", "turky-mshager", "mosque-carpets", "water-resistant-carpet"]` |

**Outline (H2/H3):**
- مقدمة — لماذا اختيار الموكيت قرار مهم؟
- ## ما هو الموكيت؟ تعريف وتاريخ موجز
- ## كيف يُصنع الموكيت؟ الخامات والطبقات
  - ### الخامات الطبيعية: الصوف والقطن
  - ### الخامات الصناعية: النايلون والبولي بروبلين
- ## أنواع الموكيت حسب طريقة التصنيع
  - ### الموكيت المنسوج (Woven)
  - ### الموكيت المغروز (Tufted)
  - ### الموكيت المضغوط (Needle Punch)
- ## أنواع الموكيت حسب الاستخدام
  - ### الموكيت التركي المشجر — للمجالس والصالات
  - ### موكيت المنازل — لغرف النوم
  - ### موكيت المساجد — مواصفات شرعية وعملية
  - ### الموكيت التجاري — للمكاتب والمحلات
  - ### موكيت السيارات — متخصص ومقاوم
- ## كيف تختار الموكيت المناسب لكل غرفة
  - ### غرفة المعيشة والمجالس
  - ### غرف النوم
  - ### الممرات والمداخل
- ## أسعار الموكيت في الرياض 2026
- ## نصائح للحفاظ على الموكيت
- ## متى تستبدل الموكيت؟
- ## خلاصة

**Internal linking:**
- Link "الموكيت التركي المشجر" → `/products/turky-mshager`
- Link "موكيت المساجد" → `/products/mosque-carpets`
- Link "موكيت المنازل" → `/products/mokite`
- Add a `productCallout` for `mokite` after the "غرف النوم" section
- Add a `productCallout` for `turky-mshager` after the "غرفة المعيشة والمجالس" section
- Link "أسعار الموكيت في الرياض 2026" → `/blog/carpet-prices-riyadh-2026` (article 5)
- Link "/carpets" once in the conclusion

**CTA (last paragraph):** "هل تحتاج استشارة لاختيار الموكيت المناسب؟ تواصل عبر واتساب 0558352924 أو زر معرضنا في حي العزيزية للحصول على عينات مجانية واستشارة خبير."

**FAQ (5):**
1. ما الفرق بين الموكيت التركي المشجر والسجاد العادي؟
2. أيهما أفضل للأطفال: الموكيت أم الباركيه؟
3. كم مدة عمر الموكيت ذي الجودة العالية؟
4. هل يمكن تركيب الموكيت فوق البلاط؟
5. ما أفضل وقت لشراء الموكيت في الرياض؟

(Answers: 2-4 sentences each in Arabic, written by the implementing agent based on the article content.)

---

### Article 2 — أرضيات فينيل رول: كل ما تحتاج معرفته قبل الشراء

| Field | Value |
|---|---|
| `slug` | `vinyl-roll-flooring-complete-guide` |
| `category` | `flooring` |
| `primaryKeyword` | `فينيل رول` |
| `keywords` | `["فينيل رول", "أرضيات فينيل رول", "فينيل ارضيات", "ارضيات فينيل", "رول فينيل"]` |
| Target impressions | ~400/mo |
| `title` | `أرضيات فينيل رول: كل ما تحتاج معرفته قبل الشراء (2026)` |
| `metaDescription` | `دليل كامل عن أرضيات فينيل رول: الأنواع، الأسعار، طرق التركيب، الصيانة، ومقارنة مع الباركيه والسيراميك. اختر الأفضل لمنزلك أو محلّك.` |
| Min word count | **1,500 words** |
| `relatedProductIds` | `["vinyl-roll", "vinyl-mosque", "hospital-flooring"]` |

**Outline:**
- ## ما هو الفينيل رول؟
- ## مميزات أرضيات الفينيل رول
- ## أنواع الفينيل رول
  - ### الفينيل المنزلي
  - ### الفينيل التجاري
  - ### الفينيل الطبي / المستشفيات
- ## كيف تختار سُمك الفينيل المناسب
- ## مقارنة: الفينيل رول vs البلاط vs الباركيه
- ## كيفية تركيب الفينيل رول
- ## الصيانة والتنظيف
- ## أسعار الفينيل رول في الرياض 2026
- ## أسئلة قبل الشراء

**Internal links:**
- Link "الفينيل الطبي" → `/products/hospital-flooring`
- Link "فينيل مساجد" → `/products/vinyl-mosque`
- `productCallout` for `vinyl-roll` after section "أنواع الفينيل رول"
- Link to `/blog/natural-vs-synthetic-parquet` in the comparison section

**CTA:** زيارة المعرض لمعاينة العينات + رابط `/contact`.

**FAQ (5):** هل الفينيل مقاوم للماء؟ / كم عمر الفينيل رول؟ / هل يمكن تركيبه فوق البلاط؟ / ما الفرق بين LVT وVinyl Roll؟ / هل التركيب مجاني؟

---

### Article 3 — باركيه ضد الماء للمطابخ والحمامات

| Field | Value |
|---|---|
| `slug` | `waterproof-parquet-kitchens-bathrooms` |
| `category` | `parquet` |
| `primaryKeyword` | `باركيه ضد الماء` |
| `keywords` | `["باركيه ضد الماء", "باركيه مقاوم للماء", "باركيه مطابخ", "باركيه حمامات"]` |
| Target impressions | ~200/mo |
| `title` | `باركيه ضد الماء للمطابخ والحمامات: الدليل الكامل` |
| `metaDescription` | `كل ما تريد معرفته عن الباركيه المقاوم للماء: مزاياه، أنواعه، أسعاره، وأفضل استخدامات في المطابخ والحمامات والمناطق الرطبة. ضمان شامل وتركيب احترافي.` |
| Min word count | **1,500 words** |
| `relatedProductIds` | `["water-resistant-carpet", "parket"]` |

**Outline:**
- ## لماذا تحتاج باركيه ضد الماء؟
- ## الفرق بين الباركيه العادي والباركيه المقاوم للماء
- ## كيف يعمل الباركيه ضد الماء؟ (تقنية SPC، WPC)
- ## استخدامات الباركيه ضد الماء
  - ### في المطابخ
  - ### في الحمامات
  - ### في الشرفات والمناطق الخارجية المسقوفة
- ## التركيب: ما الذي يختلف عن الباركيه العادي؟
- ## الأسعار في الرياض
- ## كيف تتعرّف على الباركيه المقاوم للماء الأصلي؟
- ## نصائح الصيانة

**FAQ (5)** + CTA + 1 productCallout for `water-resistant-carpet`.

---

### Article 4 — موكيت مساجد: كيف تختار السجاد المناسب لمسجدك

| Field | Value |
|---|---|
| `slug` | `mosque-carpet-selection-guide` |
| `category` | `carpets` |
| `primaryKeyword` | `موكيت مساجد` |
| `keywords` | `["موكيت مساجد", "سجاد مساجد", "موكيت مسجد", "موكيت للمساجد"]` |
| Target impressions | ~150/mo |
| `title` | `موكيت مساجد: كيف تختار السجاد المناسب لمسجدك` |
| `metaDescription` | `دليل اختيار موكيت المساجد: المواصفات الشرعية، الخامات، النقوش، علامات الصفوف، الأسعار، والصيانة. خبرة متخصصة من العمودي للمفروشات.` |
| Min word count | **1,200 words** |
| `relatedProductIds` | `["mosque-carpets", "vinyl-mosque"]` |

**Outline:**
- ## أهمية اختيار موكيت المسجد بعناية
- ## المواصفات الشرعية لموكيت المساجد
- ## المواصفات العملية: المتانة وسهولة التنظيف
- ## أنواع موكيت المساجد
  - ### الموكيت المنسوج بنقوش المحراب
  - ### الموكيت السادي مع علامات صفوف
  - ### السجاد المُعقَّد (Roll-out)
- ## معايير اختيار اللون والنقش
- ## الأسعار وعروض الجملة
- ## التركيب والصيانة في المساجد

**FAQ (5)** + CTA (طلب عرض جملة عبر الواتساب).

---

### Article 5 — أسعار الموكيت في الرياض 2026

| Field | Value |
|---|---|
| `slug` | `carpet-prices-riyadh-2026` |
| `category` | `prices` |
| `primaryKeyword` | `أسعار الموكيت في الرياض` |
| `keywords` | `["اسعار الموكيت", "موكيت الرياض", "محلات موكيت الرياض", "أسعار موكيت 2026"]` |
| Target impressions | ~150/mo |
| `title` | `أسعار الموكيت في الرياض 2026 — دليل شامل بكل الأنواع` |
| `metaDescription` | `أحدث أسعار الموكيت في الرياض 2026: موكيت تركي، مشجر، مساجد، مكاتب، منازل، عشب صناعي. مقارنة، عوامل التسعير، ومتى تشتري للحصول على أفضل سعر.` |
| Min word count | **1,400 words** |
| `relatedProductIds` | `["mokite", "turky-mshager", "mosque-carpets", "office-flooring"]` |

**Outline:**
- ## نظرة عامة على سوق الموكيت في الرياض 2026
- ## ما الذي يحدّد سعر الموكيت؟
- ## جدول الأسعار التفصيلي حسب النوع (شامل التركيب)
- ## أرخص الخيارات الموثوقة
- ## الخيارات المتوسطة
- ## الخيارات الفاخرة
- ## نصائح لتوفير المال دون التضحية بالجودة
- ## أين تشتري الموكيت في الرياض؟
- ## متى تتوفر العروض والخصومات؟

**Note:** include a real (or mock) **price comparison table** as multiple `kind: 'p'` blocks or as inline HTML. Add disclaimer that prices are indicative.

**FAQ (5)** + strong CTA to `/contact`.

---

### Article 6 — الفرق بين الباركيه الطبيعي والصناعي

| Field | Value |
|---|---|
| `slug` | `natural-vs-synthetic-parquet` |
| `category` | `parquet` |
| `primaryKeyword` | `باركيه خشب طبيعي` |
| `keywords` | `["باركيه خشب طبيعي", "باركيه صناعي", "أرضيات خشبية", "Laminate vs Hardwood"]` |
| Target impressions | ~170/mo |
| `title` | `الباركيه الطبيعي vs الصناعي: أيهما أفضل لمنزلك؟` |
| `metaDescription` | `مقارنة شاملة بين الباركيه الطبيعي والصناعي: المظهر، السعر، المتانة، الصيانة، المقاومة للماء. اختر الأنسب لميزانيتك واحتياجاتك.` |
| Min word count | **1,400 words** |
| `relatedProductIds` | `["parket", "water-resistant-carpet"]` |

**Outline:**
- ## ما هو الباركيه الطبيعي؟
- ## ما هو الباركيه الصناعي (الليمنت/HDF)؟
- ## مقارنة في النقاط الأساسية
  - ### المظهر والملمس
  - ### المتانة والعمر الافتراضي
  - ### المقاومة للخدش والماء
  - ### الصيانة
  - ### السعر
  - ### القيمة المضافة عند البيع
- ## متى تختار الباركيه الطبيعي؟
- ## متى يكون الصناعي هو الخيار الأذكى؟
- ## ماذا عن الخشب الهجين (Engineered Wood)؟

**FAQ (5)** + CTA.

---

### Article 7 — دليل تنسيق الحدائق المنزلية في الرياض

| Field | Value |
|---|---|
| `slug` | `home-garden-landscaping-riyadh-guide` |
| `category` | `garden` |
| `primaryKeyword` | `تنسيق حدائق` |
| `keywords` | `["تنسيق حدائق", "تصميم حدائق", "حدائق منزلية", "عشب صناعي", "شلالات", "نوافير"]` |
| Target impressions | ~65/mo (cluster) |
| `title` | `دليل تنسيق الحدائق المنزلية في الرياض — من الصفر حتى التنفيذ` |
| `metaDescription` | `دليل تنسيق حدائق منزلية في الرياض: أساسيات التصميم، اختيار النباتات، العشب الصناعي، الشلالات والنوافير، أنظمة الري. خطوات عملية وأفكار ملهمة.` |
| Min word count | **1,500 words** |
| `relatedProductIds` | `["artificial-grass", "shlal", "planets", "garden-flooring"]` |

**Outline:** أهمية الحديقة في البيت السعودي — تقييم المساحة — تصميم المخطط — اختيار النباتات للمناخ السعودي — العشب الصناعي vs الطبيعي — الشلالات والنوافير — أنظمة الري الأوتوماتيكية — الإضاءة الخارجية — الميزانية المتوقعة — متى تستعين بمختص؟

**FAQ (5)** + CTA إلى `/garden`.

---

### Article 8 — موكيت المكاتب: كيف تختار الأرضيات المثالية لمكتبك

| Field | Value |
|---|---|
| `slug` | `office-carpet-selection-guide` |
| `category` | `carpets` |
| `primaryKeyword` | `موكيت مكاتب` |
| `keywords` | `["موكيت مكاتب", "أرضيات مكتبية", "موكيت تجاري", "أرضيات شركات"]` |
| Target impressions | ~28/mo (currently pos 78.94 — weak; article will rebuild authority) |
| `title` | `موكيت المكاتب: كيف تختار الأرضيات المثالية لمكتبك` |
| `metaDescription` | `دليل اختيار موكيت المكاتب والشركات: المواصفات التجارية، مستويات الاستهلاك، عزل الصوت، النظافة، الأسعار. حلول لكل أنواع المكاتب.` |
| Min word count | **1,000 words** |
| `relatedProductIds` | `["office-flooring", "vinyl-roll"]` |

---

### Article 9 — أرضيات المستشفيات والمرافق الصحية

| Field | Value |
|---|---|
| `slug` | `hospital-flooring-standards` |
| `category` | `flooring` |
| `primaryKeyword` | `أرضيات المستشفيات` |
| `keywords` | `["أرضية مستشفيات", "فينيل طبي", "أرضيات عيادات", "أرضيات مرافق صحية"]` |
| Target impressions | ~40/mo |
| `title` | `أرضيات المستشفيات والمرافق الصحية: المعايير والأنواع` |
| `metaDescription` | `كل ما تحتاج معرفته عن أرضيات المستشفيات: المعايير العالمية، أنواع الفينيل الطبي، شهادات المطابقة، التركيب، الصيانة، والأسعار في السعودية.` |
| Min word count | **1,200 words** |
| `relatedProductIds` | `["hospital-flooring", "vinyl-roll"]` |

---

### Article 10 — تركيب الموكيت: دليل خطوة بخطوة

| Field | Value |
|---|---|
| `slug` | `carpet-installation-step-by-step` |
| `category` | `guides` |
| `primaryKeyword` | `تركيب الموكيت` |
| `keywords` | `["تركيب موكيت", "فرش موكيت", "كيف يتم تركيب الموكيت", "فني تركيب موكيت بالرياض"]` |
| Target impressions | ~30/mo (intent has 28 imp at pos 37.89 for "فني تركيب موكيت بالرياض") |
| `title` | `تركيب الموكيت: دليل خطوة بخطوة من التحضير إلى التشطيب` |
| `metaDescription` | `دليل تركيب الموكيت من البداية إلى النهاية: التحضير، القياس، الأدوات، الخطوات التفصيلية، نصائح الفنيين، ومتى تستعين بمحترف.` |
| Min word count | **1,300 words** |
| `relatedProductIds` | `["mokite", "turky-mshager"]` |

**CTA emphasizes "service":** "تركيب احترافي في يوم واحد — اتصل لطلب فنّي معتمد."

---

## PART C — Content authoring rules (apply to every article)

1. **Language:** Arabic only. Modern Standard Arabic with light Saudi colloquial flavor where natural ("شفت"/"اشترِ" both fine; avoid heavy dialect).
2. **Primary keyword density:** 1-2% (occurs naturally 8-15 times in a 1,500-word article).
3. **Headings:** primary keyword in the H1; primary or secondary keyword in at least 3 H2s.
4. **First paragraph:** primary keyword within the first 100 words.
5. **Internal links:** ≥ 3 to product pages, ≥ 1 to another blog article (after article 2 ships), ≥ 1 to `/contact` or `/garden` as relevant.
6. **External links:** sparingly to high-authority sources (e.g., Wikipedia, manufacturer sites) — use `rel="noopener noreferrer"`.
7. **Tables/lists:** at least one numbered list and one bullet list per article. Tables are great for prices/specs.
8. **Images:** ≥ 1 cover + ≥ 2 inline images per article. All `alt` text descriptive in Arabic.
9. **CTA:** every article ends with a clear next step (visit showroom, request quote, view product). Last paragraph contains `[BUSINESS.phone.displayLocal]` or links to `/contact`.
10. **No fake stats:** if a number is cited, source it or write "حسب خبرتنا في الميدان".

## PART D — Acceptance criteria (Part B)

- [ ] All 10 article files exist in `src/data/blog/` and export a valid `BlogPost`.
- [ ] Each article meets its minimum word count.
- [ ] Each article has 5 FAQ entries.
- [ ] Each article has ≥ 3 internal links (counting `productCallout` blocks).
- [ ] Each article has a unique cover image at `/public/blog/{slug}.jpg`.
- [ ] Sitemap regenerates with all 10 slugs.
- [ ] Article schema validates for each (`Article` type with publisher, datePublished, image).
- [ ] After publish: GSC shows 10 new URLs indexed within 14 days.
- [ ] Internal-linking audit: 0 broken links from blog → products.

## PART E — Roll-out timeline

| Week | Deliverable |
|---|---|
| 1 | Infrastructure (Part A) merged + reviewed; 1 pilot article published |
| 2 | Articles 2-4 published (one every 2-3 days for steady GSC discovery) |
| 3 | Articles 5-7 |
| 4 | Articles 8-10 |
| 6 | First impressions / position report; identify the 3 best performers and plan v2 |
| 8 | Outreach: pitch the strongest article to 5 Saudi décor/home blogs for backlinks (see SEO-SPEC-OFFPAGE) |

## PART F — Operational note (publish in batches)

Don't publish all 10 on day one — Google's "spam burst" filter slows discovery on freshly created blogs. Publish 1-2 per week for the first month, then accelerate.
