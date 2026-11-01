import React, { useState } from 'react';
import { ShoppingBag, PhoneCall, Menu, X, ShieldCheck } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig.ts';

interface HeaderProps {
  onOpenAdmin: () => void;
  onOpenGuide?: () => void;
  onOpenGallery?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAdmin, onOpenGallery }) => {
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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top announcement bar - Blue & Yellow theme with Free Delivery Notice */}
      <div className="bg-blue-900 text-white text-xs py-2 px-4 text-center font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 shrink-0 text-amber-400" />
          <span>
            সারা বাংলাদেশে ফ্রি ডেলিভারি (৳০) <span className="text-amber-400 font-bold">·</span> ১০০% ক্যাশ অন ডেলিভারি <span className="text-amber-400 font-bold">·</span> পার্সেল দেখে পেমেন্ট
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Wordmark */}
          <div className="flex items-center gap-2 shrink-0">
            <a 
              href="#" 
              className="text-2xl font-bold tracking-tight text-blue-950 font-ui hover:text-blue-700 transition-colors whitespace-nowrap"
            >
              Trusty<span className="text-amber-500">Cart</span>
            </a>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-slate-700">
            <button 
              onClick={() => scrollToSection('features')} 
              className="hover:text-blue-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              মূল বৈশিষ্ট্য
            </button>
            <button 
              onClick={() => scrollToSection('package')} 
              className="hover:text-blue-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              কম্বোতে যা পাবেন
            </button>
            <button 
              onClick={() => scrollToSection('how-to-use')} 
              className="hover:text-blue-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              ব্যবহারবিধি
            </button>
            <button 
              onClick={() => scrollToSection('faq')} 
              className="hover:text-blue-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              প্রশ্নোত্তর
            </button>
            {onOpenGallery && (
              <button 
                onClick={onOpenGallery} 
                className="text-blue-700 hover:text-blue-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer font-semibold"
              >
                প্রোডাক্ট ছবি
              </button>
            )}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            {hasRealPhone && (
              <a
                href={`tel:${STORE_CONFIG.helplinePhone}`}
                className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-blue-700 px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200"
                title="হেল্পলাইন"
              >
                <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
                <span className="font-ui tabular-nums">{STORE_CONFIG.helplinePhone}</span>
              </a>
            )}

            <button
              onClick={() => scrollToSection('order-section')}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-98 rounded-xl shadow-xs transition-all whitespace-nowrap cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>অর্ডার করুন</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2 text-base font-medium text-slate-800">
            <button 
              onClick={() => scrollToSection('features')} 
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-50"
            >
              মূল বৈশিষ্ট্য
            </button>
            <button 
              onClick={() => scrollToSection('package')} 
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-50"
            >
              কম্বোতে যা পাবেন
            </button>
            <button 
              onClick={() => scrollToSection('how-to-use')} 
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-50"
            >
              ব্যবহারবিধি
            </button>
            <button 
              onClick={() => scrollToSection('faq')} 
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-50"
            >
              প্রশ্নোত্তর
            </button>
            <button 
              onClick={() => scrollToSection('order-section')} 
              className="text-left py-2 px-3 rounded-lg bg-blue-50 text-blue-800 font-bold flex items-center justify-between"
            >
              <span>অর্ডার ফর্ম (৳৯৯৯)</span>
              <ShoppingBag className="w-4 h-4" />
            </button>
            
            {hasRealPhone && (
              <div className="pt-2 border-t border-slate-100">
                <a 
                  href={`tel:${STORE_CONFIG.helplinePhone}`}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-slate-50 text-slate-800 text-xs font-semibold border border-slate-200"
                >
                  <PhoneCall className="w-4 h-4 text-blue-600" />
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
