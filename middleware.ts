import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "ae_storefront_auth";
const COOKIE_VALUE = "granted";

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get(COOKIE_NAME);

  if (cookie?.value === COOKIE_VALUE) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/storefront-login", request.url);
  loginUrl.searchParams.set("from", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

// Every URL under /storefront requires the password — this covers
// /storefront, /storefront/picabo, and /storefront/teebox, plus any new
// storefront page you add later, automatically.
export const config = {
  matcher: ["/storefront", "/storefront/:path*"],
};