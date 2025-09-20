import React, { useState } from 'react';
import Card from './common/Card';
import Button from './common/Button';
import { useAuth } from '../contexts/AuthContext';

const Input = ({ ...props }) => (
  <input 
    className="w-full bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500" 
    {...props} 
  />
);

const Label = ({ children, ...props }: { children: React.ReactNode; htmlFor: string }) => (
    <label className="block text-sm font-medium text-slate-300 mb-1" {...props}>{children}</label>
);


const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { login, signup } = useAuth();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [formState, setFormState] = useState({
        email: 'priya@example.com',
        password: 'password123',
        name: '',
        major: '',
        skills: '',
        interests: '',
        goals: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (isLogin) {
                await login(formState.email, formState.password);
            } else {
                const profile = {
                    name: formState.name,
                    major: formState.major,
                    skills: formState.skills.split(',').map(s => s.trim()),
                    interests: formState.interests.split(',').map(i => i.trim()),
                    goals: formState.goals
                };
                await signup(profile, formState.email, formState.password);
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 to-slate-800">
            <div className="w-full max-w-md">
                <div className="flex justify-center items-center space-x-3 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <h1 className="text-3xl font-bold text-white">AI Career Advisor</h1>
                </div>
                <Card>
                    <h2 className="text-2xl font-bold text-center text-cyan-400 mb-2">{isLogin ? 'Welcome Back' : 'Create Your Account'}</h2>
                    <p className="text-center text-slate-400 mb-6">{isLogin ? 'Log in to access your dashboard.' : 'Get your personalized career roadmap.'}</p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <>
                                <div><Label htmlFor="name">Full Name</Label><Input type="text" name="name" id="name" value={formState.name} onChange={handleChange} required /></div>
                                <div><Label htmlFor="major">Major / Field of Study</Label><Input type="text" name="major" id="major" value={formState.major} onChange={handleChange} required /></div>
                            </>
                        )}
                        <div><Label htmlFor="email">Email Address</Label><Input type="email" name="email" id="email" value={formState.email} onChange={handleChange} required /></div>
                        <div><Label htmlFor="password">Password</Label><Input type="password" name="password" id="password" value={formState.password} onChange={handleChange} required /></div>
                        {!isLogin && (
                            <>
                                <div><Label htmlFor="skills">Skills (comma-separated)</Label><Input type="text" name="skills" id="skills" value={formState.skills} onChange={handleChange} placeholder="e.g. Python, React, SQL" required /></div>
                                <div><Label htmlFor="interests">Interests (comma-separated)</Label><Input type="text" name="interests" id="interests" value={formState.interests} onChange={handleChange} placeholder="e.g. Machine Learning, Cloud" required /></div>
                                <div><Label htmlFor="goals">Career Goals</Label><textarea name="goals" id="goals" value={formState.goals} onChange={handleChange} rows={2} className="w-full bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500" required /></div>
                            </>
                        )}
                        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                        <Button type="submit" className="w-full" isLoading={isLoading}>{isLogin ? 'Log In' : 'Sign Up'}</Button>
                    </form>
                    <div className="mt-6 text-center">
                        <p className="text-sm text-slate-400">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                            <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="ml-2 font-semibold text-cyan-400 hover:text-cyan-300">
                                {isLogin ? 'Sign Up' : 'Log In'}
                            </button>
                        </p>
                    </div>
                </Card>
                 <p className="text-center text-slate-500 text-xs mt-4">
                    For demo, log in as Priya: <strong>priya@example.com</strong> / <strong>password123</strong>
                </p>
            </div>
        </div>
    );
};

export default AuthPage;
