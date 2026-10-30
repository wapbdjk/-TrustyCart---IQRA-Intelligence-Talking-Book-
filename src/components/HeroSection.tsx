import React, { useState } from 'react';
import { 
  ArrowDown, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  MessageCircle, 
  Play, 
  Film, 
  Image as ImageIcon,
  AlertCircle
} from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig.ts';
import { formatTaka } from '../services/orderService.ts';

function getYouTubeEmbedUrl(url: string): string {
  if (!url) return '';
  // Check YouTube Shorts format: youtube.com/shorts/VIDEO_ID
  const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsMatch && shortsMatch[1]) {
    return `https://www.youtube.com/embed/${shortsMatch[1]}`;
  }
  // Check YouTube Watch format: youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
  if (watchMatch && watchMatch[1]) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }
  // Check short URL format: youtu.be/VIDEO_ID
  const youtuBeMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (youtuBeMatch && youtuBeMatch[1]) {
    return `https://www.youtube.com/embed/${youtuBeMatch[1]}`;
  }
  // If already embed URL
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
  const [activeImage, setActiveImage] = useState<string>(STORE_CONFIG.product.images.hero);
  const [customVideoUrl, setCustomVideoUrl] = useState<string>(STORE_CONFIG.product.video.videoUrl);

  const galleryImages = [
    { src: STORE_CONFIG.product.images.hero, label: 'টকিং বুক ও পেন' },
    { src: STORE_CONFIG.product.images.package, label: 'প্যাকেজ ও বক্স' },
    { src: STORE_CONFIG.product.images.detail, label: 'সাউন্ড টাচ পেজ' },
    { src: STORE_CONFIG.product.images.lifestyle, label: 'শিশুর আনন্দময় শিক্ষা' },
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
    ? `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent('আসসালামু আলাইকুম, আমি IQRA Intelligence Talking Book সম্পর্কে জানতে আগ্রহী।')}`
    : '#contact';

  return (
    <section className="relative overflow-hidden pt-6 pb-12 lg:pt-10 lg:pb-18 bg-gradient-to-b from-amber-50/50 via-[#FFFDF9] to-[#FFFDF9]">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 -z-10 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top category & Free delivery indicator */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-4">
          <span>এডুকেশনাল খেলনা ও বই</span>
          <span aria-hidden="true">·</span>
          <span>ইলেকট্রনিক সাউন্ড লার্নিং</span>
          <span aria-hidden="true">·</span>
          <span className="text-amber-800 font-bold bg-amber-100/90 px-2 py-0.5 rounded-md border border-amber-300">
            টাইপ-সি রিচার্জেবল
          </span>
          <span aria-hidden="true">·</span>
          <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
            সারা বাংলাদেশে ফ্রি ডেলিভারি (৳০)
          </span>
          <span aria-hidden="true">·</span>
          <span className="text-blue-800 font-bold bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
            ১ বছরের অফিসিয়াল ওয়ারেন্টি
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Description, Free Delivery & Price */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Child-friendly trust badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 text-amber-900 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>বাংলা, ইংরেজি ও আরবি ৩টি ভাষার ডিজিটাল লার্নিং বুক</span>
            </div>

            {/* Mandatory Bengali Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.25] text-balance">
              শিশুর শেখার আনন্দ হোক <span className="text-amber-600 underline decoration-amber-300 decoration-wavy decoration-2">আরও আকর্ষণীয়</span>
            </h1>

            {/* Mandatory Supporting text */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              IQRA Intelligence Talking Book সম্পর্কে জানুন। পণ্যের বৈশিষ্ট্য, প্যাকেজের উপকরণ ও ব্যবহারবিধি দেখে আপনার সন্তানের জন্য উপযুক্ত কি না যাচাই করুন।
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>৬৪ পৃষ্ঠার বিশাল ভাণ্ডার ও ১০০+ আকর্ষণীয় কনটেন্ট</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>টাইপ-সি (Type-C) রিচার্জেবল (কোনো ব্যাটারি লাগে না)</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>৩ ভাষায় বর্ণমালা, গণিত, গান, ছড়া ও স্মার্ট বোতাম</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>১ বছরের অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি</span>
              </div>
            </div>

            {/* Pricing Box & 100% Free Delivery Information */}
            <div className="p-5 sm:p-6 bg-white rounded-2xl border-2 border-amber-300 shadow-sm space-y-4">
              
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-extrabold text-amber-600 font-ui tabular-nums">
                    {formatTaka(currentPrice)}
                  </span>
                  <span className="text-base sm:text-lg text-slate-400 line-through font-ui tabular-nums">
                    {formatTaka(regularPrice)}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800">
                    সাশ্রয় {formatTaka(savings)}
                  </span>
                </div>

                {/* Free Delivery Callout */}
                <div className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span>সারা বাংলাদেশে ফ্রি ডেলিভারি (চার্জ: ৳০)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  onClick={scrollToOrder}
                  className="flex-1 flex items-center justify-center gap-2.5 px-7 py-3.5 text-base font-bold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.99] cursor-pointer"
                >
                  <span>এখনই অর্ডার করুন</span>
                  <ArrowDown className="w-5 h-5" />
                </button>

                {hasRealWhatsApp ? (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>হোয়াটসঅ্যাপে প্রশ্ন করুন</span>
                  </a>
                ) : (
                  <div className="flex items-center justify-center gap-2 px-4 py-3 text-xs text-slate-600 bg-slate-100 rounded-xl border border-slate-200">
                    <MessageCircle className="w-4 h-4 text-slate-400" />
                    <span>হোয়াটসঅ্যাপ: <strong className="font-mono text-slate-700">[YOUR PHONE NUMBER]</strong></span>
                  </div>
                )}
              </div>

              {/* Delivery and COD note */}
              <div className="flex items-center gap-2 pt-1 text-xs text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>ক্যাশ অন ডেলিভারি — পার্সেল হাতে পেয়ে ডেলিভারিম্যানের সামনে দেখে মূল্য পরিশোধ করুন।</span>
              </div>
            </div>

            {/* Responsible Parent Disclaimer */}
            <div className="text-[12px] text-slate-500 bg-slate-50/80 p-3 rounded-lg border border-slate-200/60 leading-relaxed">
              <strong className="text-slate-700 font-medium">দায়িত্বশীল অভিভাবক নোট:</strong> এই বইটি শিশুর কৌতূহল, ভাষা পরিচিতি ও খেলার ছলে শেখার আগ্রহ বাড়াতে একটি আধুনিক অডিও-ভিজ্যুয়াল মাধ্যম। এটি শিশুর তাৎক্ষণিক অলৌকিক মেধা বা শ্রেণিকক্ষে গ্যারান্টিড ফলাফলের প্রতিশ্রুতি দেয় না।
            </div>

          </div>

          {/* Right Column: Product Photo & Video Showcase */}
          <div className="lg:col-span-5 space-y-3">
            
            {/* Photo vs Video Switcher Tabs */}
            <div className="flex items-center justify-between p-1 bg-amber-100/60 rounded-xl border border-amber-200">
              <button
                type="button"
                onClick={() => setActiveMedia('image')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeMedia === 'image'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
                <span>পণ্যের ছবি গ্যালারি</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMedia('video')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeMedia === 'video'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Film className="w-3.5 h-3.5 text-amber-600" />
                <span>প্রোডাক্ট ভিডিও রিভিউ</span>
              </button>
            </div>

            {/* Media Display Area */}
            <div className="relative group bg-white p-2.5 rounded-2xl border border-amber-200 shadow-md overflow-hidden aspect-4/3 sm:aspect-4/3 flex items-center justify-center">
              {activeMedia === 'image' ? (
                <div 
                  className="relative w-full h-full cursor-zoom-in group"
                  onClick={() => {
                    const idx = galleryImages.findIndex(img => img.src === activeImage);
                    onOpenGallery?.(idx >= 0 ? idx : 0);
                  }}
                  title="বড় করে দেখতে ও ডাউনলোড করতে ক্লিক করুন"
                >
                  <img
                    src={activeImage}
                    alt="IQRA Intelligence Talking Book - আসল প্রোডাক্টের ছবি"
                    className="w-full h-full object-cover rounded-xl transition-all duration-300 group-hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-semibold text-slate-800 shadow-xs border border-slate-200/50">
                    আসল ছবি (Authentic Product)
                  </div>
                  <div className="absolute bottom-4 right-4 bg-slate-900/80 hover:bg-slate-900 backdrop-blur-xs text-white text-[11px] font-medium px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                    <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                    <span>বড় করে দেখুন ও ডাউনলোড</span>
                  </div>
                </div>
              ) : (
                /* Video Player Container: Mobile & Desktop Friendly, No Unsolicited Autoplay */
                <div className="w-full h-full bg-slate-950 rounded-xl overflow-hidden flex flex-col items-center justify-center text-white relative">
                  {customVideoUrl ? (
                    customVideoUrl.includes('youtube.com') || customVideoUrl.includes('youtu.be') ? (
                      <iframe
                        src={getYouTubeEmbedUrl(customVideoUrl)}
                        title="IQRA Intelligence Talking Book Video"
                        className="w-full h-full border-0"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        src={customVideoUrl}
                        controls
                        autoPlay={false}
                        muted={false}
                        playsInline
                        preload="metadata"
                        poster={STORE_CONFIG.product.video.posterImage}
                        className="w-full h-full object-contain"
                      >
                        আপনার ব্রাউজার ভিডিও ট্যাগ সমর্থন করে না।
                      </video>
                    )
                  ) : (
                    /* Video Placeholder for Seller's Own Video */
                    <div className="p-6 text-center space-y-3 max-w-sm">
                      <div className="w-14 h-14 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/40">
                        <Play className="w-7 h-7 ml-0.5 fill-amber-400" />
                      </div>
                      <h4 className="text-sm font-bold text-white">
                        আপনার তৈরি করা ভিডিও এখানে দেখাবে
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        ভিডিও যুক্ত করতে <code className="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded font-mono text-[11px]">src/config/storeConfig.ts</code> ফাইলে <code className="text-amber-300">videoUrl</code> বসিয়ে দিন (যেমন: আপনার ইউটিউব ভিডিও বা mp4 ফাইল)।
                      </p>
                      
                      {/* Optional live video preview input for seller testing */}
                      <div className="pt-2">
                        <input
                          type="text"
                          placeholder="অথবা ভিডিও লিংক পেস্ট করে টেস্ট করুন"
                          value={customVideoUrl}
                          onChange={(e) => setCustomVideoUrl(e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Thumbnail switcher */}
            {activeMedia === 'image' ? (
              <div className="grid grid-cols-4 gap-2">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(img.src)}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer aspect-4/3 p-0.5 bg-white ${
                      activeImage === img.src ? 'border-amber-500 ring-2 ring-amber-200 shadow-sm' : 'border-slate-200 hover:border-amber-300 opacity-80 hover:opacity-100'
                    }`}
                    title={img.label}
                  >
                    <img
                      src={img.src}
                      alt={img.label}
                      className="w-full h-full object-cover rounded-lg"
                      referrerPolicy="no-referrer"
                    />
                    <span className="sr-only">{img.label}</span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-center text-xs text-slate-500 font-medium">
                * ভিডিওতে সাউন্ড শুনতে প্লে বাটনে ক্লিক করে ভলিউম অন করুন
              </p>
            )}

            {/* Quick Action to open HD Images Gallery & Download Modal */}
            <button
              type="button"
              onClick={() => {
                const idx = galleryImages.findIndex(img => img.src === activeImage);
                onOpenGallery?.(idx >= 0 ? idx : 0);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-50 hover:bg-amber-100/90 border border-amber-300 text-amber-900 text-xs font-bold transition-all shadow-xs active:scale-[0.99] cursor-pointer"
            >
              <ImageIcon className="w-4 h-4 text-amber-600" />
              <span>📸 আসল ৪টি HD ছবি দেখুন ও ডাউনলোড করুন (বিজ্ঞাপন উপযোগী)</span>
            </button>

            <p className="text-center text-xs text-slate-500">
              ছবি ও ভিডিওতে ক্লিক করে আসল বই ও প্যাকেজ দেখে নিন
            </p>

          </div>

        </div>
      </div>
    </section>
  );
};
