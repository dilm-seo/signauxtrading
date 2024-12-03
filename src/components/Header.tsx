import React from 'react';
import { TrendingUp, Search, Globe2, LineChart } from 'lucide-react';
import { motion } from 'framer-motion';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-blue-500/10">
      <nav className="max-w-8xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse"></div>
              <TrendingUp className="w-8 h-8 text-blue-400 relative animate-glow" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                ForexVision
              </h1>
              <p className="text-xs text-gray-400">Powered by AI</p>
            </div>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="absolute inset-0 bg-purple-500/10 blur-lg rounded-full"></div>
              <div className="relative flex items-center gap-2 px-4 py-2 bg-purple-500/5 rounded-full border border-purple-500/10">
                <Search className="w-4 h-4 text-purple-400" />
                <input
                  type="text"
                  placeholder="Rechercher une paire..."
                  className="bg-transparent border-none outline-none text-sm text-gray-300 placeholder-gray-500 w-40"
                />
              </div>
            </motion.div>

            <nav className="flex items-center gap-6">
              <motion.a 
                href="#analysis"
                className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <LineChart className="w-5 h-5 group-hover:animate-pulse" />
                <span className="text-sm">Analyse</span>
              </motion.a>
              <motion.a 
                href="#markets"
                className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Globe2 className="w-5 h-5 group-hover:animate-pulse" />
                <span className="text-sm">Marchés</span>
              </motion.a>
            </nav>
          </div>
        </div>
      </nav>
    </header>
  );
}