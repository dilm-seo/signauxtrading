import React, { useEffect, useRef } from 'react';
import { createChart, ColorType } from 'lightweight-charts';
import { useTradingStore } from '../../store/tradingStore';

interface TradingChartProps {
  data: any[];
}

export const TradingChart: React.FC<TradingChartProps> = ({ data }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const { liquidityLevels, chartConfig } = useTradingStore();

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: '#1E293B' },
        textColor: '#D1D5DB',
      },
      grid: {
        vertLines: { color: '#334155' },
        horzLines: { color: '#334155' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 500,
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#22C55E',
      downColor: '#EF4444',
      borderVisible: false,
      wickUpColor: '#22C55E',
      wickDownColor: '#EF4444',
    });

    candlestickSeries.setData(data);

    // Add liquidity levels
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

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      chart.remove();
      window.removeEventListener('resize', handleResize);
    };
  }, [data, liquidityLevels, chartConfig]);

  return <div ref={chartContainerRef} className="w-full h-[500px]" />;
};