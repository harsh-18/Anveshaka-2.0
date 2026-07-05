import React from 'react';
import { DistrictMetrics } from '../services/indiaHealthDataService';
import { MapPin, Building2, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Props {
  metrics: DistrictMetrics | null;
}

export default function ResourceMapView({ metrics }: Props) {
  if (!metrics) return null;

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-inner min-h-full flex flex-col relative">
        <div className="absolute top-6 left-6 flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200">
           <MapPin className="w-4 h-4 text-blue-500" />
           <span className="text-sm font-bold text-slate-700">Geospatial Distribution</span>
        </div>

        <div className="flex-1 mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 content-start">
          {metrics.facilities.map((facility, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
               <div className={`absolute top-0 left-0 w-1 h-full ${facility.status === 'FULL' ? 'bg-rose-500' : 'bg-green-500'}`}></div>
               <div className="flex justify-between items-start mb-4">
                 <div className="flex items-center gap-2">
                   <div className={`p-2 rounded-lg ${facility.status === 'FULL' ? 'bg-rose-50' : 'bg-green-50'}`}>
                     <Building2 className={`w-5 h-5 ${facility.status === 'FULL' ? 'text-rose-500' : 'text-green-600'}`} />
                   </div>
                 </div>
                 {facility.status === 'FULL' ? (
                   <span className="flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded border border-rose-100">
                     <AlertCircle className="w-3 h-3" /> FULL CAPACITY
                   </span>
                 ) : (
                   <span className="flex items-center gap-1 text-[10px] font-bold text-green-700 bg-green-50 px-2 py-1 rounded border border-green-100">
                     <CheckCircle2 className="w-3 h-3" /> AVAILABLE
                   </span>
                 )}
               </div>
               <h3 className="font-bold text-slate-800 text-lg mb-1">{facility.name}</h3>
               <p className="text-xs text-slate-500 mb-4">{metrics.cities[idx % metrics.cities.length]} Region</p>
               
               <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                 <div className="flex justify-between text-xs mb-1">
                   <span className="text-slate-500">Bed Deficit</span>
                   <span className="font-bold text-slate-700">{facility.bedsDeficitCount}</span>
                 </div>
                 <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                   <div className={`h-1.5 rounded-full ${facility.status === 'FULL' ? 'bg-rose-500' : 'bg-green-500'}`} style={{ width: facility.status === 'FULL' ? '100%' : '30%' }}></div>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
