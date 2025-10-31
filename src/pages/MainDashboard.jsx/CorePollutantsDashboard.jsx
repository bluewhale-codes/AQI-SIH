import React, { useState } from 'react';
import { Activity, Wind, Droplet, AlertCircle, Calendar, RefreshCw } from 'lucide-react';

const PollutantCard = ({ name, formula, value, unit, status, description, icon: Icon }) => {
  const statusColors = {
    good: 'border-blue-300',
    moderate: 'border-blue-400',
    poor: 'border-blue-500',
    severe: 'border-blue-600',
    critical: 'border-blue-700'
  };

  const statusBadgeColors = {
    good: 'bg-gray-200 text-gray-700',
    moderate: 'bg-blue-100 text-blue-700',
    poor: 'bg-blue-200 text-blue-800',
    severe: 'bg-blue-500 text-white',
    critical: 'bg-blue-700 text-white'
  };

  return (
    <div className={`p-5 rounded-xl bg-white border-2 transition-all duration-300 hover:shadow-lg hover:scale-105 ${statusColors[status] || 'border-gray-300'}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-gray-900">{name}</h3>
            <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${statusBadgeColors[status] || 'bg-gray-300 text-gray-700'}`}>
              {status ? status.toUpperCase() : 'N/A'}
            </span>
          </div>
          <p className="text-xs text-gray-600 font-medium">{formula}</p>
        </div>
        {Icon && <Icon className="w-8 h-8 text-blue-600" />}
      </div>
      
      <div className="mb-3 bg-gray-50 rounded-lg p-3 border border-gray-200">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-black text-gray-900">{value}</span>
          <span className="text-base font-semibold text-gray-600">{unit}</span>
        </div>
      </div>
      
      <p className="text-xs text-gray-600 leading-relaxed font-medium">{description}</p>
    </div>
  );
};

const CorePollutantsDashboard = ({ pollutantData, onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [dateRange, setDateRange] = useState('today');
  const [isLoading, setIsLoading] = useState(false);

  const defaultPollutants = [
    {
      name: 'PM2.5',
      formula: 'Particulate Matter 2.5',
      description: 'Fine particles <2.5 micrometers - most critical for health impact',
      value: 45.2,
      unit: 'μg/m³',
      icon: Activity,
      status: 'moderate',
      priority: 'critical'
    },
    {
      name: 'PM10',
      formula: 'Particulate Matter 10',
      description: 'Coarse particles <10 micrometers affecting respiratory system',
      value: 92.8,
      unit: 'μg/m³',
      icon: Wind,
      status: 'poor',
      priority: 'critical'
    },
    {
      name: 'SO₂',
      formula: 'Sulphur Dioxide',
      description: 'Respiratory irritant from fossil fuel combustion',
      value: 18.5,
      unit: 'μg/m³',
      icon: Droplet,
      status: 'good',
      priority: 'high'
    },
    {
      name: 'NO₂',
      formula: 'Nitrogen Dioxide',
      description: 'Traffic-related pollutant affecting lung function',
      value: 64.3,
      unit: 'μg/m³',
      icon: Wind,
      status: 'moderate',
      priority: 'high'
    },
    {
      name: 'CO',
      formula: 'Carbon Monoxide',
      description: 'Colorless gas reducing oxygen delivery to organs',
      value: 1.8,
      unit: 'mg/m³',
      icon: AlertCircle,
      status: 'good',
      priority: 'medium'
    },
    {
      name: 'O₃',
      formula: 'Ozone',
      description: 'Ground-level ozone formed from reactions in sunlight',
      value: 76.4,
      unit: 'μg/m³',
      icon: Activity,
      status: 'moderate',
      priority: 'medium'
    },
    {
      name: 'NH₃',
      formula: 'Ammonia',
      description: 'Agricultural pollutant contributing to secondary PM formation',
      value: 158.9,
      unit: 'μg/m³',
      icon: Droplet,
      status: 'good',
      priority: 'medium'
    },
    {
      name: 'Pb',
      formula: 'Lead',
      description: 'Heavy metal affecting nervous system and development',
      value: 0.12,
      unit: 'μg/m³',
      icon: AlertCircle,
      status: 'good',
      priority: 'low'
    }
  ];

  const pollutants = pollutantData || defaultPollutants;

  

  return (
    <div className="w-full bg-gray-50 p-6 rounded-2xl">
      

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-black text-gray-900 mb-2">
          Core Pollutant Measurements
        </h2>
        <p className="text-sm font-semibold text-gray-600">
          Primary pollutants as per National Ambient Air Quality Standards (NAAQS)
        </p>
      </div>

      {/* Pollutant Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {pollutants.map((pollutant, index) => (
          <PollutantCard 
            key={index}
            {...pollutant}
          />
        ))}
      </div>
    </div>
  );
};

export default CorePollutantsDashboard;
