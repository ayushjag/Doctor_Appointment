import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
    return (
        <div className='flex flex-col md:flex-row items-center bg-white px-6 md:px-16 lg:px-24 md:py-10'>
            
            {/* Left Side */}
            <div className='md:w-1/2 flex flex-col gap-6'>
                <p className='text-sm text-blue-900 font-semibold tracking-wide uppercase'>
                    Hospital Center ----
                </p>
                <h1 className='text-4xl md:text-5xl font-extrabold text-blue-900 leading-tight'>
                    Healthcare for <br /> Family’s Health
                </h1>
                <p className='text-gray-500 text-base leading-relaxed'>
                   We provide comprehensive healthcare services tailored for your family's well-being. Our trusted professionals ensure compassionate care, focused on comfort, convenience, and results.
                </p>
                <a
                    href='#speciality'
                    className='bg-blue-600 hover:bg-blue-700 transition-all text-white text-sm font-medium px-6 py-4 rounded-md w-fit'
                >
                    Book an Appointment
                </a>
            </div>

            {/* Right Side */}
            <div className='md:w-1/2 mt-5 md:mt-0 flex justify-center'>
                <img
                    src={assets.header_img}
                    alt="Doctor"
                    className='rounded-md w-full max-w-md object-cover'
                />
            </div>

        </div>
    );
};

export default Header;
