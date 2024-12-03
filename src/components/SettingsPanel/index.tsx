import React, { useState } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { Settings } from '../../types';
import { ConfigForm } from './ConfigForm';
import { SuccessBanner } from './SuccessBanner';
import { AnimatePresence } from 'framer-motion';

interface SettingsPanelProps {
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
  autoAnalyze: boolean;
  onAutoAnalyzeChange: (auto: boolean) => void;
}

export function SettingsPanel({
  settings,
  onSettingsChange,
  autoAnalyze,
  onAutoAnalyzeChange
}: SettingsPanelProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleSave = () => {
    setIsFlipped(true);
  };

  return (
    <div className="gradient-border">
      <div className="relative preserve-3d" style={{ height: '400px' }}>
        <div className="flex items-center gap-3 absolute top-0 left-0 right-0 p-6 border-b border-gray-700/50">
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500/20 blur-lg rounded-full"></div>
            <SettingsIcon className="w-6 h-6 text-purple-400 relative" />
          </div>
          <h2 className="text-xl font-semibold text-gradient">Configuration</h2>
        </div>

        <AnimatePresence initial={false} mode="wait">
          {!isFlipped ? (
            <ConfigForm
              key="form"
              settings={settings}
              autoAnalyze={autoAnalyze}
              onSettingsChange={onSettingsChange}
              onAutoAnalyzeChange={onAutoAnalyzeChange}
              onSave={handleSave}
            />
          ) : (
            <SuccessBanner
              key="success"
              onBack={() => setIsFlipped(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}