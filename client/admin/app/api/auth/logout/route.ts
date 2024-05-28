// pages/api/auth/logout.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');
  
  if (!sessionToken) {
    return NextResponse.json(
      { message: 'Session token not found' },
      { status: 400 }
    );
  }

  try {
    // Clear the session token cookie
    const response = NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    );
    response.cookies.set('sessionToken', '', { path: '/', httpOnly: true, maxAge: 0 });
    return response;
  } catch (err) {
    return NextResponse.json(
      { message: 'An error occurred during logout' },
      { status: 500 }
    );
  }
}
