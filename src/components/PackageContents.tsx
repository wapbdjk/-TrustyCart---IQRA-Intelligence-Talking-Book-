import React, { useState } from 'react';
import { Package, Check, Sparkles } from 'lucide-react';

export const PackageContents: React.FC = () => {
  const comboPhotos = [
    { src: '/images/combo_full_package.jpg', label: '৫-ইন-১ সম্পূর্ণ কম্বো সেট' },
    { src: '/images/talking_book_with_lcd_tablet.jpg', label: 'টকিং বুক ও ৮.৫" ট্যাবলেট' },
    { src: '/images/water_magic_book.jpg', label: 'ওয়াটার ম্যাজিক বুক ও কলম' }
  ];
  const [activePhoto, setActivePhoto] = useState(comboPhotos[0].src);

  const items = [
    {
      num: '১',
      title: 'IQRA Intelligence Talking Book',
      desc: 'বাংলা, ইংরেজি ও আরবি ভাষার অডিও সাউন্ড এবং টাচ বোতাম বিশিষ্ট ৬৪ পৃষ্ঠার মূল বই।'
    },
    {
      num: '২',
      title: '৮.৫ ইঞ্চি LCD কালারফুল রাইটিং ট্যাবলেট',
      desc: 'বাচ্চার লেখা ও আঁকাআঁকি অনুশীলনের জন্য রি-ইউজেবল ডিজিটাল স্লেট (ইরেজ বোতাম সহ)।'
    },
    {
      num: '৩',
      title: 'IQRA ওয়াটার ম্যাজিক বুক',
      desc: 'পানির সংস্পর্শে রঙ ফুটে ওঠা ম্যাজিক ড্রয়িং বুক, যা শুকিয়ে গেলে নিজে নিজেই পরিষ্কার হয়ে যায়।'
    },
    {
      num: '৪',
      title: '২টি স্পেশাল পেন ও মার্কার',
      desc: 'টকিং বই স্পর্শ করার বিশেষ কলম এবং ওয়াটার ম্যাজিক বুকের জন্য বিশেষ পানির পেন।'
    },
    {
      num: '৫',
      title: 'ইউএসবি চার্জিং ক্যাবল',
      desc: 'সহজে রিচার্জ করার উপযোগী ক্যাবল (সাধারণ মোবাইল চার্জারেই চার্জ করা যায়)।'
    }
  ];

  return (
    <section id="package" className="py-12 sm:py-16 bg-slate-50/50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
            প্যাকেজ বিবরণী
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight text-balance">
            প্যাকেজে আপনি ঠিক যা যা পাবেন
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            প্রতিটি অর্ডার নিখুঁতভাবে চেক করে সিল করা বক্সে পাঠানো হয়। নিচে প্যাকেজের ৫টি সামগ্রীর তালিকা:
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Product Image with thumbnail selector */}
          <div className="lg:col-span-6 space-y-3">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs p-2">
              <img
                src={activePhoto}
                alt="IQRA Talking Book ৫-ইন-১ কম্বো সেট"
                className="w-full h-auto object-cover rounded-xl aspect-square"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Thumbnail switcher */}
            <div className="grid grid-cols-3 gap-2">
              {comboPhotos.map((photo, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActivePhoto(photo.src)}
                  className={`p-1 rounded-xl border text-left transition-colors cursor-pointer bg-white ${
                    activePhoto === photo.src 
                      ? 'border-blue-600 ring-2 ring-blue-100' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <img
                    src={photo.src}
                    alt={photo.label}
                    className="w-full h-16 sm:h-20 object-cover rounded-lg"
                  />
                  <span className="block text-[11px] font-semibold text-slate-700 mt-1 truncate px-0.5">
                    {photo.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: 5 Items Checklist */}
          <div className="lg:col-span-6 space-y-3.5">
            {items.map((item, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 font-bold flex items-center justify-center shrink-0 text-sm font-ui border border-blue-100">
                  {item.num}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}

            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>ডেলিভারির সময় পার্সেল খুলে ভেতরের এই ৫টি আইটেম দেখে নিশ্চিত হয়ে টাকা পরিশোধ করবেন।</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
