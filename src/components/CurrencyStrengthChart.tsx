import React from 'react';
import { CurrencyStrength } from '../types';
import { TrendingUp, ChevronDown, ChevronUp, Minus, Info } from 'lucide-react';

interface CurrencyStrengthChartProps {
  strengths: CurrencyStrength[];
}

export function CurrencyStrengthChart({ strengths }: CurrencyStrengthChartProps) {
  const sortedStrengths = [...strengths].sort((a, b) => b.strength - a.strength);
  const strongest = sortedStrengths[0];
  const weakest = sortedStrengths[sortedStrengths.length - 1];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="absolute inset-0 bg-pink-500/20 blur-lg rounded-full"></div>
          <TrendingUp className="w-6 h-6 text-pink-400 relative" />
        </div>
        <h2 className="text-xl font-semibold text-gray-100">Force des Devises</h2>
      </div>

      <div className="glass-panel p-4 mb-6">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
          <div className="space-y-2">
            <p className="text-sm text-gray-300">
              <span className="font-medium text-blue-400">{strongest.currency}</span> montre la plus grande force ({(strongest.strength * 100).toFixed(1)}%) : {strongest.rationale}
            </p>
            <p className="text-sm text-gray-300">
              <span className="font-medium text-red-400">{weakest.currency}</span> présente la plus grande faiblesse ({(weakest.strength * 100).toFixed(1)}%) : {weakest.rationale}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {sortedStrengths.map((currency) => (
          <div key={currency.currency} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-lg font-medium text-gray-100">{currency.currency}</span>
                {currency.sentiment === 'bullish' && (
                  <ChevronUp className="w-4 h-4 text-green-400" />
                )}
                {currency.sentiment === 'bearish' && (
                  <ChevronDown className="w-4 h-4 text-red-400" />
                )}
                {currency.sentiment === 'neutral' && (
                  <Minus className="w-4 h-4 text-gray-400" />
                )}
              </div>
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                currency.sentiment === 'bullish' ? 'bg-green-500/20 text-green-400' :
                currency.sentiment === 'bearish' ? 'bg-red-500/20 text-red-400' :
                'bg-gray-500/20 text-gray-400'
              }`}>
                {(currency.strength * 100).toFixed(1)}%
              </span>
            </div>
            
            <div className="relative h-2 bg-gray-700/50 rounded-full overflow-hidden">
              <div
                className={`absolute left-0 top-0 h-full rounded-full ${
                  currency.sentiment === 'bullish' ? 'bg-gradient-to-r from-green-500/50 to-green-400' :
                  currency.sentiment === 'bearish' ? 'bg-gradient-to-r from-red-500/50 to-red-400' :
                  'bg-gradient-to-r from-gray-500/50 to-gray-400'
                }`}
                style={{ width: `${Math.abs(currency.strength * 100)}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10"></div>
              </div>
            </div>

            <p className="text-sm text-gray-400 mt-1">
              {currency.rationale}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}