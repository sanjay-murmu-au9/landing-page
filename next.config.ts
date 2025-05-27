import { NextConfig } from "next";

const isDev = process.env.NODE_ENV === 'development';
const basePath = '/landing-page';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  basePath: isDev ? '' : basePath,
  assetPrefix: isDev ? '' : basePath,
  // Simplified webpack config for CSS handling
  webpack: (config) => {
    if (!isDev) {
      config.output = config.output || {};
      config.output.publicPath = `${basePath}/`;
    }
    return config;
  },
} as NextConfig;

export default nextConfig;
