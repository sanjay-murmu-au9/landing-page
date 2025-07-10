import { NextResponse } from 'next/server';

// Test API endpoint for House of Dream
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      message: 'House of Dream API is working!',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in test endpoint:', error);
    return NextResponse.json(
      { success: false, message: 'Test endpoint error' },
      { status: 500 }
    );
  }
}
