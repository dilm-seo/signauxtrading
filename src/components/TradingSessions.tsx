import React, { useState, useEffect } from 'react';
import { Clock, Globe } from 'lucide-react';
import { getTradingSessions } from '../utils/trading-sessions';

export function TradingSessions() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const sessions = getTradingSessions(currentTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="glass-panel border-b border-gray-700/50">
      <div className="max-w-8xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500/20 blur-lg rounded-full"></div>
              <Clock className="w-6 h-6 text-purple-400 relative" />
            </div>
            <div className="text-sm">
              <span className="text-gray-400">Heure locale:</span>
              <span className="ml-2 font-medium text-gray-200">
                {currentTime.toLocaleTimeString()}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto">
            {sessions.map((session) => (
              <div
                key={session.name}
                className={`flex items-center gap-3 px-4 py-2 rounded-xl ${
                  session.isOpen
                    ? 'bg-green-500/10 border border-green-500/20'
                    : 'bg-gray-700/10 border border-gray-700/20'
                }`}
              >
                <Globe className={`w-5 h-5 ${
                  session.isOpen ? 'text-green-400' : 'text-gray-400'
                }`} />
                <div>
                  <p className={`text-sm font-medium ${
                    session.isOpen ? 'text-green-400' : 'text-gray-400'
                  }`}>
                    {session.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {session.hours}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            {['EUR/USD', 'GBP/USD', 'USD/JPY', 'USD/CHF'].map(pair => (
              <div key={pair} className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                <span className="text-blue-400">{pair}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}