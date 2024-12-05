import React from 'react';
import { NewsItem } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Newspaper, ExternalLink, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface NewsFeedProps {
  news: NewsItem[];
  isLoading: boolean;
}

export function NewsFeed({ news, isLoading }: NewsFeedProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-green-500/20 blur-lg rounded-full"></div>
          <Newspaper className="w-6 h-6 text-green-400 relative" />
        </div>
        <h2 className="text-xl font-semibold text-gradient">Actualités Forex</h2>
      </div>

      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {news.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group glass-panel p-4 hover:bg-gray-800/40 card-hover cursor-pointer"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-100 group-hover:text-blue-400 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 mt-2 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                  {item.description}
                </p>
                <p className="text-sm text-gray-400 mt-2 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                  {item.content}
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <p className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(item.pubDate), { addSuffix: true, locale: fr })}
                  </p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                  >
                    Lire plus <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
