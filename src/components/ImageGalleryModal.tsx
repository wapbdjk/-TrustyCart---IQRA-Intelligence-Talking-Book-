import React, { useState } from 'react';
import { X, Download, ExternalLink, Image as ImageIcon, Sparkles, Check, Copy } from 'lucide-react';

interface ImageGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export interface ProductPhoto {
  id: string;
  titleBn: string;
  titleEn: string;
  filename: string;
  url: string;
  resolution: string;
  tag: string;
  description: string;
  adUsageTip: string;
}

export const PRODUCT_PHOTOS: ProductPhoto[] = [
  {
    id: 'combo',
    titleBn: '১. সম্পূর্ণ ৫-ইন-১ কম্বো সেট',
    titleEn: 'Full 5-in-1 Combo Pack with Talking Book, LCD Tablet & Water Magic Book',
    filename: 'combo_full_package.jpg',
    url: '/images/combo_full_package.jpg',
    resolution: '1000 x 1000 px (HD)',
    tag: 'প্রধান কম্বো ছবি',
    description: 'IQRA টকিং বুক, ৮.৫ ইঞ্চি কালারফুল LCD রাইটিং ট্যাবলেট, ওয়াটার ম্যাজিক বুক, ২টি স্পেশাল মার্কার ও ইউএসবি চার্জিং কেবল।',
    adUsageTip: 'ফেসবুক ও ইনস্টাগ্রাম ফিড অ্যাডের প্রধান থাম্বনেইল হিসেবে ব্যবহারের জন্য সবচেয়ে উপযুক্ত।'
  },
  {
    id: 'tablet',
    titleBn: '২. টকিং বুক ও ৮.৫" LCD কালারফুল রাইটিং ট্যাবলেট',
    titleEn: 'IQRA Talking Book & 8.5 Inch LCD Writing Tablet',
    filename: 'talking_book_with_lcd_tablet.jpg',
    url: '/images/talking_book_with_lcd_tablet.jpg',
    resolution: '1000 x 1000 px (HD)',
    tag: 'টকিং বুক ও স্লেট',
    description: 'শিশুর পড়ার জন্য সাউন্ড বুক এবং আঁকাআঁকি ও লেখার জন্য রঙিন ডিজিটাল স্লেট—এক সাথে দুটি গ্যাজেট।',
    adUsageTip: 'বাচ্চার পড়ার পাশাপাশি লেখার সুযোগ রয়েছে তা বোঝাতে এই ছবি পোস্ট করুন।'
  },
  {
    id: 'waterMagic',
    titleBn: '৩. IQRA ওয়াটার ম্যাজিক বুক ও স্পেশাল পেন',
    titleEn: 'IQRA Water Magic Book & Pens',
    filename: 'water_magic_book.jpg',
    url: '/images/water_magic_book.jpg',
    resolution: '1000 x 1000 px (HD)',
    tag: 'ম্যাজিক বুক',
    description: 'পানি দিয়ে ছবি আঁকার পর কয়েক মিনিট পর শুকিয়ে গেলে আবার আগের মতো হয়ে যায়, বারবার ব্যবহারযোগ্য।',
    adUsageTip: 'কালারফুল ড্রয়িং ও পেইন্টিং ফিচার তুলে ধরতে এই ছবি ব্যবহার করুন।'
  }
];

