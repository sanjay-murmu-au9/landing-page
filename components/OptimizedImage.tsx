'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import ImageSkeleton from './ImageSkeleton';

interface OptimizedImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  fill?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
  loading?: 'eager' | 'lazy';
  style?: React.CSSProperties;
  width?: number;
  height?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
}

export default function OptimizedImage({
  src,
  alt,
  priority = false,
  fill = false,
  className = '',
  sizes = '100vw',
  quality = 85,
  loading = 'lazy',
  style,
  width,
  height,
  objectFit,
  objectPosition
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Adjust image quality based on device
  const adjustedQuality = isMobile ? Math.min(quality, 70) : quality;

  return (
    <div className={`relative ${className}`} style={style}>
      {isLoading && (
        <ImageSkeleton 
          width={width ? `${width}px` : '100%'} 
          height={height ? `${height}px` : '100%'}
          className={className}
        />
      )}
      
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        sizes={sizes}
        quality={adjustedQuality}
        priority={priority}
        loading={loading}
        onLoad={() => setIsLoading(false)}
        className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        style={{
          objectFit: objectFit || 'cover',
          objectPosition: objectPosition || 'center',
          ...style
        }}
      />
    </div>
  );
}
