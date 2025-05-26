import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  ...(isDev ? {} : {
    basePath: '/real-estate-landing',
    assetPrefix: '/real-estate-landing',
  }),
};

export default nextConfig;
