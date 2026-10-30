import React from 'react';
import { Power, BookOpen, Hand, PenTool, Lightbulb, BatteryCharging } from 'lucide-react';

export const HowToUse: React.FC = () => {
  const steps = [
    {
      step: '০১',
      title: 'টাইপ-সি চার্জিং',
      desc: 'বইটিতে কোনো আলাদা ব্যাটারি ব্যবহার করতে হয় না। সাধারণ টাইপ-সি (Type-C) চার্জার দিয়ে সহজেই চার্জ দিন।',
      icon: BatteryCharging,
      color: 'bg-emerald-100 text-emerald-700'
    },
    {
      step: '০২',
      title: 'পাওয়ার সুইচ অন করুন',
      desc: 'বইয়ের ডানপাশের কন্ট্রোল প্যানেলের লাল রঙের Power বোতামটিতে আলতো চাপ দিয়ে চালু করুন।',
      icon: BookOpen,
      color: 'bg-blue-100 text-blue-700'
    },
    {
      step: '০৩',
      title: 'পৃষ্ঠার ‘Start’ বোতামে টাচ করুন',
      desc: 'যে পৃষ্ঠাটি পড়তে চান, সেই পৃষ্ঠার উপরের গোল "Start" বাটন স্পর্শ করে অডিও মোড একটিভ করুন।',
      icon: Hand,
      color: 'bg-emerald-100 text-emerald-700'
    },
    {
      step: '০৪',
      title: 'আলতো স্পর্শ ও ড্রয়িং প্র্যাকটিস',
      desc: 'এবার যে কোনো বর্ণ বা ছবিতে আঙুল দিয়ে চাপলেই সাউন্ড শুনবে। সাথে দেওয়া মার্কার দিয়ে পৃষ্ঠায় লিখতেও পারবে।',
      icon: PenTool,
      color: 'bg-purple-100 text-purple-700'
    }
  ];

  return (
    <section id="how-to-use" className="py-14 sm:py-20 bg-white border-t border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
            <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
            <span>সহজ ৪ ধাপের নির্দেশিকা</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight text-balance">
            কীভাবে টকিং বইটি ব্যবহার করবেন?
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            বইটি পরিচালনা করা অত্যন্ত সহজ। আপনার সন্তান কোনো সাহায্য ছাড়াই নিজে নিজে পরিচালনা করতে পারবে।
          </p>
        </div>

        {/* Split Grid: Real Photo of Child Learning + 4 Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Authentic Lifestyle Photo */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border-2 border-amber-200 shadow-md bg-white p-2">
              <img
                src="/images/iqra_talking_book_child_learning.jpg"
                alt="বাচ্চারা আনন্দ নিয়ে নিজে নিজে IQRA টকিং বুক ব্যবহার করছে"
                className="w-full h-auto object-cover rounded-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg text-xs font-bold text-slate-800 shadow-xs flex items-center gap-1.5 border border-slate-200/60">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>বাস্তব দৃশ্য: শিশুর স্বতঃস্ফূর্ত শিক্ষা</span>
              </div>
            </div>
            <p className="text-center text-xs text-slate-500 mt-2 font-medium">
              মোবাইলের ক্ষতিকর ডিসপ্লে ও গেমস ছেড়ে শিশু নিজেই আগ্রহ নিয়ে শিখবে
            </p>
          </div>

          {/* Right: 4 Steps Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {steps.map((item) => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.step} 
                  className="relative p-5 rounded-2xl bg-[#FFFDF9] border border-amber-200 shadow-xs hover:border-amber-400 hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl font-extrabold text-amber-500 font-ui tabular-nums">
                        {item.step}
                      </span>
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-amber-100 text-[11px] text-slate-400 font-medium">
                    সহজ ও নিরাপদ
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Quick Tips Box */}
        <div className="mt-10 p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 max-w-3xl mx-auto flex items-start gap-3.5 text-xs sm:text-sm text-amber-950">
          <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold">গুরুত্বপূর্ণ টিপস:</span>
            <p className="text-slate-700 leading-relaxed">
              পৃষ্ঠা পরিবর্তন করার পর সবসময় সেই পৃষ্ঠার উপরের গোল ‘Start’ বোতামটিতে একবার স্পর্শ করতে হয়, যাতে সেন্সরটি নতুন পৃষ্ঠার অডিও ডেটা রিড করতে পারে।
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
