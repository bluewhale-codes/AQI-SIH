import React, { useState } from 'react';
import { 
  Users, Baby, HeartPulse, School, Hospital, 
  MapPin, Clock, TrendingUp, AlertTriangle,
  Activity, UserCheck, Calendar, ChevronRight
} from 'lucide-react';

const VulnerablePopCard = ({ icon: Icon, title, count, percentage, color, details }) => {
  return (
    <div className={`bg-gradient-to-br ${color} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white border-opacity-30`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 bg-white bg-opacity-90 rounded-xl shadow-md`}>
          <Icon className="w-7 h-7 text-gray-800" />
        </div>
        <span className="px-3 py-1 bg-white bg-opacity-90 text-gray-900 text-xs font-bold rounded-full">
          {percentage}%
        </span>
      </div>

      <h3 className="text-white text-lg font-bold mb-2">{title}</h3>
      <p className="text-white text-4xl font-black mb-4">{count}</p>

      {details && (
        <div className="space-y-2 pt-4 border-t border-white border-opacity-30">
          {details.map((detail, index) => (
            <div key={index} className="flex items-center justify-between text-white text-sm">
              <span className="opacity-90">{detail.label}</span>
              <span className="font-bold">{detail.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const FacilityCard = ({ icon: Icon, title, count, locations, hours, color }) => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all border-2 border-gray-100">
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="text-gray-900 font-bold text-base mb-1">{title}</h4>
          <p className="text-3xl font-black text-gray-900 mb-3">{count}</p>
          
          {locations && (
            <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
              <MapPin className="w-4 h-4" />
              <span>{locations}</span>
            </div>
          )}
          
          {hours && (
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{hours}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const HealthStatCard = ({ title, current, previous, trend, unit, icon: Icon }) => {
  const isIncreasing = trend > 0;
  
  return (
    <div className="bg-white rounded-xl p-5 shadow-md border-2 border-gray-100 hover:shadow-lg transition">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs font-semibold text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-black text-gray-900">{current}</p>
          <p className="text-xs text-gray-500 mt-1">{unit}</p>
        </div>
        {Icon && (
          <div className={`p-2 rounded-lg ${isIncreasing ? 'bg-red-100' : 'bg-green-100'}`}>
            <Icon className={`w-5 h-5 ${isIncreasing ? 'text-red-600' : 'text-green-600'}`} />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-600">vs last month</span>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${
          isIncreasing ? 'bg-red-50' : 'bg-green-50'
        }`}>
          <TrendingUp className={`w-3 h-3 ${
            isIncreasing ? 'text-red-600' : 'text-green-600 rotate-180'
          }`} />
          <span className={`text-xs font-bold ${
            isIncreasing ? 'text-red-600' : 'text-green-600'
          }`}>
            {Math.abs(trend)}%
          </span>
        </div>
      </div>
    </div>
  );
};

