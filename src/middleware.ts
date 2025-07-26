import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/profile', '/bookmarks', '/history'];

const authRoutes = ['/login', '/signup'];

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken');

  if (!token && protectedRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && authRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}
