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
                ১ বছরের অফিসিয়াল ওয়ারেন্টি
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                পণ্য গ্রহণের পর ১ বছরের মধ্যে কোনো অভ্যন্তরীণ ত্রুটি বা চার্জিং সমস্যা দেখা দিলে সম্পূর্ণ রিপ্লেসমেন্ট সুবিধা।
              </p>
            </div>
            <div className="text-[11px] text-blue-700 font-semibold pt-2 border-t border-slate-100">
              ১০০% রিপ্লেসমেন্ট নিশ্চয়তা
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
                পণ্য বা অর্ডার সংক্রান্ত সহায়তায় আমাদের হেল্পলাইনে সরাসরি কল বা হোয়াটসঅ্যাপ করুন:
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

        {/* 1-Year Official Warranty & Quality Commitment Banner */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50/60 rounded-3xl border-2 border-amber-300 p-6 sm:p-9 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-md aspect-4/3 border-2 border-amber-200">
                <img
                  src={STORE_CONFIG.product.images.lifestyle}
                  alt="IQRA Intelligence Talking Book নিয়ে শিশুর আনন্দময় শিক্ষা"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 shadow-xs border border-amber-200">
                  সন্তানের আনন্দময় শিক্ষা ও পরিবারের সময়
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>ট্রাস্টি কার্ট কোয়ালিটি নিশ্চয়তা (Official Warranty Guarantee)</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                ১ বছরের রিপ্লেসমেন্ট ওয়ারেন্টি পলিসি
              </h3>

              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>
                  আমরা প্রতিটি IQRA Intelligence Talking Book নিখুঁতভাবে চেক করে এবং চার্জিং সিস্টেম পরীক্ষা করে কুরিয়ারে হস্তান্তর করি। এর পরেও গ্রাহকের শতভাগ মানসিক শান্তির জন্য দিচ্ছি <strong>১ বছরের অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি</strong>।
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-white rounded-xl border border-amber-200 text-xs text-slate-800 space-y-1">
                    <span className="font-bold text-amber-800 block">✓ পার্সেল চেক করে গ্রহণের সুযোগ</span>
                    <span>ডেলিভারিম্যানের সামনে প্যাকেট খুলে চেক করে দেখার পূর্ণ অধিকার রয়েছে।</span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-amber-200 text-xs text-slate-800 space-y-1">
                    <span className="font-bold text-amber-800 block">✓ ১ বছরের ফ্রি রিপ্লেসমেন্ট</span>
                    <span>স্বাভাবিক ব্যবহারে কোনো যান্ত্রিক বা চার্জিং সমস্যা হলে দ্রুত রিপ্লেসমেন্ট সেবা।</span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-600 bg-white/80 p-3 rounded-xl border border-amber-200 flex items-center gap-2">
                <Headphones className="w-4 h-4 text-amber-600 shrink-0" />
                <span>ওয়ারেন্টি বা সহায়তার জন্য আমাদের হেল্পলাইন <strong>{STORE_CONFIG.helplinePhone}</strong> নম্বরে কল করুন।</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
