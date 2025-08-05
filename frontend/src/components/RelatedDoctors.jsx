import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const RelatedDoctors = ({ speciality, docId }) => {
    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);
    const [relDoc, setRelDoc] = useState([]);

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            // Filter for doctors with the same speciality but exclude the current one
            const relatedDoctorsData = doctors.filter(
                (doc) => doc.speciality === speciality && doc._id !== docId
            );
            setRelDoc(relatedDoctorsData);
        }
    }, [doctors, speciality, docId]);

    // --- Conditional Rendering: Only show the component if there are related doctors ---
    if (relDoc.length === 0) {
        return null;
    }

    return (
        <div className='bg-gray-50 py-16'>
            <div className='container mx-auto px-4'>
                {/* --- Section Header --- */}
                <div className='text-center mb-12'>
                    <h1 className='text-3xl font-bold text-gray-800'>
                        Related Doctors
                    </h1>
                    <p className='text-lg text-gray-600 mt-2'>
                        Here are other specialists you might be interested in.
                    </p>
                </div>

                {/* --- Grid of Related Doctor Cards --- */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
                    {relDoc.map((item) => (
                        <div
                            onClick={() => {
                                navigate(`/appointment/${item._id}`);
                                window.scrollTo(0, 0);
                            }}
                            className='bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out cursor-pointer group'
                            key={item._id}
                        >
                            <div className='relative'>
                                <img
                                    className='w-full h-56 object-cover'
                                    src={item.image}
                                    alt={item.name}
                                />
                                <div
                                    className={`absolute top-3 right-3 flex items-center gap-2 text-xs px-2 py-1 rounded-full ${
                                        item.available
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                    }`}
                                >
                                    <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                    {item.available ? 'Available' : 'Not Available'}
                                </div>
                            </div>
                            <div className='p-5'>
                                <p className='text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300'>
                                    {item.name}
                                </p>
                                <p className='text-md text-gray-600 mt-1'>{item.speciality}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RelatedDoctors;
