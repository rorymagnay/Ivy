import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface EssayAnalysisProps {
  metrics: {
    overall: number
    readability: number
    clarity: number
    engagement: number
    grammar: number
    coherence: number
    uniqueness: number
  }
  suggestions: Array<{
    type: "grammar" | "style" | "clarity" | "enhancement" | "coherence" | "uniqueness"
    text: string
    suggestion: string
    explanation: string
    severity: "low" | "medium" | "high"
    position: number
  }>
}

const severityColors = {
  low: "bg-green-500",
  medium: "bg-yellow-500",
  high: "bg-red-500",
}

const typeColors = {
  grammar: "bg-blue-500",
  style: "bg-purple-500",
  clarity: "bg-indigo-500",
  enhancement: "bg-pink-500",
  coherence: "bg-orange-500",
  uniqueness: "bg-teal-500",
}

export function EssayAnalysis({ metrics, suggestions }: EssayAnalysisProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Essay Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(metrics).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium capitalize">{key}</span>
                  <span className="text-sm text-muted-foreground">{value}/100</span>
                </div>
                <Progress value={value} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Suggestions for Improvement</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="rounded-lg border p-4 space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "capitalize",
                        typeColors[suggestion.type]
                      )}
                    >
                      {suggestion.type}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "capitalize",
                        severityColors[suggestion.severity]
                      )}
                    >
                      {suggestion.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {suggestion.text}
                  </p>
                  <p className="text-sm font-medium">
                    Suggestion: {suggestion.suggestion}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {suggestion.explanation}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
} 