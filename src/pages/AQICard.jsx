import React from "react";
import { WiHumidity, WiStrongWind } from "react-icons/wi";
import { BsSunFill } from "react-icons/bs";

const AQICard = ({ 
  city = "Mohali",
  aqi = 157,
  status = "Unhealthy",
  pollutant = "PM2.5",
  concentration = "64.7 µg/m³",
  temperature = 22,
  humidity = 63,
  windSpeed = 1.1,
  lastUpdated = "08:30, October 16",
  forecast = [
    { day: "Thursday", aqi: 145, high: 28, low: 19 },
    { day: "Friday", aqi: 151, high: 29, low: 19 },
    { day: "Saturday", aqi: 149, high: 29, low: 19 }
  ],
  className = "" // Allow custom classes from parent
}) => {
  
  // Get AQI color based on value
  const getAQIColor = (value) => {
    if (value <= 50) return "bg-green-500";
    if (value <= 100) return "bg-yellow-500";
    if (value <= 150) return "bg-orange-500";
    if (value <= 200) return "bg-red-500";
    if (value <= 300) return "bg-purple-500";
    return "bg-rose-900";
  };

  const getAQIBgColor = (value) => {
    if (value <= 50) return "bg-green-50";
    if (value <= 100) return "bg-yellow-50";
    if (value <= 150) return "bg-orange-50";
    if (value <= 200) return "bg-red-50";
    if (value <= 300) return "bg-purple-50";
    return "bg-rose-50";
  };

  return (
    <div className={`w-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 ${className}`}>
      {/* Header */}
      <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-200">
        <h2 className="text-base sm:text-xl font-bold text-gray-900">
          {city} air quality index (AQI)
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Last updated at {lastUpdated}
        </p>
      </div>

      {/* Main AQI Display */}
      <div className={`px-4 sm:px-5 py-4 sm:py-6 ${getAQIBgColor(aqi)}`}>
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className={`h-12 w-12 sm:h-14 sm:w-14 ${getAQIColor(aqi)} rounded-lg flex items-center justify-center`}>
              <svg 
                className="w-6 h-6 sm:w-8 sm:h-8 text-white" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
            </div>
          </div>

          {/* AQI Value */}
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-5xl font-bold text-gray-900">{aqi}</span>
              <span className="text-xs uppercase font-semibold text-gray-600">{status}</span>
            </div>
            <div className="mt-2 flex items-center gap-2 flex-wrap">
              <span className={`inline-block px-2 py-0.5 ${getAQIColor(aqi)} text-white text-xs font-medium rounded`}>
                US AQI°
              </span>
              <span className="bg-white px-2 py-0.5 text-xs font-medium rounded border border-gray-200">
                {pollutant} | {concentration}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Weather Info */}
      <div className="px-4 sm:px-5 py-3 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1.5 sm:gap-2 text-gray-700">
            <BsSunFill className="text-yellow-500" size={18} />
            <span className="font-medium">{temperature}°</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 text-gray-700">
            <WiHumidity className="text-blue-500" size={22} />
            <span className="font-medium">{humidity}%</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 text-gray-700">
            <WiStrongWind className="text-gray-500" size={22} />
            <span className="font-medium">{windSpeed} km/h</span>
          </div>
        </div>
      </div>

      {/* 3-Day Forecast */}
      <div className="px-4 sm:px-5 py-3 sm:py-4 bg-white">
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {forecast.map((day, index) => (
            <div 
              key={index}
              className={`${getAQIBgColor(day.aqi)} rounded-lg p-2 sm:p-3 text-center`}
            >
              <p className="text-xs text-gray-600 font-medium mb-1.5 sm:mb-2 truncate">
                {day.day}
              </p>
              <div className={`${getAQIColor(day.aqi)} text-white text-base sm:text-lg font-bold py-1 sm:py-1.5 px-1.5 sm:px-2 rounded-md mb-1.5 sm:mb-2`}>
                {day.aqi}
              </div>
              <div className="flex items-center justify-center gap-1 mb-0.5 sm:mb-1">
                <BsSunFill className="text-yellow-500 text-xs" />
                <span className="text-xs text-gray-700 font-medium">{day.low}°</span>
              </div>
              <p className="text-xs text-gray-500">{day.high}°</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Button */}
      <div className="px-4 sm:px-5 pb-4 sm:pb-5">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 sm:py-3 rounded-lg transition duration-200 shadow-sm text-sm sm:text-base">
          7-DAYS HISTORY
        </button>
      </div>
    </div>
  );
};

export default AQICard;
