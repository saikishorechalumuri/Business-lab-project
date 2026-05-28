import { NextResponse, type NextRequest } from "next/server";

const protectedPrefixes = [
  "/dashboard",
  "/demo",
  "/login",
  "/roles",
  "/reports",
  "/tasks",
  "/agent",
  "/role-selector",
  "/my-reports",
  "/assigned-tasks",
  "/output-report",
  "/ceo",
  "/vp",
  "/manager",
  "/team-member",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = protectedPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const hasAccess = request.cookies.get("business_lab_access")?.value === "granted";
  const demoLoginEnabled = process.env.ENABLE_DEMO_LOGIN === "true";

  if (hasAccess || (demoLoginEnabled && pathname === "/login")) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/about";
  url.searchParams.set("access", "invite-only");
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/demo/:path*",
    "/login",
    "/roles/:path*",
    "/reports/:path*",
    "/tasks/:path*",
    "/agent/:path*",
    "/role-selector/:path*",
    "/my-reports/:path*",
    "/assigned-tasks/:path*",
    "/output-report/:path*",
    "/ceo/:path*",
    "/vp/:path*",
    "/manager/:path*",
    "/team-member/:path*",
  ],
};
