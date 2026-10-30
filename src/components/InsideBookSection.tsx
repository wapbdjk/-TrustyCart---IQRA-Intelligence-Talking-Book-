import React from 'react';
import { 
  BookOpen, 
  Layers, 
  Languages, 
  Calculator, 
  Music, 
  Gamepad2, 
  Sparkles,
  Mic,
  HandMetal,
  Brain,
  Eye,
  HeartHandshake,
  CheckCircle2,
  ShieldCheck,
  BatteryCharging
} from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig.ts';

export const InsideBookSection: React.FC = () => {
  const insideBook = STORE_CONFIG.product.insideBook;
  const skills = STORE_CONFIG.product.skillDevelopment;

  const iconMap: Record<string, React.ElementType> = {
    BookOpen,
    Layers,
    Languages,
    Calculator,
    Music,
    Gamepad2,
    Mic,
    HandMetal,
    Brain,
    Eye,
    HeartHandshake
  };

  return (
    <section id="inside-book" className="py-14 sm:py-20 bg-gradient-to-b from-white via-amber-50/30 to-white border-t border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* ================= SECTION 1: INSIDE THE BOOK ================= */}
        <div>
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>বইটির ভেতরের আকর্ষণীয় বিষয়বস্তু (Inside the Book)</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight text-balance">
              ৬৪ পৃষ্ঠার বিশাল ভাণ্ডারে কী কী শিখবে আপনার সন্তান?
            </h2>
            
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              প্রতিটি পৃষ্ঠায় রয়েছে আকর্ষণীয় রঙিন ছবি ও ইন্টারঅ্যাক্টিভ সাউন্ড। শিশুর দীর্ঘমেয়াদী শিক্ষার জন্য ১০০টিরও বেশি বৈচিত্র্যময় বিষয়বস্তু সাজানো হয়েছে।
            </p>
          </div>

          {/* 6 Inside Content Cards (3x2) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {insideBook.map((item, idx) => {
              const IconComp = iconMap[item.icon] || BookOpen;
              return (
                <div 
                  key={item.id}
                  className="group relative p-6 rounded-2xl bg-white border border-amber-200/90 shadow-xs hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 text-amber-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <IconComp className="w-6 h-6 text-amber-700" />
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>কনটেন্ট অংশ {idx + 1}</span>
                    <span className="text-amber-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ইন্টারঅ্যাক্টিভ সাউন্ড
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Authentic Book Pages Macro Visual Showcase */}
          <div className="mt-8 rounded-3xl overflow-hidden border border-amber-200 bg-white shadow-sm p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-5 rounded-2xl overflow-hidden shadow-xs border border-amber-100 relative group">
                <img
                  src="/images/iqra_talking_book_features.jpg"
                  alt="IQRA Talking Book এর রঙিন পাতা ও স্পষ্ট বাংলা লেখার ক্লোজআপ ছবি"
                  className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-bold text-slate-800 shadow-xs border border-slate-200/50">
                  আসল ভেতরের পাতার ছবি
                </div>
              </div>

              <div className="md:col-span-7 space-y-3">
                <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  উচ্চমানের গ্লসি প্রিন্ট ও ক্লিয়ার স্পিকার
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  বইয়ের প্রতি পাতায় স্পষ্ট বাংলা, ইংরেজি ও আরবি হরফ
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  প্রতিটি হরফের পাশে রয়েছে আকর্ষণীয় রঙিন চিত্র ও ইন্টারঅ্যাক্টিভ সাউন্ড আইকন। পাতার নিচে রয়েছে ভলিউম নিয়ন্ত্রণ, পুনরাবৃত্তি (Repeat) এবং কুইজ বোতাম (? খেলুন)—যার ফলে শিশু খেলার ছলেই শুদ্ধ উচ্চারণ ও সাধারণ জ্ঞান সহজে আয়ত্ত করে।
                </p>
                <div className="flex flex-wrap gap-2 pt-1 text-xs text-slate-700">
                  <span className="px-3 py-1 rounded-lg bg-slate-100 font-medium">✓ টিয়ার-প্রুফ মজবুত পেপার</span>
                  <span className="px-3 py-1 rounded-lg bg-slate-100 font-medium">✓ ওয়াটার-রেজিস্ট্যান্ট কোটিং</span>
                  <span className="px-3 py-1 rounded-lg bg-slate-100 font-medium">✓ চোখ-বান্ধব উজ্জ্বল কালার</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Highlights Strip: Dual Power & 1-Year Warranty */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center md:text-left">
            
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
                <BatteryCharging className="w-6 h-6 text-amber-100" />
              </div>
              <div>
                <h4 className="font-bold text-sm sm:text-base text-white">টাইপ-সি চার্জিং সিস্টেম</h4>
                <p className="text-xs text-amber-100 mt-0.5">কোনো ব্যাটারি কেনার ঝামেলা নেই, মোবাইলের চার্জারেই চার্জ হয়</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-amber-100" />
              </div>
              <div>
                <h4 className="font-bold text-sm sm:text-base text-white">১ বছরের অফিসিয়াল ওয়ারেন্টি</h4>
                <p className="text-xs text-amber-100 mt-0.5">যেকোনো যান্ত্রিক সমস্যায় ১০০% রিপ্লেসমেন্ট নিশ্চয়তা</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-amber-100" />
              </div>
              <div>
                <h4 className="font-bold text-sm sm:text-base text-white">৩+ বছর বয়সী শিশুদের জন্য</h4>
                <p className="text-xs text-amber-100 mt-0.5">ওয়াটার-রেজিস্ট্যান্ট কোটিং ও টিয়ার-প্রুফ মজবুত পেজ</p>
              </div>
            </div>

          </div>
        </div>

        {/* ================= SECTION 2: 5 SKILL DEVELOPMENTS ================= */}
        <div>
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-900 text-xs font-bold border border-blue-200">
              <Brain className="w-4 h-4 text-blue-600" />
              <span>শিশুর সামগ্রিক মেধার বিকাশ (Skill Development)</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight text-balance">
              শিশুর যে ৫টি বিশেষ দক্ষতা বহুগুণ বাড়িয়ে তুলবে
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              টকিং বুক শুধু একটি খেলনা বা বই নয়, এটি শিশুর ইন্দ্রিয় ও বুদ্ধিমত্তার প্রতিটি স্তরকে সক্রিয় করে তোলে।
            </p>
          </div>

          {/* 5 Skills List / Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => {
              const IconComp = iconMap[skill.icon] || Brain;
              return (
                <div
                  key={skill.id}
                  className={`p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between ${
                    index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center border border-amber-200">
                        <IconComp className="w-5 h-5 text-amber-600" />
                      </div>
                      <span className="font-ui font-black text-amber-500 text-lg">
                        ০{index + 1}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-amber-700 tracking-wide block uppercase">
                        {skill.subtitle}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                        {skill.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {skill.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>দক্ষতা উন্নয়নে প্রমাণিত</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
