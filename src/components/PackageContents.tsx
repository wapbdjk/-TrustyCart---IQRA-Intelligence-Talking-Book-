import React from 'react';
import { Package, Check, Gift } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig.ts';

export const PackageContents: React.FC = () => {
  const contents = STORE_CONFIG.product.packageContents;

  return (
    <section id="package" className="py-14 sm:py-20 bg-[#FEFBF6] border-t border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
            <Package className="w-3.5 h-3.5 text-amber-600" />
            <span>অরিজিনাল প্যাকেজ আনবক্সিং</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight text-balance">
            অর্ডার করলে প্যাকেজের সাথে আপনি যা যা পাবেন
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            প্রতিটি বক্স ফ্যাক্টরি সিল করা অবস্থায় পৌঁছাবে। ভেতরের প্রতিটি আইটেম নিচে বিস্তারিত দেওয়া হলো:
          </p>
        </div>

        {/* 2-Column Split: Authentic Flatlay Photo + Item Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Authentic Flatlay Packaging Photo */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border-2 border-amber-200/90 shadow-md bg-white p-2">
              <img
                src={STORE_CONFIG.product.images.package}
                alt="IQRA Intelligence Talking Book প্যাকেজের প্রকৃত সামগ্রী আনবক্সিং"
                className="w-full h-auto object-cover rounded-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg text-xs font-bold text-slate-800 shadow-xs flex items-center gap-1.5 border border-slate-200/60">
                <Gift className="w-4 h-4 text-amber-600" />
                <span>উপহার দেওয়ার উপযোগী আকর্ষণীয় বক্স</span>
              </div>
            </div>
            <p className="text-center text-xs text-slate-500 mt-2 font-medium">
              * ছবিতে দৃশ্যমান সকল অনুষঙ্গ একই প্যাকেজের মধ্যে সুরক্ষিতভাবে সংযুক্ত
            </p>
          </div>

          {/* Item Checklist */}
          <div className="lg:col-span-6 space-y-4">
            <div className="space-y-3.5">
              {contents.map((item, index) => (
                <div 
                  key={item.id} 
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-amber-100 shadow-xs hover:border-amber-300 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-sm font-ui">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {item.titleBn}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                      {item.descBn}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Note on Type-C Charging */}
            <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950 leading-relaxed space-y-1">
              <p className="font-semibold flex items-center gap-1.5 text-emerald-800">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>চার্জিং ও ব্যাটারি সুবিধা:</span>
              </p>
              <p className="text-slate-700">
                এই বইটিতে কোনো আলাদা ব্যাটারি ব্যবহার করতে হয় না। সাধারণ টাইপ-সি (Type-C) মোবাইল চার্জার দিয়ে চার্জ দিলেই এটি অনায়াসে দীর্ঘ সময় চলে। ফলে বারবার পেন্সিল ব্যাটারি কেনার কোনো বাড়তি ঝামেলা বা খরচ নেই!
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
