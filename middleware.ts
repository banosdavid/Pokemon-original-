import { verifyToken } from "@lib/auth";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const decoded = token ? verifyToken(token) : null;
  const username = decoded?.username;

  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isLoginPage = request.nextUrl.pathname === '/login';
  const isBattlePage = request.nextUrl.pathname === '/admin/dashboard/Battle';

  // Si está en login y ya tiene token válido → redirigir a dashboard
  if (isLoginPage && decoded) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  // Si quiere entrar a admin sin token válido → redirigir a login
  if (isAdminRoute && !decoded) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Si es jugador1 y quiere acceder a una página que no sea Battle → redirigir a Battle
  if (username === 'jugador1' && isAdminRoute && !isBattlePage) {
    return NextResponse.redirect(new URL('/admin/dashboard/Battle', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};
