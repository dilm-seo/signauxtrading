import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface FloatingButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  position: 'left' | 'right';
  className?: string;
}

export function FloatingButton({ 
  icon: Icon, 
  label, 
  onClick, 
  position,
  className = ''
}: FloatingButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`fixed bottom-6 z-40 glass-button rounded-full p-3 md:p-4 flex items-center gap-2 
                 ${position === 'left' ? 'left-4 md:left-6' : 'right-4 md:right-6'}
                 ${className}`}
    >
      <div className="relative">
        <div className="absolute inset-0 blur-lg rounded-full"></div>
        <Icon className="w-5 h-5 md:w-6 md:h-6 relative" />
      </div>
      <span className="hidden md:inline text-sm font-medium">{label}</span>
    </motion.button>
  );
}