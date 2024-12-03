import { Settings } from '../types';

const COST_PER_1K_TOKENS = {
  'gpt-4-turbo-preview': { input: 0.01, output: 0.03 },
  'gpt-4': { input: 0.03, output: 0.06 },
  'gpt-3.5-turbo': { input: 0.0005, output: 0.0015 }
};

export function estimateTokenCount(text: string): number {
  // Rough estimation: ~4 characters per token
  return Math.ceil(text.length / 4);
}

export function calculateCost(
  inputTokens: number,
  outputTokens: number,
  model: string
): number {
  const costs = COST_PER_1K_TOKENS[model as keyof typeof COST_PER_1K_TOKENS];
  if (!costs) return 0;

  const inputCost = (inputTokens / 1000) * costs.input;
  const outputCost = (outputTokens / 1000) * costs.output;
  
  return inputCost + outputCost;
}

export function formatCost(cost: number): string {
  return `$${cost.toFixed(4)}`;
}