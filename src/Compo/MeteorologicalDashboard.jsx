import React, { useState } from 'react';
import { 
  Thermometer, Droplets, Wind, Gauge, CloudRain, 
  Layers, Sun, Activity, Navigation, TrendingUp,
  RefreshCw, AlertCircle, Clock
} from 'lucide-react';

const MeteoCard = ({ 
  icon: Icon, 
  title, 
  value, 
  unit, 
  status, 
  description,
  trend,
  color,
  additionalInfo 
}) => {
  const statusColors = {
    excellent: 'from-green-400 to-emerald-500',
    good: 'from-blue-400 to-cyan-500',
    moderate: 'from-yellow-400 to-orange-500',
    poor: 'from-orange-500 to-red-500',
    severe: 'from-red-500 to-purple-600'
  };

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-5 hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${statusColors[status] || color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${
            trend > 0 ? 'bg-red-100' : trend < 0 ? 'bg-blue-100' : 'bg-gray-100'
          }`}>
            <TrendingUp 
              className={`w-4 h-4 ${
                trend > 0 ? 'text-red-600' : trend < 0 ? 'text-blue-600 rotate-180' : 'text-gray-600'
              }`} 
            />
            <span className={`text-xs font-bold ${
              trend > 0 ? 'text-red-600' : trend < 0 ? 'text-blue-600' : 'text-gray-600'
            }`}>
              {Math.abs(trend)}%
            </span>
          </div>
        )}
      </div>

      <h3 className="text-sm font-semibold text-gray-600 mb-2">{title}</h3>
      
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-4xl font-black text-gray-900">{value}</span>
        <span className="text-lg font-bold text-gray-600">{unit}</span>
      </div>

      <p className="text-xs text-gray-600 leading-relaxed mb-3">{description}</p>

      {additionalInfo && (
        <div className="pt-3 border-t border-gray-200">
          {additionalInfo.map((info, index) => (
            <div key={index} className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-600">{info.label}</span>
              <span className="text-xs font-bold text-gray-900">{info.value}</span>
            </div>
          ))}
        </div>
      )}

      <div className={`mt-3 px-3 py-1.5 rounded-full text-xs font-bold text-center ${
        status === 'excellent' ? 'bg-green-100 text-green-700' :
        status === 'good' ? 'bg-blue-100 text-blue-700' :
        status === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
        status === 'poor' ? 'bg-orange-100 text-orange-700' :
        'bg-gray-100 text-gray-700'
      }`}>
        {status ? status.toUpperCase() : 'NORMAL'}
      </div>
    </div>
  );
};

const WindCompass = ({ direction, speed }) => {
  const rotation = {
    'N': 0, 'NNE': 22.5, 'NE': 45, 'ENE': 67.5,
    'E': 90, 'ESE': 112.5, 'SE': 135, 'SSE': 157.5,
    'S': 180, 'SSW': 202.5, 'SW': 225, 'WSW': 247.5,
    'W': 270, 'WNW': 292.5, 'NW': 315, 'NNW': 337.5
  };

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-5 hover:shadow-xl transition-all duration-300">
      <h3 className="text-sm font-semibold text-gray-600 mb-4">Wind Direction & Speed</h3>
      
      <div className="relative w-40 h-40 mx-auto mb-4">
        {/* Compass Background */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-50 to-cyan-100 border-4 border-blue-200"></div>
        
        {/* Cardinal Directions */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full">
            <span className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-bold text-blue-900">N</span>
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-600">S</span>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-600">E</span>
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-600">W</span>
          </div>
        </div>

        {/* Wind Arrow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Navigation 
            className="w-12 h-12 text-blue-600" 
            style={{ transform: `rotate(${rotation[direction] || 0}deg)` }}
          />
        </div>
      </div>

      <div className="text-center">
        <p className="text-3xl font-black text-gray-900">{direction}</p>
        <p className="text-sm text-gray-600 mt-1">{speed} km/h</p>
        <div className="mt-3 px-3 py-1.5 bg-blue-100 rounded-full">
          <span className="text-xs font-bold text-blue-700">
            {speed < 12 ? 'CALM' : speed < 30 ? 'MODERATE' : speed < 50 ? 'STRONG' : 'SEVERE'}
          </span>
        </div>
      </div>
    </div>
  );
};

const MeteorologicalDashboard = ({ meteoData, lastUpdated, onRefresh }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const defaultData = {
    temperature: {
      value: 28.5,
      unit: '°C',
      status: 'good',
      trend: 5,
      description: 'Current ambient temperature',
      additionalInfo: [
        { label: 'Feels Like', value: '30.2°C' },
        { label: 'Min Today', value: '22.8°C' },
        { label: 'Max Today', value: '32.1°C' }
      ]
    },
    humidity: {
      value: 68,
      unit: '%',
      status: 'moderate',
      trend: -3,
      description: 'Relative humidity level',
      additionalInfo: [
        { label: 'Dew Point', value: '21.5°C' },
        { label: 'Comfort Level', value: 'Moderate' }
      ]
    },
    windSpeed: {
      value: 12.5,
      unit: 'km/h',
      direction: 'NW',
      status: 'good',
      trend: 2,
      description: 'Wind speed and direction',
      additionalInfo: [
        { label: 'Gusts', value: '18.2 km/h' },
        { label: 'Direction', value: 'Northwest' }
      ]
    },
    pressure: {
      value: 1013,
      unit: 'hPa',
      status: 'good',
      trend: 0,
      description: 'Atmospheric pressure at sea level',
      additionalInfo: [
        { label: 'Trend', value: 'Stable' },
        { label: 'Station Pressure', value: '1008 hPa' }
      ]
    },
    rainfall: {
      value: 2.5,
      unit: 'mm',
      status: 'good',
      trend: 0,
      description: 'Precipitation in last 24 hours',
      additionalInfo: [
        { label: 'Last Hour', value: '0.5 mm' },
        { label: 'This Week', value: '12.8 mm' },
        { label: 'Probability', value: '30%' }
      ]
    },
    pblHeight: {
      value: 1850,
      unit: 'm',
      status: 'good',
      trend: 8,
      description: 'Planetary Boundary Layer height',
      additionalInfo: [
        { label: 'Morning PBL', value: '450 m' },
        { label: 'Evening PBL', value: '1200 m' },
        { label: 'Impact', value: 'Good Dispersion' }
      ]
    },
    solarRadiation: {
      value: 850,
      unit: 'W/m²',
      status: 'excellent',
      trend: 15,
      description: 'Solar radiation intensity',
      additionalInfo: [
        { label: 'UV Index', value: '8 (High)' },
        { label: 'Sunrise', value: '06:24 AM' },
        { label: 'Sunset', value: '05:48 PM' }
      ]
    },
    visibility: {
      value: 8.5,
      unit: 'km',
      status: 'good',
      trend: -5,
      description: 'Atmospheric visibility range',
      additionalInfo: [
        { label: 'Cloud Cover', value: '35%' },
        { label: 'Sky Condition', value: 'Partly Cloudy' }
      ]
    }
  };

  const data = meteoData || defaultData;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      if (onRefresh) onRefresh();
    }, 1500);
  };

  const getDispersionStatus = () => {
    const { windSpeed, pblHeight, temperature } = data;
    if (windSpeed.value > 10 && pblHeight.value > 1500) {
      return { status: 'Excellent', color: 'text-green-600', bg: 'bg-green-50', description: 'Favorable conditions for pollutant dispersion' };
    } else if (windSpeed.value > 5 && pblHeight.value > 1000) {
      return { status: 'Good', color: 'text-blue-600', bg: 'bg-blue-50', description: 'Moderate pollutant dispersion expected' };
    } else {
      return { status: 'Poor', color: 'text-orange-600', bg: 'bg-orange-50', description: 'Limited pollutant dispersion - potential accumulation' };
    }
  };

  const dispersion = getDispersionStatus();

  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-2xl shadow-xl p-6 text-white">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-3xl font-black mb-2">
              Meteorological Parameters
            </h2>
            <p className="text-sm font-semibold text-blue-50">
              Essential data for understanding pollutant dispersion and forecasting
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg hover:bg-opacity-30 transition flex items-center gap-2 border border-white border-opacity-30"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="text-sm font-semibold">Refresh</span>
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3 border border-white border-opacity-30">
            <p className="text-xs font-semibold text-blue-50 mb-1">Temperature</p>
            <p className="text-2xl font-black">{data.temperature.value}°C</p>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3 border border-white border-opacity-30">
            <p className="text-xs font-semibold text-blue-50 mb-1">Humidity</p>
            <p className="text-2xl font-black">{data.humidity.value}%</p>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3 border border-white border-opacity-30">
            <p className="text-xs font-semibold text-blue-50 mb-1">Wind Speed</p>
            <p className="text-2xl font-black">{data.windSpeed.value} km/h</p>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3 border border-white border-opacity-30">
            <p className="text-xs font-semibold text-blue-50 mb-1">PBL Height</p>
            <p className="text-2xl font-black">{data.pblHeight.value} m</p>
          </div>
        </div>

        {/* Last Updated */}
        {lastUpdated && (
          <div className="mt-4 flex items-center gap-2 text-xs text-blue-50">
            <Clock className="w-4 h-4" />
            <span>Last updated: {lastUpdated}</span>
          </div>
        )}
      </div>

      {/* Dispersion Forecast */}
      <div className={`${dispersion.bg} rounded-xl border-2 border-opacity-50 p-5`}>
        <div className="flex items-start gap-3">
          <Activity className={`w-6 h-6 ${dispersion.color} mt-1`} />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-bold text-gray-900">Dispersion Forecast</h3>
              <span className={`px-3 py-1 ${dispersion.bg} ${dispersion.color} text-xs font-bold rounded-full border-2`}>
                {dispersion.status}
              </span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{dispersion.description}</p>
          </div>
        </div>
      </div>

      {/* Meteorological Parameters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <MeteoCard
          icon={Thermometer}
          title="Temperature"
          value={data.temperature.value}
          unit={data.temperature.unit}
          status={data.temperature.status}
          trend={data.temperature.trend}
          description={data.temperature.description}
          additionalInfo={data.temperature.additionalInfo}
          color="from-red-400 to-orange-500"
        />

        <MeteoCard
          icon={Droplets}
          title="Humidity"
          value={data.humidity.value}
          unit={data.humidity.unit}
          status={data.humidity.status}
          trend={data.humidity.trend}
          description={data.humidity.description}
          additionalInfo={data.humidity.additionalInfo}
          color="from-blue-400 to-cyan-500"
        />

        <MeteoCard
          icon={Wind}
          title="Wind Speed"
          value={data.windSpeed.value}
          unit={data.windSpeed.unit}
          status={data.windSpeed.status}
          trend={data.windSpeed.trend}
          description={data.windSpeed.description}
          additionalInfo={data.windSpeed.additionalInfo}
          color="from-teal-400 to-emerald-500"
        />

        <MeteoCard
          icon={Gauge}
          title="Atmospheric Pressure"
          value={data.pressure.value}
          unit={data.pressure.unit}
          status={data.pressure.status}
          trend={data.pressure.trend}
          description={data.pressure.description}
          additionalInfo={data.pressure.additionalInfo}
          color="from-purple-400 to-pink-500"
        />

        <MeteoCard
          icon={CloudRain}
          title="Rainfall"
          value={data.rainfall.value}
          unit={data.rainfall.unit}
          status={data.rainfall.status}
          trend={data.rainfall.trend}
          description={data.rainfall.description}
          additionalInfo={data.rainfall.additionalInfo}
          color="from-indigo-400 to-blue-500"
        />

        <MeteoCard
          icon={Layers}
          title="PBL Height"
          value={data.pblHeight.value}
          unit={data.pblHeight.unit}
          status={data.pblHeight.status}
          trend={data.pblHeight.trend}
          description={data.pblHeight.description}
          additionalInfo={data.pblHeight.additionalInfo}
          color="from-amber-400 to-yellow-500"
        />

        <MeteoCard
          icon={Sun}
          title="Solar Radiation"
          value={data.solarRadiation.value}
          unit={data.solarRadiation.unit}
          status={data.solarRadiation.status}
          trend={data.solarRadiation.trend}
          description={data.solarRadiation.description}
          additionalInfo={data.solarRadiation.additionalInfo}
          color="from-yellow-400 to-orange-500"
        />

        <WindCompass 
          direction={data.windSpeed.direction}
          speed={data.windSpeed.value}
        />
      </div>

      {/* Additional Insights */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-5">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-2">Meteorological Impact on AQI</h4>
            <p className="text-xs text-gray-700 leading-relaxed mb-3">
              Current meteorological conditions show {dispersion.status.toLowerCase()} dispersion potential. 
              PBL height of {data.pblHeight.value}m combined with {data.windSpeed.value} km/h winds 
              {data.windSpeed.value > 10 ? ' will help disperse pollutants effectively' : ' may lead to pollutant accumulation'}.
              {data.rainfall.value > 0 && ` Recent rainfall of ${data.rainfall.value}mm has helped reduce particulate matter.`}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Mixing Height</p>
                <p className="text-sm font-bold text-gray-900">
                  {data.pblHeight.value > 1500 ? 'High' : data.pblHeight.value > 1000 ? 'Medium' : 'Low'}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Ventilation</p>
                <p className="text-sm font-bold text-gray-900">
                  {data.windSpeed.value * data.pblHeight.value > 15000 ? 'Excellent' : 'Moderate'}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Stability</p>
                <p className="text-sm font-bold text-gray-900">
                  {data.temperature.trend > 5 ? 'Unstable' : 'Stable'}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">UV Index</p>
                <p className="text-sm font-bold text-gray-900">8 (High)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeteorologicalDashboard;
