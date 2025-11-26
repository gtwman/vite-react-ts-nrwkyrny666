import React from 'react';
import { Wind, CloudSun, Cloud, Sun } from 'lucide-react';

interface WeatherCardProps {
  temp: string;
  condition: string;
  windScale: string;
  icon: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ temp, condition, windScale, icon }) => {
  const getIcon = () => {
    switch (icon) {
      case 'windy': return <Wind className="w-8 h-8 text-blue-500" />;
      case 'sunny': return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'cloudy': return <Cloud className="w-8 h-8 text-gray-400" />;
      default: return <CloudSun className="w-8 h-8 text-orange-400" />;
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-slate-50 rounded-full">{getIcon()}</div>
        <div>
          <p className="text-sm text-slate-500 font-medium">{condition}</p>
          <h3 className="text-xl font-bold text-slate-800">{temp}</h3>
        </div>
      </div>
      <div className="text-right">
        <div className="flex items-center justify-end space-x-1 text-slate-600">
          <Wind className="w-4 h-4" />
          <span className="text-sm font-semibold">風力</span>
        </div>
        <p className="text-sm text-red-500 font-medium">{windScale}</p>
      </div>
    </div>
  );
};

export default WeatherCard;