'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookieConsent', 'full');
    setShowBanner(false);
  };

  const acceptEssential = () => {
    localStorage.setItem('cookieConsent', 'essential');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-secondary p-4 shadow-lg z-50 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm md:text-base">
            <p>
              We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. 
              By clicking "Accept All", you consent to our use of cookies.
              <Link href="/cookie-policy" className="underline ml-1 text-primary-light hover:text-white">
                Read our Cookie Policy
              </Link>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={acceptEssential}
              className="px-4 py-2 bg-transparent border border-white text-white text-sm rounded-md hover:bg-white hover:text-secondary transition-colors"
            >
              Essential Only
            </button>
            <button
              onClick={acceptAll}
              className="px-4 py-2 bg-primary text-white text-sm rounded-md hover:bg-primary-light transition-colors"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
