import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { InsideBookSection } from './components/InsideBookSection.tsx';
import { SmartButtonsSection } from './components/SmartButtonsSection.tsx';
import { InteractiveAudioDemo } from './components/InteractiveAudioDemo.tsx';
import { ProductFeatures } from './components/ProductFeatures.tsx';
import { PackageContents } from './components/PackageContents.tsx';
import { HowToUse } from './components/HowToUse.tsx';
import { CustomerReviews } from './components/CustomerReviews.tsx';
import { PricingSection } from './components/PricingSection.tsx';
import { OrderForm } from './components/OrderForm.tsx';
import { TrustAndPolicies } from './components/TrustAndPolicies.tsx';
import { FAQSection } from './components/FAQSection.tsx';
import { Footer } from './components/Footer.tsx';
import { OrderConfirmationModal } from './components/OrderConfirmationModal.tsx';
import { MerchantAdminModal } from './components/MerchantAdminModal.tsx';
import { NetlifySetupGuideModal } from './components/NetlifySetupGuideModal.tsx';
import { ImageGalleryModal } from './components/ImageGalleryModal.tsx';
import { Order } from './types.ts';
import { STORE_CONFIG } from './config/storeConfig.ts';
import { formatTaka } from './services/orderService.ts';
import { pixelService } from './services/pixelService.ts';
import { ShoppingBag, PhoneCall } from 'lucide-react';

export default function App() {
  // Modal states
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isLocalFallback, setIsLocalFallback] = useState(false);
  
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const handleOpenGallery = (index: number = 0) => {
    setGalleryIndex(index);
    setIsGalleryOpen(true);
  };

  // Initial Meta Pixel pageview and viewcontent tracking
  useEffect(() => {
    pixelService.trackPageView();
    pixelService.trackViewContent(
      STORE_CONFIG.product.nameEn,
      STORE_CONFIG.product.currentPrice
    );
  }, []);

  const handleOrderSuccess = (order: Order, fallback?: boolean) => {
    setConfirmedOrder(order);
    setIsLocalFallback(Boolean(fallback));
    setIsConfirmationOpen(true);
  };

  const scrollToOrder = () => {
    const el = document.getElementById('order-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-slate-900 font-bengali flex flex-col selection:bg-amber-200 selection:text-amber-900">
      
      {/* Navigation Top Bar */}
      <Header 
        onOpenAdmin={() => setIsAdminOpen(true)} 
        onOpenGuide={() => setIsGuideOpen(true)} 
        onOpenGallery={() => handleOpenGallery(0)}
      />

      <main className="flex-1">
        {/* 1. Hero Section (Headline, Media, Pricing, 1-Year Warranty & Free Delivery Badges) */}
        <HeroSection onOpenGallery={handleOpenGallery} />

        {/* 2. Inside The Book (64 Pages, 100+ Content) & 5 Skill Developments */}
        <InsideBookSection />

        {/* 3. 4 Smart Interactive Buttons (Recording, Question, Read, Volume) & Technical Specs */}
        <SmartButtonsSection />

        {/* 4. Interactive Audio Simulator / Phonics Sound Demo */}
        <InteractiveAudioDemo />

        {/* 5. Product Features & Verified Specifications Table */}
        <ProductFeatures />

        {/* 6. Package Contents & Unboxing Checklist (64 pages, touch pen, marker, type-C, warranty card) */}
        <PackageContents />

        {/* 7. How To Use Step-by-Step Guide */}
        <HowToUse />

        {/* 8. Authentic Customer Reviews & Ratings (4.9/5 from 480+ parents) */}
        <CustomerReviews />

        {/* 9. Pricing & Delivery Charges Breakdown (৳999, Free Delivery, 1-Year Warranty) */}
        <PricingSection onScrollToOrder={scrollToOrder} />

        {/* 10. Bengali Order Form (Cash on Delivery) */}
        <OrderForm onOrderSuccess={handleOrderSuccess} />

        {/* 11. Trust & Policies (COD, 1-Year Replacement Warranty Policy, Customer Care) */}
        <TrustAndPolicies />

        {/* 12. Frequently Asked Questions (FAQ) */}
        <FAQSection />
      </main>

      {/* Footer with Business Contacts & Admin Links */}
      <Footer 
        onOpenAdmin={() => setIsAdminOpen(true)} 
        onOpenGuide={() => setIsGuideOpen(true)} 
        onOpenGallery={() => handleOpenGallery(0)}
      />

      {/* Floating Slim Mobile Sticky CTA Bar (under 15% mobile viewport cap) */}
      <aside aria-label="Quick order action" className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-amber-200 px-4 py-2.5 shadow-lg flex items-center justify-between gap-3">
        <div>
          <span className="text-[11px] text-slate-500 block leading-tight">ক্যাশ অন ডেলিভারি</span>
          <span className="text-lg font-black text-amber-600 font-ui tabular-nums">
            {formatTaka(STORE_CONFIG.product.currentPrice)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {STORE_CONFIG.helplinePhone && !STORE_CONFIG.helplinePhone.includes('[') ? (
            <a
              href={`tel:${STORE_CONFIG.helplinePhone}`}
              className="p-2.5 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors"
              title="কল করুন"
            >
              <PhoneCall className="w-5 h-5" />
            </a>
          ) : (
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
              title="যোগাযোগ"
            >
              <PhoneCall className="w-5 h-5" />
            </button>
          )}

          <button
            onClick={scrollToOrder}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-amber-600 to-orange-600 shadow-md active:scale-98 transition-all cursor-pointer whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>অর্ডার করুন</span>
          </button>
        </div>
      </aside>

      {/* Order Confirmation Modal */}
      <OrderConfirmationModal
        order={confirmedOrder}
        isOpen={isConfirmationOpen}
        isLocalFallback={isLocalFallback}
        onClose={() => setIsConfirmationOpen(false)}
      />

      {/* Merchant Admin & Meta Pixel Modal */}
      <MerchantAdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Netlify Deployment & Facebook Ads Launch Guide Modal */}
      <NetlifySetupGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* Product Image Gallery & HD Download Modal */}
      <ImageGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        initialIndex={galleryIndex}
      />

    </div>
  );
}
