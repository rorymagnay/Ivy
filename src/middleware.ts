import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { security } from "@/lib/security";

// Rate limiting
const ipRequestCounts = new Map<string, { count: number; timestamp: number }>();

// Protected routes that require authentication
const protectedPaths = [
  "/dashboard",
  "/essays",
  "/applications",
  "/settings",
  "/profile",
];

// Public paths that should redirect to dashboard if authenticated
const publicPaths = ["/login", "/register"];

// Type-safe API rate limits
type ApiRateLimits = typeof security.apiRateLimits;
type ApiPath = keyof ApiRateLimits;

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Apply security headers
  Object.entries(security.headers).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Get IP address for rate limiting
  const ip = request.ip ?? "unknown";
  
  // Basic rate limiting
  const now = Date.now();
  const windowMs = security.rateLimit.windowMs;
  const maxRequests = security.rateLimit.max;

  const requestRecord = ipRequestCounts.get(ip);
  if (requestRecord) {
    if (now - requestRecord.timestamp < windowMs) {
      if (requestRecord.count >= maxRequests) {
        return new NextResponse(
          JSON.stringify({ error: "Too many requests" }),
          { status: 429, headers: { "Retry-After": "900" } }
        );
      }
      requestRecord.count++;
    } else {
      requestRecord.count = 1;
      requestRecord.timestamp = now;
    }
  } else {
    ipRequestCounts.set(ip, { count: 1, timestamp: now });
  }

  // API-specific rate limiting
  if (request.nextUrl.pathname.startsWith("/api/")) {
    const apiPath = Object.keys(security.apiRateLimits).find(path => {
      const pattern = new RegExp(path.replace("*", ".*"));
      return pattern.test(request.nextUrl.pathname);
    }) as ApiPath | undefined;

    if (apiPath) {
      const limit = security.apiRateLimits[apiPath];
      const apiRequestRecord = ipRequestCounts.get(`${ip}-${apiPath}`);
      
      if (apiRequestRecord) {
        if (now - apiRequestRecord.timestamp < limit.windowMs) {
          if (apiRequestRecord.count >= limit.max) {
            return new NextResponse(
              JSON.stringify({ error: "Too many requests to this API endpoint" }),
              { status: 429, headers: { "Retry-After": "900" } }
            );
          }
          apiRequestRecord.count++;
        } else {
          apiRequestRecord.count = 1;
          apiRequestRecord.timestamp = now;
        }
      } else {
        ipRequestCounts.set(`${ip}-${apiPath}`, { count: 1, timestamp: now });
      }
    }
  }

  // Authentication checks
  const token = await getToken({ req: request as any });
  const isAuthenticated = !!token;
  const path = request.nextUrl.pathname;

  // Redirect authenticated users away from public pages
  if (isAuthenticated && publicPaths.some(p => path.startsWith(p))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Require authentication for protected routes
  if (!isAuthenticated && protectedPaths.some(p => path.startsWith(p))) {
    const searchParams = new URLSearchParams({
      callbackUrl: encodeURI(request.nextUrl.pathname),
    });
    return NextResponse.redirect(new URL(`/login?${searchParams}`, request.url));
  }

  // CSRF protection for mutations
  if (["POST", "PUT", "DELETE", "PATCH"].includes(request.method)) {
    const csrfResult = security.validateCSRFToken(request);
    if (csrfResult instanceof NextResponse) {
      return csrfResult;
    }
  }

  // Clean up old rate limit records every hour
  if (Math.random() < 0.001) { // 0.1% chance on each request
    const hourAgo = Date.now() - 3600000;
    Array.from(ipRequestCounts.entries()).forEach(([key, value]) => {
      if (value.timestamp < hourAgo) {
        ipRequestCounts.delete(key);
      }
    });
  }

  return response;
}

// Configure middleware to run only on matching patterns
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api/auth/* (authentication endpoints)
     * 2. /_next/* (Next.js internals)
     * 3. /fonts/* (inside public directory)
     * 4. /images/* (inside public directory)
     * 5. /favicon.ico, /sitemap.xml (public files)
     */
    "/((?!api/auth|_next|fonts|images|favicon.ico|sitemap.xml).*)",
  ],
}; 