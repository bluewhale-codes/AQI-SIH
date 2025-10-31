import React, { useState } from 'react';
import { Search, Plus, SlidersHorizontal } from 'lucide-react';

const DashboardHeader = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All datasets');

  const filters = [
    'All datasets',
    'Computer Science',
    'Education',
    'Classification',
    'Computer Vision',
    'NLP',
    'Data Visualization',
    'Pre-Trained Model'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          

          
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-start justify-between">
          {/* Left Content */}
          <div className="flex-1">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Rural Air Quality Intelligence Dashboard</h1>
            <p className="text-gray-600 text-lg mb-8">
              Empowering communities with real-time and historical air quality insights for India’s rural regions. Search any village or rural block to explore accurate environmental health data and monitor air pollution trends.{' '}
              <a href="#" className="text-gray-900 underline hover:text-gray-700">
                Learn more
              </a>{' '}
              about data types, creating, and collaborating.
            </p>
            
          </div>

          {/* Right Illustration */}
          <div className="ml-12">
            <img 
              src="https://res.cloudinary.com/dycjjaxsk/image/upload/v1761803588/pexels-bardalacray-3172830_1_y57uj3.jpg" 
              alt="Data illustration" 
              className="w-64 h-64"
            />
          </div>
        </div>

        {/* Search and Filters Section */}
        <div className="mt-16">
          {/* Dataset Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search datasets"
              className="w-full pl-12 pr-32 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2 text-gray-700 font-medium hover:text-gray-900">
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Filter Tags */}
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeFilter === filter
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardHeader;
