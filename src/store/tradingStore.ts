import { create } from 'zustand';
import { ChartConfig, LiquidityLevel, Signal, TimeframeOption } from '../types/trading';

interface TradingStore {
  symbol: string;
  liquidityLevels: LiquidityLevel[];
  chartConfig: ChartConfig;
  signals: Signal[];
  setSymbol: (symbol: string) => void;
  addLiquidityLevel: (level: LiquidityLevel) => void;
  removeLiquidityLevel: (timestamp: number) => void;
  updateChartConfig: (config: Partial<ChartConfig>) => void;
  addSignal: (signal: Signal) => void;
  removeSignal: (id: string) => void;
}

export const useTradingStore = create<TradingStore>((set) => ({
  symbol: 'BTCUSDT',
  liquidityLevels: [],
  signals: [],
  chartConfig: {
    timeframe: '1D',
    showLiquidity: true,
    showVolume: true,
    showMA: false,
    maPeriod: 20,
    showHeatmap: false,
    showVolumeProfile: false,
  },
  setSymbol: (symbol) => set({ symbol }),
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
  addSignal: (signal) =>
    set((state) => ({
      signals: [signal, ...state.signals].slice(0, 50), // Keep last 50 signals
    })),
  removeSignal: (id) =>
    set((state) => ({
      signals: state.signals.filter((signal) => signal.id !== id),
    })),
}));