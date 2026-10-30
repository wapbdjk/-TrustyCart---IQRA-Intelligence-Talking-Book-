import { Order } from '../types.ts';

const LOCAL_STORAGE_ORDERS_KEY = 'trustycart_offline_orders';

export function toBengaliNumerals(num: number | string): string {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num
    .toString()
    .replace(/[0-9]/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
}

export function formatTaka(amount: number): string {
  return `৳${toBengaliNumerals(amount.toLocaleString('en-IN'))}`;
}

export class OrderService {
  /**
   * Submit an order to the backend API or local resilient storage
   */
  public async submitOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<{ success: boolean; order: Order; isLocalFallback?: boolean; message?: string }> {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const result = await response.json();
        return {
          success: true,
          order: result.order,
          isLocalFallback: false,
        };
      }
      
      throw new Error(`Server returned ${response.status}`);
    } catch (err) {
      console.warn('Backend server not responding, using local order vault fallback:', err);
      
      // Fallback for static Netlify deploys or when backend is unavailable
      const fallbackId = `TC-${Math.floor(100000 + Math.random() * 900000)}`;
      const fallbackOrder: Order = {
        ...orderData,
        id: fallbackId,
        createdAt: new Date().toISOString(),
        status: 'Pending',
      };

      this.saveLocalOrder(fallbackOrder);

      return {
        success: true,
        order: fallbackOrder,
        isLocalFallback: true,
        message: 'বিজ্ঞপ্তি: রিমোট ব্যাকএন্ড ডেটাবেজ কনফিগার করা না থাকায় অর্ডারটি এই ব্রাউজারের সুরক্ষিত লোকাল স্টোরেজে জমা হয়েছে। আপনি অ্যাডমিন প্যানেল থেকে CSV ডাউনলোড করতে পারবেন।',
      };
    }
  }

  /**
   * Fetch all orders from server or fallback
   */
  public async getOrders(): Promise<{ orders: Order[]; source: 'api' | 'local' }> {
    try {
      const response = await fetch('/api/orders');
      if (response.ok) {
        const data = await response.json();
        return { orders: data.orders, source: 'api' };
      }
    } catch {
      // ignore
    }

    // fallback
    return { orders: this.getLocalOrders(), source: 'local' };
  }

  /**
   * Update order status
   */
  public async updateOrderStatus(id: string, status: Order['status']): Promise<boolean> {
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (response.ok) return true;
    } catch {
      // ignore
    }

    // fallback
    const local = this.getLocalOrders();
    const target = local.find(o => o.id === id);
    if (target) {
      target.status = status;
      localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(local));
      return true;
    }
    return false;
  }

  /**
   * Delete order (for testing)
   */
  public async deleteOrder(id: string): Promise<boolean> {
    try {
      const response = await fetch(`/api/orders/${id}`, { method: 'DELETE' });
      if (response.ok) return true;
    } catch {
      // ignore
    }

    const local = this.getLocalOrders().filter(o => o.id !== id);
    localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(local));
    return true;
  }

  private getLocalOrders(): Order[] {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private saveLocalOrder(order: Order): void {
    const list = this.getLocalOrders();
    list.unshift(order);
    localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(list));
  }

  /**
   * Export orders as CSV formatted for Bangladesh couriers (Steadfast / RedX / Pathao)
   */
  public exportCourierCsv(orders: Order[]): void {
    if (orders.length === 0) {
      alert('এক্সপোর্ট করার মতো কোনো অর্ডার পাওয়া যায়নি।');
      return;
    }

    // Standard courier columns:
    // Invoice, Recipient Name, Recipient Phone, Recipient Address, Police Station, District, COD Amount, Note
    const headers = [
      'Invoice No',
      'Recipient Name',
      'Recipient Phone',
      'District',
      'Thana/Upazila',
      'Full Address',
      'COD Amount (BDT)',
      'Quantity',
      'Status',
      'Date',
      'Special Note',
      'UTM Source',
      'UTM Campaign'
    ];

    const rows = orders.map((o) => [
      `"${o.id}"`,
      `"${o.customerName.replace(/"/g, '""')}"`,
      `"${o.customerPhone}"`,
      `"${o.district}"`,
      `"${o.upazila.replace(/"/g, '""')}"`,
      `"${o.address.replace(/"/g, '""')}"`,
      o.totalAmount,
      o.quantity,
      `"${o.status}"`,
      `"${new Date(o.createdAt).toLocaleString('en-GB')}"`,
      `"${(o.deliveryInstructions || '').replace(/"/g, '""')}"`,
      `"${o.utmParams?.utm_source || 'direct'}"`,
      `"${o.utmParams?.utm_campaign || 'none'}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `TrustyCart_Orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export const orderService = new OrderService();
