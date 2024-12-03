import { NewsItem } from '../../types';
import { analyzeFundamentalFactors } from './fundamental-analyzer';
import { analyzeTechnicalFactors } from './technical-analyzer';

interface CorrelationAnalysis {
  pairs: string[];
  correlation: number;
  strength: 'strong' | 'moderate' | 'weak';
  factors: string[];
  tradingImplications: string[];
}

export function analyzeCorrelations(news: NewsItem[]): CorrelationAnalysis[] {
  const fundamentals = analyzeFundamentalFactors(news);
  const technicals = analyzeTechnicalFactors(news);
  const correlations: CorrelationAnalysis[] = [];

  // Définir les paires de devises principales
  const majorPairs = [
    ['EUR/USD', 'GBP/USD'],
    ['EUR/USD', 'USD/JPY'],
    ['GBP/USD', 'USD/JPY'],
    ['AUD/USD', 'NZD/USD'],
    ['USD/CAD', 'USD/CHF']
  ];

  majorPairs.forEach(([pair1, pair2]) => {
    const correlation = calculateCorrelation(pair1, pair2, fundamentals, technicals);
    if (correlation) {
      correlations.push(correlation);
    }
  });

  return correlations;
}

function calculateCorrelation(
  pair1: string,
  pair2: string,
  fundamentals: ReturnType<typeof analyzeFundamentalFactors>,
  technicals: ReturnType<typeof analyzeTechnicalFactors>
): CorrelationAnalysis | null {
  // Extraire les devises des paires
  const [base1, quote1] = pair1.split('/');
  const [base2, quote2] = pair2.split('/');

  // Analyser les facteurs fondamentaux communs
  const commonFactors = [];
  let correlationScore = 0;

  // Vérifier les politiques monétaires
  const monetaryPolicies = fundamentals.monetaryPolicy
    .filter(policy => 
      [base1, quote1, base2, quote2].includes(policy.centralBank));

  if (monetaryPolicies.length >= 2) {
    const policiesAligned = monetaryPolicies
      .every(p => p.stance === monetaryPolicies[0].stance);
    
    if (policiesAligned) {
      correlationScore += 0.3;
      commonFactors.push(
        `Politiques monétaires alignées: ${monetaryPolicies.map(p => p.centralBank).join(', ')}`
      );
    }
  }

  // Vérifier les indicateurs économiques
  const relevantIndicators = fundamentals.economicIndicators
    .filter(indicator => indicator.impact !== 'neutral');

  if (relevantIndicators.length > 0) {
    correlationScore += 0.2;
    commonFactors.push(
      `Indicateurs économiques significatifs: ${
        relevantIndicators.map(i => i.indicator).join(', ')
      }`
    );
  }

  // Analyser les tendances techniques
  const trends = technicals.trends.filter(t => 
    t.pair === pair1 || t.pair === pair2
  );

  if (trends.length === 2) {
    const trendsAligned = trends[0].direction === trends[1].direction;
    if (trendsAligned) {
      correlationScore += 0.3;
      commonFactors.push(
        `Tendances techniques alignées: ${trends[0].direction}`
      );
    }
  }

  // Sentiment du marché
  if (fundamentals.marketSentiment.overall !== 'neutral') {
    correlationScore += 0.2;
    commonFactors.push(
      `Sentiment de marché: ${fundamentals.marketSentiment.overall}`
    );
  }

  if (correlationScore === 0) return null;

  // Déterminer la force de la corrélation
  let strength: 'strong' | 'moderate' | 'weak';
  if (correlationScore >= 0.7) strength = 'strong';
  else if (correlationScore >= 0.4) strength = 'moderate';
  else strength = 'weak';

  // Générer les implications de trading
  const tradingImplications = generateTradingImplications(
    pair1,
    pair2,
    correlationScore,
    fundamentals,
    technicals
  );

  return {
    pairs: [pair1, pair2],
    correlation: correlationScore,
    strength,
    factors: commonFactors,
    tradingImplications
  };
}

function generateTradingImplications(
  pair1: string,
  pair2: string,
  correlation: number,
  fundamentals: ReturnType<typeof analyzeFundamentalFactors>,
  technicals: ReturnType<typeof analyzeTechnicalFactors>
): string[] {
  const implications = [];

  if (correlation >= 0.7) {
    implications.push(
      `Forte corrélation entre ${pair1} et ${pair2}: opportunités de trading parallèle`
    );

    // Ajouter des recommandations spécifiques basées sur l'analyse technique
    const trends = technicals.trends.filter(t => 
      t.pair === pair1 || t.pair === pair2
    );

    if (trends.length === 2 && trends[0].direction === trends[1].direction) {
      implications.push(
        `Tendance ${trends[0].direction} confirmée sur les deux paires: `
        + `renforce la probabilité de mouvements coordonnés`
      );
    }
  } else if (correlation >= 0.4) {
    implications.push(
      `Corrélation modérée: surveiller les divergences pour des opportunités`
    );
  }

  // Ajouter des considérations de risque
  if (fundamentals.marketSentiment.keyRisks.length > 0) {
    implications.push(
      `Points de vigilance: ${fundamentals.marketSentiment.keyRisks.join(', ')}`
    );
  }

  return implications;
}