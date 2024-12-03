import OpenAI from 'openai';
import { NewsItem, Settings, CurrencyStrength, Correlation } from '../../types';
import { analysisCache } from '../cache/analysis-cache';
import { tokenizer } from '../utils/tokenizer';
import { sleep } from '../utils/timing';

interface ProgressiveAnalysis {
  strengths: CurrencyStrength[];
  correlations: Correlation[];
  tokensUsed: number;
}

export class ProgressiveAnalyzer {
  private openai: OpenAI;
  private settings: Settings;

  constructor(settings: Settings) {
    this.settings = settings;
    this.openai = new OpenAI({
      apiKey: settings.apiKey,
      dangerouslyAllowBrowser: true
    });
  }

  private async analyzeNewsChunk(news: NewsItem[]): Promise<ProgressiveAnalysis> {
    const systemPrompt = `Analysez ces actualités Forex pour identifier:
1. La force relative des devises (USD, EUR, GBP, JPY, etc.)
2. Les corrélations entre paires
3. Les opportunités de trading

Format JSON attendu:
{
  "strengths": [
    {
      "currency": "USD",
      "strength": 0.8,
      "sentiment": "bullish",
      "rationale": "Explication"
    }
  ],
  "correlations": [
    {
      "pair1": "EUR/USD",
      "pair2": "GBP/USD",
      "strength": 0.85,
      "recommendation": "Trading parallèle conseillé",
      "rationale": "Explication"
    }
  ]
}`;

    const newsText = news
      .map(item => `${item.title}\n${item.content}`)
      .join('\n\n');

    const inputTokens = tokenizer.count(systemPrompt + newsText);

    const response = await this.openai.chat.completions.create({
      model: this.settings.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: newsText }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('Pas de réponse de OpenAI');
    }

    const analysis = JSON.parse(content);
    const outputTokens = tokenizer.count(content);

    return {
      strengths: analysis.strengths || [],
      correlations: analysis.correlations || [],
      tokensUsed: inputTokens + outputTokens
    };
  }

  private mergeAnalyses(analyses: ProgressiveAnalysis[]): ProgressiveAnalysis {
    const strengthsMap = new Map<string, CurrencyStrength[]>();
    const correlationsMap = new Map<string, Correlation[]>();
    let totalTokens = 0;

    // Collect all analyses
    for (const analysis of analyses) {
      totalTokens += analysis.tokensUsed;

      // Group strengths by currency
      for (const strength of analysis.strengths) {
        const current = strengthsMap.get(strength.currency) || [];
        current.push(strength);
        strengthsMap.set(strength.currency, current);
      }

      // Group correlations by pair combination
      for (const correlation of analysis.correlations) {
        const key = [correlation.pair1, correlation.pair2].sort().join('-');
        const current = correlationsMap.get(key) || [];
        current.push(correlation);
        correlationsMap.set(key, current);
      }
    }

    // Merge strengths
    const mergedStrengths = Array.from(strengthsMap.entries()).map(([currency, strengths]) => {
      const avgStrength = strengths.reduce((sum, s) => sum + s.strength, 0) / strengths.length;
      const sentiments = strengths.map(s => s.sentiment);
      const dominantSentiment = this.getMostFrequent(sentiments);
      
      return {
        currency,
        strength: avgStrength,
        sentiment: dominantSentiment,
        rationale: this.combineRationales(strengths.map(s => s.rationale))
      };
    });

    // Merge correlations
    const mergedCorrelations = Array.from(correlationsMap.entries()).map(([key, correlations]) => {
      const avgStrength = correlations.reduce((sum, c) => sum + c.strength, 0) / correlations.length;
      const [pair1, pair2] = correlations[0].pair1 < correlations[0].pair2 
        ? [correlations[0].pair1, correlations[0].pair2]
        : [correlations[0].pair2, correlations[0].pair1];

      return {
        pair1,
        pair2,
        strength: avgStrength,
        recommendation: this.combineRecommendations(correlations.map(c => c.recommendation)),
        rationale: this.combineRationales(correlations.map(c => c.rationale))
      };
    });

    return {
      strengths: mergedStrengths,
      correlations: mergedCorrelations,
      tokensUsed: totalTokens
    };
  }

  private getMostFrequent<T>(arr: T[]): T {
    const counts = arr.reduce((acc, val) => {
      acc.set(val, (acc.get(val) || 0) + 1);
      return acc;
    }, new Map<T, number>());

    let maxCount = 0;
    let mostFrequent: T = arr[0];

    for (const [val, count] of counts.entries()) {
      if (count > maxCount) {
        maxCount = count;
        mostFrequent = val;
      }
    }

    return mostFrequent;
  }

  private combineRationales(rationales: string[]): string {
    const uniquePoints = new Set<string>();
    
    rationales.forEach(rationale => {
      rationale.split('.').forEach(point => {
        const trimmed = point.trim();
        if (trimmed) uniquePoints.add(trimmed);
      });
    });

    return Array.from(uniquePoints)
      .slice(0, 3)
      .join('. ') + '.';
  }

  private combineRecommendations(recommendations: string[]): string {
    const uniqueRecs = new Set(recommendations);
    return Array.from(uniqueRecs)[0] || 'Pas de recommandation disponible';
  }

  public async analyze(news: NewsItem[]): Promise<ProgressiveAnalysis> {
    // Check cache first
    const cached = analysisCache.getCachedAnalysis(news);
    if (cached) {
      await sleep(5000);
      return { ...cached.data, tokensUsed: 0 };
    }

    // Split news into chunks for progressive analysis
    const chunkSize = 5;
    const chunks = [];
    for (let i = 0; i < news.length; i += chunkSize) {
      chunks.push(news.slice(i, i + chunkSize));
    }

    const analyses: ProgressiveAnalysis[] = [];
    const chunkDelay = Math.floor(30000 / chunks.length);

    // Analyze chunks in parallel with delays
    const analysisPromises = chunks.map(async (chunk, index) => {
      await sleep(index * chunkDelay);
      const analysis = await this.analyzeNewsChunk(chunk);
      analyses.push(analysis);
      return analysis;
    });

    await Promise.all(analysisPromises);

    // Merge analyses
    const mergedAnalysis = this.mergeAnalyses(analyses);
    
    // Cache the result
    analysisCache.cacheAnalysis(news, {
      strengths: mergedAnalysis.strengths,
      correlations: mergedAnalysis.correlations
    });

    return mergedAnalysis;
  }
}