import React from 'react'
import HealthImpactDashboard from '../Compo/HealthImpactDashboard';
const HealthReport = () => {
  const customHealthData = {
    admissions: {
      current: 1450,
      previous: 1200,
      trend: 20.8,
      unit: 'cases this month'
    },
    // ... other health data
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <HealthImpactDashboard 
        populationData={null} // Use defaults or pass custom data
        healthData={customHealthData}
        facilityData={null}
      />
    </div>
  );
}

export default HealthReport
