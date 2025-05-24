import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Disable image optimization since GitHub Pages doesn't support Next.js API routes
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'],
  },
  // Update basePath based on your repository name
  // Uncomment and update this line when you create your repository
  basePath: '/landing-page',
};

export default nextConfig;
