import { useEffect, useState } from "react"
import { Loader2, Check } from "lucide-react"

interface EssayAutosaveProps {
  isSaving: boolean
  lastSaved?: Date
}

export function EssayAutosave({ isSaving, lastSaved }: EssayAutosaveProps) {
  const [showSaved, setShowSaved] = useState(false)

  useEffect(() => {
    if (lastSaved) {
      setShowSaved(true)
      const timer = setTimeout(() => setShowSaved(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [lastSaved])

  if (isSaving) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Saving...</span>
      </div>
    )
  }

  if (showSaved) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Check className="h-4 w-4" />
        <span>Saved</span>
      </div>
    )
  }

  return null
} 