import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"

interface EssayProgressProps {
  wordCount: number
  wordLimit: number
  timeSpent?: number
}

export function EssayProgress({
  wordCount,
  wordLimit,
  timeSpent = 0,
}: EssayProgressProps) {
  const progress = Math.min((wordCount / wordLimit) * 100, 100)
  const minutes = Math.floor(timeSpent / 60)
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {wordCount} / {wordLimit} words
          </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Word count and limit</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="text-sm text-muted-foreground">
          {hours > 0 ? `${hours}h ` : ""}
          {remainingMinutes}m
        </div>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  )
} 