import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  color: string;
}

export function SectionHeader({ icon: Icon, title, color }: SectionHeaderProps) {
  return (
    <motion.div 
      className="flex items-center gap-3 mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <div className={`absolute inset-0 ${color} blur-lg rounded-full`}></div>
        <Icon className={`w-6 h-6 relative ${color.replace('bg-', 'text-').replace('/20', '-400')}`} />
      </div>
      <h2 className="text-xl font-semibold text-gradient">{title}</h2>
    </motion.div>
  );
}