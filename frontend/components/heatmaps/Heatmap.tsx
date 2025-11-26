"use client";

import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import ShieldIcon from "../icons/ShieldIcon";

// Dynamically import the entire map component with no SSR
const MapView = dynamic(() => import("./MapView"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
    ),
});

type Crime = {
    id: string;
    title: string;
    description?: string;
    category: string;
    ai_confidence?: number;
    risk_score?: number;
    lat: number;
    lng: number;
    location_text?: string;
    color?: string;
    created_at: string;
};

// categories and date ranges (keeps your original labels)
const CRIME_CATEGORIES = ['All', 'Murder', 'GBV', 'Assault', 'Theft', 'Fraud', 'Robbery', 'Traffic', 'Suspicious'];
const DATE_RANGES = [
    { label: 'All Time', value: 'all' },
    { label: 'Last 24 hours', value: '24h' },
    { label: 'Last 7 days', value: '7d' },
    { label: 'Last 30 days', value: '30d' }
];

export default function Heatmap() {
    const [crimes, setCrimes] = useState<Crime[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [activeDateRange, setActiveDateRange] = useState<string>('all');

    // fetch function: uses backend category query param for server filtering
    useEffect(() => {
        let mounted = true;
        const fetchCrimes = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (activeCategory && activeCategory !== 'All') {
                    params.append('category', activeCategory);
                }
                // backend endpoint (adjust host/port if different)
                const url = `http://localhost:8080/api/v1/heatmap${params.toString() ? `?${params.toString()}` : ''}`;
                const res = await fetch(url);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data: Crime[] = await res.json();
                if (!mounted) return;
                // backend returns created_at as ISO string; ensure numeric lat/lng
                setCrimes(data.map(d => ({
                    ...d,
                    lat: Number(d.lat),
                    lng: Number(d.lng),
                })));
            } catch (err) {
                console.error("Error fetching heatmap:", err);
                setCrimes([]);
            } finally {
                if (mounted) setLoading(false);
            }
        };

        fetchCrimes();
        return () => { mounted = false; };
    }, [activeCategory]);

    // client-side date filtering (server didn't implement date_range param in MVP)
    const filtered = useMemo(() => {
        if (activeDateRange === 'all') return crimes;
        const now = Date.now();
        let cutoff = 0;
        if (activeDateRange === '24h') cutoff = now - 24 * 3600 * 1000;
        if (activeDateRange === '7d') cutoff = now - 7 * 24 * 3600 * 1000;
        if (activeDateRange === '30d') cutoff = now - 30 * 24 * 3600 * 1000;
        return crimes.filter(c => {
            const t = new Date(c.created_at).getTime();
            return t >= cutoff;
        });
    }, [crimes, activeDateRange]);

    // utility to pick marker color if backend didn't provide color
    const categoryToHex = (cat: string) => {
        const m: Record<string, string> = {
            "Murder": "#FF0000",
            "GBV": "#800080",
            "Theft": "#FFA500",
            "Robbery": "#8B0000",
            "Fraud": "#FF69B4",
            "Traffic": "#008080",
            "Suspicious": "#FFFFFF",
            "Assault": "#D97706"
        };
        return m[cat] ?? "#333333";
    };

    // compute some stats quickly for the cards
    const stats = useMemo(() => {
        const total = filtered.length;
        const byCategory: Record<string, number> = {};
        let sumRisk = 0;
        for (const c of filtered) {
            byCategory[c.category] = (byCategory[c.category] || 0) + 1;
            sumRisk += (c.risk_score ?? 0);
        }
        return {
            total,
            byCategory,
            avgRisk: total ? (sumRisk / total) : 0
        };
    }, [filtered]);

    return (
        <section id="heatmap" className="bg-gray-50 dark:bg-gray-900 py-12 sm:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold tracking-tight text-black dark:text-white sm:text-4xl">Kenya Crime Hotspots</h2>
                    <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Real-time crime reports across Kenya. Use filters to focus the map.
                    </p>
                </div>

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr,420px] gap-6">
                    {/* Left: Map */}
                    <div className="rounded-lg overflow-hidden border dark:border-gray-700 shadow-lg h-[640px]">
                        {loading ? (
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                            </div>
                        ) : (
                            <MapView crimes={filtered} categoryToHex={categoryToHex} />
                        )}
                    </div>

                    {/* Right: Controls + Stats */}
                    <aside className="space-y-4">
                        {/* Filters */}
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border dark:border-gray-700">
                            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Filter by Category</h3>
                            <div className="flex flex-wrap gap-2">
                                {CRIME_CATEGORIES.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-3 py-1 text-sm rounded-md capitalize ${activeCategory === cat ? 'bg-red-600 text-white' : 'bg-white text-gray-700 border border-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 my-3">Filter by Date</h3>
                            <div className="flex flex-wrap gap-2">
                                {DATE_RANGES.map(range => (
                                    <button
                                        key={range.value}
                                        onClick={() => setActiveDateRange(range.value)}
                                        className={`px-3 py-1 text-sm rounded-md ${activeDateRange === range.value ? 'bg-red-600 text-white' : 'bg-white text-gray-700 border border-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600'}`}
                                    >
                                        {range.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border dark:border-gray-700 space-y-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Incidents</p>
                                    <p className="text-2xl font-bold dark:text-white">{stats.total}</p>
                                </div>
                                <div className="bg-red-100 p-2 rounded-full">
                                    <ShieldIcon className="w-5 h-5 text-red-600" />
                                </div>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Most Common</p>
                                <p className="text-lg font-semibold capitalize mt-1 dark:text-white">
                                    {(() => {
                                        const pairs = Object.entries(stats.byCategory);
                                        if (pairs.length === 0) return "N/A";
                                        const max = pairs.reduce((a, b) => (b[1] > a[1] ? b : a));
                                        return max[0].toLowerCase();
                                    })()}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Average Risk</p>
                                <p className="text-xl font-bold dark:text-white">{stats.avgRisk.toFixed(1)}/10</p>
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow border dark:border-gray-700">
                            <h4 className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">Legend</h4>
                            <div className="space-y-2">
                                <LegendRow color="#FF0000" label="Murder" />
                                <LegendRow color="#800080" label="GBV" />
                                <LegendRow color="#FFA500" label="Theft" />
                                <LegendRow color="#8B0000" label="Robbery" />
                                <LegendRow color="#FF69B4" label="Fraud" />
                                <LegendRow color="#008080" label="Traffic" />
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
}

// small presentational component for legend
const LegendRow: React.FC<{ color: string; label: string }> = ({ color, label }) => (
    <div className="flex items-center gap-2">
        <div style={{ background: color }} className="w-3 h-3 rounded-full border border-gray-200 dark:border-gray-600" />
        <div className="text-sm text-gray-600 dark:text-gray-300">{label}</div>
    </div>
);