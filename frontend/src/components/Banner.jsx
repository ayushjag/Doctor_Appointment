import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className='relative overflow-hidden bg-blue-50 rounded-2xl px-6 sm:px-10 lg:px-20 py-12 mt-20 mx-4 md:mx-10 shadow-lg'>

      {/* Background Accent */}
      <div className='absolute top-0 right-0 w-40 h-40 bg-blue-100 rounded-full blur-2xl opacity-50'></div>

      <div className='flex flex-col md:flex-row items-center justify-between z-10 relative'>

        {/* Left Side */}
        <div className='flex-1 text-center md:text-left'>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900 leading-tight'>
            Book Your Appointment
          </h2>
          <p className='mt-4 text-lg text-blue-700 font-light'>
            Connect with 100+ trusted doctors, quickly and easily.
          </p>
          <button
            onClick={() => { navigate('/login'); scrollTo(0, 0); }}
            className='mt-6 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-medium px-8 py-3 rounded-full transition-all shadow-md'
          >
            Create Account
          </button>
        </div>

        {/* Right Side Image */}
        <div className='hidden md:flex md:w-1/2 justify-end mt-8 md:mt-0'>
          <img
            src={assets.appointment_img}
            alt="Doctor Illustration"
            className='w-full max-w-md object-contain drop-shadow-xl'
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
