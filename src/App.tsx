import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Settings } from './types';
import { SettingsPanel } from './components/SettingsPanel';
import { NewsFeed } from './components/NewsFeed';
import { CurrencyStrengthChart } from './components/CurrencyStrengthChart';
import { CorrelationTable } from './components/CorrelationTable';
import { FloatingChatBot } from './components/FloatingChatBot';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { Preloader } from './components/Preloader';
import { CostPopup } from './components/CostPopup';
import { AnalysisProgress } from './components/AnalysisProgress';
import { TradingSessions } from './components/TradingSessions';
import { CalendarButton } from './components/CalendarButton';
import { EconomicCalendar } from './components/EconomicCalendar';
import { MarketTickers } from './components/MarketTickers';
import { TradingViewChart } from './components/TradingViewChart';
import { fetchForexNews, analyzeNews } from './services/api';
import { AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useOpenAICost } from './hooks/useOpenAICost';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useLocalStorage<Settings>('forex-settings', {
    apiKey: '',
    model: 'gpt-4-turbo-preview',
  });
  const [autoAnalyze, setAutoAnalyze] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { currentCost, isPopupVisible, trackCost, hidePopup } = useOpenAICost();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const { 
    data: news = [], 
    isLoading: isLoadingNews, 
    error: newsError,
    refetch: refetchNews
  } = useQuery(
    'forexNews',
    fetchForexNews,
    { 
      refetchInterval: autoAnalyze ? 300000 : false,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      onError: (error) => console.error('Error fetching news:', error)
    }
  );

  const { 
    data: analysis, 
    isLoading: isLoadingAnalysis,
    error: analysisError,
    refetch: analyzeNewsData
  } = useQuery(
    ['analysis', news, settings],
    () => analyzeNews(news, settings),
    { 
      enabled: false,
      retry: 2,
      retryDelay: 1000,
      onSuccess: (data) => {
        const outputTokens = JSON.stringify(data).length / 4;
        trackCost(JSON.stringify(news), outputTokens, settings.model);
      },
      onError: (error) => console.error('Error analyzing news:', error)
    }
  );

  const error = newsError || analysisError;
  const isContentLoading = isLoadingNews || isLoadingAnalysis;

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />
      <Hero />
      
      <main className="relative">
        <TradingSessions />
        <MarketTickers />
        
        <div className="max-w-8xl mx-auto px-4 py-8 space-y-8">
          {error && (
            <div className="glass-panel p-4 mb-8 border-red-500/30">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-400 mt-0.5" />
                <div>
                  <p className="text-red-200">
                    {error instanceof Error ? error.message : 'Une erreur est survenue'}
                  </p>
                  <button
                    onClick={() => refetchNews()}
                    className="mt-2 text-sm text-red-400 hover:text-red-300"
                  >
                    Réessayer
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3 space-y-8">
              <div className="gradient-border animate-glow">
                <SettingsPanel
                  settings={settings}
                  onSettingsChange={setSettings}
                  autoAnalyze={autoAnalyze}
                  onAutoAnalyzeChange={setAutoAnalyze}
                />
              </div>

              <div className="glass-panel p-4">
                <button
                  onClick={() => analyzeNewsData()}
                  disabled={isLoadingAnalysis || !settings.apiKey}
                  className="glass-button w-full flex items-center justify-center gap-2"
                >
                  {isLoadingAnalysis ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                  Analyser maintenant
                </button>
              </div>

              {analysis?.strengths && (
                <div className="glass-panel p-6">
                  <CurrencyStrengthChart
                    strengths={analysis.strengths}
                  />
                </div>
              )}
            </div>

            <div className="lg:col-span-9 space-y-8">
              <TradingViewChart />

              {isContentLoading ? (
                <div className="flex items-center justify-center h-64">
                  <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                </div>
              ) : (
                <>
                  <div className="glass-panel p-6">
                    <NewsFeed
                      news={news}
                      isLoading={isLoadingNews}
                    />
                  </div>
                  
                  {analysis?.correlations && (
                    <div className="glass-panel p-6">
                      <CorrelationTable
                        correlations={analysis.correlations}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <FloatingChatBot settings={settings} news={news} />
      <CalendarButton onClick={() => setIsCalendarOpen(true)} />
      <EconomicCalendar 
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
      />
      <CostPopup
        cost={currentCost}
        isVisible={isPopupVisible}
        onClose={hidePopup}
      />
      <AnalysisProgress isVisible={isLoadingAnalysis} />
    </div>
  );
}

export default App;