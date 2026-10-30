import React, { useState } from 'react';
import { Volume2, Sparkles, HelpCircle, Check, Music2 } from 'lucide-react';

interface SoundItem {
  id: string;
  char: string;
  word: string;
  meaning: string;
  language: 'bn' | 'en' | 'ar';
  speechText: string;
  speechLang: string;
  frequency: number; // For synth chime
}

export const InteractiveAudioDemo: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'bn' | 'en' | 'ar'>('bn');
  const [volumeLevel, setVolumeLevel] = useState<number>(3); // 1-5

  // Sound database
  const sounds: SoundItem[] = [
    // Bengali
    { id: 'bn-1', char: 'অ', word: 'অজগর', meaning: 'অজগর আসছে তেড়ে', language: 'bn', speechText: 'অ, অজগর', speechLang: 'bn-BD', frequency: 523.25 },
    { id: 'bn-2', char: 'আ', word: 'আম', meaning: 'আমটি আমি খাব পেড়ে', language: 'bn', speechText: 'আ, আম', speechLang: 'bn-BD', frequency: 587.33 },
    { id: 'bn-3', char: 'ক', word: 'কলম', meaning: 'কলম দিয়ে লিখি', language: 'bn', speechText: 'ক, কলম', speechLang: 'bn-BD', frequency: 659.25 },
    { id: 'bn-4', char: 'খ', word: 'খরগোশ', meaning: 'খরগোশ ছানা লাফিয়ে চলে', language: 'bn', speechText: 'খ, খরগোশ', speechLang: 'bn-BD', frequency: 698.46 },
    { id: 'bn-5', char: 'গ', word: 'গরু', meaning: 'গরু বাছুর মাঠে চরে', language: 'bn', speechText: 'গ, গরু', speechLang: 'bn-BD', frequency: 783.99 },
    
    // English
    { id: 'en-1', char: 'A', word: 'Apple', meaning: 'রেড আপেল', language: 'en', speechText: 'A, Apple', speechLang: 'en-US', frequency: 523.25 },
    { id: 'en-2', char: 'B', word: 'Ball', meaning: 'খেলার বল', language: 'en', speechText: 'B, Ball', speechLang: 'en-US', frequency: 587.33 },
    { id: 'en-3', char: 'C', word: 'Cat', meaning: 'মিষ্টি বিড়াল', language: 'en', speechText: 'C, Cat', speechLang: 'en-US', frequency: 659.25 },
    { id: 'en-4', char: 'D', word: 'Duck', meaning: 'পাতিহাঁস', language: 'en', speechText: 'D, Duck', speechLang: 'en-US', frequency: 698.46 },
    { id: 'en-5', char: 'E', word: 'Elephant', meaning: 'বড় হাতি', language: 'en', speechText: 'E, Elephant', speechLang: 'en-US', frequency: 783.99 },

    // Arabic
    { id: 'ar-1', char: 'أ', word: 'أَرْنَب', meaning: 'খরগোশ (Rabbit)', language: 'ar', speechText: 'أرنب', speechLang: 'ar-SA', frequency: 523.25 },
    { id: 'ar-2', char: 'ب', word: 'بَطَّة', meaning: 'হাঁস (Duck)', language: 'ar', speechText: 'بطة', speechLang: 'ar-SA', frequency: 587.33 },
    { id: 'ar-3', char: 'ت', word: 'تُفَّاح', meaning: 'আপেল (Apple)', language: 'ar', speechText: 'تفاح', speechLang: 'ar-SA', frequency: 659.25 },
    { id: 'ar-4', char: 'ج', word: 'جَمَل', meaning: 'উট (Camel)', language: 'ar', speechText: 'جمل', speechLang: 'ar-SA', frequency: 698.46 },
  ];

  const playChimeTone = (freq: number) => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      // Volume scaling
      const gainVal = (volumeLevel / 5) * 0.2;
      gain.gain.setValueAtTime(gainVal, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch (e) {
      // AudioContext unavailable or blocked
    }
  };

  const playSound = (item: SoundItem) => {
    setActiveItem(item.id);
    playChimeTone(item.frequency);

    // Speak phonics via SpeechSynthesis if supported
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(item.speechText);
      utterance.lang = item.speechLang;
      utterance.rate = 0.9;
      utterance.volume = volumeLevel / 5;
      utterance.onend = () => setActiveItem(null);
      utterance.onerror = () => setActiveItem(null);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setActiveItem(null), 700);
    }
  };

  const playQuizSound = () => {
    setActiveItem('quiz');
    playChimeTone(659.25);
    setTimeout(() => playChimeTone(880), 150);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance('চমৎকার! সঠিক উত্তর।');
      utterance.lang = 'bn-BD';
      utterance.rate = 1.0;
      utterance.onend = () => setActiveItem(null);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setActiveItem(null), 1000);
    }
  };

  const playRhymeSound = () => {
    setActiveItem('rhyme');
    playChimeTone(523.25);
    setTimeout(() => playChimeTone(659.25), 200);
    setTimeout(() => playChimeTone(783.99), 400);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance('টুইংকেল টুইংকেল লিটল স্টার');
      utterance.lang = 'bn-BD';
      utterance.rate = 0.9;
      utterance.onend = () => setActiveItem(null);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setActiveItem(null), 1200);
    }
  };

  const filteredSounds = sounds.filter(s => s.language === activeTab);

  return (
    <section id="sound-demo" className="py-14 sm:py-18 bg-[#FEFBF6] border-y border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold">
            <Volume2 className="w-3.5 h-3.5" />
            <span>ইন্টারেক্টিভ সাউন্ড সিমুলেটর</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight text-balance">
            বইটি যেভাবে শিশুর সাথে কথা বলে (লাইভ ডেমো)
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            নিচের বোতামগুলোতে স্পর্শ করে দেখুন। বইটি ঠিক এইভাবেই স্পষ্ট উচ্চারণে শিশুদের প্রতিটি শব্দ ও বর্ণ শেখায়।
          </p>
        </div>

        {/* Simulator Device Shell */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-xl relative overflow-hidden">
          
          {/* Top Speaker & Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-amber-100">
            
            {/* Language Switcher Tabs */}
            <div className="inline-flex p-1 bg-amber-50 rounded-xl border border-amber-200">
              <button
                onClick={() => setActiveTab('bn')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'bn' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                বাংলা বর্ণমালা
              </button>
              <button
                onClick={() => setActiveTab('en')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'en' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                English ABC
              </button>
              <button
                onClick={() => setActiveTab('ar')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'ar' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                আরবি হরফ
              </button>
            </div>

            {/* Virtual Volume Control & Speaker Grill */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>ভলিউম:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setVolumeLevel(lvl)}
                      className={`w-3.5 h-3.5 rounded-full transition-colors cursor-pointer ${
                        lvl <= volumeLevel ? 'bg-amber-500' : 'bg-slate-200'
                      }`}
                      title={`Volume ${lvl}`}
                    />
                  ))}
                </div>
              </div>

              {/* Simulated Speaker Grill */}
              <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center p-1.5" title="স্পিকার">
                <div className="grid grid-cols-3 gap-0.5 w-full h-full p-0.5">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="bg-slate-400 rounded-full w-1 h-1 mx-auto my-auto" />
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Sound Buttons Grid */}
          <div className="py-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
              {filteredSounds.map((s) => {
                const isPlaying = activeItem === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => playSound(s)}
                    className={`relative p-4 rounded-2xl border-2 transition-all text-center flex flex-col items-center justify-center cursor-pointer group ${
                      isPlaying
                        ? 'border-amber-600 bg-amber-50 shadow-md scale-102 ring-2 ring-amber-300'
                        : 'border-slate-200 bg-white hover:border-amber-400 hover:bg-amber-50/40 shadow-xs'
                    }`}
                  >
                    <span className="text-3xl sm:text-4xl font-extrabold text-amber-600 group-hover:scale-110 transition-transform mb-1">
                      {s.char}
                    </span>
                    <span className="text-sm font-bold text-slate-800">
                      {s.word}
                    </span>
                    <span className="text-[11px] text-slate-500 mt-0.5 truncate max-w-full">
                      {s.meaning}
                    </span>

                    {/* Sound waves indicator */}
                    <div className="mt-2 text-[10px] text-amber-700 flex items-center gap-1 font-medium bg-amber-100/70 px-2 py-0.5 rounded-full">
                      <Volume2 className={`w-3 h-3 ${isPlaying ? 'animate-bounce text-amber-600' : ''}`} />
                      <span>{isPlaying ? 'বলছে...' : 'টাচ করুন'}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bonus Features: Quiz & Rhyme simulator */}
          <div className="pt-4 border-t border-amber-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={playQuizSound}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  activeItem === 'quiz'
                    ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                    : 'bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100'
                }`}
              >
                <HelpCircle className="w-4 h-4 text-purple-600" />
                <span>মজার কুইজ টেস্ট</span>
              </button>

              <button
                onClick={playRhymeSound}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  activeItem === 'rhyme'
                    ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                    : 'bg-rose-50 text-rose-900 border-rose-200 hover:bg-rose-100'
                }`}
              >
                <Music2 className="w-4 h-4 text-rose-600" />
                <span>মিষ্টি ছড়ার সুর</span>
              </button>
            </div>

            <p className="text-xs text-slate-500 italic">
              * ডিভাইসের অডিও সাউন্ড চালু রাখুন
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
