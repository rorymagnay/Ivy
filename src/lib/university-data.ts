// University types
export interface University {
  name: string;
  location: string;
  country: string;
  foundedYear: number;
  ranking?: number;
  acceptanceRate?: string;
  undergraduateEnrollment?: number;
  graduateEnrollment?: number;
  tuition?: {
    inState?: number;
    outOfState?: number;
    international?: number;
  };
  topPrograms?: string[];
  tags?: string[];
  logoUrl?: string;
  websiteUrl: string;
  description: string;
}

// Sample university data
const universities: University[] = [
  {
    name: "Harvard University",
    location: "Cambridge, Massachusetts",
    country: "USA",
    foundedYear: 1636,
    ranking: 1,
    acceptanceRate: "4.6%",
    undergraduateEnrollment: 6755,
    graduateEnrollment: 15120,
    tuition: {
      outOfState: 54002,
      international: 54002,
    },
    topPrograms: ["Business", "Law", "Medicine", "Computer Science", "Economics"],
    tags: ["Ivy League", "Research", "Prestigious"],
    logoUrl: "/universities/harvard.png",
    websiteUrl: "https://www.harvard.edu",
    description: "Harvard University is a private Ivy League research university in Cambridge, Massachusetts. Established in 1636, it is the oldest institution of higher learning in the United States and among the most prestigious in the world."
  },
  {
    name: "Stanford University",
    location: "Stanford, California",
    country: "USA",
    foundedYear: 1885,
    ranking: 2,
    acceptanceRate: "4.3%",
    undergraduateEnrollment: 6996,
    graduateEnrollment: 10253,
    tuition: {
      outOfState: 56169,
      international: 56169,
    },
    topPrograms: ["Computer Science", "Engineering", "Business", "Economics", "Law"],
    tags: ["Research", "Tech", "Prestigious"],
    logoUrl: "/universities/stanford.png",
    websiteUrl: "https://www.stanford.edu",
    description: "Stanford University is a private research university in Stanford, California. The university is known for its academic achievements, wealth, proximity to Silicon Valley, and selectivity."
  },
  {
    name: "Massachusetts Institute of Technology",
    location: "Cambridge, Massachusetts",
    country: "USA",
    foundedYear: 1861,
    ranking: 3,
    acceptanceRate: "6.7%",
    undergraduateEnrollment: 4361,
    graduateEnrollment: 6990,
    tuition: {
      outOfState: 55878,
      international: 55878,
    },
    topPrograms: ["Engineering", "Computer Science", "Physics", "Mathematics", "Economics"],
    tags: ["Research", "Tech", "Prestigious"],
    logoUrl: "/universities/mit.png",
    websiteUrl: "https://www.mit.edu",
    description: "The Massachusetts Institute of Technology is a private research university in Cambridge, Massachusetts. MIT is devoted to the advancement of knowledge and education of students in areas that contribute to or prosper in an environment of science and technology."
  },
  {
    name: "Yale University",
    location: "New Haven, Connecticut",
    country: "USA",
    foundedYear: 1701,
    ranking: 4,
    acceptanceRate: "6.1%",
    undergraduateEnrollment: 6092,
    graduateEnrollment: 7517,
    tuition: {
      outOfState: 57700,
      international: 57700,
    },
    topPrograms: ["Law", "Medicine", "Economics", "Political Science", "Drama"],
    tags: ["Ivy League", "Research", "Prestigious"],
    logoUrl: "/universities/yale.png",
    websiteUrl: "https://www.yale.edu",
    description: "Yale University is a private Ivy League research university in New Haven, Connecticut. Founded in 1701, it is the third-oldest institution of higher education in the United States and one of the nine Colonial Colleges chartered before the American Revolution."
  },
  {
    name: "Princeton University",
    location: "Princeton, New Jersey",
    country: "USA",
    foundedYear: 1746,
    ranking: 5,
    acceptanceRate: "5.8%",
    undergraduateEnrollment: 5428,
    graduateEnrollment: 2946,
    tuition: {
      outOfState: 53890,
      international: 53890,
    },
    topPrograms: ["Public Policy", "Economics", "Engineering", "Mathematics", "Physics"],
    tags: ["Ivy League", "Research", "Prestigious"],
    logoUrl: "/universities/princeton.png",
    websiteUrl: "https://www.princeton.edu",
    description: "Princeton University is a private Ivy League research university in Princeton, New Jersey. Founded in 1746, Princeton is the fourth-oldest institution of higher education in the United States."
  },
  {
    name: "University of California, Berkeley",
    location: "Berkeley, California",
    country: "USA",
    foundedYear: 1868,
    ranking: 6,
    acceptanceRate: "14.5%",
    undergraduateEnrollment: 31780,
    graduateEnrollment: 11336,
    tuition: {
      inState: 14254,
      outOfState: 44008,
      international: 44008,
    },
    topPrograms: ["Computer Science", "Engineering", "Business", "Economics", "Political Science"],
    tags: ["Research", "Public"],
    logoUrl: "/universities/berkeley.png",
    websiteUrl: "https://www.berkeley.edu",
    description: "The University of California, Berkeley is a public research university in Berkeley, California. Established in 1868, it is the flagship campus of the University of California system."
  },
  {
    name: "University of Oxford",
    location: "Oxford, England",
    country: "UK",
    foundedYear: 1096,
    ranking: 7,
    acceptanceRate: "17.5%",
    undergraduateEnrollment: 11930,
    graduateEnrollment: 12510,
    tuition: {
      international: 38800,
    },
    topPrograms: ["Medicine", "Law", "Economics", "Politics", "Philosophy"],
    tags: ["Research", "Prestigious", "International"],
    logoUrl: "/universities/oxford.png",
    websiteUrl: "https://www.ox.ac.uk",
    description: "The University of Oxford is a collegiate research university in Oxford, England. There is evidence of teaching as early as 1096, making it the oldest university in the English-speaking world and the world's second-oldest university in continuous operation."
  },
  {
    name: "Columbia University",
    location: "New York City, New York",
    country: "USA",
    foundedYear: 1754,
    ranking: 8,
    acceptanceRate: "5.5%",
    undergraduateEnrollment: 8216,
    graduateEnrollment: 23506,
    tuition: {
      outOfState: 61788,
      international: 61788,
    },
    topPrograms: ["Journalism", "Business", "Law", "Medicine", "International Relations"],
    tags: ["Ivy League", "Research", "Prestigious"],
    logoUrl: "/universities/columbia.png",
    websiteUrl: "https://www.columbia.edu",
    description: "Columbia University is a private Ivy League research university in New York City. Founded in 1754 as King's College, it is the oldest institution of higher education in New York and the fifth-oldest institution of higher learning in the United States."
  },
  {
    name: "University of Cambridge",
    location: "Cambridge, England",
    country: "UK",
    foundedYear: 1209,
    ranking: 9,
    acceptanceRate: "21%",
    undergraduateEnrollment: 12850,
    graduateEnrollment: 9230,
    tuition: {
      international: 37086,
    },
    topPrograms: ["Natural Sciences", "Mathematics", "Engineering", "Law", "Economics"],
    tags: ["Research", "Prestigious", "International"],
    logoUrl: "/universities/cambridge.png",
    websiteUrl: "https://www.cam.ac.uk",
    description: "The University of Cambridge is a collegiate research university in Cambridge, United Kingdom. Founded in 1209, it is the second-oldest university in the English-speaking world and the world's fourth-oldest surviving university."
  },
  {
    name: "ETH Zurich",
    location: "Zurich, Switzerland",
    country: "Switzerland",
    foundedYear: 1855,
    ranking: 10,
    acceptanceRate: "27%",
    undergraduateEnrollment: 9810,
    graduateEnrollment: 6900,
    tuition: {
      international: 1460,
    },
    topPrograms: ["Engineering", "Computer Science", "Physics", "Architecture", "Chemistry"],
    tags: ["Research", "Tech", "International"],
    logoUrl: "/universities/eth.png",
    websiteUrl: "https://ethz.ch/en.html",
    description: "ETH Zurich is a public research university in Zürich, Switzerland. Founded in 1854, it focuses on science, technology, engineering, and mathematics, consistently ranking among the world's top universities."
  },
  {
    name: "University of California, Los Angeles",
    location: "Los Angeles, California",
    country: "USA",
    foundedYear: 1919,
    ranking: 11,
    acceptanceRate: "12.3%",
    undergraduateEnrollment: 31577,
    graduateEnrollment: 14300,
    tuition: {
      inState: 13240,
      outOfState: 42994,
      international: 42994,
    },
    topPrograms: ["Business", "Engineering", "Film", "Computer Science", "Psychology"],
    tags: ["Research", "Public"],
    logoUrl: "/universities/ucla.png",
    websiteUrl: "https://www.ucla.edu",
    description: "The University of California, Los Angeles is a public land-grant research university in Los Angeles, California. It is consistently ranked among the top public universities in the world."
  },
  {
    name: "University of Pennsylvania",
    location: "Philadelphia, Pennsylvania",
    country: "USA",
    foundedYear: 1740,
    ranking: 12,
    acceptanceRate: "8.4%",
    undergraduateEnrollment: 10019,
    graduateEnrollment: 12413,
    tuition: {
      outOfState: 58422,
      international: 58422,
    },
    topPrograms: ["Business", "Medicine", "Law", "Engineering", "Nursing"],
    tags: ["Ivy League", "Research", "Prestigious"],
    logoUrl: "/universities/upenn.png",
    websiteUrl: "https://www.upenn.edu",
    description: "The University of Pennsylvania is a private Ivy League research university in Philadelphia, Pennsylvania. It is one of the nine colonial colleges founded prior to the Declaration of Independence and the first institution founded as a university in the United States."
  },
  {
    name: "Imperial College London",
    location: "London, England",
    country: "UK",
    foundedYear: 1907,
    ranking: 13,
    acceptanceRate: "14.3%",
    undergraduateEnrollment: 10220,
    graduateEnrollment: 8315,
    tuition: {
      international: 34350,
    },
    topPrograms: ["Medicine", "Engineering", "Science", "Business", "Computing"],
    tags: ["Research", "Tech", "International"],
    logoUrl: "/universities/imperial.png",
    websiteUrl: "https://www.imperial.ac.uk",
    description: "Imperial College London is a public research university in London, United Kingdom. It focuses exclusively on science, engineering, medicine, and business. The college has an international reputation for excellence in teaching and research."
  },
  {
    name: "University of Toronto",
    location: "Toronto, Ontario",
    country: "Canada",
    foundedYear: 1827,
    ranking: 14,
    acceptanceRate: "43%",
    undergraduateEnrollment: 71930,
    graduateEnrollment: 20283,
    tuition: {
      international: 57020,
    },
    topPrograms: ["Medicine", "Engineering", "Computer Science", "Business", "Psychology"],
    tags: ["Research", "Public", "International"],
    logoUrl: "/universities/toronto.png",
    websiteUrl: "https://www.utoronto.ca",
    description: "The University of Toronto is a public research university in Toronto, Ontario, Canada. Founded by royal charter in 1827, it is the oldest university in the province of Ontario and one of the most prestigious in Canada."
  },
  {
    name: "Cornell University",
    location: "Ithaca, New York",
    country: "USA",
    foundedYear: 1865,
    ranking: 15,
    acceptanceRate: "10.6%",
    undergraduateEnrollment: 15043,
    graduateEnrollment: 8984,
    tuition: {
      outOfState: 59316,
      international: 59316,
    },
    topPrograms: ["Agriculture", "Engineering", "Hotel Administration", "Architecture", "Business"],
    tags: ["Ivy League", "Research"],
    logoUrl: "/universities/cornell.png",
    websiteUrl: "https://www.cornell.edu",
    description: "Cornell University is a private Ivy League statutory land-grant research university based in Ithaca, New York. With its unique combination of private and public colleges, Cornell blends academic distinction with public service."
  },
  {
    name: "University of Chicago",
    location: "Chicago, Illinois",
    country: "USA",
    foundedYear: 1890,
    ranking: 16,
    acceptanceRate: "6.2%",
    undergraduateEnrollment: 6734,
    graduateEnrollment: 10440,
    tuition: {
      outOfState: 60552,
      international: 60552,
    },
    topPrograms: ["Economics", "Mathematics", "Physics", "Law", "Business"],
    tags: ["Research", "Prestigious"],
    logoUrl: "/universities/chicago.png",
    websiteUrl: "https://www.uchicago.edu",
    description: "The University of Chicago is a private research university in Chicago, Illinois. Founded in 1890, the university is known for its rigorous academic and intellectual traditions."
  },
  {
    name: "National University of Singapore",
    location: "Singapore",
    country: "Singapore",
    foundedYear: 1905,
    ranking: 17,
    acceptanceRate: "5%",
    undergraduateEnrollment: 30350,
    graduateEnrollment: 10640,
    tuition: {
      international: 17550,
    },
    topPrograms: ["Computer Science", "Engineering", "Business", "Medicine", "Law"],
    tags: ["Research", "International", "Tech"],
    logoUrl: "/universities/nus.png",
    websiteUrl: "https://www.nus.edu.sg",
    description: "The National University of Singapore is the oldest autonomous university in Singapore. It is consistently ranked among the best universities in Asia and the world."
  },
  {
    name: "Brown University",
    location: "Providence, Rhode Island",
    country: "USA",
    foundedYear: 1764,
    ranking: 18,
    acceptanceRate: "7.1%",
    undergraduateEnrollment: 7043,
    graduateEnrollment: 3214,
    tuition: {
      outOfState: 60696,
      international: 60696,
    },
    topPrograms: ["Liberal Arts", "Anthropology", "English", "History", "Computer Science"],
    tags: ["Ivy League", "Research", "Liberal Arts"],
    logoUrl: "/universities/brown.png",
    websiteUrl: "https://www.brown.edu",
    description: "Brown University is a private Ivy League research university in Providence, Rhode Island. Founded in 1764, it is the seventh-oldest institution of higher education in the United States and one of the nine colonial colleges chartered before the American Revolution."
  },
  {
    name: "University of Michigan",
    location: "Ann Arbor, Michigan",
    country: "USA",
    foundedYear: 1817,
    ranking: 19,
    acceptanceRate: "20.1%",
    undergraduateEnrollment: 31266,
    graduateEnrollment: 16824,
    tuition: {
      inState: 15948,
      outOfState: 52266,
      international: 52266,
    },
    topPrograms: ["Business", "Engineering", "Medicine", "Law", "Social Sciences"],
    tags: ["Research", "Public"],
    logoUrl: "/universities/umich.png",
    websiteUrl: "https://umich.edu",
    description: "The University of Michigan is a public research university in Ann Arbor, Michigan. Founded in 1817, it is the oldest university in Michigan and one of the founding members of the Association of American Universities."
  },
  {
    name: "Dartmouth College",
    location: "Hanover, New Hampshire",
    country: "USA",
    foundedYear: 1769,
    ranking: 20,
    acceptanceRate: "7.9%",
    undergraduateEnrollment: 4170,
    graduateEnrollment: 2099,
    tuition: {
      outOfState: 60870,
      international: 60870,
    },
    topPrograms: ["Business", "Engineering", "Liberal Arts", "Economics", "Computer Science"],
    tags: ["Ivy League", "Research", "Liberal Arts"],
    logoUrl: "/universities/dartmouth.png",
    websiteUrl: "https://home.dartmouth.edu",
    description: "Dartmouth College is a private Ivy League research university in Hanover, New Hampshire. Established in 1769, it is one of the nine colonial colleges founded prior to the American Revolution and is among the most prestigious universities in the world."
  }
];

