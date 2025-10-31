import React, { useState } from 'react';
import { 
  Activity, Leaf, Cloud, Heart, AlertCircle 
} from 'lucide-react';

import CorePollutantsDashboard from './MainDashboard.jsx/CorePollutantsDashboard';
import SourceApportionmentDashboard from './MainDashboard.jsx/SourceApportionmentDashboard';
import MeteorologicalDashboard from '../Compo/MeteorologicalDashboard';
import HealthAdvisoryDashboard from './MainDashboard.jsx/HealthAdvisoryDashboard';
import HealthImpactDashboard from '../Compo/HealthImpactDashboard';


const FeatureTabs = () => {
  const [activeFeature, setActiveFeature] = useState('feature1');

  const features = [
    {
      id: 'feature1',
      name: 'Core Pollutants',
      icon: Activity,
      component: CorePollutantsDashboard,
      color: 'blue'
    },
    {
      id: 'feature2',
      name: 'Source Apportionment',
      icon: Leaf,
      component: SourceApportionmentDashboard,
      color: 'green'
    },
    {
      id: 'feature3',
      name: 'Meteorological Data',
      icon: Cloud,
      component: MeteorologicalDashboard,
      color: 'cyan'
    },
    {
      id: 'feature4',
      name: 'Health Impact',
      icon: Heart,
      component: HealthImpactDashboard,
      color: 'red'
    },
    {
      id: 'feature5',
      name: 'Health Advisory',
      icon: AlertCircle,
      component: HealthAdvisoryDashboard,
      color: 'purple'
    }
  ];

  const ActiveComponent = features.find(f => f.id === activeFeature)?.component;

  return (
    <div className="w-full space-y-6">
      {/* Feature Selection Buttons */}
      <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
        <div className="flex flex-wrap gap-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            const isActive = activeFeature === feature.id;
            
            return (
              <button
                key={feature.id}
                onClick={() => setActiveFeature(feature.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  isActive
                    ? `bg-${feature.color}-600 text-white shadow-lg scale-105`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{feature.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Component Display */}
      <div className="transition-all duration-300 pt-[40px] pb-[40px] pl-[50px] pr-[50px] ">
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  );
};

export default FeatureTabs;
