import { NewsItem } from '../../types';

interface TechnicalAnalysis {
  trends: {
    pair: string;
    timeframe: string;
    direction: 'bullish' | 'bearish' | 'sideways';
    strength: number;
    keyLevels: {
      supports: number[];
      resistances: number[];
    };
  }[];
  patterns: {
    pair: string;
    pattern: string;
    significance: number;
    implication: string;
  }[];
  momentum: {
    pair: string;
    indicators: {
      name: string;
      value: number;
      signal: 'buy' | 'sell' | 'neutral';
    }[];
  }[];
}

export function analyzeTechnicalFactors(news: NewsItem[]): TechnicalAnalysis {
  const analysis: TechnicalAnalysis = {
    trends: [],
    patterns: [],
    momentum: []
  };

  news.forEach(item => {
    const text = `${item.title} ${item.content}`.toLowerCase();
    
    // Extract currency pairs
    const pairPattern = /([a-z]{3}\/[a-z]{3})/gi;
    const pairs = text.match(pairPattern) || [];

    pairs.forEach(pair => {
      // Analyze trends
      const trend = extractTrendAnalysis(text, pair);
      if (trend) {
        analysis.trends.push(trend);
      }

      // Analyze patterns
      const pattern = extractPatternAnalysis(text, pair);
      if (pattern) {
        analysis.patterns.push(pattern);
      }

      // Analyze momentum
      const momentum = extractMomentumAnalysis(text, pair);
      if (momentum) {
        analysis.momentum.push(momentum);
      }
    });
  });

  return analysis;
}

function extractTrendAnalysis(text: string, pair: string): TechnicalAnalysis['trends'][0] | null {
  const trendKeywords = {
    bullish: ['haussier', 'hausse', 'augmentation', 'rebond'],
    bearish: ['baissier', 'baisse', 'diminution', 'repli'],
    sideways: ['range', 'consolidation', 'stabilisation']
  };

  let direction: 'bullish' | 'bearish' | 'sideways' = 'sideways';
  let strength = 0;

  // Determine trend direction and strength
  for (const [trend, keywords] of Object.entries(trendKeywords)) {
    const score = keywords.filter(word => text.includes(word)).length;
    if (score > strength) {
      strength = score;
      direction = trend as 'bullish' | 'bearish' | 'sideways';
    }
  }

  if (strength === 0) return null;

  // Extract support and resistance levels
  const levels = {
    supports: extractPriceLevels(text, ['support', 'plancher']),
    resistances: extractPriceLevels(text, ['résistance', 'plafond'])
  };

  return {
    pair,
    timeframe: extractTimeframe(text) || 'moyen terme',
    direction,
    strength: strength / 3, // Normalize strength to 0-1
    keyLevels: levels
  };
}

function extractPatternAnalysis(text: string, pair: string): TechnicalAnalysis['patterns'][0] | null {
  const patterns = [
    { name: 'double-top', keywords: ['double sommet', 'double top'], significance: 0.8 },
    { name: 'double-bottom', keywords: ['double plancher', 'double bottom'], significance: 0.8 },
    { name: 'head-and-shoulders', keywords: ['tête-épaules', 'head and shoulders'], significance: 0.9 },
    { name: 'triangle', keywords: ['triangle'], significance: 0.7 },
    { name: 'flag', keywords: ['drapeau', 'flag'], significance: 0.6 }
  ];

  for (const pattern of patterns) {
    if (pattern.keywords.some(keyword => text.includes(keyword))) {
      return {
        pair,
        pattern: pattern.name,
        significance: pattern.significance,
        implication: determinePatternImplication(pattern.name, text)
      };
    }
  }

  return null;
}

function extractMomentumAnalysis(text: string, pair: string): TechnicalAnalysis['momentum'][0] | null {
  const indicators = [
    { name: 'RSI', pattern: /rsi[^.]*(\d+)/i },
    { name: 'MACD', pattern: /macd[^.]*croise/i },
    { name: 'Stochastique', pattern: /stochastique[^.]*(\d+)/i }
  ];

  const momentumIndicators = [];

  for (const indicator of indicators) {
    const match = text.match(indicator.pattern);
    if (match) {
      momentumIndicators.push({
        name: indicator.name,
        value: match[1] ? parseFloat(match[1]) : 0,
        signal: determineMomentumSignal(indicator.name, match[0])
      });
    }
  }

  if (momentumIndicators.length === 0) return null;

  return {
    pair,
    indicators: momentumIndicators
  };
}

function extractPriceLevels(text: string, keywords: string[]): number[] {
  const levels: number[] = [];
  const pricePattern = new RegExp(`(${keywords.join('|')})[^.]*?(\\d+(?:[.,]\\d+)?)`, 'gi');
  
  let match;
  while ((match = pricePattern.exec(text)) !== null) {
    const level = parseFloat(match[2].replace(',', '.'));
    if (!isNaN(level) && !levels.includes(level)) {
      levels.push(level);
    }
  }

  return levels.sort((a, b) => a - b);
}

function extractTimeframe(text: string): string | null {
  const timeframes = {
    'court terme': ['court terme', 'intraday', 'journalier'],
    'moyen terme': ['moyen terme', 'hebdomadaire'],
    'long terme': ['long terme', 'mensuel']
  };

  for (const [timeframe, keywords] of Object.entries(timeframes)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      return timeframe;
    }
  }

  return null;
}

function determinePatternImplication(pattern: string, text: string): string {
  const implications = {
    'double-top': 'Signal de retournement baissier potentiel',
    'double-bottom': 'Signal de retournement haussier potentiel',
    'head-and-shoulders': 'Formation suggérant un possible retournement de tendance',
    'triangle': 'Phase de consolidation, surveiller la sortie du triangle',
    'flag': 'Continuation probable de la tendance principale'
  };

  return implications[pattern as keyof typeof implications] || 'Motif technique à surveiller';
}

function determineMomentumSignal(
  indicator: string,
  text: string
): 'buy' | 'sell' | 'neutral' {
  switch (indicator) {
    case 'RSI':
      const value = parseFloat(text.match(/\d+/)?.[0] || '50');
      if (value > 70) return 'sell';
      if (value < 30) return 'buy';
      return 'neutral';

    case 'MACD':
      if (text.includes('croise à la hausse')) return 'buy';
      if (text.includes('croise à la baisse')) return 'sell';
      return 'neutral';

    case 'Stochastique':
      if (text.includes('suracheté')) return 'sell';
      if (text.includes('survendu')) return 'buy';
      return 'neutral';

    default:
      return 'neutral';
  }
}