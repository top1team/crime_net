"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import ShieldIcon from './icons/ShieldIcon';
import MenuIcon from './icons/MenuIcon';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Report Crime' },
    { href: '/heatmap', label: 'Heatmap' },
    { href: '/', label: 'Alerts' },
    { href: '/', label: 'About Us' },
  ];

  return (
    <header className="bg-stone-50/90 dark:bg-stone-900/90 backdrop-blur-sm sticky top-0 z-50 border-b border-stone-200 dark:border-stone-700" style={{position: 'sticky'}}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <ShieldIcon className="h-8 w-8 text-red-600" />
              <span className="text-stone-800 dark:text-stone-200 font-bold text-xl">CrimeNet</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 hover:text-stone-800 dark:hover:text-stone-200 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
             <div className="flex items-center gap-4">
                <ThemeToggle />
                <Link href="/login" className="text-stone-600 dark:text-stone-300 hover:text-stone-800 dark:hover:text-stone-200 px-3 py-2 rounded-md text-sm font-medium transition-colors">
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
              className="bg-stone-100 dark:bg-stone-700 inline-flex items-center justify-center p-2 rounded-md text-stone-600 dark:text-stone-300 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-stone-100 dark:focus:ring-offset-stone-900 focus:ring-stone-300 dark:focus:ring-stone-500"
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
                className="text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 hover:text-stone-800 dark:hover:text-stone-200 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
             <Link href="/login" className="text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 hover:text-stone-800 dark:hover:text-stone-200 block px-3 py-2 rounded-md text-base font-medium transition-colors">
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