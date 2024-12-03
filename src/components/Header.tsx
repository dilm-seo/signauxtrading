import React from 'react';
import { TrendingUp, BarChart2, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-gray-900/80 backdrop-blur-lg border-b border-gray-700/50">
      <div className="max-w-8xl mx-auto">
        <div className="flex items-center justify-between px-4 py-4">
          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/30 blur-xl rounded-full animate-pulse"></div>
              <TrendingUp className="w-8 h-8 text-blue-400 relative animate-glow" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gradient relative">
                <span className="absolute -inset-1 bg-blue-500/20 blur-lg rounded-lg"></span>
                <span className="relative">Forex Vision AI</span>
              </h1>
              <p className="text-sm text-blue-400/80">
                Analyse en temps réel par Intelligence Artificielle
              </p>
            </div>
          </motion.div>
          
          <nav className="hidden md:flex items-center gap-8">
            <motion.div 
              className="group relative"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="absolute -inset-2 bg-purple-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative flex items-center gap-2 text-purple-400 group-hover:text-purple-300 transition-colors">
                <BarChart2 className="w-5 h-5" />
                <span className="text-sm font-medium">Analyse temps réel</span>
              </div>
            </motion.div>

            <motion.div 
              className="group relative"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="absolute -inset-2 bg-pink-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative flex items-center gap-2 text-pink-400 group-hover:text-pink-300 transition-colors">
                <Globe className="w-5 h-5" />
                <span className="text-sm font-medium">Couverture mondiale</span>
              </div>
            </motion.div>
          </nav>
        </div>

        <motion.div 
          className="md:hidden flex items-center justify-center gap-6 px-4 py-3 border-t border-gray-700/50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center gap-2 text-purple-400">
            <BarChart2 className="w-4 h-4" />
            <span className="text-xs">Analyse</span>
          </div>
          <div className="flex items-center gap-2 text-pink-400">
            <Globe className="w-4 h-4" />
            <span className="text-xs">Mondial</span>
          </div>
        </motion.div>
      </div>
    </header>
  );
}