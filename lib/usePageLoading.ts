'use client';

import { useState, useEffect } from 'react';

export function usePageLoading() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Set a minimum loading time for aesthetic purposes
    const minLoadingTime = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    // Check if all images and critical resources have loaded
    const handleLoad = () => {
      if (document.readyState === 'complete') {
        clearTimeout(minLoadingTime);
        setTimeout(() => {
          setLoading(false);
        }, 500); // Slight delay for smoother transition
      }
    };
    
    // Listen for load event
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      
      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(minLoadingTime);
      };
    }
    
    return () => clearTimeout(minLoadingTime);
  }, []);
  
  return loading;
}

export function useImageLoad(src: string) {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    if (!src) {
      setLoaded(true);
      return;
    }
    
    const img = new Image();
    img.src = src;
    
    const handleLoad = () => {
      setLoaded(true);
    };
    
    if (img.complete) {
      setLoaded(true);
    } else {
      img.addEventListener('load', handleLoad);
    }
    
    return () => {
      img.removeEventListener('load', handleLoad);
    };
  }, [src]);
  
  return loaded;
}
