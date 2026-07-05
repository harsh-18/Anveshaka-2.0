import React, { useState, useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Message } from '../models';
import Markdown from 'react-markdown';

interface ChatProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (msg: string) => void;
  onDispatchAlert: () => void;
}

export default function Chat({ messages, isLoading, onSendMessage, onDispatchAlert }: ChatProps) {
  const [input, setInput] = useState('');
  const [dispatching, setDispatching] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleDispatch = () => {
    setDispatching(true);
    onDispatchAlert();
    setTimeout(() => setDispatching(false), 2000);
  };

  return (
    <div className="col-span-8 row-span-6 bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl flex flex-col overflow-hidden relative">
      <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-sm animate-pulse"></div>
          </div>
          <span className="text-xs font-bold text-slate-100">
            Gemini 3 Flash <span className="text-blue-400 font-normal ml-1 underline cursor-pointer italic px-1">Analytic Mode</span>
          </span>
        </div>
        <button 
          onClick={handleDispatch}
          disabled={dispatching}
          className={`px-4 py-2 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all ${
            dispatching ? 'bg-rose-500/50 text-white/70' : 'bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-900/40'
          }`}
        >
          {dispatching ? 'DISPATCHING...' : 'Automated Workflow Alert'}
        </button>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
            <p className="text-sm font-medium">Intelligence Assistant Ready.</p>
            <div className="flex gap-2 flex-wrap justify-center max-w-lg mt-4">
              {['Which facilities have critical staffing?', 'Show me ventilator deficits.', 'Are there anomalies in West Point?'].map(q => (
                <button 
                  key={q}
                  onClick={() => onSendMessage(q)}
                  className="bg-slate-800 border border-slate-700 rounded-full px-4 py-2 text-xs text-slate-400 hover:border-blue-500 hover:text-blue-400 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex space-x-3 ${
                msg.role === 'user' ? '' : 'flex-row-reverse space-x-reverse'
              }`}
            >
              <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${
                msg.role === 'user' ? 'bg-slate-700 text-slate-300' : 'bg-blue-600 text-white'
              }`}>
                {msg.role === 'user' ? 'U' : 'G3'}
              </div>
              <div
                className={`p-4 rounded-2xl text-sm max-w-[85%] leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-slate-800 rounded-tl-none text-slate-300'
                    : 'bg-blue-600 rounded-tr-none text-white shadow-xl prose prose-invert prose-sm'
                }`}
              >
                {msg.role === 'user' ? (
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                ) : (
                  <div className="markdown-body">
                    <Markdown>{msg.content}</Markdown>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="flex space-x-3 flex-row-reverse space-x-reverse">
             <div className="w-8 h-8 rounded-full bg-blue-600 shrink-0 flex items-center justify-center text-white">
                <Loader2 className="w-4 h-4 animate-spin" />
             </div>
             <div className="p-4 rounded-2xl bg-slate-800 rounded-tr-none text-slate-400 text-sm">
                Analyzing intelligence data...
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-slate-800 bg-slate-900 shrink-0">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl py-4 pl-5 pr-20 text-sm text-slate-300 focus:outline-none focus:border-blue-500 placeholder-slate-500"
            placeholder="Ask about resource deficits or run simulations..."
            disabled={isLoading}
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-3 top-3 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded text-[10px] font-bold text-slate-300 uppercase transition-colors disabled:opacity-50"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
