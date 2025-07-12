import { NextRequest, NextResponse } from 'next/server';
import { MOCK_HODS, HodUser } from '../../../models';

// Make this route compatible with static export
export const dynamic = 'force-static';

// Pre-generate paths for all mock users
export function generateStaticParams() {
  return MOCK_HODS.map(user => ({
    id: user._id,
  }));
}

/**
 * PUT handler for updating a specific HOD user (alternative route)
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
        message: 'User updated successfully via alternative route',
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
