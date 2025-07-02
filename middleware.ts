import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get('logged_in')?.value === 'true';

  console.log('COOKIE:', request.cookies.get('logged_in')?.value);

  const publicPaths = ['/login', '/oauth/callback', '/api', '/unauthorized'];
  const isPublic = publicPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (!isPublic && !isLoggedIn) {
    console.warn('Redirecting to /login due to missing or invalid cookie');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|.*\\..*|favicon.ico).*)'],
};