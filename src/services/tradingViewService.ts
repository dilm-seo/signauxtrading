import { TradingViewData, ChartData } from '../types/trading';

export class TradingViewService {
  private static instance: TradingViewService;
  private socket: WebSocket | null = null;
  private subscribers: ((data: ChartData[]) => void)[] = [];

  private constructor() {
    this.initializeWebSocket();
  }

  static getInstance(): TradingViewService {
    if (!TradingViewService.instance) {
      TradingViewService.instance = new TradingViewService();
    }
    return TradingViewService.instance;
  }

  private initializeWebSocket() {
    // Initialize WebSocket connection when TradingView plugin is ready
    window.addEventListener('TradingViewLoaded', () => {
      this.connectWebSocket();
    });
  }

  private connectWebSocket() {
    if (this.socket?.readyState === WebSocket.OPEN) return;

    this.socket = new WebSocket('ws://localhost:8080/tradingview');

    this.socket.onmessage = (event) => {
      try {
        const data: TradingViewData = JSON.parse(event.data);
        this.notifySubscribers(data.data);
      } catch (error) {
        console.error('Error parsing TradingView data:', error);
      }
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.socket.onclose = () => {
      setTimeout(() => this.connectWebSocket(), 5000);
    };
  }

  subscribe(callback: (data: ChartData[]) => void) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  private notifySubscribers(data: ChartData[]) {
    this.subscribers.forEach(callback => callback(data));
  }

  changeSymbol(symbol: string) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type: 'CHANGE_SYMBOL', symbol }));
    }
  }

  changeTimeframe(timeframe: string) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type: 'CHANGE_TIMEFRAME', timeframe }));
    }
  }
}