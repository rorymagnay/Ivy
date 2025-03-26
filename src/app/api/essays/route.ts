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

    const essays = await db.essay.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
    })

    return NextResponse.json(essays)
  } catch (error) {
    console.error("Error fetching essays:", error)
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
    const { title, content, university, prompt } = body
    
    if (!title || !content || !university) {
      return new NextResponse(
        JSON.stringify({ error: "Title, content, and university are required" }),
        { status: 400 }
      )
    }

    const essay = await db.essay.create({
      data: {
        userId: session.user.id,
        title,
        content,
        university,
        prompt,
        feedback: {},
      },
    })

    return NextResponse.json(essay)
  } catch (error) {
    console.error("Error creating essay:", error)
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    )
  }
} 