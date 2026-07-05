import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Clock, ArrowRight, PlayCircle, Settings2 } from 'lucide-react';
import { DistrictMetrics } from '../services/indiaHealthDataService';

interface Props {
  metrics: DistrictMetrics | null;
}

export default function WorkflowsView({ metrics }: Props) {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Dispatch Mobile Units', description: 'Reallocate 12 mobile clinical units to Bangarapet', status: 'completed', time: '10:45 AM' },
    { id: 2, title: 'Alert Regional Logistics', description: 'Notify supply chain of projected 40% O2 demand increase', status: 'active', time: 'In Progress' },
    { id: 3, title: 'Staff Reassignment', description: 'Approve shift extensions for ICU nurses at District GH', status: 'pending', time: '-' },
    { id: 4, title: 'Public Advisory', description: 'Issue local SMS broadcast regarding respiratory symptoms', status: 'pending', time: '-' },
  ]);

  useEffect(() => {
    if (metrics) {
      const city = metrics.cities[0] || 'the region';
      const facility = metrics.facilities[0]?.name || 'local hospital';
      
      setTasks(prevTasks => [
        { ...prevTasks[0], description: `Reallocate 12 mobile clinical units to ${city}` },
        { ...prevTasks[1], description: `Notify supply chain of projected 40% O2 demand increase in ${metrics.name}` },
        { ...prevTasks[2], description: `Approve shift extensions for ICU nurses at ${facility}` },
        { ...prevTasks[3], description: `Issue local SMS broadcast regarding respiratory symptoms in ${city}` },
      ]);
    }
  }, [metrics]);

  const toggleStatus = (id: number) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        if (t.status === 'pending') return { ...t, status: 'active', time: 'In Progress' };
        if (t.status === 'active') return { ...t, status: 'completed', time: 'Just now' };
        return { ...t, status: 'pending', time: '-' };
      }
      return t;
    }));
  };

  return (
    <div className="flex-1 p-6 flex gap-6 overflow-hidden">
      <div className="w-2/3 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Active Automation Workflows</h2>
            <p className="text-sm text-slate-500 mt-1">Tier-2 Emergency Response Protocol Active</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold border border-blue-100 hover:bg-blue-100 transition-colors">
            <Settings2 className="w-4 h-4" /> Configure Rules
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {tasks.map(task => (
            <div 
              key={task.id} 
              className={`p-4 rounded-xl border flex items-start gap-4 transition-all cursor-pointer ${
                task.status === 'completed' ? 'bg-slate-50 border-slate-200 opacity-70' :
                task.status === 'active' ? 'bg-blue-50 border-blue-200 shadow-sm ring-1 ring-blue-500/20' :
                'bg-white border-slate-200 hover:border-slate-300'
              }`}
              onClick={() => toggleStatus(task.id)}
            >
              <div className="mt-1">
                {task.status === 'completed' ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> :
                 task.status === 'active' ? <PlayCircle className="w-5 h-5 text-blue-600 animate-pulse" /> :
                 <Circle className="w-5 h-5 text-slate-300" />}
              </div>
              <div className="flex-1">
                <h3 className={`font-bold text-base ${task.status === 'completed' ? 'text-slate-600 line-through' : 'text-slate-800'}`}>{task.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{task.description}</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                {task.time}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="w-1/3 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl p-6 text-slate-300 flex flex-col shrink-0">
        <h2 className="text-lg font-bold text-white mb-6">Workflow Triggers</h2>
        <div className="space-y-4 flex-1">
           <div className="p-4 bg-slate-800 rounded-xl border border-slate-700/50">
             <div className="text-[10px] font-bold tracking-widest text-blue-400 uppercase mb-2">Trigger</div>
             <p className="text-sm text-slate-200 mb-3">Facility status shifts to <strong className="text-rose-400">FULL</strong></p>
             <ArrowRight className="w-4 h-4 text-slate-500 mb-3" />
             <div className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase mb-2">Action</div>
             <p className="text-sm text-slate-400">Auto-dispatch available mobile units from nearest AVAIL zone.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
