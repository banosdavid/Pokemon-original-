'use client';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isLoginPage = request.nextUrl.pathname === '/login';

  // For static export, we'll handle auth client-side
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    const isValid = token ? verifyToken(token) : null;

    if (isLoginPage && isValid) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    if (isAdminRoute && !isValid) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};