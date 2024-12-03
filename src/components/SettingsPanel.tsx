import React, { useState } from 'react';
import { Settings } from '../types';
import { Settings as SettingsIcon, Save, Key, RefreshCw } from 'lucide-react';

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
  const [isDirty, setIsDirty] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (field: keyof Settings, value: string) => {
    setIsDirty(true);
    setIsSaved(false);
    onSettingsChange({ ...settings, [field]: value });
  };

  const handleSave = () => {
    setIsDirty(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-purple-500/20 blur-lg rounded-full"></div>
          <SettingsIcon className="w-6 h-6 text-purple-400 relative" />
        </div>
        <h2 className="text-xl font-semibold text-gray-100">Configuration</h2>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <Key className="w-4 h-4" />
            Clé API OpenAI
          </label>
          <input
            type="password"
            value={settings.apiKey}
            onChange={(e) => handleChange('apiKey', e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-xl 
                     text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 
                     focus:ring-blue-500/30 transition-all duration-200"
            placeholder="sk-..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Modèle OpenAI
          </label>
          <select
            value={settings.model}
            onChange={(e) => handleChange('model', e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-xl 
                     text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30 
                     transition-all duration-200"
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

        <button
          onClick={handleSave}
          disabled={!isDirty}
          className={`glass-button w-full flex items-center justify-center gap-2 ${
            !isDirty && 'opacity-50 cursor-not-allowed'
          }`}
        >
          <Save className="w-4 h-4" />
          {isSaved ? 'Configuration sauvegardée!' : 'Sauvegarder'}
        </button>
      </div>
    </div>
  );
}