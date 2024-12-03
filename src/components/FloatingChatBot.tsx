import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { Settings, NewsItem } from '../types';
import { ChatBot } from './ChatBot';
import { FloatingButton } from './FloatingButton';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingChatBotProps {
  settings: Settings;
  news?: NewsItem[];
}

export function FloatingChatBot({ settings, news = [] }: FloatingChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <FloatingButton
            icon={MessageSquare}
            label="Assistant Trading"
            onClick={() => setIsOpen(true)}
            position="right"
            className="bg-blue-500/20 hover:bg-blue-500/30"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-4 md:right-6 z-50 w-[calc(100vw-2rem)] md:w-96"
          >
            <ChatBot settings={settings} news={news} onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}