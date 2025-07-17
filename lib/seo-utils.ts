import { Metadata } from 'next';

/**
 * Generates SEO metadata for pages based on title, description, and other parameters
 */
export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  ogImage = '/images/hero-luxury-exterior-1.jpg',
  url = '',
  type = 'website',
  twitterCard = 'summary_large_image',
  noIndex = false,
}: {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  url?: string;
  type?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
  noIndex?: boolean;
}): Metadata {
  // Ensure title is properly formatted
  const formattedTitle = title.includes('House of Dreams Realty') 
    ? title 
    : `${title} | House of Dreams Realty`;
  
  // Ensure URL is properly formatted
  const fullUrl = url 
    ? (url.startsWith('http') ? url : `https://houseofdreamsrealty.com${url.startsWith('/') ? url : `/${url}`}`) 
    : 'https://houseofdreamsrealty.com/';
    
  // Ensure image path is absolute
  const fullImagePath = ogImage.startsWith('http') 
    ? ogImage 
    : `https://houseofdreamsrealty.com${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`;
  
  return {
    title: formattedTitle,
    description,
    keywords: [...keywords, 'luxury real estate', 'premium properties', 'Bangalore luxury homes'].join(', '),
    robots: {
      index: !noIndex,
      follow: true,
      nocache: noIndex,
      googleBot: {
        index: !noIndex,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: formattedTitle,
      description,
      url: fullUrl,
      siteName: 'House of Dreams Realty',
      images: [
        {
          url: fullImagePath,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
      locale: 'en_US',
      type,
    },
    twitter: {
      card: twitterCard,
      title: formattedTitle,
      description,
      images: [fullImagePath],
    },
  };
}
