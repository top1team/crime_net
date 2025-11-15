'use client';
import React, { useState } from 'react';
import BellIcon from '../../components/icons/BellIcon';
import ClockIcon from '../../components/icons/ClockIcon';
import MapPinIcon from '../../components/icons/MapPinIcon';

interface Alert {
  id: string;
  type: 'emergency' | 'warning' | 'info';
  title: string;
  message: string;
  location: string;
  area: string;
  time: string;
  isRead: boolean;
}

export default function AlertsPage() {
  const [filter, setFilter] = useState<'all' | 'emergency' | 'warning' | 'info'>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'emergency',
      title: 'Armed Robbery in Progress',
      message: 'Multiple units responding to armed robbery at Main Street Bank. Avoid the area.',
      location: 'Main Street, Downtown',
      area: 'Downtown',
      time: '2 minutes ago',
      isRead: false
    },
    {
      id: '2',
      type: 'warning',
      title: 'Suspicious Activity Reported',
      message: 'Residents report suspicious individuals near Elm Park. Increased patrols deployed.',
      location: 'Elm Park Area',
      area: 'Westside',
      time: '15 minutes ago',
      isRead: false
    },
    {
      id: '3',
      type: 'info',
      title: 'Community Safety Meeting',
      message: 'Join us for a community safety meeting this Thursday at 7 PM.',
      location: 'Community Center',
      area: 'Downtown',
      time: '1 hour ago',
      isRead: true
    },
    {
      id: '4',
      type: 'warning',
      title: 'Vehicle Break-ins Reported',
      message: 'Multiple vehicle break-ins reported in Oak Street area. Secure your vehicles.',
      location: 'Oak Street Neighborhood',
      area: 'Eastside',
      time: '3 hours ago',
      isRead: true
    },
    {
      id: '5',
      type: 'emergency',
      title: 'Fire Emergency',
      message: 'House fire reported on Pine Street. Fire department responding.',
      location: 'Pine Street',
      area: 'Northside',
      time: '45 minutes ago',
      isRead: false
    },
    {
      id: '6',
      type: 'info',
      title: 'Road Closure',
      message: 'Main Avenue closed for maintenance until 6 PM.',
      location: 'Main Avenue',
      area: 'Westside',
      time: '2 hours ago',
      isRead: true
    }
  ]);

  const areas = ['all', ...Array.from(new Set(alerts.map(alert => alert.area)))];
  
  const filteredAlerts = alerts.filter(alert => {
    const typeMatch = filter === 'all' || alert.type === filter;
    const locationMatch = locationFilter === 'all' || alert.area === locationFilter;
    return typeMatch && locationMatch;
  });
  const unreadCount = alerts.filter(alert => !alert.isRead).length;

  const markAsRead = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, isRead: true } : alert
    ));
  };

  const getAlertStyles = (type: string) => {
    switch (type) {
      case 'emergency':
        return 'border-l-red-500 bg-red-50 dark:bg-red-900/20';
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'info':
        return 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/20';
      default:
        return 'border-l-stone-300 bg-white dark:bg-stone-800';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'emergency':
        return '🚨';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '📢';
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900">
      {/* Header */}
      <div className="bg-white dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BellIcon className="h-8 w-8 text-red-600" />
              <div>
                <h1 className="text-2xl font-bold text-stone-800 dark:text-stone-200">
                  Safety Alerts
                </h1>
                <p className="text-stone-600 dark:text-stone-300">
                  {unreadCount} unread alert{unreadCount !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Location Filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
            📍 Filter by Area
          </label>
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="px-3 py-2 border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            {areas.map(area => (
              <option key={area} value={area}>
                {area === 'all' ? 'All Areas' : area}
              </option>
            ))}
          </select>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'All Alerts', count: filteredAlerts.length },
              { key: 'emergency', label: 'Emergency', count: filteredAlerts.filter(a => a.type === 'emergency').length },
              { key: 'warning', label: 'Warning', count: filteredAlerts.filter(a => a.type === 'warning').length },
              { key: 'info', label: 'Info', count: filteredAlerts.filter(a => a.type === 'info').length }
            ].map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setFilter(key as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === key
                    ? 'bg-red-600 text-white'
                    : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-700'
                }`}
              >
                {label} ({count})
              </button>
            ))}
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.length === 0 ? (
            <div className="text-center py-12">
              <BellIcon className="h-12 w-12 text-stone-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-stone-600 dark:text-stone-300 mb-2">
                No alerts found
              </h3>
              <p className="text-stone-500 dark:text-stone-400">
                {locationFilter !== 'all' ? `No alerts found in ${locationFilter}.` : 
                 filter === 'all' ? 'No alerts available at the moment.' : `No ${filter} alerts found.`}
              </p>
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`border-l-4 p-4 rounded-r-lg border border-stone-200 dark:border-stone-700 ${getAlertStyles(alert.type)} ${
                  !alert.isRead ? 'shadow-md' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{getAlertIcon(alert.type)}</span>
                      <h3 className={`font-semibold ${!alert.isRead ? 'text-stone-900 dark:text-stone-100' : 'text-stone-700 dark:text-stone-300'}`}>
                        {alert.title}
                      </h3>
                      {!alert.isRead && (
                        <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-stone-600 dark:text-stone-300 mb-3">
                      {alert.message}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-stone-500 dark:text-stone-400">
                      <div className="flex items-center gap-1">
                        <MapPinIcon className="h-4 w-4" />
                        <span>{alert.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="bg-stone-200 dark:bg-stone-700 px-2 py-1 rounded text-xs">
                          {alert.area}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="h-4 w-4" />
                        <span>{alert.time}</span>
                      </div>
                    </div>
                  </div>
                  {!alert.isRead && (
                    <button
                      onClick={() => markAsRead(alert.id)}
                      className="ml-4 text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700 p-6">
          <h2 className="text-lg font-semibold text-stone-800 dark:text-stone-200 mb-4">
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <button className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
              <span className="text-2xl">🚨</span>
              <div className="text-left">
                <div className="font-medium text-red-800 dark:text-red-200">Report Emergency</div>
                <div className="text-sm text-red-600 dark:text-red-300">Call for immediate help</div>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
              <span className="text-2xl">📍</span>
              <div className="text-left">
                <div className="font-medium text-blue-800 dark:text-blue-200">View Area Map</div>
                <div className="text-sm text-blue-600 dark:text-blue-300">See incidents near you</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}