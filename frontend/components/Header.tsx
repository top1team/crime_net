"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import ShieldIcon from './icons/ShieldIcon';
import MenuIcon from './icons/MenuIcon';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Report Crime' },
    { href: '/heatmap', label: 'Heatmap' },
    { href: '/', label: 'Alerts' },
    { href: '/', label: 'About Us' },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <ShieldIcon className="h-8 w-8 text-red-600" />
              <span className="text-black font-bold text-xl">CrimeNet</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-gray-600 hover:bg-gray-100 hover:text-black px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
             <div className="flex items-center gap-4">
                <Link href="/login" className="text-gray-600 hover:text-black px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Login
                </Link>
                <Link href="/signup" className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md text-sm font-bold transition-colors">
                  Sign Up
                </Link>
             </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <MenuIcon />
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-gray-600 hover:bg-gray-100 hover:text-black block px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
             <Link href="/login" className="text-gray-600 hover:bg-gray-100 hover:text-black block px-3 py-2 rounded-md text-base font-medium transition-colors">
                Login
              </Link>
              <Link href="/signup" className="bg-red-600 text-white hover:bg-red-700 block px-3 py-2 rounded-md text-base font-bold transition-colors">
                Sign Up
              </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;