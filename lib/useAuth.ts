'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface UseAuthReturn {
  isAuthenticated: boolean;
  loading: boolean;
  logout: () => void;
  checkAuth: () => boolean;
}

export default function useAuth(): UseAuthReturn {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Function to check authentication
  const checkAuth = () => {
    if (typeof window === 'undefined') return false;
    
    const cookies = document.cookie.split(';');
    const adminToken = cookies
      .find(cookie => cookie.trim().startsWith('admin_token='))
      ?.split('=')[1];
      
    return !!adminToken;
  };

  useEffect(() => {
    const verifyAuth = () => {
      const isAuth = checkAuth();
      setIsAuthenticated(isAuth);
      
      if (!isAuth) {
        router.push('/admin/login');
      }
      
      setLoading(false);
    };

    verifyAuth();
    
    // Also check auth on focus or visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        verifyAuth();
      }
    };
    
    window.addEventListener('focus', verifyAuth);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('focus', verifyAuth);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [router]);

  const logout = () => {
    // Remove the admin token cookie
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    setIsAuthenticated(false);
    router.push('/admin/login');
  };

  return { isAuthenticated, loading, logout, checkAuth };
}
