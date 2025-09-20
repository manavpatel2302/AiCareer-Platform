
import React, { useEffect } from 'react';
import Card from './common/Card';
import Spinner from './common/Spinner';
import Button from './common/Button';
import { useGemini } from '../hooks/useGemini';
import { getSkillRoadmap } from '../services/geminiService';
import type { SkillRoadmapData } from '../types';

interface SkillRoadmapProps {
  selectedCareer: string | null;
  currentSkills: string[];
}

const SkillRoadmap: React.FC<SkillRoadmapProps> = ({ selectedCareer, currentSkills }) => {
  const { data: roadmapData, isLoading, execute: fetchRoadmap } = useGemini<SkillRoadmapData, [string[], string]>(getSkillRoadmap);

  useEffect(() => {
    if (selectedCareer) {
      fetchRoadmap(currentSkills, selectedCareer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCareer]);

  if (!selectedCareer) {
    return (
      <Card title="Skill Development Roadmap">
        <div className="h-full flex items-center justify-center">
          <p className="text-slate-400">Select a career recommendation to generate your personalized learning plan.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card title={`Roadmap to become a ${selectedCareer}`}>
      {isLoading && <div className="flex justify-center p-8"><Spinner text={`Generating roadmap for ${selectedCareer}...`} /></div>}
      {roadmapData && (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-slate-300 mb-2">Key Skills to Acquire</h4>
            <div className="flex flex-wrap gap-2">
              {roadmapData.missingSkills.map((skill) => (
                <span key={skill} className="bg-yellow-900/50 text-yellow-300 text-sm font-medium px-3 py-1.5 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-slate-300 mb-3">Your 3-Month Learning Plan</h4>
            <div className="space-y-4">
              {roadmapData.roadmap.map((step, index) => (
                <div key={index} className="pl-4 border-l-2 border-cyan-700 relative">
                    <div className="absolute -left-2 top-1.5 w-3.5 h-3.5 bg-slate-900 border-2 border-cyan-500 rounded-full"></div>
                    <p className="font-bold text-cyan-400">{step.timeline}</p>
                    <h5 className="font-semibold text-white mt-1">{step.skill}</h5>
                    <ul className="list-disc list-inside mt-1 text-slate-400 text-sm space-y-1">
                        {step.resources.map((resource, rIndex) => (
                            <li key={rIndex}>{resource}</li>
                        ))}
                    </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default SkillRoadmap;
