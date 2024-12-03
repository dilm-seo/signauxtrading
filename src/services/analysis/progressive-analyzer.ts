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

    // Add artificial delay to match the progress bar
    await sleep(Math.random() * 2000 + 1000);

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
      ...analysis,
      tokensUsed: inputTokens + outputTokens
    };
  }

  public async analyze(news: NewsItem[]): Promise<ProgressiveAnalysis> {
    // Check cache first
    const cached = analysisCache.getCachedAnalysis(news);
    if (cached) {
      // Add minimal delay even for cached results
      await sleep(5000);
      return { ...cached.data, tokensUsed: 0 };
    }

    // Split news into chunks for progressive analysis
    const chunkSize = 5;
    const chunks = [];
    for (let i = 0; i < news.length; i += chunkSize) {
      chunks.push(news.slice(i, i + chunkSize));
    }

    let totalTokens = 0;
    const analyses: ProgressiveAnalysis[] = [];

    // Analyze each chunk with timing distribution
    const chunkDelay = Math.floor(30000 / chunks.length);
    for (const chunk of chunks) {
      const analysis = await this.analyzeNewsChunk(chunk);
      totalTokens += analysis.tokensUsed;
      analyses.push(analysis);
      await sleep(chunkDelay);
    }

    // Merge analyses
    const mergedAnalysis = this.mergeAnalyses(analyses);
    
    // Cache the result
    analysisCache.cacheAnalysis(news, {
      strengths: mergedAnalysis.strengths,
      correlations: mergedAnalysis.correlations
    });

    return {
      ...mergedAnalysis,
      tokensUsed: totalTokens
    };
  }

  // ... rest of the class implementation remains the same
}