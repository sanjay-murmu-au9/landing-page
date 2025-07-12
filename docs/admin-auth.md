# Admin Authentication System for Static Export

## Overview

This document explains the client-side authentication system implemented for the admin section of the Lakeside Luxury website, optimized for static export.

## Components

1. **Enhanced Client-Side Protection**
   - `useAuth.ts` hook checks for admin tokens in cookies
   - Redirects unauthenticated users to the login page
   - Provides loading state and logout function
   - Re-checks authentication on window focus and visibility changes

2. **Protected Layout Component**
   - `ProtectedLayout.tsx` wraps all admin routes
   - Prevents unauthorized access to admin pages
   - Shows loading state during authentication check
   - Allows direct access to login page

3. **Login System**
   - Authenticates via API at `https://api.lutui.in/tp/auth/login`
   - Stores authentication token in cookies
   - Token expires after 24 hours

## How It Works

1. The `ProtectedLayout` component wraps all admin pages through the admin layout
2. When a user accesses any admin page, the layout checks for an admin token cookie
3. If no token exists, the user is redirected to the login page
4. The login page authenticates via API and sets the token cookie on success
5. Once authenticated, users can access protected admin content
6. Authentication is re-verified when the browser tab regains focus

## Security Considerations

- Cookie-based authentication with appropriate expiration
- Authentication state is verified on page load, route changes, and tab focus
- Multiple layers of client-side protection
- Visual feedback during authentication checks

## Implementation Files

- `/lib/useAuth.ts` - Enhanced React hook for authentication state management
- `/app/admin/ProtectedLayout.tsx` - Client-side layout wrapper for protection
- `/app/admin/layout.tsx` - Admin layout that applies the protected wrapper
- `/app/admin/login/page.tsx` - Login page implementation
- `/app/admin/dashboard/page.tsx` - Dashboard that uses auth hook
