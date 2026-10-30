export interface Order {
  id: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  district: string;
  upazila: string;
  address: string;
  quantity: number;
  unitPrice: number;
  deliveryFee: number;
  totalAmount: number;
  paymentMethod: 'Cash on Delivery';
  deliveryInstructions?: string;
  status: 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled';
  utmParams?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
  };
}

export interface PixelEvent {
  id: string;
  timestamp: string;
  eventName: 'PageView' | 'ViewContent' | 'InitiateCheckout' | 'Purchase' | 'Lead';
  data: Record<string, unknown>;
}

export interface DistrictInfo {
  id: string;
  nameBn: string;
  nameEn: string;
  division: string;
  isDhaka: boolean;
}
