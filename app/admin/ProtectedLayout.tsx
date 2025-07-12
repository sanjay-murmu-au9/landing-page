'use client';

import { ReactNode, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import useAuth from '@/lib/useAuth';

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const { isAuthenticated, loading, checkAuth } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Skip protection for the login page
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    setMounted(true);

    // Don't redirect on login page
    if (isLoginPage) return;

    // If not authenticated and not loading, redirect to login
    if (!loading && !isAuthenticated && !isLoginPage) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, loading, router, isLoginPage]);

  // Show nothing until mounted to prevent flashing of protected content
  if (!mounted) return null;

  // If on login page, or if authenticated, show the content
  if (isLoginPage || isAuthenticated) {
    return <>{children}</>;
  }

  // Show loading state while checking authentication
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-800">Verifying authentication...</h2>
        <p className="text-gray-500 mt-2">Please wait while we verify your credentials</p>
      </div>
    </div>
  );
}
