"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Home,
  FileText,
  GraduationCap,
  Activity,
  Calendar,
  Star,
  ChevronRight,
  Info,
} from "lucide-react"

interface Achievement {
  id: number
  title: string
}

interface College {
  id: number
  name: string
}

const achievements: Achievement[] = [
  { id: 1, title: "Admissions tours" },
  { id: 2, title: "Varsity Sailing" },
  { id: 3, title: "Sailing Instructor" },
  { id: 4, title: "Founded Entrepreneurship Club" },
  { id: 5, title: "Writer for Economics" },
  { id: 6, title: "Keeper of Choir" },
]

const shortlist: College[] = [
  { id: 1, name: "Harvard" },
  { id: 2, name: "Yale" },
  { id: 3, name: "UPenn" },
  { id: 4, name: "Dartmouth" },
  { id: 5, name: "Stanford" },
  { id: 6, name: "UNC" },
  { id: 7, name: "Caltech" },
  { id: 8, name: "UCLA" },
  { id: 9, name: "Duke" },
]

export default function DashboardPage() {
  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-12 gap-6">
        {/* Welcome Card */}
        <Card className="col-span-12 md:col-span-4 p-6 border-2 border-primary/20">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Welcome, Rory!</h2>
            <p className="text-muted-foreground">Eton College - Senior Year</p>
          </div>
        </Card>

        {/* Essays Card */}
        <Card className="col-span-12 md:col-span-8 p-6 border-2 border-primary/20">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">Essays</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                View the essays required for each university and build them out here.
              </p>
            </div>
            <Link href="/dashboard/essays">
              <Button variant="ghost" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>

        {/* Achievement Tracker */}
        <Card className="col-span-12 md:col-span-4 p-6 border-2 border-primary/20">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">Achievement Tracker</h3>
              </div>
              <Button variant="ghost" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Track your achievements and activities to ensure you include them in your final application.
            </p>
            <ul className="space-y-2">
              {achievements.map((achievement) => (
                <li key={achievement.id} className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="text-sm">{achievement.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {/* Application Score */}
        <Card className="col-span-12 md:col-span-4 p-6 border-2 border-primary/20">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold">Application Score</h3>
            </div>
            <div className="flex items-center justify-center h-32">
              <div className="text-4xl font-bold text-primary">91%</div>
            </div>
          </div>
        </Card>

        {/* Areas of Improvement */}
        <Card className="col-span-12 md:col-span-4 p-6 border-2 border-primary/20">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold">Areas of Improvement</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Essays</span>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Prizes</span>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Academics</span>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Extra-Curriculars</span>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Colleges */}
        <Card className="col-span-12 md:col-span-8 p-6 border-2 border-primary/20">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">Colleges</h3>
              </div>
              <Link href="/dashboard/colleges">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Shortlist</h4>
              <ul className="grid grid-cols-2 gap-2">
                {shortlist.map((college) => (
                  <li key={college.id} className="text-sm text-muted-foreground">
                    {college.id}. {college.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        {/* Schedule */}
        <Card className="col-span-12 md:col-span-4 p-6 border-2 border-primary/20">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">Schedule</h3>
              </div>
              <Button variant="ghost" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              No upcoming deadlines
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 