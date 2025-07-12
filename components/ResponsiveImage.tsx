'use client';

import { useState } from 'react';
import Image from 'next/image';
import ImageSkeleton from './ImageSkeleton';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  priority?: boolean;
  quality?: number;
  fill?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  loadingAnimation?: 'shimmer' | 'pulse' | 'dots';
  borderRadius?: string;
}

export default function ResponsiveImage({
  src,
  alt,
  width,
  height,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  className = '',
  priority = false,
  quality = 85,
  fill = false,
  objectFit = 'cover',
  loadingAnimation = 'shimmer',
  borderRadius = '0px',
}: ResponsiveImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div 
      className={`relative ${className}`}
      style={{
        width: fill ? '100%' : 'auto',
        height: fill ? '100%' : 'auto',
        borderRadius,
        overflow: 'hidden',
      }}
    >
      {isLoading && (
        <ImageSkeleton 
          width="100%" 
          height="100%" 
          className="absolute inset-0 z-10"
          type={loadingAnimation}
        />
      )}
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        sizes={sizes}
        quality={quality}
        priority={priority}
        fill={fill}
        className={`
          transition-opacity duration-700 ease-in-out
          ${isLoading ? 'opacity-0' : 'opacity-100'}
          ${objectFit === 'cover' ? 'object-cover' : ''}
          ${objectFit === 'contain' ? 'object-contain' : ''}
          ${objectFit === 'fill' ? 'object-fill' : ''}
          ${objectFit === 'none' ? 'object-none' : ''}
          ${objectFit === 'scale-down' ? 'object-scale-down' : ''}
        `}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
