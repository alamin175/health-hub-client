import { authKey } from "@/constance/authKey";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode"; // Recommended: use a proper JWT decoding library

// Define route groups
const AuthRoutes = ["/login", "/register"];
const commonPrivateRoutes = [
  "/dashboard",
  "/dashboard/change-password",
  "/doctors",
];
const roleBasedPrivateRoutes = {
  PATIENT: [/^\/dashboard\/patient/],
  DOCTOR: [/^\/dashboard\/doctor/],
  ADMIN: [/^\/dashboard\/admin/],
  SUPER_ADMIN: [/^\/dashboard\/super-admin/],
};

type Role = keyof typeof roleBasedPrivateRoutes;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Access cookies
  const authToken = request.cookies.get(authKey)?.value;

  // No token for non-auth routes - redirect to login
  if (!authToken) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next(); // Allow public routes
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow access to common private routes
  if (
    commonPrivateRoutes.some(
      (route) => pathname === route || pathname.startsWith(route)
    )
  ) {
    return NextResponse.next();
  }

  // Decode JWT token
  let decodedData: { role?: Role } | null = null;
  try {
    decodedData = jwtDecode<{ role?: Role }>(authToken);
  } catch (error) {
    // Invalid token - force logout
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = decodedData?.role;

  // Role-based access control
  if (role && roleBasedPrivateRoutes[role]) {
    const routes = roleBasedPrivateRoutes[role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  // Default: redirect to home if no access
  return NextResponse.redirect(new URL("/", request.url));
}

// Configuring route matching
export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*", "/doctors/:path*"],
};
