import React, { useState } from 'react';
import { Package, Check, Gift } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig.ts';

export const PackageContents: React.FC = () => {
  const contents = STORE_CONFIG.product.packageContents;
  const comboPhotos = [
    { src: '/images/combo_full_package.jpg', label: '৫-ইন-১ সম্পূর্ণ কম্বো' },
    { src: '/images/talking_book_with_lcd_tablet.jpg', label: 'টকিং বুক + ৮.৫" ট্যাবলেট' },
    { src: '/images/water_magic_book.jpg', label: 'ওয়াটার ম্যাজিক বুক' }
  ];
  const [activePhoto, setActivePhoto] = useState(comboPhotos[0].src);

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
          
          {/* Authentic Combo Photos with Selector */}
          <div className="lg:col-span-6 space-y-3">
            <div className="relative rounded-3xl overflow-hidden border-2 border-amber-300 shadow-md bg-white p-2">
              <img
                src={activePhoto}
                alt="IQRA Intelligence Talking Book ৫-ইন-১ কম্বো প্যাক"
                className="w-full h-auto object-cover rounded-2xl aspect-square"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg text-xs font-bold text-slate-800 shadow-xs flex items-center gap-1.5 border border-slate-200/60">
                <Gift className="w-4 h-4 text-amber-600" />
                <span>আসল ৫-ইন-১ কম্বো সেট</span>
              </div>
            </div>

            {/* 3 Real Photos Thumbnails */}
            <div className="grid grid-cols-3 gap-2.5">
              {comboPhotos.map((photo, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActivePhoto(photo.src)}
                  className={`p-1 rounded-xl border-2 transition-all cursor-pointer text-left ${
                    activePhoto === photo.src 
                      ? 'border-amber-500 ring-2 ring-amber-300/60 bg-amber-50' 
                      : 'border-slate-200 bg-white hover:border-amber-300'
                  }`}
                >
                  <img
                    src={photo.src}
                    alt={photo.label}
                    className="w-full h-16 sm:h-20 object-cover rounded-lg"
                  />
                  <span className="block text-[11px] font-bold text-slate-700 mt-1 truncate px-1">
                    {photo.label}
                  </span>
                </button>
              ))}
            </div>

            <p className="text-center text-xs text-slate-500 font-medium">
              * ছবিতে ক্লিক করে কম্বো প্যাকেজের প্রতিটি বাস্তব অংশ বড় করে দেখে নিন
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
