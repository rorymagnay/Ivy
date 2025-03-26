"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { University } from "@/lib/universities"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  MapPin, 
  GraduationCap, 
  DollarSign, 
  Star, 
  Calendar, 
  FileText,
  Plus,
  CheckCircle2,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function UniversityPage() {
  const params = useParams()
  const [university, setUniversity] = useState<University | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchUniversity() {
      try {
        const response = await fetch(`/api/universities/${params.id}`)
        if (!response.ok) throw new Error("Failed to fetch university")
        
        const data = await response.json()
        setUniversity(data)
      } catch (error) {
        console.error("Error fetching university:", error)
        toast({
          title: "Error",
          description: "Failed to load university information. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchUniversity()
  }, [params.id, toast])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!university) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        University not found
      </div>
    )
  }

  const currentYearEssays = university.supplementalEssays.find(
    essay => essay.year === new Date().getFullYear()
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">{university.name}</h1>
          <div className="flex items-center gap-2 text-muted-foreground mt-2">
            <MapPin className="h-4 w-4" />
            <span>{university.location}, {university.state}</span>
          </div>
        </div>
        <Button className="gradient-bg">
          <Plus className="h-4 w-4 mr-2" />
          Add to Applications
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            <div>
              <div className="text-sm text-muted-foreground">Ranking</div>
              <div className="font-semibold">#{university.ranking}</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-500" />
            <div>
              <div className="text-sm text-muted-foreground">Tuition</div>
              <div className="font-semibold">${university.tuition.outOfState.toLocaleString()}</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-blue-500" />
            <div>
              <div className="text-sm text-muted-foreground">Acceptance Rate</div>
              <div className="font-semibold">{university.acceptanceRate}%</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-500" />
            <div>
              <div className="text-sm text-muted-foreground">Application Deadline</div>
              <div className="font-semibold">Jan 1, 2025</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="essays">Essays</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">About {university.name}</h2>
            <p className="text-muted-foreground">{university.description}</p>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Popular Majors</h2>
            <div className="flex flex-wrap gap-2">
              {university.majors.map((major) => (
                <Badge key={major} variant="secondary">
                  {major}
                </Badge>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="requirements" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Admission Requirements</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">SAT Requirements</h3>
                {university.requirements.sat.required ? (
                  <div className="text-muted-foreground">
                    {university.requirements.sat.range ? (
                      <p>
                        Reading: {university.requirements.sat.range.reading[0]}-{university.requirements.sat.range.reading[1]}
                        <br />
                        Math: {university.requirements.sat.range.math[0]}-{university.requirements.sat.range.math[1]}
                      </p>
                    ) : (
                      <p>Required, no specific range</p>
                    )}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Not required</p>
                )}
              </div>

              <div>
                <h3 className="font-medium mb-2">ACT Requirements</h3>
                {university.requirements.act.required ? (
                  <div className="text-muted-foreground">
                    {university.requirements.act.range ? (
                      <p>
                        {university.requirements.act.range[0]}-{university.requirements.act.range[1]}
                      </p>
                    ) : (
                      <p>Required, no specific range</p>
                    )}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Not required</p>
                )}
              </div>

              <div>
                <h3 className="font-medium mb-2">GPA Requirements</h3>
                {university.requirements.gpa.required ? (
                  <div className="text-muted-foreground">
                    {university.requirements.gpa.minimum ? (
                      <p>Minimum GPA: {university.requirements.gpa.minimum}</p>
                    ) : (
                      <p>Required, no specific minimum</p>
                    )}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Not required</p>
                )}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="essays" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Supplemental Essays</h2>
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                View All Essays
              </Button>
            </div>

            {currentYearEssays ? (
              <div className="space-y-6">
                {currentYearEssays.prompts.map((prompt) => (
                  <div key={prompt.id} className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">Prompt {prompt.id.split("-").pop()}</h3>
                          <Badge variant="secondary">
                            {prompt.wordLimit} words
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mt-2">{prompt.prompt}</p>
                        <div className="mt-4 flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-2" />
                            Write Essay
                          </Button>
                          <Button variant="outline" size="sm">
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Check Coherence
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No supplemental essays available for the current application year
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 