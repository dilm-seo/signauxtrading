import React from 'react';
import { Bell, TrendingUp, TrendingDown } from 'lucide-react';
import { useTradingStore } from '../../store/tradingStore';
import { Signal } from '../../types/trading';

export const SignalsPanel: React.FC = () => {
  const { signals } = useTradingStore();

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div className="bg-slate-800 p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="text-white" size={20} />
        <h2 className="text-xl font-bold text-white">Signaux</h2>
      </div>

      <div className="space-y-3">
        {signals.map((signal) => (
          <div
            key={signal.id}
            className="bg-slate-700 p-3 rounded flex items-center gap-3"
          >
            {signal.type === 'buy' ? (
              <TrendingUp className="text-green-400" size={20} />
            ) : (
              <TrendingDown className="text-red-400" size={20} />
            )}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-white font-medium">{signal.symbol}</span>
                <span className="text-gray-400 text-sm">
                  {formatTime(signal.timestamp)}
                </span>
              </div>
              <p className="text-gray-300 text-sm">{signal.description}</p>
              <div className="flex justify-between items-center mt-1">
                <span className="text-gray-400 text-sm">
                  Prix: {signal.price}
                </span>
                <span className="text-gray-400 text-sm">
                  Force: {signal.strength}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};