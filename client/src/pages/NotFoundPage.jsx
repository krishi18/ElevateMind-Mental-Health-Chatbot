import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const NotFoundPage = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className="bg-[#0A0B2E] h-screen w-screen overflow-hidden relative font-sans">
      {/* Stars */}
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-[2px] h-[2px] bg-white rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.7 + 0.3,
          }}
        />
      ))}

      <motion.div className="bg-svg inset-0 absolute rotate-[180deg] opacity-30" />
      <motion.div className="absolute inset-0 min-h-[110vh] bg-gradient-to-r from-black/70 via-transparent to-transparent z-10" />

      {/* Main Content */}
      <div className="absolute mt-[-2rem] inset-0 flex items-center justify-center">
        <div className="max-w-[1200px] w-full px-4 sm:px-6 lg:px-8">
          {/* 404 with Astronaut */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center mb-3"
            >
              <span className="text-white text-[190px] sm:text-[180px] lg:text-[280px] font-bold leading-none">
                4
              </span>
              <motion.div
                initial={{ y: 0 }}
                // animate={{ y: 20, rotate: [0, 360, 0] }}
                animate={{ y: [-10, 10, -10], rotate: [10, -20, 10] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: 'easeInOut',
                }}
                className="relative"
              >
                <span className="text-white text-[200px] sm:text-[180px] lg:text-[280px] font-bold leading-none">
                  0
                </span>
              </motion.div>
              <span className="text-white text-[190px] sm:text-[180px] lg:text-[280px] font-bold leading-none">
                4
              </span>
            </motion.div>
          </div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white mt-[-20px] font-share-tech-mono sm:mt-[-30px] lg:mt-[-40px] relative z-10 max-w-[750px] mx-auto text-center px-4"
          >
            <h1 className="text-[32px] sm:text-[42px] lg:text-[52px] font-bold leading-[1] mb-6 sm:mb-2">
              Oops...
              <br />
              We can't find what
              <br />
              You are looking here!
              <br />
              <span className="text-purple-400 font-[900] underline">
                {currentPath.slice(1).length > 10
                  ? `${currentPath.slice(1, 8)}...`
                  : currentPath.slice(1)}
              </span>
            </h1>

            <p className="text-[#B4B4B4] text-base sm:text-lg lg:text-xl mb-6 lg:mb-2 leading-[1.5]">
              Go to the main page - there you can
              <br />
              also find a lot of useful information.
            </p>

            <motion.button
              whileHover={{ scale: 1.08, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              className="sm:px-8 px-6 py-1 sm:py-2 bg-purple-700/20 border-2 border-purple-500 text-purple-300 hover:bg-purple-600/50 hover:border-purple-400 hover:text-white transition-all duration-300 shadow-lg rounded-full relative group"
            >
              <span className="relative z-10 flex items-center justify-center">
                <Link to="/" className="font-black h6">
                  Back to Home
                </Link>
              </span>
              <div className="absolute inset-0 bg-purple-500/30 blur-sm group-hover:bg-purple-600/50 transition-all duration-300 rounded-full" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
