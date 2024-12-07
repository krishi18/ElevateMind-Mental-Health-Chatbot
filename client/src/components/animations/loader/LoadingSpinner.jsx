// src/components/LoadingSpinner.jsx
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { robotLoader } from '../../../assets/lottieFiles';
import React, { useMemo } from 'react';

const MemoizedLottie = React.memo(Lottie);
const MemoizedMotionDiv = React.memo(motion.div);

const LoadingSpinner = () => {
  // Memoize motion props to prevent unnecessary re-renders
  const motionDivProps = useMemo(
    () => ({
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0, rotate: [0, 5, -5, 0] },
      transition: {
        duration: 1.5,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop',
      },
    }),
    []
  );

  const motionTextProps = useMemo(
    () => ({
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: {
        delay: 0,
        duration: 1.5,
        repeat: Infinity,
        repeatType: 'mirror',
      },
    }),
    []
  );

  return (
    <div className="flex-center flex-col w-full h-screen bg-dark-background overflow-hidden text-white">
      {/* Lottie Animation with Rotation Effect */}
      <MemoizedMotionDiv {...motionDivProps} className="w-1/2 max-w-xs">
        <MemoizedLottie
          animationData={robotLoader}
          loop
          className="w-full h-full"
        />
      </MemoizedMotionDiv>

      {/* Loading Text with Typing Effect */}
      <motion.div
        {...motionTextProps}
        className="mt-6 text-lg container mx-auto font-semibold text-center tracking-wide"
      >
        <span className="text-shadow tracking-widest">
          Hang tight! Setting things up just for you...
          <br /> Quiet, please!
        </span>
      </motion.div>
    </div>
  );
};

export default React.memo(LoadingSpinner);

// // src/components/LoadingSpinner.jsx
// import { motion } from 'framer-motion';
// import Lottie from 'lottie-react';
// import { robotLoader } from '../../../assets/lottieFiles';

// const LoadingSpinner = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-dark-background overflow-hidden text-white">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: 'easeOut' }}
//         className="w-1/2 max-w-xs"
//       >
//         <Lottie animationData={robotLoader} loop={true} className="w-full h-full" />
//       </motion.div>

//       {/* Loading text with animation */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.5, duration: 1.5, repeat: Infinity, repeatType: 'mirror' }}
//         className="mt-6 h4 font-semibold"
//       >
//         "Hang tight! We're setting things up just for you..."
//       </motion.div>
//     </div>
//   );
// };

// export default LoadingSpinner;

// import { motion } from 'framer-motion';

// const LoadingSpinner = () => {
//   return (
//     <>
//       {/* Simple Loading Spinner */}
//       <motion.div
//         className='w-16 h-16 border-4 border-t-4 border-t-green-500 border-green-200 rounded-full'
//         animate={{ rotate: 360 }}
//         transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
//       />
//     </>
//   );
// };

// export default LoadingSpinner;
