import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// Make this route compatible with static export
export const dynamic = 'force-static';

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();

    // Validate input
    if (!username || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // In a real implementation, this would call your backend API
    // const checkResponse = await fetch(`https://your-backend-api.com/admins/check?username=${username}&email=${email}`);
    // const exists = await checkResponse.json();
    //
    // if (exists.found) {
    //   return NextResponse.json(
    //     { success: false, message: 'Username or email already exists' },
    //     { status: 409 }
    //   );
    // }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // In a real implementation, this would call your backend API
    // const createResponse = await fetch('https://your-backend-api.com/admins', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ username, email, password: hashedPassword, isAdmin: true })
    // });
    // const newAdmin = await createResponse.json();

    // Mock response for demonstration
    const newAdmin = {
      id: '1',
      username,
      email,
      isAdmin: true
    };

    // Return success without password
    return NextResponse.json({
      success: true,
      message: 'Admin created successfully',
      data: newAdmin
    }, { status: 201 });

  } catch (error) {
    console.error('Admin creation error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create admin user' },
      { status: 500 }
    );
  }
}
