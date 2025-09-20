
export interface StudentProfile {
  name: string;
  major: string;
  interests: string[];
  skills: string[];
  goals: string;
}

export interface CareerRecommendation {
  career: string;
  explanation: string;
  matchScore: number;
}

export interface RoadmapStep {
  skill: string;
  timeline: string;
  resources: string[];
}

export interface SkillRoadmapData {
  missingSkills: string[];
  roadmap: RoadmapStep[];
}

export interface JobMarketTrend {
  trendingCareers: string[];
  trendingSkills: string[];
}

export interface CareerSimDataPoint {
  year: number;
  role: string;
  salary: number;
}

export interface CareerSimulationData {
  career: string;
  progression: CareerSimDataPoint[];
}

export interface MentorProfile {
  name: string;
  title: string;
  company: string;
  bio: string;
}
