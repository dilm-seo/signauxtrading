import React from 'react';
import { Search } from 'lucide-react';
import { useTradingStore } from '../../store/tradingStore';

const POPULAR_SYMBOLS = [
  'BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT',
  'ADAUSDT', 'DOGEUSDT', 'XRPUSDT', 'AVAXUSDT'
];

export const SymbolSelector: React.FC = () => {
  const { symbol, setSymbol } = useTradingStore();
  const [search, setSearch] = React.useState('');

  const filteredSymbols = POPULAR_SYMBOLS.filter(s => 
    s.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-slate-800 p-4 rounded-lg">
      <h2 className="text-xl font-bold text-white mb-4">Symbole</h2>
      
      <div className="relative mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher..."
          className="w-full bg-slate-700 text-white px-4 py-2 pl-10 rounded"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {filteredSymbols.map((s) => (
          <button
            key={s}
            onClick={() => setSymbol(s)}
            className={`px-3 py-2 rounded text-sm ${
              symbol === s
                ? 'bg-blue-500 text-white'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};