import { NextResponse } from "next/server";

const protectedRoutes = ["/homepage", "/book", "/appointments", "/gallery", "/pricing", "/admin"];
const adminRoutes = ["/admin"];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const role = request.cookies.get("role")?.value;

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

  if (isProtected && !role) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAdminRoute && role !== "admin") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/homepage/:path*", "/book/:path*", "/appointments/:path*", "/gallery/:path*", "/pricing/:path*", "/admin/:path*"],
};
