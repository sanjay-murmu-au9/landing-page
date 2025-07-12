'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the cookie consent banner with no SSR
const CookieConsentBanner = dynamic(
  () => import('../../components/CookieConsentBanner'),
  { ssr: false }
);

export default function CookieConsentContainer() {
  return <CookieConsentBanner />;
}
