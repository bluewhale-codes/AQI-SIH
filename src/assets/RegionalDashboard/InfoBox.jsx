import React from 'react';
import { FiInfo } from 'react-icons/fi';

const InfoBox = ({ title, children }) => {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg shadow-md mb-6">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <FiInfo className="h-6 w-6 text-blue-500" />
        </div>
        <div className="ml-4">
          <h2 className="text-xl font-bold text-blue-800 mb-2">
            {title}
          </h2>
          <div className="text-gray-700 leading-relaxed space-y-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
