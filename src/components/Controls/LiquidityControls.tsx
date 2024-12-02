import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useTradingStore } from '../../store/tradingStore';

export const LiquidityControls: React.FC = () => {
  const [price, setPrice] = useState('');
  const { liquidityLevels, addLiquidityLevel, removeLiquidityLevel } = useTradingStore();

  const handleAddLevel = (type: 'buy' | 'sell') => {
    if (!price) return;
    
    addLiquidityLevel({
      price: parseFloat(price),
      type,
      strength: 1,
      timestamp: Date.now(),
    });
    
    setPrice('');
  };

  return (
    <div className="bg-slate-800 p-4 rounded-lg">
      <h2 className="text-xl font-bold text-white mb-4">Niveaux de Liquidité</h2>
      
      <div className="flex gap-4 mb-4">
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Prix"
          className="bg-slate-700 text-white px-3 py-2 rounded"
        />
        <button
          onClick={() => handleAddLevel('buy')}
          className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus size={16} /> Achat
        </button>
        <button
          onClick={() => handleAddLevel('sell')}
          className="bg-red-500 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus size={16} /> Vente
        </button>
      </div>

      <div className="space-y-2">
        {liquidityLevels.map((level) => (
          <div
            key={level.timestamp}
            className="flex items-center justify-between bg-slate-700 p-2 rounded"
          >
            <span className={level.type === 'buy' ? 'text-green-400' : 'text-red-400'}>
              {level.price} ({level.type === 'buy' ? 'Achat' : 'Vente'})
            </span>
            <button
              onClick={() => removeLiquidityLevel(level.timestamp)}
              className="text-gray-400 hover:text-red-400"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};