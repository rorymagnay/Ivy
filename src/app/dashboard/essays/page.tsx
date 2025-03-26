"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Edit, Eye } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

type Essay = {
  id: string
  title: string
  content: string
  university: string
  prompt: string | null
  updatedAt: string
}

export default function EssaysPage() {
  const [essays, setEssays] = useState<Essay[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchEssays() {
      try {
        const response = await fetch("/api/essays")
        
        if (!response.ok) {
          throw new Error("Failed to fetch essays")
        }
        
        const data = await response.json()
        setEssays(data)
      } catch (error) {
        console.error("Error fetching essays:", error)
        toast({
          title: "Error",
          description: "Failed to load your essays. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchEssays()
  }, [toast])

  // Calculate word count from essay content
  const getWordCount = (content: string) => {
    return content.split(/\s+/).filter(Boolean).length
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Essays</h1>
        <Button asChild>
          <Link href="/dashboard/essays/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Essay
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="flex h-40 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : essays.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <p className="mb-4 text-center text-muted-foreground">
              You haven't created any essays yet.
            </p>
            <Button asChild>
              <Link href="/dashboard/essays/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Your First Essay
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {essays.map((essay) => {
            const wordCount = getWordCount(essay.content)
            const wordLimit = 500 // Default word limit
            
            return (
              <Card key={essay.id}>
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-bold">
                    {essay.title}
                  </CardTitle>
                  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                    {wordCount}/{wordLimit} words
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {essay.prompt || "No prompt provided"}
                    </p>
                    <p className="text-sm">
                      Last edited: {new Date(essay.updatedAt).toLocaleDateString()}
                    </p>
                    <div className="flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="mr-2"
                      >
                        <Link href={`/dashboard/essays/${essay.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </Button>
                      <Button variant="default" size="sm" asChild>
                        <Link href={`/dashboard/essays/${essay.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
} 