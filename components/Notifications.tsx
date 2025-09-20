
import React, { useEffect } from 'react';
import Card from './common/Card';
import Spinner from './common/Spinner';
import { useGemini } from '../hooks/useGemini';
import { getNudges } from '../services/geminiService';

interface NotificationsProps {
  selectedCareer: string | null;
}

const BellIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
);


const Notifications: React.FC<NotificationsProps> = ({ selectedCareer }) => {
  const { data: nudges, isLoading, execute: fetchNudges } = useGemini<string[], [string | null]>(getNudges);

  useEffect(() => {
    fetchNudges(selectedCareer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCareer]);
  
  return (
    <Card title="AI Nudges & Notifications">
      {isLoading && <div className="flex justify-center p-8"><Spinner /></div>}
      {nudges && (
        <ul className="space-y-3">
          {nudges.map((nudge, index) => (
            <li key={index} className="flex items-start bg-slate-800 p-3 rounded-lg">
                <BellIcon />
                <p className="text-sm text-slate-300">{nudge}</p>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};

export default Notifications;
