import { authKey } from "@/constance/authKey";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

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

  // Retrieve auth token from cookies
  const authToken = request.cookies.get(authKey)?.value;

  // Handle unauthenticated access
  if (!authToken) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next(); // Allow public routes
    }
    return NextResponse.redirect(new URL("/login", request.url)); // Redirect to login
  }

  // Allow common private routes for authenticated users
  if (
    commonPrivateRoutes.some(
      (route) => pathname === route || pathname.startsWith(route)
    )
  ) {
    return NextResponse.next();
  }

  // Decode JWT token to extract user role
  let decodedData: { role?: Role } | null = null;
  try {
    decodedData = jwtDecode<{ role?: Role }>(authToken);
  } catch (error) {
    // Invalid token - force logout
    console.error("Invalid token, redirecting to login:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = decodedData?.role;

  // Ensure the user has a role
  if (!role || !roleBasedPrivateRoutes[role]) {
    console.error("No valid role found, redirecting to home.");
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Check if the requested route matches the user's allowed routes
  const allowedRoutes = roleBasedPrivateRoutes[role];
  if (allowedRoutes.some((route) => route.test(pathname))) {
    return NextResponse.next(); // Allow access
  }

  // Role does not have access to this route
  console.error(
    `Access denied: Role '${role}' attempted to access '${pathname}'`
  );
  return NextResponse.redirect(new URL("/", request.url));
}

// Configuring route matching
export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*", "/doctors/:path*"],
};
