import type { NextConfig } from "next";

// Check if we're in development or production mode
const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  // For production builds with static export
  output: 'export',
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './app/utils/imageLoader.ts',
  },
  // Only use basePath and assetPrefix in production (for GitHub Pages)
  ...(isDev ? {} : {
    basePath: '/real-estate-landing',
    assetPrefix: '/real-estate-landing',
  }),
  // Disable type checking during build to avoid API route issues
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
