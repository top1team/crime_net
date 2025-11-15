import React from 'react';
import Link from 'next/link';

const CallToAction: React.FC = () => {
  return (
    <section className="bg-gray-50 dark:bg-stone-800 py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-black dark:text-stone-200 sm:text-4xl md:text-5xl">
            Ready to Make Your Community Safer?
          </h2>
          <p className="mt-4 text-lg text-blue-600 font-semibold">
            Join 50,000+ Kenyans Already Taking Action
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center flex-wrap gap-4">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-md text-white bg-red-600 hover:bg-red-700 transition-transform transform hover:scale-105 shadow-lg shadow-red-600/30"
            >
              <span className="mr-2">🚨</span> Report a Crime Now
            </Link>
            <Link
              href="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-md"
            >
              <span className="mr-2">🛡️</span> Create Account
            </Link>
             <Link
              href="/heatmap"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-stone-600 text-base font-medium rounded-md text-black dark:text-stone-200 bg-white dark:bg-stone-700 hover:bg-gray-100 dark:hover:bg-stone-600 transition-transform transform hover:scale-105"
            >
              Explore Crime Map
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-black dark:text-stone-200">
            <div className="bg-white dark:bg-stone-700 p-6 rounded-lg border border-gray-200 dark:border-stone-600">
              <p className="text-4xl font-bold text-red-500">23</p>
              <p className="mt-1 text-sm font-semibold text-gray-600 dark:text-stone-300">Reports filed in the last hour</p>
            </div>
            <div className="bg-white dark:bg-stone-700 p-6 rounded-lg border border-gray-200 dark:border-stone-600">
              <p className="text-4xl font-bold text-black dark:text-stone-200">2.1 <span className="text-2xl text-gray-400 dark:text-stone-500">hrs</span></p>
              <p className="mt-1 text-sm font-semibold text-gray-600 dark:text-stone-300">Avg. response time</p>
            </div>
            <div className="bg-white dark:bg-stone-700 p-6 rounded-lg border border-gray-200 dark:border-stone-600 flex items-center justify-center">
              <p className="text-lg font-bold text-green-600">"Your report could prevent the next crime"</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
