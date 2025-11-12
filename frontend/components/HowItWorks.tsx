'use client';

import React, { useState } from 'react';
import ShieldIcon from './icons/ShieldIcon';
import HandshakeIcon from './icons/HandshakeIcon';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';

const HowItWorks: React.FC = () => {
    const [selectedPath, setSelectedPath] = useState<'anonymous' | 'identified' | null>(null);

    const anonymousData = {
        title: "Total Privacy",
        icon: <ShieldIcon className="h-10 w-10 text-red-600 flex-shrink-0" />,
        steps: [
            "Provide the incident details.",
            "Pin the location on a map.",
            "Get a secure tracking code. This is your only way to follow up."
        ],
        feature: {
            text: "We never ask for or store your name, phone, or email.",
            style: "text-red-700 bg-red-50 border-red-200",
            hover: "hover:border-red-400 hover:shadow-red-500/10"
        },
        detail: {
            title: "How Anonymous Reporting Works",
            steps: [
                {
                    title: "Generate Secure Code",
                    description: "When you submit, the system creates a unique, encrypted tracking code. This is your only link to the report."
                },
                {
                    title: "Zero Personal Data",
                    description: "We do not log IP addresses, browser information, or any other identifying data associated with your report."
                },
                {
                    title: "Guaranteed Anonymity",
                    description: "This process ensures you can share sensitive information with complete confidence and without fear of being identified."
                }
            ],
            style: "border-red-400/50 shadow-red-500/10",
        }
    };

    const identifiedData = {
        title: "Official Follow-Up",
        icon: <HandshakeIcon className="h-10 w-10 text-blue-500 flex-shrink-0" />,
        steps: [
            "Provide the incident details.",
            "Pin the location on a map.",
            "Provide contact details and verify your report."
        ],
        feature: {
            text: "Authorities can contact you for more information or updates.",
            style: "text-blue-700 bg-blue-50 border-blue-200",
            hover: "hover:border-blue-400 hover:shadow-blue-500/10"
        },
        detail: {
            title: "The Identified Reporting Process",
            steps: [
                {
                    title: "Direct Collaboration",
                    description: "Your report, along with your verified contact details, is forwarded securely to the appropriate authorities."
                },
                {
                    title: "Investigator Follow-Up",
                    description: "Law enforcement may contact you for clarification or additional information, which can be critical for solving a case."
                },
                {
                    title: "Strict Confidentiality",
                    description: "Your personal details are handled with the utmost security and are only shared with verified officials involved in the investigation."
                }
            ],
            style: "border-blue-400/50 shadow-blue-500/10",
        }
    };

    const ReportCard = ({ data, onClick, isFaded }: { data: any, onClick: () => void, isFaded: boolean }) => (
        <div 
            onClick={onClick}
            className={`bg-white border border-gray-200 rounded-2xl p-8 flex flex-col h-full cursor-pointer transition-all duration-500 ease-in-out shadow-md ${isFaded ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'} ${data.feature.hover} hover:shadow-xl`}
        >
             <div className="flex items-center gap-4">
                {data.icon}
                <h3 className="text-2xl font-bold text-black">{data.title}</h3>
            </div>
            <ul className="mt-6 space-y-4 text-gray-600 list-disc list-inside">
                {data.steps.map((step: string, index: number) => <li key={index}>{step}</li>)}
            </ul>
            <div className="mt-auto pt-6">
                <p className={`text-sm font-semibold rounded-md p-3 border ${data.feature.style}`}>
                    <span className="font-bold">Key Feature:</span> {data.feature.text}
                </p>
            </div>
        </div>
    );

    const DetailPanel = ({ data, onClose, isVisible, arrowDirection }: { data: any, onClose: () => void, isVisible: boolean, arrowDirection: 'left' | 'right' }) => (
        <div className={`bg-white border rounded-2xl p-8 flex flex-col h-full absolute top-0 left-0 w-full transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'} ${data.detail.style}`}>
            <div className="flex items-center gap-4 mb-8">
                {data.icon}
                <h3 className="text-2xl font-bold text-black">{data.detail.title}</h3>
            </div>
            <div className="space-y-6 flex-grow">
                {data.detail.steps.map((step: {title: string, description: string}, index: number) => (
                    <div key={index} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center font-bold text-gray-800 mt-1">
                            <span>{index + 1}</span>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-black">{step.title}</h4>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button
                onClick={onClose}
                className={`mt-8 inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-black transition-colors group ${arrowDirection === 'left' ? 'self-start' : 'self-end'}`}
                aria-label="Go back to reporting options"
            >
                {arrowDirection === 'left' ? (
                    <>
                        <ArrowLeftIcon className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                        <span>Go Back</span>
                    </>
                ) : (
                    <>
                        <span>Go Back</span>
                        <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </>
                )}
            </button>
        </div>
    );

    return (
        <section className="bg-white py-20 sm:py-24 border-t border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-extrabold tracking-tight text-black sm:text-4xl">
                        Two Ways to Report. One Safe Process.
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                       Choose the reporting method that's right for you. Click a card below to learn more about each process.
                    </p>
                </div>

                <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 min-h-[480px]">
                    {/* Column 1: Anonymous Card OR Identified Detail */}
                    <div className="relative">
                        <ReportCard data={anonymousData} onClick={() => setSelectedPath('anonymous')} isFaded={selectedPath === 'identified'} />
                        <DetailPanel data={identifiedData} onClose={() => setSelectedPath(null)} isVisible={selectedPath === 'identified'} arrowDirection="right" />
                    </div>

                    {/* Column 2: Identified Card OR Anonymous Detail */}
                    <div className="relative">
                        <ReportCard data={identifiedData} onClick={() => setSelectedPath('identified')} isFaded={selectedPath === 'anonymous'} />
                        <DetailPanel data={anonymousData} onClose={() => setSelectedPath(null)} isVisible={selectedPath === 'anonymous'} arrowDirection="left" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;