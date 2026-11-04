import type { Metadata } from 'next';
import { BUSINESS } from '@/constants/business';

type OpenGraph = NonNullable<Metadata['openGraph']>;

/** The share image used when a page has no photos of its own. */
const DEFAULT_IMAGE = {
  url: '/og-image.jpg',
  width: 1200,
  height: 630,
  alt: `${BUSINESS.name} - موكيت وأرضيات`,
};

/**
 * Next.js replaces the layout's openGraph object instead of merging it, so a page that sets only
 * `images` loses og:url, og:type and og:site_name, and a page that sets nothing shares the home
 * page's URL and title. Every page that needs its own values goes through this.
 */
export function pageOpenGraph(
  path: string,
  title: string,
  description?: string,
  images?: OpenGraph['images'],
): OpenGraph {
  return {
    title,
    ...(description && { description }),
    type: 'website',
    locale: 'ar_SA',
    url: path,
    siteName: BUSINESS.name,
    images: images ?? [DEFAULT_IMAGE],
  };
}
