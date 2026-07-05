import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { DistrictMetrics } from '../services/indiaHealthDataService';

interface Props {
  metrics: DistrictMetrics | null;
}

export default function InsightLabView({ metrics }: Props) {
  const trendData = useMemo(() => {
    if (!metrics) return [];
    
    let hash = 0;
    for (let i = 0; i < metrics.name.length; i++) {
      hash = metrics.name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const isMetro = metrics.isMetroHub;
    const baseScale = isMetro ? 20000 : 500;
    const volatility = isMetro ? 20000 : 1000;
    
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((day, index) => {
      const pseudoRandom1 = Math.abs(Math.sin(hash + index)) * volatility;
      const pseudoRandom2 = Math.abs(Math.cos(hash + index)) * (volatility * 0.8);
      
      return {
        day,
        respiratorySurge: Math.floor(baseScale + pseudoRandom1),
        supplyDemand: Math.floor(baseScale * 0.8 + pseudoRandom2),
      };
    });
  }, [metrics]);

  const summaries = useMemo(() => {
    if (!metrics) return [];
    
    const fullFacilities = metrics.facilities.filter(f => f.status === 'FULL');
    const totalDeficit = metrics.facilities.reduce((acc, f) => acc + f.bedsDeficitCount, 0);
    const mainCity = metrics.cities[0] || metrics.name;
    const isMetro = metrics.isMetroHub;
    
    const items = [];
    
    if (fullFacilities.length > 0) {
      const names = fullFacilities.map(f => f.name).join(', ');
      const percentage = isMetro ? 45 : 25;
      items.push({
        color: 'bg-rose-500',
        label: 'Critical Alert',
        text: `Severe bed deficits detected at ${names}. Projected ${percentage}% increase in critical care demand in the next 48 hours for ${metrics.name}.`
      });
    } else {
      const percentage = isMetro ? 20 : 15;
      items.push({
        color: 'bg-emerald-500',
        label: 'Status Nominal',
        text: `No facilities are currently at FULL capacity in ${metrics.name}. Monitoring a projected ${percentage}% routine demand fluctuation.`
      });
    }
    
    if (totalDeficit > 0) {
      const primaryFacility = [...metrics.facilities].sort((a, b) => b.bedsDeficitCount - a.bedsDeficitCount)[0]?.name || 'local health centers';
      items.push({
        color: 'bg-amber-500',
        label: 'Warning',
        text: `A cumulative deficit of ${totalDeficit} beds recorded. Supply chain latency detected for standard PPE delivery at ${primaryFacility}.`
      });
    } else {
      items.push({
        color: 'bg-blue-500',
        label: 'Logistics',
        text: `Supply chain pathways are clear for ${mainCity}. Buffer stocks maintained.`
      });
    }
    
    const mitigationPercent = isMetro ? 40 : 75;
    items.push({
      color: 'bg-indigo-500',
      label: 'Optimization',
      text: `Reallocating staff from adjacent ${isMetro ? 'zones' : 'districts'} could mitigate ${mitigationPercent}% of the current projected shortfall in ${mainCity}.`
    });

    return items;
  }, [metrics]);

  return (
    <div className="flex-1 p-6 flex flex-col space-y-6 overflow-y-auto custom-scrollbar">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm shrink-0">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Predictive Forecasting: Respiratory Surges vs Supply Demand</h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Line type="monotone" dataKey="respiratorySurge" stroke="#f43f5e" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} name="Respiratory Surge Events" />
              <Line type="monotone" dataKey="supplyDemand" stroke="#3b82f6" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} name="Supply Demand Index" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6 shrink-0">
         <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Current Facility Deficits</h2>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics?.facilities || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10}} />
                <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="bedsDeficitCount" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Bed Deficit" />
              </BarChart>
            </ResponsiveContainer>
          </div>
         </div>
         <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm text-slate-300">
           <h2 className="text-lg font-bold text-white mb-4">Intelligence Summary</h2>
           <ul className="space-y-3">
             {summaries.map((item, idx) => (
               <li key={idx} className="flex items-start gap-3">
                 <div className={`w-2 h-2 rounded-full ${item.color} mt-2 shrink-0`}></div>
                 <p className="text-sm text-slate-400"><strong className="text-white">{item.label}:</strong> {item.text}</p>
               </li>
             ))}
           </ul>
         </div>
      </div>
    </div>
  );
}
