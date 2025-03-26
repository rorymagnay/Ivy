import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return new NextResponse(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401 }
      )
    }

    const user = await db.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error fetching user:", error)
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    )
  }
}

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
    const { name } = body
    
    if (!name) {
      return new NextResponse(
        JSON.stringify({ error: "Name is required" }),
        { status: 400 }
      )
    }

    const updatedUser = await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error("Error updating user:", error)
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    )
  }
} 