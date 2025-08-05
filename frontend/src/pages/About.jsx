import React from 'react';
import { assets } from '../assets/assets';

// --- Icon Components for "Why Choose Us" section ---
const EfficiencyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ConvenienceIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const PersonalizationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);


const About = () => {
    return (
        <div className="bg-gray-50">
            <div className="container mx-auto px-4 py-16">
                
                {/* --- HEADER --- */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-800">
                        About <span className="text-blue-600">HealthLife</span>
                    </h1>
                    <p className="text-lg text-gray-600 mt-2">Your trusted partner in healthcare management.</p>
                </div>

                {/* --- ABOUT US & OUR VISION SECTION --- */}
                <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
                    <div className="md:w-1/2">
                        <img className="w-full rounded-lg shadow-xl" src={assets.about_image} alt="Doctors collaborating" />
                    </div>
                    <div className="md:w-1/2 flex flex-col gap-6 text-gray-700">
                        <p className="text-base leading-relaxed">
                            Welcome to HealthLife, your trusted partner in managing your healthcare needs conveniently and efficiently. We understand the challenges individuals face when it comes to scheduling doctor appointments and managing health records.
                        </p>
                        <p className="text-base leading-relaxed">
                            HealthLife is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service.
                        </p>
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Our Vision</h2>
                            <p className="text-base leading-relaxed">
                                Our vision at HealthLife is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- WHY CHOOSE US SECTION --- */}
                <div className="text-center mb-12">
                     <h2 className="text-3xl font-bold text-gray-800">
                        Why <span className="text-blue-600">Choose Us?</span>
                    </h2>
                    <p className="text-lg text-gray-600 mt-2">Discover the advantages of using our platform.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {/* Card 1: Efficiency */}
                    <div className="bg-white p-8 rounded-lg shadow-md transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
                        <div className="flex items-center justify-center h-20 w-20 rounded-full bg-blue-600 mx-auto mb-6">
                           <EfficiencyIcon />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Efficiency</h3>
                        <p className="text-gray-600">Streamlined appointment scheduling that fits into your busy lifestyle.</p>
                    </div>

                    {/* Card 2: Convenience */}
                    <div className="bg-white p-8 rounded-lg shadow-md transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
                         <div className="flex items-center justify-center h-20 w-20 rounded-full bg-blue-600 mx-auto mb-6">
                           <ConvenienceIcon />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Convenience</h3>
                        <p className="text-gray-600">Access our network of trusted healthcare professionals from anywhere.</p>
                    </div>

                    {/* Card 3: Personalization */}
                    <div className="bg-white p-8 rounded-lg shadow-md transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
                         <div className="flex items-center justify-center h-20 w-20 rounded-full bg-blue-600 mx-auto mb-6">
                           <PersonalizationIcon />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Personalization</h3>
                        <p className="text-gray-600">Tailored recommendations to help you stay on top of your health.</p>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default About;
