import { MetadataRoute } from 'next'
import { productsDetails } from '@/data/products'

/**
 * Dynamic Sitemap Generator for Al-Amoudi Furniture
 *
 * This generates a sitemap automatically based on the NEXT_PUBLIC_SITE_URL
 * environment variable, making it production-ready for any domain.
 *
 * The sitemap includes:
 * - Homepage
 * - Static pages (about, contact)
 * - All product pages from the products data
 *
 * lastModified is the date a page's content really changed, never the build date.
 * Bump a page's date here (or `updated` in the products data) when its text changes.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Use environment variable for the base URL
  // Falls back to production domain if not set
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elamoudifurniture.com'

  // Static pages with their priorities and change frequencies
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: '2026-11-09',
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: '2026-11-09',
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/carpets`,
      lastModified: '2026-11-09',
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/furniture`,
      lastModified: '2026-11-09',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/decor`,
      lastModified: '2026-11-09',
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: '2026-11-09',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: '2026-11-09',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: '2026-09-29',
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ]

  // Generate product pages dynamically from the products data
  const productPages: MetadataRoute.Sitemap = productsDetails.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: product.updated,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Combine all pages
  return [...staticPages, ...productPages]
}
