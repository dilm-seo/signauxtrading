import React from 'react';
import { Correlation } from '../types';
import { GitCompare } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionHeader } from './SectionHeader';
import { GlowingBorder } from './GlowingBorder';

interface CorrelationTableProps {
  correlations: Correlation[];
}

export function CorrelationTable({ correlations }: CorrelationTableProps) {
  return (
    <GlowingBorder>
      <div className="p-6 space-y-6">
        <SectionHeader
          icon={GitCompare}
          title="Corrélations"
          color="bg-blue-500/20"
        />

        <div className="overflow-x-auto">
          <motion.table 
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <thead>
              <tr className="border-b border-gray-700/50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Paire 1
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Paire 2
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Corrélation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Recommandation
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/30">
              {correlations.map((correlation, index) => (
                <motion.tr 
                  key={index} 
                  className="hover:bg-gray-800/30 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-100">
                    {correlation.pair1}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {correlation.pair2}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-700/50 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500/50 to-blue-400"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.abs(correlation.strength * 100)}%` }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        />
                      </div>
                      <span className="text-sm text-gray-400">
                        {(correlation.strength * 100).toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="glass-panel bg-blue-500/5 px-3 py-1.5 text-sm text-gray-300">
                      {correlation.recommendation}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </div>
      </div>
    </GlowingBorder>
  );
}