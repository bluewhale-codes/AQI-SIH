import React, { useState } from 'react';
import { 
  AlertCircle, Bell, Heart, Users, Baby, 
  Activity, Wind, CheckCircle, Info, X 
} from 'lucide-react';

const AQICard = ({ category, range, value, color, bgColor, description, active }) => {
  return (
    <div 
      className={`rounded-xl p-5 border-3 transition-all duration-300 cursor-pointer ${
        active 
          ? `${bgColor} border-${color}-500 shadow-xl scale-105` 
          : 'bg-white border-gray-200 hover:shadow-lg'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className={`text-xl font-bold ${active ? 'text-gray-900' : 'text-gray-700'}`}>
            {category}
          </h3>
          <p className="text-sm text-gray-600 font-medium">{range}</p>
        </div>
        {active && (
          <div className={`w-12 h-12 rounded-full bg-${color}-500 flex items-center justify-center animate-pulse`}>
            <Wind className="w-6 h-6 text-white" />
          </div>
        )}
      </div>
      
      {active && value && (
        <div className="mb-3">
          <span className="text-5xl font-black text-gray-900">{value}</span>
          <span className="text-lg font-bold text-gray-600 ml-2">AQI</span>
        </div>
      )}
      
      <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
    </div>
  );
};

const EarlyWarningAlert = ({ severity, message, time, onDismiss }) => {
  const severityConfig = {
    high: {
      bg: 'bg-red-50',
      border: 'border-red-300',
      text: 'text-red-800',
      icon: 'text-red-600',
      badge: 'bg-red-500'
    },
    medium: {
      bg: 'bg-orange-50',
      border: 'border-orange-300',
      text: 'text-orange-800',
      icon: 'text-orange-600',
      badge: 'bg-orange-500'
    },
    low: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-300',
      text: 'text-yellow-800',
      icon: 'text-yellow-600',
      badge: 'bg-yellow-500'
    }
  };

  const config = severityConfig[severity] || severityConfig.medium;

  return (
    <div className={`${config.bg} border-2 ${config.border} rounded-xl p-5 shadow-md`}>
      <div className="flex items-start gap-4">
        <div className={`p-3 ${config.badge} rounded-full`}>
          <Bell className="w-5 h-5 text-white animate-bounce" />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h4 className={`text-base font-bold ${config.text}`}>
              Early Warning Alert
            </h4>
            {onDismiss && (
              <button 
                onClick={onDismiss}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <p className={`text-sm ${config.text} mb-2 leading-relaxed`}>{message}</p>
          <p className="text-xs text-gray-600 font-medium">{time}</p>
        </div>
      </div>
    </div>
  );
};

const HealthRecommendation = ({ group, icon: Icon, recommendations, color }) => {
  return (
    <div className="bg-white rounded-xl p-5 border-2 border-gray-100 hover:border-gray-300 transition shadow-sm hover:shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 ${color} rounded-lg`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h4 className="text-base font-bold text-gray-900">{group}</h4>
      </div>
      
      <ul className="space-y-2">
        {recommendations.map((rec, index) => (
          <li key={index} className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-700 leading-relaxed">{rec}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const HealthAdvisoryDashboard = ({ currentAQI = 156, alerts = [] }) => {
  const [activeAlerts, setActiveAlerts] = useState(alerts);

  const aqiCategories = [
    {
      category: 'Good',
      range: '0-50',
      color: 'green',
      bgColor: 'bg-green-50',
      description: 'Air quality is satisfactory, poses little or no risk',
      active: currentAQI <= 50
    },
    {
      category: 'Satisfactory',
      range: '51-100',
      color: 'teal',
      bgColor: 'bg-teal-50',
      description: 'Air quality is acceptable for most people',
      active: currentAQI > 50 && currentAQI <= 100
    },
    {
      category: 'Moderate',
      range: '101-200',
      color: 'yellow',
      bgColor: 'bg-yellow-50',
      description: 'May cause breathing discomfort to sensitive people',
      active: currentAQI > 100 && currentAQI <= 200
    },
    {
      category: 'Poor',
      range: '201-300',
      color: 'orange',
      bgColor: 'bg-orange-50',
      description: 'May cause breathing discomfort to most people',
      active: currentAQI > 200 && currentAQI <= 300
    },
    {
      category: 'Very Poor',
      range: '301-400',
      color: 'red',
      bgColor: 'bg-red-50',
      description: 'May cause respiratory illness on prolonged exposure',
      active: currentAQI > 300 && currentAQI <= 400
    },
    {
      category: 'Severe',
      range: '401-500',
      color: 'purple',
      bgColor: 'bg-purple-50',
      description: 'Affects healthy people and seriously impacts those with diseases',
      active: currentAQI > 400
    }
  ];

  const getCurrentCategory = () => {
    return aqiCategories.find(cat => cat.active) || aqiCategories[0];
  };

  const currentCategory = getCurrentCategory();

  const defaultAlerts = activeAlerts.length > 0 ? activeAlerts : [
    {
      severity: 'high',
      message: 'AQI expected to reach 180+ in next 6 hours due to stubble burning in nearby districts. Vulnerable groups should avoid outdoor activities.',
      time: 'Issued: 30 Oct 2025, 7:00 PM'
    }
  ];

  const healthRecommendations = {
    'Good': {
      general: ['Enjoy outdoor activities', 'Perfect day for exercise', 'Open windows for fresh air'],
      children: ['Normal outdoor play allowed', 'All sports activities safe'],
      elderly: ['Regular activities permitted', 'Take morning walks'],
      respiratory: ['No restrictions needed', 'Maintain regular medication']
    },
    'Satisfactory': {
      general: ['Outdoor activities acceptable', 'Sensitive individuals should monitor symptoms'],
      children: ['Normal activities with breaks', 'Stay hydrated'],
      elderly: ['Light outdoor exercise fine', 'Monitor any discomfort'],
      respiratory: ['Keep rescue inhaler handy', 'Reduce intense workouts']
    },
    'Moderate': {
      general: ['Limit prolonged outdoor exertion', 'Wear mask if sensitive', 'Reduce outdoor activities'],
      children: ['Limit outdoor play to 1-2 hours', 'Prefer indoor games', 'Watch for cough/irritation'],
      elderly: ['Minimize outdoor time', 'Stay indoors during peak hours', 'Use air purifiers at home'],
      respiratory: ['Avoid outdoor exercise', 'Keep medications ready', 'Use N95 masks outdoors']
    },
    'Poor': {
      general: ['Avoid outdoor activities', 'Wear N95 mask if going out', 'Use air purifiers indoors', 'Keep windows closed'],
      children: ['Keep indoors', 'No outdoor games', 'Use air purifiers in rooms', 'Monitor breathing'],
      elderly: ['Stay indoors', 'Avoid all outdoor exposure', 'Consult doctor if symptoms worsen'],
      respiratory: ['Stay indoors strictly', 'Keep emergency medicines ready', 'Consult doctor immediately if breathing worsens']
    },
    'Very Poor': {
      general: ['Stay indoors', 'Emergency use N95 masks', 'Close all windows', 'Run air purifiers continuously'],
      children: ['Complete indoor stay', 'Cancel outdoor activities', 'Monitor health closely'],
      elderly: ['Complete indoor isolation', 'Have emergency contacts ready', 'Regular health monitoring'],
      respiratory: ['Medical emergency alert', 'Hospital consultation recommended', 'Oxygen support may be needed']
    },
    'Severe': {
      general: ['Health emergency - stay indoors', 'Use N95 masks even indoors', 'Seal windows and doors'],
      children: ['Medical supervision required', 'Emergency protocols active'],
      elderly: ['Immediate medical attention', 'Evacuation to cleaner areas recommended'],
      respiratory: ['Critical health emergency', 'Hospital admission recommended', 'Continuous medical monitoring']
    }
  };

  const recommendations = healthRecommendations[currentCategory.category] || healthRecommendations['Moderate'];

  const dismissAlert = (index) => {
    setActiveAlerts(activeAlerts.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full space-y-6">
      {/* Current AQI Status Header */}
      <div className={`${currentCategory.bgColor} rounded-2xl p-8 shadow-lg border-2 border-${currentCategory.color}-300`}>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Wind className={`w-8 h-8 text-${currentCategory.color}-600`} />
              <h2 className="text-3xl font-black text-gray-900">
                Real-Time Air Quality Status
              </h2>
            </div>
            <p className="text-gray-700 text-base mb-6">
              Current health advisory and recommendations based on live AQI monitoring
            </p>
            
            <div className="flex items-baseline gap-3">
              <span className="text-6xl font-black text-gray-900">{currentAQI}</span>
              <div>
                <p className="text-xl font-bold text-gray-700">AQI</p>
                <p className={`text-lg font-bold text-${currentCategory.color}-600`}>
                  {currentCategory.category}
                </p>
              </div>
            </div>
          </div>

          <div className={`bg-${currentCategory.color}-500 text-white px-6 py-3 rounded-xl shadow-lg`}>
            <p className="text-sm font-semibold mb-1">Category</p>
            <p className="text-2xl font-black">{currentCategory.category}</p>
            <p className="text-xs mt-1 opacity-90">{currentCategory.range}</p>
          </div>
        </div>
      </div>

      {/* Early Warning Alerts */}
      {defaultAlerts.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Bell className="w-6 h-6 text-orange-600" />
            Early Warning System
          </h3>
          {defaultAlerts.map((alert, index) => (
            <EarlyWarningAlert
              key={index}
              severity={alert.severity}
              message={alert.message}
              time={alert.time}
              onDismiss={() => dismissAlert(index)}
            />
          ))}
        </div>
      )}

      {/* AQI Categories Grid */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">AQI Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {aqiCategories.map((category, index) => (
            <AQICard
              key={index}
              {...category}
              value={category.active ? currentAQI : null}
            />
          ))}
        </div>
      </div>

      {/* Health Recommendations by Group */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Health Recommendations for Current AQI
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <HealthRecommendation
            group="General Public"
            icon={Users}
            recommendations={recommendations.general}
            color="bg-blue-500"
          />
          <HealthRecommendation
            group="Children"
            icon={Baby}
            recommendations={recommendations.children}
            color="bg-purple-500"
          />
          <HealthRecommendation
            group="Elderly (60+)"
            icon={Heart}
            recommendations={recommendations.elderly}
            color="bg-indigo-500"
          />
          <HealthRecommendation
            group="Respiratory Patients"
            icon={Activity}
            recommendations={recommendations.respiratory}
            color="bg-red-500"
          />
        </div>
      </div>

      {/* Quick Action Guide */}
      <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl p-6 border-2 border-blue-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-500 rounded-xl">
            <Info className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Quick Action Guide</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-3">
                <p className="text-sm font-bold text-gray-900 mb-1">Indoor Air Quality</p>
                <p className="text-xs text-gray-600">Use air purifiers, keep windows closed during poor AQI</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-sm font-bold text-gray-900 mb-1">Outdoor Precautions</p>
                <p className="text-xs text-gray-600">Wear N95 masks, limit exposure time</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-sm font-bold text-gray-900 mb-1">Medical Preparedness</p>
                <p className="text-xs text-gray-600">Keep emergency contacts, medications ready</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-sm font-bold text-gray-900 mb-1">Stay Informed</p>
                <p className="text-xs text-gray-600">Check AQI regularly, follow health advisories</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthAdvisoryDashboard;