const HealthImpactDashboard = ({ populationData, healthData, facilityData }) => {
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');

  // Default population data
  const defaultPopulationData = [
    {
      title: 'Children (0-14 years)',
      count: '45,280',
      percentage: 32,
      icon: Baby,
      color: 'from-blue-400 to-blue-600',
      details: [
        { label: 'Under 5 years', value: '12,450' },
        { label: 'School-age (5-14)', value: '32,830' },
        { label: 'High-risk areas', value: '8 blocks' }
      ]
    },
    {
      title: 'Elderly (60+ years)',
      count: '28,920',
      percentage: 20,
      icon: Users,
      color: 'from-purple-400 to-purple-600',
      details: [
        { label: '60-75 years', value: '18,200' },
        { label: '75+ years', value: '10,720' },
        { label: 'Living alone', value: '4,580' }
      ]
    },
    {
      title: 'Respiratory Conditions',
      count: '18,650',
      percentage: 13,
      icon: Activity,
      color: 'from-orange-400 to-orange-600',
      details: [
        { label: 'Asthma patients', value: '9,240' },
        { label: 'COPD cases', value: '6,380' },
        { label: 'Active monitoring', value: '3,030' }
      ]
    },
    {
      title: 'Pregnant Women',
      count: '3,450',
      percentage: 2.4,
      icon: HeartPulse,
      color: 'from-pink-400 to-pink-600',
      details: [
        { label: 'Trimester 1', value: '980' },
        { label: 'Trimester 2', value: '1,220' },
        { label: 'Trimester 3', value: '1,250' }
      ]
    }
  ];

  // Default facility data
  const defaultFacilityData = [
    {
      title: 'Primary Schools',
      count: '142',
      locations: 'Across 28 villages',
      hours: '8:00 AM - 2:30 PM',
      icon: School,
      color: 'bg-blue-500',
      students: '45,280'
    },
    {
      title: 'Healthcare Centers',
      count: '38',
      locations: '12 PHC + 26 Sub-centers',
      hours: '24/7 Emergency',
      icon: Hospital,
      color: 'bg-red-500',
      capacity: '850 beds'
    },
    {
      title: 'Anganwadi Centers',
      count: '256',
      locations: 'Every village',
      hours: '9:00 AM - 4:00 PM',
      icon: Baby,
      color: 'bg-green-500',
      beneficiaries: '18,200'
    }
  ];

  // Default health statistics data
  const defaultHealthData = {
    admissions: {
      current: 1245,
      previous: 1089,
      trend: 14.3,
      unit: 'cases this month'
    },
    respiratoryER: {
      current: 456,
      previous: 389,
      trend: 17.2,
      unit: 'ER visits'
    },
    cardiovascular: {
      current: 234,
      previous: 201,
      trend: 16.4,
      unit: 'incidents'
    },
    mortality: {
      current: 12,
      previous: 18,
      trend: -33.3,
      unit: 'pollution-linked deaths'
    }
  };

  // Use props or defaults with proper fallback
  const populations = populationData || defaultPopulationData;
  const facilities = facilityData || defaultFacilityData;
  const health = healthData || defaultHealthData;

  const totalVulnerable = populations.reduce((sum, pop) => {
    return sum + parseInt(pop.count.replace(/,/g, ''));
  }, 0);

  return (
    <div className="w-full space-y-6">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 rounded-3xl shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative z-10 p-8">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-4xl font-black text-white mb-3">
                Health Impact Analysis
              </h2>
              <p className="text-white text-opacity-90 text-base font-medium max-w-2xl">
                Comprehensive vulnerable population data and health facility information 
                for targeted air quality intervention planning
              </p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-4 border border-white border-opacity-30">
              <p className="text-white text-xs font-semibold mb-1">Total Vulnerable</p>
              <p className="text-white text-3xl font-black">{(totalVulnerable / 1000).toFixed(1)}K</p>
              <p className="text-white text-xs opacity-75 mt-1">Population at risk</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-30">
              <p className="text-white text-xs font-semibold mb-1">Children</p>
              <p className="text-white text-2xl font-black">45.3K</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-30">
              <p className="text-white text-xs font-semibold mb-1">Elderly</p>
              <p className="text-white text-2xl font-black">28.9K</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-30">
              <p className="text-white text-xs font-semibold mb-1">Schools</p>
              <p className="text-white text-2xl font-black">142</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-30">
              <p className="text-white text-xs font-semibold mb-1">Health Centers</p>
              <p className="text-white text-2xl font-black">38</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vulnerable Population Section */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-black text-gray-900 mb-1">
              Vulnerable Population Distribution
            </h3>
            <p className="text-sm text-gray-600">
              High-risk groups requiring priority air quality protection
            </p>
          </div>
          <UserCheck className="w-8 h-8 text-purple-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {populations.map((pop, index) => (
            <VulnerablePopCard key={index} {...pop} />
          ))}
        </div>
      </div>

      {/* Facilities Section */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-black text-gray-900 mb-1">
              Healthcare & Education Facilities
            </h3>
            <p className="text-sm text-gray-600">
              Critical infrastructure requiring air quality monitoring
            </p>
          </div>
          <MapPin className="w-8 h-8 text-blue-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {facilities.map((facility, index) => (
            <FacilityCard key={index} {...facility} />
          ))}
        </div>
      </div>

      {/* Health Statistics */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-black text-gray-900 mb-1">
              Morbidity & Mortality Data
            </h3>
            <p className="text-sm text-gray-600">
              Health outcomes linked to air pollution exposure
            </p>
          </div>
          <Activity className="w-8 h-8 text-red-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          
        </div>
      </div>

      {/* Action Recommendations */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-amber-200 shadow-md">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-amber-500 rounded-xl">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-bold text-gray-900 mb-3">
              Priority Action Recommendations
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <ChevronRight className="w-5 h-5 text-amber-600 mt-0.5" />
                <p className="text-sm text-gray-700">
                  <span className="font-bold">School Zones:</span> Install air purifiers in 142 schools protecting 45,280 children
                </p>
              </div>
              <div className="flex items-start gap-2">
                <ChevronRight className="w-5 h-5 text-amber-600 mt-0.5" />
                <p className="text-sm text-gray-700">
                  <span className="font-bold">Health Centers:</span> Early warning systems for 38 facilities serving vulnerable populations
                </p>
              </div>
              <div className="flex items-start gap-2">
                <ChevronRight className="w-5 h-5 text-amber-600 mt-0.5" />
                <p className="text-sm text-gray-700">
                  <span className="font-bold">Elderly Care:</span> Door-to-door awareness campaigns for 28,920 senior citizens
                </p>
              </div>
              <div className="flex items-start gap-2">
                <ChevronRight className="w-5 h-5 text-amber-600 mt-0.5" />
                <p className="text-sm text-gray-700">
                  <span className="font-bold">Maternal Health:</span> Special monitoring protocols for 3,450 pregnant women
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthImpactDashboard;
