import React from 'react';
import { Power, Touchpad, Edit3, Wand2 } from 'lucide-react';

export const HowToUse: React.FC = () => {
  const steps = [
    {
      num: '১',
      icon: Power,
      title: 'পাওয়ার সুইচ অন করুন',
      desc: 'টকিং বইয়ের উপরের হ্যান্ডেলের সাথে থাকা সুইচটি প্রেস করে অন করে নিন।'
    },
    {
      num: '২',
      icon: Touchpad,
      title: 'ছবি বা বর্ণমালায় স্পর্শ করুন',
      desc: 'পেন বা আঙুল দিয়ে পৃষ্ঠার যেকোনো ছবি বা বর্ণে স্পর্শ করলেই সাথে সাথে স্পষ্ট সাউন্ড বেজে উঠবে।'
    },
    {
      num: '৩',
      icon: Edit3,
      title: 'LCD স্লেটে লেখা ও আঁকা অনুশীলন',
      desc: '৮.৫" কালারফুল ডিজিটাল স্লেটে শিশু ইচ্ছামতো বর্ণমালা লিখবে এবং এক বোতাম চেপে সহজেই মুছে ফেলবে।'
    },
    {
      num: '৪',
      icon: Wand2,
      title: 'ওয়াটার ম্যাজিক বুকে রঙ করা',
      desc: 'পেনে সামান্য পানি ভরে বইটিতে দাগ টানলেই রঙিন ছবি প্রকাশ পাবে। শুকিয়ে গেলে তা নিজে থেকেই পরিষ্কার হয়ে যাবে।'
    }
  ];

  return (
    <section id="how-to-use" className="py-12 sm:py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
            সহজ ব্যবহারবিধি
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight text-balance">
            কীভাবে ব্যবহার করবেন? (৪টি সহজ ধাপ)
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            বইটি এতই সহজ যে যেকোনো শিশু খুব দ্রুত নিজেই এটি পরিচালনা করতে পারে।
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                      ধাপ {step.num}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
