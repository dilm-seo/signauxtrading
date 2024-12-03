import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, X } from 'lucide-react';

interface CostPopupProps {
  cost: number;
  isVisible: boolean;
  onClose: () => void;
}

export function CostPopup({ cost, isVisible, onClose }: CostPopupProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 left-6 z-50"
        >
          <div className="glass-panel p-4 flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-500/20 blur-lg rounded-full"></div>
              <DollarSign className="w-5 h-5 text-yellow-400 relative" />
            </div>
            <div>
              <p className="text-sm text-gray-300">
                Coût estimé de l'analyse
              </p>
              <p className="text-lg font-semibold text-yellow-400">
                ${cost.toFixed(4)}
              </p>
            </div>
            <button
              onClick={onClose}
              className="ml-2 p-1 hover:bg-gray-700/30 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}