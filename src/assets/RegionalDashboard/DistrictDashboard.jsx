// src/pages/DistrictDashboard.jsx
import React from "react";
import AQICardB from "./AQICardB";
import MyMap from "../../pages/MyMap";
import RuralRegionNavbar from "../../Compo/RuralRegionNavbar";
import AQIGridMap from "./AqiGridMap";
import FarmingAQICalendar from "./FarmingAQICalendar";
const ruralUPRegions = [
  'Sitapur',
  'Gondlamau Block',
  'Lakhimpur',
  'Barabanki',
  'Hardoi',
  'Unnao',
  'Raebareli',
  'Kheri',
  'Farrukhabad',
  'Shahjahanpur'
];

export default function DistrictDashboard() {
  return (
    <>
        <div>
          
        </div>
       <RuralRegionNavbar regions={ruralUPRegions}/>
       <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <MyMap/>
       </div>
       <div className="p-4 md:p-6 bg-black-50 min-h-screen">
         <AQICardB />
         <div className="mt-8">
         <FarmingAQICalendar/>
         </div>
       </div>
       
    </>
  );
}
