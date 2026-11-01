import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      q: 'এই কম্বো প্যাকে সর্বমোট কী কী আইটেম পাওয়া যাবে?',
      a: 'এই ৫-ইন-১ কম্বো সেটে রয়েছে: ১. IQRA Intelligence Talking Book (বাংলা, ইংলিশ ও আরবি সাউন্ড সহ মূল বই), ২. ৮.৫ ইঞ্চি LCD কালারফুল রাইটিং ট্যাবলেট, ৩. IQRA ওয়াটার ম্যাজিক বুক, ৪. ২টি বিশেষ পেন ও মার্কার, এবং ৫. ইউএসবি চার্জিং ক্যাবল।'
    },
    {
      q: 'বইটিতে কি আলাদা ব্যাটারি কেনা লাগবে নাকি চার্জ দিতে হয়?',
      a: 'কোনো আলাদা পেন্সিল ব্যাটারি কেনার ঝামেলা নেই। এতে আধুনিক টাইপ-সি (Type-C) রিচার্জেবল সিস্টেম রয়েছে—সাধারণ মোবাইল চার্জার দিয়ে অনায়াসে চার্জ করা যায়।'
    },
    {
      q: 'সারা দেশে ডেলিভারি চার্জ কত এবং কীভাবে পেমেন্ট করব?',
      a: 'সারা বাংলাদেশে ৬৪ জেলার যেকোনো জেলা ও উপজেলায় ডেলিভারি চার্জ সম্পূর্ণ ফ্রি (৳০)। এছাড়া ১০০% ক্যাশ অন ডেলিভারি সুবিধা রয়েছে—কোনো অগ্রিম পেমেন্ট ছাড়াই পার্সেল হাতে পেয়ে মূল্য পরিশোধ করবেন।'
    },
    {
      q: 'পার্সেল পাওয়ার পর আমি কি ডেলিভারিম্যানের সামনে দেখে নিতে পারব?',
      a: 'হ্যাঁ, অবশ্যই! ডেলিভারিম্যান পার্সেল নিয়ে আসার পর তার সামনে প্যাকেট খুলে টকিং বুক, এলসিডি স্লেট ও ম্যাজিক বুক সব আইটেম ঠিক আছে কিনা তা দেখে নিশ্চিত হয়ে তারপর ৳৯৯৯ টাকা পরিশোধ করবেন।'
    }
  ];

  return (
    <section id="faq" className="py-12 sm:py-16 bg-slate-50/50 border-b border-slate-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
            প্রশ্নোত্তর
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight text-balance">
            সাধারণ জিজ্ঞাসা ও উত্তর
          </h2>
          <p className="text-sm text-slate-600">
            টকিং বুক কম্বো অর্ডার করার পূর্বে অভিভাবকদের প্রয়োজনীয় কিছু প্রশ্নের উত্তর:
          </p>
        </div>

        {/* 4 Accordion Questions */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl border border-slate-200 bg-white overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-bold text-slate-900 hover:text-blue-700 transition-colors cursor-pointer"
                >
                  <span className="pr-3">{faq.q}</span>
                  <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 text-slate-500">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-blue-700" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
