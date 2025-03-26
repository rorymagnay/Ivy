"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewApplicationPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    university: "",
    program: "",
    deadline: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to create application")
      }

      toast({
        title: "Success",
        description: "Your application has been created.",
      })

      router.push("/dashboard/applications")
      router.refresh()
    } catch (error) {
      console.error("Error creating application:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create application",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Add New Application</CardTitle>
          <CardDescription>
            Enter the details of the university you're applying to.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
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
              <Label htmlFor="program">Program</Label>
              <Input
                id="program"
                name="program"
                placeholder="Computer Science"
                value={formData.program}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deadline">Application Deadline</Label>
              <Input
                id="deadline"
                name="deadline"
                type="date"
                value={formData.deadline}
                onChange={handleChange}
                required
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
                "Add Application"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
} 