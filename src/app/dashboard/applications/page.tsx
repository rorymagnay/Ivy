"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Search, Filter, School, Calendar, ChevronRight, Clock, Check } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

type Application = {
  id: string
  university: string
  program: string | null
  deadline: string
  status: string
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    async function fetchApplications() {
      try {
        const response = await fetch("/api/applications")
        
        if (!response.ok) {
          throw new Error("Failed to fetch applications")
        }
        
        const data = await response.json()
        setApplications(data)
      } catch (error) {
        console.error("Error fetching applications:", error)
        toast({
          title: "Error",
          description: "Failed to load your applications. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchApplications()
  }, [toast])

  const filteredApplications = applications.filter(app => 
    app.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (app.program && app.program.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const researchApps = filteredApplications.filter(app => app.status === 'research')
  const inProgressApps = filteredApplications.filter(app => app.status === 'in-progress')
  const submittedApps = filteredApplications.filter(app => app.status === 'submitted')

  const renderApplicationItem = (app: Application) => {
    const deadline = new Date(app.deadline)
    const now = new Date()
    const daysLeft = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    const isUrgent = daysLeft <= 7

    return (
      <div key={app.id} className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm transition-all hover:shadow-md">
        <div className="absolute right-2 top-2">
          <Badge 
            variant={app.status === 'submitted' ? "success" : app.status === 'in-progress' ? "default" : "outline"}
            className="text-xs"
          >
            {app.status === 'research' ? 'Research' : 
             app.status === 'in-progress' ? 'In Progress' : 
             'Submitted'}
          </Badge>
        </div>
        <div className="p-4 md:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
              <School className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 overflow-hidden">
              <h3 className="truncate text-lg font-semibold">{app.university}</h3>
              <p className="text-sm text-muted-foreground">{app.program || "Program not specified"}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-4">
            <div className="flex items-center text-sm">
              <Calendar className="mr-2 h-4 w-4 text-primary" />
              <span className={isUrgent ? 'text-red-500 font-medium' : ''}>
                {deadline.toLocaleDateString()}
                {isUrgent && <span className="ml-2">({daysLeft} days left)</span>}
              </span>
            </div>
            <Button variant="ghost" size="sm" asChild className="opacity-0 group-hover:opacity-100 transition-opacity -mr-2">
              <Link href={`/dashboard/applications/${app.id}`}>
                View <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Applications</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage your university applications
          </p>
        </div>
        <Button asChild size="sm" className="md:w-auto">
          <Link href="/dashboard/applications/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Application
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search applications..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filter Applications</DialogTitle>
              <DialogDescription>
                Narrow down your applications by status, deadline, or other criteria.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              {/* Add filter options here */}
              <p className="text-sm text-muted-foreground">
                This feature will be available soon.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex h-60 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : filteredApplications.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <School className="h-12 w-12 text-muted-foreground mb-3" />
            <p className="mb-1 text-lg font-medium">No applications found</p>
            <p className="mb-4 text-center text-muted-foreground max-w-sm">
              {searchQuery 
                ? "Try a different search term or clear your search" 
                : "Start by adding your first university application"}
            </p>
            {!searchQuery && (
              <Button asChild>
                <Link href="/dashboard/applications/new">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Your First Application
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full md:w-auto">
            <TabsTrigger value="all">
              All ({filteredApplications.length})
            </TabsTrigger>
            <TabsTrigger value="research">
              Research ({researchApps.length})
            </TabsTrigger>
            <TabsTrigger value="in-progress">
              In Progress ({inProgressApps.length})
            </TabsTrigger>
            <TabsTrigger value="submitted">
              Submitted ({submittedApps.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredApplications.map(renderApplicationItem)}
            </div>
          </TabsContent>
          
          <TabsContent value="research" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {researchApps.map(renderApplicationItem)}
            </div>
          </TabsContent>
          
          <TabsContent value="in-progress" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {inProgressApps.map(renderApplicationItem)}
            </div>
          </TabsContent>
          
          <TabsContent value="submitted" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {submittedApps.map(renderApplicationItem)}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
} 