import React from 'react';
import { Volume2, BatteryCharging, Tablet, Droplets, BrainCircuit } from 'lucide-react';

export const ProductFeatures: React.FC = () => {
  const features = [
    {
      icon: Volume2,
      title: '৩ ভাষার স্পষ্ট সাউন্ড ও উচ্চারণ',
      desc: 'বাংলা বর্ণমালা, ইংরেজি Alphabet ও আরবি হরফ—প্রতিটি শব্দ বা ছবিতে আলতো স্পর্শ করলেই স্পষ্ট ডিজিটাল সাউন্ড বেজে ওঠে।',
      accentColor: 'text-blue-600 bg-blue-50 border-blue-100'
    },
    {
      icon: BatteryCharging,
      title: 'টাইপ-সি রিচার্জেবল ব্যাটারি',
      desc: 'কোনো পেন্সিল ব্যাটারি কেনার ঝামেলা বা বাড়তি খরচ নেই। সাধারণ মোবাইল চার্জার দিয়েই খুব সহজে চার্জ করা যায়।',
      accentColor: 'text-amber-600 bg-amber-50 border-amber-100'
    },
    {
      icon: Tablet,
      title: '৮.৫" LCD কালারফুল রাইটিং স্লেট',
      desc: 'শিশুর আঁকাআঁকি ও হাতের লেখা অনুশীলনের জন্য সাথে পাচ্ছেন ডিজিটাল ট্যাবলেট। এক ক্লিকেই পুরো স্ক্রিন মুছে নতুন করে লেখা যায়।',
      accentColor: 'text-blue-700 bg-blue-50 border-blue-100'
    },
    {
      icon: Droplets,
      title: 'IQRA ওয়াটার ম্যাজিক বুক ও পেন',
      desc: 'শুধুমাত্র পরিষ্কার পানিতে পেন ভিজিয়ে আঁকলেই পাতায় উজ্জ্বল রঙ দেখা দেয়। শুকিয়ে গেলে নিজে থেকেই মুছে যায়, জামা বা দেয়ালে কালির দাগ পড়ে না।',
      accentColor: 'text-teal-600 bg-teal-50 border-teal-100'
    },
    {
      icon: BrainCircuit,
      title: 'শব্দভাণ্ডার ও বুদ্ধিমত্তা বিকাশ',
      desc: 'পশুপাখি, ফলমূল ও যানবাহনের পরিচিতি, সুরসহ জনপ্রিয় ছড়া এবং মজার কুইজ গেম যা শিশুর মনোযোগ ও কথা বলার আগ্রহ বাড়ায়।',
      accentColor: 'text-indigo-600 bg-indigo-50 border-indigo-100'
    }
  ];

  return (
    <section id="features" className="py-12 sm:py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
            মূল বৈশিষ্ট্যসমূহ
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight text-balance">
            কেন এই টকিং বুক কম্বো শিশুর জন্য সেরা?
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            মোবাইল বা টিভির ক্ষতিকর আসক্তি কমিয়ে শিশুকে আনন্দময় শিক্ষায় ব্যস্ত রাখার কার্যকরী সমাধান।
          </p>
        </div>

        {/* 5 Simple Visual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div 
                key={index}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-colors shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${feat.accentColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 text-xs font-semibold text-slate-400">
                  সুবিধা 0{index + 1}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
