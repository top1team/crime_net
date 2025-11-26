"use client";

import React, { useState } from 'react';

export default function ReportIncident() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    location: '',
    anonymous: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to submit incident
    console.log('Incident reported:', formData);
    alert('Incident reported successfully!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-stone-800 rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-stone-800 dark:text-stone-200 mb-8 text-center">
              Report an Incident
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Incident Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-stone-300 dark:border-stone-600 rounded-md bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Brief description of the incident"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-stone-300 dark:border-stone-600 rounded-md bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select a category</option>
                  <option value="theft">Theft</option>
                  <option value="assault">Assault</option>
                  <option value="vandalism">Vandalism</option>
                  <option value="fraud">Fraud</option>
                  <option value="suspicious_activity">Suspicious Activity</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-stone-300 dark:border-stone-600 rounded-md bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Where did this incident occur?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-stone-300 dark:border-stone-600 rounded-md bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Provide additional details about the incident"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="anonymous"
                  checked={formData.anonymous}
                  onChange={handleChange}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-stone-300 dark:border-stone-600 rounded"
                />
                <label className="ml-2 block text-sm text-stone-700 dark:text-stone-300">
                  Submit anonymously
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors font-medium"
              >
                Submit Report
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}