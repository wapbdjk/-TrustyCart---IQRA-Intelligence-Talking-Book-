import React from 'react';
import { 
  CheckCircle2, 
  X, 
  MessageCircle, 
  Package, 
  MapPin, 
  Clock, 
  AlertTriangle,
  Copy,
  Check,
  Database,
  Truck
} from 'lucide-react';
import { Order } from '../types.ts';
import { STORE_CONFIG } from '../config/storeConfig.ts';
import { formatTaka, toBengaliNumerals } from '../services/orderService.ts';

interface OrderConfirmationModalProps {
  order: Order | null;
  isOpen: boolean;
  isLocalFallback?: boolean;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  isOpen,
  isLocalFallback,
  onClose,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen || !order) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(order.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasRealWhatsApp = STORE_CONFIG.whatsappNumber && !STORE_CONFIG.whatsappNumber.includes('[');

  const whatsappMessage = `আসসালামু আলাইকুম TrustyCart, আমি একটি অর্ডার করেছি।
অর্ডার আইডি: ${order.id}
নাম: ${order.customerName}
ফোন: ${order.customerPhone}
মোট প্রদেয় টাকা: ৳${order.totalAmount}
অর্ডার কনফার্মেশনের জন্য যোগাযোগ করছি।`;

  const whatsappUrl = hasRealWhatsApp
    ? `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
    : '#';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl my-8 bg-white rounded-3xl shadow-2xl border border-amber-200 overflow-hidden text-slate-900">
        
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 sm:p-8 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            ধন্যবাদ! অর্ডারটি গৃহীত হয়েছে
          </h3>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-md mx-auto">
            আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। বিস্তারিত তথ্য নিচে দেওয়া হলো:
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-5">
          
          {/* Order Storage Status (Requirement 8 Transparency) */}
          {isLocalFallback ? (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block">ডাটাবেজ ও স্টোরেজ স্ট্যাটাস:</strong>
                বর্তমানে ব্যাকএন্ড সার্ভার রেসপন্স না করায় অর্ডারটি নিরাপদে ব্রাউজারের অফলাইন লোকাল ভল্টে সংরক্ষিত হয়েছে। মার্চেন্ট ড্যাশবোর্ড থেকে যে কোনো সময় CSV ফরম্যাটে ডাউনলোড করা যাবে। পার্মানেন্ট ক্লাউড ডাটাবেজ এখনও কনফিগার করা না থাকলে Netlify Functions বা এক্সটার্নাল ডাটাবেজ যুক্ত করা প্রয়োজন।
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>অর্ডার নিশ্চিতকরণ:</strong> অর্ডারটি সার্ভার ডাটাবেজে (<code className="font-mono font-semibold">data/orders.json</code>) বাস্তবে সংরক্ষিত হয়েছে।</span>
            </div>
          )}

          {/* Unique Order ID Card */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center justify-between gap-3">
            <div>
              <span className="text-xs text-slate-500 font-medium block">
                অর্ডার রেফারেন্স নম্বর (Order ID)
              </span>
              <span className="text-lg font-mono font-bold text-amber-900 select-all">
                {order.id}
              </span>
            </div>

            <button
              onClick={handleCopyId}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-amber-200 text-xs font-semibold text-slate-700 hover:bg-amber-100/50 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>কপি হয়েছে</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>কপি করুন</span>
                </>
              )}
            </button>
          </div>

          {/* Invoice Breakdown */}
          <div className="border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3 text-sm">
            <h4 className="font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <Package className="w-4 h-4 text-amber-600" />
              <span>অর্ডারের সারসংক্ষেপ</span>
            </h4>

            <div className="flex justify-between items-center text-slate-700">
              <span>পণ্য:</span>
              <span className="font-medium text-slate-900">
                {STORE_CONFIG.product.nameBn}
              </span>
            </div>

            <div className="flex justify-between items-center text-slate-700">
              <span>পরিমাণ:</span>
              <span className="font-medium font-ui">
                {toBengaliNumerals(order.quantity)} টি সেট (প্রতি সেট {formatTaka(order.unitPrice)})
              </span>
            </div>

            <div className="flex justify-between items-center text-slate-700">
              <span>ডেলিভারি এলাকা:</span>
              <span className="font-medium">
                {order.district} {order.upazila ? `(${order.upazila})` : ''}
              </span>
            </div>

            <div className="flex justify-between items-center text-slate-700">
              <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                <Truck className="w-4 h-4" />
                <span>ডেলিভারি চার্জ:</span>
              </span>
              <span className="font-bold text-emerald-700 font-ui">
                ফ্রি (৳০)
              </span>
            </div>

            <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-base font-bold text-slate-900">
              <span>সর্বমোট প্রদেয় টাকা:</span>
              <span className="text-xl font-black text-amber-600 font-ui tabular-nums">
                {formatTaka(order.totalAmount)}
              </span>
            </div>

            <div className="text-xs text-slate-500 pt-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">ডেলিভারি ঠিকানা: {order.address}</span>
            </div>
          </div>

          {/* Customer Instructions */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2 text-xs text-slate-600">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>পরবর্তী পদক্ষেপ:</span>
            </span>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li>আমাদের প্রতিনিধি আপনার <strong>{order.customerPhone}</strong> নম্বরে কল করে অর্ডার নিশ্চিত করবেন।</li>
              <li>ক্যাশ অন ডেলিভারিতে পার্সেল চেক করে মূল্য পরিশোধ করবেন।</li>
            </ul>
          </div>

          {/* Quick Contact Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {hasRealWhatsApp ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>হোয়াটসঅ্যাপে মেসেজ পাঠান</span>
              </a>
            ) : (
              <div className="flex-1 flex items-center justify-center gap-1.5 p-3 rounded-xl bg-slate-100 text-slate-600 text-xs text-center border border-slate-200">
                <MessageCircle className="w-4 h-4 text-slate-400" />
                <span>হোয়াটসঅ্যাপ সাপোর্ট: <strong className="font-mono">[YOUR PHONE NUMBER]</strong></span>
              </div>
            )}

            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-sm transition-colors cursor-pointer"
            >
              <span>বন্ধ করুন</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
