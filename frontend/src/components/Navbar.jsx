import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(false);
    navigate('/login');
  };

  return (
    <div className='flex items-center justify-between px-4 md:px-10 py-4 border-b border-gray-200 shadow-sm bg-white  top-0 z-50'>

      {/* Logo */}
      <img onClick={() => navigate('/')} className='w-28 cursor-pointer' src={assets.logo} alt="Logo" />

      {/* Desktop Menu */}
      <ul className='hidden md:flex items-center gap-6 font-medium text-gray-700'>
        {['/', '/doctors', '/about', '/contact'].map((path, idx) => (
          <NavLink
            key={idx}
            to={path}
            className={({ isActive }) =>
              `relative py-1 hover:text-blue-600 transition-colors duration-200 ${
                isActive ? 'text-blue-600' : ''
              }`
            }
          >
            <li>
              {path === '/' ? 'HOME' : path.replace('/', '').toUpperCase()}
              <span className='absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left'></span>
            </li>
          </NavLink>
        ))}
      </ul>

      {/* Right Side */}
      <div className='flex items-center gap-4'>

        {/* Auth Profile / Login */}
        {token && userData ? (
          <div className='relative group pb-3 cursor-pointer'>
            <div className='flex items-center gap-2'>
              <img className='w-8 h-8 rounded-full object-cover border' src={userData.image} alt="user" />
              <img className='w-3' src={assets.dropdown_icon} alt="dropdown" />
            </div>

            <div className='absolute right-0 mt-3  w-44 bg-white border rounded-md shadow-lg hidden group-hover:flex flex-col z-50'>
              <p onClick={() => navigate('/my-profile')} className='py-2 px-4 hover:bg-gray-100 cursor-pointer'>My Profile</p>
              <p onClick={() => navigate('/my-appointments')} className='py-2 px-4 hover:bg-gray-100 cursor-pointer'>My Appointments</p>
              <p onClick={logout} className='py-2 px-4 hover:bg-gray-100 cursor-pointer text-red-500'>Logout</p>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className='hidden md:block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-all'
          >
            Create account
          </button>
        )}

        {/* Hamburger Icon */}
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden cursor-pointer' src={assets.menu_icon} alt="menu" />
      </div>

      {/* ---- Mobile Menu ---- */}
      <div className={`fixed top-0 right-0 z-40 h-full bg-white shadow-lg transition-all duration-300 ${showMenu ? 'w-3/4 px-6 py-6' : 'w-0 overflow-hidden p-0'}`}>
        <div className='flex justify-between items-center mb-6'>
          <img src={assets.logo} className='w-28' alt="logo" />
          <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-6 cursor-pointer' alt="close" />
        </div>

        <ul className='flex flex-col gap-4 text-lg font-medium text-gray-700'>
          {['/', '/doctors', '/about', '/contact'].map((path, idx) => (
            <NavLink key={idx} to={path} onClick={() => setShowMenu(false)}>
              <p className='py-2 px-2 rounded hover:bg-gray-100'>
                {path === '/' ? 'HOME' : path.replace('/', '').toUpperCase()}
              </p>
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
