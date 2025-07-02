import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const response = NextResponse.json({ ok: true });
  response.cookies.set('logged_in', 'true', {
    path: '/',
    httpOnly: false,
    secure: true,
    sameSite: 'lax', // CHANGE THIS from 'None' to 'Lax'
    maxAge: 60 * 60,
    });
  return response;
}