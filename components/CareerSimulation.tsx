
import React, { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from './common/Card';
import Spinner from './common/Spinner';
import { useGemini } from '../hooks/useGemini';
import { getCareerSimulation } from '../services/geminiService';
import type { CareerSimulationData } from '../types';

interface CareerSimulationProps {
  selectedCareer: string | null;
}

const CareerSimulation: React.FC<CareerSimulationProps> = ({ selectedCareer }) => {
  const { data: simData, isLoading, execute: fetchSimulation } = useGemini<CareerSimulationData, [string]>(getCareerSimulation);

  useEffect(() => {
    if (selectedCareer) {
      fetchSimulation(selectedCareer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCareer]);

  if (!selectedCareer) {
    return (
      <Card title="Career Growth Simulation">
        <div className="h-full flex items-center justify-center">
          <p className="text-slate-400">Select a career to simulate its growth trajectory.</p>
        </div>
      </Card>
    );
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-slate-700 p-3 rounded-md shadow-lg">
          <p className="label text-white font-bold">{`Year ${label}`}</p>
          <p className="intro text-slate-300">{`Role: ${payload[0].payload.role}`}</p>
          <p className="desc text-cyan-400">{`Salary: $${payload[0].value.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card title={`10-Year Simulation for a ${selectedCareer}`}>
      {isLoading && <div className="h-64 flex items-center justify-center"><Spinner text="Simulating career path..." /></div>}
      {simData && (
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={simData.progression}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="year" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} tickLine={{ stroke: '#94a3b8' }} />
              <YAxis 
                stroke="#94a3b8" 
                tick={{ fill: '#94a3b8' }} 
                tickLine={{ stroke: '#94a3b8' }}
                tickFormatter={(value: number) => `$${value/1000}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: '#e2e8f0' }} />
              <Line type="monotone" dataKey="salary" stroke="#22d3ee" strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
};

export default CareerSimulation;
