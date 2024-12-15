import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LANGUAGES = ["en", "ar"];
const DEFAULT_LANGUAGE = "en";
const PUBLIC_ROUTES = ["/login"];
const DEFAULT_AUTHENTICATED_ROUTE = "/admin";

// Define route configurations with permissions
const ROUTE_CONFIGS = [
  {
    href: "/admin/platform-management",
    permission: "admin",
  },
  {
    href: "/admin/company",
    permission: "admin",
  },
  {
    href: "/admin/hotels",
    permission: "company",
  },
  {
    href: "/admin/contracts",
    permission: "company",
  },
  {
    href: "/admin/contracts-resources",
    permission: "company",
  },
  {
    href: "/admin/add-package",
    permission: "company",
  },
  {
    href: "/admin/add-package-details",
    permission: "company",
  },
  {
    href: "/admin/package-show",
    permission: "company",
  },
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token");

  // This should be dynamically set from your authentication mechanism
  const userPermission = req.cookies.get("type")?.value || "";
  // const userPermission = "admin";

  // Language handling
  const pathnameIsMissingLocale = LANGUAGES.every(
    (lang) => !pathname.startsWith(`/${lang}/`) && pathname !== `/${lang}`
  );

  if (pathnameIsMissingLocale) {
    const language = getLanguageFromHeader(req) || DEFAULT_LANGUAGE;

    // Avoid infinite loops by checking for a query parameter
    const newUrl = new URL(req.url);
    if (!newUrl.searchParams.has("redirected")) {
      newUrl.searchParams.set("redirected", "true");
      return NextResponse.redirect(
        new URL(`/${language}${pathname}?redirected=true`, req.url)
      );
    }
  }

  const language = pathname.split("/")[1];

  // Redirect from "/" to "/admin" if token exists and user is admin
  if (pathname === "/") {
    if (token && !pathname.startsWith(`/${language}/admin`)) {
      return NextResponse.redirect(new URL(`/${language}/admin`, req.url));
    }
  }

  // Check route permissions
  if (pathname.startsWith(`/${language}/admin`)) {
    // If no token, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL(`/${language}/login`, req.url));
    }

    // Find matching route configuration
    const matchingRoute = ROUTE_CONFIGS.find((route) =>
      pathname.includes(route.href.replace(/^\/[^/]+/, ""))
    );

    // If route requires specific permission and user doesn't have it, redirect
    if (matchingRoute) {
      if (matchingRoute.permission !== userPermission) {
        // Redirect to a default admin or error page based on permission
        return NextResponse.redirect(new URL(`/${language}/admin`, req.url));
      }
    }
  }

  // Redirect authenticated users away from public routes
  if (token && PUBLIC_ROUTES.some((route) => pathname.endsWith(route))) {
    if (!pathname.startsWith(`/${language}${DEFAULT_AUTHENTICATED_ROUTE}`)) {
      return NextResponse.redirect(
        new URL(`/${language}${DEFAULT_AUTHENTICATED_ROUTE}`, req.url)
      );
    }
  }

  // Authentication check for protected routes
  if (!token && !PUBLIC_ROUTES.some((route) => pathname.endsWith(route))) {
    return NextResponse.redirect(new URL(`/${language}/login`, req.url));
  }

  return NextResponse.next();
}

function getLanguageFromHeader(req: NextRequest): string | null {
  const acceptLanguage = req.headers.get("Accept-Language");
  if (!acceptLanguage) return null;

  const preferredLanguage = acceptLanguage
    .split(",")[0]
    .trim()
    .split("-")[0]
    .toLowerCase();
  return LANGUAGES.includes(preferredLanguage) ? preferredLanguage : null;
}

export const config = {
  matcher: [
    "/",
    "/admin/:path*",
    "/profile/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
