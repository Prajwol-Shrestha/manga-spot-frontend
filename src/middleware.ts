import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/profile', '/bookmarks', '/history'];

const authRoutes = ['/login', '/signup', '/reset-password', '/forgot-password'];

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken');
  const url = request.nextUrl;

  if (url.pathname === '/reset-password') {
    const token = url.searchParams.get('token');
    const email = url.searchParams.get('email');

    if (!token || !email) {
      url.pathname = '/';
      url.search = '';
      return NextResponse.redirect(url);
    }
  }

  if (!token && protectedRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && authRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}
