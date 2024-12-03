import React from 'react';
import { motion } from 'framer-motion';
import { GlowingBorder } from './GlowingBorder';

export function MarketTickers() {
  return (
    <GlowingBorder className="mb-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4"
      >
        <div className="tradingview-widget-container">
          <div className="tradingview-widget-container__widget"></div>
          <script
            type="text/javascript"
            src="https://s3.tradingview.com/external-embedding/embed-widget-tickers.js"
            async
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                symbols: [
                  {
                    proName: "FOREXCOM:SPXUSD",
                    title: "S&P 500"
                  },
                  {
                    proName: "FOREXCOM:NSXUSD",
                    title: "Nasdaq 100"
                  },
                  {
                    proName: "FX_IDC:EURUSD",
                    title: "EUR/USD"
                  },
                  {
                    proName: "BITSTAMP:BTCUSD",
                    title: "Bitcoin"
                  },
                  {
                    proName: "BITSTAMP:ETHUSD",
                    title: "Ethereum"
                  }
                ],
                colorTheme: "dark",
                isTransparent: true,
                showSymbolLogo: true,
                locale: "fr"
              })
            }}
          />
        </div>
      </motion.div>
    </GlowingBorder>
  );
}