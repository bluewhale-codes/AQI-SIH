import React from 'react';
import { FiInfo } from 'react-icons/fi';

// Helper function to get the correct color for the AQI badge
const getAqiColor = (aqi) => {
  if (aqi <= 50) return 'bg-green-500';
  if (aqi <= 100) return 'bg-yellow-400';
  if (aqi <= 150) return 'bg-orange-500';
  if (aqi <= 200) return 'bg-red-500';
  if (aqi <= 300) return 'bg-purple-600';
  return 'bg-maroon-800'; // Define maroon-800 in your tailwind.config.js
};

const CityRankingCard = ({ rankings }) => {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
      {/* Card Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold text-gray-800">
          Live city ranking
        </h2>
        <FiInfo className="text-gray-400" />
      </div>
      <p className="text-sm text-gray-500 mb-6">
        Cities with high air pollution (AQI*)
      </p>

      {/* Table Header */}
      <div className="flex items-center text-xs font-bold text-gray-500 uppercase px-2 mb-2">
        <div className="w-8">#</div>
        <div className="flex-1">Major City</div>
        <div>US AQI*</div>
      </div>

      {/* Rankings List */}
      <div className="space-y-1">
        {rankings.map((item) => (
          <div
            key={item.rank}
            className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {/* Rank */}
            <div className="w-8 font-medium text-gray-600">{item.rank}</div>

            {/* City and Flag */}
            <div className="flex-1 flex items-center gap-3">
              <span className="text-2xl">{item.flag}</span>
              <div>
                <p className="font-semibold text-gray-800">{item.city}</p>
                <p className="text-xs text-gray-500">{item.country}</p>
              </div>
            </div>

            {/* AQI Badge */}
            <div
              className={`w-16 h-8 flex items-center justify-center rounded-md text-white font-bold text-sm ${getAqiColor(
                item.aqi
              )}`}
            >
              {item.aqi}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Button */}
      <div className="mt-6">
        <button className="w-full bg-slate-600 hover:bg-slate-700 text-white font-semibold py-3 rounded-lg transition-colors">
          SEE FULL RANKING
        </button>
      </div>
    </div>
  );
};

export default CityRankingCard;

