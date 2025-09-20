import React from 'react';
import Dashboard from './components/Dashboard';
import AuthPage from './components/AuthPage';
import { useAuth } from './contexts/AuthContext';
import Spinner from './components/common/Spinner';

function App() {
  const { currentUser, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 font-sans flex items-center justify-center">
        <Spinner text="Loading Advisor..." size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 font-sans">
      {currentUser ? <Dashboard profile={currentUser} onLogout={logout} /> : <AuthPage />}
    </div>
  );
}

export default App;
