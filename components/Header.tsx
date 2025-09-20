import React from 'react';
import type { StudentProfile } from '../types';

interface HeaderProps {
    profile: StudentProfile;
    onLogout: () => void;
}

const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);


const Header: React.FC<HeaderProps> = ({ profile, onLogout }) => {
  return (
    <header className="p-4 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10 border-b border-slate-800">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h1 className="text-2xl font-bold text-white">AI Career Advisor</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-slate-300 hidden sm:block">{profile.name}</span>
          <img
            className="h-10 w-10 rounded-full border-2 border-cyan-500"
            src={`https://i.pravatar.cc/150?u=${profile.name.split(' ').join('')}`}
            alt="User avatar"
          />
          <button 
            onClick={onLogout} 
            className="p-2 rounded-full text-slate-400 hover:bg-slate-700 hover:text-white transition-colors duration-200"
            aria-label="Logout"
            >
            <LogoutIcon />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
