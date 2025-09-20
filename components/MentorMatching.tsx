
import React, { useEffect } from 'react';
import Card from './common/Card';
import Spinner from './common/Spinner';
import Button from './common/Button';
import { useGemini } from '../hooks/useGemini';
import { getMentorMatches } from '../services/geminiService';
import type { StudentProfile, MentorProfile } from '../types';

interface MentorMatchingProps {
  profile: StudentProfile;
}

const MentorMatching: React.FC<MentorMatchingProps> = ({ profile }) => {
  const { data: mentors, isLoading, execute: fetchMentors } = useGemini<MentorProfile[], [StudentProfile]>(getMentorMatches);

  useEffect(() => {
    fetchMentors(profile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);
  
  return (
    <Card title="Find a Mentor">
      {isLoading && <div className="flex justify-center p-8"><Spinner /></div>}
      {mentors && (
        <div className="space-y-4">
          {mentors.map((mentor, index) => (
            <div key={index} className="bg-slate-800 p-4 rounded-lg flex items-start space-x-4">
              <img src={`https://i.pravatar.cc/150?u=${mentor.name}`} alt={mentor.name} className="w-12 h-12 rounded-full" />
              <div className="flex-1">
                <h4 className="font-bold text-white">{mentor.name}</h4>
                <p className="text-sm text-cyan-400">{mentor.title} @ {mentor.company}</p>
                <p className="text-sm text-slate-400 mt-1">{mentor.bio}</p>
                <Button className="mt-2" variant="secondary" size="sm">Connect</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default MentorMatching;
