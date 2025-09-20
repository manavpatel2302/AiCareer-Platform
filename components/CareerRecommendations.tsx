
import React, { useEffect } from 'react';
import Card from './common/Card';
import Button from './common/Button';
import Spinner from './common/Spinner';
import { useGemini } from '../hooks/useGemini';
import { getCareerRecommendations } from '../services/geminiService';
import type { StudentProfile, CareerRecommendation } from '../types';

interface CareerRecommendationsProps {
  profile: StudentProfile;
  onCareerSelect: (career: string) => void;
  selectedCareer: string | null;
}

const CareerRecommendations: React.FC<CareerRecommendationsProps> = ({ profile, onCareerSelect, selectedCareer }) => {
  const { data: recommendations, isLoading, execute: fetchRecommendations } = useGemini<CareerRecommendation[], [StudentProfile]>(getCareerRecommendations);

  useEffect(() => {
    fetchRecommendations(profile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);
  
  const getProgressBarColor = (score: number) => {
    if (score > 85) return 'bg-green-500';
    if (score > 70) return 'bg-yellow-500';
    return 'bg-orange-500';
  }

  return (
    <Card title="AI Career Recommendations">
      {isLoading && <div className="flex justify-center p-8"><Spinner text="Analyzing your profile..." /></div>}
      {recommendations && (
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div
              key={rec.career}
              onClick={() => onCareerSelect(rec.career)}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${selectedCareer === rec.career ? 'bg-slate-700/80 ring-2 ring-cyan-500' : 'bg-slate-800 hover:bg-slate-700/50'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-white">{rec.career}</h3>
                <span className="text-sm font-semibold text-cyan-400">Match: {rec.matchScore}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2.5 mb-2">
                <div className={`${getProgressBarColor(rec.matchScore)} h-2.5 rounded-full`} style={{ width: `${rec.matchScore}%` }}></div>
              </div>
              <p className="text-slate-400 text-sm">{rec.explanation}</p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default CareerRecommendations;
