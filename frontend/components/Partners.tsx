"use client";
import React from 'react';

const Partners: React.FC = () => {
  const partners = [
    { name: "SecureGuard Corp", logo: "🛡️" },
    { name: "SafeCity Solutions", logo: "🏙️" },
    { name: "AlertTech Systems", logo: "📡" },
    { name: "Guardian Financial", logo: "🏦" },
    { name: "TrustBank Ltd", logo: "💳" },
    { name: "Unity Credit Union", logo: "🏧" },
    { name: "Community First Bank", logo: "🤝" },
    { name: "Pinnacle Security", logo: "🌟" },
    { name: "Apex Technologies", logo: "🔷" },
    { name: "Nexus Innovations", logo: "💼" },
  ];

  return (
    <section className="bg-white dark:bg-stone-900 py-16 overflow-hidden border-t border-stone-200 dark:border-stone-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-200 mb-4">
            Trusted by Leading Organizations
          </h2>
          <p className="text-stone-600 dark:text-stone-300">
            Working together to build safer communities nationwide
          </p>
        </div>
        
        <div className="relative">
          <div className="flex animate-scroll">
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-8 flex items-center justify-center bg-stone-50 dark:bg-stone-800 rounded-lg p-6 min-w-[200px] h-24 border border-stone-200 dark:border-stone-700 hover:shadow-lg transition-shadow"
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{partner.logo}</div>
                  <div className="text-sm font-semibold text-stone-700 dark:text-stone-300">
                    {partner.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 10s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Partners;