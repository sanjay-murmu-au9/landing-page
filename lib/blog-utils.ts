import { Metadata } from 'next';
import { generateSEOMetadata } from './seo-utils';
import { BlogPost } from '../app/blog/blog-data';

/**
 * Generates SEO metadata specifically for blog posts
 */
export function generateBlogPostMetadata(post: BlogPost): Metadata {
  const keywords = post.keywords || [];
  const category = post.category ? [post.category] : [];
  
  return generateSEOMetadata({
    title: post.title,
    description: post.excerpt,
    keywords: [...keywords, ...category],
    ogImage: post.coverImage,
    url: `/blog/${post.slug}`,
    type: 'article',
  });
}

/**
 * Extracts the reading time for a blog post
 */
export function getReadingTime(content: any[]): string {
  const wordsPerMinute = 200;
  
  // Extract text content from all paragraph sections
  const textContent = content
    .filter(section => section.type === 'paragraph' || section.type === 'heading')
    .map(section => section.content)
    .join(' ');
  
  const words = textContent.split(' ').length;
  const minutes = Math.ceil(words / wordsPerMinute);
  
  return `${minutes} min read`;
}

/**
 * Formats a date for blog posts
 */
export function formatBlogDate(dateString: string): string {
  const date = new Date(dateString);
  
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}
