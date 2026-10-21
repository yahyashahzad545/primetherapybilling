import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE, verifySessionToken } from "@/libs/adminAuth";

// Guards the blog admin: its pages and every API that writes posts or uploads images.
// The sign-in page and the sign-in/out endpoints stay open.
const OPEN_PATHS = ["/admin/login", "/api/admin/login", "/api/admin/logout"];

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (OPEN_PATHS.includes(pathname)) return NextResponse.next();

  const signedIn = await verifySessionToken(request.cookies.get(ADMIN_COOKIE)?.value);
  if (signedIn) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
  const login = new URL("/admin/login", request.url);
  login.searchParams.set("next", pathname + search);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/api/blog/:path*", "/api/uploads/:path*", "/api/uploads"],
};
