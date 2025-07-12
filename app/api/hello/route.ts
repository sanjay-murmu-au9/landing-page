import { NextRequest, NextResponse } from 'next/server';

// Make this route compatible with static export
export const dynamic = 'force-static';

// GET handler for a dummy route
export function GET(request: NextRequest) {
  return NextResponse.json({ message: 'Hello World' });
}
