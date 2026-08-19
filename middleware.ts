import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignorar archivos estáticos, api y assets internos
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/projects') ||
    pathname.startsWith('/images') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const sessionToken = request.cookies.get('sb-access-token')?.value || request.cookies.get('admin-session')?.value;

  // Proteger todas las rutas /admin excepto /admin/login
  if (pathname.startsWith('/admin')) {
    if (!sessionToken && pathname !== '/admin/login') {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

