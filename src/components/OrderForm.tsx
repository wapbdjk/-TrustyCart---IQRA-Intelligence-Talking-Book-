import React, { useState } from 'react';
import { 
  ShoppingBag, 
  User, 
  Phone, 
  MapPin, 
  Plus, 
  Minus, 
  ShieldCheck, 
  AlertCircle, 
  Truck, 
  Loader2, 
  Check 
} from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig.ts';
import { Order } from '../types.ts';
import { orderService, formatTaka, toBengaliNumerals } from '../services/orderService.ts';
import { pixelService } from '../services/pixelService.ts';

interface OrderFormProps {
  onOrderSuccess: (order: Order, isLocalFallback?: boolean) => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({ onOrderSuccess }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasInitiatedCheckout, setHasInitiatedCheckout] = useState(false);

  // Pricing calculations: ৳999 per unit, ৳0 Delivery charge
  const unitPrice = STORE_CONFIG.product.currentPrice;
  const deliveryFee = 0; // সারা বাংলাদেশে ফ্রি ডেলিভারি (৳০)
  const subtotal = unitPrice * quantity;
  const totalAmount = subtotal + deliveryFee;

  // Track InitiateCheckout only once upon first form focus
  const handleFormInteraction = () => {
    if (!hasInitiatedCheckout) {
      setHasInitiatedCheckout(true);
      pixelService.trackInitiateCheckout(totalAmount, quantity);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomerPhone(val);
  };

  const validate = (): boolean => {
    setErrorMessage(null);

    if (!customerName.trim() || customerName.trim().length < 2) {
      setErrorMessage('অনুগ্রহ করে আপনার পুরো নাম লিখুন।');
      return false;
    }

    const cleanPhone = customerPhone.trim();
    // 11 digits starting with 01
    const bdRegex = /^01[3-9]\d{8}$/;
    if (!bdRegex.test(cleanPhone)) {
      setErrorMessage('সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 01XXXXXXXXX)।');
      return false;
    }

    if (!address.trim() || address.trim().length < 5) {
      setErrorMessage('অনুগ্রহ করে আপনার সম্পূর্ণ ডেলিভারি ঠিকানা (জেলা, থানা ও এলাকা) লিখুন।');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent accidental duplicate submissions
    if (!validate()) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const storedUtms = pixelService.getStoredUtms();

      const orderPayload = {
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        district: 'সারা বাংলাদেশ',
        upazila: '',
        address: address.trim(),
        quantity,
        unitPrice,
        deliveryFee: 0,
        totalAmount,
        paymentMethod: 'Cash on Delivery' as const,
        deliveryInstructions: '',
        utmParams: storedUtms,
      };

      // 1. Send submission to Netlify Forms (x-www-form-urlencoded)
      try {
        const netlifyData = new URLSearchParams();
        netlifyData.append('form-name', 'orders');
        netlifyData.append('customerName', customerName.trim());
        netlifyData.append('customerPhone', customerPhone.trim());
        netlifyData.append('address', address.trim());
        netlifyData.append('quantity', String(quantity));
        netlifyData.append('deliveryFee', 'ফ্রি (৳০)');
        netlifyData.append('totalAmount', `৳${totalAmount}`);
        netlifyData.append('paymentMethod', 'Cash on Delivery');
        netlifyData.append('package', '৫-ইন-১ সম্পূর্ণ কম্বো অফার');

        await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: netlifyData.toString(),
        });
      } catch (netErr) {
        console.warn('Netlify form submission note:', netErr);
      }

      // 2. Process order locally & via internal backend for instant order tracking
      const result = await orderService.submitOrder(orderPayload);

      if (result.success && result.order) {
        // Track verified Purchase event on Meta Pixel ONLY upon successful server confirmation
        pixelService.trackPurchase(result.order.id, result.order.totalAmount, result.order.quantity);

        // Reset form
        setCustomerName('');
        setCustomerPhone('');
        setAddress('');
        setQuantity(1);

        onOrderSuccess(result.order, result.isLocalFallback);
      } else {
        setErrorMessage(result.message || 'অর্ডার সাবমিট করতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।');
      }
    } catch {
      setErrorMessage('সার্ভার রেসপন্স করছে না। দয়া করে কিছুক্ষণ পর আবার চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasRealPhone = STORE_CONFIG.helplinePhone && !STORE_CONFIG.helplinePhone.includes('[');

  return (
    <section id="order-section" className="py-12 sm:py-16 bg-white border-b border-slate-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
            সহজ ক্যাশ অন ডেলিভারি
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight text-balance">
            অর্ডার করতে নিচের তথ্যগুলো দিন
          </h2>
          <p className="text-sm text-slate-600">
            কোনো অগ্রিম টাকা দিতে হবে না। পার্সেল হাতে পেয়ে ডেলিভারিম্যানকে দেখে টাকা পরিশোধ করবেন।
          </p>
        </div>

        {/* Order Form Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-8">
          
          <form 
            name="orders" 
            method="POST" 
            data-netlify="true" 
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit} 
            onFocus={handleFormInteraction}
            className="space-y-5"
          >
            {/* Netlify Forms Hidden Inputs */}
            <input type="hidden" name="form-name" value="orders" />
            <input type="hidden" name="quantity" value={quantity} />
            <input type="hidden" name="totalAmount" value={`৳${totalAmount}`} />
            <input type="hidden" name="paymentMethod" value="Cash on Delivery" />
            <input type="hidden" name="package" value="৫-ইন-১ সম্পূর্ণ কম্বো অফার" />
            <div className="hidden" aria-hidden="true">
              <label>Don’t fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
            </div>
            
            {/* Error Message */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
                <span className="font-medium">{errorMessage}</span>
              </div>
            )}

            {/* Field 1: Customer Name */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-800">
                আপনার নাম <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="customerName"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="যেমন: মোঃ আরিফুল ইসলাম"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 rounded-xl text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Field 2: Mobile Number */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-800">
                মোবাইল নম্বর <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  name="customerPhone"
                  required
                  maxLength={11}
                  value={customerPhone}
                  onChange={handlePhoneChange}
                  placeholder="যেমন: 01XXXXXXXXX (১১ ডিজিট)"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 rounded-xl text-sm text-slate-900 outline-none transition-all font-ui placeholder:text-slate-400"
                />
              </div>
              <span className="text-[11px] text-slate-500 block">
                ডেলিভারির পূর্বে এই নম্বরে কল করে কনফার্ম করা হবে
              </span>
            </div>

            {/* Field 3: Full Delivery Address */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-800">
                সম্পূর্ণ ডেলিভারি ঠিকানা <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                <textarea
                  rows={2}
                  name="address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="জেলা, থানা/উপজেলা, রোড নং, বাসা নং বা এলাকার নাম বিস্তারিত লিখুন"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 rounded-xl text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 resize-none"
                />
              </div>
            </div>

            {/* Field 4: Quantity */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
              <div>
                <span className="block text-sm font-bold text-slate-900">
                  পরিমাণ (Quantity)
                </span>
                <span className="text-xs text-slate-500">
                  প্রতি সেট: {formatTaka(unitPrice)} (ফ্রি ডেলিভারি)
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-40 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                
                <span className="text-base font-bold text-slate-900 font-ui tabular-nums min-w-8 text-center">
                  {toBengaliNumerals(quantity)} টি
                </span>

                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= 10}
                  className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 hover:bg-blue-100 flex items-center justify-center text-blue-700 transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Field 5: Order Total Summary */}
            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 space-y-2 text-sm">
              <div className="flex items-center justify-between text-slate-700 text-xs sm:text-sm">
                <span>পণ্যের মূল্য ({toBengaliNumerals(quantity)} সেট):</span>
                <span className="font-semibold text-slate-900 font-ui tabular-nums">
                  {formatTaka(subtotal)}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-700 text-xs sm:text-sm">
                <span className="flex items-center gap-1.5 text-emerald-800 font-medium">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span>ডেলিভারি চার্জ:</span>
                </span>
                <span className="font-bold text-emerald-700">
                  সম্পূর্ণ ফ্রি (৳০)
                </span>
              </div>

              <div className="pt-2 border-t border-blue-200/60 flex items-center justify-between font-bold text-slate-900">
                <span className="text-sm sm:text-base">সর্বমোট প্রদেয় টাকা:</span>
                <span className="text-xl sm:text-2xl font-black text-blue-700 font-ui tabular-nums">
                  {formatTaka(totalAmount)}
                </span>
              </div>

              <div className="text-[11px] text-slate-600 flex items-center gap-1.5 pt-0.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>পেমেন্ট মাধ্যম: ক্যাশ অন ডেলিভারি (পার্সেল দেখে ডেলিভারিম্যানকে টাকা দিন)</span>
              </div>
            </div>

            {/* Field 6: Confirm Order button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl text-base font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.99] shadow-sm transition-all cursor-pointer disabled:opacity-75"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>অর্ডার প্রক্রিয়াধীন...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5 text-amber-300" />
                  <span>অর্ডার কনফার্ম করুন (সর্বমোট: {formatTaka(totalAmount)})</span>
                </>
              )}
            </button>

            <div className="text-center text-xs text-slate-500 pt-1">
              <span>🔒 আপনার তথ্য সম্পূর্ণ সুরক্ষিত থাকবে। হেল্পলাইন: </span>
              {hasRealPhone ? (
                <a href={`tel:${STORE_CONFIG.helplinePhone}`} className="font-semibold text-blue-700 hover:underline">
                  {STORE_CONFIG.helplinePhone}
                </a>
              ) : (
                <span className="font-mono text-slate-600">[YOUR PHONE NUMBER]</span>
              )}
            </div>

          </form>

        </div>

      </div>
    </section>
  );
};
