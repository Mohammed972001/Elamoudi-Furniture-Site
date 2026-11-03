import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
  },
  turbopack: {
    resolveAlias: {
      canvas: './empty-module.js',
    },
  },

  // Redirect non-www to www (301 permanent) to consolidate Link Equity
  // Also redirect legacy URLs to new URLs
  async redirects() {
    return [
      // Plain http answered 200 on Cloudflare (no "Always Use HTTPS"): send it to
      // the one https host. Cloudflare passes the visitor's scheme in x-forwarded-proto.
      {
        source: '/:path*',
        has: [{ type: 'header', key: 'x-forwarded-proto', value: '^http$' }],
        destination: 'https://www.elamoudifurniture.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'elamoudifurniture.com',
          },
        ],
        destination: 'https://www.elamoudifurniture.com/:path*',
        permanent: true, // 301 redirect — transfers Link Equity
      },
      // Landscaping is not sold any more; these pages move to the closest product.
      {
        source: '/garden',
        destination: '/products/artificial-grass',
        permanent: true,
      },
      {
        source: '/products/garden-flooring',
        destination: '/products/artificial-grass',
        permanent: true,
      },
      {
        source: '/products/sajad',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/products/moqet',
        destination: '/products/mokite',
        permanent: true,
      },
    ];
  },

  // Security & SEO headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

// Lets `next dev` reach the Cloudflare bindings declared in wrangler.jsonc.
initOpenNextCloudflareForDev();
