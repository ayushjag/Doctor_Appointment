import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom'; // Assuming you use React Router for navigation

// --- Social Media Icons ---
// (No changes needed for the icon components themselves)
const FacebookIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
    </svg>
);

const TwitterIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
    </svg>
);

const InstagramIcon = () => (
     <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.316 1.363.364 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.316-2.427.364-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.316-1.363-.364-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363.316 2.427-.364C9.793 2.013 10.147 2 12.315 2zm-1.163 1.943h.001c-2.062 0-2.364.009-3.21.047-1.123.052-1.636.22-1.99.38-.432.196-.774.432-1.12.775a3.111 3.111 0 00-.775 1.12c-.16.354-.328.867-.38 1.99-.038.846-.047 1.148-.047 3.21s.009 2.364.047 3.21c.052 1.123.22 1.636.38 1.99.196.432.432.774.775 1.12a3.111 3.111 0 001.12.775c.354.16.867.328 1.99.38.846.038 1.148.047 3.21.047s2.364-.009 3.21-.047c1.123-.052 1.636-.22 1.99-.38.432-.196.774-.432 1.12-.775a3.111 3.111 0 00.775-1.12c.16-.354.328-.867.38-1.99.038-.846.047-1.148.047-3.21s-.009-2.364-.047-3.21c-.052-1.123-.22-1.636-.38-1.99-.196-.432-.432-.774-.775-1.12a3.111 3.111 0 00-1.12-.775c-.354-.16-.867-.328-1.99-.38-.846-.038-1.148-.047-3.21-.047z" clipRule="evenodd" />
        <path d="M12 6.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm-3.135 5.135a3.135 3.135 0 116.27 0 3.135 3.135 0 01-6.27 0zM16.88 7.11a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z" />
    </svg>
);


const Footer = () => {
  return (
    <footer className='bg-gray-50 text-gray-600 border-t border-gray-200'>
      <div className='container mx-auto px-6 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-12'>

          {/* --- Logo and Description --- */}
          <div className='md:col-span-1'>
            <img className='mb-5 w-40' src={assets.logo} alt="HealthLife Logo" />
            <p className='text-sm leading-relaxed'>
              Your one-stop solution for hassle-free doctor appointments. We bridge the gap between patients and healthcare providers.
            </p>
          </div>

          {/* --- Company Links --- */}
          <div>
            <p className='text-lg font-semibold text-gray-800 mb-4'>Company</p>
            <ul className='flex flex-col gap-3'>
              <li><Link to="/" className='hover:text-blue-600 transition-colors duration-300'>Home</Link></li>
              <li><Link to="/about" className='hover:text-blue-600 transition-colors duration-300'>About Us</Link></li>
              <li><Link to="/doctors" className='hover:text-blue-600 transition-colors duration-300'>Doctors</Link></li>
              <li><Link to="/contact" className='hover:text-blue-600 transition-colors duration-300'>Contact</Link></li>
            </ul>
          </div>

          {/* --- Get in Touch --- */}
          <div>
            <p className='text-lg font-semibold text-gray-800 mb-4'>Get in Touch</p>
            <ul className='flex flex-col gap-3'>
              <li>+1-212-456-7890</li>
              <li>contact@healthlife.com</li>
            </ul>
          </div>
          
          {/* --- Social Media --- */}
          <div>
            <p className='text-lg font-semibold text-gray-800 mb-4'>Follow Us</p>
            <div className='flex gap-4'>
                <a href="#" className='text-gray-500 hover:text-blue-600 transition-colors duration-300'><FacebookIcon /></a>
                <a href="#" className='text-gray-500 hover:text-blue-600 transition-colors duration-300'><TwitterIcon /></a>
                <a href="#" className='text-gray-500 hover:text-blue-600 transition-colors duration-300'><InstagramIcon /></a>
            </div>
          </div>

        </div>
      </div>

      {/* --- Bottom Bar --- */}
      <div className='border-t border-gray-200'>
        <div className='container mx-auto px-6 py-4'>
          <p className='text-sm text-center text-gray-500'>
            Copyright © {new Date().getFullYear()} HealthLife.com - All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
