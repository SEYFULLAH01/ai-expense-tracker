import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse, NextRequest, NextFetchEvent } from "next/server";

const publicRoutes = ["/"]; // Define your public routes here

const handleAuth = clerkMiddleware();

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  if (publicRoutes.includes(new URL(req.url).pathname)) {
    return NextResponse.next();
  }
  return handleAuth(req, event);
}

// Stop Middleware running on static files and public folders
export const config = {
  matcher: [
    "/((?!_next/image|_next/static|favicon.ico).*)",
  ],
};