import React from 'react'
import { motion } from 'framer-motion'; // Correctly import motion

const Preloader = () => {
    return (
        <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
          <motion.div
            className="w-16 h-16 border-4 border-blue-800 border-t-transparent rounded-full animate-spin"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
          />
          <p className="absolute top-[60%] text-blue-800 font-semibold text-lg animate-pulse">Loading...</p>
        </div>
      )
}

export default Preloader
