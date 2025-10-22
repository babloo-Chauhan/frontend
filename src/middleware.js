// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
    const token = request.cookies.get("accessToken")?.value;
    const { pathname } = request.nextUrl
    const publicPaths = ["/", "/login", "/signup"] // accessible without login
    // If user is NOT logged in and tries to access a protected page
    if (!token && !publicPaths.includes(pathname)) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
    // If user IS logged in and tries to visit login/signup
    if (token && ["/login", "/signup"].includes(pathname)) {
      return NextResponse.redirect(new URL("/account", request.url))
    }
    // Otherwise, allow request
    return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|txt)).*)",
  ],
};
