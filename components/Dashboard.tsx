
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

const mockStudentProfile: StudentProfile = {
  name: 'Priya Sharma',
  major: 'Computer Science, B.Tech',
  interests: ['Machine Learning', 'Cloud Computing', 'Web Development'],
  skills: ['Python', 'React', 'Node.js', 'SQL'],
  goals: 'To become a full-stack developer at a leading tech company and eventually specialize in AI engineering.',
};

const Dashboard: React.FC = () => {
  const [studentProfile] = useState<StudentProfile>(mockStudentProfile);
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <Header profile={studentProfile} />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            <ProfileCard profile={studentProfile} />
            <Notifications selectedCareer={selectedCareer} />
            <MentorMatching profile={studentProfile} />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            <CareerRecommendations 
              profile={studentProfile} 
              onCareerSelect={setSelectedCareer} 
              selectedCareer={selectedCareer}
            />
            <SkillRoadmap selectedCareer={selectedCareer} currentSkills={studentProfile.skills} />
            <CareerSimulation selectedCareer={selectedCareer} />
            <JobMarketTrends />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
