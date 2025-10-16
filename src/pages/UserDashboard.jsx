import React, { useState } from "react";
import MyMap from "./MyMap";
import AQICard from "./AQICard";
import HealthSuggestionsCard from "./HealthSuggestionsCard";
import AQIScale from "../Compo/AQIScale";
import CityRankingCard from "../Compo/CityRankingCard";
import LocalAqiFactors from "../Compo/LocalAqiFactors";
import { FaIndustry, FaTruck, FaTrashAlt } from 'react-icons/fa';
import { GiWheat, GiWoodPile } from 'react-icons/gi';
import { MdConstruction } from 'react-icons/md';
import AppFooter from "../Compo/AppFooter";
const factorsData = [
  {
    id: 'crop-burning',
    icon: <GiWheat />,
    title: 'Crop Burning',
    title_hi: 'फसल जलाना',
    description: 'Burning of agricultural residue releases smoke.',
    color: 'bg-orange-500',
  },
  {
    id: 'vehicle-emissions',
    icon: <FaTruck />,
    title: 'Vehicle Emissions',
    title_hi: 'वाहनों का धुआं',
    description: 'Exhaust from trucks and tractors.',
    color: 'bg-slate-500',
  },
  {
    id: 'industrial-areas',
    icon: <FaIndustry />,
    title: 'Industrial Areas',
    title_hi: 'औद्योगिक क्षेत्र',
    description: 'Smoke from nearby factories and brick kilns.',
    color: 'bg-gray-700',
  },
  {
    id: 'construction-dust',
    icon: <MdConstruction />,
    title: 'Construction Dust',
    title_hi: 'निर्माण की धूल',
    description: 'Dust from road work and new buildings.',
    color: 'bg-yellow-600',
  },
  {
    id: 'waste-burning',
    icon: <FaTrashAlt />,
    title: 'Waste Burning',
    title_hi: 'कचरा जलाना',
    description: 'Burning of household or plastic waste.',
    color: 'bg-red-500',
  },
  {
    id: 'wood-burning',
    icon: <GiWoodPile />,
    title: 'Wood Stoves',
    title_hi: 'लकड़ी का चूल्हा',
    description: 'Smoke from traditional cooking stoves.',
    color: 'bg-amber-700',
  },
];
const currentlyActive = ['construction-dust', 'vehicle-emissions'];

const citiesData = [
  { rank: 1, flag: '🇨🇩', city: 'Kinshasa', country: 'Democratic Republic of the Congo', aqi: 289 },
  { rank: 2, flag: '🇵🇰', city: 'Lahore', country: 'Pakistan', aqi: 286 },
  { rank: 3, flag: '🇮🇳', city: 'Delhi', country: 'India', aqi: 236 },
  { rank: 4, flag: '🇧🇩', city: 'Dhaka', country: 'Bangladesh', aqi: 173 },
  { rank: 5, flag: '🇮🇳', city: 'Kolkata', country: 'India', aqi: 172 },
  { rank: 6, flag: '🇮🇳', city: 'Mumbai', country: 'India', aqi: 161 },
  { rank: 7, flag: '🇮🇩', city: 'Jakarta', country: 'Indonesia', aqi: 161 },
  { rank: 8, flag: '🇦🇪', city: 'Dubai', country: 'United Arab Emirates', aqi: 159 },
  { rank: 9, flag: '🇺🇿', city: 'Tashkent', country: 'Uzbekistan', aqi: 149 },
  { rank: 10, flag: '🇦🇫', city: 'Kabul', country: 'Afghanistan', aqi: 136 },
];


const volunteerLocation = { lat: 30.753380610709804, lng: 76.77167276037278 };
const pickupLocation = { lat: 30.765963936792573, lng: 76.77370570272477 };

