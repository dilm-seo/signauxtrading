import React from 'react';
import { Settings } from '../../types';
import { Key, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface ConfigFormProps {
  settings: Settings;
  autoAnalyze: boolean;
  onSettingsChange: (settings: Settings) => void;
  onAutoAnalyzeChange: (auto: boolean) => void;
  onSave: () => void;
}

export function ConfigForm({
  settings,
  autoAnalyze,
  onSettingsChange,
  onAutoAnalyzeChange,
  onSave
}: ConfigFormProps) {
  return (
    <motion.div
      initial={{ rotateY: 180 }}
      animate={{ rotateY: 0 }}
      exit={{ rotateY: 180 }}
      className="absolute inset-0 bg-gray-900 rounded-2xl backface-hidden"
    >
      <div className="p-6 space-y-6">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <Key className="w-4 h-4" />
            Clé API OpenAI
          </label>
          <input
            type="password"
            value={settings.apiKey}
            onChange={(e) => onSettingsChange({ ...settings, apiKey: e.target.value })}
            className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-xl 
                     text-gray-100 placeholder-gray-500 input-focus"
            placeholder="sk-..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Modèle OpenAI
          </label>
          <select
            value={settings.model}
            onChange={(e) => onSettingsChange({ ...settings, model: e.target.value })}
            className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-xl 
                     text-gray-100 input-focus"
          >
            <option value="gpt-4-turbo-preview">GPT-4 Turbo</option>
            <option value="gpt-4">GPT-4</option>
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-gray-300">
            <RefreshCw className="w-4 h-4" />
            Analyse automatique
          </label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={autoAnalyze}
              onChange={(e) => onAutoAnalyzeChange(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-700/50 peer-focus:outline-none rounded-full peer 
                          peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                          peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
                          after:start-[2px] after:bg-white after:border-gray-300 after:border 
                          after:rounded-full after:h-5 after:w-5 after:transition-all 
                          peer-checked:bg-blue-500/50"></div>
          </label>
        </div>

        <motion.button
          onClick={onSave}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="glass-button w-full flex items-center justify-center gap-2"
        >
          Sauvegarder
        </motion.button>
      </div>
    </motion.div>
  );
}