import type { NextConfig } from "next";

// Check if we're in development or production mode
const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Only use basePath and assetPrefix in production (for GitHub Pages)
  ...(isDev ? {} : {
    basePath: '/real-estate-landing',
    assetPrefix: '/real-estate-landing',
  }),
};

export default nextConfig;
