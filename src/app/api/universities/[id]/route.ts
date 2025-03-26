import { NextRequest, NextResponse } from "next/server";
import { getUniversityById } from "@/lib/universities";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const university = getUniversityById(params.id);
    
    if (!university) {
      return NextResponse.json(
        { error: "University not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(university);
  } catch (error) {
    console.error("Error fetching university:", error);
    return NextResponse.json(
      { error: "Failed to fetch university" },
      { status: 500 }
    );
  }
} 