import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const RuralRegionNavbar = ({ regions }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(regions[0] || 'Select Region');

  const handleSelectRegion = (region) => {
    setSelectedRegion(region);
    setIsDropdownOpen(false);
    // You can add logic here to fetch data for the selected region
    console.log(`Fetching data for: ${region}`);
  };

  return (
    <nav className="w-full bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side: Title */}
          <div className="flex-shrink-0">
            <h1 className="text-lg font-semibold tracking-wider">
              CPCB-Compliant AQI - Rural Region
            </h1>
          </div>

        

          {/* Right Side: Dropdown Selector */}
          <div className="relative z-[2000]">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between w-64 px-4 py-2 bg-white text-gray-700 rounded-md shadow-sm text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="truncate">UP {selectedRegion}</span>
              <FiChevronDown className="ml-2 -mr-1 h-5 w-5 text-gray-400" />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div
                className="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                role="menu"
                aria-orientation="vertical"
              >
                <div className="py-1" role="none">
                  {regions.map((region, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelectRegion(region)}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default RuralRegionNavbar;
