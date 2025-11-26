import React from 'react';
import { Restaurant } from '../types';
import { DollarSign, Baby, ThumbsUp } from 'lucide-react';

interface FoodGuideProps {
  restaurants: Restaurant[];
}

const FoodGuide: React.FC<FoodGuideProps> = ({ restaurants }) => {
  return (
    <div className="px-4 pb-24 pt-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">嚴選美食推薦</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {restaurants.map((res) => (
          <div key={res.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
            <div className="p-5 flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-slate-800">{res.name}</h3>
                <div className="flex">
                  {[...Array(res.priceLevel.length)].map((_, i) => (
                    <DollarSign key={i} className="w-3 h-3 text-slate-400" />
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {res.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full">#{tag}</span>
                ))}
                {res.kidFriendly && (
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full flex items-center gap-1">
                    <Baby className="w-3 h-3" /> 親子友善
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-600 mb-4">{res.description}</p>
              <div className="bg-orange-50 p-3 rounded-lg">
                <div className="flex items-center gap-1 text-xs font-bold text-orange-700 mb-1">
                  <ThumbsUp className="w-3 h-3" /> 必點推薦
                </div>
                <div className="flex flex-wrap gap-x-3 text-sm text-slate-700">
                  {res.mustOrder.map((item, idx) => (
                    <span key={idx} className="after:content-['•'] after:ml-2 after:text-slate-300 last:after:content-['']">{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodGuide;