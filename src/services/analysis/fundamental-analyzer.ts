import { NewsItem } from '../../types';

interface FundamentalFactors {
  monetaryPolicy: {
    centralBank: string;
    stance: 'hawkish' | 'dovish' | 'neutral';
    nextMeeting?: string;
    rateExpectations: string;
    impact: string;
  }[];
  economicIndicators: {
    indicator: string;
    actual: string;
    forecast: string;
    previous: string;
    impact: 'positive' | 'negative' | 'neutral';
    analysis: string;
  }[];
  marketSentiment: {
    overall: 'risk-on' | 'risk-off' | 'neutral';
    drivers: string[];
    keyRisks: string[];
  };
}

export function analyzeFundamentalFactors(news: NewsItem[]): FundamentalFactors {
  const fundamentals: FundamentalFactors = {
    monetaryPolicy: [],
    economicIndicators: [],
    marketSentiment: {
      overall: 'neutral',
      drivers: [],
      keyRisks: []
    }
  };

  // Analyze monetary policy
  news.forEach(item => {
    const text = `${item.title} ${item.content}`.toLowerCase();
    
    // Central Bank Analysis
    const centralBanks = [
      { name: 'Fed', keywords: ['fed', 'federal reserve', 'powell'] },
      { name: 'BCE', keywords: ['bce', 'lagarde', 'banque centrale européenne'] },
      { name: 'BoE', keywords: ['boe', 'bank of england', 'bailey'] },
      { name: 'BoJ', keywords: ['boj', 'bank of japan', 'ueda'] }
    ];

    centralBanks.forEach(bank => {
      if (bank.keywords.some(keyword => text.includes(keyword))) {
        const stance = determineMonetaryStance(text);
        if (stance) {
          fundamentals.monetaryPolicy.push({
            centralBank: bank.name,
            stance,
            rateExpectations: extractRateExpectations(text),
            impact: analyzeMonetaryImpact(stance, text)
          });
        }
      }
    });

    // Economic Indicators Analysis
    const indicators = [
      { name: 'PIB', keywords: ['pib', 'gdp', 'croissance'] },
      { name: 'Inflation', keywords: ['inflation', 'ipc', 'cpi'] },
      { name: 'Emploi', keywords: ['emploi', 'chômage', 'nonfarm'] },
      { name: 'PMI', keywords: ['pmi', 'manufacturier', 'services'] }
    ];

    indicators.forEach(indicator => {
      if (indicator.keywords.some(keyword => text.includes(keyword))) {
        const data = extractEconomicData(text);
        if (data) {
          fundamentals.economicIndicators.push({
            indicator: indicator.name,
            ...data,
            impact: determineEconomicImpact(data),
            analysis: analyzeEconomicImplication(indicator.name, data)
          });
        }
      }
    });

    // Market Sentiment Analysis
    updateMarketSentiment(fundamentals.marketSentiment, text);
  });

  return fundamentals;
}

function determineMonetaryStance(text: string): 'hawkish' | 'dovish' | 'neutral' | null {
  const hawkishKeywords = ['hausse des taux', 'restrictif', 'inflation élevée', 'resserrement'];
  const dovishKeywords = ['baisse des taux', 'accommodant', 'assouplissement', 'soutien'];

  const hawkishScore = hawkishKeywords.filter(word => text.includes(word)).length;
  const dovishScore = dovishKeywords.filter(word => text.includes(word)).length;

  if (hawkishScore > dovishScore) return 'hawkish';
  if (dovishScore > hawkishScore) return 'dovish';
  if (hawkishScore === dovishScore && (hawkishScore > 0 || dovishScore > 0)) return 'neutral';
  return null;
}

function extractRateExpectations(text: string): string {
  const ratePatterns = [
    /hausse[^.]*(\d+(?:[.,]\d+)?)\s*(?:point|%|pb)/i,
    /baisse[^.]*(\d+(?:[.,]\d+)?)\s*(?:point|%|pb)/i
  ];

  for (const pattern of ratePatterns) {
    const match = text.match(pattern);
    if (match) {
      return match[0];
    }
  }

  return "Pas de changement attendu";
}

