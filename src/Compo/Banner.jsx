import React from 'react';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  // Example image: replace with your actual asset or URL
  const bgImageUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80';

  const navigate = useNavigate();
 

  const handleButtonClick = () => {
    navigate('/reagion'); // Replace '/dashboard' with your desired route
  };

  return (
    <div
      className="w-screen h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgImageUrl})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl text-center px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Regional Air Quality Dashboard for Smarter Policy
        </h1>
        <p className="text-lg md:text-xl text-white mb-6">
          Our platform delivers <span className="font-semibold text-blue-200">region-specific Air Quality (AQI) analysis</span> that empowers local authorities and government agencies to monitor, assess, and improve local air quality.
        </p>
        <ul className="space-y-3 text-white text-sm md:text-base list-disc list-inside mb-8">
          <li>Designed for rural and urban dashboards</li>
          <li>Supports evidence-based decision making</li>
          <li>Real-time environmental insights for stakeholders</li>
        </ul>

        <button
          onClick={handleButtonClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg text-lg transition-colors"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Banner;
