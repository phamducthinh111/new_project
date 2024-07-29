import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


const publicPaths = ['/log-in', '/register'];
const privatePaths = ['/profile', '/order-history']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get('sessionToken')?.value;

  // Nếu chưa đăng nhập và không có token, thì sẽ back về trang chủ
  if (privatePaths.includes(pathname) && !sessionToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  // Nếu đã đang nhập rồi thì ko back về được trang publict được nữa
  if (publicPaths.includes(pathname) && sessionToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/log-in', '/register', '/profile', '/order-history'],
};
