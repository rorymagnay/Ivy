"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Lightbulb,
  GraduationCap,
  Wand2,
  Upload,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Code,
  Undo,
  Redo,
  Save,
  Share2,
  Loader2,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useDebounce } from "@/hooks/use-debounce"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { ScrollArea } from "@/components/ui/scroll-area"
import { EssayAnalysis } from "@/components/essay-analysis"
import { EssayToolbar } from "@/components/essay-toolbar"
import { EssayProgress } from "@/components/essay-progress"
import { EssayAutosave } from "@/components/essay-autosave"
import { EssayShortcuts } from "@/components/essay-shortcuts"
import { EssayUpload } from "@/components/essay-upload"
import { useHistory } from "@/components/essay-history"

interface WritingMetrics {
  readability: number
  clarity: number
  engagement: number
  grammar: number
  overall: number
  coherence: number
  uniqueness: number
}

interface WritingSuggestion {
  type: "grammar" | "style" | "clarity" | "enhancement" | "coherence" | "uniqueness"
  text: string
  suggestion: string
  explanation: string
  severity: "low" | "medium" | "high"
  position: number
}

interface EssayEditorProps {
  initialContent?: string
  prompt?: string
  wordLimit?: number
  onSave?: (content: string) => void
  onShare?: () => void
}

