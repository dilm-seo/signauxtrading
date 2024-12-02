import { ChartData } from '../types/trading';

export const formatChartData = (data: ChartData[]) => {
  return data.map(item => ({
    ...item,
    time: typeof item.time === 'string' ? new Date(item.time).getTime() / 1000 : item.time
  }));
};

export const calculateMA = (data: ChartData[], period: number) => {
  return data.map((item, index) => {
    if (index < period - 1) return null;
    
    const sum = data
      .slice(index - period + 1, index + 1)
      .reduce((acc, curr) => acc + curr.close, 0);
    
    return {
      time: item.time,
      value: sum / period
    };
  }).filter(Boolean);
};