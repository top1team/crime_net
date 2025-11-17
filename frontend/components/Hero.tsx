import React from 'react';
import Link from 'next/link';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-200 overflow-hidden">
        <div className="absolute inset-0">
            <img 
                src="https://picsum.photos/seed/safety/1920/1080" 
                alt="Person calling for help in a city at night" 
                className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-50/80 dark:from-stone-900/80 via-stone-50/40 dark:via-stone-900/40 to-transparent"></div>
        </div>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-48">
        <div className="max-w-3xl text-center mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight text-stone-800 dark:text-stone-200 sm:text-5xl md:text-6xl">
            Building Safer Communities, Together.
          </h1>
          <p className="mt-6 text-lg max-w-2xl mx-auto text-stone-600 dark:text-stone-300">
            CrimeNet is your AI-powered partner in community security. Report incidents in real-time, stay informed with localized alerts, and contribute to a safer neighborhood for everyone.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-transform transform hover:scale-105 shadow-lg shadow-red-600/30"
            >
              Report an Incident
            </Link>
            <Link
              href="/heatmap"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-stone-300 dark:border-stone-600 text-base font-medium rounded-md text-stone-800 dark:text-stone-200 bg-stone-100/60 dark:bg-stone-800/60 hover:bg-stone-200/80 dark:hover:bg-stone-700/80 transition-transform transform hover:scale-105"
            >
              View Crime Heatmap
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;