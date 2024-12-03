import { useState } from 'react';
import { estimateTokenCount, calculateCost } from '../utils/openai-costs';

export function useOpenAICost() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [currentCost, setCurrentCost] = useState(0);

  const trackCost = (input: string, outputTokens: number, model: string) => {
    const inputTokens = estimateTokenCount(input);
    const cost = calculateCost(inputTokens, outputTokens, model);
    setCurrentCost(cost);
    setIsPopupVisible(true);
  };

  const hidePopup = () => {
    setIsPopupVisible(false);
  };

  return {
    currentCost,
    isPopupVisible,
    trackCost,
    hidePopup
  };
}