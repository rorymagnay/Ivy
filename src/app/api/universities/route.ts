import { NextRequest, NextResponse } from 'next/server';
import { 
  getAllUniversities,
  getUniversityByName,
  getTopUniversities,
  getUniversitiesByCountry,
  searchUniversities,
  getUniversitiesByTags
} from '@/lib/university-data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');
  const query = searchParams.get('query');
  const country = searchParams.get('country') || 'USA';
  const topParam = searchParams.get('top');
  const tagsParam = searchParams.get('tags');
  
  try {
    // If name is provided, get university by name
    if (name) {
      const university = getUniversityByName(name);
      if (!university) {
        return NextResponse.json(
          { error: 'University not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(university);
    }
    
    // If search query is provided, search universities
    if (query) {
      const results = searchUniversities(query);
      return NextResponse.json(results);
    }
    
    // If top is provided, get top universities
    if (topParam) {
      const limit = parseInt(topParam, 10) || 10;
      const topUniversities = getTopUniversities(limit);
      return NextResponse.json(topUniversities);
    }
    
    // If tags are provided, get universities by tags
    if (tagsParam) {
      const tags = tagsParam.split(',').map(tag => tag.trim());
      const taggedUniversities = getUniversitiesByTags(tags);
      return NextResponse.json(taggedUniversities);
    }
    
    // Default: Get all universities for specified country
    const universities = country.toLowerCase() === 'all' 
      ? getAllUniversities() 
      : getUniversitiesByCountry(country);
    
    return NextResponse.json(universities);
  } catch (error) {
    console.error('Error processing university data request:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve university data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q") || "";
  const state = searchParams.get("state") || undefined;
  const minRanking = searchParams.get("minRanking") ? parseInt(searchParams.get("minRanking")!) : undefined;
  const maxTuition = searchParams.get("maxTuition") ? parseInt(searchParams.get("maxTuition")!) : undefined;

  try {
    const universities = searchUniversities(query, {
      state,
      minRanking,
      maxTuition,
    });

    return NextResponse.json(universities);
  } catch (error) {
    console.error("Error searching universities:", error);
    return NextResponse.json(
      { error: "Failed to search universities" },
      { status: 500 }
    );
  }
} 