function analyzeMonetaryImpact(stance: string, text: string): string {
  const impactAnalysis = [];

  if (stance === 'hawkish') {
    impactAnalysis.push("Renforcement potentiel de la devise");
    if (text.includes('inattendu')) {
      impactAnalysis.push("Volatilité accrue possible");
    }
  } else if (stance === 'dovish') {
    impactAnalysis.push("Possible affaiblissement de la devise");
    if (text.includes('progressif')) {
      impactAnalysis.push("Impact modéré attendu");
    }
  }

  return impactAnalysis.join(". ") || "Impact neutre sur le marché";
}

function extractEconomicData(text: string): any {
  const numberPattern = /(\d+(?:[.,]\d+)?)\s*(?:%|points?)/g;
  const numbers = [...text.matchAll(numberPattern)];

  if (numbers.length >= 3) {
    return {
      actual: numbers[0][0],
      forecast: numbers[1][0],
      previous: numbers[2][0]
    };
  }

  return null;
}

function determineEconomicImpact(data: any): 'positive' | 'negative' | 'neutral' {
  const actual = parseFloat(data.actual);
  const forecast = parseFloat(data.forecast);
  const previous = parseFloat(data.previous);

  if (actual > forecast && actual > previous) return 'positive';
  if (actual < forecast && actual < previous) return 'negative';
  return 'neutral';
}

function analyzeEconomicImplication(indicator: string, data: any): string {
  const actual = parseFloat(data.actual);
  const forecast = parseFloat(data.forecast);
  const diff = ((actual - forecast) / forecast) * 100;

  let analysis = '';

  switch (indicator) {
    case 'PIB':
      analysis = diff > 0 
        ? "Croissance supérieure aux attentes, favorable pour la devise"
        : "Croissance inférieure aux attentes, risque de pression baissière";
      break;
    case 'Inflation':
      analysis = diff > 0
        ? "Inflation plus forte que prévu, possible resserrement monétaire"
        : "Inflation plus faible, possible assouplissement monétaire";
      break;
    case 'Emploi':
      analysis = diff > 0
        ? "Marché du travail robuste, positif pour la devise"
        : "Faiblesses sur l'emploi, risque de pression baissière";
      break;
    default:
      analysis = diff > 0
        ? "Données meilleures que prévu, impact positif probable"
        : "Données moins bonnes que prévu, vigilance recommandée";
  }

  return analysis;
}

function updateMarketSentiment(
  sentiment: FundamentalFactors['marketSentiment'],
  text: string
): void {
  const riskOnKeywords = ['appétit pour le risque', 'optimisme', 'reprise'];
  const riskOffKeywords = ['aversion au risque', 'inquiétudes', 'tensions'];

  const riskOnScore = riskOnKeywords.filter(word => text.includes(word)).length;
  const riskOffScore = riskOffKeywords.filter(word => text.includes(word)).length;

  if (riskOnScore > riskOffScore) {
    sentiment.overall = 'risk-on';
  } else if (riskOffScore > riskOnScore) {
    sentiment.overall = 'risk-off';
  }

  // Extract market drivers
  const driverPatterns = [
    /en raison de ([^.]+)/i,
    /grâce à ([^.]+)/i,
    /suite à ([^.]+)/i
  ];

  driverPatterns.forEach(pattern => {
    const match = text.match(pattern);
    if (match && !sentiment.drivers.includes(match[1])) {
      sentiment.drivers.push(match[1]);
    }
  });

  // Extract key risks
  const riskPatterns = [
    /risque[^.]*de ([^.]+)/i,
    /inquiétude[^.]*concernant ([^.]+)/i,
    /préoccupation[^.]*sur ([^.]+)/i
  ];

  riskPatterns.forEach(pattern => {
    const match = text.match(pattern);
    if (match && !sentiment.keyRisks.includes(match[1])) {
      sentiment.keyRisks.push(match[1]);
    }
  });
}