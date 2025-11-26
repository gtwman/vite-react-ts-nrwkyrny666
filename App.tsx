import React, { useState } from 'react';
import { Calendar, Coffee, MessageCircle, Map, Info, Hotel, Ticket, AlertTriangle } from 'lucide-react';
import { ITINERARY_DATA, RESTAURANT_LIST } from './constants';
import ItineraryView from './components/ItineraryView';
import FoodGuide from './components/FoodGuide';
import AIAssistant from './components/AIAssistant';

enum Tab { ITINERARY = 'itinerary', FOOD = 'food', ASSISTANT = 'assistant', INFO = 'info' }

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.ITINERARY);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg"><Map className="w-5 h-5 text-white" /></div>
            <div>
              <h1 className="text-lg font-bold text-slate-800 leading-tight">澎湖家庭遊 2025</h1>
              <p className="text-xs text-slate-500">勝國飯店自由行專案</p>
            </div>
          </div>
          <div className="text-xs text-slate-500 font-medium bg-slate-100 px-2 py-1 rounded">11/28 - 12/01</div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-2xl mx-auto">
        {activeTab === Tab.ITINERARY && <ItineraryView days={ITINERARY_DATA} />}
        {activeTab === Tab.FOOD && <FoodGuide restaurants={RESTAURANT_LIST} />}
        {activeTab === Tab.ASSISTANT && <AIAssistant />}
        {activeTab === Tab.INFO && (
          <div className="p-6 space-y-6 pb-24 animate-fade-in">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-md">
              <div className="flex items-center gap-2 mb-3">
                <Hotel className="w-5 h-5" />
                <h2 className="text-xl font-bold">住宿與票券資訊</h2>
              </div>
              <div className="space-y-3 text-sm bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <p className="font-bold text-lg flex justify-between">勝國大飯店 <span className="text-xs font-normal bg-white/20 px-2 py-1 rounded">3晚</span></p>
                <p className="opacity-90">地址：馬公市水源路2-12號</p>
                <p className="opacity-90">電話：06-9273891</p>
                <hr className="border-white/20 my-2"/>
                <div className="flex items-start gap-2">
                  <Ticket className="w-4 h-4 mt-0.5 flex-shrink-0 text-yellow-300" />
                  <div>
                    <span className="font-bold text-yellow-300">消費券領取提醒：</span>
                    <p className="mt-1 leading-relaxed">入住時請憑<span className="font-bold underline">入境登機證正本</span>領取每人 $500 元消費券。</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-100 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3 text-red-700">
                <AlertTriangle className="w-5 h-5" />
                <h2 className="text-lg font-bold">租車安全 (重要)</h2>
              </div>
              <div className="text-sm text-red-900 leading-relaxed bg-white/50 p-3 rounded-lg border border-red-100">
                <p className="font-bold text-base mb-1">⚠️ 開車門請抓緊！</p>
                <p>澎湖東北季風強勁。下車開門時務必<strong>雙手抓緊車門</strong>，以免風勢吹反折車門。</p>
              </div>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <h2 className="text-lg font-bold text-slate-800 mb-2">緊急聯絡</h2>
              <div className="text-sm text-slate-600 space-y-2">
                <p className="flex justify-between border-b border-slate-100 pb-1"><span>旅客代表 (柯小姐)</span><span className="font-mono">0921-318-504</span></p>
                <p className="flex justify-between"><span>澎湖醫院</span><span className="font-mono">06-926-1151</span></p>
              </div>
            </div>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-30 pb-safe">
        <div className="max-w-2xl mx-auto flex justify-around items-center h-16">
          <button onClick={() => setActiveTab(Tab.ITINERARY)} className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${activeTab === Tab.ITINERARY ? 'text-blue-600' : 'text-slate-400'}`}><Calendar className="w-6 h-6" /><span className="text-[10px] font-medium">行程</span></button>
          <button onClick={() => setActiveTab(Tab.FOOD)} className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${activeTab === Tab.FOOD ? 'text-blue-600' : 'text-slate-400'}`}><Coffee className="w-6 h-6" /><span className="text-[10px] font-medium">美食</span></button>
          <button onClick={() => setActiveTab(Tab.ASSISTANT)} className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${activeTab === Tab.ASSISTANT ? 'text-blue-600' : 'text-slate-400'}`}><MessageCircle className="w-6 h-6" /><span className="text-[10px] font-medium">小幫手</span></button>
          <button onClick={() => setActiveTab(Tab.INFO)} className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${activeTab === Tab.INFO ? 'text-blue-600' : 'text-slate-400'}`}><Info className="w-6 h-6" /><span className="text-[10px] font-medium">資訊</span></button>
        </div>
      </nav>
    </div>
  );
};

export default App;