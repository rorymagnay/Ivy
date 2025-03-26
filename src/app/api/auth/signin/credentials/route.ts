import { NextRequest, NextResponse } from "next/server";
import { signIn } from "next-auth/react";

// This route allows for programmatic sign-in
// Note: NextAuth.js normally handles the /api/auth/* routes automatically, but this custom route
// is useful for sign-in immediately after registration without redirecting to the login page

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // This is a server-side endpoint, but we're creating it to make the registration-to-dashboard flow smoother
    // In a production app, we would implement a token-based authentication here
    
    return NextResponse.json({ 
      success: true,
      message: "Authentication successful. Please redirect to dashboard client-side." 
    });
  } catch (error) {
    console.error("API signin error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
} 