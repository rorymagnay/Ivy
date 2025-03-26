import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { content } = await req.json()

    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      )
    }

    // Analyze the essay content
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an expert essay analyzer. Analyze the following essay and provide:
1. Overall score (0-100)
2. Readability score (0-100)
3. Clarity score (0-100)
4. Engagement score (0-100)
5. Grammar score (0-100)
6. Coherence score (0-100)
7. Uniqueness score (0-100)
8. Specific suggestions for improvement with severity levels (low/medium/high)

Format the response as JSON with the following structure:
{
  "metrics": {
    "overall": number,
    "readability": number,
    "clarity": number,
    "engagement": number,
    "grammar": number,
    "coherence": number,
    "uniqueness": number
  },
  "suggestions": [
    {
      "type": "grammar" | "style" | "clarity" | "enhancement" | "coherence" | "uniqueness",
      "text": string,
      "suggestion": string,
      "explanation": string,
      "severity": "low" | "medium" | "high",
      "position": number
    }
  ]
}`
        },
        {
          role: "user",
          content,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    })

    const analysis = JSON.parse(completion.choices[0].message.content || "{}")

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("Error analyzing essay:", error)
    return NextResponse.json(
      { error: "Failed to analyze essay" },
      { status: 500 }
    )
  }
} 