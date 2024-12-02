export interface LiquidityLevel {
  price: number;
  type: 'buy' | 'sell';
  strength: number;
  timestamp: number;
}

export interface ChartData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export interface ChartConfig {
  timeframe: string;
  showLiquidity: boolean;
  showVolume: boolean;
  showMA: boolean;
  maPeriod: number;
  showHeatmap: boolean;
  showVolumeProfile: boolean;
}

export interface TradingViewData {
  symbol: string;
  interval: string;
  data: ChartData[];
}

export type TimeframeOption = '1m' | '5m' | '15m' | '1h' | '4h' | '1D' | '1W';

export interface Signal {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  price: number;
  timestamp: number;
  strength: number;
  description: string;
}

export interface VolumeProfile {
  price: number;
  volume: number;
  type: 'buy' | 'sell';
}