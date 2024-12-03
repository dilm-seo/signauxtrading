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
          "height": 600,
          "symbol": "FX:EURUSD",
          "interval": "D",
          "timezone": "Europe/Paris",
          "theme": "dark",
          "style": "1",
          "locale": "fr",
          "toolbar_bg": "rgba(17, 24, 39, 0.9)",
          "enable_publishing": false,
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "details": true,
          "hotlist": true,
          "calendar": true,
          "studies": [
            "MASimple@tv-basicstudies",
            "RSI@tv-basicstudies",
            "MACD@tv-basicstudies",
            "StochasticRSI@tv-basicstudies",
            "AwesomeOscillator@tv-basicstudies"
          ],
          "studies_overrides": {
            "moving average.length": 20,
            "macd.fast length": 12,
            "macd.slow length": 26,
            "macd.signal smoothing": 9,
            "rsi.length": 14,
            "stochrsi.rsi length": 14,
            "stochrsi.stoch length": 14,
            "awesome oscillator.ao_ma1_length": 5,
            "awesome oscillator.ao_ma2_length": 34
          },
          "overrides": {
            "paneProperties.background": "#111827",
            "paneProperties.vertGridProperties.color": "rgba(55, 65, 81, 0.3)",
            "paneProperties.horzGridProperties.color": "rgba(55, 65, 81, 0.3)",
            "scalesProperties.textColor": "#9CA3AF",
            "mainSeriesProperties.candleStyle.upColor": "#10B981",
            "mainSeriesProperties.candleStyle.downColor": "#EF4444",
            "mainSeriesProperties.candleStyle.wickUpColor": "#10B981",
            "mainSeriesProperties.candleStyle.wickDownColor": "#EF4444",
            "mainSeriesProperties.candleStyle.borderUpColor": "#10B981",
            "mainSeriesProperties.candleStyle.borderDownColor": "#EF4444"
          },
          "watchlist": [
            "FX:EURUSD",
            "FX:GBPUSD",
            "FX:USDJPY",
            "FX:AUDUSD",
            "FX:USDCAD",
            "FX:USDCHF",
            "FX:EURGBP",
            "FX:EURJPY"
          ],
          "container_id": "tradingview-chart",
          "disabled_features": [
            "header_symbol_search",
            "header_screenshot",
            "header_compare"
          ],
          "enabled_features": [
            "study_templates",
            "hide_left_toolbar_by_default",
            "move_logo_to_main_pane",
            "two_character_bar_marks_labels"
          ]
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