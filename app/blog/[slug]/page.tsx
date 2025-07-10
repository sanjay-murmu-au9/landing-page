import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getBlogPostBySlugAsync, getAllBlogPosts } from '@/app/blog/blog-data';
import type { BlogPost } from '@/app/blog/blog-data';

type Params = {
  params: {
    slug: string;
  };
};

// Generate metadata for each blog post
export async function generateMetadata({ params }: Params) {
  // Make sure params is properly awaited and accessed
  const slug = params.slug;
  const post = await getBlogPostBySlugAsync(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | Lakeside Luxury Blog',
    };
  }
  
  return {
    title: `${post.title} | Lakeside Luxury Blog`,
    description: post.excerpt,
    keywords: post.keywords.join(', '),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: Params) {
  // Make sure params is properly awaited and accessed
  const slug = params.slug;
  const post = await getBlogPostBySlugAsync(slug);
  
  if (!post) {
    notFound();
  }
  
  // Find related posts (posts with at least one matching keyword)
  const relatedPosts = getAllBlogPosts()
    .filter(
      (p) => 
        p.slug !== post.slug && 
        p.keywords.some((keyword) => post.keywords.includes(keyword))
    )
    .slice(0, 3);
  
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          {/* Back to Blog */}
          <div className="mb-8">
            <Link href="/blog" className="text-primary hover:text-primary-dark flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Blog
            </Link>
          </div>
          
          {/* Post Header */}
          <div className="mb-6 sm:mb-8 text-center">
            <div className="inline-block bg-primary/10 text-primary px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
              {post.category}
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 sm:mb-6 text-secondary-dark px-1">
              {post.title}
            </h1>
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <div className="flex-shrink-0 mr-3 sm:mr-4">
                <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                  {post.author.charAt(0)}
                </span>
              </div>
              <div className="text-left">
                <p className="text-gray-900 font-medium text-sm sm:text-base">{post.author}</p>
                <p className="text-gray-600 text-xs sm:text-sm">{post.date}</p>
              </div>
            </div>
          </div>
          
          {/* Featured Image */}
          <div className="relative rounded-xl overflow-hidden shadow-xl h-[300px] md:h-[400px] lg:h-[500px] mb-10">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
            />
          </div>
          
          {/* Post Content */}
          <div className="prose prose-base sm:prose-lg max-w-none px-1">
            {post.content.map((section, index) => (
              <section key={index} className="mb-6 sm:mb-8">
                {section.type === 'paragraph' && <p className="text-base sm:text-lg leading-relaxed text-gray-900 font-medium">{section.content}</p>}
                {section.type === 'heading' && (
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-secondary-dark mt-6 sm:mt-8 mb-3 sm:mb-4">{section.content}</h2>
                )}
                {section.type === 'image' && section.url && (
                  <figure className="my-8">
                    <div className="relative h-56 sm:h-64 md:h-80 rounded-lg overflow-hidden shadow-md">
                      <Image
                        src={section.url}
                        alt={section.alt || post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 800px"
                        className="object-cover"
                      />
                    </div>
                    {section.caption && (
                      <figcaption className="text-center text-gray-700 mt-2 px-2 text-sm md:text-base font-medium">{section.caption}</figcaption>
                    )}
                  </figure>
                )}
                {section.type === 'list' && section.items && (
                  <ul className="list-disc pl-4 sm:pl-5 my-3 sm:my-4 text-primary-dark">
                    {section.items.map((item, i) => (
                      <li key={i} className="mb-2 text-base sm:text-lg pl-1 text-gray-900 font-medium">{item}</li>
                    ))}
                  </ul>
                )}
                {section.type === 'quote' && (
                  <blockquote className="border-l-4 border-primary pl-3 sm:pl-4 italic my-5 sm:my-6 text-gray-800 text-base sm:text-lg bg-neutral-50 py-4 px-3 rounded-r">
                    {section.content}
                    {section.author && <footer className="text-right mt-2 text-sm sm:text-base font-medium text-gray-700">— {section.author}</footer>}
                  </blockquote>
                )}
              </section>
            ))}
          </div>
          
          {/* Tags */}
          <div className="mt-10 sm:mt-12 mb-10 sm:mb-16">
            <div className="flex flex-wrap gap-2">
              {post.keywords.map((keyword, index) => (
                <span 
                  key={index} 
                  className="bg-neutral-100 text-gray-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
          
          {/* Share */}
          <div className="border-t border-b border-gray-200 py-4 sm:py-6 my-6 sm:my-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
              <p className="font-semibold text-gray-900 text-sm sm:text-base">Share this article:</p>
              <div className="flex space-x-4">
                <button className="text-gray-600 hover:text-blue-600">
                  <span className="sr-only">Share on Facebook</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="text-gray-600 hover:text-blue-400">
                  <span className="sr-only">Share on Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </button>
                <button className="text-gray-600 hover:text-blue-500">
                  <span className="sr-only">Share on LinkedIn</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="text-gray-600 hover:text-red-600">
                  <span className="sr-only">Share by Email</span>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-12 sm:mt-16">
              <h3 className="text-xl sm:text-2xl font-serif font-bold mb-4 sm:mb-6 text-secondary-dark px-1">Related Articles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Link 
                    href={`/blog/${relatedPost.slug}`} 
                    key={relatedPost.slug} 
                    className="group bg-neutral-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                  >
                    <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
                      <Image
                        src={relatedPost.coverImage}
                        alt={relatedPost.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3 sm:p-4">
                      <h4 className="font-serif font-bold text-sm sm:text-base text-secondary-dark group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">{relatedPost.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
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