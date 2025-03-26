interface Essay {
  id: string;
  content: string;
  prompt: string;
  wordCount: number;
  university: string;
}

interface CoherenceResult {
  score: number;
  feedback: string[];
  suggestions: string[];
  themes: string[];
}

export async function checkEssayCoherence(
  essays: Essay[]
): Promise<CoherenceResult> {
  // In a real implementation, this would call an AI service to analyze the essays
  // For now, we'll return a mock result
  return {
    score: 0.85,
    feedback: [
      "Strong narrative consistency across essays",
      "Clear personal growth trajectory",
      "Well-developed character traits",
    ],
    suggestions: [
      "Consider adding more specific examples in the Harvard essay",
      "Expand on your leadership experience in the Yale essay",
      "Connect your academic interests more explicitly across essays",
    ],
    themes: [
      "Leadership",
      "Academic Excellence",
      "Community Service",
      "Personal Growth",
    ],
  };
}

export function getEssayThemes(essays: Essay[]): string[] {
  // In a real implementation, this would use NLP to extract themes
  // For now, we'll return mock themes
  return [
    "Leadership",
    "Academic Excellence",
    "Community Service",
    "Personal Growth",
  ];
}

export function calculateWordCount(text: string): number {
  return text.trim().split(/\s+/).length;
}

export function formatWordCount(count: number, limit: number): string {
  return `${count}/${limit} words`;
} 