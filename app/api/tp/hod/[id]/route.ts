import { NextResponse } from 'next/server';
import { MOCK_HODS, HodUser } from '../../models';

interface HodParams {
  id: string;
}

// API endpoint to get a specific HOD user by ID
export async function GET(
  request: Request,
  { params }: { params: HodParams }
) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }
    
    // In a real implementation, this would call your backend API
    // const response = await fetch(`https://your-backend-api.com/hod/${id}`);
    // const data = await response.json();
    
    // Using mock data for demonstration
    const hod = MOCK_HODS.find((user: HodUser) => user._id === id);
    
    if (!hod) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: hod
    });
  } catch (error) {
    console.error('Error fetching House of Dream user:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

// API endpoint to update a specific HOD user
export async function PUT(
  request: Request,
  { params }: { params: HodParams }
) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }
    
    const userData = await request.json();
    
    // In a real implementation, this would call your backend API
    // const response = await fetch(`https://your-backend-api.com/hod/${id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(userData)
    // });
    // const data = await response.json();
    
    // Mock update for demonstration
    const userIndex = MOCK_HODS.findIndex((user: HodUser) => user._id === id);
    
    if (userIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    // In a real implementation, this would update the database
    // For mock purposes, we'll just return the updated user
    const updatedUser = {
      ...MOCK_HODS[userIndex],
      ...userData,
      _id: id // Ensure ID doesn't change
    };
    
    return NextResponse.json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    });
  } catch (error) {
    console.error('Error updating House of Dream user:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// API endpoint to delete a specific HOD user
export async function DELETE(
  request: Request,
  { params }: { params: HodParams }
) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }
    
    // In a real implementation, this would call your backend API
    // const response = await fetch(`https://your-backend-api.com/hod/${id}`, {
    //   method: 'DELETE'
    // });
    // const data = await response.json();
    
    // Mock delete operation
    const userIndex = MOCK_HODS.findIndex((user: HodUser) => user._id === id);
    
    if (userIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    // In a real implementation, this would delete from the database
    // For mock purposes, we'll just return success
    
    return NextResponse.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting House of Dream user:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete user' },
      { status: 500 }
    );
  }
}
