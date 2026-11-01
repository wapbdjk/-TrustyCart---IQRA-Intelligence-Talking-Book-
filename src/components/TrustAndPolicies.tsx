import React from 'react';
import { 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Headphones, 
  Star,
  Quote
} from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig.ts';

export const TrustAndPolicies: React.FC = () => {
  const hasRealPhone = STORE_CONFIG.helplinePhone && !STORE_CONFIG.helplinePhone.includes('[');

  return (
    <section className="py-12 sm:py-18 bg-[#FFFDF9] border-t border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* 4 Pillars of Parent Trust */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          
          {/* Pillar 1 */}
          <div className="p-6 rounded-2xl bg-white border border-amber-200 shadow-xs flex flex-col justify-between space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                ১০০% ক্যাশ অন ডেলিভারি
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                কোনো অগ্রিম পেমেন্টের ঝুঁকি নেই। পার্সেল হাতে পেয়ে নিজে চেক করে ডেলিভারিম্যানকে টাকা দিন।
              </p>
            </div>
            <div className="text-[11px] text-amber-700 font-semibold pt-2 border-t border-slate-100">
              নিরাপদ কেনাকাটা
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 rounded-2xl bg-white border border-emerald-200 shadow-xs flex flex-col justify-between space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-emerald-950">
                সারা দেশে ফ্রি ডেলিভারি
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                বাংলাদেশের ৬৪ জেলার যেকোনো থানা বা এলাকায় ডেলিভারি চার্জ সম্পূর্ণ ফ্রি (৳০)।
              </p>
            </div>
            <div className="text-[11px] text-emerald-700 font-semibold pt-2 border-t border-slate-100">
              ডেলিভারি ফি: ৳০
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 rounded-2xl bg-white border border-blue-200 shadow-xs flex flex-col justify-between space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                পার্সেল খুলে চেক করার সুযোগ
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                ডেলিভারিম্যানের সামনে প্যাকেট খুলে ভেতরের কম্বো আইটেমগুলো ঠিক আছে কিনা নিশ্চিত হয়ে টাকা দিন।
              </p>
            </div>
            <div className="text-[11px] text-blue-700 font-semibold pt-2 border-t border-slate-100">
              ১০০% নিশ্চিত যাচাই
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="p-6 rounded-2xl bg-white border border-purple-200 shadow-xs flex flex-col justify-between space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                সরাসরি কাস্টমার কেয়ার
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                পণ্য বা অর্ডার সংক্রান্ত যেকোনো তথ্যের জন্য সরাসরি কল বা হোয়াটসঅ্যাপ করুন:
                <span className="block mt-1 font-mono font-bold text-slate-800 text-xs">
                  {hasRealPhone ? STORE_CONFIG.helplinePhone : '[YOUR PHONE NUMBER]'}
                </span>
              </p>
            </div>
            <div className="text-[11px] text-purple-700 font-semibold pt-2 border-t border-slate-100">
              {STORE_CONFIG.supportHoursBn}
            </div>
          </div>

        </div>

        {/* Quality Commitment & Terms Banner */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50/60 rounded-3xl border-2 border-amber-300 p-6 sm:p-9 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-md aspect-4/3 border-2 border-amber-200 bg-white">
                <img
                  src={STORE_CONFIG.product.images.combo}
                  alt="IQRA Intelligence Talking Book 5-in-1 Combo Pack"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 shadow-xs border border-amber-200">
                  আসল ৫-ইন-১ কম্বো প্যাক
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>আমাদের ডেলিভারি ও গ্রাহক সেবা অঙ্গীকার</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                নিরাপদ কেনাকাটা ও ডেলিভারি নীতিমালা
              </h3>

              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>
                  আমরা প্রতিটি IQRA Intelligence Talking Book কম্বো প্যাক সম্পূর্ণ চেক করে ও সুরক্ষিত প্যাকেজিংয়ে কুরিয়ারে হস্তান্তর করি। গ্রাহকের শতভাগ আস্থার জন্য আমরা দিচ্ছি ক্যাশ অন ডেলিভারি এবং পার্সেল যাচাইয়ের সুযোগ।
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-white rounded-xl border border-amber-200 text-xs text-slate-800 space-y-1">
                    <span className="font-bold text-amber-800 block">✓ ১০০% ক্যাশ অন ডেলিভারি</span>
                    <span>কোনো অগ্রিম পেমেন্টের ঝুঁকি নেই। পার্সেল হাতে পেয়ে মূল্য পরিশোধ করুন।</span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-amber-200 text-xs text-slate-800 space-y-1">
                    <span className="font-bold text-amber-800 block">✓ পার্সেল চেক করে নেওয়ার সুযোগ</span>
                    <span>ডেলিভারিম্যানের সামনে প্যাকেট খুলে ভেতরের সব সামগ্রী দেখে নেওয়ার পূর্ণ স্বাধীনতা।</span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-600 bg-white/80 p-3 rounded-xl border border-amber-200 flex items-center gap-2">
                <Headphones className="w-4 h-4 text-amber-600 shrink-0" />
                <span>যেকোনো প্রশ্ন বা সহায়তার জন্য আমাদের সাথে যোগাযোগ করুন: <strong>{STORE_CONFIG.supportEmail}</strong></span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
