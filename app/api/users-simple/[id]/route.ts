import { NextRequest, NextResponse } from 'next/server';

// Make this route compatible with static export
export const dynamic = 'force-static';

// Pre-generate static paths for IDs 1-5
export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
  ];
}

// Simple GET handler for dynamic id parameter
export function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({ 
    message: `Hello from user ${params.id}` 
  });
}
