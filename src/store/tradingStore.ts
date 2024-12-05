import { create } from 'zustand';
import { ChartConfig, LiquidityLevel } from '../types/trading';

interface TradingStore {
  liquidityLevels: LiquidityLevel[];
  chartConfig: ChartConfig;
  addLiquidityLevel: (level: LiquidityLevel) => void;
  removeLiquidityLevel: (timestamp: number) => void;
  updateChartConfig: (config: Partial<ChartConfig>) => void;
}

export const useTradingStore = create<TradingStore>((set) => ({
  liquidityLevels: [],
  chartConfig: {
    timeframe: '15',
    showLiquidity: true,
    showVolume: true,
  },
  addLiquidityLevel: (level) =>
    set((state) => ({
      liquidityLevels: [...state.liquidityLevels, level],
    })),
  removeLiquidityLevel: (timestamp) =>
    set((state) => ({
      liquidityLevels: state.liquidityLevels.filter(
        (level) => level.timestamp !== timestamp
      ),
    })),
  updateChartConfig: (config) =>
    set((state) => ({
      chartConfig: { ...state.chartConfig, ...config },
    })),
}));
