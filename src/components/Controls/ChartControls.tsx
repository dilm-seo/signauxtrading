import React from 'react';
import { Settings } from 'lucide-react';
import { useTradingStore } from '../../store/tradingStore';

export const ChartControls: React.FC = () => {
  const { chartConfig, updateChartConfig } = useTradingStore();

  const timeframes = ['1m', '5m', '15m', '1h', '4h', '1D', '1W'];

  return (
    <div className="bg-slate-800 p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="text-white" size={20} />
        <h2 className="text-xl font-bold text-white">Configuration</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-white block mb-2">Timeframe</label>
          <div className="flex gap-2 flex-wrap">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => updateChartConfig({ timeframe: tf })}
                className={`px-3 py-1 rounded ${
                  chartConfig.timeframe === tf
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-700 text-gray-300'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-white">
            <input
              type="checkbox"
              checked={chartConfig.showLiquidity}
              onChange={(e) =>
                updateChartConfig({ showLiquidity: e.target.checked })
              }
              className="rounded"
            />
            Afficher les niveaux de liquidité
          </label>

          <label className="flex items-center gap-2 text-white">
            <input
              type="checkbox"
              checked={chartConfig.showVolume}
              onChange={(e) =>
                updateChartConfig({ showVolume: e.target.checked })
              }
              className="rounded"
            />
            Afficher le volume
          </label>
        </div>
      </div>
    </div>
  );
};