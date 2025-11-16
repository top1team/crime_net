"use client";
import React, { useState, useEffect } from 'react';
import ShieldIcon from './icons/ShieldIcon';

interface Crime {
    id: string;
    category: string;
    severity: string;
    title: string;
    location_name: string;
    latitude: number;
    longitude: number;
    risk_score: number;
    date: string;
    county: string;
    color: string;
}

const CRIME_CATEGORIES = ['All', 'murder', 'gbv', 'assault', 'theft', 'fraud', 'drug_related', 'vandalism', 'traffic'];
const DATE_RANGES = [
    { label: 'All Time', value: 'all' },
    { label: 'Last 24 hours', value: '24h' },
    { label: 'Last 7 days', value: '7d' },
    { label: 'Last 30 days', value: '30d' }
];

const Heatmap: React.FC = () => {
    const [crimes, setCrimes] = useState<Crime[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeDateRange, setActiveDateRange] = useState('all');
    const [activeTooltip, setActiveTooltip] = useState<Crime | null>(null);

    // Fetch data from API
    useEffect(() => {
        const fetchCrimes = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (activeCategory !== 'All') params.append('category', activeCategory);
                if (activeDateRange !== 'all') params.append('date_range', activeDateRange);

                const response = await fetch(`http://localhost:8000/api/heatmap/data?${params}`);
                const data = await response.json();

                if (data.success) {
                    setCrimes(data.data);
                }
            } catch (error) {
                console.error('Error fetching crimes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCrimes();
    }, [activeCategory, activeDateRange]);

    // Convert lat/lng to map position (you'll need to adjust this based on your map image)
    const latLngToPosition = (lat: number, lng: number) => {
        // Simple conversion - adjust based on your map bounds
        // Nairobi bounds: lat -1.2-1.4, lng 36.7-36.9
        const mapWidth = 100; // percentage
        const mapHeight = 100;

        const minLat = -1.4;
        const maxLat = -1.2;
        const minLng = 36.7;
        const maxLng = 36.9;

        const x = ((lng - minLng) / (maxLng - minLng)) * mapWidth;
        const y = ((maxLat - lat) / (maxLat - minLat)) * mapHeight;

        return { left: `${x}%`, top: `${y}%` };
    };

    const getMarkerColor = (riskScore: number) => {
        if (riskScore > 8) return 'bg-red-600';
        if (riskScore > 5) return 'bg-red-400';
        return 'bg-yellow-400';
    };

    return (
        <section id="heatmap" className="bg-gray-50 py-20 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold tracking-tight text-black sm:text-4xl">
                        Crime Hotspots
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Real-time crime data from community reports. Use filters to view specific incidents.
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
                                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors capitalize ${
                                            activeCategory === category ? 'bg-red-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                                        }`}
                                    >
                                        {category.replace('_', ' ')}
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
                                        key={range.value}
                                        onClick={() => setActiveDateRange(range.value)}
                                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                                            activeDateRange === range.value ? 'bg-red-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                                        }`}
                                    >
                                        {range.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="mt-8 aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden relative border-2 border-gray-300 shadow-lg" style={{ height: '600px' }}>
                        {loading ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                            </div>
                        ) : (
                            <>
                                <img
                                    src="https://i.imgur.com/3Ytq47x.png"
                                    alt="Map of Nairobi"
                                    className="w-full h-full object-cover opacity-40"
                                />
                                <div className="absolute inset-0">
                                    {crimes.map(crime => {
                                        const position = latLngToPosition(crime.latitude, crime.longitude);
                                        return (
                                            <div
                                                key={crime.id}
                                                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                                                style={position}
                                                onMouseEnter={() => setActiveTooltip(crime)}
                                                onMouseLeave={() => setActiveTooltip(null)}
                                            >
                                                <div className={`w-4 h-4 rounded-full ${getMarkerColor(crime.risk_score)} border-2 border-white/50 cursor-pointer`}>
                                                    {crime.risk_score > 8 && (
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {/* Tooltip */}
                                    {activeTooltip && (() => {
                                        const position = latLngToPosition(activeTooltip.latitude, activeTooltip.longitude);
                                        return (
                                            <div
                                                className="absolute transform -translate-x-1/2 p-3 w-64 text-sm bg-white border-2 border-red-600 rounded-lg shadow-xl z-10 pointer-events-none"
                                                style={{
                                                    top: position.top,
                                                    left: position.left,
                                                    transform: 'translate(-50%, calc(-100% - 1rem))'
                                                }}
                                            >
                                                <div className="flex items-start justify-between mb-2">
                                                    <p className="font-bold text-red-600 capitalize text-base">
                                                        {activeTooltip.category.replace('_', ' ')}
                                                    </p>
                                                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                                                        activeTooltip.severity === 'critical' ? 'bg-red-100 text-red-700' :
                                                            activeTooltip.severity === 'high' ? 'bg-orange-100 text-orange-700' :
                                                                activeTooltip.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                                                    'bg-gray-100 text-gray-700'
                                                    }`}>
                            {activeTooltip.severity}
                          </span>
                                                </div>
                                                <p className="text-gray-800 mb-2 leading-tight">{activeTooltip.title}</p>
                                                <div className="flex items-center justify-between text-xs text-gray-500">
                                                    <span>📍 {activeTooltip.location_name}</span>
                                                    <span>⚠️ Risk: {activeTooltip.risk_score}/10</span>
                                                </div>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    {new Date(activeTooltip.date).toLocaleString()}
                                                </p>
                                            </div>
                                        );
                                    })()}
                                </div>
                            </>
                        )}

                        {/* Info Badge */}
                        <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 text-black px-4 py-2 rounded-full text-sm backdrop-blur-sm shadow-lg">
                            <ShieldIcon className="h-5 w-5 text-red-500"/>
                            <span className="font-semibold">{crimes.length} incidents found</span>
                        </div>

                        {/* Legend */}
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                            <h4 className="text-xs font-bold text-gray-700 mb-2">Risk Level</h4>
                            <div className="space-y-1.5">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-600"></div>
                                    <span className="text-xs text-gray-600">Critical (9-10)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <span className="text-xs text-gray-600">High (6-8)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <span className="text-xs text-gray-600">Medium (1-5)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <StatsCard crimes={crimes} />
                    </div>
                </div>
            </div>
        </section>
    );
};

// Stats Card Component
const StatsCard: React.FC<{ crimes: Crime[] }> = ({ crimes }) => {
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/heatmap/stats');
                const data = await response.json();
                if (data.success) {
                    setStats(data.stats);
                }
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchStats();
    }, [crimes]);

    if (!stats) return null;

    const getMostCommonCrime = () => {
        const categories = stats.by_category;
        if (!categories || Object.keys(categories).length === 0) return 'N/A';

        const maxCategory = Object.entries(categories).reduce((a: any, b: any) =>
            b[1] > a[1] ? b : a
        );
        return maxCategory[0].replace('_', ' ');
    };

    const getAverageRiskScore = () => {
        if (crimes.length === 0) return 0;
        const sum = crimes.reduce((acc, crime) => acc + crime.risk_score, 0);
        return (sum / crimes.length).toFixed(1);
    };

    return (
        <>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Incidents</p>
                        <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total_crimes}</p>
                    </div>
                    <div className="bg-red-100 p-3 rounded-full">
                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Most Common</p>
                        <p className="text-xl font-bold text-gray-900 mt-1 capitalize">{getMostCommonCrime()}</p>
                    </div>
                    <div className="bg-yellow-100 p-3 rounded-full">
                        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Average Risk</p>
                        <p className="text-3xl font-bold text-gray-900 mt-1">{getAverageRiskScore()}/10</p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-full">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Heatmap;