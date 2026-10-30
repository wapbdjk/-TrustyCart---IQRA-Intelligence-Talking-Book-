import React from 'react';
import { 
  X, 
  Globe, 
  CheckSquare, 
  FileCode, 
  DollarSign, 
  UploadCloud, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface NetlifySetupGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NetlifySetupGuideModal: React.FC<NetlifySetupGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl my-6 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-slate-900 px-6 py-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold">
                Netlify ডিপ্লয় ও ফেসবুক অ্যাডস লঞ্চ গাইড
              </h3>
              <p className="text-xs text-slate-400">
                নতুনদের জন্য সহজ বাংলা নির্দেশিকা ও প্রি-লঞ্চ চেকলিস্ট
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-slate-800 text-sm">
          
          {/* Step 1: Netlify Deployment */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-base font-bold text-amber-700">
              <Globe className="w-5 h-5" />
              <span>ধাপ ১: ৩ মিনিটে সম্পূর্ণ ফ্রিতে Netlify-তে ওয়েবসাইট লাইভ করুন</span>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs sm:text-sm">
              <p>এই প্রজেক্টটিতে ইতিমধ্যে <strong>`netlify.toml`</strong> ফাইল কনফিগার করা আছে। আপনি দুটি উপায়ে লাইভ করতে পারেন:</p>
              
              <ol className="list-decimal pl-5 space-y-1.5 text-slate-700">
                <li>
                  <strong>পদ্ধতি ক (GitHub অটো-ডিপ্লয় - সেরা):</strong> আপনার GitHub রিপোজিটরিতে কোড পুশ করুন। এরপর <a href="https://app.netlify.com" target="_blank" rel="noreferrer" className="text-amber-700 underline font-semibold">Netlify.com</a>-এ ফ্রি একাউন্ট খুলে <em>"Import an existing project from GitHub"</em> নির্বাচন করুন। Build Command হবে <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">npm run build</code> এবং Publish Directory হবে <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">dist</code>।
                </li>
                <li>
                  <strong>পদ্ধতি খ (Drag & Drop):</strong> টার্মিনালে <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">npm run build</code> রান করলে <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">dist</code> ফোল্ডার তৈরি হবে। সেই ফোল্ডারটি Netlify এর ড্র্যাগ-অ্যান্ড-ড্রপ উইন্ডোতে টেনে এনে ছেড়ে দিলেই সাইট সাথে সাথে লাইভ হয়ে যাবে!
                </li>
              </ol>
            </div>
          </div>

          {/* Step 2: Customizing Price & Phone */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-base font-bold text-blue-700">
              <DollarSign className="w-5 h-5" />
              <span>ধাপ ২: কীভাবে পণ্যের দাম, ছবি ও হেল্পলাইন নম্বর পরিবর্তন করবেন?</span>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs sm:text-sm">
              <p>আপনাকে অনেকগুলো ফাইলে হাত দিতে হবে না। শুধুমাত্র একটি ফাইলে সব সেটিং দেওয়া আছে:</p>
              <div className="p-3 bg-slate-900 text-amber-300 font-mono text-xs rounded-xl">
                src/config/storeConfig.ts
              </div>
              <ul className="list-disc pl-5 space-y-1 text-slate-700 text-xs sm:text-sm">
                <li><strong>মূল্য পরিবর্তন:</strong> <code className="font-mono text-amber-700">currentPrice: 999</code> এবং <code className="font-mono text-amber-700">regularPrice: 1450</code> নির্ধারণ করা আছে।</li>
                <li><strong>ডেলিভারি চার্জ:</strong> সারা বাংলাদেশে ফ্রি ডেলিভারির জন্য <code className="font-mono text-amber-700">deliveryFeeDhaka: 0</code> ও <code className="font-mono text-amber-700">deliveryFeeOutsideDhaka: 0</code> দেওয়া রয়েছে।</li>
                <li><strong>মোবাইল ও হোয়াটসঅ্যাপ নম্বর:</strong> <code className="font-mono text-amber-700">helplinePhone</code> ও <code className="font-mono text-amber-700">whatsappNumber</code> ফিল্ডে <code className="font-mono bg-slate-200 px-1 rounded">[YOUR PHONE NUMBER]</code>-এর জায়গায় আপনার আসল নম্বর বসিয়ে দিন।</li>
                <li><strong>প্রোডাক্ট ভিডিও যুক্ত করা:</strong> <code className="font-mono text-amber-700">video.videoUrl</code> এ আপনার ইউটিউব লিংক বা <code className="font-mono">/videos/my_video.mp4</code> বসিয়ে দিন।</li>
                <li><strong>ছবি পরিবর্তন:</strong> <code className="font-mono text-amber-700">src/assets/images/</code> ফোল্ডারে নতুন ছবি রেখে <code className="font-mono text-amber-700">storeConfig.ts</code> ফাইলে পাথ আপডেট করুন।</li>
              </ul>
            </div>
          </div>

          {/* Step 3: Facebook Ads Launch Checklist */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-base font-bold text-emerald-700">
              <CheckSquare className="w-5 h-5" />
              <span>ধাপ ৩: ফেসবুক ও ইনস্টাগ্রাম অ্যাড ছাড়ার আগে চেকলিস্ট</span>
            </div>

            <div className="space-y-2">
              {[
                { title: 'টেস্ট অর্ডার যাচাই:', desc: 'ল্যান্ডিং পেজে নিজের মোবাইল ও ঠিকানা দিয়ে একটি টেস্ট অর্ডার দিন এবং অর্ডারটি ড্যাশবোর্ডে এসেছে কি না দেখুন।' },
                { title: 'Meta Pixel ID সেটআপ:', desc: 'মার্চেন্ট প্যানেলে আপনার সঠিক Facebook Pixel ID দিয়ে সেভ করুন এবং ব্রাউজারে Meta Pixel Helper এক্সটেনশনে ইভেন্টগুলো গ্রিন দেখায় কি না নিশ্চিত হোন।' },
                { title: 'ডেলিভারি চার্জ নির্ভুলতা:', desc: 'ঢাকা নির্বাচন করলে ৳৭০ এবং অন্যান্য জেলা নির্বাচন করলে ৳১৩০ স্বয়ংক্রিয়ভাবে ক্যালকুলেট হচ্ছে কি না চেক করুন।' },
                { title: 'মোবাইল রেসপন্সিভনেস:', desc: 'Android ফোনে পেজটি খুলে বাটনগুলো সহজে ক্লিক করা যায় কি না এবং লেখার ফন্ট ক্লিয়ার দেখাচ্ছে কি না দেখুন।' },
                { title: 'হোয়াটসঅ্যাপ লিঙ্ক টেস্ট:', desc: 'হোয়াটসঅ্যাপ বাটনে ক্লিক করলে আপনার বিজনেস নম্বরে সঠিক মেসেজ যায় কি না যাচাই করুন।' },
                { title: 'কুরিয়ার CSV এক্সপোর্ট:', desc: 'ড্যাশবোর্ড থেকে "কুরিয়ার CSV ডাউনলোড" করে আপনার কুরিয়ার প্যানেলে (Steadfast/RedX/Pathao) আপলোড ফরম্যাট ঠিক আছে কি না নিশ্চিত হোন।' },
              ].map((c, i) => (
                <div key={i} className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/80 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block text-xs sm:text-sm">{c.title}</strong>
                    <span className="text-slate-600 text-xs">{c.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Backend & Production Notice */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-2">
            <div className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>সার্ভার ও অর্ডার ডেটা নিরাপত্তা নোট:</span>
            </div>
            <p className="leading-relaxed">
              এই সিস্টেমে লোকাল ডেভেলপমেন্টে Express ব্যাকএন্ড দিয়ে <code className="font-mono bg-white px-1 py-0.5 rounded">data/orders.json</code> ফাইলে অর্ডার সেভ হয়। Netlify-তে স্ট্যাটিক হোস্ট করলেও ব্রাউজার লোকাল ভল্ট থেকে এক ক্লিকে সম্পূর্ণ CSV এক্সপোর্ট করা যায়। ভবিষ্যতে চাইলে Netlify Functions বা Google Sheets Webhook-এর সাথে ২ মিনিটে সংযুক্ত করা সম্ভব।
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
