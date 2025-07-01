// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token');

  const publicPaths = ['/login', '/oauth/callback', '/api', '/unauthorized'];
  const isPublic = publicPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (!isPublic && !accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|static|favicon.ico).*)'],
};