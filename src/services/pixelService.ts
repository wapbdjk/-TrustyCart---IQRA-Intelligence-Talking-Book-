/**
 * Meta Pixel & UTM Analytics Service
 * 
 * Supports compliant Facebook Pixel event tracking:
 * - PageView
 * - ViewContent
 * - InitiateCheckout
 * - Purchase (Only upon verified server order confirmation)
 * - UTM Campaign Parameter preservation across user session
 */

import { PixelEvent } from '../types.ts';
import { STORE_CONFIG } from '../config/storeConfig.ts';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

const PIXEL_STORAGE_KEY = 'trustycart_pixel_id';
const UTM_STORAGE_KEY = 'trustycart_utm_params';
const PIXEL_LOGS_KEY = 'trustycart_pixel_event_logs';

class PixelService {
  private pixelId: string = '';
  private isInitialized: boolean = false;
  private eventLogs: PixelEvent[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      // 1. Capture UTM params from URL
      this.captureUtmParams();
      
      // 2. Load stored Pixel ID or config default
      const savedId = localStorage.getItem(PIXEL_STORAGE_KEY);
      this.pixelId = savedId || STORE_CONFIG.metaPixel.defaultPixelId || '';
      
      // 3. Load past event logs for debugger
      try {
        const storedLogs = sessionStorage.getItem(PIXEL_LOGS_KEY);
        if (storedLogs) {
          this.eventLogs = JSON.parse(storedLogs);
        }
      } catch (e) {
        console.warn('Failed to parse pixel logs', e);
      }

      if (this.pixelId) {
        this.initializePixel(this.pixelId);
      }
    }
  }

  /**
   * Capture UTM tags from query string and cache in sessionStorage
   */
  private captureUtmParams(): void {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;
      
      const foundUtms: Record<string, string> = {};
      let hasUtm = false;

      utmKeys.forEach((key) => {
        const val = urlParams.get(key);
        if (val) {
          foundUtms[key] = val;
          hasUtm = true;
        }
      });

      if (hasUtm) {
        sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(foundUtms));
      }
    } catch (e) {
      console.warn('Could not parse UTM parameters', e);
    }
  }

  /**
   * Get cached UTM parameters for order submission
   */
  public getStoredUtms(): Record<string, string> {
    try {
      const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }

  /**
   * Get active Pixel ID
   */
  public getPixelId(): string {
    return this.pixelId;
  }

  /**
   * Update and save Pixel ID
   */
  public setPixelId(newId: string): void {
    this.pixelId = newId.trim();
    if (typeof window !== 'undefined') {
      if (this.pixelId) {
        localStorage.setItem(PIXEL_STORAGE_KEY, this.pixelId);
        this.initializePixel(this.pixelId);
      } else {
        localStorage.removeItem(PIXEL_STORAGE_KEY);
        this.isInitialized = false;
      }
    }
  }

  /**
   * Initialize standard Meta Pixel snippet dynamically
   */
  public initializePixel(pixelId: string): void {
    if (typeof window === 'undefined' || !pixelId) return;

    if (!window.fbq) {
      const n: any = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!window._fbq) window._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [];
      window.fbq = n;

      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      const firstScript = document.getElementsByTagName('script')[0];
      firstScript?.parentNode?.insertBefore(script, firstScript);
    }

    try {
      window.fbq?.('init', pixelId);
      this.isInitialized = true;
      this.trackPageView();
    } catch (err) {
      console.warn('Meta Pixel Init notice:', err);
    }
  }

  private logEvent(eventName: PixelEvent['eventName'], data: Record<string, unknown>): void {
    const logItem: PixelEvent = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toLocaleTimeString('bn-BD', { hour12: true }),
      eventName,
      data
    };
    this.eventLogs.unshift(logItem);
    if (this.eventLogs.length > 30) this.eventLogs.pop();
    
    try {
      sessionStorage.setItem(PIXEL_LOGS_KEY, JSON.stringify(this.eventLogs));
    } catch {
      // ignore
    }
  }

  public getLogs(): PixelEvent[] {
    return [...this.eventLogs];
  }

  public clearLogs(): void {
    this.eventLogs = [];
    sessionStorage.removeItem(PIXEL_LOGS_KEY);
  }

  /**
   * Standard Event: PageView
   */
  public trackPageView(): void {
    this.logEvent('PageView', { path: window.location.pathname });
    if (window.fbq && this.pixelId) {
      window.fbq('track', 'PageView');
    }
  }

  /**
   * Standard Event: ViewContent
   */
  public trackViewContent(productName: string, price: number): void {
    const data = {
      content_name: productName,
      content_type: 'product',
      value: price,
      currency: 'BDT'
    };
    this.logEvent('ViewContent', data);
    if (window.fbq && this.pixelId) {
      window.fbq('track', 'ViewContent', data);
    }
  }

  /**
   * Standard Event: InitiateCheckout
   */
  public trackInitiateCheckout(totalAmount: number, quantity: number): void {
    const data = {
      content_name: STORE_CONFIG.product.nameEn,
      num_items: quantity,
      value: totalAmount,
      currency: 'BDT'
    };
    this.logEvent('InitiateCheckout', data);
    if (window.fbq && this.pixelId) {
      window.fbq('track', 'InitiateCheckout', data);
    }
  }

  /**
   * Standard Event: Purchase (Strictly upon verified server confirmation)
   */
  public trackPurchase(orderId: string, totalAmount: number, quantity: number): void {
    const data = {
      content_name: STORE_CONFIG.product.nameEn,
      content_ids: [orderId],
      content_type: 'product',
      value: totalAmount,
      currency: 'BDT',
      num_items: quantity
    };
    this.logEvent('Purchase', data);
    if (window.fbq && this.pixelId) {
      window.fbq('track', 'Purchase', data);
    }
  }
}

export const pixelService = new PixelService();
