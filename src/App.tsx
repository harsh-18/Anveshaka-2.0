import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import InsightLabView from './components/InsightLabView';
import ResourceMapView from './components/ResourceMapView';
import WorkflowsView from './components/WorkflowsView';
import { Message } from './models';
import { getStates, getDistricts, getMetricsByLocation } from './services/indiaHealthDataService';
import { GeminiChatService } from './services/GeminiChatService';

export default function App() {
  const chatService = useMemo(() => new GeminiChatService(), []);

  const availableStates = useMemo(() => getStates(), []);
  const [selectedState, setSelectedState] = useState<string>(availableStates[0] || '');
  
  const availableDistricts = useMemo(() => getDistricts(selectedState), [selectedState]);
  const [selectedDistrict, setSelectedDistrict] = useState<string>(availableDistricts[0] || '');

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<string>('Command Center');

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = e.target.value;
    setSelectedState(newState);
    const newDistricts = getDistricts(newState);
    if (newDistricts.length > 0) {
      setSelectedDistrict(newDistricts[0]);
    } else {
      setSelectedDistrict('');
    }
  };

  const metrics = useMemo(() => getMetricsByLocation(selectedState, selectedDistrict), [selectedState, selectedDistrict]);

  const handleSendMessage = async (content: string) => {
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const reply = await chatService.sendMessage(content, messages, { state: selectedState, district: selectedDistrict, metrics });
      
      const modelMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: reply,
      };
      
      setMessages((prev) => [...prev, modelMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: 'There was an error communicating with the intelligence service. Please check your connection and configuration.',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDispatchAlert = () => {
    let alertContent = '🚨 **Automated Workflow Alert Dispatched**\n\nEmergency dispatch protocols initiated for critical healthcare zones.';
    if (metrics && metrics.facilities.length > 0) {
      const criticalFacilities = metrics.facilities.filter(f => f.status === 'FULL').map(f => f.name);
      if (criticalFacilities.length > 0) {
        alertContent += ` Response units have been notified for ${criticalFacilities.join(', ')} due to severe capacity deficits and pattern anomalies.`;
      } else {
        alertContent += ` Response units are on standby for ${metrics.cities.join(', ')}. No facilities are currently at full capacity.`;
      }
    } else {
      alertContent += ' Response units have been notified for the selected district.';
    }

    const alertMsg: Message = {
      id: Date.now().toString(),
      role: 'model',
      content: alertContent,
    };
    setMessages((prev) => [...prev, alertMsg]);
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-sans text-slate-900">
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 shrink-0">
        <div className="p-6 flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-white">A</div>
          <h1 className="text-xl font-bold text-white tracking-tight">Anveshaka 2.0</h1>
        </div>

        <div className="px-6 py-2 space-y-4">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-slate-500 mb-1.5 block font-bold">Select State</label>
            <select
              value={selectedState}
              onChange={handleStateChange}
              className="w-full bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-lg p-2.5 focus:outline-none focus:border-blue-500 transition-colors shadow-inner cursor-pointer"
            >
              {availableStates.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-slate-500 mb-1.5 block font-bold">Select District</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-lg p-2.5 focus:outline-none focus:border-blue-500 transition-colors shadow-inner cursor-pointer"
              disabled={availableDistricts.length === 0}
            >
              {availableDistricts.map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {[
            { id: 'Command Center', icon: '📊' },
            { id: 'Insight Lab', icon: '🧬' },
            { id: 'Resource Map', icon: '🗺️' },
            { id: 'Workflows', icon: '⚙️' },
          ].map(tab => (
            <div 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-3 rounded-lg flex items-center space-x-3 cursor-pointer transition-colors ${
                activeTab === tab.id ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <div className="w-5 h-5 opacity-70">{tab.icon}</div>
              <span className="text-sm font-medium">{tab.id}</span>
            </div>
          ))}
        </nav>
        <div className="p-6 border-t border-slate-800">
          <div className="bg-slate-800/50 p-3 rounded-xl">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Data Source</p>
            <p className="text-xs text-blue-400">Public Health API v4.2</p>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center space-x-2 text-sm text-slate-500">
            <span>{selectedState || 'State'}</span>
            <span className="opacity-40">/</span>
            <span className="font-medium text-slate-900">{selectedDistrict || 'District'} District</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">LIVE: CONNECTED</div>
            <div className="w-8 h-8 rounded-full bg-slate-200"></div>
          </div>
        </header>

        {activeTab === 'Command Center' ? (
          <div className="flex-1 p-6 grid grid-cols-12 grid-rows-6 gap-4 overflow-hidden">
            <Sidebar metrics={metrics} />
            <Chat 
              messages={messages} 
              isLoading={isLoading} 
              onSendMessage={handleSendMessage} 
              onDispatchAlert={handleDispatchAlert} 
            />
          </div>
        ) : activeTab === 'Insight Lab' ? (
          <InsightLabView metrics={metrics} />
        ) : activeTab === 'Resource Map' ? (
          <ResourceMapView metrics={metrics} />
        ) : activeTab === 'Workflows' ? (
          <WorkflowsView metrics={metrics} />
        ) : (
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-slate-500 space-y-4">
            <div className="text-6xl opacity-20">⚙️</div>
            <p className="text-xl font-medium tracking-tight text-slate-400">{activeTab} Mode</p>
          </div>
        )}
      </main>
    </div>
  );
}
