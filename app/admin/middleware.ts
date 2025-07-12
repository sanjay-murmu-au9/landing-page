import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware runs on the edge, before the request reaches the server
export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g., /admin/dashboard)
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't require authentication
  const isPublicPath = path === '/admin/login';
  
  // Get the token from the cookies
  const token = request.cookies.get('admin_token')?.value;
  
  // If the path is not public and there's no token, redirect to the login page
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // If the user has a token and is trying to access the login page, 
  // redirect them to the dashboard
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }
  
  return NextResponse.next();
}

// Configure the middleware to only run for admin routes
export const config = {
  matcher: [
    '/admin/:path*'
  ],
};
