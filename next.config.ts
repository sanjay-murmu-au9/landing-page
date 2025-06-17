import { NextConfig } from "next";

const isDev = process.env.NODE_ENV === 'development';
// const basePath = '/landing-page';
const basePath = '';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  basePath: isDev ? '' : basePath,
  assetPrefix: isDev ? '' : basePath,
  trailingSlash: true, // This helps with GitHub Pages routing
  webpack: (config, { isServer }) => {
    if (!isDev && !isServer) {
      config.output = {
        ...config.output,
        publicPath: `${basePath}/_next/`,
        // Ensure chunk filenames are consistent
        chunkFilename: `static/chunks/[name].[chunkhash].js`,
      };
    }
    return config;
  },
} as NextConfig;

export default nextConfig;
