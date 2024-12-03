import { NewsItem } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

export function formatNewsContext(news: NewsItem[]): string {
  if (!news.length) {
    return 'Aucune actualité récente disponible.';
  }

  // Trier les actualités par date
  const sortedNews = [...news].sort((a, b) => 
    new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );

  // Prendre les 5 actualités les plus récentes
  const recentNews = sortedNews.slice(0, 5);

  return `Dernières actualités du marché:

${recentNews.map(item => `• ${formatDistanceToNow(new Date(item.pubDate), { 
    addSuffix: true, 
    locale: fr 
  })}:
  ${item.title}
  ${item.description}
`).join('\n')}

Ces actualités doivent être prises en compte dans l'analyse.`;
}