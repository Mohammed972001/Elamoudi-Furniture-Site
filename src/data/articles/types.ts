/** One article, following specs/002-seo-geo-relaunch/data-model.md «Article». */
export interface ArticleProductLink {
  /** Product id, as in src/data/products.ts. */
  id: string;
  label: string;
}

export interface ArticleSection {
  heading: string;
  /** Paragraphs, in order. */
  body: string[];
  productLinks?: ArticleProductLink[];
}

export interface Article {
  /** Arabic, hyphenated. Must not equal any sister-site blog slug. */
  slug: string;
  title: string;
  /** 120–155 characters. */
  description: string;
  /** The answer-first opening, 2–3 sentences. */
  answer: string;
  sections: ArticleSection[];
  /** The GSC or Ads queries the article targets. Not rendered. */
  queries: string[];
  /** The owner's photo only, a path under public/. */
  image?: string;
  /** Real dates, YYYY-MM-DD. */
  published: string;
  updated: string;
}
