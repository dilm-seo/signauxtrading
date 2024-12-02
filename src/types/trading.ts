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
}

export interface ChartConfig {
  timeframe: string;
  showLiquidity: boolean;
  showVolume: boolean;
}