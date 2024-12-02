import React from 'react';
import { VolumeProfile as VolumeProfileType } from '../../types/trading';

interface VolumeProfileProps {
  data: VolumeProfileType[];
  containerHeight: number;
  maxVolume: number;
}

export const VolumeProfile: React.FC<VolumeProfileProps> = ({
  data,
  containerHeight,
  maxVolume,
}) => {
  return (
    <div 
      className="absolute right-0 top-0 w-40 h-full pointer-events-none"
      style={{ height: containerHeight }}
    >
      {data.map((point, index) => {
        const width = (point.volume / maxVolume) * 100;
        return (
          <div
            key={index}
            className={`absolute h-1 ${
              point.type === 'buy' ? 'bg-green-500' : 'bg-red-500'
            } opacity-30`}
            style={{
              width: `${width}%`,
              top: `${(point.price / containerHeight) * 100}%`,
              right: 0,
            }}
          />
        );
      })}
    </div>
  );
};