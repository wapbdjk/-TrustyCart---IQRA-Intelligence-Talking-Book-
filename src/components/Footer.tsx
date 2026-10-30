import { Phone, Mail, MapPin, Clock, ShieldCheck, Settings, FileCode, Image as ImageIcon } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig.ts';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenGuide: () => void;
  onOpenGallery?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenGuide, onOpenGallery }) => {
  const hasRealPhone = STORE_CONFIG.helplinePhone && !STORE_CONFIG.helplinePhone.includes('[');
  const hasRealEmail = STORE_CONFIG.supportEmail && !STORE_CONFIG.supportEmail.includes('[');

  return (
    <footer id="contact" className="bg-slate-900 text-slate-300 pt-14 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand & Purpose */}
          <div className="lg:col-span-5 space-y-3.5">
            <span className="text-2xl font-bold tracking-tight text-white font-ui block">
              Trusty<span className="text-amber-500">Cart</span>
            </span>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              বাংলাদেশের শিশুদের আধুনিক, মননশীল ও আনন্দের সাথে শেখার উপযুক্ত শিক্ষামূলক খেলনা ও সামগ্রী সরবরাহে একটি বিশ্বস্ত ই-কমার্স প্রতিষ্ঠান।
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 pt-1 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>সারা বাংলাদেশে ফ্রি ডেলিভারি (৳০) · ক্যাশ অন ডেলিভারি</span>
            </div>
          </div>

          {/* Contact Details with Placeholders */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              কাস্টমার সাপোর্ট ও যোগাযোগ
            </h4>
            
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                {hasRealPhone ? (
                  <a href={`tel:${STORE_CONFIG.helplinePhone}`} className="hover:text-white transition-colors">
                    {STORE_CONFIG.helplinePhone}
                  </a>
                ) : (
                  <span className="font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                    [YOUR PHONE NUMBER]
                  </span>
                )}
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                {hasRealEmail ? (
                  <a href={`mailto:${STORE_CONFIG.supportEmail}`} className="hover:text-white transition-colors">
                    {STORE_CONFIG.supportEmail}
                  </a>
                ) : (
                  <span className="font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded text-xs">
                    [YOUR EMAIL ADDRESS]
                  </span>
                )}
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{STORE_CONFIG.businessAddress}</span>
              </li>
              <li className="flex items-center gap-2.5 text-xs text-slate-400">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{STORE_CONFIG.supportHoursBn}</span>
              </li>
            </ul>
          </div>

          {/* Quick Business Tools & Policy */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              ব্যবসা ও মার্চেন্ট প্যানেল
            </h4>
            
            <div className="space-y-2 text-xs text-slate-400">
              <button
                onClick={onOpenAdmin}
                className="w-full flex items-center gap-2 p-2.5 rounded-lg bg-slate-800/90 hover:bg-slate-800 text-slate-200 hover:text-white transition-colors text-left cursor-pointer border border-slate-700/60"
              >
                <Settings className="w-4 h-4 text-amber-500 shrink-0" />
                <span>অর্ডার তালিকা ও কুরিয়ার CSV এক্সপোর্ট</span>
              </button>

              <button
                onClick={onOpenGuide}
                className="w-full flex items-center gap-2 p-2.5 rounded-lg bg-slate-800/90 hover:bg-slate-800 text-slate-200 hover:text-white transition-colors text-left cursor-pointer border border-slate-700/60"
              >
                <FileCode className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Netlify ডিপ্লয় ও Ads গাইড</span>
              </button>

              {onOpenGallery && (
                <button
                  onClick={onOpenGallery}
                  className="w-full flex items-center gap-2 p-2.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 hover:text-amber-200 transition-colors text-left cursor-pointer border border-amber-500/30"
                >
                  <ImageIcon className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>বিজ্ঞাপন ও ফেসবুক পোস্টের HD ছবি</span>
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} TrustyCart. সর্বস্বত্ব সংরক্ষিত।
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span>ক্যাশ অন ডেলিভারি</span>
            <span aria-hidden="true">·</span>
            <span>সারা দেশে ফ্রি ডেলিভারি</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-400 font-semibold">১ বছরের অফিসিয়াল ওয়ারেন্টি</span>
            <span aria-hidden="true">·</span>
            <span>নিরাপদ কেনাকাটা</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
