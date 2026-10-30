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
    id: 'hero',
    titleBn: '১. IQRA ইন্টেলিজেন্ট টকিং বুক ও স্মার্ট টাচ পেন',
    titleEn: 'Main Talking Book Cover & Stylus Pen',
    filename: 'iqra_talking_book_main.jpg',
    url: '/images/iqra_talking_book_main.jpg',
    resolution: '1024 x 1024 px (HD Square for FB & IG)',
    tag: 'প্রধান বিজ্ঞাপন ছবি',
    description: 'বইয়ের প্রিমিয়াম কাভার, ডিজিটাল বিল্ট-ইন স্পিকার ও স্পর্শ সংবেদনশীল স্মার্ট টাচ পেন। ফেসবুক ও ইনস্টাগ্রাম ফিড অ্যাডের জন্য সবচেয়ে কার্যকর।',
    adUsageTip: 'ফেসবুক ও ইনস্টাগ্রাম সিঙ্গেল ইমেজ অ্যাড বা ক্যারোসেলের প্রথম ছবির জন্য সেরা।'
  },
  {
    id: 'package',
    titleBn: '২. সম্পূর্ণ প্যাকেজ আনবক্সিং ও গিফট বক্স সেট',
    titleEn: 'Full Package Box Set & Unboxing',
    filename: 'iqra_talking_book_package.jpg',
    url: '/images/iqra_talking_book_package.jpg',
    resolution: '1024 x 1024 px (HD Square)',
    tag: 'প্যাকেজের ছবি',
    description: 'আসল গিফট বক্স, ৬৪ পৃষ্ঠার টকিং বুক, স্মার্ট টাচ পেন, ড্রয়িং মার্কার, টাইপ-সি (Type-C) চার্জিং কেবল ও ১ বছরের অফিসিয়াল ওয়ারেন্টি কার্ড।',
    adUsageTip: 'কাস্টমারকে ট্রাস্ট করাতে ও প্যাকেজে কী কী থাকছে তা স্পষ্টভাবে দেখাতে এই ছবি ব্যবহার করুন।'
  },
  {
    id: 'detail',
    titleBn: '৩. ইন্টারঅ্যাক্টিভ সাউন্ড পেজ ও স্মার্ট বোতাম',
    titleEn: 'Inside Interactive Sound Pages & Smart Buttons',
    filename: 'iqra_talking_book_features.jpg',
    url: '/images/iqra_talking_book_features.jpg',
    resolution: '1024 x 1024 px (HD Square)',
    tag: 'ভেতরের কনটেন্ট',
    description: 'বইটির ভেতরের রঙিন পাতা—বাংলা স্বরবর্ণ ও ব্যঞ্জনবর্ণ, আরবি বর্ণমালা, ইংরেজি Alphabet এবং নিচে থাকা ৪টি স্মার্ট ইন্টারঅ্যাক্টিভ বোতাম।',
    adUsageTip: 'বইয়ের ৩টি ভাষা ও শিক্ষণীয় কনটেন্টের বৈচিত্র্য হাইলাইট করার জন্য আদর্শ।'
  },
  {
    id: 'lifestyle',
    titleBn: '৪. শিশুর আনন্দময় স্বতঃস্ফূর্ত শিক্ষা (লাইফস্টাইল)',
    titleEn: 'Child Joyfully Learning with the Talking Book',
    filename: 'iqra_talking_book_child_learning.jpg',
    url: '/images/iqra_talking_book_child_learning.jpg',
    resolution: '1024 x 1024 px (HD Square)',
    tag: 'লাইফস্টাইল ছবি',
    description: 'হাস্যোজ্জ্বল শিশু নিজে নিজে স্মার্ট পেন দিয়ে স্পর্শ করে পড়ছে। মোবাইল আসক্তি দূর করে পড়ার প্রতি আগ্রহ সৃষ্টির বাস্তব দৃশ্য।',
    adUsageTip: 'পিতামাতাদের আবেগী মনোযোগ আকর্ষণ ও উচ্চ রূপান্তর (Conversion) অর্জনের জন্য মোক্ষম।'
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
