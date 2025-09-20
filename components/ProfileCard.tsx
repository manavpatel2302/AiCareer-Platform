
import React from 'react';
import Card from './common/Card';
import type { StudentProfile } from '../types';

interface ProfileCardProps {
  profile: StudentProfile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  return (
    <Card title="Student Profile">
      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-white">{profile.name}</h3>
          <p className="text-sm text-slate-400">{profile.major}</p>
        </div>
        <div>
          <h4 className="font-semibold text-slate-300">Skills</h4>
          <div className="flex flex-wrap gap-2 mt-1">
            {profile.skills.map((skill) => (
              <span key={skill} className="bg-cyan-900/50 text-cyan-300 text-xs font-medium px-2.5 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-slate-300">Interests</h4>
           <div className="flex flex-wrap gap-2 mt-1">
            {profile.interests.map((interest) => (
              <span key={interest} className="bg-slate-700 text-slate-300 text-xs font-medium px-2.5 py-1 rounded-full">
                {interest}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-slate-300">Career Goals</h4>
          <p className="text-slate-400 italic">"{profile.goals}"</p>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
