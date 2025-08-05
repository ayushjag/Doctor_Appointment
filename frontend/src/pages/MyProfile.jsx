import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const MyProfile = () => {
    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext);

    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState(null);
    const [originalUserData, setOriginalUserData] = useState(null); // To store data for cancel functionality

    // When the user clicks "Edit", store the current state
    const handleEditClick = () => {
        setOriginalUserData(userData);
        setIsEdit(true);
    };

    // When the user clicks "Cancel", revert to the original state
    const handleCancelClick = () => {
        setUserData(originalUserData);
        setIsEdit(false);
        setImage(null); // Also clear any staged image change
    };

    // Function to update user profile data using API
    const updateUserProfileData = async () => {
        const formData = new FormData();
        formData.append('name', userData.name);
        formData.append('phone', userData.phone);
        formData.append('address', JSON.stringify(userData.address));
        formData.append('gender', userData.gender);
        formData.append('dob', userData.dob);
        if (image) {
            formData.append('image', image);
        }

        try {
            const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, { headers: { token } });
            if (data.success) {
                toast.success(data.message);
                await loadUserProfileData(); // Reload fresh data from backend
                setIsEdit(false);
                setImage(null);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred.');
            console.error(error);
        }
    };

    // Loading state
    if (!userData) {
        return (
            <div className='flex justify-center items-center min-h-[60vh]'>
                <div className='w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-600'></div>
            </div>
        );
    }
    
    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* --- HEADER WITH ACTION BUTTONS --- */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
                    <div>
                        {isEdit ? (
                            <div className="flex gap-4">
                                <button onClick={handleCancelClick} className="px-6 py-2 rounded-full text-sm font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all">
                                    Cancel
                                </button>
                                <button onClick={updateUserProfileData} className="px-6 py-2 rounded-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all">
                                    Save Changes
                                </button>
                            </div>
                        ) : (
                            <button onClick={handleEditClick} className="px-6 py-2 rounded-full text-sm font-semibold text-white bg-gray-800 hover:bg-black transition-all">
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>

                {/* --- MAIN PROFILE CARD --- */}
                <div className="bg-white p-8 rounded-lg shadow-md">
                    {/* --- Profile Picture and Name Section --- */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-8 border-b">
                        <div className="relative">
                            <img 
                                className='w-32 h-32 rounded-full object-cover border-4 border-white shadow-sm' 
                                src={image ? URL.createObjectURL(image) : userData.image} 
                                alt="Profile" 
                            />
                            {isEdit && (
                                <label htmlFor="image" className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer text-white text-sm font-semibold opacity-0 hover:opacity-100 transition-opacity">
                                    Change
                                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden accept="image/*" />
                                </label>
                            )}
                        </div>
                        <div className="text-center sm:text-left">
                            {isEdit ? (
                                <input className='w-full text-3xl font-bold text-gray-800 bg-gray-100 border border-gray-300 rounded-lg px-3 py-1' type="text" onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} value={userData.name} />
                            ) : (
                                <h2 className="text-3xl font-bold text-gray-800">{userData.name}</h2>
                            )}
                            <p className="text-gray-500 mt-1">{userData.email}</p>
                        </div>
                    </div>
                    
                    {/* --- DETAILS SECTION --- */}
                    <div className="space-y-6">
                        {/* --- Contact Information --- */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">Contact Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InfoField label="Phone Number" value={userData.phone} isEdit={isEdit} onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
                                <InfoField label="Address Line 1" value={userData.address.line1} isEdit={isEdit} onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} />
                                <InfoField label="Address Line 2" value={userData.address.line2} isEdit={isEdit} onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} />
                            </div>
                        </div>
                         {/* --- Basic Information --- */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">Basic Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InfoField label="Birthday" type="date" value={userData.dob} isEdit={isEdit} onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} />
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Gender</label>
                                    {isEdit ? (
                                        <select className='w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 transition' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
                                            <option value="Not Selected">Select...</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    ) : (
                                        <p className="text-gray-800">{userData.gender || 'Not specified'}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- Helper component for displaying info fields ---
const InfoField = ({ label, value, isEdit, onChange, type = 'text' }) => (
    <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
        {isEdit ? (
            <input 
                type={type} 
                value={value || ''} 
                onChange={onChange} 
                className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
        ) : (
            <p className="text-gray-800">{value || 'Not specified'}</p>
        )}
    </div>
);


export default MyProfile;
