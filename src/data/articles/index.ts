import type { Article } from './types';

/**
 * Every live article, newest first. An article is added here only in the release
 * that ships it (specs/002-seo-geo-relaunch/plan.md, «Release calendar»).
 * While this list is empty, /articles returns 404 and nothing links to it.
 */
export const articles: Article[] = [];

export const hasArticles = articles.length > 0;

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export type { Article, ArticleSection, ArticleProductLink } from './types';
