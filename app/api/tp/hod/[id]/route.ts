import { NextRequest, NextResponse } from 'next/server';
import { MOCK_HODS, HodUser } from '../../models';

// Make this route compatible with static export
export const dynamic = 'force-static';

// Pre-generate paths for all mock users
export function generateStaticParams() {
  return MOCK_HODS.map(user => ({
    id: user._id,
  }));
}

/**
 * GET handler for fetching a specific HOD user by ID
 */
export function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }
    
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

/**
 * PUT handler for updating a specific HOD user
 */
export function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const getData = async () => {
    try {
      const { id } = params;
      
      if (!id) {
        return NextResponse.json(
          { success: false, message: 'User ID is required' },
          { status: 400 }
        );
      }
      
      const userData = await request.json();
      
      // Mock update for demonstration
      const userIndex = MOCK_HODS.findIndex((user: HodUser) => user._id === id);
      
      if (userIndex === -1) {
        return NextResponse.json(
          { success: false, message: 'User not found' },
          { status: 404 }
        );
      }
      
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
  };
  
  return getData();
}

/**
 * DELETE handler for removing a specific HOD user
 */
export function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }
    
    // Mock delete operation
    const userIndex = MOCK_HODS.findIndex((user: HodUser) => user._id === id);
    
    if (userIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
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
