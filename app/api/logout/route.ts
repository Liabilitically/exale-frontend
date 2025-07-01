import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set('access_token', '', { httpOnly: true, maxAge: 0, secure: true, sameSite: 'none', path: '/' });
  response.cookies.set('refresh_token', '', { httpOnly: true, maxAge: 0, secure: true, sameSite: 'none', path: '/' });
  response.cookies.set('logged_in', '', { maxAge: 0 });
  return response;
}