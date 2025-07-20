import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Make this route compatible with static export
export const dynamic = 'force-static';

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

import { API_BASE_URL } from '@/lib/apiConfig';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Username and password are required' },
        { status: 400 }
      );
    }

    const response = await fetch(`${API_BASE_URL}/tp/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data.message || 'Invalid credentials' },
        { status: response.status }
      );
    }

    // Use the token from the API response
    const token = data.token;

    // Return success response with token
    const resp = NextResponse.json({
      success: true,
      token
    });

    // Set cookie with appropriate options
    resp.cookies.set('admin_token', token, {
      path: '/',
      maxAge: 86400, // 24 hours
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return resp;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
