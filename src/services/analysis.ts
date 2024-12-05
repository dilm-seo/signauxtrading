isimport OpenAI from 'openai';
import { NewsItem, Settings, CurrencyStrength } from '../types';

export async function analyzeCurrencyStrength(
  news: NewsItem[],
  settings: Settings
): Promise<CurrencyStrength[]> {
  if (!settings.apiKey) {
    throw new Error('Veuillez configurer votre clé API OpenAI');
  }

  const openai = new OpenAI({
    apiKey: settings.apiKey,
    dangerouslyAllowBrowser: true
  });

  const systemPrompt = `En tant qu'analyste expert du marché Forex, évaluez les informations fournies pour déterminer l'impact sur les principales devises mondiales (USD, EUR, GBP, JPY, AUD, NZD, CAD, CHF). Pour chaque devise :

1. Analysez les nouvelles en lien direct avec cette devise et identifiez leur impact potentiel.
2. Attribuez un score de force relatif (-1 à 1), basé sur :
- Les annonces des banques centrales.
- Les données économiques clés.
- Le sentiment général du marché.
3. Indiquez le sentiment global pour la devise (haussier, baissier ou neutre).
4. Fournissez une explication concise (2-3 phrases) justifiant votre évaluation et le score attribué.

Format JSON attendu:
{
  "strengths": [
    {
      "currency": "USD",
      "strength": 0.8,
      "sentiment": "bullish",
      "rationale": "Explication détaillée des facteurs..."
    }
  ]
}`;

  const newsText = news
    .map(item => `${item.title}\n${item.content}`)
    .join('\n\n')
    .slice(0, 4000);

  try {
    const response = await openai.chat.completions.create({
      model: settings.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: newsText }
      ],
      response_format: { type: "json_object" },
      temperature: 0.5,
      max_tokens: 1000,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('Pas de réponse de OpenAI');
    }

    const analysis = JSON.parse(content);
    
    if (!analysis.strengths?.length) {
      throw new Error('Analyse incomplète');
    }

    return analysis.strengths.map((s: any) => ({
      currency: String(s.currency || ''),
      strength: Math.max(-1, Math.min(1, parseFloat(s.strength) || 0)),
      sentiment: (['bullish', 'bearish', 'neutral'].includes(s.sentiment) 
        ? s.sentiment 
        : 'neutral') as 'bullish' | 'bearish' | 'neutral',
      rationale: String(s.rationale || '')
    }));
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Erreur d'analyse: ${error.message}`);
    }
    throw new Error('Erreur inattendue lors de l\'analyse');
  }
}
