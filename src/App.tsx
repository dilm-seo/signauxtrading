import React from 'react';
import { TradingChart } from './components/Chart/TradingChart';
import { LiquidityControls } from './components/Controls/LiquidityControls';
import { ChartControls } from './components/Controls/ChartControls';

// Sample data - In a real app, this would come from an API
const sampleData = [
  { time: '2024-03-01', open: 100, high: 105, low: 98, close: 103 },
  { time: '2024-03-02', open: 103, high: 107, low: 101, close: 105 },
  { time: '2024-03-03', open: 105, high: 108, low: 102, close: 106 },
  // Add more data points as needed
];

function App() {
  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-white">Analyse Trading</h1>
        <p className="text-gray-400">Analysez vos graphiques avec des modèles prédéfinis</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="bg-slate-800 p-4 rounded-lg">
            <TradingChart data={sampleData} />
          </div>
        </div>
        
        <div className="space-y-6">
          <LiquidityControls />
          <ChartControls />
        </div>
      </div>
    </div>
  );
}

export default App;