import React from 'react';

const aqiLevels = [
  {
    range: '0-50',
    level: 'Good',
    color: 'bg-green-500',
    textColor: 'text-white',
    description: 'Air quality is satisfactory, and air pollution poses little or no risk.',
  },
  {
    range: '51-100',
    level: 'Moderate',
    color: 'bg-yellow-400',
    textColor: 'text-gray-800',
    description:
      'Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.',
  },
  {
    range: '101-150',
    level: 'Unhealthy for Sensitive Groups',
    color: 'bg-orange-500',
    textColor: 'text-white',
    description:
      'Members of sensitive groups may experience health effects. The general public is less likely to be affected.',
  },
  {
    range: '151-200',
    level: 'Unhealthy',
    color: 'bg-red-500',
    textColor: 'text-white',
    description: 'Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.',
  },
  {
    range: '201-300',
    level: 'Very Unhealthy',
    color: 'bg-purple-600',
    textColor: 'text-white',
    description: 'Health alert: The risk of health effects is increased for everyone.',
  },
  {
    range: '300+',
    level: 'Hazardous',
    color: 'bg-maroon-800', // Custom color, see tailwind.config.js
    textColor: 'text-white',
    description: 'Health warning of emergency conditions: everyone is more likely to be affected.',
  },
];

const AQIScale = ({ currentAqi }) => {
  const isCurrentLevel = (range) => {
    if (!currentAqi) return false;
    const [min, max] = range.split('-').map(Number);
    if (!max && currentAqi >= min) return true; // For "300+"
    return currentAqi >= min && currentAqi <= max;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-6">
        Air Quality Index
      </h2>
      <div className="flex flex-col sm:flex-row rounded-lg overflow-hidden border border-gray-200">
        {aqiLevels.map((level, index) => (
          <div
            key={index}
            className={`flex-1 text-center transition-all duration-300 ${
              isCurrentLevel(level.range) ? 'transform scale-105 sm:scale-110 z-10' : ''
            }`}
          >
            <div
              className={`${level.color} ${level.textColor} p-3 sm:p-4 font-bold text-lg sm:text-xl relative ${
                isCurrentLevel(level.range) ? 'shadow-2xl' : 'shadow-inner'
              }`}
            >
              {isCurrentLevel(level.range) && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-white"></div>
              )}
              {level.range}
            </div>
            <div className="p-2 sm:p-3 bg-gray-50 text-xs sm:text-sm font-semibold text-gray-700 h-full">
              {level.level.split(' ').map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Description for the current level */}
      {currentAqi && aqiLevels.find(l => isCurrentLevel(l.range)) && (
         <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-bold text-blue-800">Current Health Advisory:</h3>
            <p className="text-sm text-blue-700 mt-1">
                {aqiLevels.find(l => isCurrentLevel(l.range))?.description}
            </p>
         </div>
      )}
    </div>
  );
};

export default AQIScale;
