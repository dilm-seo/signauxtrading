import axios from 'axios';
import { NewsItem, Settings } from '../types';
import { ProgressiveAnalyzer } from './analysis/progressive-analyzer';
import { parseRSSContent } from './rss-parser';

const FOREX_FEED_URL = 'https://www.forexlive.com/feed/news';
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

export async function fetchForexNews(): Promise<NewsItem[]> {
  try {
    const response = await axios.get(`${CORS_PROXY}${encodeURIComponent(FOREX_FEED_URL)}`, {
      timeout: 10000,
      headers: {
        'Accept': 'application/rss+xml, application/xml, text/xml',
      }
    });

    if (!response.data) {
      throw new Error('Pas de données reçues du flux RSS');
    }

    return await parseRSSContent(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Délai d\'attente dépassé');
      }
      if (error.response) {
        throw new Error(`Erreur serveur: ${error.response.status}`);
      }
      throw new Error(`Erreur réseau: ${error.message}`);
    }
    
    if (error instanceof Error) {
      throw new Error(`Erreur de flux RSS: ${error.message}`);
    }
    
    throw new Error('Une erreur inattendue est survenue');
  }
}

export async function analyzeNews(news: NewsItem[], settings: Settings) {
  if (!settings.apiKey) {
    throw new Error('Clé API OpenAI requise');
  }

  if (!news.length) {
    throw new Error('Aucune actualité disponible pour l\'analyse');
  }

  try {
    const analyzer = new ProgressiveAnalyzer(settings);
    const analysis = await analyzer.analyze(news);
    
    return {
      strengths: analysis.strengths,
      correlations: analysis.correlations
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Erreur d'analyse: ${error.message}`);
    }
    throw new Error('Une erreur inattendue est survenue pendant l\'analyse');
  }
}