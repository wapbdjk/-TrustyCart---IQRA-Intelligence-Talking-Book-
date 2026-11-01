import React from 'react';
import { Phone, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig.ts';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenGuide?: () => void;
  onOpenGallery?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenGallery }) => {
  const hasRealPhone = STORE_CONFIG.helplinePhone && !STORE_CONFIG.helplinePhone.includes('[');
  const hasRealEmail = STORE_CONFIG.supportEmail && !STORE_CONFIG.supportEmail.includes('[');

  return (
    <footer id="contact" className="bg-slate-900 text-slate-300 pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-8 border-b border-slate-800">
          
          {/* Brand */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-2xl font-bold tracking-tight text-white font-ui block">
              Trusty<span className="text-amber-500">Cart</span>
            </span>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              শিশুদের মেধা বিকাশ ও সুস্থ মননশীল শিক্ষার উপযোগী খেলনা ও বই সরবরাহে আপনার বিশ্বস্ত প্রতিষ্ঠান।
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>১০০% ক্যাশ অন ডেলিভারি · সারা দেশে ফ্রি হোম ডেলিভারি</span>
            </div>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              যোগাযোগ ও হেল্পলাইন
            </h4>
            
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                {hasRealPhone ? (
                  <a href={`tel:${STORE_CONFIG.helplinePhone}`} className="hover:text-white transition-colors font-ui">
                    {STORE_CONFIG.helplinePhone}
                  </a>
                ) : (
                  <span className="font-mono text-slate-400">[YOUR PHONE NUMBER]</span>
                )}
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                {hasRealEmail ? (
                  <a href={`mailto:${STORE_CONFIG.supportEmail}`} className="hover:text-white transition-colors">
                    {STORE_CONFIG.supportEmail}
                  </a>
                ) : (
                  <span className="font-mono text-slate-400">[YOUR EMAIL ADDRESS]</span>
                )}
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{STORE_CONFIG.businessAddress}</span>
              </li>
              <li className="flex items-center gap-2.5 text-xs text-slate-500">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{STORE_CONFIG.supportHoursBn}</span>
              </li>
            </ul>
          </div>

          {/* Quick links & Policies */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              সেবাসমূহ
            </h4>
            
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>✓ সারা বাংলাদেশে ফ্রি ডেলিভারি (৳০)</li>
              <li>✓ ক্যাশ অন ডেলিভারিতে পার্সেল চেক</li>
              <li>✓ ৫-ইন-১ সম্পূর্ণ কম্বো অফার</li>
              <li>✓ টাইপ-সি রিচার্জেবল সিস্টেম</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} TrustyCart. সর্বস্বত্ব সংরক্ষিত।</span>
            <button
              onClick={onOpenAdmin}
              className="text-slate-600 hover:text-slate-400 transition-colors cursor-pointer text-[11px]"
              title="অ্যাডমিন অ্যাক্সেস"
            >
              🔐 অ্যাডমিন
            </button>
          </div>

          <div className="flex items-center gap-3 text-slate-400">
            <span>ক্যাশ অন ডেলিভারি</span>
            <span aria-hidden="true">·</span>
            <span>ফ্রি ডেলিভারি</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400 font-medium">পার্সেল দেখে পেমেন্ট</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
