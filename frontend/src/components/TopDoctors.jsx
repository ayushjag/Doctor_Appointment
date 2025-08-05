import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);

    return (
        <div className='bg-gray-50 py-16'>
            <div className='container mx-auto px-4'>
                <div className='text-center mb-12'>
                    <h1 className='text-4xl font-bold text-blue-900 mb-3'>
                        Top Doctors to Book
                    </h1>
                    <p className='text-lg text-gray-600'>
                        Easily browse through our extensive list of trusted doctors.
                    </p>
                </div>
                {/* --- UPDATED GRID CLASSES HERE --- */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                    {doctors.slice(0, 8).map((item, index) => ( // Changed slice to 8 to fit the grid nicely
                        <div
                            onClick={() => {
                                navigate(`/appointment/${item._id}`);
                                window.scrollTo(0, 0);
                            }}
                            className='bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out cursor-pointer'
                            key={index}
                        >
                            <div className='relative'>
                                <img
                                    className='w-full h-48 object-cover'
                                    src={item.image}
                                    alt={item.name}
                                />
                                <div
                                    className={`absolute top-2 right-2 flex items-center gap-2 text-xs px-2 py-1 rounded-full ${
                                        item.available
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-200 text-gray-700'
                                    }`}
                                >
                                    <span
                                        className={`w-2 h-2 rounded-full ${
                                            item.available ? 'bg-green-500' : 'bg-gray-500'
                                        }`}
                                    ></span>
                                    {item.available ? 'Available' : 'Not Available'}
                                </div>
                            </div>
                            <div className='p-4'>
                                <p className='text-xl font-semibold text-gray-800  mb-1'>
                                    {item.name}
                                </p>
                                <p className='text-md text-gray-600'>{item.speciality}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='text-center mt-12'>
                    <button
                        onClick={() => {
                            navigate('/doctors');
                            window.scrollTo(0, 0);
                        }}
                        className='bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300'
                    >
                        View All Doctors
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TopDoctors;
