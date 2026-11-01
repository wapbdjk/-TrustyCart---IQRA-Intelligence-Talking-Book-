import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { ProductFeatures } from './components/ProductFeatures.tsx';
import { PackageContents } from './components/PackageContents.tsx';
import { HowToUse } from './components/HowToUse.tsx';
import { OrderForm } from './components/OrderForm.tsx';
import { FAQSection } from './components/FAQSection.tsx';
import { TrustAndPolicies } from './components/TrustAndPolicies.tsx';
import { Footer } from './components/Footer.tsx';
import { OrderConfirmationModal } from './components/OrderConfirmationModal.tsx';
import { MerchantAdminModal } from './components/MerchantAdminModal.tsx';
import { ImageGalleryModal } from './components/ImageGalleryModal.tsx';
import { Order } from './types.ts';
import { STORE_CONFIG } from './config/storeConfig.ts';
import { formatTaka } from './services/orderService.ts';
import { pixelService } from './services/pixelService.ts';
import { ShoppingBag, PhoneCall } from 'lucide-react';

export default function App() {
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isLocalFallback, setIsLocalFallback] = useState(false);
  
  const [isAdminOpen, setIsAdminOpen] = useState(false);
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
    <div className="min-h-screen bg-white text-slate-900 font-bengali flex flex-col selection:bg-blue-100 selection:text-blue-900">
      
      {/* 1. Navigation Top Bar */}
      <Header 
        onOpenAdmin={() => setIsAdminOpen(true)} 
        onOpenGallery={() => handleOpenGallery(0)}
      />

      <main className="flex-1">
        {/* 2. Strong Hero Section (Product Image, Name, Short Benefits, Actual Price ৳৯৯৯, Order Now button) */}
        <HeroSection onOpenGallery={handleOpenGallery} />

        {/* 3. Product Features (5 simple visual cards on clean white) */}
        <ProductFeatures />

        {/* 4. Exactly What Is Included in the Package (5-in-1 Combo) */}
        <PackageContents />

        {/* 5. Simple How to Use Section (4 easy steps) */}
        <HowToUse />

        {/* 6. Clear and Easy Order Form (Name, Mobile, Address, Quantity, Total, Confirm Button) */}
        <OrderForm onOrderSuccess={handleOrderSuccess} />

        {/* 7. 4 Useful FAQ Questions */}
        <FAQSection />

        {/* 8. Trust & Policies (COD, Free delivery, Parcel checking, Quality assurance) */}
        <TrustAndPolicies />
      </main>

      {/* 9. Clean Footer */}
      <Footer 
        onOpenAdmin={() => setIsAdminOpen(true)} 
        onOpenGallery={() => handleOpenGallery(0)}
      />

      {/* 10. Floating Slim Mobile Sticky CTA Bar (Under 15% mobile viewport cap) */}
      <aside aria-label="Quick order action" className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 shadow-lg flex items-center justify-between gap-3">
        <div>
          <span className="text-[11px] text-slate-500 block leading-tight">ক্যাশ অন ডেলিভারি</span>
          <span className="text-lg font-black text-blue-700 font-ui tabular-nums">
            {formatTaka(STORE_CONFIG.product.currentPrice)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {STORE_CONFIG.helplinePhone && !STORE_CONFIG.helplinePhone.includes('[') && (
            <a
              href={`tel:${STORE_CONFIG.helplinePhone}`}
              className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              title="কল করুন"
            >
              <PhoneCall className="w-5 h-5 text-blue-600" />
            </a>
          )}

          <button
            onClick={scrollToOrder}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-98 shadow-sm transition-all cursor-pointer whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4 text-amber-300" />
            <span>অর্ডার করুন</span>
          </button>
        </div>
      </aside>

      {/* Order Confirmation Modal (only displayed upon successful order submission) */}
      <OrderConfirmationModal
        order={confirmedOrder}
        isOpen={isConfirmationOpen}
        isLocalFallback={isLocalFallback}
        onClose={() => setIsConfirmationOpen(false)}
      />

      {/* PIN-Protected Merchant Admin Modal */}
      <MerchantAdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Product Image Gallery Modal */}
      <ImageGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        initialIndex={galleryIndex}
      />

    </div>
  );
}
