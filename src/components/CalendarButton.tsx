import React from 'react';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface CalendarButtonProps {
  onClick: () => void;
}

export function CalendarButton({ onClick }: CalendarButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-6 left-6 z-40 glass-button rounded-full p-4 flex items-center gap-2"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-orange-500/20 blur-lg rounded-full"></div>
        <Calendar className="w-6 h-6 text-orange-400 relative" />
      </div>
      <span className="text-sm font-medium">Calendrier Économique</span>
    </motion.button>
  );
}