import React from 'react'
import SourceApportionmentDashboard from './MainDashboard.jsx/SourceApportionmentDashboard';
const Source = () => {
 const handleSourceChange = (sourceId) => {
    console.log('Selected source:', sourceId);
    // Fetch detailed data for this source
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <SourceApportionmentDashboard 
        selectedDistrict="Sangrur, Punjab"
        sectoralData={null} // Pass your custom data
        activityData={null} // Pass your custom data
      />
    </div>
  );
}

export default Source
