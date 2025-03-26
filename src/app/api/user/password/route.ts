import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { hash, compare } from "bcryptjs"

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return new NextResponse(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401 }
      )
    }

    const body = await request.json()
    const { currentPassword, newPassword } = body
    
    if (!currentPassword || !newPassword) {
      return new NextResponse(
        JSON.stringify({ error: "Current password and new password are required" }),
        { status: 400 }
      )
    }

    // Get user with password
    const user = await db.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        password: true,
      },
    })

    if (!user || !user.password) {
      return new NextResponse(
        JSON.stringify({ error: "User not found or using social login" }),
        { status: 400 }
      )
    }

    // Verify current password
    const isPasswordValid = await compare(currentPassword, user.password)
    if (!isPasswordValid) {
      return new NextResponse(
        JSON.stringify({ error: "Current password is incorrect" }),
        { status: 400 }
      )
    }

    // Hash new password
    const hashedPassword = await hash(newPassword, 10)

    // Update user password
    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        password: hashedPassword,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating password:", error)
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    )
  }
} 