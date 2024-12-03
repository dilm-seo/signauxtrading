import { CurrencyStrength, Correlation, NewsItem } from '../../types';

interface CachedAnalysis {
  timestamp: number;
  data: {
    strengths: CurrencyStrength[];
    correlations: Correlation[];
  };
  newsHashes: string[];
}

const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

class AnalysisCache {
  private cache: Map<string, CachedAnalysis> = new Map();

  private hashNews(news: NewsItem[]): string[] {
    return news.map(item => {
      const str = `${item.title}${item.content}${item.pubDate}`;
      return this.hashString(str);
    });
  }

  private hashString(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash.toString(36);
  }

  private isCacheValid(cached: CachedAnalysis): boolean {
    const now = Date.now();
    return now - cached.timestamp < CACHE_DURATION;
  }

  private calculateNewsDifference(oldHashes: string[], newHashes: string[]): number {
    const different = newHashes.filter(hash => !oldHashes.includes(hash)).length;
    return different / newHashes.length;
  }

  public getCachedAnalysis(news: NewsItem[]): CachedAnalysis | null {
    const newsHashes = this.hashNews(news);
    
    for (const [, cached] of this.cache) {
      if (!this.isCacheValid(cached)) continue;

      const difference = this.calculateNewsDifference(cached.newsHashes, newsHashes);
      if (difference < 0.3) { // Less than 30% new content
        return cached;
      }
    }

    return null;
  }

  public cacheAnalysis(news: NewsItem[], analysis: { strengths: CurrencyStrength[]; correlations: Correlation[] }): void {
    const cacheKey = Date.now().toString();
    this.cache.set(cacheKey, {
      timestamp: Date.now(),
      data: analysis,
      newsHashes: this.hashNews(news)
    });

    // Clean old cache entries
    for (const [key, cached] of this.cache) {
      if (!this.isCacheValid(cached)) {
        this.cache.delete(key);
      }
    }
  }
}

export const analysisCache = new AnalysisCache();