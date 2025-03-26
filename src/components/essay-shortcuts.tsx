import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Keyboard } from "lucide-react"

interface Shortcut {
  key: string
  description: string
}

const shortcuts: Shortcut[] = [
  { key: "⌘ + S", description: "Save essay" },
  { key: "⌘ + Z", description: "Undo" },
  { key: "⌘ + ⇧ + Z", description: "Redo" },
  { key: "⌘ + B", description: "Bold" },
  { key: "⌘ + I", description: "Italic" },
  { key: "⌘ + U", description: "Underline" },
  { key: "⌘ + L", description: "Bullet list" },
  { key: "⌘ + ⇧ + L", description: "Numbered list" },
  { key: "⌘ + Q", description: "Quote" },
  { key: "⌘ + K", description: "Code block" },
  { key: "⌘ + A", description: "Analyze essay" },
]

export function EssayShortcuts() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <Keyboard className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" className="w-64">
          <div className="space-y-2">
            <div className="font-medium">Keyboard Shortcuts</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {shortcuts.map((shortcut) => (
                <div key={shortcut.key} className="flex items-center justify-between">
                  <span className="text-muted-foreground">{shortcut.description}</span>
                  <kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">
                    {shortcut.key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
} 