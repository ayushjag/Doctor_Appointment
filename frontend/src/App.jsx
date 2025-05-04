import React, { useState, useEffect } from 'react'; // Add useEffect import
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import Appointment from './pages/Appointment';
import MyAppointments from './pages/MyAppointments';
import MyProfile from './pages/MyProfile';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify';
import Preloader from './components/Preloader';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time or wait for actual data (e.g., API call)
    const timer = setTimeout(() => setLoading(false), 2000); // Adjust the time as necessary
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Preloader />; // Show Preloader until data is ready

  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/verify' element={<Verify />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
