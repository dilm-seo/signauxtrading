import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Brain, Zap, BarChart2 } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient and noise */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')] opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          {/* Main Title */}
          <div className="space-y-4">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/30 blur-3xl rounded-full"></div>
                <TrendingUp className="w-16 h-16 text-blue-400 relative animate-pulse" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Trading Intelligent
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Analysez les marchés Forex avec la puissance de l'intelligence artificielle
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Brain,
                title: "IA Avancée",
                description: "Analyses en temps réel alimentées par GPT-4",
                color: "blue"
              },
              {
                icon: Zap,
                title: "Temps Réel",
                description: "Données et analyses instantanées",
                color: "purple"
              },
              {
                icon: BarChart2,
                title: "Précision",
                description: "Signaux de trading haute fiabilité",
                color: "pink"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="glass-panel p-6 backdrop-blur-lg"
              >
                <div className={`relative w-12 h-12 mx-auto mb-4 bg-${feature.color}-500/10 rounded-xl flex items-center justify-center`}>
                  <div className={`absolute inset-0 bg-${feature.color}-500/20 blur-xl rounded-xl`}></div>
                  <feature.icon className={`w-6 h-6 text-${feature.color}-400 relative`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
      </div>
    </div>
  );
}