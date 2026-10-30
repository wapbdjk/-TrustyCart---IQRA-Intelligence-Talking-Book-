import React, { useState, useEffect } from 'react';
import { 
  X, 
  Download, 
  RefreshCw, 
  Search, 
  Trash2, 
  CheckCircle, 
  Sliders, 
  Activity, 
  BarChart3, 
  Package, 
  AlertCircle,
  ExternalLink,
  ShieldAlert,
  Database,
  Image as ImageIcon
} from 'lucide-react';
import { Order, PixelEvent } from '../types.ts';
import { orderService, formatTaka, toBengaliNumerals } from '../services/orderService.ts';
import { pixelService } from '../services/pixelService.ts';
import { STORE_CONFIG } from '../config/storeConfig.ts';
import { PRODUCT_PHOTOS, ProductPhoto } from './ImageGalleryModal.tsx';

interface MerchantAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MerchantAdminModal: React.FC<MerchantAdminModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'pixel' | 'photos' | 'settings'>('orders');
  
  // Orders state
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [orderSource, setOrderSource] = useState<'api' | 'local'>('api');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Meta Pixel state
  const [pixelIdInput, setPixelIdInput] = useState('');
  const [pixelLogs, setPixelLogs] = useState<PixelEvent[]>([]);
  const [pixelSavedFeedback, setPixelSavedFeedback] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadOrders();
      loadPixelConfig();
    }
  }, [isOpen]);

  const loadOrders = async () => {
    setLoadingOrders(true);
    try {
      const { orders: fetchedOrders, source } = await orderService.getOrders();
      setOrders(fetchedOrders);
      setOrderSource(source);
    } catch {
      // ignore
    } finally {
      setLoadingOrders(false);
    }
  };

  const loadPixelConfig = () => {
    setPixelIdInput(pixelService.getPixelId());
    setPixelLogs(pixelService.getLogs());
  };

  const handleSavePixel = (e: React.FormEvent) => {
    e.preventDefault();
    pixelService.setPixelId(pixelIdInput);
    setPixelSavedFeedback(true);
    setTimeout(() => setPixelSavedFeedback(false), 2500);
    loadPixelConfig();
  };

  const handleStatusChange = async (id: string, newStatus: Order['status']) => {
    await orderService.updateOrderStatus(id, newStatus);
    loadOrders();
  };

  const handleDelete = async (id: string) => {
    if (confirm(`অর্ডার ${id} মুছে ফেলতে চান?`)) {
      await orderService.deleteOrder(id);
      loadOrders();
    }
  };

  const handleExportCsv = () => {
    orderService.exportCourierCsv(orders);
  };

  if (!isOpen) return null;

  // Filter orders
  const filteredOrders = orders.filter((o) => {
    const matchesSearch = 
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerPhone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-5xl my-6 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              TC
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold">
                TrustyCart মার্চেন্ট ও অ্যাডভার্টাইজার কন্ট্রোল
              </h3>
              <p className="text-xs text-slate-400">
                অর্ডার প্রসেসিং, কুরিয়ার CSV এক্সপোর্ট এবং Meta Pixel ইভেন্ট ট্র্যাকিং
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

        {/* Navigation Tabs */}
        <div className="bg-slate-100 border-b border-slate-200 px-6 pt-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === 'orders'
                  ? 'border-amber-600 text-amber-700 bg-white rounded-t-lg'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>অর্ডার তালিকা ({toBengaliNumerals(orders.length)})</span>
            </button>

            <button
              onClick={() => setActiveTab('pixel')}
              className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === 'pixel'
                  ? 'border-amber-600 text-amber-700 bg-white rounded-t-lg'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Facebook Meta Pixel ও UTM</span>
            </button>

            <button
              onClick={() => setActiveTab('photos')}
              className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === 'photos'
                  ? 'border-amber-600 text-amber-700 bg-white rounded-t-lg'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-amber-600" />
              <span>বিজ্ঞাপন ও প্রমোশন ছবি ({PRODUCT_PHOTOS.length})</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 pb-2">
            <Database className="w-3.5 h-3.5" />
            <span>স্টোরেজ সোর্স: <strong>{orderSource === 'api' ? 'Express Server (Persistent)' : 'Browser Local Vault'}</strong></span>
          </div>
        </div>

        {/* Tab 1: Orders Management */}
        {activeTab === 'orders' && (
          <div className="p-6 overflow-y-auto flex-1 space-y-5">
            
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
                <span className="text-xs text-slate-500">মোট অর্ডার</span>
                <p className="text-xl font-bold text-slate-900 font-ui tabular-nums mt-0.5">
                  {toBengaliNumerals(orders.length)} টি
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
                <span className="text-xs text-slate-500">সম্ভাব্য মোট রেভিনিউ</span>
                <p className="text-xl font-bold text-emerald-800 font-ui tabular-nums mt-0.5">
                  {formatTaka(totalRevenue)}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200">
                <span className="text-xs text-slate-500">পেন্ডিং কনফার্মেশন</span>
                <p className="text-xl font-bold text-blue-800 font-ui tabular-nums mt-0.5">
                  {toBengaliNumerals(orders.filter(o => o.status === 'Pending').length)} টি
                </p>
              </div>

              <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200">
                <span className="text-xs text-slate-500">ডেলিভারড</span>
                <p className="text-xl font-bold text-purple-800 font-ui tabular-nums mt-0.5">
                  {toBengaliNumerals(orders.filter(o => o.status === 'Delivered').length)} টি
                </p>
              </div>
            </div>

            {/* Action & Filter Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex flex-wrap items-center gap-2 flex-1 max-w-lg">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="নাম, মোবাইল বা অর্ডার আইডি খুঁজুন..."
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-amber-500 focus:bg-white transition-all"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="all">সকল স্ট্যাটাস</option>
                  <option value="Pending">Pending (পেন্ডিং)</option>
                  <option value="Confirmed">Confirmed (নিশ্চিত)</option>
                  <option value="Shipped">Shipped (কুরিয়ারে)</option>
                  <option value="Delivered">Delivered (পৌঁছেছে)</option>
                  <option value="Cancelled">Cancelled (বাতিল)</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={loadOrders}
                  disabled={loadingOrders}
                  className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                  title="রিফ্রেশ"
                >
                  <RefreshCw className={`w-4 h-4 ${loadingOrders ? 'animate-spin' : ''}`} />
                </button>

                <button
                  onClick={handleExportCsv}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>কুরিয়ার CSV ডাউনলোড</span>
                </button>
              </div>
            </div>

            {/* Orders Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-100/80 text-slate-700 border-b border-slate-200 font-bold">
                    <tr>
                      <th className="py-3 px-4">আইডি ও সময়</th>
                      <th className="py-3 px-4">গ্রাহকের নাম ও ফোন</th>
                      <th className="py-3 px-4">জেলা ও ঠিকানা</th>
                      <th className="py-3 px-4">পরিমাণ ও মোট টাকা</th>
                      <th className="py-3 px-4">ক্যাম্পেইন (UTM)</th>
                      <th className="py-3 px-4">স্ট্যাটাস</th>
                      <th className="py-3 px-4 text-right">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-12 text-slate-500">
                          {orders.length === 0 
                            ? 'এখনো কোনো অর্ডার আসেনি। ল্যান্ডিং পেজে একটি টেস্ট অর্ডার দিয়ে পরীক্ষা করে দেখতে পারেন।' 
                            : 'সার্চে কোনো অর্ডার পাওয়া যায়নি।'}
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4">
                            <span className="font-mono font-bold text-amber-900 block select-all">
                              {order.id}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              {new Date(order.createdAt).toLocaleString('bn-BD', { dateStyle: 'short', timeStyle: 'short' })}
                            </span>
                          </td>

                          <td className="py-3 px-4">
                            <span className="font-semibold text-slate-900 block">
                              {order.customerName}
                            </span>
                            <a
                              href={`tel:${order.customerPhone}`}
                              className="font-mono text-xs text-amber-700 hover:underline block"
                            >
                              {order.customerPhone}
                            </a>
                          </td>

                          <td className="py-3 px-4 max-w-[200px]">
                            <span className="font-medium text-slate-800 block">
                              {order.district} {order.upazila ? `(${order.upazila})` : ''}
                            </span>
                            <span className="text-[11px] text-slate-500 truncate block" title={order.address}>
                              {order.address}
                            </span>
                          </td>

                          <td className="py-3 px-4 font-ui">
                            <span className="font-bold text-slate-900 block">
                              {formatTaka(order.totalAmount)}
                            </span>
                            <span className="text-[11px] text-slate-500">
                              {toBengaliNumerals(order.quantity)} সেট · ডেলিভারি {order.deliveryFee === 0 ? 'ফ্রি (৳০)' : formatTaka(order.deliveryFee)}
                            </span>
                          </td>

                          <td className="py-3 px-4 text-[11px] text-slate-600">
                            {order.utmParams?.utm_source ? (
                              <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-mono">
                                {order.utmParams.utm_source}
                              </span>
                            ) : (
                              <span className="text-slate-400">Direct</span>
                            )}
                          </td>

                          <td className="py-3 px-4">
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusChange(order.id, e.target.value as any)}
                              className={`text-xs font-semibold px-2 py-1 rounded-md border cursor-pointer ${
                                order.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                                order.status === 'Shipped' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                                order.status === 'Delivered' ? 'bg-purple-50 text-purple-800 border-purple-200' :
                                order.status === 'Cancelled' ? 'bg-red-50 text-red-800 border-red-200' :
                                'bg-amber-50 text-amber-800 border-amber-200'
                              }`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>

                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => handleDelete(order.id)}
                              className="p-1.5 text-slate-400 hover:text-red-600 rounded hover:bg-red-50 transition-colors"
                              title="Delete Order"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Meta Pixel Configuration & Live Logs */}
        {activeTab === 'pixel' && (
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            
            {/* Meta Pixel Config Form */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  Facebook Meta Pixel সেটআপ
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  আপনার ফেসবুক ইভেন্টস ম্যানেজার থেকে Pixel ID টি এখানে ইনপুট দিন। কোনো মনগড়া আইডি দেওয়া নেই।
                </p>
              </div>

              <form onSubmit={handleSavePixel} className="flex flex-wrap items-center gap-3">
                <input
                  type="text"
                  value={pixelIdInput}
                  onChange={(e) => setPixelIdInput(e.target.value)}
                  placeholder="আপনার Pixel ID দিন (যেমন: 123456789012345)"
                  className="flex-1 min-w-[280px] px-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:border-amber-500 outline-none font-mono"
                />

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
                >
                  পিক্সেল আইডি সেভ করুন
                </button>
              </form>

              {pixelSavedFeedback && (
                <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold animate-fade-in">
                  <CheckCircle className="w-4 h-4" />
                  <span>পিক্সেল আইডি সফলভাবে সেভ ও কার্যকর করা হয়েছে!</span>
                </div>
              )}

              <div className="text-xs text-slate-500 pt-1">
                স্ট্যাটাস: {pixelService.getPixelId() ? (
                  <span className="text-emerald-700 font-bold">একটিভ (Pixel ID: {pixelService.getPixelId()})</span>
                ) : (
                  <span className="text-amber-800 font-semibold">আইডি কনফিগার করা হয়নি (টেস্ট মোড চালু)</span>
                )}
              </div>
            </div>

            {/* Standard Events Description */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
                <span className="text-xs font-mono font-bold text-blue-600">PageView</span>
                <p className="text-[11px] text-slate-600">পেজ লোড হওয়ার সাথে সাথে ফায়ার হয়।</p>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
                <span className="text-xs font-mono font-bold text-indigo-600">ViewContent</span>
                <p className="text-[11px] text-slate-600">প্রোডাক্টের বিবরণ ও মূল্য লোড হলে ট্র্যাকিং হয়।</p>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
                <span className="text-xs font-mono font-bold text-amber-600">InitiateCheckout</span>
                <p className="text-[11px] text-slate-600">অর্ডার ফর্মে গ্রাহক ইনপুট দেওয়া শুরু করলে ট্রিগার হয়।</p>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
                <span className="text-xs font-mono font-bold text-emerald-600">Purchase</span>
                <p className="text-[11px] text-slate-600">শুধুমাত্র সফল সার্ভার অর্ডার কনফার্মেশনের পর ফায়ার হয়।</p>
              </div>
            </div>

            {/* Live Pixel Event Logs */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-amber-600" />
                  <span>লাইভ পিক্সেল ইভেন্ট লগ (Pixel Event Inspector)</span>
                </h5>

                <button
                  onClick={() => {
                    pixelService.clearLogs();
                    loadPixelConfig();
                  }}
                  className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
                >
                  লগ ক্লিয়ার করুন
                </button>
              </div>

              <div className="bg-slate-950 text-slate-200 rounded-2xl p-4 font-mono text-xs max-h-60 overflow-y-auto space-y-2 border border-slate-800">
                {pixelLogs.length === 0 ? (
                  <div className="text-slate-500 text-center py-6">
                    এখনো কোনো ইভেন্ট ফায়ার হয়নি। পেজ রিফ্রেশ বা অর্ডার ফর্ম পূরণ করলে এখানে লাইভ ইভেন্ট দেখতে পাবেন।
                  </div>
                ) : (
                  pixelLogs.map((log) => (
                    <div key={log.id} className="pb-2 border-b border-slate-800/80 flex items-start justify-between gap-4">
                      <div>
                        <span className={`font-bold mr-2 ${
                          log.eventName === 'Purchase' ? 'text-emerald-400' :
                          log.eventName === 'InitiateCheckout' ? 'text-amber-400' :
                          log.eventName === 'ViewContent' ? 'text-blue-400' : 'text-slate-400'
                        }`}>
                          [{log.eventName}]
                        </span>
                        <span className="text-slate-300">
                          {JSON.stringify(log.data)}
                        </span>
                      </div>
                      <span className="text-slate-500 text-[10px] shrink-0">
                        {log.timestamp}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        )}

        {/* Tab 3: HD Ad Photos & Marketing Materials */}
        {activeTab === 'photos' && (
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-200">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  IQRA টকিং বুকের আসল ছবি ({PRODUCT_PHOTOS.length}টি HD ছবি)
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  ফেসবুক বিজ্ঞাপন, ইনস্টাগ্রাম পোস্ট, মেসেঞ্জার এবং হোয়াটসঅ্যাপ ক্যাটালগের জন্য সরাসরি ডাউনলোড করুন।
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  PRODUCT_PHOTOS.forEach((photo) => {
                    const link = document.createElement('a');
                    link.href = `/api/download/${photo.filename}`;
                    link.setAttribute('download', photo.filename);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  });
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-sm transition-all cursor-pointer whitespace-nowrap"
              >
                <Download className="w-4 h-4" />
                <span>সবগুলো ছবি এক ক্লিকে ডাউনলোড</span>
              </button>
            </div>

            {/* Photos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {PRODUCT_PHOTOS.map((photo, idx) => (
                <div 
                  key={photo.id}
                  className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between space-y-4 hover:border-amber-300 transition-all"
                >
                  <div className="flex gap-4">
                    <div className="w-32 h-32 aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 relative group">
                      <img 
                        src={photo.url} 
                        alt={photo.titleBn} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-1.5 left-1.5 bg-amber-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs">
                        #{idx + 1}
                      </span>
                    </div>

                    <div className="flex-1 space-y-1">
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {photo.tag}
                      </span>
                      <h5 className="text-sm font-bold text-slate-900 leading-snug pt-1">
                        {photo.titleBn}
                      </h5>
                      <p className="text-[11px] text-slate-500 font-mono">
                        {photo.filename} ({photo.resolution})
                      </p>
                      <p className="text-xs text-slate-600 line-clamp-2 pt-0.5">
                        {photo.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-slate-500 font-medium">
                      পরামর্শ: {photo.adUsageTip}
                    </span>
                    
                    <div className="flex items-center gap-1.5 shrink-0">
                      <a
                        href={photo.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                        title="ফুল সাইজে দেখুন"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      
                      <a
                        href={`/api/download/${photo.filename}`}
                        download={photo.filename}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors"
                        title="ডাউনলোড করুন"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>ডাউনলোড</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Ad Tips */}
            <div className="p-4 rounded-xl bg-slate-100 text-slate-700 text-xs space-y-2">
              <strong className="text-slate-900 block font-semibold">বিজ্ঞাপন তৈরির পরামর্শ:</strong>
              <p className="leading-relaxed">
                ফেসবুক বা ইনস্টাগ্রামে অ্যাড সেটআপের সময় এই ছবিগুলো আপলোড করুন। ছবির সাথে আকর্ষণীয় ক্যাপশন (যেমন: <em>&quot;শিশুর শেখার আনন্দ হোক আরও আকর্ষণীয় — IQRA Talking Book, সারা দেশে ফ্রি হোম ডেলিভারি ও ১ বছরের ওয়ারেন্টি&quot;</em>) এবং অর্ডার বাটনের লিংক যুক্ত করুন।
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
