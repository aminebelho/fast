import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token");

  // Log the token to check its value in the middleware
  console.log("Token in middleware:", token);

  // If no token is found, redirect to the login page
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next(); // Allow the user to proceed if the token is found
}

export const config = {
  matcher: ["/", "/tasks", "/addTask"], // Protect these routes
};
