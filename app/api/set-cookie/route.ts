import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set('logged_in', 'true', {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 60 * 60,
    });
  return response;
}