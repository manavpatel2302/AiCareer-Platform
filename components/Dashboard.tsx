import React, { useState } from 'react';
import Header from './Header';
import ProfileCard from './ProfileCard';
import CareerRecommendations from './CareerRecommendations';
import SkillRoadmap from './SkillRoadmap';
import JobMarketTrends from './JobMarketTrends';
import CareerSimulation from './CareerSimulation';
import MentorMatching from './MentorMatching';
import Notifications from './Notifications';
import type { StudentProfile } from '../types';

interface DashboardProps {
  profile: StudentProfile;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ profile, onLogout }) => {
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <Header profile={profile} onLogout={onLogout} />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            <ProfileCard profile={profile} />
            <Notifications selectedCareer={selectedCareer} />
            <MentorMatching profile={profile} />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            <CareerRecommendations 
              profile={profile} 
              onCareerSelect={setSelectedCareer} 
              selectedCareer={selectedCareer}
            />
            <SkillRoadmap selectedCareer={selectedCareer} currentSkills={profile.skills} />
            <CareerSimulation selectedCareer={selectedCareer} />
            <JobMarketTrends />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
