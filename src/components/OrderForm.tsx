import React, { useState } from 'react';
import { 
  ShoppingBag, 
  User, 
  Phone, 
  FileText, 
  Plus, 
  Minus, 
  ShieldCheck, 
  AlertCircle, 
  Truck, 
  CheckCircle2, 
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
  // 3 Essential Billing Form Fields requested by user:
  // ১. আপনার নাম *
  // ২. মোবাইল নম্বর *
  // ৩. সম্পূর্ণ ডেলিভারি ঠিকানা *
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [quantity, setQuantity] = useState(1);

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasInitiatedCheckout, setHasInitiatedCheckout] = useState(false);

  // Pricing calculations: ৳999 per unit, ৳0 Delivery charge all over Bangladesh
  const unitPrice = STORE_CONFIG.product.currentPrice; // 999
  const deliveryFee = 0; // সারা বাংলাদেশে ফ্রি ডেলিভারি (৳০)
  const subtotal = unitPrice * quantity;
  const totalAmount = subtotal + deliveryFee;

  // Track InitiateCheckout on initial user focus/interaction
  const handleFormInteraction = () => {
    if (!hasInitiatedCheckout) {
      setHasInitiatedCheckout(true);
      pixelService.trackInitiateCheckout(totalAmount, quantity);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
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
    // Bangladeshi mobile format validation: 11 digits starting with 01[3-9]
    const bdRegex = /^01[3-9]\d{8}$/;
    if (!bdRegex.test(cleanPhone)) {
      setErrorMessage('সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 01XXXXXXXXX)।');
      return false;
    }

    if (!address.trim() || address.trim().length < 5) {
      setErrorMessage('অনুগ্রহ করে আপনার সম্পূর্ণ ডেলিভারি ঠিকানা (জেলা, থানা, বাসা/রোড/এলাকা) লিখুন।');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        // Log warning but proceed with order processing
        console.warn('Netlify form submission note:', netErr);
      }

      // 2. Process order locally & via internal backend for instant order tracking
      const result = await orderService.submitOrder(orderPayload);

      if (result.success && result.order) {
        // Track verified Purchase event on Meta Pixel
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
    } catch (err: any) {
      setErrorMessage('সার্ভার রেসপন্স করছে না। দয়া করে কিছুক্ষণ পর আবার চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasRealPhone = STORE_CONFIG.helplinePhone && !STORE_CONFIG.helplinePhone.includes('[');

  return (
    <section id="order-section" className="py-12 sm:py-18 bg-white border-t border-amber-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
            <ShoppingBag className="w-3.5 h-3.5 text-emerald-700" />
            <span>সারা বাংলাদেশে ফ্রি হোম ডেলিভারি · ক্যাশ অন ডেলিভারি</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight text-balance">
            অর্ডার করতে নিচের তথ্যগুলো পূরণ করুন
          </h2>
          <p className="text-sm text-slate-600">
            অগ্রিম কোনো টাকা দিতে হবে না! পার্সেল হাতে পেয়ে ডেলিভারিম্যানের সামনে দেখে মূল্য পরিশোধ করবেন।
          </p>
        </div>

        {/* Main Order Card */}
        <div className="bg-[#FFFDF9] rounded-3xl border-2 border-amber-300 shadow-xl overflow-hidden">
          
          <div className="p-6 sm:p-9" onFocus={handleFormInteraction} onClick={handleFormInteraction}>
            <form 
              name="orders" 
              method="POST" 
              data-netlify="true" 
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit} 
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
              
              {/* Error Notice */}
              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3 animate-fade-in">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
                  <span className="font-medium">{errorMessage}</span>
                </div>
              )}

              {/* Billing Details Fields - Only 3 Fields: Name, Phone, Address */}
              <div className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Customer Name */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-slate-800">
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
                        className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 rounded-xl text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 shadow-xs"
                      />
                    </div>
                  </div>

                  {/* Mobile Phone Number */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-slate-800">
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
                        className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 rounded-xl text-sm text-slate-900 outline-none transition-all font-ui placeholder:text-slate-400 shadow-xs"
                      />
                    </div>
                    <span className="text-[11px] text-slate-500">
                      ডেলিভারির পূর্বে এই নম্বরে কল করে কনফার্ম করা হবে
                    </span>
                  </div>
                </div>

                {/* Full Address */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-slate-800">
                    সম্পূর্ণ ডেলিভারি ঠিকানা <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FileText className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                    <textarea
                      rows={2}
                      name="address"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="জেলা, থানা/উপজেলা, রোড নং, বাসা নং বা এলাকার নাম বিস্তারিত লিখুন"
                      className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 rounded-xl text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 resize-none shadow-xs"
                    />
                  </div>
                  <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>সারা বাংলাদেশে হোম ডেলিভারি সম্পূর্ণ ফ্রি</span>
                  </span>
                </div>

              </div>

              {/* Quantity Selector: ৳999 per unit */}
              <div className="p-4 rounded-2xl bg-white border border-amber-200 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="block text-sm font-bold text-slate-900">
                    পণ্যের পরিমাণ (Quantity)
                  </span>
                  <span className="text-xs text-slate-500">
                    প্রতি সেট মূল্য: {formatTaka(unitPrice)} (ফ্রি ডেলিভারি)
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  
                  <span className="text-lg font-bold text-slate-900 font-ui tabular-nums min-w-8 text-center">
                    {toBengaliNumerals(quantity)} টি
                  </span>

                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= 10}
                    className="w-9 h-9 rounded-lg bg-amber-100 hover:bg-amber-200 flex items-center justify-center text-amber-800 transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Order Summary Box: ৳999 per unit, Delivery ৳0 */}
              <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2.5 text-sm">
                <div className="flex items-center justify-between text-slate-700">
                  <span>IQRA টকিং বুক ({toBengaliNumerals(quantity)} টি x {formatTaka(unitPrice)}):</span>
                  <span className="font-semibold text-slate-900 font-ui tabular-nums">
                    {formatTaka(subtotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-700">
                  <span className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                    <Truck className="w-4 h-4 text-emerald-600" />
                    <span>ডেলিভারি চার্জ (সারা বাংলাদেশ):</span>
                  </span>
                  <span className="font-bold text-emerald-700 font-ui">
                    ফ্রি (৳০)
                  </span>
                </div>

                <div className="pt-2 border-t border-amber-200 flex items-center justify-between text-base sm:text-lg font-bold text-slate-900">
                  <span>সর্বমোট প্রদেয় টাকা:</span>
                  <span className="text-2xl font-black text-amber-700 font-ui tabular-nums">
                    {formatTaka(totalAmount)}
                  </span>
                </div>

                <div className="space-y-1.5 pt-1 text-[12px]">
                  <div className="text-emerald-800 font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>পেমেন্ট: ক্যাশ অন ডেলিভারি (পার্সেল দেখে ডেলিভারিম্যানকে টাকা দিন)</span>
                  </div>
                  <div className="text-blue-800 font-medium flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>সুবিধা: টাইপ-সি রিচার্জেবল সিস্টেম (কোনো ব্যাটারি লাগে না) ও ৫-ইন-১ কম্বো</span>
                  </div>
                </div>
              </div>

              {/* Mandatory Submit Button with exact text */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-4 px-8 rounded-xl text-lg font-bold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 active:scale-[0.99] shadow-lg hover:shadow-xl transition-all cursor-pointer disabled:opacity-75"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>অর্ডার প্রক্রিয়াধীন রয়েছে...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-6 h-6" />
                    <span>অর্ডার কনফার্ম করুন (সর্বমোট: {formatTaka(totalAmount)})</span>
                  </>
                )}
              </button>

              <div className="text-center text-xs text-slate-500 space-y-1">
                <p>🔒 আপনার মোবাইল ও ঠিকানার গোপনীয়তা শতভাগ সুরক্ষিত।</p>
                <p>
                  হেল্পলাইন ও কাস্টমার সাপোর্ট:{' '}
                  {hasRealPhone ? (
                    <a href={`tel:${STORE_CONFIG.helplinePhone}`} className="font-bold text-amber-700 hover:underline">
                      {STORE_CONFIG.helplinePhone}
                    </a>
                  ) : (
                    <span className="font-mono font-semibold text-slate-600">[YOUR PHONE NUMBER]</span>
                  )}
                </p>
              </div>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
