"use client"

import { useState, useEffect } from "react"
import { useDebounce } from "@/hooks/use-debounce"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import { University } from "@/lib/universities"
import { Search, MapPin, GraduationCap, DollarSign, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface UniversitySearchProps {
  onSelectUniversity: (university: University) => void;
}

export function UniversitySearch({ onSelectUniversity }: UniversitySearchProps) {
  const [query, setQuery] = useState("")
  const [state, setState] = useState<string>("")
  const [minRanking, setMinRanking] = useState<number>(100)
  const [maxTuition, setMaxTuition] = useState<number>(60000)
  const [universities, setUniversities] = useState<University[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const debouncedQuery = useDebounce(query, 300)
  const { toast } = useToast()

  useEffect(() => {
    async function searchUniversities() {
      if (!debouncedQuery) {
        setUniversities([])
        return
      }

      setIsLoading(true)
      try {
        const params = new URLSearchParams({
          q: debouncedQuery,
          ...(state && { state }),
          ...(minRanking && { minRanking: minRanking.toString() }),
          ...(maxTuition && { maxTuition: maxTuition.toString() }),
        })

        const response = await fetch(`/api/universities?${params}`)
        if (!response.ok) throw new Error("Failed to fetch universities")
        
        const data = await response.json()
        setUniversities(data)
      } catch (error) {
        console.error("Error searching universities:", error)
        toast({
          title: "Error",
          description: "Failed to search universities. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    searchUniversities()
  }, [debouncedQuery, state, minRanking, maxTuition, toast])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search universities by name, location, or major..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select value={state} onValueChange={setState}>
            <SelectTrigger>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All states</SelectItem>
              <SelectItem value="CA">California</SelectItem>
              <SelectItem value="NY">New York</SelectItem>
              <SelectItem value="MA">Massachusetts</SelectItem>
              {/* Add more states */}
            </SelectContent>
          </Select>

          <div className="space-y-2">
            <label className="text-sm font-medium">Max Ranking</label>
            <Slider
              value={[minRanking]}
              onValueChange={([value]) => setMinRanking(value)}
              max={100}
              step={1}
            />
            <div className="text-sm text-muted-foreground">
              Top {minRanking} universities
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Max Tuition</label>
            <Slider
              value={[maxTuition]}
              onValueChange={([value]) => setMaxTuition(value)}
              max={60000}
              step={1000}
            />
            <div className="text-sm text-muted-foreground">
              Up to ${maxTuition.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {universities.map((university) => (
          <Card
            key={university.id}
            className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onSelectUniversity(university)}
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold">{university.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{university.location}, {university.state}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>#{university.ranking}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    <span>{university.tuition.outOfState.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        </div>
      )}

      {!isLoading && universities.length === 0 && query && (
        <div className="text-center py-8 text-muted-foreground">
          No universities found matching your criteria
        </div>
      )}
    </div>
  )
} 