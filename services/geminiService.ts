
import { GoogleGenAI, Type } from "@google/genai";
import type { StudentProfile, CareerRecommendation, SkillRoadmapData, JobMarketTrend, CareerSimulationData, MentorProfile } from '../types';

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. Using a placeholder. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "YOUR_API_KEY_HERE" });

const parseJsonResponse = <T,>(text: string): T | null => {
  try {
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Failed to parse JSON response:", error);
    return null;
  }
};

export const getCareerRecommendations = async (profile: StudentProfile): Promise<CareerRecommendation[] | null> => {
  const prompt = `Based on the following student profile: Name: ${profile.name}, Major: ${profile.major}, Interests: ${profile.interests.join(', ')}, Skills: ${profile.skills.join(', ')}, Goals: ${profile.goals}. Generate a ranked list of 5 suitable career paths. For each career, provide a short explanation of why it's a good fit and a match score from 1 to 100.`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            career: { type: Type.STRING },
            explanation: { type: Type.STRING },
            matchScore: { type: Type.INTEGER },
          },
          required: ["career", "explanation", "matchScore"],
        },
      },
    },
  });

  return parseJsonResponse<CareerRecommendation[]>(response.text);
};


export const getSkillRoadmap = async (currentSkills: string[], targetCareer: string): Promise<SkillRoadmapData | null> => {
  const prompt = `A student with skills in [${currentSkills.join(', ')}] wants to become a ${targetCareer}. Identify the key missing skills and generate a structured 3-month learning roadmap. Include specific resources (e.g., online courses, books, projects) for each skill.`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          missingSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
          roadmap: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                skill: { type: Type.STRING },
                timeline: { type: Type.STRING },
                resources: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ["skill", "timeline", "resources"],
            },
          },
        },
        required: ["missingSkills", "roadmap"],
      },
    },
  });

  return parseJsonResponse<SkillRoadmapData>(response.text);
};

export const getJobMarketTrends = async (): Promise<JobMarketTrend | null> => {
  const prompt = "Generate a list of the top 5 emerging careers and the top 5 trending skills in the current tech job market.";
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          trendingCareers: { type: Type.ARRAY, items: { type: Type.STRING } },
          trendingSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["trendingCareers", "trendingSkills"],
      },
    },
  });

  return parseJsonResponse<JobMarketTrend>(response.text);
};

export const getCareerSimulation = async (career: string): Promise<CareerSimulationData | null> => {
    const prompt = `Simulate a 10-year career progression for a ${career} starting from an entry-level role. Provide 5 data points (Year 1, 3, 5, 7, 10) showing typical job titles and average annual salary in USD.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    career: { type: Type.STRING },
                    progression: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                year: { type: Type.INTEGER },
                                role: { type: Type.STRING },
                                salary: { type: Type.INTEGER },
                            },
                            required: ["year", "role", "salary"],
                        },
                    },
                },
                required: ["career", "progression"],
            },
        },
    });

    return parseJsonResponse<CareerSimulationData>(response.text);
};


export const getMentorMatches = async (profile: StudentProfile): Promise<MentorProfile[] | null> => {
  const prompt = `Generate 3 fictional mentor profiles for a student interested in a tech career with interests in ${profile.interests.join(', ')}. Include name, job title, company, and a short, inspiring bio for each.`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            title: { type: Type.STRING },
            company: { type: Type.STRING },
            bio: { type: Type.STRING },
          },
          required: ["name", "title", "company", "bio"],
        },
      },
    },
  });

  return parseJsonResponse<MentorProfile[]>(response.text);
};

export const getNudges = async (career: string | null): Promise<string[] | null> => {
  const prompt = `Generate 3 encouraging and actionable notification 'nudges' for a student learning skills for a career in ${career || 'a tech field'}. Examples: "You haven’t logged new skills this week. Complete your Python course to stay on track." or "3 new Data Scientist jobs require TensorFlow – consider adding it to your roadmap."`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.STRING,
        },
      },
    },
  });

  return parseJsonResponse<string[]>(response.text);
};
