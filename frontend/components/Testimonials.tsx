'use client';

import React, { useState, useEffect, useCallback } from 'react';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';
import VerifiedIcon from './icons/VerifiedIcon';

const testimonials = [
  {
    quote: "I witnessed a burglary but was afraid to get involved. The anonymous option gave me courage to report without fear. Police arrested the suspects the next day.",
    author: "Verified User",
    location: "Nairobi",
    imageUrl: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3",
    anonymous: true,
  },
  {
    quote: "When my shop was vandalized, I filed an identified report. The police called me within hours and used my security footage to identify the perpetrators.",
    author: "Business Owner",
    location: "Mombasa",
    imageUrl: "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3",
    anonymous: false,
  },
  {
    quote: "CrimeNet has transformed how our estate handles security. The heatmap helped us identify problem areas and increase patrols accordingly.",
    author: "Estate Manager",
    location: "Kisumu",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3",
    anonymous: false,
  },
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    // Reset timer whenever user manually navigates
    const slideInterval = setInterval(nextSlide, 7000);
    return () => clearInterval(slideInterval);
  }, [currentIndex, nextSlide]);

  return (
    <section className="bg-gray-50 py-20 sm:py-24 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold tracking-tight text-black sm:text-4xl">
            What Our Community Says
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Real stories from users who are helping make their neighborhoods safer with CrimeNet.
          </p>
        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          <div className="relative h-80 md:h-64 overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="flex flex-col items-center text-center p-4">
                  <img
                    src={testimonial.imageUrl}
                    alt={testimonial.author}
                    className={`w-20 h-20 rounded-full object-cover mb-4 border-4 border-white shadow-md ${
                      testimonial.anonymous ? 'filter blur-sm' : ''
                    }`}
                  />
                  <blockquote className="max-w-2xl">
                    <p className="text-xl italic text-gray-800">"{testimonial.quote}"</p>
                  </blockquote>
                  <footer className="mt-4">
                    <p className="font-bold text-black">{testimonial.author}, {testimonial.location}</p>
                    <div className="mt-2 inline-flex items-center gap-1.5 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                        <VerifiedIcon className="h-4 w-4" />
                        Verified User
                    </div>
                  </footer>
                </div>
              </div>
            ))}
          </div>
          
          <button
            onClick={prevSlide}
            className="absolute top-1/2 -left-4 md:-left-16 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors z-10"
            aria-label="Previous testimonial"
          >
            <ArrowLeftIcon className="h-6 w-6 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 -right-4 md:-right-16 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors z-10"
            aria-label="Next testimonial"
          >
            <ArrowRightIcon className="h-6 w-6 text-gray-700" />
          </button>

          <div className="flex justify-center space-x-3 pt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  currentIndex === index ? 'bg-red-600' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;