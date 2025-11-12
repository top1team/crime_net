"use client";
import React, { useState, useMemo } from 'react';
import { crimeData, Crime } from '../mock-data/crimes';
import ShieldIcon from './icons/ShieldIcon';

const CRIME_CATEGORIES = ['All', 'Violent Crimes', 'Property Crimes', 'Fraud & Cybercrime', 'Public Disorder', 'Traffic Incidents'];
const DATE_RANGES = ['All Time', 'Last 24 hours', 'Last 7 days', 'Last 30 days'];

const Heatmap: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeDateRange, setActiveDateRange] = useState('All Time');
  const [activeTooltip, setActiveTooltip] = useState<Crime | null>(null);

  const filteredCrimes = useMemo(() => {
    const now = new Date();
    
    return crimeData.filter(crime => {
      // Category filter
      const categoryMatch = activeCategory === 'All' || crime.category === activeCategory;

      // Date range filter
      let dateMatch = false;
      const crimeDate = new Date(crime.date);
      
      switch (activeDateRange) {
        case 'Last 24 hours':
          const yesterday = new Date(now);
          yesterday.setDate(now.getDate() - 1);
          dateMatch = crimeDate >= yesterday;
          break;
        case 'Last 7 days':
          const lastWeek = new Date(now);
          lastWeek.setDate(now.getDate() - 7);
          dateMatch = crimeDate >= lastWeek;
          break;
        case 'Last 30 days':
          const lastMonth = new Date(now);
          lastMonth.setDate(now.getDate() - 30);
          dateMatch = crimeDate >= lastMonth;
          break;
        case 'All Time':
        default:
          dateMatch = true;
          break;
      }
      
      return categoryMatch && dateMatch;
    });
  }, [activeCategory, activeDateRange]);

  const getMarkerColor = (riskScore: number) => {
    if (riskScore > 8) return 'bg-red-600';
    if (riskScore > 5) return 'bg-red-400';
    return 'bg-yellow-400';
  }

  return (
    <section id="heatmap" className="bg-gray-50 py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-black sm:text-4xl">
            Crime Hotspots
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Visualize crime data in your area. Use the filters to narrow down incidents by type and time.
          </p>
        </div>

        <div className="mt-12">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-8">
                {/* Category Filter */}
                <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Filter by Category</h3>
                    <div className="flex flex-wrap gap-2">
                        {CRIME_CATEGORIES.map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                                    activeCategory === category ? 'bg-red-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
                 {/* Date Range Filter */}
                 <div className="flex-1 md:max-w-sm">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Filter by Date</h3>
                    <div className="flex flex-wrap gap-2">
                        {DATE_RANGES.map(range => (
                            <button
                                key={range}
                                onClick={() => setActiveDateRange(range)}
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                                    activeDateRange === range ? 'bg-red-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                                }`}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Map */}
            <div className="mt-8 aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden relative border-2 border-gray-300 shadow-lg">
                <img 
                    src="https://i.imgur.com/3Ytq47x.png" 
                    alt="Stylized map of a city" 
                    className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0">
                    {filteredCrimes.map(crime => (
                        <div
                            key={crime.id}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2"
                            style={{ top: crime.location.top, left: crime.location.left }}
                            onMouseEnter={() => setActiveTooltip(crime)}
                            onMouseLeave={() => setActiveTooltip(null)}
                        >
                            <div className={`w-4 h-4 rounded-full ${getMarkerColor(crime.riskScore)} border-2 border-white/50 cursor-pointer`}>
                                {crime.riskScore > 8 && (
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Tooltip */}
                    {activeTooltip && (
                        <div
                            className="absolute transform -translate-x-1/2 p-3 w-48 text-sm bg-white border border-red-600 rounded-lg shadow-lg z-10 pointer-events-none"
                            style={{ 
                                top: `calc(${activeTooltip.location.top} - 1.5rem)`, 
                                left: activeTooltip.location.left,
                                transform: 'translate(-50%, -100%)'
                            }}
                        >
                           <p className="font-bold text-red-500">{activeTooltip.category}</p>
                           <p className="text-black mb-1">{activeTooltip.title}</p>
                           <p className="text-xs text-gray-500">{new Date(activeTooltip.date).toLocaleDateString()}</p>
                        </div>
                    )}
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/50 text-black px-3 py-1 rounded-full text-xs backdrop-blur-sm">
                    <ShieldIcon className="h-4 w-4 text-red-500"/>
                    <span>{filteredCrimes.length} incidents found</span>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Heatmap;