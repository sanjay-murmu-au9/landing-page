'use client';

import { useEffect, useState } from 'react';

interface ImageSkeletonProps {
  width?: string;
  height?: string;
  className?: string;
}

export default function ImageSkeleton({ width = '100%', height = '100%', className = '' }: ImageSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate minimum loading time for smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      <div
        className={`
          absolute inset-0
          bg-gradient-to-r from-[#0c4c34] via-[#d4af37] to-[#0c4c34]
          animate-shimmer
          ${isLoading ? 'opacity-100' : 'opacity-0'}
          transition-opacity duration-500
        `}
      />
    </div>
  );
}