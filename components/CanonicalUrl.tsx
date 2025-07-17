'use client';

import { usePathname } from 'next/navigation';
import Head from 'next/head';

interface CanonicalProps {
  baseUrl?: string;
}

export default function CanonicalUrl({ baseUrl = 'https://houseofdreamsrealty.com' }: CanonicalProps) {
  const pathname = usePathname();
  
  // Normalize the pathname to ensure no trailing slash unless it's the homepage
  const normalizedPath = pathname === '/' ? '' : pathname.replace(/\/$/, '');
  
  // Construct the canonical URL
  const canonicalUrl = `${baseUrl}${normalizedPath}`;
  
  return (
    <Head>
      <link rel="canonical" href={canonicalUrl} key="canonical" />
    </Head>
  );
}
