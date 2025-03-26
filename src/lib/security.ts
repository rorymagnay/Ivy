import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'

// Security headers configuration
export const securityHeaders = {
  // HSTS
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  // XSS Protection
  'X-XSS-Protection': '1; mode=block',
  // Content Security Policy
  'Content-Security-Policy': `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
  `.replace(/\s+/g, ' ').trim(),
  // Prevent MIME type sniffing
  'X-Content-Type-Options': 'nosniff',
  // Referrer Policy
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  // Permissions Policy
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  // Frame Options
  'X-Frame-Options': 'DENY',
}

// Rate limiting configuration
const rateLimit = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
}

// CSRF Token validation
export function validateCSRFToken(request: NextRequest) {
  const headersList = headers()
  const csrfToken = headersList.get('X-CSRF-Token')
  const expectedToken = process.env.CSRF_SECRET

  if (!csrfToken || csrfToken !== expectedToken) {
    return new NextResponse(
      JSON.stringify({ error: 'Invalid CSRF token' }),
      { status: 403 }
    )
  }
}

// JWT Configuration
export const jwtConfig = {
  secret: process.env.JWT_SECRET,
  maxAge: 30 * 24 * 60 * 60, // 30 days
  encryption: true,
  algorithms: ['HS256'],
}

// Authentication check middleware
export async function requireAuth(request: NextRequest) {
  const token = await getToken({ req: request as any })
  
  if (!token) {
    return new NextResponse(
      JSON.stringify({ error: 'Authentication required' }),
      { status: 401 }
    )
  }
}

// Input sanitization
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
}

// Password validation
export function validatePassword(password: string): boolean {
  const minLength = 12
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChar
  )
}

// Email validation
export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}

// Security logging
export function logSecurityEvent(
  eventType: string,
  details: Record<string, any>,
  severity: 'low' | 'medium' | 'high'
) {
  // TODO: Implement security logging to a secure logging service
  console.log({
    timestamp: new Date().toISOString(),
    eventType,
    details,
    severity,
  })
}

// Session configuration
export const sessionConfig = {
  maxAge: 30 * 24 * 60 * 60, // 30 days
  secure: process.env.NODE_ENV === 'production',
  httpOnly: true,
  sameSite: 'strict' as const,
  path: '/',
}

// API Rate limiting by endpoint
export const apiRateLimits = {
  '/api/auth/*': {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per windowMs for auth endpoints
  },
  '/api/*': {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per windowMs for other endpoints
  },
}

// Security utility functions
export const security = {
  headers: securityHeaders,
  rateLimit,
  validateCSRFToken,
  requireAuth,
  sanitizeInput,
  validatePassword,
  validateEmail,
  logSecurityEvent,
  sessionConfig,
  apiRateLimits,
} 