// Helper functions to work with university data
export function getAllUniversities(): University[] {
  return universities;
}

export function getUniversityByName(name: string): University | undefined {
  return universities.find(uni => uni.name.toLowerCase() === name.toLowerCase());
}

export function getTopUniversities(limit: number = 10): University[] {
  return [...universities]
    .sort((a, b) => (a.ranking || 1000) - (b.ranking || 1000))
    .slice(0, limit);
}

export function getUniversitiesByCountry(country: string): University[] {
  return universities.filter(uni => 
    uni.country.toLowerCase() === country.toLowerCase()
  );
}

export function searchUniversities(query: string): University[] {
  const lowerQuery = query.toLowerCase();
  return universities.filter(uni => 
    uni.name.toLowerCase().includes(lowerQuery) ||
    uni.location.toLowerCase().includes(lowerQuery) ||
    uni.country.toLowerCase().includes(lowerQuery) ||
    uni.description.toLowerCase().includes(lowerQuery) ||
    uni.topPrograms?.some(program => program.toLowerCase().includes(lowerQuery))
  );
}

export function getUniversitiesByTags(tags: string[]): University[] {
  if (!tags.length) return universities;
  
  return universities.filter(uni => 
    tags.some(tag => uni.tags?.includes(tag))
  );
}

export default universities; 