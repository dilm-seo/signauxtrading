import React from 'react';
import { Calendar, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EconomicCalendarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EconomicCalendar({ isOpen, onClose }: EconomicCalendarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100vw-2rem)] md:w-[calc(100vw-4rem)] lg:w-[calc(100vw-8rem)] max-w-5xl h-[calc(100vh-4rem)]"
          >
            <div className="glass-panel h-full flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-orange-500/20 blur-lg rounded-full"></div>
                    <Calendar className="w-6 h-6 text-orange-400 relative" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-100">
                    Calendrier Économique
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-700/30 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              
              <div className="flex-1 p-4 overflow-hidden">
                <div className="w-full h-full relative bg-white rounded-lg overflow-hidden">
                  <iframe
                    src="https://sslecal2.investing.com?columns=exc_flags,exc_currency,exc_importance,exc_actual,exc_forecast,exc_previous&features=datepicker,timezone&countries=110,17,25,34,32,6,37,26,5,22,39,93,14,48,10,35,105,43,38,4,36,12,72&calType=day&timeZone=58&lang=5"
                    style={{
                      width: '100%',
                      height: '100%',
                      border: 'none',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0
                    }}
                  />
                </div>
                
                <div className="mt-4 text-center">
                  <span className="text-xs text-gray-400">
                    Calendrier économique fourni par{' '}
                    <a
                      href="https://fr.investing.com/"
                      target="_blank"
                      rel="nofollow"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Investing.com France
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}