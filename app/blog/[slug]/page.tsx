import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ResponsiveImage from '@/components/ResponsiveImage';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getBlogPostBySlugAsync, getAllBlogPosts } from '@/app/blog/blog-data';
import type { BlogPost } from '@/app/blog/blog-data';
import ShareButtons from '@/components/ShareButtons';

// Define type for page props
interface PageParams {
  slug: string;
}

interface PageProps {
  params: PageParams;
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: PageProps) {
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

export default async function BlogPost({ params }: PageProps) {
  // Make sure params is properly awaited and accessed
  const slug = params.slug;
  const post = await getBlogPostBySlugAsync(slug);
  
  // Get the full URL for sharing
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://houseofdreamsreality.com';
  const fullUrl = `${baseUrl}/blog/${slug}`;

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
            <ResponsiveImage
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              objectFit="cover"
              loadingAnimation="shimmer"
              borderRadius="12px"
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
                      <ResponsiveImage
                        src={section.url}
                        alt={section.alt || post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 800px"
                        objectFit="cover"
                        loadingAnimation="pulse"
                        borderRadius="8px"
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
          <div className="border-t border-b border-gray-200 my-6 sm:my-8">
            <ShareButtons url={fullUrl} title={post.title} />
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