import OpenAI from 'openai';
import { Settings, NewsItem } from '../types';
import { formatNewsContext } from '../utils/news-formatter';

export async function analyzeWithAI(message: string, settings: Settings, news: NewsItem[] = []): Promise<string> {
  if (!settings.apiKey) {
    throw new Error('Clé API OpenAI requise');
  }

  const openai = new OpenAI({
    apiKey: settings.apiKey,
    dangerouslyAllowBrowser: true
  });

  const newsContext = formatNewsContext(news);

  const systemPrompt = `Tu es un expert en analyse des marchés Forex. Tu dois:

1. Analyser les questions des utilisateurs en tenant compte:
   - Des dernières actualités du marché 
Contexte des actualités récentes:
${newsContext}

   - Des événements économiques importants
   - Des forces et faiblesses des devises
   
2. Fournir des analyses détaillées basées sur:
   - L'actualité récente du marché
   - Les corrélations entre paires de devises
   - Les opportunités de trading potentielles

3. Donner des recommandations d'achat ou vente claires mais rappeler que ce ne sont que des suggestions

Contexte des actualités récentes:
${newsContext}

Réponds en français de manière professionnelle mais accessible, réponse courte (2 à 3 phrases maximum) c'est tchat.
Format: html avec Tailwind CSS `;

  try {
    const response = await openai.chat.completions.create({
      model: settings.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return response.choices[0]?.message?.content || 'Désolé, je n\'ai pas pu analyser votre demande.';
  } catch (error) {
    console.error('Erreur lors de l\'analyse:', error);
    throw new Error('Erreur lors de l\'analyse de votre demande');
  }
}
