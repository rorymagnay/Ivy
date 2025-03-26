"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { School, MapPin, Calendar, Award, DollarSign, BookOpen, Target, PlusCircle, CheckCircle, Users, GraduationCap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import type { University } from '@/lib/university-data'

interface UniversityCardProps {
  university: University
  compact?: boolean
  showActions?: boolean
  onAddToList?: (university: University) => void
}

export function UniversityCard({ 
  university, 
  compact = false, 
  showActions = true,
  onAddToList 
}: UniversityCardProps) {
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToList = () => {
    setIsAdded(true)
    if (onAddToList) {
      onAddToList(university)
    }
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  // Use placeholder image if logoUrl is not available
  const logoSrc = university.logoUrl || "/placeholder-university.png"
  
  if (compact) {
    return (
      <Card className="overflow-hidden">
        <div className="flex items-center p-4">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
            <Image
              src={logoSrc}
              alt={university.name}
              className="object-cover"
              fill
              sizes="48px"
            />
          </div>
          <div className="ml-4 flex-1">
            <h3 className="font-semibold text-lg">{university.name}</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-1 h-3 w-3" />
              <span>{university.location}</span>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex gap-3 items-center">
            <div className="relative w-10 h-10 overflow-hidden rounded-md">
              <Image
                src={logoSrc}
                alt={university.name}
                className="object-cover"
                fill
                sizes="40px"
              />
            </div>
            <div>
              <CardTitle className="text-lg">{university.name}</CardTitle>
              <CardDescription className="flex items-center mt-1">
                <MapPin className="h-3 w-3 mr-1" />
                {university.location}
              </CardDescription>
            </div>
          </div>
          {university.ranking && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Award className="h-3 w-3" />
              Rank #{university.ranking}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-3 flex-1">
        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            <span>Est. {university.foundedYear}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5 text-muted-foreground" />
            <span>{university.acceptanceRate} Acceptance</span>
          </div>
          {university.tuition && university.tuition.outOfState && (
            <div className="flex items-center gap-1">
              <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
              <span>{formatter.format(university.tuition.outOfState)}/yr</span>
            </div>
          )}
          {university.undergraduateEnrollment && (
            <div className="flex items-center gap-1">
              <GraduationCap className="h-3.5 w-3.5 text-muted-foreground" />
              <span>{university.undergraduateEnrollment.toLocaleString()} Students</span>
            </div>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{university.description}</p>
        
        {university.topPrograms && university.topPrograms.length > 0 && (
          <div className="mb-3">
            <h4 className="text-xs font-medium text-muted-foreground mb-1">Top Programs</h4>
            <div className="flex flex-wrap gap-1">
              {university.topPrograms.slice(0, 3).map((program) => (
                <Badge key={program} variant="secondary" className="text-xs">
                  {program}
                </Badge>
              ))}
              {university.topPrograms.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{university.topPrograms.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
      {showActions && (
        <CardFooter className="pt-0 flex justify-between gap-2">
          <Button
            asChild
            variant="default"
            size="sm"
            className="flex-1"
          >
            <Link href={`/dashboard/applications/new?university=${encodeURIComponent(university.name)}`}>
              <School className="h-4 w-4 mr-2" />
              Apply
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            disabled={isAdded}
            onClick={handleAddToList}
          >
            {isAdded ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                Added
              </>
            ) : (
              <>
                <PlusCircle className="h-4 w-4 mr-2" />
                Shortlist
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
} 