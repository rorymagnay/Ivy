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

    const applications = await db.application.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(applications)
  } catch (error) {
    console.error("Error fetching applications:", error)
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return new NextResponse(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401 }
      )
    }

    const body = await request.json()
    const { university, program, deadline } = body
    
    if (!university || !deadline) {
      return new NextResponse(
        JSON.stringify({ error: "University and deadline are required" }),
        { status: 400 }
      )
    }

    const application = await db.application.create({
      data: {
        userId: session.user.id,
        university,
        program,
        deadline: new Date(deadline),
        status: "research",
        materials: {},
      },
    })

    return NextResponse.json(application)
  } catch (error) {
    console.error("Error creating application:", error)
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    )
  }
} 