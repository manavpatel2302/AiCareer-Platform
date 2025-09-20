
import React, { useEffect } from 'react';
import Card from './common/Card';
import Spinner from './common/Spinner';
import { useGemini } from '../hooks/useGemini';
import { getJobMarketTrends } from '../services/geminiService';
import type { JobMarketTrend } from '../types';

const JobMarketTrends: React.FC = () => {
  const { data: trends, isLoading, execute: fetchTrends } = useGemini<JobMarketTrend, []>(getJobMarketTrends);

  useEffect(() => {
    fetchTrends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card title="Job Market Pulse">
      {isLoading && <div className="flex justify-center p-8"><Spinner /></div>}
      {trends && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-slate-300 mb-2">🔥 Top Emerging Careers</h3>
            <ul className="space-y-2">
              {trends.trendingCareers.map((career) => (
                <li key={career} className="bg-slate-700/50 p-2 rounded-md text-sm text-slate-200">{career}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-300 mb-2">🚀 Top Trending Skills</h3>
            <ul className="space-y-2">
              {trends.trendingSkills.map((skill) => (
                <li key={skill} className="bg-slate-700/50 p-2 rounded-md text-sm text-slate-200">{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Card>
  );
};

export default JobMarketTrends;
