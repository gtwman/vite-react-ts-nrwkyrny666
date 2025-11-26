import React, { useState } from 'react';
import { DayPlan, ActivityType } from '../types';
import WeatherCard from './WeatherCard';
import { MapPin, Clock, Info, Ticket, Utensils, Bus, Camera, BedDouble } from 'lucide-react';

interface ItineraryViewProps {
  days: DayPlan[];
}

const ItineraryView: React.FC<ItineraryViewProps> = ({ days }) => {
  const [activeDay, setActiveDay] = useState<number>(0);

  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case ActivityType.FOOD: return <Utensils className="w-4 h-4" />;
      case ActivityType.TRANSPORT: return <Bus className="w-4 h-4" />;
      case ActivityType.SIGHTSEEING: return <Camera className="w-4 h-4" />;
      case ActivityType.ACTIVITY: return <Ticket className="w-4 h-4" />;
      case ActivityType.REST: return <BedDouble className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: ActivityType) => {
    switch (type) {
      case ActivityType.FOOD: return 'bg-orange-100 text-orange-600 border-orange-200';
      case ActivityType.TRANSPORT: return 'bg-blue-100 text-blue-600 border-blue-200';
      case ActivityType.SIGHTSEEING: return 'bg-emerald-100 text-emerald-600 border-emerald-200';
      case ActivityType.ACTIVITY: return 'bg-purple-100 text-purple-600 border-purple-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="pb-24">
      <div className="sticky top-0 z-10 bg-slate-50/95 backdrop-blur-sm pt-2 pb-4 px-4 overflow-x-auto whitespace-nowrap border-b border-slate-200">
        <div className="flex space-x-2">
          {days.map((day, index) => (
            <button
              key={day.date}
              onClick={() => setActiveDay(index)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeDay === index ? 'bg-blue-600 text-white shadow-md transform scale-105' : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              {day.dayLabel.split(':')[0]} <span className="text-xs font-normal opacity-80">{day.date.slice(5)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 mt-6 space-y-6 animate-fade-in">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-800 mb-2">{days[activeDay].dayLabel}</h2>
          <WeatherCard {...days[activeDay].weatherForecast} />
        </div>

        <div className="relative border-l-2 border-slate-200 ml-3 space-y-8">
          {days[activeDay].items.map((item) => (
            <div key={item.id} className="relative pl-8 group">
              <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white shadow-sm ${item.type === ActivityType.FOOD ? 'bg-orange-500' : 'bg-blue-500'}`}></div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center text-sm font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                    <Clock className="w-3 h-3 mr-1" />{item.time}
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-bold border flex items-center gap-1 ${getActivityColor(item.type)}`}>
                    {getActivityIcon(item.type)}
                    <span>{item.type === ActivityType.FOOD ? '餐飲' : item.type === ActivityType.SIGHTSEEING ? '景點' : '行程'}</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">{item.description}</p>
                <div className="space-y-2">
                  {item.ticketInfo && <div className="flex items-start text-xs text-purple-600 bg-purple-50 p-2 rounded-lg"><Ticket className="w-3 h-3 mr-1.5 flex-shrink-0" />{item.ticketInfo}</div>}
                  {item.tips && <div className="flex items-start text-xs text-amber-700 bg-amber-50 p-2 rounded-lg"><Info className="w-3 h-3 mr-1.5 flex-shrink-0" />{item.tips}</div>}
                  {item.location && <div className="flex items-center text-xs text-slate-400"><MapPin className="w-3 h-3 mr-1" />{item.location.name}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItineraryView;