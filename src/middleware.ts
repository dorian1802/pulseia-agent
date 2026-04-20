import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const VALID_LOCALES = ["fr", "en", "nl", "es", "de", "ma", "pt", "it", "tr", "zh", "ja", "ko", "ru", "hi", "ar"];
const DEFAULT_LOCALE = "fr";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files, api, _next, blog-cover images, and internal routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/blog-cover") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a valid locale
  const segments = pathname.split("/");
  const maybeLocale = segments[1];

  if (VALID_LOCALES.includes(maybeLocale)) {
    return NextResponse.next();
  }

  // No locale in URL -> redirect to /fr/...
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  return Response.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|blog-cover|.*\\..*).*)"],
};