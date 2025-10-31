import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const CityDetailCard = ({ 
  title = "Global Earthquake-Tsunami Risk Assessment Dataset",
  subtitle = "Seismic Features & Tsunami Classification Dataset for Risk Assessment",
  thumbnailUrl,
  codeCount = 55,
  discussionCount = 4,
  suggestionsCount = 0,
  usabilityScore = "10.00",
  license = "Attribution 4.0 International (CC BY 4.0)",
  updateFrequency = "Never",
  tags = ["Tabular"],
  description
}) => {
  const [activeTab, setActiveTab] = useState('data-card');

  const tabs = [
    { id: 'access-btn', label: 'Access Dashboard' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-start justify-between gap-8">
            {/* Title and Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                {title}
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                {subtitle}
              </p>

              <Link
                  to="/reagion"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                 Access Full Dashboard
                </Link>
            </div>

            {/* Thumbnail */}
            <div className="flex-shrink-0">
              <img 
                src={thumbnailUrl || "/api/placeholder/280/160"} 
                alt="Dataset visualization"
                className="w-70 h-32 rounded-lg object-cover shadow-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Left Content */}
          <div className="flex-1">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About Dataset
              </h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {title}
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    Overview
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    {description || 
                      "The Global Earthquake-Tsunami Risk Assessment Dataset is a comprehensive, machine learning-ready dataset containing seismic characteristics and tsunami potential indicators for 782 significant earthquakes recorded globally from 2001 to 2022. This dataset is specifically designed for tsunami risk prediction, earthquake analysis, and seismic hazard assessment applications."}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    Dataset Information
                  </h4>
                  {/* Additional content would go here */}
                </div>
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <aside className="w-72 flex-shrink-0">
            <div className="sticky top-6 space-y-6">
              {/* Usability Score */}
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-semibold text-gray-900">
                    Usability
                  </h3>
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  {usabilityScore}
                </p>
              </div>

              {/* License */}
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  License
                </h3>
                <a 
                  href="#" 
                  className="text-sm text-blue-600 hover:text-blue-700 underline"
                >
                  {license}
                </a>
              </div>

              {/* Update Frequency */}
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  Expected update frequency
                </h3>
                <p className="text-sm text-gray-700">
                  {updateFrequency}
                </p>
              </div>

              {/* Tags */}
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="text-base font-semibold text-gray-900 mb-3">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-200 transition cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};



export default CityDetailCard;
