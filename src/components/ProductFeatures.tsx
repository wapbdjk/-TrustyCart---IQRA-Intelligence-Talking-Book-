import React from 'react';
import { 
  Languages, 
  Volume2, 
  HelpCircle, 
  Music, 
  Sliders, 
  ShieldCheck, 
  CheckCircle,
  BatteryCharging,
  Users,
  Layers,
  Sparkles
} from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig.ts';

export const ProductFeatures: React.FC = () => {
  const specs = STORE_CONFIG.product.specifications;

  return (
    <section id="features" className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>যাচাইকৃত বৈশিষ্ট্য ও সক্ষমতা</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight text-balance">
            কেন IQRA টকিং বুক আপনার সন্তানের জন্য আকর্ষণীয়?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            শিশুদের চোখ ও হাত সচল রেখে আধুনিক অডিও প্রযুক্তির সাহায্যে খেলাচ্ছলে বর্ণ ও শব্দের বুনিয়াদ গড়ে তোলে।
          </p>
        </div>

        {/* Feature Cards Grid (3x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          
          <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-amber-200/80 shadow-xs hover:border-amber-400 hover:shadow-sm transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
              <Languages className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              ৩ ভাষার স্বয়ংসম্পূর্ণ সংকলন
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              বাংলা স্বরবর্ণ-ব্যঞ্জনবর্ণ, ইংরেজি অ্যালফাবেট (ABC) এবং আরবি হরফসমূহ শুদ্ধ মাখরাজ ও উচ্চারণে শেখার সুযোগ রয়েছে।
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-amber-200/80 shadow-xs hover:border-amber-400 hover:shadow-sm transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-700">
              <Volume2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              স্পর্শ করলেই জীবন্ত সাউন্ড
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              আঙুল বা বিশেষ স্মার্ট পেন দিয়ে পৃষ্ঠার যেকোনো ছবি ও লেখার উপর আলতো চাপ দিলেই নিখুঁত সাউন্ড স্পিকারে বেজে উঠবে।
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-amber-200/80 shadow-xs hover:border-amber-400 hover:shadow-sm transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              বুদ্ধিবৃত্তিক কুইজ টেস্ট
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              বইটি নিজেই সন্তানকে প্রশ্ন করবে—যেমন: "গরু কোথায়?", "B ফর কি?"। শিশু সঠিক উত্তর দিলে উৎসাহ ও ভুল হলে সহায়তা করবে।
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-amber-200/80 shadow-xs hover:border-amber-400 hover:shadow-sm transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
              <Music className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              ছড়া, সাধারণ জ্ঞান ও দোয়া
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              শিশুদের পছন্দের আনন্দদায়ক ছড়া, ফলমূল ও যানবাহনের নাম এবং প্রতিদিনের প্রয়োজনীয় ছোট ছোট দোয়া অন্তর্ভুক্ত।
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-amber-200/80 shadow-xs hover:border-amber-400 hover:shadow-sm transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700">
              <Sliders className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              ভলিউম কন্ট্রোল ও পাওয়ার সেভিং
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              ঘরের পরিবেশ অনুযায়ী সাউন্ড কমানো বা বাড়ানোর সুবিধা। কিছু সময় ব্যবহার না করলে চার্জ বাঁচাতে স্বয়ংক্রিয় স্লিপ মোড।
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-amber-200/80 shadow-xs hover:border-amber-400 hover:shadow-sm transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              স্মার্টফোন ও স্ক্রিন টাইম হ্রাস
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              মোবাইলের ক্ষতিকর ব্লু-লাইট বা গেমসের আসক্তি ছাড়াই শিশুর কৌতূহলী মনকে আনন্দদায়ক শিক্ষায় নিয়োজিত রাখতে সাহায্য করে।
            </p>
          </div>

        </div>

        {/* Detailed Image & Verified Specs Split */}
        <div className="bg-[#FFFDF9] rounded-3xl border border-amber-200 p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Feature Macro Photo */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-amber-200 shadow-md aspect-4/3">
                <img
                  src={STORE_CONFIG.product.images.detail}
                  alt="IQRA Talking Book স্পর্শ সংবেদনশীল পৃষ্ঠার ক্লোজআপ ছবি"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 shadow-xs">
                  সহজ টাচ বোতাম ও রঙিন ইলাস্ট্রেশন
                </div>
              </div>
            </div>

            {/* Verified Specifications Table */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                  যাচাইকৃত স্পেসিফিকেশন ও তথ্যতালিকা
                </h3>
                <p className="text-sm text-slate-600">
                  প্রস্তুতকারক ও আমাদের কোয়ালিটি কন্ট্রোল টিম দ্বারা পরীক্ষিত তথ্য:
                </p>
              </div>

              <div className="divide-y divide-amber-100 text-sm">
                
                <div className="py-2.5 flex items-start justify-between gap-4">
                  <span className="text-slate-500 flex items-center gap-2 shrink-0">
                    <Users className="w-4 h-4 text-amber-600" />
                    <span>উপযোগী বয়সসীমা</span>
                  </span>
                  <span className="font-semibold text-slate-800 text-right">
                    {specs.ageRange}
                  </span>
                </div>

                <div className="py-2.5 flex items-start justify-between gap-4">
                  <span className="text-slate-500 flex items-center gap-2 shrink-0">
                    <Languages className="w-4 h-4 text-amber-600" />
                    <span>সমর্থিত ভাষা</span>
                  </span>
                  <span className="font-semibold text-slate-800 text-right">
                    {specs.languages}
                  </span>
                </div>

                <div className="py-2.5 flex items-start justify-between gap-4">
                  <span className="text-slate-500 flex items-center gap-2 shrink-0">
                    <BatteryCharging className="w-4 h-4 text-amber-600" />
                    <span>ব্যাটারি ও চার্জিং সিস্টেম</span>
                  </span>
                  <span className="font-semibold text-slate-800 text-right">
                    {specs.batteryRequirement}
                  </span>
                </div>

                <div className="py-2.5 flex items-start justify-between gap-4">
                  <span className="text-slate-500 flex items-center gap-2 shrink-0">
                    <Layers className="w-4 h-4 text-amber-600" />
                    <span>ইন্টারেক্টিভ পৃষ্ঠা</span>
                  </span>
                  <span className="font-semibold text-slate-800 text-right">
                    {specs.pageCount}
                  </span>
                </div>

                <div className="py-2.5 flex items-start justify-between gap-4">
                  <span className="text-slate-500 flex items-center gap-2 shrink-0">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    <span>বইয়ের উপাদান ও মেটেরিয়াল</span>
                  </span>
                  <span className="font-semibold text-slate-800 text-right">
                    {specs.material}
                  </span>
                </div>

                <div className="py-2.5 flex items-start justify-between gap-4">
                  <span className="text-slate-500 flex items-center gap-2 shrink-0">
                    <Volume2 className="w-4 h-4 text-amber-600" />
                    <span>অডিও ও সাউন্ড সিস্টেম</span>
                  </span>
                  <span className="font-semibold text-slate-800 text-right">
                    {specs.speaker}
                  </span>
                </div>

                <div className="py-2.5 flex items-start justify-between gap-4">
                  <span className="text-slate-500 flex items-center gap-2 shrink-0">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    <span>ওয়ারেন্টি / রিপ্লেসমেন্ট</span>
                  </span>
                  <span className="font-medium text-slate-700 text-right text-xs sm:text-sm">
                    {specs.warrantyPolicy}
                  </span>
                </div>

              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>সকল তথ্য ও স্পেসিফিকেশন প্রকৃত প্যাকেজ দেখে যাচাইকৃত। কোনো মনগড়া বা বিভ্রান্তিকর দাবি যুক্ত করা হয়নি।</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
