import React from 'react';
import ShieldIcon from '../../components/icons/ShieldIcon';

export default function AboutPage() {
  const teamMembers = [
    { name: "Denil Anyonyi", role: "Frontend", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face" },
    { name: "Ray Muiruri", role: "Backend", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" },
    { name: "Bernard Okumu", role: "Backend", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" },
    { name: "Jesse Kuya", role: "DevOps", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" },
    { name: "Sheila Fana", role: "UI/UX", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face" },
  ];

  const values = [
    { icon: "🛡️", title: "Privacy First", description: "Your safety and privacy are our top priorities" },
    { icon: "🤝", title: "Community Driven", description: "Built by the community, for the community" },
    { icon: "⚡", title: "Real-time Response", description: "Instant alerts and rapid response coordination" },
    { icon: "🔒", title: "Secure & Reliable", description: "Enterprise-grade security and 99.9% uptime" },
  ];

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://picsum.photos/seed/community/1920/1080" 
            alt="Community safety and technology" 
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-50/90 dark:from-stone-900/90 via-stone-50/70 dark:via-stone-900/70 to-transparent"></div>
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <ShieldIcon className="h-16 w-16 text-red-600" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-stone-800 dark:text-stone-200 sm:text-5xl">
              About CrimeNet
            </h1>
            <p className="mt-6 text-lg text-stone-600 dark:text-stone-300">
              We're on a mission to make communities safer through technology, transparency, and collective action.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white dark:bg-stone-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-stone-800 dark:text-stone-200 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-stone-600 dark:text-stone-300 mb-4">
                CrimeNet was founded with a simple belief: every person deserves to feel safe in their community. 
                We leverage cutting-edge AI and community collaboration to create a comprehensive safety network.
              </p>
              <p className="text-lg text-stone-600 dark:text-stone-300">
                Our platform empowers citizens to report incidents anonymously or with full identification, 
                while providing law enforcement with real-time data to respond more effectively.
              </p>
            </div>
            <div className="bg-stone-100 dark:bg-stone-700 rounded-lg p-8">
              <div className="text-center">
                <h3 className="text-xl font-bold text-stone-800 dark:text-stone-200 mb-2">Our Goal</h3>
                <p className="text-stone-600 dark:text-stone-300">
                  Reduce crime rates by 30% in participating communities through improved reporting and response coordination.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-800 dark:text-stone-200 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-stone-600 dark:text-stone-300">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center bg-white dark:bg-stone-800 p-6 rounded-lg border border-stone-200 dark:border-stone-700">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-2">{value.title}</h3>
                <p className="text-stone-600 dark:text-stone-300 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white dark:bg-stone-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-800 dark:text-stone-200 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-stone-600 dark:text-stone-300">
              Dedicated professionals working to make your community safer
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="mb-4">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-stone-200 dark:border-stone-600"
                  />
                </div>
                <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200">{member.name}</h3>
                <p className="text-stone-600 dark:text-stone-300">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-800 dark:text-stone-200 mb-4">
              Our Impact
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-white dark:bg-stone-800 p-8 rounded-lg border border-stone-200 dark:border-stone-700">
              <div className="text-4xl font-bold text-red-600 mb-2">50,000+</div>
              <p className="text-stone-600 dark:text-stone-300">Active Users</p>
            </div>
            <div className="text-center bg-white dark:bg-stone-800 p-8 rounded-lg border border-stone-200 dark:border-stone-700">
              <div className="text-4xl font-bold text-red-600 mb-2">25,000+</div>
              <p className="text-stone-600 dark:text-stone-300">Reports Processed</p>
            </div>
            <div className="text-center bg-white dark:bg-stone-800 p-8 rounded-lg border border-stone-200 dark:border-stone-700">
              <div className="text-4xl font-bold text-red-600 mb-2">98%</div>
              <p className="text-stone-600 dark:text-stone-300">User Satisfaction</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}