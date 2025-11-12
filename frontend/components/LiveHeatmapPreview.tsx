"use client";
import React, { useState, useMemo } from 'react';
import { crimeData, Crime } from '../mock-data/crimes';
import ArrowDownIcon from './icons/ArrowDownIcon';
import ArrowUpIcon from './icons/ArrowUpIcon';

const CRIME_CATEGORIES = ['All', 'Violent Crimes', 'Property Crimes', 'Traffic Incidents'];
const DATE_RANGES = ['Last 24h', 'Last 7d', 'Last 30d'];

const LiveHeatmapPreview: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeDateRange, setActiveDateRange] = useState('Last 7d');

  const getDaysFromRange = (range: string): number => {
      switch (range) {
          case 'Last 24h': return 1;
          case 'Last 7d': return 7;
          case 'Last 30d': return 30;
          default: return 30;
      }
  }

  const filteredCrimes = useMemo(() => {
    const now = new Date();
    const days = getDaysFromRange(activeDateRange);
    
    return crimeData.filter(crime => {
      const categoryMatch = activeCategory === 'All' || crime.category === activeCategory;
      const crimeDate = new Date(crime.date);
      const dateLimit = new Date(now);
      dateLimit.setDate(now.getDate() - days);
      const dateMatch = crimeDate >= dateLimit;
      
      return categoryMatch && dateMatch;
    });
  }, [activeCategory, activeDateRange]);

  const stats = useMemo(() => {
    const incidents = filteredCrimes.length;
    if (incidents === 0) {
        return {
            incidents: 0,
            mostCommon: { name: 'None', percentage: 0 },
            safetyScore: 10,
            trend: { direction: 'down', value: 0 }
        };
    }

    // Most Common Crime
    const categoryCounts = filteredCrimes.reduce((acc, crime) => {
        acc[crime.category] = (acc[crime.category] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const [mostCommonName, mostCommonCount] = Object.entries(categoryCounts)
      .sort((a, b) => b[1] - a[1])[0];
    
    const mostCommon = {
        name: mostCommonName,
        percentage: Math.round((mostCommonCount / incidents) * 100),
    };

    // Safety Score
    const totalRisk = filteredCrimes.reduce((sum, crime) => sum + crime.riskScore, 0);
    const avgRisk = totalRisk / incidents;
    const safetyScore = Math.max(0, 10 - (avgRisk / 2) - (incidents / 5)).toFixed(1);

    // Trend
    const now = new Date();
    const days = getDaysFromRange(activeDateRange);
    const currentPeriodStart = new Date(now);
    currentPeriodStart.setDate(now.getDate() - days);

    const previousPeriodStart = new Date(currentPeriodStart);
    previousPeriodStart.setDate(currentPeriodStart.getDate() - days);
    
    const previousCrimesCount = crimeData.filter(crime => {
        const categoryMatch = activeCategory === 'All' || crime.category === activeCategory;
        const crimeDate = new Date(crime.date);
        return categoryMatch && crimeDate >= previousPeriodStart && crimeDate < currentPeriodStart;
    }).length;

    let trendValue = 0;
    if (previousCrimesCount > 0) {
        trendValue = Math.round(((incidents - previousCrimesCount) / previousCrimesCount) * 100);
    } else if (incidents > 0) {
        trendValue = 100;
    }

    const trend = {
        direction: trendValue >= 0 ? 'up' : 'down',
        value: Math.abs(trendValue),
    };

    return { incidents, mostCommon, safetyScore, trend };

  }, [filteredCrimes, activeDateRange, activeCategory]);

  const getMarkerColor = (riskScore: number) => {
    if (riskScore > 8) return 'bg-red-600';
    if (riskScore > 5) return 'bg-red-400';
    return 'bg-yellow-400';
  }

  return (
    <section className="bg-white py-20 sm:py-24 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Map */}
            <div className="flex flex-col gap-4">
                <div className="aspect-w-16 aspect-h-10 bg-gray-100 rounded-lg overflow-hidden relative border-2 border-gray-200 shadow-lg">
                    <img src="https://i.imgur.com/3Ytq47x.png" alt="Stylized map of Nairobi" className="w-full h-full object-cover opacity-20" />
                    <div className="absolute inset-0">
                        {filteredCrimes.map(crime => (
                            <div key={crime.id} className="absolute transform -translate-x-1/2 -translate-y-1/2" style={{ top: crime.location.top, left: crime.location.left }}>
                                <div className={`w-3 h-3 rounded-full ${getMarkerColor(crime.riskScore)} border border-white/50`}>
                                    {crime.riskScore > 8 && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="absolute top-4 left-4 text-black text-lg font-bold bg-white/50 backdrop-blur-sm px-4 py-2 rounded-md">Nairobi Area</div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                     <div className="flex-1 flex flex-wrap gap-2 items-center">
                        {CRIME_CATEGORIES.map(category => (
                            <button key={category} onClick={() => setActiveCategory(category)} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${activeCategory === category ? 'bg-red-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>
                                {category}
                            </button>
                        ))}
                    </div>
                     <div className="flex-shrink-0 flex flex-wrap gap-2 items-center">
                        {DATE_RANGES.map(range => (
                            <button key={range} onClick={() => setActiveDateRange(range)} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${activeDateRange === range ? 'bg-red-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>
                                {range}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column: Stats */}
            <div className="text-black">
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                    Live Crime Activity
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                    Get a real-time overview of reported incidents. This data is updated continuously based on community reports.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-500">Live incidents in this area</p>
                        <p className="text-4xl font-bold text-red-500">{stats.incidents}</p>
                    </div>
                     <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-500">Most common crime</p>
                        <p className="text-2xl font-bold text-black truncate">{stats.mostCommon.name}</p>
                        <p className="text-sm font-semibold text-gray-500">{stats.mostCommon.percentage}% of reports</p>
                    </div>
                     <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-500">Current Safety Score</p>
                        <p className="text-4xl font-bold text-black">{stats.safetyScore}<span className="text-2xl text-gray-400">/10</span></p>
                    </div>
                     <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-500">Trend vs. last period</p>
                        <div className={`flex items-center gap-2 text-2xl font-bold ${stats.trend.direction === 'up' ? 'text-red-500' : 'text-green-500'}`}>
                            {stats.trend.direction === 'up' ? <ArrowUpIcon className="h-6 w-6"/> : <ArrowDownIcon className="h-6 w-6"/>}
                            <span>{stats.trend.value}%</span>
                        </div>
                    </div>
                </div>
                 <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
                    <a href="/heatmap" className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-transform transform hover:scale-105 shadow-lg">
                        View Full Interactive Map
                    </a>
                    <a href="#" className="w-full sm:w-auto text-sm text-gray-600 hover:text-black px-6 py-3 rounded-md hover:bg-gray-100 transition-colors">
                        Set up neighborhood alerts
                    </a>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default LiveHeatmapPreview;