// src/pages/DistrictDashboard.jsx
import React,{useState} from "react";
import AQICardB from "./AQICardB";
import MyMap from "../../pages/MyMap";

import FeatureTitle from "../../Compo/FeatureTitle";
import FarmingAQICalendar from "./FarmingAQICalendar";
import { Activity, Wind, Droplet, AlertCircle, Calendar, RefreshCw } from 'lucide-react';
import FeatureTabs from "../../pages/FeatureTabs";

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
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [dateRange, setDateRange] = useState('today');
    const [isLoading, setIsLoading] = useState(false);
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    if (onDateChange) {
      onDateChange(newDate);
    }
  };

  const handleDateRangeChange = (range) => {
    setDateRange(range);
    const today = new Date();
    let newDate;

    switch(range) {
      case 'today':
        newDate = today;
        break;
      case 'yesterday':
        newDate = new Date(today.setDate(today.getDate() - 1));
        break;
      case 'week':
        newDate = new Date(today.setDate(today.getDate() - 7));
        break;
      case 'month':
        newDate = new Date(today.setMonth(today.getMonth() - 1));
        break;
      default:
        newDate = today;
    }
    
    setSelectedDate(newDate.toISOString().split('T')[0]);
    if (onDateChange) {
      onDateChange(newDate.toISOString().split('T')[0]);
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onDateChange) {
        onDateChange(selectedDate);
      }
    }, 1000);
  };
  return (
    <>
        <div className="pr-[50px] pl-[50px] pt-[30px]">
          {/* Date Selection Bar */}
      <div className="mb-6 bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="flex flex-wrap items-center gap-4">
          {/* Date Picker */}
          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <Calendar className="w-5 h-5 text-gray-600" />
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              max={new Date().toISOString().split('T')[0]}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Quick Date Range Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleDateRangeChange('today')}
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition ${
                dateRange === 'today'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => handleDateRangeChange('yesterday')}
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition ${
                dateRange === 'yesterday'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Yesterday
            </button>
            <button
              onClick={() => handleDateRangeChange('week')}
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition ${
                dateRange === 'week'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Last 7 Days
            </button>
            <button
              onClick={() => handleDateRangeChange('month')}
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition ${
                dateRange === 'month'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Last Month
            </button>
          </div>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="text-xs">Refresh</span>
          </button>
        </div>

        {/* Selected Date Display */}
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-600">
            Showing data for: <span className="font-bold text-gray-900">{new Date(selectedDate).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </p>
        </div>
      </div>
        </div>
        
       <div className="bg-black-50">
      {/* <FeatureTitle 
      title="Benchmarks"
      description="Discover open, rigorous benchmarks and model leaderboards from top AI labs and researchers in one place."
      link={{
        text: "Learn more in the Documentation",
        href: "/docs"
      }}
      illustration={{
        src: "/illustration.svg",
        alt: "Person reviewing benchmarks"
      }}
    /> */}
    </div>
       {/* <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <MyMap/>
       </div>
       <div className="p-4 md:p-6 bg-black-50 min-h-screen">
         <AQICardB />
         <div className="mt-8">
         <FarmingAQICalendar/>
         </div>
       </div> */}
       <FeatureTabs/>
       
    </>
  );
}
