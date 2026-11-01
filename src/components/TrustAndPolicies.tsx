import React from 'react';
import { ShieldCheck, Truck, Eye, CheckCircle2 } from 'lucide-react';

export const TrustAndPolicies: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: '১০০% ক্যাশ অন ডেলিভারি',
      desc: 'কোনো অগ্রিম টাকা দিতে হবে না। পার্সেল হাতে পেয়ে ডেলিভারিম্যানকে টাকা দিন।'
    },
    {
      icon: Truck,
      title: 'সারা দেশে ফ্রি ডেলিভারি',
      desc: 'বাংলাদেশের ৬৪ জেলার যেকোনো থানা বা এলাকায় ডেলিভারি চার্জ সম্পূর্ণ ফ্রি (৳০)।'
    },
    {
      icon: Eye,
      title: 'পার্সেল দেখে নেওয়ার সুবিধা',
      desc: 'ডেলিভারিম্যানের সামনে প্যাকেট খুলে ভেতরের কম্বো আইটেমগুলো যাচাই করে নেওয়ার সুযোগ।'
    },
    {
      icon: CheckCircle2,
      title: 'আসল ৫-ইন-১ কম্বো',
      desc: 'প্রতিটি পার্সেল যত্নসহকারে চেক করে সিল করা অবস্থায় সুরক্ষিতভাবে ডেলিভারি দেওয়া হয়।'
    }
  ];

  return (
    <section className="py-10 sm:py-14 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-2.5"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {item.desc}
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
