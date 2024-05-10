import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


const publicPaths = ['/log-in', '/register'];
const privatePaths = ['/dashboard', '/order', '/user', '/product']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get('sessionToken')?.value;

  // Nếu chưa đăng nhập và không có token, thì sẽ back về log-in
  if (privatePaths.includes(pathname) && !sessionToken) {
    return NextResponse.redirect(new URL('/log-in', request.url))
  }
  // Nếu đã đang nhập rồi thì ko back về được trang publict được nữa
  if (publicPaths.includes(pathname) && sessionToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  return NextResponse.next();
}

export const config = {
  matcher: [...publicPaths, ...privatePaths],
};
