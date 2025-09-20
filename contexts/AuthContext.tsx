import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { StudentProfile } from '../types';

interface User {
  email: string;
  profile: StudentProfile;
}

interface AuthContextType {
  currentUser: StudentProfile | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signup: (profile: StudentProfile, email: string, pass: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database
const mockUsers: Record<string, { password: string, profile: StudentProfile }> = {
  'priya@example.com': {
    password: 'password123',
    profile: {
      name: 'Priya Sharma',
      major: 'Computer Science, B.Tech',
      interests: ['Machine Learning', 'Cloud Computing', 'Web Development'],
      skills: ['Python', 'React', 'Node.js', 'SQL'],
      goals: 'To become a full-stack developer at a leading tech company and eventually specialize in AI engineering.',
    }
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate checking for a logged-in user on initial load
  useState(() => {
    // In a real app, you'd check localStorage or a session cookie
    setTimeout(() => setLoading(false), 500); 
  });

  const login = async (email: string, pass: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => { // Simulate API latency
        const user = mockUsers[email.toLowerCase()];
        if (user && user.password === pass) {
          setCurrentUser(user.profile);
          resolve();
        } else {
          reject(new Error('Invalid email or password.'));
        }
      }, 500);
    });
  };

  const signup = async (profile: StudentProfile, email: string, pass: string): Promise<void> => {
     return new Promise((resolve, reject) => {
      setTimeout(() => {
        const lowerEmail = email.toLowerCase();
        if (mockUsers[lowerEmail]) {
          reject(new Error('An account with this email already exists.'));
          return;
        }
        mockUsers[lowerEmail] = { password: pass, profile };
        setCurrentUser(profile);
        resolve();
      }, 500);
    });
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
