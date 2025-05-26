import { NextConfig } from "next";

const isDev = process.env.NODE_ENV === 'development';
const basePath = '/real-estate-landing';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  basePath: isDev ? '' : basePath,
  assetPrefix: isDev ? '' : basePath,
  // Ensure CSS modules and assets work with the base path
  webpack: (config) => {
    if (!isDev) {
      config.output = config.output || {};
      config.output.publicPath = `${basePath}/`;
    }
    return config;
  },
} as NextConfig;

export default nextConfig;
