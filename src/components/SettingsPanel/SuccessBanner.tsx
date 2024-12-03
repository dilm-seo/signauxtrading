import React from 'react';
import { Check, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface SuccessBannerProps {
  onBack: () => void;
}

export function SuccessBanner({ onBack }: SuccessBannerProps) {
  return (
    <motion.div
      initial={{ rotateY: -180 }}
      animate={{ rotateY: 0 }}
      exit={{ rotateY: -180 }}
      className="absolute inset-0 bg-gray-900 rounded-2xl backface-hidden"
    >
      <div className="p-6 h-full flex flex-col items-center justify-center text-center space-y-6">
        <div className="relative">
          <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full"></div>
          <div className="relative w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
            <Check className="w-8 h-8 text-green-400" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gradient">Configuration sauvegardée!</h3>
          <p className="text-sm text-gray-400">
            Vos paramètres ont été mis à jour avec succès.
          </p>
        </div>

        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="glass-button flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </motion.button>
      </div>
    </motion.div>
  );
}