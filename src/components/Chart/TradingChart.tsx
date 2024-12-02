import React, { useEffect, useRef } from 'react';
import { createChart, ColorType } from 'lightweight-charts';
import { useTradingStore } from '../../store/tradingStore';
import { useChartDimensions } from '../../hooks/useChartDimensions';
import { useTradingViewData } from '../../hooks/useTradingViewData';
import { calculateMA } from '../../utils/chartHelpers';

interface TradingChartProps {
  symbol: string;
}

export const TradingChart: React.FC<TradingChartProps> = ({ symbol }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const { liquidityLevels, chartConfig } = useTradingStore();
  const dimensions = useChartDimensions(chartContainerRef);
  const { data, isLoading, error } = useTradingViewData(symbol, chartConfig.timeframe);

  useEffect(() => {
    if (!chartContainerRef.current || isLoading || error) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: '#1E293B' },
        textColor: '#D1D5DB',
      },
      grid: {
        vertLines: { color: '#334155' },
        horzLines: { color: '#334155' },
      },
      width: dimensions.width,
      height: dimensions.height,
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#22C55E',
      downColor: '#EF4444',
      borderVisible: false,
      wickUpColor: '#22C55E',
      wickDownColor: '#EF4444',
    });

    candlestickSeries.setData(data);

    if (chartConfig.showMA) {
      const maSeries = chart.addLineSeries({
        color: '#60A5FA',
        lineWidth: 2,
      });
      const maData = calculateMA(data, chartConfig.maPeriod);
      maSeries.setData(maData);
    }

    if (chartConfig.showVolume) {
      const volumeSeries = chart.addHistogramSeries({
        color: '#4B5563',
        priceFormat: {
          type: 'volume',
        },
        priceScaleId: '',
      });
      
      const volumeData = data.map(item => ({
        time: item.time,
        value: item.volume || 0,
        color: item.close >= item.open ? '#22C55E' : '#EF4444',
      }));
      
      volumeSeries.setData(volumeData);
    }

    if (chartConfig.showLiquidity) {
      liquidityLevels.forEach((level) => {
        chart.addLineSeries({
          color: level.type === 'buy' ? '#22C55E' : '#EF4444',
          lineWidth: 2,
          lineStyle: 2,
        }).setData([
          { time: data[0].time, value: level.price },
          { time: data[data.length - 1].time, value: level.price },
        ]);
      });
    }

    const handleResize = () => {
      chart.applyOptions({
        width: dimensions.width,
        height: dimensions.height,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      chart.remove();
      window.removeEventListener('resize', handleResize);
    };
  }, [data, liquidityLevels, chartConfig, dimensions, isLoading, error]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-slate-800">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-slate-800 text-red-400">
        {error}
      </div>
    );
  }

  return <div ref={chartContainerRef} className="w-full h-[500px]" />;
};