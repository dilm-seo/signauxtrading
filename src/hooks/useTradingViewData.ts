import { useState, useEffect } from 'react';
import { ChartData } from '../types/trading';
import { TradingViewService } from '../services/tradingViewService';

export const useTradingViewData = (symbol: string, timeframe: string) => {
  const [data, setData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const tradingViewService = TradingViewService.getInstance();
    setIsLoading(true);
    setError(null);

    try {
      tradingViewService.changeSymbol(symbol);
      tradingViewService.changeTimeframe(timeframe);

      const unsubscribe = tradingViewService.subscribe((newData) => {
        setData(newData);
        setIsLoading(false);
      });

      return () => {
        unsubscribe();
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsLoading(false);
    }
  }, [symbol, timeframe]);

  return { data, isLoading, error };
};