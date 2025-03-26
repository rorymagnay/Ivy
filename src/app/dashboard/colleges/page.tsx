"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { University } from "@/lib/universities"
import { UniversitySearch } from "@/components/university-search"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  MapPin, 
  GraduationCap, 
  DollarSign, 
  Star,
  Plus,
} from "lucide-react"

export default function CollegesPage() {
  const router = useRouter()
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null)

  const handleSelectUniversity = (university: University) => {
    setSelectedUniversity(university)
    router.push(`/dashboard/colleges/${university.id}`)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Colleges</h1>
        <p className="text-muted-foreground mt-2">
          Search and explore universities to add to your application list
        </p>
      </div>

      <UniversitySearch onSelectUniversity={handleSelectUniversity} />
    </div>
  )
} 