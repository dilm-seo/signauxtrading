import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, Euro, X } from 'lucide-react';

interface CostPopupProps {
  cost: number;
  isVisible: boolean;
  onClose: () => void;
}

const EUR_RATE = 0.93; // Taux de conversion USD/EUR approximatif

export function CostPopup({ cost, isVisible, onClose }: CostPopupProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const eurCost = cost * EUR_RATE;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-6 left-6 z-50"
        >
          <div className="glass-panel p-4">
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center gap-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-yellow-500/20 blur-lg rounded-full"></div>
                  <DollarSign className="w-5 h-5 text-yellow-400 relative" />
                </div>
                <p className="text-lg font-semibold text-yellow-400">
                  ${cost.toFixed(4)}
                </p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/20 blur-lg rounded-full"></div>
                  <Euro className="w-5 h-5 text-blue-400 relative" />
                </div>
                <p className="text-lg font-semibold text-blue-400">
                  €{eurCost.toFixed(4)}
                </p>
              </div>

              <div className="flex flex-col">
                <p className="text-sm text-gray-300">
                  Coût estimé de l'analyse
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Taux de change: 1 USD = {EUR_RATE} EUR
                </p>
              </div>

              <button
                onClick={onClose}
                className="ml-2 p-1 hover:bg-gray-700/30 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            <div className="mt-2 h-1 bg-gray-700/50 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "linear" }}
                className="h-full bg-gradient-to-r from-yellow-500/50 to-blue-500/50"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}