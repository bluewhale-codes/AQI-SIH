import React, { useState } from 'react';
import { 
  Leaf, Home, Truck, Factory, Wind, TrendingUp, 
  Flame, Droplets, Zap, ChevronDown, ChevronUp, 
  AlertTriangle, Calendar, MapPin 
} from 'lucide-react';

const SourceCard = ({ icon: Icon, title, percentage, value, unit, color, trend, isExpanded, onClick, children }) => {
  return (
    <div className={`bg-gradient-to-br ${color} rounded-xl border-2 border-opacity-50 shadow-lg hover:shadow-xl transition-all duration-300`}>
      <button
        onClick={onClick}
        className="w-full p-5 text-left"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white bg-opacity-80 rounded-lg">
              <Icon className="w-6 h-6 text-gray-800" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{title}</h3>
              <p className="text-xs text-gray-600 font-medium">Emission Source</p>
            </div>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          )}
        </div>

        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-4xl font-black text-gray-900">{percentage}</span>
              <span className="text-xl font-bold text-gray-700">%</span>
            </div>
            {value && (
              <p className="text-sm text-gray-700 font-semibold">
                {value} {unit}
              </p>
            )}
          </div>
          {trend && (
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${
              trend > 0 ? 'bg-red-500' : 'bg-green-500'
            } bg-opacity-20`}>
              <TrendingUp className={`w-4 h-4 ${trend > 0 ? 'text-red-600' : 'text-green-600 rotate-180'}`} />
              <span className={`text-xs font-bold ${trend > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {Math.abs(trend)}%
              </span>
            </div>
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="px-5 pb-5 border-t border-gray-200 border-opacity-50 pt-4 mt-2">
          {children}
        </div>
      )}
    </div>
  );
};

