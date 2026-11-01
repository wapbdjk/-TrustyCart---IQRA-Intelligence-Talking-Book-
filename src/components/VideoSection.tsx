import React from 'react';
import { Play, Sparkles, ShieldCheck, Truck, BatteryCharging, ShoppingBag, Volume2 } from 'lucide-react';
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

export const VideoSection: React.FC = () => {
  const videoUrl = STORE_CONFIG.product.video.videoUrl;
  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  const scrollToOrder = () => {
    const el = document.getElementById('order-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="video-section" className="py-12 sm:py-16 bg-gradient-to-b from-[#FFFDF9] via-amber-50/40 to-white border-y border-amber-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100 text-red-700 text-xs font-bold border border-red-200 shadow-xs animate-pulse">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
            <span>সরাসরি প্রোডাক্ট ভিডিও রিভিউ (Live Video)</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            ভিডিওতে দেখুন IQRA টকিং বুক <span className="text-amber-600">কীভাবে কাজ করে</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            বাস্তব ভিডিও দেখে যাচাই করুন। বইটির স্পষ্ট অডিও উচ্চারণ, স্পর্শ সংবেদনশীল সাউন্ড এবং টাইপ-সি চার্জিং সিস্টেম সরাসরি দেখুন।
          </p>
        </div>

        {/* Video Showcase Card */}
        <div className="bg-white rounded-3xl border-2 border-amber-300 shadow-xl overflow-hidden p-4 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Video Player Box */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="relative w-full max-w-[340px] sm:max-w-[360px] aspect-[9/16] bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-400">
                {embedUrl ? (
                  <iframe
                    src={`${embedUrl}?rel=0&modestbranding=1`}
                    title="IQRA Intelligence Talking Book Real Video"
                    className="w-full h-full border-0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-white p-6 text-center">
                    <Play className="w-12 h-12 text-amber-400 mb-2" />
                    <span>ভিডিও লোড হচ্ছে...</span>
                  </div>
                )}
              </div>
              <p className="text-center text-xs text-slate-500 mt-2 font-medium">
                🔊 ভিডিওর সাউন্ড শুনতে প্লে বাটনে ক্লিক করে ভলিউম অন করুন
              </p>
            </div>

            {/* Right: Key Video Highlights & Order CTA */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/90 px-3 py-1 rounded-md">
                  ভিডিওর মূল আকর্ষণ
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  শিশুর হাতে দিলে মোবাইল দেখা এমনিতেই ভুলে যাবে!
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  বইটির প্রতিটি পাতায় হাত দিলেই মিষ্টি সুরে কথা বলে ওঠে। শিশু নিজে নিজে স্পর্শ করে বাংলা, ইংরেজি ও আরবি ভাষা শিখতে পারে।
                </p>
              </div>

              {/* Feature Points Checked in the Video */}
              <div className="space-y-3.5">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <BatteryCharging className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">টাইপ-সি চার্জিং (কোনো ব্যাটারি লাগে না)</h4>
                    <p className="text-xs text-slate-600">মোবাইলের চার্জার দিয়েই খুব সহজে চার্জ দেওয়া যায়। বারবার ব্যাটারি কেনার কোনো বাড়তি খরচ নেই।</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Volume2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">৩ ভাষায় ১০০% শুদ্ধ ডিজিটাল সাউন্ড</h4>
                    <p className="text-xs text-slate-600">বাংলা বর্ণমালা, ইংরেজি Alphabet ও আরবি হরফ শুদ্ধ মাখরাজ ও ফনিক্স উচ্চারণে শোনার সুবিধা।</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">৫-ইন-১ ফুল কম্বো আইটেম</h4>
                    <p className="text-xs text-slate-600">টকিং বুক, ৮.৫" এলসিডি ড্রয়িং ট্যাবলেট, ওয়াটার ম্যাজিক বুক, ২টি পেন ও ক্যাবল এক সাথে।</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50/80 border border-emerald-200">
                  <div className="w-8 h-8 rounded-lg bg-emerald-200 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-950">সারা বাংলাদেশে ফ্রি ডেলিভারি (চার্জ ৳০)</h4>
                    <p className="text-xs text-emerald-800">ক্যাশ অন ডেলিভারিতে পার্সেল হাতে পেয়ে দেখে ডেলিভারিম্যানকে {formatTaka(STORE_CONFIG.product.currentPrice)} টাকা পরিশোধ করবেন।</p>
                  </div>
                </div>
              </div>

              {/* Order Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={scrollToOrder}
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-lg hover:shadow-xl active:scale-[0.99] transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>ভিডিও দেখে পছন্দ হলে অর্ডার করুন ({formatTaka(STORE_CONFIG.product.currentPrice)})</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
