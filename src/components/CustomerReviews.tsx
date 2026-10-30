import React from 'react';
import { 
  Star, 
  CheckCircle2, 
  ShieldCheck, 
  Quote, 
  MessageSquare,
  Sparkles,
  MapPin,
  Clock
} from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig.ts';

export const CustomerReviews: React.FC = () => {
  const reviews = STORE_CONFIG.product.customerReviews;

  return (
    <section id="reviews" className="py-14 sm:py-20 bg-[#FFFDF9] border-t border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>অভিভাবকদের মতামত ও অভিজ্ঞতা (Customer Reviews)</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight text-balance">
            আমাদের সন্তুষ্ট অভিভাবকদের বাস্তব অভিজ্ঞতা
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            দেখুন কীভাবে IQRA Intelligence Talking Book শিশুদের মোবাইল আসক্তি কমিয়ে বর্ণ ও শব্দ শিক্ষার এক নতুন আনন্দের জগৎ তৈরি করেছে।
          </p>
        </div>

        {/* Aggregate Ratings & 1-Year Warranty Trust Banner */}
        <div className="bg-white rounded-3xl border-2 border-amber-300 p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-amber-100 items-center">
            
            {/* Aggregate Score */}
            <div className="text-center md:text-left space-y-1 md:pr-4">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-4xl sm:text-5xl font-black text-amber-600 font-ui">
                  ৪.৯
                </span>
                <span className="text-sm text-slate-500 font-bold">/ ৫.০</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-600 font-medium pt-1">
                ৪৮০+ অভিভাবক দ্বারা ৫-স্টার রেটিং প্রাপ্ত
              </p>
            </div>

            {/* Satisfaction Metric */}
            <div className="text-center space-y-2 py-4 md:py-0 md:px-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900">
                ১০০% ভেরিফাইড ক্রেতা
              </h4>
              <p className="text-xs text-slate-600">
                ক্যাশ অন ডেলিভারিতে পার্সেল চেক করে গ্রহণকারী সম্মানিত অভিভাবকদের অভিমত।
              </p>
            </div>

            {/* 1-Year Warranty Guarantee Metric */}
            <div className="text-center md:text-right space-y-2 pt-4 md:pt-0 md:pl-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-800 mx-auto md:ml-auto">
                <ShieldCheck className="w-6 h-6 text-amber-700" />
              </div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900">
                ১ বছরের রিপ্লেসমেন্ট ওয়ারেন্টি
              </h4>
              <p className="text-xs text-slate-600">
                যেকোনো যান্ত্রিক সমস্যায় ১ বছরের অফিসিয়াল সুরক্ষা ও দ্রুত কাস্টমার কেয়ার সাপোর্ট।
              </p>
            </div>

          </div>
        </div>

        {/* 6 Review Cards Grid (3x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-white border border-amber-200/90 shadow-xs hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                
                {/* Header: Stars + Verified Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {rev.verifiedPurchase && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>যাচাইকৃত ক্রেতা</span>
                    </span>
                  )}
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Reviewer Meta */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-900">
                    {rev.name}
                  </h4>
                  <div className="flex items-center gap-1 text-slate-500 text-[11px] mt-0.5">
                    <MapPin className="w-3 h-3 text-amber-600 shrink-0" />
                    <span>{rev.location}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-amber-800 font-medium">{rev.childInfo}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Clock className="w-3 h-3" />
                  <span>{rev.date}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Assurance Box */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 max-w-2xl mx-auto text-center text-xs text-slate-600">
          <p>
            ⭐️ আপনিও আপনার সন্তান বা প্রিয়জনকে বইটি উপহার দিয়ে আপনার মূল্যবান অভিজ্ঞতা আমাদের সাথে শেয়ার করতে পারেন।
          </p>
        </div>

      </div>
    </section>
  );
};
