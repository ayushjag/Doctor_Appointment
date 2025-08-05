import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets'; // Assuming you might have a login graphic

// A simple spinner for the loading button
const Spinner = () => (
    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
);

const Login = () => {
    const [state, setState] = useState('Login');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { backendUrl, token, setToken } = useContext(AppContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setLoading(true); // Start loading

        const url = state === 'Sign Up' 
            ? `${backendUrl}/api/user/register` 
            : `${backendUrl}/api/user/login`;
        
        const payload = state === 'Sign Up' 
            ? { name, email, password } 
            : { email, password };

        try {
            const { data } = await axios.post(url, payload);
            if (data.success) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                toast.success(`Welcome${state === 'Sign Up' ? ` ${name}` : ''}!`);
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred.');
            console.error(error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate]);

    return (
        <div className="min-h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl grid md:grid-cols-2 overflow-hidden">
                
                {/* --- Form Section --- */}
                <div className="p-8 md:p-12">
                    <form onSubmit={onSubmitHandler} className="flex flex-col gap-5">
                        <h1 className="text-3xl font-bold text-gray-800">{state}</h1>
                        <p className="text-gray-500">
                            {state === 'Sign Up' 
                                ? 'Create an account to get started.' 
                                : 'Welcome back! Please login to your account.'}
                        </p>

                        {state === 'Sign Up' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Full Name</label>
                                <input id="name" onChange={(e) => setName(e.target.value)} value={name} className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" type="text" required />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
                            <input id="email" onChange={(e) => setEmail(e.target.value)} value={email} className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" type="email" required />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
                            <input id="password" onChange={(e) => setPassword(e.target.value)} value={password} className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" type="password" required />
                        </div>
                        
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 my-2 rounded-lg text-base font-semibold hover:bg-blue-700 transition-all flex items-center justify-center disabled:bg-blue-400"
                        >
                            {loading ? <Spinner /> : (state === 'Sign Up' ? 'Create Account' : 'Login')}
                        </button>
                        
                        <p className="text-center text-sm text-gray-600">
                            {state === 'Sign Up'
                                ? <>Already have an account? <span onClick={() => setState('Login')} className="text-blue-600 font-semibold underline cursor-pointer">Login here</span></>
                                : <>Don't have an account? <span onClick={() => setState('Sign Up')} className="text-blue-600 font-semibold underline cursor-pointer">Sign up</span></>
                            }
                        </p>
                    </form>
                </div>

                {/* --- Image Section --- */}
                <div className="hidden md:block">
                    <img 
                        src={assets.login_image || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop'} 
                        alt="Doctor and patient" 
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