export const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({
  isOpen,
  onClose,
  initialIndex = 0
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(initialIndex);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const currentPhoto = PRODUCT_PHOTOS[selectedIndex] || PRODUCT_PHOTOS[0];

  const handleCopyLink = () => {
    const fullUrl = window.location.origin + currentPhoto.url;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  const handleDownload = (photo: ProductPhoto) => {
    const downloadUrl = `/api/download/${photo.filename}`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', photo.filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
      <div 
        className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-amber-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gallery-title"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 id="gallery-title" className="text-lg sm:text-xl font-bold font-ui">
                IQRA টকিং বুকের আসল ছবি গ্যালারি ও ডাউনলোড
              </h3>
              <p className="text-xs text-amber-100">
                বিজ্ঞাপন, ফেসবুক পেজ ও কাস্টমারকে দেখানোর জন্য হাই-রেজ্যুলুশন (HD) ছবি
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Main Selected Image Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
            {/* Left: Big Preview */}
            <div className="md:col-span-7 flex flex-col items-center">
              <div className="relative group w-full aspect-square max-w-[380px] bg-white rounded-2xl overflow-hidden border-2 border-amber-300 shadow-md">
                <img
                  src={currentPhoto.url}
                  alt={currentPhoto.titleBn}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-amber-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm">
                  {currentPhoto.tag}
                </span>
                <span className="absolute bottom-3 right-3 bg-slate-900/80 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-xs">
                  {currentPhoto.resolution}
                </span>
              </div>
            </div>

            {/* Right: Image Info & Actions */}
            <div className="md:col-span-5 space-y-4">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
                  ছবি #{selectedIndex + 1}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {currentPhoto.titleBn}
                </h4>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  {currentPhoto.titleEn}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {currentPhoto.description}
              </p>

              <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold">বিজ্ঞাপনের পরামর্শ:</strong> {currentPhoto.adUsageTip}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleDownload(currentPhoto)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-md transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>এই ছবি ডাউনলোড করুন (HD)</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={currentPhoto.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                    <span>ফুল সাইজে দেখুন</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">লিংক কপি হয়েছে</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span>লিংক কপি করুন</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnail Grid - All 4 Images */}
          <div>
            <h5 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">
              সবগুলো ছবি সিলেক্ট করুন ({PRODUCT_PHOTOS.length}টি HD ছবি):
            </h5>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {PRODUCT_PHOTOS.map((photo, idx) => {
                const isSelected = selectedIndex === idx;
                return (
                  <div
                    key={photo.id}
                    onClick={() => setSelectedIndex(idx)}
                    className={`group cursor-pointer rounded-2xl p-2 border-2 transition-all text-left bg-white ${
                      isSelected
                        ? 'border-amber-500 ring-2 ring-amber-200 shadow-md bg-amber-50/30'
                        : 'border-slate-200 hover:border-amber-300 hover:shadow-xs'
                    }`}
                  >
                    <div className="aspect-square w-full rounded-xl overflow-hidden bg-slate-100 mb-2 relative">
                      <img
                        src={photo.url}
                        alt={photo.titleBn}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-1.5 left-1.5 bg-slate-900/80 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded">
                        #{idx + 1}
                      </span>
                    </div>
                    <div className="text-[11px] font-bold text-slate-900 line-clamp-1">
                      {photo.titleBn}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate mt-0.5">
                      {photo.tag}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Helpful Information Box for Facebook & Instagram Ads */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-blue-950 space-y-2">
            <h6 className="font-bold text-blue-900 flex items-center gap-1.5 text-sm">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>ফেসবুক ও ইনস্টাগ্রাম বিজ্ঞাপনে ব্যবহারের টিপস</span>
            </h6>
            <ul className="list-disc list-inside space-y-1 text-slate-700 leading-relaxed text-xs">
              <li>সবগুলো ছবি ১:১ স্কয়ার রেশিওতে তৈরি, ফলে মোবাইল ফিড, ক্যারোসেল ও স্টোরিতে স্পষ্টভাবে ফিট হয়।</li>
              <li>ক্যারোসেল বিজ্ঞাপনে ১ নম্বরে মূল বই, ২ নম্বরে ভেতরে কী আছে, ৩ নম্বরে প্যাকেজের আনবক্সিং এবং ৪ নম্বরে বাচ্চার ছবি রাখুন।</li>
              <li>কাস্টমার ইনবক্সে ছবি চাইলে এখান থেকে ডাউনলোড করে সরাসরি হোয়াটসঅ্যাপ বা মেসেঞ্জারে পাঠিয়ে দিন।</li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <div>
            মোট ৪টি প্রফেশনাল ফটো রেডি আছে।
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                PRODUCT_PHOTOS.forEach(p => handleDownload(p));
              }}
              className="px-3 py-1.5 rounded-lg bg-amber-100 text-amber-900 hover:bg-amber-200 font-bold transition-colors cursor-pointer"
            >
              এক ক্লিকে ৪টি ছবিই ডাউনলোড
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300 font-semibold transition-colors cursor-pointer"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
