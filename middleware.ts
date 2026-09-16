import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "ae_storefront_auth";
const COOKIE_VALUE = "granted";

export function middleware(request: NextRequest) {
  const isAuthed = request.cookies.get(COOKIE_NAME)?.value === COOKIE_VALUE;

  if (isAuthed) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/storefront-login", request.url);
  loginUrl.searchParams.set("from", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/storefront/:path*"],
};