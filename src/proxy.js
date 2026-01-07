import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function proxy(req) {
    const { pathname } = req.nextUrl;
    const role = req.nextauth.token?.role;

    // 1. Admin Protection
    if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // 2. Caregiver Protection (Inboxes & History)
    const isCaregiverPath =
      pathname.startsWith("/dashboard/requests") ||
      pathname.startsWith("/dashboard/history");

    if (isCaregiverPath && role !== "caregiver") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // 3. User Tracking Protection (Family only)
    if (pathname.startsWith("/dashboard/track") && role === "caregiver") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // Basic session check: If false, user is sent to /login
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
);

// Optimized Matcher for Next.js 16
export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /api/auth (NextAuth internal routes)
     * 2. /_next (Static files/images)
     * 3. Public assets (favicon, etc.)
     */
    "/((?!api/auth|_next|favicon.ico|public).*)",
    "/dashboard/:path*",
    "/checkout/:path*",
    "/apply",
    "/cart",
  ],
};
