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
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Use environment variable for the base URL
  // Falls back to production domain if not set
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elamoudifurniture.com'

  // Current date for lastModified
  const currentDate = new Date()

  // Static pages with their priorities and change frequencies
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/carpets`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/curtains`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/garden`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kitchens`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  // Generate product pages dynamically from the products data
  const productPages: MetadataRoute.Sitemap = productsDetails.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Combine all pages
  return [...staticPages, ...productPages]
}
