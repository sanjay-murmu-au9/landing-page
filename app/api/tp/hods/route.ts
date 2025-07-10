import { NextResponse } from 'next/server';
import { MOCK_HODS, HodUser } from '../models';

// API endpoint to get all House of Dream users
export async function GET() {
  try {
    // In a real implementation, this would call your backend API
    // const response = await fetch('https://your-backend-api.com/hods');
    // const data = await response.json();
    
    // Using mock data for demonstration
    const hods = MOCK_HODS;
    const totalHods = hods.length;
    
    return NextResponse.json({
      success: true,
      data: {
        hods,
        totalHods
      }
    });
  } catch (error) {
    console.error('Error fetching House of Dream users:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch House of Dream users' },
      { status: 500 }
    );
  }
}
