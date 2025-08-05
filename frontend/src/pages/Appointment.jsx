import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import RelatedDoctors from '../components/RelatedDoctors';
import axios from 'axios';
import { toast } from 'react-toastify';

// A simple loading spinner component
const LoadingSpinner = () => (
    <div className='flex justify-center items-center min-h-[60vh]'>
        <div className='w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-600'></div>
    </div>
);

// A verified badge icon
const VerifiedIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 text-blue-500"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
        />
    </svg>
);


const Appointment = () => {
    const { docId } = useParams();
    const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext);
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const [docInfo, setDocInfo] = useState(null);
    const [docSlots, setDocSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchDocInfo = () => {
            const info = doctors.find((doc) => doc._id === docId);
            setDocInfo(info);
        };

        if (doctors.length > 0) {
            fetchDocInfo();
        }
    }, [doctors, docId]);

    useEffect(() => {
        const getAvailableSolts = () => {
            if (!docInfo) return;

            setDocSlots([]);
            setSlotTime(''); // Reset selected time when doctor info changes

            let today = new Date();
            let allSlots = [];

            for (let i = 0; i < 7; i++) {
                let currentDate = new Date(today);
                currentDate.setDate(today.getDate() + i);

                let endTime = new Date(currentDate);
                endTime.setHours(21, 0, 0, 0);

                if (today.getDate() === currentDate.getDate()) {
                    currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
                    currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
                } else {
                    currentDate.setHours(10, 0, 0, 0);
                }

                let timeSlots = [];
                while (currentDate < endTime) {
                    const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    const slotDateKey = `${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`;
                    
                    const isBooked = docInfo.slots_booked[slotDateKey]?.includes(formattedTime);

                    if (!isBooked) {
                        timeSlots.push({
                            datetime: new Date(currentDate),
                            time: formattedTime,
                        });
                    }
                    currentDate.setMinutes(currentDate.getMinutes() + 30);
                }
                allSlots.push(timeSlots);
            }
            setDocSlots(allSlots);
        };

        if (docInfo) {
            getAvailableSolts();
        }
    }, [docInfo]);

    const handleDateSelect = (index) => {
        setSlotIndex(index);
        setSlotTime(''); // Reset time when a new date is selected
    };

    const bookAppointment = async () => {
        if (!slotTime) {
            toast.warning('Please select a time slot.');
            return;
        }
        if (!token) {
            toast.warning('Please login to book an appointment.');
            return navigate('/login');
        }

        const date = docSlots[slotIndex][0].datetime;
        const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;

        try {
            const { data } = await axios.post(`${backendUrl}/api/user/book-appointment`, { docId, slotDate, slotTime }, { headers: { token } });
            if (data.success) {
                toast.success(data.message);
                getDoctosData(); // Refresh doctor data globally
                navigate('/my-appointments');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred.');
            console.error(error);
        }
    };

    if (!docInfo) {
        return <LoadingSpinner />;
    }

    return (
        <div className="bg-gray-50">
            <div className="container mx-auto py-12 px-4">
                {/* Doctor Details Section */}
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                    <img className="w-full md:w-72 h-80 object-cover rounded-lg shadow-md" src={docInfo.image} alt={docInfo.name} />
                    <div className="flex-1 bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold text-gray-800">{docInfo.name}</h1>
                            <VerifiedIcon />
                        </div>
                        <div className="flex items-center gap-3 mt-2 text-gray-600">
                            <p>{docInfo.degree} - {docInfo.speciality}</p>
                            <span className="py-1 px-3 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">{docInfo.experience}</span>
                        </div>
                        <div className="mt-4">
                            <h2 className="text-lg font-semibold text-gray-800">About</h2>
                            <p className="text-sm text-gray-600 mt-1">{docInfo.about}</p>
                        </div>
                        <p className="text-gray-700 font-semibold mt-4">
                            Appointment Fee: <span className="text-green-600 text-lg">{currencySymbol}{docInfo.fees}</span>
                        </p>
                    </div>
                </div>

                {/* Booking Section */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-4">1. Select a Date</h3>
                        <div className="flex gap-4 overflow-x-auto pb-4">
                            {docSlots.map((item, index) => (
                                item.length > 0 && (
                                    <div
                                        onClick={() => handleDateSelect(index)}
                                        key={index}
                                        className={`flex-shrink-0 text-center py-3 px-5 rounded-lg cursor-pointer transition-all duration-300 ${
                                            slotIndex === index
                                                ? 'bg-blue-600 text-white shadow-lg'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                                        }`}
                                    >
                                        <p className="font-semibold">{daysOfWeek[item[0].datetime.getDay()]}</p>
                                        <p className="text-2xl font-bold">{item[0].datetime.getDate()}</p>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                    
                    <div className="mt-6">
                        <h3 className="font-semibold text-gray-800 mb-4">2. Available Time Slots</h3>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                            {docSlots[slotIndex]?.length > 0 ? docSlots[slotIndex].map((item, index) => (
                                <p
                                    onClick={() => setSlotTime(item.time)}
                                    key={index}
                                    className={`text-sm font-medium text-center px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 ${
                                        item.time === slotTime
                                            ? 'bg-blue-600 text-white shadow-lg'
                                            : 'bg-gray-100 text-blue-800 hover:bg-gray-200'
                                    }`}
                                >
                                    {item.time}
                                </p>
                            )) : <p className="text-gray-500 col-span-full">No available slots for this day.</p>}
                        </div>
                    </div>

                    <button
                        onClick={bookAppointment}
                        disabled={!slotTime}
                        className="w-full md:w-auto bg-blue-600 text-white font-semibold px-12 py-3 rounded-lg mt-8 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Book an Appointment
                    </button>
                </div>

                {/* Related Doctors Section */}
                <div className="mt-12">
                    <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
                </div>
            </div>
        </div>
    );
};

export default Appointment;
