import React from 'react';
import { FaIndustry, FaTruck, FaTrashAlt } from 'react-icons/fa';
import { GiWheat, GiWoodPile } from 'react-icons/gi';
import { MdConstruction } from 'react-icons/md';

// Data can be defined in a separate file or fetched from an API


const LocalAqiFactors = ({ factors, activeFactors = [] }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
        What Affects Your Air?
      </h2>
      <p className="text-center text-gray-500 mb-8">
        Local sources that can change the air quality in your area.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {factors.map((factor) => (
          <div
            key={factor.id}
            className={`relative rounded-xl p-4 text-center transition-all duration-300 transform border-2 ${
              activeFactors.includes(factor.id)
                ? 'bg-blue-50 border-blue-400 scale-105 shadow-2xl'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            {activeFactors.includes(factor.id) && (
                <div className="absolute -top-3 -right-3 h-8 w-8 bg-blue-500 rounded-full text-white flex items-center justify-center font-bold border-4 border-white">
                    !
                </div>
            )}
            <div
              className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-white mb-3 ${factor.color}`}
            >
              <div className="transform scale-150">{factor.icon}</div>
            </div>
            <h3 className="font-bold text-gray-900 text-md">
              {factor.title}
            </h3>
            <p className="text-sm text-gray-600 font-hindi">
              ({factor.title_hi})
            </p>
          </div>
        ))}
      </div>
       {activeFactors.length > 0 && (
        <div className="mt-8 p-4 bg-gray-100 border-t-4 border-gray-300 rounded-b-lg">
            <p className="text-sm text-center text-gray-700">
                Factors marked with <span className="inline-block mx-1 h-5 w-5 bg-blue-500 rounded-full text-white text-xs text-center font-bold leading-5">!</span> are currently major contributors to your local air quality.
            </p>
        </div>
       )}
    </div>
  );
};

export default LocalAqiFactors;
