import { MetadataRoute } from 'next'

/**
 * Dynamic Robots.txt Generator for Al-Amoudi Furniture
 * 
 * This generates robots.txt automatically based on the NEXT_PUBLIC_SITE_URL
 * environment variable, ensuring the sitemap URL is always correct.
 */
export default function robots(): MetadataRoute.Robots {
  // Use environment variable for the base URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elamoudifurniture.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/products/',
          '/about',
          '/contact',
          '/carpets',
          '/decor',
        ],
        // /_next/ stays open: it serves the CSS, JS and next/image product photos
        // that Google and Bing need to render the pages and index the images.
        disallow: [
          '/api/',
          '/admin/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
