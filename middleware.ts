import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const CANONICAL_HOST = "kaungsathein.online";
const WWW_HOST = "www.kaungsathein.online";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host");

  if (hostname !== WWW_HOST) {
    const response = NextResponse.next();

    if (hostname?.endsWith(".vercel.app")) {
      response.headers.set("X-Robots-Tag", "noindex, nofollow");
    }

    return response;
  }

  const url = request.nextUrl.clone();
  url.protocol = "https";
  url.host = CANONICAL_HOST;

  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: "/:path*",
};
