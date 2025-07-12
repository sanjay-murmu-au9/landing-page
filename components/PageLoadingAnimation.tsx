'use client';

import React from 'react';

export default function PageLoadingAnimation() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80 backdrop-blur-sm transition-opacity duration-500">
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24">
          {/* Outer circle */}
          <div className="absolute inset-0 border-4 border-t-[#0c4c34] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          
          {/* Middle circle */}
          <div className="absolute inset-2 border-4 border-t-transparent border-r-[#d4af37] border-b-transparent border-l-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.2s' }}></div>
          
          {/* Inner circle */}
          <div className="absolute inset-4 border-4 border-t-transparent border-r-transparent border-b-[#0c4c34] border-l-transparent rounded-full animate-spin" style={{ animationDuration: '0.8s' }}></div>
          
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-[#d4af37] rounded-full"></div>
          </div>
        </div>
        <p className="mt-4 text-[#0c4c34] font-serif text-lg">Loading luxury experience...</p>
      </div>
    </div>
  );
}
