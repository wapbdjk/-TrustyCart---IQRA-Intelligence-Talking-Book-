import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig.ts';

interface FAQItem {
  q: string;
  a: string;
}

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      q: 'বইটিতে কতগুলো পৃষ্ঠা ও কী কী বিষয় রয়েছে?',
      a: 'বইটিতে রয়েছে ৬৪ পৃষ্ঠার এক বিশাল ভাণ্ডার এবং ১০০টিরও বেশি আকর্ষণীয় কনটেন্ট। এর মধ্যে রয়েছে ৩টি ভাষার বর্ণমালা (বাংলা স্বরবর্ণ-ব্যঞ্জনবর্ণ, ইংরেজি Alphabet ও আরবি হরফ), গণিত ও সংখ্যা গণনা, মজাদার গান ও ছড়া, এবং বুদ্ধিমত্তা বিকাশের দারুণ সব পাজল ও কুইজ গেম।'
    },
    {
      q: 'বইটি কত বছর বয়সী শিশুদের জন্য উপযুক্ত?',
      a: 'বইটি ৩ বছর বা তার বেশি বয়সী শিশুদের (3+ Ages) জন্য অত্যন্ত কার্যকরী। ছোট শিশুরা রঙিন ছবি ও সাউন্ডের স্পর্শে কথা বলা ও শব্দ চেনা শেখে, আর একটু বড় শিশুরা কুইজ, বর্ণমালা ও গণিত সহজে আয়ত্ত করতে পারে।'
    },
    {
      q: 'ডেলিভারি চার্জ কত এবং পেমেন্ট কীভাবে করতে হবে?',
      a: 'সারা বাংলাদেশে যেকোনো জেলা বা উপজেলায় ডেলিভারি চার্জ সম্পূর্ণ ফ্রি (৳০)। এছাড়া ১০০% ক্যাশ অন ডেলিভারি (Cash on Delivery) সুবিধা রয়েছে। কোনো অগ্রিম টাকা দিতে হবে না, পার্সেল হাতে পেয়ে ডেলিভারিম্যানের সামনে দেখে মোট ৳৯৯৯ BDT পরিশোধ করবেন।'
    },
    {
      q: 'বইটিতে কী ধরণের ব্যাটারি প্রয়োজন নাকি চার্জ দিতে হয়?',
      a: 'এই বইটিতে কোনো আলাদা ব্যাটারি কেনার ঝামেলা নেই। এতে আধুনিক টাইপ-সি (Type-C) চার্জিং সুবিধা রয়েছে—সাধারণ মোবাইল চার্জার দিয়ে সহজেই চার্জ দেওয়া যায় (অথবা ডুয়াল সুবিধার ক্ষেত্রে ব্যাটারি অপশন রয়েছে)।'
    },
    {
      q: 'স্মার্ট বোতামগুলোর কাজ কী?',
      a: 'বইয়ের নিচের প্যানেলে রয়েছে ৪টি বিশেষ বোতাম: ১. ভয়েজ রেকর্ডিং ও রিপিট (শিশু নিজের মুখে পড়া বলে রেকর্ড করতে পারে ও শুনতে পারে), ২. প্রশ্নোত্তর মোড (বই প্রশ্ন করবে এবং শিশু সঠিক উত্তর দেবে), ৩. অটো রিড বোতাম (একনাগাড়ে স্বয়ংক্রিয়ভাবে পুরো পৃষ্ঠা পড়বে), এবং ৪. ভলিউম কন্ট্রোল।'
    },
    {
      q: 'বইটিতে কি কোনো ওয়ারেন্টি বা গ্যারান্টি আছে?',
      a: `হ্যাঁ, বইটির সাথে রয়েছে সম্পূর্ণ ১ বছরের অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি। এছাড়া পার্সেল হাতে পেয়ে ডেলিভারিম্যানের সামনে দেখে নেওয়ার সুযোগ রয়েছে। ব্যবহারের ১ বছরের মধ্যে যেকোনো টেকনিক্যাল সমস্যায় আমাদের হেল্পলাইন ${STORE_CONFIG.helplinePhone} নম্বরে জানালে দ্রুত ফ্রি রিপ্লেসমেন্ট দেওয়া হবে।`
    }
  ];

  return (
    <section id="faq" className="py-12 sm:py-18 bg-white border-t border-amber-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>সচরাচর জিজ্ঞাসা</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight text-balance">
            অভিভাবকদের প্রয়োজনীয় প্রশ্নোত্তর
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            টকিং বুক সম্পর্কে আপনার যেকোনো তথ্যের জন্য নিচের উত্তরগুলো দেখে নিন:
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-amber-200/90 overflow-hidden bg-[#FFFDF9] transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left text-base sm:text-lg font-bold text-slate-900 hover:text-amber-700 transition-colors cursor-pointer"
                >
                  <span className="pr-4">{faq.q}</span>
                  <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center shrink-0 text-amber-700">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-amber-100 pt-3">
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
