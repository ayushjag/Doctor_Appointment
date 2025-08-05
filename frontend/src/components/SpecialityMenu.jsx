import React from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
    return (
        <div id='speciality' className='flex flex-col items-center gap-6 py-16 text-blue-900 bg-white'>
            
            <h1 className='text-4xl font-bold text-blue-900 md:text-4xl '>Find by Speciality</h1>
            <p className='sm:w-1/2 text-center text-sm text-gray-600'>
                Browse our wide range of trusted specialists and book your appointment easily.
            </p>

            <div className='flex sm:justify-center gap-4 pt-6 w-full overflow-x-auto px-4'>
                {specialityData.map((item, index) => (
                    <Link
                        to={`/doctors/${item.speciality}`}
                        onClick={() => scrollTo(0, 0)}
                        key={index}
                        className='flex flex-col items-center text-xs sm:text-sm font-medium text-center cursor-pointer flex-shrink-0 hover:translate-y-[-8px] transition-transform duration-300'
                    >
                        <img
                            className='w-16 sm:w-24 mb-2 rounded-full shadow-md hover:scale-105 transition-transform duration-300'
                            src={item.image}
                            alt={item.speciality}
                        />
                        <p>{item.speciality}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SpecialityMenu;
