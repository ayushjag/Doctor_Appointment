import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';

// List of available specialities for easier management
const specialityList = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist'
];

const Doctors = () => {
    const { speciality } = useParams();
    const { doctors } = useContext(AppContext);
    const navigate = useNavigate();

    const [filteredDoctors, setFilteredDoctors] = useState([]);

    useEffect(() => {
        // If a speciality is present in the URL, filter by it. Otherwise, show all doctors.
        if (speciality) {
            const filtered = doctors.filter(doc => doc.speciality === speciality);
            setFilteredDoctors(filtered);
        } else {
            setFilteredDoctors(doctors);
        }
    }, [doctors, speciality]);

    const handleFilterClick = (newSpeciality) => {
        // If the clicked speciality is already active, navigate to the general /doctors page to clear the filter.
        if (newSpeciality === speciality) {
            navigate('/doctors');
        } else {
            navigate(`/doctors/${newSpeciality}`);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-12">
                {/* --- PAGE HEADER --- */}
                <div className='text-center mb-12'>
                    <h1 className='text-4xl font-bold text-gray-800 mb-2'>
                        Our Specialists
                    </h1>
                    <p className='text-lg text-gray-600'>
                        Browse through our list of expert doctors.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* --- FILTERS SIDEBAR --- */}
                    <aside className="lg:w-1/4">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Specialities</h3>
                            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0">
                                {/* "All" Filter Button */}
                                <button
                                    onClick={() => navigate('/doctors')}
                                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium ${
                                        !speciality ? 'bg-blue-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    All
                                </button>
                                {/* Dynamic Filter Buttons */}
                                {specialityList.map(s => (
                                    <button
                                        key={s}
                                        onClick={() => handleFilterClick(s)}
                                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium whitespace-nowrap ${
                                            speciality === s ? 'bg-blue-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* --- DOCTORS LIST --- */}
                    <main className="flex-1">
                        {filteredDoctors.length > 0 ? (
                            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8'>
                                {filteredDoctors.map((item) => (
                                    <div
                                        onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0); }}
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
                                                    item.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
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
                        ) : (
                            // --- NO DOCTORS FOUND MESSAGE ---
                            <div className="flex flex-col items-center justify-center bg-white p-10 rounded-lg shadow-md h-full">
                                <h2 className="text-2xl font-semibold text-gray-700">No Doctors Found</h2>
                                <p className="text-gray-500 mt-2">
                                    There are no doctors available with the selected speciality.
                                </p>
                                <button onClick={() => navigate('/doctors')} className='mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors'>
                                    View All Doctors
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Doctors;
