import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { WiHumidity, WiStrongWind, WiThermometer } from "react-icons/wi";
import MyMap from "./MyMap";
import HealthSuggestionsCard from "./HealthSuggestionsCard";
const volunteerLocation = { lat: 30.753380610709804, lng: 76.77167276037278 };
const pickupLocation = { lat: 30.765963936792573, lng: 76.77370570272477 };
import AQICard from "./AQICard";
const ExploreAirQuality = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <div className="flex flex-col md:flex-row w-full h-screen p-4 gap-4 bg-gray-50">
      {/* Left: Map (70%) */}
      <div className="w-full md:w-[70%] bg-white rounded-xl shadow-md overflow-hidden">
        <MyMap  volunteerPos={volunteerLocation} pickupPos={pickupLocation} />
      </div>

      {/* Right: AQI Card (30%) */}
      <div className="w-full md:w-[30%]">
        <AQICard />
      </div>
    </div>
    </>
  );
};

export default ExploreAirQuality;
