import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Hard-coded admin credentials for demonstration
// In a real implementation, this would be verified against your backend API
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'password123', // This would be hashed in a real scenario
  email: 'admin@example.com'
};

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Username and password are required' },
        { status: 400 }
      );
    }
    
    // In a real implementation, this would call your backend API
    // const response = await fetch('https://your-backend-api.com/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ username, password })
    // });
    // const data = await response.json();
    
    // Simple credential check for demonstration
    if (username !== ADMIN_CREDENTIALS.username || password !== ADMIN_CREDENTIALS.password) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: '1', username: ADMIN_CREDENTIALS.username, isAdmin: true },
      JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    // Return success response with token
    return NextResponse.json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        id: '1',
        username: ADMIN_CREDENTIALS.username,
        email: ADMIN_CREDENTIALS.email,
      },
    });
    
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
