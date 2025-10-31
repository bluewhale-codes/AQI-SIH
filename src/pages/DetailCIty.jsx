import React from 'react'
import CityDetailCard from './MainDashboard.jsx/CityDetailCard'
const DetailCIty = () => {
  return (
    <div>
    <CityDetailCard 
      title="Global Earthquake-Tsunami Risk Assessment Dataset"
      subtitle="Seismic Features & Tsunami Classification Dataset for Risk Assessment"
      thumbnailUrl="https://jantahousing.com/wp-content/uploads/2023/11/maxresdefault-2.jpg"
      codeCount={55}
      discussionCount={4}
      suggestionsCount={0}
      usabilityScore="10.00"
      license="Attribution 4.0 International (CC BY 4.0)"
      updateFrequency="Never"
      tags={["Tabular"]}
      description="The Global Earthquake-Tsunami Risk Assessment Dataset is a comprehensive, machine learning-ready dataset containing seismic characteristics and tsunami potential indicators for 782 significant earthquakes recorded globally from 2001 to 2022. This dataset is specifically designed for tsunami risk prediction, earthquake analysis, and seismic hazard assessment applications."
    />
    </div>
  )
}

export default DetailCIty
