import { NextConfig } from "next";

const isDev = process.env.NODE_ENV;
const isCustomDomain = process.env.NEXT_PUBLIC_CUSTOM_DOMAIN === 'true';
const basePath = isCustomDomain ? '' : '/landing-page';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
  basePath: isCustomDomain ? '' : '/landing-page', // Use '' for custom domain, '/repo-name' for GitHub Pages
  assetPrefix: isCustomDomain ? '' : '/landing-page',
  trailingSlash: true,
  compress: true, // Enable gzip compression
  webpack: (config, { isServer, dev }) => {
    // Optimize JS bundles
    if (!dev) {
      config.optimization
       = {
        ...config.optimization,
        minimize: true,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 90000,
          cacheGroups: {
            default: false,
            vendors: false,
            commons: {
              name: 'commons',
              chunks: 'all',
              minChunks: 2,
            },
            shared: {
              name: (module: any) => {
                const moduleFileName = module
                  .identifier()
                  .split('/')
                  .reduceRight((item: string) => item);
                return `shared-${moduleFileName}`;
              },
              test: /[\\/]node_modules[\\/]/,
              chunks: 'all',
            },
          },
        },
      };
    }

    return config;
  },
} as NextConfig;

export default nextConfig;
