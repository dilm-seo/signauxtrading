import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { GlowingBorder } from './GlowingBorder';
import { LineChart } from 'lucide-react';
import { SectionHeader } from './SectionHeader';

export function TradingViewChart() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://s3.tradingview.com/tv.js";
    script.type = "text/javascript";
    script.async = true;

    script.onload = () => {
      if (typeof TradingView !== 'undefined' && containerRef.current) {
        new TradingView.widget({
          "width": "100%",
          "height": 500,
          "symbol": "FX:EURUSD",
          "interval": "D",
          "timezone": "Europe/Paris",
          "theme": "dark",
          "style": "1",
          "locale": "fr",
          "toolbar_bg": "#f1f3f6",
          "enable_publishing": false,
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "watchlist": [
            "FX:EURUSD",
            "FX:GBPUSD",
            "FX:USDJPY",
            "FX:AUDUSD",
            "FX:USDCAD",
            "FX:USDCHF"
          ],
          "container_id": "tradingview-chart"
        });
      }
    };

    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <GlowingBorder>
      <div className="p-6">
        <SectionHeader
          icon={LineChart}
          title="Analyse Technique"
          color="bg-indigo-500/20"
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6"
        >
          <div 
            id="tradingview-chart" 
            ref={containerRef}
            className="rounded-lg overflow-hidden bg-gray-900/50"
          />
        </motion.div>
      </div>
    </GlowingBorder>
  );
}