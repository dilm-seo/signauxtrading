import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Shield, AlertTriangle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative mt-16 border-t border-gray-800">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/5 to-blue-950/10"></div>
      
      <div className="relative max-w-8xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Disclaimer Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-panel p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-500/20 blur-lg rounded-full"></div>
                <AlertTriangle className="w-6 h-6 text-yellow-400 relative" />
              </div>
              <h3 className="text-lg font-semibold text-gray-200">Avertissement Important</h3>
            </div>
            
            <div className="space-y-4 text-sm text-gray-400">
              <p>
                Les analyses et informations fournies sur cette plateforme sont à titre indicatif uniquement
                et ne constituent en aucun cas des conseils financiers ou des recommandations d'investissement.
              </p>
              <p>
                Le trading de devises comporte des risques significatifs et peut ne pas convenir à tous les
                investisseurs. Assurez-vous de bien comprendre ces risques avant d'investir.
              </p>
            </div>
          </motion.div>

          {/* Attribution Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-panel p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 blur-lg rounded-full"></div>
                <Shield className="w-6 h-6 text-blue-400 relative" />
              </div>
              <h3 className="text-lg font-semibold text-gray-200">Créé par</h3>
            </div>
            
            <div className="space-y-4">
              <a 
                href="https://dilm-trading.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group"
              >
                <span className="text-lg font-semibold">Dilm Trading</span>
                <ExternalLink className="w-4 h-4 group-hover:animate-pulse" />
              </a>
              <p className="text-sm text-gray-400">
                Expertise en trading et analyses financières depuis plus de 10 ans.
                Visitez notre site pour plus d'informations et de ressources.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} ForexVision. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}