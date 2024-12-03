import React from 'react';
import { motion } from 'framer-motion';

interface GlowingBorderProps {
  children: React.ReactNode;
  className?: string;
}

export function GlowingBorder({ children, className = '' }: GlowingBorderProps) {
  return (
    <div className={`gradient-border animate-glow ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900 rounded-2xl h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}