export function EssayEditor({
  initialContent = "",
  prompt,
  wordLimit = 5000,
  onSave,
  onShare,
}: EssayEditorProps) {
  const {
    currentContent: content,
    addToHistory,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useHistory({ initialContent })

  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)
  const [metrics, setMetrics] = useState<WritingMetrics>({
    readability: 0,
    clarity: 0,
    engagement: 0,
    grammar: 0,
    overall: 0,
    coherence: 0,
    uniqueness: 0,
  })
  const [suggestions, setSuggestions] = useState<WritingSuggestion[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [showFormatting, setShowFormatting] = useState(false)
  const [timeSpent, setTimeSpent] = useState(0)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date>()
  const debouncedContent = useDebounce(content)
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleSave = useCallback(async () => {
    setIsSaving(true)
    try {
      await onSave?.(content)
      setLastSaved(new Date())
      toast({
        title: "Essay saved",
        description: "Your changes have been saved successfully.",
      })
    } catch (error) {
      toast({
        title: "Save failed",
        description: "There was an error saving your essay. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }, [content, onSave, toast])

  useEffect(() => {
    if (debouncedContent && debouncedContent !== initialContent) {
      handleSave()
    }
  }, [debouncedContent, initialContent, handleSave])

  const analyzeEssay = useCallback(async () => {
    if (!content.trim()) return

    setIsAnalyzing(true)
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze essay")
      }

      const data = await response.json()
      setAnalysis(data)
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your essay. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }, [content, toast])

  useEffect(() => {
    if (debouncedContent) {
      analyzeEssay()
    }
  }, [debouncedContent, analyzeEssay])

  const handleFileUpload = useCallback((content: string) => {
    addToHistory(content)
  }, [addToHistory])

  const handleShare = useCallback(() => {
    onShare?.()
    toast({
      title: "Share Link Copied",
      description: "The share link has been copied to your clipboard.",
    })
  }, [onShare, toast])

  const getWordCount = useCallback(() => {
    return content.trim().split(/\s+/).filter(Boolean).length
  }, [content])

  const getSeverityColor = (severity: WritingSuggestion["severity"]) => {
    switch (severity) {
      case "high":
        return "text-red-500"
      case "medium":
        return "text-yellow-500"
      case "low":
        return "text-blue-500"
      default:
        return "text-gray-500"
    }
  }

  const handleFormat = useCallback((format: string) => {
    const textarea = document.querySelector('textarea')
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)
    let newText = content

    switch (format) {
      case 'bold':
        newText = content.substring(0, start) + `**${selectedText}**` + content.substring(end)
        break
      case 'italic':
        newText = content.substring(0, start) + `*${selectedText}*` + content.substring(end)
        break
      case 'underline':
        newText = content.substring(0, start) + `__${selectedText}__` + content.substring(end)
        break
      case 'list':
        newText = content.substring(0, start) + `\n- ${selectedText}` + content.substring(end)
        break
      case 'numbered':
        newText = content.substring(0, start) + `\n1. ${selectedText}` + content.substring(end)
        break
      case 'quote':
        newText = content.substring(0, start) + `> ${selectedText}` + content.substring(end)
        break
      case 'code':
        newText = content.substring(0, start) + `\`${selectedText}\`` + content.substring(end)
        break
    }

    addToHistory(newText)
  }, [content, addToHistory])

  const handleUndo = useCallback(() => {
    if (canUndo) {
      undo()
      toast({
        title: "Undo",
        description: "Last action undone",
      })
    }
  }, [canUndo, undo, toast])

  const handleRedo = useCallback(() => {
    if (canRedo) {
      redo()
      toast({
        title: "Redo",
        description: "Last action redone",
      })
    }
  }, [canRedo, redo, toast])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if the target is an input or textarea
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return
      }

      // Save
      if ((event.metaKey || event.ctrlKey) && event.key === 's') {
        event.preventDefault()
        handleSave()
      }

      // Undo
      if ((event.metaKey || event.ctrlKey) && event.key === 'z' && !event.shiftKey) {
        event.preventDefault()
        handleUndo()
      }

      // Redo
      if ((event.metaKey || event.ctrlKey) && event.key === 'z' && event.shiftKey) {
        event.preventDefault()
        handleRedo()
      }

      // Bold
      if ((event.metaKey || event.ctrlKey) && event.key === 'b') {
        event.preventDefault()
        handleFormat('bold')
      }

      // Italic
      if ((event.metaKey || event.ctrlKey) && event.key === 'i') {
        event.preventDefault()
        handleFormat('italic')
      }

      // Underline
      if ((event.metaKey || event.ctrlKey) && event.key === 'u') {
        event.preventDefault()
        handleFormat('underline')
      }

      // Bullet list
      if ((event.metaKey || event.ctrlKey) && event.key === 'l' && !event.shiftKey) {
        event.preventDefault()
        handleFormat('list')
      }

      // Numbered list
      if ((event.metaKey || event.ctrlKey) && event.key === 'l' && event.shiftKey) {
        event.preventDefault()
        handleFormat('numbered')
      }

      // Quote
      if ((event.metaKey || event.ctrlKey) && event.key === 'q') {
        event.preventDefault()
        handleFormat('quote')
      }

      // Code block
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        handleFormat('code')
      }

      // Analyze
      if ((event.metaKey || event.ctrlKey) && event.key === 'a') {
        event.preventDefault()
        analyzeEssay()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleSave, handleUndo, handleRedo, handleFormat, analyzeEssay])

  return (
    <div className="space-y-4">
      <Tabs defaultValue="write" className="w-full">
        <TabsList>
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="analyze">Analysis</TabsTrigger>
        </TabsList>
        <TabsContent value="write" className="space-y-4">
          <div className="flex items-center justify-between">
            <EssayToolbar
              onFormat={handleFormat}
              onUndo={handleUndo}
              onRedo={handleRedo}
              onSave={handleSave}
              onShare={handleShare}
              onAnalyze={analyzeEssay}
              onFileUpload={handleFileUpload}
              isUploading={isUploading}
              showFormatting={showFormatting}
              setShowFormatting={setShowFormatting}
              prompt={prompt}
            />
            <div className="flex items-center gap-2">
              <EssayUpload onUpload={handleFileUpload} isUploading={isUploading} />
              <EssayShortcuts />
            </div>
          </div>
          <div className="space-y-4">
            <div className="relative">
              <Textarea
                value={content}
                onChange={(e) => addToHistory(e.target.value)}
                placeholder="Start writing your essay..."
                className="min-h-[500px] resize-none"
              />
              <div className="absolute bottom-2 right-2">
                <EssayAutosave isSaving={isSaving} lastSaved={lastSaved} />
              </div>
            </div>
            <EssayProgress
              wordCount={getWordCount()}
              wordLimit={wordLimit}
              timeSpent={timeSpent}
            />
          </div>
        </TabsContent>
        <TabsContent value="analyze" className="space-y-4">
          {isAnalyzing ? (
            <div className="flex items-center justify-center h-[500px]">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : analysis ? (
            <EssayAnalysis
              metrics={analysis.metrics}
              suggestions={analysis.suggestions}
            />
          ) : (
            <div className="text-center text-muted-foreground">
              Start writing to see the analysis
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
} 