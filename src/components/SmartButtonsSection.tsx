import React, { useState } from 'react';
import { 
  Mic, 
  HelpCircle, 
  Volume2, 
  BookOpenCheck, 
  Sparkles, 
  ShieldCheck, 
  BatteryCharging, 
  Layers, 
  Check, 
  RotateCcw,
  VolumeX,
  Play
} from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig.ts';

export const SmartButtonsSection: React.FC = () => {
  const [activeButton, setActiveButton] = useState<string>('btn-record');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioFeedbackText, setAudioFeedbackText] = useState<string>('ভয়েজ রেকর্ডিং ও রিপিট বাটন সক্রিয় আছে');

  const smartButtons = STORE_CONFIG.product.smartButtons;

  const handleButtonClick = (btnId: string, nameBn: string, message: string) => {
    setActiveButton(btnId);
    setAudioFeedbackText(message);
    setIsPlayingAudio(true);

    // Play synthesized browser speech or simulated tone if supported
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = 'bn-BD';
      utterance.rate = 0.95;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlayingAudio(false), 2000);
    }
  };

  return (
    <section id="smart-buttons" className="py-14 sm:py-20 bg-white border-t border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-50 text-purple-900 text-xs font-bold border border-purple-200">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>স্মার্ট ইন্টারঅ্যাক্টিভ বোতামসমূহ (Smart Button Features)</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight text-balance">
            বইয়ের নিচের প্যানেলে থাকা ৪টি জাদুকরী স্মার্ট বোতাম
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            এই বিশেষ বোতামগুলো শিশুর পড়ালেখাকে করবে আরও সহজ, আনন্দদায়ক ও স্বয়ংক্রিয়। নিজেই বোতাম চেপে পড়া শুনবে, বলবে এবং পরীক্ষা দেবে!
          </p>
        </div>

        {/* Interactive Bottom Panel Simulation */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-9 text-white shadow-2xl border-4 border-amber-400/40 relative overflow-hidden">
          
          {/* Subtle panel texture accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-700">
            <div>
              <span className="text-xs uppercase tracking-wider text-amber-400 font-bold block">
                ইন্টারেক্টিভ টেস্ট প্যানেল
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                নিচের যেকোনো বোতামে ক্লিক করে লাইভ ডেমো দেখুন
              </h3>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-600 text-xs font-mono text-amber-300">
              <span className={`w-2 h-2 rounded-full ${isPlayingAudio ? 'bg-emerald-400 animate-ping' : 'bg-slate-400'}`} />
              <span>{isPlayingAudio ? 'সাউন্ড বাজছে...' : 'বোতাম চেপে দেখুন'}</span>
            </div>
          </div>

          {/* Simulated Bottom Panel Bar with 4 Big Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 my-8">
            
            {/* 1. Recording & Repeat */}
            <button
              type="button"
              onClick={() => handleButtonClick(
                'btn-record', 
                'রেকর্ডিং ও রিপিট', 
                'ভয়েজ রেকর্ডিং মোড! শিশু নিজের কণ্ঠে পড়া রেকর্ড করতে পারবে এবং পুনরায় শুনে উচ্চারণ শুধরে নিতে পারবে।'
              )}
              className={`p-4 rounded-2xl flex flex-col items-center text-center gap-2 transition-all cursor-pointer border-2 ${
                activeButton === 'btn-record'
                  ? 'bg-gradient-to-b from-amber-500 to-orange-600 border-white shadow-lg scale-102 text-white'
                  : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-300'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <Mic className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold block">ভয়েজ রেকর্ডিং</span>
              <span className="text-[10px] opacity-80">Recording & Repeat</span>
            </button>

            {/* 2. Question Mode (?) */}
            <button
              type="button"
              onClick={() => handleButtonClick(
                'btn-question', 
                'প্রশ্নোত্তর মোড', 
                'কুইজ মোড চালু হয়েছে! বলো তো দেখি, বাঘ কোথায়? সঠিক উত্তর দাও!'
              )}
              className={`p-4 rounded-2xl flex flex-col items-center text-center gap-2 transition-all cursor-pointer border-2 ${
                activeButton === 'btn-question'
                  ? 'bg-gradient-to-b from-blue-500 to-indigo-600 border-white shadow-lg scale-102 text-white'
                  : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-300'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <HelpCircle className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold block">প্রশ্নোত্তর মোড (?)</span>
              <span className="text-[10px] opacity-80">Question Mode</span>
            </button>

            {/* 3. Read Button */}
            <button
              type="button"
              onClick={() => handleButtonClick(
                'btn-read', 
                'রিড বোতাম', 
                'অটো রিড চালু হয়েছে! পুরো পৃষ্ঠার সব বর্ণ ও ছড়া ধারাবাহিকভাবে পড়ে শোনাচ্ছি।'
              )}
              className={`p-4 rounded-2xl flex flex-col items-center text-center gap-2 transition-all cursor-pointer border-2 ${
                activeButton === 'btn-read'
                  ? 'bg-gradient-to-b from-emerald-500 to-teal-600 border-white shadow-lg scale-102 text-white'
                  : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-300'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <BookOpenCheck className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold block">রিড বোতাম (Read)</span>
              <span className="text-[10px] opacity-80">Auto Read Page</span>
            </button>

            {/* 4. Volume Button */}
            <button
              type="button"
              onClick={() => handleButtonClick(
                'btn-volume', 
                'ভলিউম কন্ট্রোল', 
                'ভলিউম অ্যাডজাস্ট করা হয়েছে! সাউন্ড আপনার পছন্দমতো বাড়ানো বা কমানো যাবে।'
              )}
              className={`p-4 rounded-2xl flex flex-col items-center text-center gap-2 transition-all cursor-pointer border-2 ${
                activeButton === 'btn-volume'
                  ? 'bg-gradient-to-b from-purple-500 to-pink-600 border-white shadow-lg scale-102 text-white'
                  : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-300'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <Volume2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold block">ভলিউম কন্ট্রোল</span>
              <span className="text-[10px] opacity-80">Sound Level</span>
            </button>

          </div>

          {/* Interactive Response Message Box */}
          <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
              🔊
            </div>
            <div>
              <span className="text-xs text-amber-300 font-semibold block">লাইভ অডিও ও ফিচার বিস্তারিত:</span>
              <p className="text-sm text-slate-200 mt-0.5 leading-relaxed">
                {audioFeedbackText}
              </p>
            </div>
          </div>

        </div>

        {/* 4 Feature Descriptions in Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {smartButtons.map((btn) => (
            <div
              key={btn.id}
              className={`p-6 rounded-2xl border-2 transition-all ${
                activeButton === btn.id
                  ? 'border-amber-400 bg-amber-50/40 shadow-sm'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-800">
                  {btn.nameEn}
                </span>
                <span className="text-xs font-semibold text-amber-700">
                  {btn.badge}
                </span>
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                {btn.nameBn}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {btn.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ================= TECHNICAL SPECS & CHARGING ================= */}
        <div className="bg-[#FFFDF9] rounded-3xl border-2 border-amber-300 p-6 sm:p-9 shadow-sm">
          <div className="max-w-3xl mx-auto space-y-6">
            
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                <BatteryCharging className="w-4 h-4 text-emerald-600" />
                <span>🛠️ টেকনিক্যাল স্পেসিফিকেশন ও চার্জিং সুবিধা</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                ব্যাটারির ঝামেলামুক্ত ও শিশুদের জন্য শতভাগ নিরাপদ
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              
              <div className="p-4 rounded-xl bg-white border border-amber-200 space-y-2 text-center">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-900">উপযোগী বয়স (3+ Ages)</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  ৩ বছর বা তার বেশি বয়সী শিশুদের জন্য অত্যন্ত কার্যকরী ও আকর্ষণীয়।
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-emerald-200 space-y-2 text-center">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <BatteryCharging className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-900">টাইপ-সি চার্জিং সিস্টেম</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  কোনো ব্যাটারি কেনার ঝামেলা নেই! সাধারণ টাইপ-সি ক্যাবল দিয়ে অনায়াসে চার্জ করা যায়।
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-blue-200 space-y-2 text-center">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-900">নিরাপদ ও টিয়ার-প্রুফ</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  ওয়াটার-রেজিস্ট্যান্ট কোটিং ও টিয়ার-প্রুফ মজবুত পেজ, যা স্বাভাবিক ব্যবহারে ছিঁড়বে না।
                </p>
              </div>

            </div>

            {/* Official 1-Year Warranty Seal */}
            <div className="p-4 rounded-2xl bg-amber-500 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-white">১ বছরের অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি!</h4>
                  <p className="text-xs text-amber-100">যেকোনো টেকনিক্যাল ত্রুটি পেলে সম্পূর্ণ ফ্রিতে রিপ্লেসমেন্ট দেওয়া হবে।</p>
                </div>
              </div>
              <span className="px-4 py-2 rounded-xl bg-white text-amber-800 text-xs font-bold whitespace-nowrap shadow-xs">
                ১০০% গ্যারান্টিযুক্ত সেবা
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
