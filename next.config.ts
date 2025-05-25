import type { NextConfig } from "next";

// Check if we're in development or production mode
const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  output: 'export',
  // Disable image optimization since GitHub Pages doesn't support Next.js API routes
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'],
  },
  // Only use basePath and assetPrefix in production (for GitHub Pages)
  ...(isDev ? {} : {
    basePath: '/landing-page',
    assetPrefix: '/landing-page',
  }),
};

export default nextConfig;

export default nextConfig;
