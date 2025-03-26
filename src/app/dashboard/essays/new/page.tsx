"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewEssayPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    university: "",
    prompt: "",
    content: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/essays", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to create essay")
      }

      toast({
        title: "Success",
        description: "Your essay has been created.",
      })

      router.push("/dashboard/essays")
      router.refresh()
    } catch (error) {
      console.error("Error creating essay:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create essay",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const wordCount = formData.content.split(/\s+/).filter(Boolean).length
  
  return (
    <div className="mx-auto max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Create New Essay</CardTitle>
          <CardDescription>
            Write or paste your essay content below.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Essay Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Personal Statement"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="university">University</Label>
              <Input
                id="university"
                name="university"
                placeholder="Harvard University"
                value={formData.university}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prompt">Essay Prompt</Label>
              <Textarea
                id="prompt"
                name="prompt"
                placeholder="Describe your academic and career goals..."
                value={formData.prompt}
                onChange={handleChange}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="content">Essay Content</Label>
                <span className="text-xs text-muted-foreground">
                  {wordCount} words
                </span>
              </div>
              <Textarea
                id="content"
                name="content"
                placeholder="Write your essay here..."
                value={formData.content}
                onChange={handleChange}
                required
                rows={12}
                className="min-h-[200px] resize-y"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => router.back()}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></span>
                  Saving...
                </>
              ) : (
                "Create Essay"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
} 