export default function UserDashboard() {
  const [trainingComplete, setTrainingComplete] = useState(45);
  const [greenPoints, setGreenPoints] = useState(320);
  const [reports, setReports] = useState([
    { id: 1, title: "Overflowing public bin", status: "Resolved", date: "2025-09-02" },
    { id: 2, title: "Illegal dumping near park", status: "Pending", date: "2025-09-07" },
  ]);
  const [myBins] = useState({ dry: true, wet: true, hazardous: true });
  const [collectionSchedule] = useState([
    { day: "Mon", type: "10kg", time: "7:00 AM" },
    { day: "Wed", type: "4kg", time: "9:00 AM" },
    { day: "Fri", type: "7kg", time: "10:00 AM" },
  ]);
  const [missedPickups, setMissedPickups] = useState([]);
  const currentAqivalue = 157;

  // mock handlers
  function handleReport(e) {
    e.preventDefault();
    const title = e.target.elements.title.value;
    setReports((p) => [
      { id: Date.now(), title, status: "Reported", date: new Date().toISOString().slice(0, 10) },
      ...p,
    ]);
    e.target.reset();
  }

  function schedulePickup(type) {
    const request = {
      id: Date.now(),
      type,
      status: "Volunteer Assigned",
      date: new Date().toISOString().slice(0, 10),
    };
    setMissedPickups((p) => [request, ...p]);
  }

  return (
    <div className="min-h-screen bg-[rgba(34, 34, 188, 1)] p-4 sm:p-6">
      {/* Header */}
      <header className="mb-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 cursor-pointer">
        <img
          src="https://res.cloudinary.com/dycjjaxsk/image/upload/v1760593035/ChatGPT_Image_Oct_16_2025_10_46_25_AM_1_1_euarjo.png"
          alt="Smart Dustbin Logo"
          className="h-8 sm:h-10 md:h-12 w-auto"
        />
      </div>
            <p className="text-xs sm:text-sm text-white-500">
              “साँसों की देखभाल, हमारी ज़िम्मेदारी
            </p>
          </div>

          
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column */}
        <section className="lg:col-span-3 space-y-6">
          {/* Map */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm">
            <MyMap volunteerPos={volunteerLocation} pickupPos={pickupLocation} />
          </div>

          {/* Collection Tracking */}
          <div>
            <AQIScale currentAqi={currentAqivalue}/>
          </div>

          {/* Impact */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm">
           <HealthSuggestionsCard/>
          </div>

          {/* Training */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm">
            <LocalAqiFactors factors={factorsData} activeFactors={currentlyActive}/>
          </div>

          

          
        </section>

        {/* Sidebar */}
        <aside className="space-y-6 lg:col-span-1">
          <div>
             <AQICard/>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
             <CityRankingCard rankings={citiesData}/>
          </div>
        </aside>
      </main>

      {/* Footer */}
     <div className="mt-4">
       <AppFooter/>
     </div>
    </div>
  );
}

// --- Subcomponents ---
function ModuleCard({ title, progress = 0 }) {
  return (
    <div className="p-3 rounded bg-gray-50">
      <div className="text-sm text-gray-600">{title}</div>
      <div className="mt-3">
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="h-2 rounded-full"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg,#34d399,#10b981)",
            }}
          />
        </div>
        <div className="text-xs text-gray-500 mt-2">{progress}% complete</div>
      </div>
    </div>
  );
}

function StatusPill({ label, ok }) {
  return (
    <div className="flex items-center gap-3 p-2 border rounded">
      <div className={`w-3 h-3 rounded-full ${ok ? "bg-green-500" : "bg-red-400"}`} />
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-gray-500">{ok ? "Issued" : "Not issued"}</div>
      </div>
    </div>
  );
}

function ImpactCard({ title, value }) {
  return (
    <div className="p-3 rounded bg-gray-50 text-center">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="mt-2 font-medium text-lg">{value}</div>
    </div>
  );
}

function BinIcon({ className = "w-8 h-8" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3" y="6" width="18" height="14" rx="2" stroke="#4B5563" strokeWidth="1.5" />
      <path
        d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"
        stroke="#4B5563"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
