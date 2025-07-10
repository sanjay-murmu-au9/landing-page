import { NextRequest, NextResponse } from 'next/server';
import { MOCK_HODS, HodUser } from '../../models';

// API endpoint to register a new House of Dream user
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Validate required fields
    const { fullName, email, phone } = body;
    
    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Check if user with same email already exists
    const existingUser = MOCK_HODS.find((user: HodUser) => user.email === email);
    
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Email is already registered', statusCode: 409 },
        { status: 409 }
      );
    }
    
    // In a real implementation, this would call your backend API
    // const response = await fetch('https://your-backend-api.com/hod/join', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(body)
    // });
    // const data = await response.json();
    
    // Using mock response for demonstration
    const newUser: HodUser = {
      _id: Date.now().toString(),
      fullName,
      email,
      phone,
      message: body.message || '',
      createdAt: new Date().toISOString(),
      propertyInterest: body.propertyInterest || 'Medium',
      budget: body.budget || 'Not specified',
      callStatus: 'Not Called',
      callNotes: '',
      preferredLocation: body.preferredLocation || ''
    };
    
    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      data: newUser
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating House of Dream user:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to register user' },
      { status: 500 }
    );
  }
}
