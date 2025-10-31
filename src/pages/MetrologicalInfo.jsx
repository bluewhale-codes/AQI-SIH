import React, { useState, useEffect } from 'react';
import MeteorologicalDashboard from '../Compo/MeteorologicalDashboard';
const MetrologicalInfo = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleString('en-IN'));

  const handleRefresh = () => {
    // Fetch fresh meteorological data from ERA5 or your API
    console.log('Fetching fresh meteorological data...');
    setLastUpdated(new Date().toLocaleString('en-IN'));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <MeteorologicalDashboard 
        meteoData={null} // Pass your ERA5 data here
        lastUpdated={lastUpdated}
        onRefresh={handleRefresh}
      />
    </div>
  );
}

export default MetrologicalInfo
