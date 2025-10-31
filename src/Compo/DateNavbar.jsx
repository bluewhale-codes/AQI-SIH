import React, { useState } from 'react';
import { 
  Calendar, Menu, X, Bell, User, Search, 
  ChevronDown, LogOut, Settings, Home 
} from 'lucide-react';

const DateNavbar = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    setIsDatePickerOpen(false);
    if (onDateChange) {
      onDateChange(newDate);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Title */}
          <h1 className="text-2xl font-bold text-gray-900">AQI Dashboard</h1>

          {/* Date Picker */}
          <div className="relative">
            <button
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Calendar className="w-5 h-5" />
              <span className="font-semibold">{formatDate(selectedDate)}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isDatePickerOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Date Picker Dropdown */}
            {isDatePickerOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsDatePickerOpen(false)}
                ></div>
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-20">
                  <h3 className="text-sm font-bold text-gray-900 mb-3">Select Date</h3>
                  
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DateNavbar;
