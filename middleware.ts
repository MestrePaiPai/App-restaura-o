export { auth as middleware } from '@/auth';

export const config = {
  matcher: ['/staff/:path*', '/admin/:path*', '/api/staff/:path*', '/api/admin/:path*']
};
