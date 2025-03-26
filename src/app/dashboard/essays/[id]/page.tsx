"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { EssayEditor } from "@/components/essay-editor"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import {
  Share2,
  Save,
  History,
  FileText,
  CheckCircle2,
  Brain,
} from "lucide-react"

interface Essay {
  id: string
  title: string
  prompt: string
  content: string
  wordLimit: number
  university: string
  status: "draft" | "in_review" | "complete"
  lastUpdated: string
}

export default function EssayPage() {
  const params = useParams()
  const [essay, setEssay] = useState<Essay | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // In a real implementation, fetch the essay from your API
    setEssay({
      id: params.id as string,
      title: "Why Harvard?",
      prompt: "Please elaborate on one of your extracurricular activities or work experiences.",
      content: "",
      wordLimit: 650,
      university: "Harvard University",
      status: "draft",
      lastUpdated: new Date().toISOString(),
    })
    setIsLoading(false)
  }, [params.id])

  const handleSave = async (content: string) => {
    try {
      // In a real implementation, save to your API
      setEssay(prev => prev ? { ...prev, content } : null)
      toast({
        title: "Essay Saved",
        description: "Your changes have been saved successfully.",
      })
    } catch (error) {
      toast({
        title: "Save Error",
        description: "Failed to save your changes. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!essay) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Essay not found
      </div>
    )
  }

  return (
    <div className="max-w-[1400px] mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">{essay.title}</h1>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-muted-foreground">{essay.university}</span>
            <Badge
              variant={essay.status === "complete" ? "default" : "secondary"}
              className="capitalize"
            >
              {essay.status.replace("_", " ")}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <History className="h-4 w-4 mr-2" />
            History
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button className="gradient-bg" size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      <Tabs defaultValue="write" className="space-y-8">
        <TabsList>
          <TabsTrigger value="write" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Write
          </TabsTrigger>
          <TabsTrigger value="review" className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Review
          </TabsTrigger>
          <TabsTrigger value="coherence" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Coherence
          </TabsTrigger>
        </TabsList>

        <TabsContent value="write" className="space-y-4">
          <EssayEditor
            initialContent={essay.content}
            prompt={essay.prompt}
            wordLimit={essay.wordLimit}
            onSave={handleSave}
          />
        </TabsContent>

        <TabsContent value="review">
          <Card className="p-6">
            <div className="text-center text-muted-foreground">
              Review functionality coming soon...
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="coherence">
          <Card className="p-6">
            <div className="text-center text-muted-foreground">
              Coherence analysis coming soon...
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 