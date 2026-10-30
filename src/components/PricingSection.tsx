import React from 'react';
import { Tag, Truck, ShieldCheck, ArrowDown, Check } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig.ts';
import { formatTaka } from '../services/orderService.ts';

interface PricingSectionProps {
  onScrollToOrder: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onScrollToOrder }) => {
  const regular = STORE_CONFIG.product.regularPrice;
  const current = STORE_CONFIG.product.currentPrice;
  const savings = regular - current;

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-[#FFFDF9] via-amber-50/40 to-[#FFFDF9] border-t border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold">
            <Tag className="w-3.5 h-3.5 text-emerald-700" />
            <span>স্বচ্ছ ও সুনির্দিষ্ট মূল্যতালিকা</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight text-balance">
            আসল পণ্যের সঠিক দাম ও অফার
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            কোনো লুকায়িত চার্জ নেই। পণ্য হাতে পেয়ে চেক করে সম্পূর্ণ ক্যাশ অন ডেলিভারিতে মূল্য পরিশোধ করুন।
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-xl mx-auto bg-white rounded-3xl border-2 border-amber-300 shadow-xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
          
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-amber-100">
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                {STORE_CONFIG.product.nameEn}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                {STORE_CONFIG.product.nameBn}
              </h3>
            </div>
            <div className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              সাশ্রয় {formatTaka(savings)}
            </div>
          </div>

          {/* Big Price Display: ৳999 */}
          <div className="flex items-baseline justify-between py-2">
            <div>
              <span className="text-xs text-slate-500 block mb-1">বর্তমান বিক্রয় মূল্য:</span>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl sm:text-5xl font-black text-amber-600 font-ui tabular-nums tracking-tight">
                  {formatTaka(current)}
                </span>
                <span className="text-lg text-slate-400 line-through font-ui tabular-nums">
                  {formatTaka(regular)}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-md">
                সারা দেশে ফ্রি ডেলিভারি
              </span>
            </div>
          </div>

          {/* Delivery Charges Breakdown: ৳0 Free Delivery */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2.5 text-xs sm:text-sm">
            <div className="font-bold text-emerald-950 flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-emerald-700" />
              <span>ডেলিভারি চার্জ বিবরণী:</span>
            </div>
            
            <div className="flex justify-between items-center text-slate-700 pt-1">
              <span>ঢাকার ভেতরের ডেলিভারি চার্জ:</span>
              <span className="font-bold text-emerald-800 font-ui">
                ফ্রি (৳০)
              </span>
            </div>

            <div className="flex justify-between items-center text-slate-700">
              <span>ঢাকার বাইরের সকল জেলার ডেলিভারি চার্জ:</span>
              <span className="font-bold text-emerald-800 font-ui">
                ফ্রি (৳০)
              </span>
            </div>

            <div className="flex justify-between items-center text-slate-700">
              <span>অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি:</span>
              <span className="font-bold text-blue-700 font-ui">
                ১ বছর (১২ মাস)
              </span>
            </div>

            <div className="pt-2 border-t border-emerald-200/80 text-[11px] text-emerald-900 font-medium flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>৬৪ পৃষ্ঠার বিশাল বই, ১০০+ কনটেন্ট ও টাইপ-সি ক্যাবল সহ সম্পূর্ণ ফ্রি ডেলিভারি।</span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={onScrollToOrder}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-md hover:shadow-lg transition-all active:scale-[0.99] cursor-pointer"
          >
            <span>অর্ডার করতে নিচে যান (৳৯৯৯ BDT)</span>
            <ArrowDown className="w-5 h-5" />
          </button>

          {/* COD Notice & Warranty */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs text-slate-600 text-center">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>১০০% ক্যাশ অন ডেলিভারি</span>
            </span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5 text-blue-800 font-semibold">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>১ বছরের অফিসিয়াল ওয়ারেন্টি</span>
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
