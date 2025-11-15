import React from 'react';
import ShieldIcon from './icons/ShieldIcon';
import HandshakeIcon from './icons/HandshakeIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';

const FeatureComparison: React.FC = () => {
    const comparisonData = [
        {
            feature: 'Privacy Level',
            anonymous: 'Maximum. No personal data is ever collected or stored.',
            identified: 'Standard. Verified contact information is required for follow-up.',
        },
        {
            feature: 'Follow-Up',
            anonymous: 'Self-service using your secure, anonymous Report ID.',
            identified: 'Direct contact from authorities or investigators.',
        },
        {
            feature: 'Ideal For',
            anonymous: 'Witnesses, sensitive situations, reporting minor crimes, or providing tips.',
            identified: 'Victims of crime, situations requiring ongoing official updates.',
        },
        {
            feature: 'Data Security',
            anonymous: 'No identity to protect. All incident data is fully encrypted.',
            identified: 'All personal and report data is fully encrypted and secure.',
        },
    ];

    return (
        <section className="bg-stone-100/50 py-20 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-extrabold tracking-tight text-stone-800 sm:text-4xl">
                        Which Option is Right For You?
                    </h2>
                    <p className="mt-4 text-lg text-stone-600">
                        Use this guide to understand the key differences and choose the reporting method that best fits your situation and comfort level.
                    </p>
                </div>

                <div className="mt-16 max-w-5xl mx-auto">
                    <div className="grid grid-cols-3 gap-px bg-stone-300 rounded-lg overflow-hidden border border-stone-300">
                        {/* Headers */}
                        <div className="bg-stone-100 p-4 md:p-6">
                            <h3 className="text-base md:text-lg font-bold text-stone-800">Feature</h3>
                        </div>
                        <div className="bg-stone-100 p-4 md:p-6 text-center">
                            <div className="flex flex-col md:flex-row items-center justify-center gap-2">
                                <ShieldIcon className="h-6 w-6 text-red-500" />
                                <h3 className="text-base md:text-lg font-bold text-stone-800">Anonymous</h3>
                            </div>
                        </div>
                        <div className="bg-stone-100 p-4 md:p-6 text-center">
                            <div className="flex flex-col md:flex-row items-center justify-center gap-2">
                                <HandshakeIcon className="h-6 w-6 text-blue-500" />
                                <h3 className="text-base md:text-lg font-bold text-stone-800">Identified</h3>
                            </div>
                        </div>

                        {/* Rows */}
                        {comparisonData.map((item, index) => (
                            <React.Fragment key={index}>
                                <div className="bg-stone-50 p-4 md:p-6">
                                    <p className="font-semibold text-stone-700">{item.feature}</p>
                                </div>
                                <div className="bg-stone-25 p-4 md:p-6 text-stone-600">
                                    <div className="flex items-start gap-3">
                                        <CheckCircleIcon className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                                        <span>{item.anonymous}</span>
                                    </div>
                                </div>
                                <div className="bg-stone-25 p-4 md:p-6 text-stone-600">
                                    <div className="flex items-start gap-3">
                                        <CheckCircleIcon className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                        <span>{item.identified}</span>
                                    </div>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeatureComparison;