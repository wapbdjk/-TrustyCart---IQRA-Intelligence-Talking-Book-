import React, { useState } from 'react';
import { 
  ArrowDown, 
  CheckCircle2, 
  Truck, 
  ShieldCheck,
  MessageCircle, 
  Play, 
  Image as ImageIcon,
  BatteryCharging,
  Layers,
  Sparkles
} from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig.ts';
import { formatTaka } from '../services/orderService.ts';

function getYouTubeEmbedUrl(url: string): string {
  if (!url) return '';
  const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsMatch && shortsMatch[1]) {
    return `https://www.youtube.com/embed/${shortsMatch[1]}`;
  }
  const watchMatch = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
  if (watchMatch && watchMatch[1]) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }
  const youtuBeMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (youtuBeMatch && youtuBeMatch[1]) {
    return `https://www.youtube.com/embed/${youtuBeMatch[1]}`;
  }
  if (url.includes('youtube.com/embed/')) {
    return url;
  }
  return url;
}

interface HeroSectionProps {
  onOpenGallery?: (index: number) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenGallery }) => {
  const [activeMedia, setActiveMedia] = useState<'image' | 'video'>('image');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const galleryImages = [
    { src: '/images/combo_full_package.jpg', label: '৫-ইন-১ সম্পূর্ণ কম্বো সেট' },
    { src: '/images/talking_book_with_lcd_tablet.jpg', label: 'টকিং বুক ও ৮.৫" LCD স্লেট' },
    { src: '/images/water_magic_book.jpg', label: 'ওয়াটার ম্যাজিক বুক ও পেন' },
  ];

  const scrollToOrder = () => {
    const el = document.getElementById('order-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const regularPrice = STORE_CONFIG.product.regularPrice;
  const currentPrice = STORE_CONFIG.product.currentPrice;
  const savings = regularPrice - currentPrice;

  const hasRealWhatsApp = STORE_CONFIG.whatsappNumber && !STORE_CONFIG.whatsappNumber.includes('[');
  const whatsappUrl = hasRealWhatsApp
    ? `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent('আসসালামু আলাইকুম, আমি IQRA Intelligence Talking Book কম্বো প্যাক সম্পর্কে জানতে আগ্রহী।')}`
    : '#contact';

  const embedVideoUrl = getYouTubeEmbedUrl(STORE_CONFIG.product.video.videoUrl);

  return (
    <section className="bg-white border-b border-slate-100 pt-8 pb-12 sm:pt-12 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Unboxed Metadata & Category Bar */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-5">
          <span className="font-semibold text-blue-700">শিশুদের শিক্ষামূলক কম্বো</span>
          <span aria-hidden="true">·</span>
          <span>বাংলা, ইংরেজি ও আরবি অডিও</span>
          <span aria-hidden="true">·</span>
          <span className="text-emerald-700 font-semibold">সারা দেশে ফ্রি হোম ডেলিভারি</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Product Name, Benefits, Price & Order Action */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tagline kicker */}
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 bg-blue-50 px-3 py-1 rounded-md border border-blue-100">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>IQRA ইন্টেলিজেন্ট টকিং বুক ৫-ইন-১ কম্বো প্যাক</span>
            </div>

            {/* Product Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.25] text-balance">
              শিশুর মুখে স্পষ্ট উচ্চারণ ও আনন্দের সাথে শেখার{' '}
              <span className="text-blue-700">ডিজিটাল মাধ্যম</span>
            </h1>

            {/* Short benefit copy */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              বইয়ের পাতায় স্পর্শ করলেই মিষ্টি কণ্ঠে শব্দ বেজে ওঠে। সাথে পাচ্ছেন ৮.৫ ইঞ্চি LCD কালারফুল রাইটিং ট্যাবলেট ও রি-ইউজেবল ওয়াটার ম্যাজিক বুক।
            </p>

            {/* 4 Core Quick Bullet Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="flex items-start gap-2.5 text-sm text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span>৩টি ভাষার অডিও (বাংলা, ইংরেজি ও আরবি)</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span>টাইপ-সি রিচার্জেবল (কোনো ব্যাটারি লাগে না)</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span>৮.৫" LCD কালারফুল ড্রয়িং ও রাইটিং স্লেট</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span>IQRA ওয়াটার ম্যাজিক বুক ও ২ টি বিশেষ পেন</span>
              </div>
            </div>

            {/* Actual Price & Purchase Box */}
            <div className="p-5 sm:p-6 bg-slate-50/70 rounded-2xl border border-slate-200 space-y-4">
              
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-blue-700 font-ui tabular-nums">
                    {formatTaka(currentPrice)}
                  </span>
                  <span className="text-base sm:text-lg text-slate-400 line-through font-ui tabular-nums">
                    {formatTaka(regularPrice)}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                    সাশ্রয় {formatTaka(savings)}
                  </span>
                </div>

                <div className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span>সারা দেশে ফ্রি হোম ডেলিভারি (৳০)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={scrollToOrder}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.99] rounded-xl shadow-sm transition-all cursor-pointer"
                >
                  <span>এখনই অর্ডার করুন</span>
                  <ArrowDown className="w-5 h-5 text-amber-300" />
                </button>

                {hasRealWhatsApp && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-4 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 rounded-xl border border-slate-300 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>হোয়াটসঅ্যাপে কথা বলুন</span>
                  </a>
                )}
              </div>

              {/* Cash on Delivery & Inspection Notice */}
              <div className="flex items-center gap-2 text-xs text-slate-600 pt-1">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>১০০% ক্যাশ অন ডেলিভারি — পার্সেল হাতে পেয়ে ডেলিভারিম্যানের সামনে চেক করে মূল্য দিন।</span>
              </div>
            </div>

          </div>

          {/* Right Column: Clean Media Showcase (Images & Video) */}
          <div className="lg:col-span-5 space-y-3">
            
            {/* View Mode Toggle */}
            <div className="flex items-center p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveMedia('image')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeMedia === 'image'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>প্রোডাক্টের আসল ছবি</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMedia('video')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeMedia === 'video'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Play className="w-3.5 h-3.5" />
                <span>ভিডিও রিভিউ</span>
              </button>
            </div>

            {/* Media Frame */}
            <div className="relative bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm aspect-4/3 flex items-center justify-center">
              {activeMedia === 'image' ? (
                <div 
                  className="w-full h-full cursor-pointer relative group"
                  onClick={() => onOpenGallery?.(activeImageIndex)}
                  title="বড় করে দেখতে ক্লিক করুন"
                >
                  <img
                    src={galleryImages[activeImageIndex].src}
                    alt={galleryImages[activeImageIndex].label}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-semibold text-slate-800 border border-slate-200 shadow-xs">
                    {galleryImages[activeImageIndex].label}
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                  {embedVideoUrl ? (
                    <iframe
                      src={`${embedVideoUrl}?rel=0&modestbranding=1`}
                      title="IQRA Talking Book Video"
                      className="w-full h-full border-0"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <p className="text-white text-xs">ভিডিও লোড হচ্ছে...</p>
                  )}
                </div>
              )}
            </div>

            {/* 3 Authentic Photo Thumbnails */}
            {activeMedia === 'image' && (
              <div className="grid grid-cols-3 gap-2">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer aspect-4/3 p-0.5 bg-white ${
                      activeImageIndex === idx
                        ? 'border-blue-600 ring-2 ring-blue-100'
                        : 'border-slate-200 opacity-80 hover:opacity-100 hover:border-slate-300'
                    }`}
                  >
                    <img
                      src={img.src}
                      alt={img.label}
                      className="w-full h-full object-cover rounded-lg"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}

            <p className="text-center text-xs text-slate-500">
              * আসল ছবি ও ভিডিও দেখে সম্পূর্ণ নিশ্চিত হয়ে অর্ডার করুন
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};
