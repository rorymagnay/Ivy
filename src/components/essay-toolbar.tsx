import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Code,
  Upload,
  Undo,
  Redo,
  Save,
  Share2,
  Wand2,
  GraduationCap,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useRef } from "react"

interface EssayToolbarProps {
  onFormat: (format: string) => void
  onUndo: () => void
  onRedo: () => void
  onSave: () => void
  onShare: () => void
  onAnalyze: () => void
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  isUploading: boolean
  showFormatting: boolean
  setShowFormatting: (show: boolean) => void
  prompt?: string
}

export function EssayToolbar({
  onFormat,
  onUndo,
  onRedo,
  onSave,
  onShare,
  onAnalyze,
  onFileUpload,
  isUploading,
  showFormatting,
  setShowFormatting,
  prompt,
}: EssayToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="space-y-4">
      {prompt && (
        <div className="p-4 rounded-lg border bg-muted/50">
          <div className="flex items-start gap-2">
            <GraduationCap className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <div className="font-medium">Prompt</div>
              <div className="text-sm text-muted-foreground">{prompt}</div>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFormatting(!showFormatting)}
          >
            Formatting
          </Button>
          {showFormatting && (
            <div className="flex items-center gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onFormat("bold")}
                    >
                      <Bold className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Bold</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onFormat("italic")}
                    >
                      <Italic className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Italic</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onFormat("underline")}
                    >
                      <Underline className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Underline</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onFormat("list")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Bullet List</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onFormat("numbered")}
                    >
                      <ListOrdered className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Numbered List</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onFormat("quote")}
                    >
                      <Quote className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Quote</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onFormat("code")}
                    >
                      <Code className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Code Block</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".txt,.doc,.docx"
            onChange={onFileUpload}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onUndo}>
            <Undo className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={onRedo}>
            <Redo className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={onSave} className="gradient-bg">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" onClick={onShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" onClick={onAnalyze}>
            <Wand2 className="h-4 w-4 mr-2" />
            Analyze
          </Button>
        </div>
      </div>
    </div>
  )
} 