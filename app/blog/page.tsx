import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ResponsiveImage from '@/components/ResponsiveImage';
// Import directly from the file path
import { getAllBlogPosts, BlogPost, BlogPostSection } from '@/app/blog/blog-data';

export const metadata = {
  title: 'Luxury Real Estate Insights | Lakeside Luxury Blog',
  description: 'Explore our collection of articles on luxury real estate trends, investment insights, and premium property features.',
  keywords: 'luxury real estate blog, property investment, luxury homes, real estate trends, premium properties',
};

export default function Blog() {
  const blogPosts = getAllBlogPosts();
  
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-primary font-semibold mb-2">OUR INSIGHTS</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-secondary-dark">
              Luxury Living Insights
            </h1>
            <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
            <p className="max-w-3xl mx-auto text-lg text-primary-dark font-semibold">
              Explore our collection of articles on luxury real estate trends, investment insights, and premium property features.
            </p>
          </div>

        {/* Featured Post */}
        {blogPosts.length > 0 && (
          <div className="mb-16">
            <Link href={`/blog/${blogPosts[0].slug}`} className="block group">
              <div className="relative rounded-xl overflow-hidden shadow-xl h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] mb-6">
                <ResponsiveImage
                  src={blogPosts[0].coverImage}
                  alt={blogPosts[0].title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 1200px"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform duration-500"
                  loadingAnimation="shimmer"
                  borderRadius="12px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/60 to-transparent flex items-end">
                  <div className="p-4 sm:p-6 md:p-8 text-white">
                    <div className="inline-block bg-primary px-3 py-1 rounded-full text-xs sm:text-sm font-semibold mb-2 sm:mb-4">
                      {blogPosts[0].category}
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-2 sm:mb-4">
                      {blogPosts[0].title}
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg mb-2 sm:mb-4 text-white/90 line-clamp-2 sm:line-clamp-3">
                      {blogPosts[0].excerpt}
                    </p>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 mr-4">
                        <span className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                          {blogPosts[0].author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{blogPosts[0].author}</p>
                        <p className="text-white/70 text-sm">{blogPosts[0].date}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogPosts.slice(1).map((post: BlogPost) => (
            <Link 
              href={`/blog/${post.slug}`} 
              key={post.slug} 
              className="group bg-neutral-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="relative h-64 overflow-hidden">
                <ResponsiveImage
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform duration-500"
                  loadingAnimation="pulse"
                />
              </div>
              <div className="p-6">
                <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold mb-3">
                  {post.category}
                </div>
                <h2 className="text-xl font-serif font-bold mb-3 text-secondary-dark group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-primary-dark mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600 text-sm">{post.date}</p>
                  <span className="text-primary font-semibold group-hover:translate-x-1 transition-transform duration-300">
                    Read More →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-secondary to-secondary-dark rounded-xl p-8 md:p-12 shadow-xl text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4">
              Stay Updated on Luxury Real Estate Trends
            </h3>
            <p className="text-lg mb-6 text-white/90">
              Subscribe to our newsletter for exclusive insights on luxury properties, investment opportunities, and market trends.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 dark-placeholder"
                required
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-light text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs mt-4 text-white/70">
              By subscribing, you agree to our <Link href="/privacy-policy" className="underline hover:text-primary-light">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-[#0c4c34] text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-3 mb-6">
            <Link href="/" className="text-white hover:text-[#d4af37] transition-colors px-2 py-1 min-w-[80px]">Home</Link>
            <Link href="/blog" className="text-white hover:text-[#d4af37] transition-colors px-2 py-1 min-w-[80px]">Blog</Link>
            <Link href="/privacy-policy" className="text-white hover:text-[#d4af37] transition-colors px-2 py-1">Privacy Policy</Link>
            <Link href="/cookie-policy" className="text-white hover:text-[#d4af37] transition-colors px-2 py-1">Cookie Policy</Link>
            <Link href="/disclaimer" className="text-white hover:text-[#d4af37] transition-colors px-2 py-1 min-w-[80px]">Disclaimer</Link>
            <Link href="/term-condtion" className="text-white hover:text-[#d4af37] transition-colors px-2 py-1">Terms & Conditions</Link>
          </div>
          <p className="text-sm">
            © 2025 Prestige Somerville. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
