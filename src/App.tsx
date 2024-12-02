import React from 'react';
import { TradingChart } from './components/Chart/TradingChart';
import { LiquidityControls } from './components/Controls/LiquidityControls';
import { ChartControls } from './components/Controls/ChartControls';
import { SymbolSelector } from './components/Controls/SymbolSelector';
import { SignalsPanel } from './components/Signals/SignalsPanel';
import { useTradingStore } from './store/tradingStore';

function App() {
  const { symbol } = useTradingStore();

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-white">Analyse Trading</h1>
        <p className="text-gray-400">Analysez vos graphiques avec des modèles prédéfinis</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="bg-slate-800 p-4 rounded-lg">
            <TradingChart symbol={symbol} />
          </div>
        </div>
        
        <div className="space-y-6">
          <SymbolSelector />
          <LiquidityControls />
          <ChartControls />
          <SignalsPanel />
        </div>
      </div>
    </div>
  );
}

export default App;