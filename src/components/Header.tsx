import React, { useState } from 'react';
import { ShoppingBag, PhoneCall, Menu, X, ShieldCheck } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig.ts';

interface HeaderProps {
  onOpenAdmin: () => void;
  onOpenGuide: () => void;
  onOpenGallery?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAdmin, onOpenGuide, onOpenGallery }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const hasRealPhone = STORE_CONFIG.helplinePhone && !STORE_CONFIG.helplinePhone.includes('[');

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-amber-100 shadow-xs">
      {/* Top announcement bar - Free Delivery & 5-in-1 Combo in Bangladesh */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white text-xs py-1.5 px-4 text-center font-bold tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-200" />
          <span>সারা বাংলাদেশে ফ্রি হোম ডেলিভারি (চার্জ: ৳০) · ৫-ইন-১ সম্পূর্ণ কম্বো অফার · ক্যাশ অন ডেলিভারি</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-16">
          {/* Zone 1: Wordmark */}
          <div className="flex items-center gap-2 shrink-0">
            <a 
              href="#" 
              className="text-2xl font-bold tracking-tight text-slate-900 font-ui hover:text-amber-600 transition-colors whitespace-nowrap"
            >
              Trusty<span className="text-amber-500">Cart</span>
            </a>
          </div>

          {/* Zone 2: Navigation Links based on user-requested simplified flow */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-sm font-medium text-slate-700">
            <button 
              onClick={() => scrollToSection('video-section')} 
              className="hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer text-amber-700 font-semibold"
            >
              ভিডিও ডেমো
            </button>
            <button 
              onClick={() => scrollToSection('package')} 
              className="hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              কম্বোতে যা পাবেন
            </button>
            <button 
              onClick={() => scrollToSection('pricing')} 
              className="hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              দাম ও অফার
            </button>
            <button 
              onClick={() => scrollToSection('faq')} 
              className="hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              শর্ত ও প্রশ্নোত্তর
            </button>
            {onOpenGallery && (
              <button 
                onClick={onOpenGallery} 
                className="hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer text-amber-700 bg-amber-50 hover:bg-amber-100/80 px-2.5 py-1 rounded-lg text-xs font-bold border border-amber-200"
                title="আসল ৩টি ছবি বড় করে দেখুন"
              >
                📸 আসল ছবি
              </button>
            )}
          </nav>

          {/* Zone 3: 1 primary action button + Phone Placeholder */}
          <div className="flex items-center gap-3 shrink-0">
            {hasRealPhone && (
              <a
                href={`tel:${STORE_CONFIG.helplinePhone}`}
                className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-amber-600 px-3 py-2 rounded-lg bg-amber-50/70 transition-colors"
                title="হেল্পলাইন"
              >
                <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
                <span>{STORE_CONFIG.helplinePhone}</span>
              </a>
            )}

            <button
              onClick={() => scrollToSection('order-section')}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-amber-600 hover:bg-amber-700 active:scale-98 rounded-xl shadow-sm transition-all whitespace-nowrap cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>এখনই অর্ডার করুন</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFDF9] border-b border-amber-200 px-4 pt-3 pb-5 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2 text-base font-medium text-slate-800">
            <button 
              onClick={() => scrollToSection('video-section')} 
              className="text-left py-2 px-3 rounded-lg hover:bg-amber-50 text-amber-700 font-semibold"
            >
              ভিডিও ডেমো
            </button>
            <button 
              onClick={() => scrollToSection('package')} 
              className="text-left py-2 px-3 rounded-lg hover:bg-amber-50"
            >
              কম্বোতে যা যা পাবেন
            </button>
            <button 
              onClick={() => scrollToSection('pricing')} 
              className="text-left py-2 px-3 rounded-lg hover:bg-amber-50"
            >
              দাম ও অফার
            </button>
            <button 
              onClick={() => scrollToSection('order-section')} 
              className="text-left py-2 px-3 rounded-lg hover:bg-amber-50"
            >
              অর্ডার ফর্ম
            </button>
            <button 
              onClick={() => scrollToSection('faq')} 
              className="text-left py-2 px-3 rounded-lg hover:bg-amber-50"
            >
              শর্ত ও প্রশ্নোত্তর
            </button>
            {onOpenGallery && (
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenGallery();
                }} 
                className="text-left py-2 px-3 rounded-lg bg-amber-50 text-amber-900 font-bold flex items-center justify-between"
              >
                <span>📸 আসল ৩টি প্রোডাক্টের ছবি</span>
              </button>
            )}
            
            {hasRealPhone && (
              <div className="pt-2 border-t border-slate-200">
                <a 
                  href={`tel:${STORE_CONFIG.helplinePhone}`}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-amber-50 text-amber-900 text-xs font-medium"
                >
                  <PhoneCall className="w-4 h-4 text-amber-600" />
                  <span>হেল্পলাইন: {STORE_CONFIG.helplinePhone}</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
