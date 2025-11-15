import React from 'react';
import ShieldIcon from './icons/ShieldIcon';
import FacebookIcon from './icons/FacebookIcon';
import TwitterIcon from './icons/TwitterIcon';
import WhatsAppIcon from './icons/WhatsAppIcon';

const Footer: React.FC = () => {
    const footerLinks = {
        'Quick Actions': [
            { href: '#', label: 'Report Crime' },
            { href: '#heatmap', label: 'View Heatmap' },
            { href: '#', label: 'Check Alerts' },
            { href: '#', label: 'Login/Register' },
            { href: '#', label: 'Emergency Contacts' },
        ],
        'Resources': [
            { href: '#', label: 'How It Works' },
            { href: '#', label: 'Safety Tips' },
            { href: '#', label: 'Crime Prevention' },
            { href: '#', label: 'FAQ & Help' },
            { href: '#', label: 'Community Guidelines' },
        ],
        'Legal & Support': [
            { href: '#', label: 'Privacy Policy' },
            { href: '#', label: 'Terms of Service' },
            { href: '#', label: 'Data Protection' },
            { href: '#', label: 'Contact Support' },
            { href: '#', label: 'Whistleblower Policy' },
        ],
    };

    return (
        <footer className="bg-stone-100 dark:bg-gray-900 text-stone-800 dark:text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16">
                
                {/* Critical Notice */}
                <div className="mb-12 p-4 bg-yellow-50 dark:bg-yellow-400/10 border border-yellow-300 dark:border-yellow-500 rounded-lg text-center">
                    <p className="font-bold text-yellow-700 dark:text-yellow-300">
                        <span className="text-2xl mr-2">⚠️</span> This platform is NOT for emergencies.
                    </p>
                    <p className="text-yellow-600 dark:text-yellow-400 text-sm">
                        In case of immediate danger, call <span className="font-bold underline">999</span> or <span className="font-bold underline">112</span> immediately.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Column 1: Platform Info */}
                    <div className="lg:col-span-1">
                        <a href="#" className="flex items-center gap-2">
                            <ShieldIcon className="h-8 w-8 text-red-500" />
                            <span className="font-bold text-xl">CrimeNet</span>
                        </a>
                        <p className="mt-4 text-stone-600 dark:text-gray-400 text-sm font-semibold max-w-xs">
                           Community Safety Intelligence
                        </p>
                         <p className="mt-2 text-stone-500 dark:text-gray-400 text-xs max-w-xs">
                           AI-powered crime reporting and analysis platform for Kenya.
                        </p>
                        <div className="mt-6 flex items-center space-x-4">
                            <a href="#" className="text-stone-500 dark:text-gray-400 hover:text-stone-700 dark:hover:text-white transition-colors" aria-label="Twitter">
                                <TwitterIcon className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-stone-500 dark:text-gray-400 hover:text-stone-700 dark:hover:text-white transition-colors" aria-label="Facebook">
                                <FacebookIcon className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-stone-500 dark:text-gray-400 hover:text-stone-700 dark:hover:text-white transition-colors" aria-label="WhatsApp">
                                <WhatsAppIcon className="h-6 w-6" />
                            </a>
                        </div>
                    </div>

                    {/* Links Columns */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h3 className="font-semibold tracking-wider uppercase text-stone-700 dark:text-gray-300 text-sm">{title}</h3>
                            <ul className="mt-4 space-y-3">
                                {links.map(link => (
                                    <li key={link.label}>
                                        <a href={link.href} className="text-stone-600 dark:text-gray-400 hover:text-stone-800 dark:hover:text-white transition-colors text-sm">
                                            {link.label}
                                        </a>
                                    </li>

                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-16 py-8 border-t border-stone-300 dark:border-gray-700">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-stone-600 dark:text-gray-500">
                        <p>&copy; {new Date().getFullYear()} CrimeNet. All rights reserved.</p>
                        <p className="font-semibold">Built for Kenyans, by Kenyans.</p>
                        <div className="flex items-center gap-2">
                            <span className="text-xs">v1.2.0</span>
                            <span className="w-1 h-1 bg-stone-400 dark:bg-gray-600 rounded-full"></span>
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5.002L10 18.451l7.834-13.449A11.954 11.954 0 0110 1.944zM10 5.236a.75.75 0 00-1.125.632l.687 4.124a.75.75 0 101.477-.246L10.339 5.92a.75.75 0 00-.339-.684zM9.25 12.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs">Secure Connection</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
