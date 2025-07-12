'use client';

import { useEffect, useState } from 'react';

interface ImageSkeletonProps {
  width?: string;
  height?: string;
  className?: string;
  type?: 'pulse' | 'shimmer' | 'dots';
}

export default function ImageSkeleton({ 
  width = '100%', 
  height = '100%', 
  className = '',
  type = 'shimmer'
}: ImageSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate minimum loading time for smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const renderLoadingAnimation = () => {
    switch (type) {
      case 'pulse':
        return (
          <div className={`
            absolute inset-0
            bg-gradient-to-b from-gray-200 to-gray-300 
            animate-pulse-slow
            rounded
            ${isLoading ? 'opacity-100' : 'opacity-0'}
            transition-opacity duration-500
          `} />
        );
        
      case 'dots':
        return (
          <div className={`
            absolute inset-0 flex items-center justify-center
            bg-gray-100/80 backdrop-blur-sm
            ${isLoading ? 'opacity-100' : 'opacity-0'}
            transition-opacity duration-500
          `}>
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-[#0c4c34] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-3 h-3 bg-[#0c4c34] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-3 h-3 bg-[#0c4c34] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        );
        
      case 'shimmer':
      default:
        return (
          <div className={`
            absolute inset-0
            bg-gradient-to-r from-[#0c4c34] via-[#d4af37] to-[#0c4c34]
            bg-[length:400%_100%]
            animate-shimmer
            ${isLoading ? 'opacity-100' : 'opacity-0'}
            transition-opacity duration-500
          `} />
        );
    }
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {renderLoadingAnimation()}
    </div>
  );
}