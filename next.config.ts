import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    // Fix for Turbopack font loading issues
    turbo: {
      resolveAlias: {
        canvas: './empty-module.js',
      },
    },
  },
  // Alternative: disable turbopack for development
  // You can uncomment this if you continue having issues
  // experimental: {
  //   turbo: false,
  // },
};

export default nextConfig;
