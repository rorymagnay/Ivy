export interface University {
  id: string;
  name: string;
  location: string;
  state: string;
  acceptanceRate: number;
  tuition: {
    inState: number;
    outOfState: number;
  };
  ranking: number;
  description: string;
  website: string;
  logo: string;
  supplementalEssays: {
    year: number;
    prompts: {
      id: string;
      prompt: string;
      wordLimit: number;
      required: boolean;
    }[];
  }[];
  majors: string[];
  requirements: {
    sat: {
      required: boolean;
      range?: {
        reading: [number, number];
        math: [number, number];
      };
    };
    act: {
      required: boolean;
      range?: [number, number];
    };
    gpa: {
      required: boolean;
      minimum?: number;
    };
  };
}

export const universities: University[] = [
  {
    id: "harvard",
    name: "Harvard University",
    location: "Cambridge",
    state: "MA",
    acceptanceRate: 3.2,
    tuition: {
      inState: 57261,
      outOfState: 57261,
    },
    ranking: 1,
    description: "Harvard University is a private Ivy League research university in Cambridge, Massachusetts. Founded in 1636, it is the oldest institution of higher learning in the United States.",
    website: "https://www.harvard.edu",
    logo: "/universities/harvard.png",
    supplementalEssays: [
      {
        year: 2024,
        prompts: [
          {
            id: "harvard-2024-1",
            prompt: "Please briefly elaborate on one of your extracurricular activities or work experiences.",
            wordLimit: 150,
            required: true,
          },
          {
            id: "harvard-2024-2",
            prompt: "What would you want your future college roommate to know about you?",
            wordLimit: 200,
            required: true,
          },
          {
            id: "harvard-2024-3",
            prompt: "How has your upbringing shaped the person you are today?",
            wordLimit: 200,
            required: true,
          },
        ],
      },
    ],
    majors: ["Computer Science", "Economics", "Government", "Psychology", "English"],
    requirements: {
      sat: {
        required: true,
        range: {
          reading: [720, 780],
          math: [740, 800],
        },
      },
      act: {
        required: true,
        range: [33, 36],
      },
      gpa: {
        required: true,
        minimum: 3.9,
      },
    },
  },
  // Add more universities here...
];

export function searchUniversities(query: string, filters: {
  state?: string;
  minRanking?: number;
  maxTuition?: number;
} = {}): University[] {
  const searchTerm = query.toLowerCase();
  
  return universities.filter(uni => {
    const matchesSearch = 
      uni.name.toLowerCase().includes(searchTerm) ||
      uni.location.toLowerCase().includes(searchTerm) ||
      uni.state.toLowerCase().includes(searchTerm) ||
      uni.majors.some(major => major.toLowerCase().includes(searchTerm));
    
    const matchesState = !filters.state || uni.state === filters.state;
    const matchesRanking = !filters.minRanking || uni.ranking <= filters.minRanking;
    const matchesTuition = !filters.maxTuition || uni.tuition.outOfState <= filters.maxTuition;
    
    return matchesSearch && matchesState && matchesRanking && matchesTuition;
  });
}

export function getUniversityById(id: string): University | undefined {
  return universities.find(uni => uni.id === id);
} 