"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, ArrowLeft, Share, ChevronDown, Undo, Redo, Bold, Italic, List, Underline, Edit, LayoutTemplate, Wand2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Essay = {
  id: string
  title: string
  content: string
  university: string
  prompt: string | null
  updatedAt: string
}

export default function EditEssayPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [autosaved, setAutosaved] = useState(false)
  const [essay, setEssay] = useState<Essay | null>(null)
  const [selectedDraft, setSelectedDraft] = useState("1")
  const [showAIChat, setShowAIChat] = useState(true)
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([
    "How do I proceed?",
    "Is my essay too wordy?",
    "Am I answering the prompt?"
  ])
  const [aiMessage, setAiMessage] = useState("Hi, I'm your writing partner and editor. I can see your current draft, brainstorm ideas, give feedback, and more. How can I help with your writing today?")
  const [userMessage, setUserMessage] = useState("")
  
  const wordLimit = 150 // Default word limit

  useEffect(() => {
    async function fetchEssay() {
      try {
        const essayId = params?.id
        if (!essayId) return

        const response = await fetch(`/api/essays/${essayId}`)
        
        if (!response.ok) {
          throw new Error("Failed to fetch essay")
        }
        
        const data = await response.json()
        setEssay(data)
      } catch (error) {
        console.error("Error fetching essay:", error)
        toast({
          title: "Error",
          description: "Failed to load essay. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchEssay()
  }, [params, toast])

  // Calculate word count from essay content
  const getWordCount = (content: string) => {
    return content.split(/\s+/).filter(Boolean).length
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!essay) return
    setEssay({
      ...essay,
      content: e.target.value,
    })
    setAutosaved(false)
    
    // Auto-save functionality
    const timeoutId = setTimeout(() => {
      handleSave()
      setAutosaved(true)
    }, 2000)

    return () => clearTimeout(timeoutId)
  }

  const handleSave = async () => {
    if (!essay) return
    setIsSaving(true)

    try {
      const response = await fetch(`/api/essays/${essay.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(essay),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to save essay")
      }

      setAutosaved(true)
    } catch (error) {
      console.error("Error saving essay:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save essay",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userMessage.trim()) return

    // In a real app, this would integrate with an AI API
    setAiMessage("I'm analyzing your essay... Let me think about that question.")
    setUserMessage("")
  }

  const handleSuggestionClick = (suggestion: string) => {
    setUserMessage(suggestion)
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!essay) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <p className="mb-4 text-center text-muted-foreground">
          Essay not found.
        </p>
        <Button asChild>
          <Link href="/dashboard/essays">
            Go Back to Essays
          </Link>
        </Button>
      </div>
    )
  }

  const wordCount = getWordCount(essay.content)

  return (
    <div className="flex h-[calc(100vh-6rem)] flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="h-9 w-9">
            <Link href="/dashboard/essays">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <Link href="/dashboard/essays" className="text-sm text-muted-foreground hover:underline">
                Essays
              </Link>
              <span className="text-sm text-muted-foreground">/</span>
              <span className="text-sm font-medium">{essay.title}</span>
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">{essay.title}</h1>
              <Button variant="outline" size="sm" className="h-7 gap-1">
                <Edit className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1">
                DRAFT {selectedDraft} <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSelectedDraft("1")}>Draft 1</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedDraft("2")}>Draft 2</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedDraft("3")}>Draft 3</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button>
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Essay editor area */}
        <div className="flex-1 overflow-auto">
          <div className="mx-auto max-w-3xl p-4">
            <Card className="border-none shadow-sm">
              <CardContent className="p-8">
                <Textarea
                  value={essay.content}
                  onChange={handleContentChange}
                  className="min-h-[calc(100vh-20rem)] resize-none border-none p-0 text-base leading-relaxed focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                  placeholder="Start writing your essay..."
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI chat sidebar */}
        {showAIChat && (
          <div className="w-96 border-l border-border overflow-hidden flex flex-col">
            <div className="flex items-center justify-between border-b border-border p-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h2 className="font-semibold">Ask Kollegio</h2>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowAIChat(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </Button>
            </div>
            
            <div className="flex-1 overflow-auto p-4 bg-primary/5">
              <div className="flex items-start gap-3 mb-6">
                <div className="h-10 w-10 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <path d="M7 20.7a4 4 0 0 0 .2-7.9 4 4 0 0 0-6.5 3.8A3.5 3.5 0 0 0 4.3 21H7Z" />
                    <path d="M14 20.7a4 4 0 0 0 .2-7.9 4 4 0 0 0-6.5 3.8A3.5 3.5 0 0 0 11.3 21H14Z" />
                    <path d="M21 20.7a4 4 0 0 0 .2-7.9 4 4 0 0 0-6.5 3.8A3.5 3.5 0 0 0 18.3 21H21Z" />
                  </svg>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="text-sm">{aiMessage}</p>
                </div>
              </div>
              
              <div className="space-y-2 mt-8">
                {aiSuggestions.map((suggestion, i) => (
                  <div 
                    key={i} 
                    className="flex items-center rounded-lg border border-border bg-white p-2 cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <Sparkles className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">{suggestion}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t border-border p-4">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input 
                  placeholder="Ask a follow-up question" 
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="m5 12 14-8v16L5 12z" />
                  </svg>
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="flex items-center justify-between border-t border-border p-4">
        <div className="flex items-center">
          <p className={`text-sm ${autosaved ? 'text-muted-foreground' : 'text-foreground'}`}>
            {autosaved ? 'Autosaved' : 'Editing...'}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm">
            Word Count: <span className="font-medium">{wordCount}</span> out of <span className="font-medium">{wordLimit}</span>
          </p>
          
          <div className="flex items-center gap-2 border-l border-border pl-4">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Redo className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bold className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Italic className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Underline className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <List className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Wand2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.38879 3.5H9.5V2H5.5V3.5H6.61121C6.85247 3.5 7.02358 3.70472 6.94693 3.93111L4.7444 11.0689C4.66776 11.2953 4.43665 11.5 4.19539 11.5H3V13H7V11.5H5.80461C5.56335 11.5 5.39225 11.2953 5.46889 11.0689L7.67142 3.93111C7.74807 3.70472 7.97917 3.5 8.22043 3.5H8.38879Z" fill="currentColor"/>
              </svg>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <LayoutTemplate className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowAIChat(true)} className="gap-1">
            <Sparkles className="h-4 w-4" />
            Ask Kollegio
          </Button>
        </div>
      </div>
    </div>
  )
} 