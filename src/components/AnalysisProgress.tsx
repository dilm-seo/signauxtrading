import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Loader2 } from 'lucide-react';

interface AnalysisProgressProps {
  isVisible: boolean;
}

const messages = [
  "Collecte des données du marché...",
  "Analyse des tendances principales...",
  "Évaluation des indicateurs techniques...",
  "Calcul des corrélations entre devises...",
  "Analyse des données macroéconomiques...",
  "Identification des niveaux clés...",
  "Évaluation du sentiment de marché...",
  "Analyse des volumes d'échange...",
  "Génération des recommandations...",
  "Vérification des signaux...",
  "Finalisation de l'analyse..."
];

export function AnalysisProgress({ isVisible }: AnalysisProgressProps) {
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setCurrentMessage((prev) => (prev + 1) % messages.length);
      }, 2700); // Changed to show more messages during the 30s
      return () => clearInterval(interval);
    } else {
      setCurrentMessage(0);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="glass-panel p-8 max-w-md w-full mx-4">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full"></div>
            <div className="relative bg-blue-500/10 p-4 rounded-full">
              <Brain className="w-12 h-12 text-blue-400 animate-pulse" />
            </div>
          </div>

          <div className="space-y-4 w-full">
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 30, ease: "linear" }}
              />
            </div>

            <div className="h-16 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMessage}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-center gap-3"
                >
                  <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                  <p className="text-gray-300">{messages[currentMessage]}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}