const ActivityDataCard = ({ icon: Icon, title, value, subItems, color }) => {
  return (
    <div className={`bg-gradient-to-br ${color} p-4 rounded-lg border border-gray-200 hover:shadow-md transition`}>
      <div className="flex items-start gap-3">
        <div className="p-2 bg-white bg-opacity-70 rounded-lg">
          <Icon className="w-5 h-5 text-gray-800" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-gray-900 mb-1">{title}</h4>
          <p className="text-2xl font-black text-gray-900 mb-2">{value}</p>
          {subItems && (
            <div className="space-y-1">
              {subItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <span className="text-gray-700 font-medium">{item.label}</span>
                  <span className="font-bold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SourceApportionmentDashboard = ({ sectoralData, activityData, selectedDistrict }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const defaultSectoralData = [
    {
      id: 'agricultural',
      title: 'Agricultural Sources',
      percentage: 42,
      value: '12.5K',
      unit: 'tons/year',
      trend: 15,
      icon: Leaf,
      color: 'from-green-50 to-green-100',
      details: [
        { label: 'Crop Residue Burning', value: '8,200 tons/year', percentage: '65%' },
        { label: 'Tillage & Planting', value: '2,100 tons/year', percentage: '17%' },
        { label: 'Fertilizer Application', value: '2,200 tons/year', percentage: '18%' }
      ],
      locations: 'Punjab, Haryana, UP regions',
      peakSeason: 'October-November, April-May'
    },
    {
      id: 'domestic',
      title: 'Domestic Sources',
      percentage: 28,
      value: '8.4K',
      unit: 'tons/year',
      trend: -8,
      icon: Home,
      color: 'from-blue-50 to-blue-100',
      details: [
        { label: 'Solid Fuel Cooking', value: '5,600 tons/year', percentage: '67%' },
        { label: 'Heating Systems', value: '1,800 tons/year', percentage: '21%' },
        { label: 'Waste Burning', value: '1,000 tons/year', percentage: '12%' }
      ],
      households: '2.8M households',
      lpgPenetration: '45%'
    },
    {
      id: 'vehicular',
      title: 'Vehicular Emissions',
      percentage: 15,
      value: '4.5K',
      unit: 'tons/year',
      trend: 12,
      icon: Truck,
      color: 'from-yellow-50 to-yellow-100',
      details: [
        { label: 'Two-wheelers', value: '1,800 tons/year', percentage: '40%' },
        { label: 'Agricultural Vehicles', value: '1,600 tons/year', percentage: '35%' },
        { label: 'Commercial Vehicles', value: '1,100 tons/year', percentage: '25%' }
      ],
      vehicleCount: '580K vehicles',
      roadCondition: 'Poor - 65% unpaved'
    },
    {
      id: 'industrial',
      title: 'Industrial Sources',
      percentage: 10,
      value: '3.0K',
      unit: 'tons/year',
      trend: 5,
      icon: Factory,
      color: 'from-orange-50 to-orange-100',
      details: [
        { label: 'Brick Kilns', value: '1,500 tons/year', percentage: '50%' },
        { label: 'Small Industries', value: '900 tons/year', percentage: '30%' },
        { label: 'Manufacturing Units', value: '600 tons/year', percentage: '20%' }
      ],
      unitsCount: '450 units',
      compliance: 'Low - 35% compliant'
    },
    {
      id: 'natural',
      title: 'Natural Sources',
      percentage: 5,
      value: '1.5K',
      unit: 'tons/year',
      trend: 0,
      icon: Wind,
      color: 'from-purple-50 to-purple-100',
      details: [
        { label: 'Dust Storms', value: '900 tons/year', percentage: '60%' },
        { label: 'Forest Fires', value: '400 tons/year', percentage: '27%' },
        { label: 'Natural Vegetation', value: '200 tons/year', percentage: '13%' }
      ],
      events: '28 events/year',
      severity: 'Moderate'
    }
  ];

  const defaultActivityData = [
    {
      title: 'Crop Production',
      value: '2.8M tons',
      icon: Leaf,
      color: 'from-green-50 to-green-100',
      subItems: [
        { label: 'Wheat', value: '1.2M tons' },
        { label: 'Rice', value: '980K tons' },
        { label: 'Other Crops', value: '620K tons' }
      ]
    },
    {
      title: 'Stubble Burning Events',
      value: '18,450',
      icon: Flame,
      color: 'from-red-50 to-red-100',
      subItems: [
        { label: 'Oct-Nov Peak', value: '12,200' },
        { label: 'Apr-May Season', value: '6,250' },
        { label: 'Avg Area/Event', value: '2.4 acres' }
      ]
    },
    {
      title: 'Energy Consumption',
      value: '45.8 MW',
      icon: Zap,
      color: 'from-yellow-50 to-yellow-100',
      subItems: [
        { label: 'Biomass', value: '62%' },
        { label: 'LPG', value: '28%' },
        { label: 'Electricity', value: '10%' }
      ]
    },
    {
      title: 'Biomass Usage',
      value: '28.4K tons',
      icon: Droplets,
      color: 'from-blue-50 to-blue-100',
      subItems: [
        { label: 'Wood', value: '15,600 tons' },
        { label: 'Crop Residue', value: '8,900 tons' },
        { label: 'Dung Cakes', value: '3,900 tons' }
      ]
    }
  ];

  const sectors = sectoralData || defaultSectoralData;
  const activities = activityData || defaultActivityData;

  const toggleSection = (id) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-3xl font-black text-gray-900 mb-2 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Source Apportionment Analysis
            </h2>
            <p className="text-sm font-semibold text-gray-600">
              Detailed emission source information for targeted interventions
            </p>
          </div>
          {selectedDistrict && (
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-bold text-blue-900">{selectedDistrict}</span>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200">
            <p className="text-xs font-semibold text-gray-600 mb-1">Total Emissions</p>
            <p className="text-2xl font-black text-gray-900">29.9K</p>
            <p className="text-xs text-gray-600">tons/year</p>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200">
            <p className="text-xs font-semibold text-gray-600 mb-1">Top Source</p>
            <p className="text-2xl font-black text-gray-900">Agricultural</p>
            <p className="text-xs text-gray-600">42% contribution</p>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200">
            <p className="text-xs font-semibold text-gray-600 mb-1">Fire Events</p>
            <p className="text-2xl font-black text-gray-900">18,450</p>
            <p className="text-xs text-gray-600">detected this year</p>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200">
            <p className="text-xs font-semibold text-gray-600 mb-1">Data Quality</p>
            <p className="text-2xl font-black text-green-600">High</p>
            <p className="text-xs text-gray-600">Satellite verified</p>
          </div>
        </div>
      </div>

      {/* Sectoral Emission Inventories */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
        <div className="mb-5">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Sectoral Emission Inventories
          </h3>
          <p className="text-sm text-gray-600">
            Click on each source to view detailed breakdown and analysis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sectors.map((sector) => (
            <SourceCard
              key={sector.id}
              icon={sector.icon}
              title={sector.title}
              percentage={sector.percentage}
              value={sector.value}
              unit={sector.unit}
              color={sector.color}
              trend={sector.trend}
              isExpanded={expandedSection === sector.id}
              onClick={() => toggleSection(sector.id)}
            >
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-gray-900 mb-2">Emission Breakdown</h4>
                {sector.details.map((detail, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-xs text-gray-700 font-medium">{detail.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-900">{detail.value}</span>
                      <span className="px-2 py-0.5 bg-gray-900 text-white text-xs font-bold rounded-full">
                        {detail.percentage}
                      </span>
                    </div>
                  </div>
                ))}

                <div className="pt-3 mt-3 border-t border-gray-300 space-y-2">
                  {sector.locations && (
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-600 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-gray-700">Locations:</p>
                        <p className="text-xs text-gray-600">{sector.locations}</p>
                      </div>
                    </div>
                  )}
                  {sector.peakSeason && (
                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-gray-600 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-gray-700">Peak Season:</p>
                        <p className="text-xs text-gray-600">{sector.peakSeason}</p>
                      </div>
                    </div>
                  )}
                  {sector.households && (
                    <p className="text-xs text-gray-700">
                      <span className="font-semibold">Households:</span> {sector.households}
                    </p>
                  )}
                  {sector.lpgPenetration && (
                    <p className="text-xs text-gray-700">
                      <span className="font-semibold">LPG Penetration:</span> {sector.lpgPenetration}
                    </p>
                  )}
                  {sector.vehicleCount && (
                    <p className="text-xs text-gray-700">
                      <span className="font-semibold">Vehicle Count:</span> {sector.vehicleCount}
                    </p>
                  )}
                  {sector.roadCondition && (
                    <p className="text-xs text-gray-700">
                      <span className="font-semibold">Road Condition:</span> {sector.roadCondition}
                    </p>
                  )}
                  {sector.unitsCount && (
                    <p className="text-xs text-gray-700">
                      <span className="font-semibold">Industrial Units:</span> {sector.unitsCount}
                    </p>
                  )}
                  {sector.compliance && (
                    <p className="text-xs text-gray-700">
                      <span className="font-semibold">Compliance:</span> {sector.compliance}
                    </p>
                  )}
                  {sector.events && (
                    <p className="text-xs text-gray-700">
                      <span className="font-semibold">Events:</span> {sector.events}
                    </p>
                  )}
                  {sector.severity && (
                    <p className="text-xs text-gray-700">
                      <span className="font-semibold">Severity:</span> {sector.severity}
                    </p>
                  )}
                </div>
              </div>
            </SourceCard>
          ))}
        </div>
      </div>

      {/* Activity Data Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
        <div className="mb-5">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Activity Data
          </h3>
          <p className="text-sm text-gray-600">
            District-level activity metrics and energy consumption patterns
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {activities.map((activity, index) => (
            <ActivityDataCard
              key={index}
              {...activity}
            />
          ))}
        </div>

        {/* Additional Insights */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-amber-900 mb-1">Key Insight</h4>
              <p className="text-xs text-amber-800 leading-relaxed">
                Agricultural sources contribute 42% of total emissions, with peak burning events occurring 
                during October-November (12,200 events) and April-May (6,250 events). Targeted interventions 
                during these periods can significantly reduce PM2.5 levels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SourceApportionmentDashboard;
