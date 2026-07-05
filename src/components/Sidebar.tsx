import React from 'react';
import { DistrictMetrics } from '../services/indiaHealthDataService';

interface SidebarProps {
  metrics: DistrictMetrics | null;
}

export default function Sidebar({ metrics }: SidebarProps) {
  if (!metrics) return null;

  const totalShortfall = metrics.facilities.reduce((acc, f) => acc + f.bedsDeficitCount, 0);
  const criticalCount = metrics.facilities.filter(f => f.status === 'FULL').length;

  return (
    <div className="col-span-4 row-span-6 flex flex-col gap-4 overflow-y-auto pb-4 pr-2 custom-scrollbar">
      {/* Card 1: Resource Deficit equivalent */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col shrink-0">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Resource Deficit</h3>
          <span className="text-rose-500 text-xs font-bold">+{criticalCount} Critical</span>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-4xl font-bold tracking-tighter">{totalShortfall}</span>
          <span className="text-sm text-slate-400">BEDS</span>
        </div>
        <p className="text-xs text-slate-500 mt-1">Shortfall in general capacity across {metrics.facilities.length} peripheral clinics.</p>
        <div className="h-1.5 w-full bg-slate-100 rounded-full mt-4">
          <div className="h-full bg-rose-500 rounded-full" style={{ width: '78%' }}></div>
        </div>
      </div>

      {/* Card 2: Public Health Data table equivalent */}
      <div className="bg-white rounded-2xl border border-slate-200 p-0 shadow-sm overflow-hidden flex flex-col shrink-0">
        <div className="p-4 border-b border-slate-100 flex justify-between bg-slate-50/50">
          <h3 className="text-[11px] font-bold uppercase text-slate-500">Public Health Data</h3>
          <span className="text-[10px] text-blue-600 cursor-pointer">View All</span>
        </div>
        <table className="w-full text-[11px]">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-50">
              <th className="p-3 font-medium">FACILITY</th>
              <th className="p-3 font-medium">BED DEFICIT</th>
              <th className="p-3 font-medium">STATUS</th>
            </tr>
          </thead>
          <tbody className="text-slate-600">
            {metrics.facilities.slice(0, 4).map((r, i) => (
              <tr key={r.name} className={i !== 3 ? "border-b border-slate-50" : ""}>
                <td className="p-3 font-medium">{r.name}</td>
                <td className="p-3">-{r.bedsDeficitCount}</td>
                <td className={`p-3 ${r.status === 'FULL' ? 'text-rose-600 font-bold' : ''}`}>
                  {r.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card 3: Pattern Anomalies */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col shrink-0 min-h-[220px]">
        <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-4">Pattern Anomalies</h3>
        <div className="flex-1 flex items-end space-x-1.5 h-32">
          <div className="flex-1 bg-slate-100 rounded-t h-[30%]"></div>
          <div className="flex-1 bg-slate-100 rounded-t h-[40%]"></div>
          <div className="flex-1 bg-slate-100 rounded-t h-[35%]"></div>
          <div className="flex-1 bg-rose-200 rounded-t h-[80%]"></div>
          <div className="flex-1 bg-rose-500 rounded-t h-[100%]"></div>
          <div className="flex-1 bg-rose-200 rounded-t h-[60%]"></div>
          <div className="flex-1 bg-slate-100 rounded-t h-[45%]"></div>
        </div>
        <div className="mt-4 flex items-start space-x-2">
          <div className="w-2 h-2 rounded-full bg-rose-500 mt-1 shrink-0"></div>
          <p className="text-xs font-medium text-slate-600">
            Unusual surge detected. Anomalies affecting: {metrics.cities.join(', ')}.
          </p>
        </div>
      </div>
    </div>
  );
}
