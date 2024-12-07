import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import Input from '../../components/base/Input';
import { ArrowLeft, Loader, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import ErrorThrower from '../../components/base/ErrorThrower';
import { BorderBeam } from '../../components/framer-motion/ui/BorderBeam';
import ShinyButton from '../../components/framer-motion/animations/ShinyButton';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isLoading, forgotPassword, error } = useAuthStore();

  const handleSubmit = async e => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
  };

  return (
    <div className="rounded-2xl max-w-xl w-[95%] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=" bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-t-2xl shadow-xl overflow-hidden"
      >
        <div className=" w-full bg-plain-black-background dark:bg-plain-black-background bg-opacity-50 glass-panel rounded-none shadow-glow-secondary dark:shadow-glow-secondary overflow-hidden">
          <div className="lg:p-8 p-5">
            <BorderBeam
              colorFrom="#efefef"
              size={10000}
              borderWidth={15}
              className={'shadow-glow-primary'}
              duration={22}
              delay={18}
            />
            <h2 className="lg:text-3xl text-2xl text-center text-nowrap font-bold text-white dark:text-white">
              Forgot Your Password?
            </h2>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit}>
                <p className="text-gray-300 mb-6 text-center">
                  Enter your email address and we'll send you a link to reset
                  your password.
                </p>
                <Input
                  icon={Mail}
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  autoFocus
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                {error && <ErrorThrower error={error} />}
                <ShinyButton
                  classNames={isLoading ? 'rounded-full' : 'rounded-md'}
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                  >
                    {isLoading ? (
                      <Loader className="size-6 animate-spin mx-auto" />
                    ) : (
                      'Send Reset Link'
                    )}
                  </motion.button>
                </ShinyButton>
              </form>
            ) : (
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="w-16 h-16 bg-dark-primary dark:bg-cyber-purple rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Mail className="h-8 w-8 text-white" />
                </motion.div>
                <p className="text-gray-300 mb-6">
                  If an account exists for {email}, you will receive a password
                  reset link shortly.
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 border-b-[1px] rounded-b-2xl flex-center">
        <Link
          to={'/login'}
          className="text-sm text-primary duration-slow dark:text-primary-dark hover:underline flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
        </Link>
      </div>
    </div>
  );
};
export default ForgotPasswordPage;

// import { motion } from 'framer-motion';
// import { useState } from 'react';
// import { useAuthStore } from '../../store/authStore';
// import Input from '../../components/base/Input';
// import { ArrowLeft, Loader, Mail } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import ErrorThrower from '../../components/base/ErrorThrower';

// const ForgotPasswordPage = () => {
//   const [email, setEmail] = useState('');
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const { isLoading, forgotPassword, error } = useAuthStore();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await forgotPassword(email);
//     setIsSubmitted(true);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
//     >
//       <div className='p-8'>
//         <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
//           Forgot Password
//         </h2>

//         {!isSubmitted ? (
//           <form onSubmit={handleSubmit}>
//             <p className='text-gray-300 mb-6 text-center'>
//               Enter your email address and we'll send you a link to reset your
//               password.
//             </p>
//             <Input
//               icon={Mail}
//               type='email'
//               placeholder='Email Address'
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             {error && <ErrorThrower error={error} />}
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
//               type='submit'
//             >
//               {isLoading ? (
//                 <Loader className='size-6 animate-spin mx-auto' />
//               ) : (
//                 'Send Reset Link'
//               )}
//             </motion.button>
//           </form>
//         ) : (
//           <div className='text-center'>
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ type: 'spring', stiffness: 500, damping: 30 }}
//               className='w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4'
//             >
//               <Mail className='h-8 w-8 text-white' />
//             </motion.div>
//             <p className='text-gray-300 mb-6'>
//               If an account exists for {email}, you will receive a password
//               reset link shortly.
//             </p>
//           </div>
//         )}
//       </div>

//       <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
//         <Link
//           to={'/login'}
//           className='text-sm text-green-400 hover:underline flex items-center'
//         >
//           <ArrowLeft className='h-4 w-4 mr-2' /> Back to Login
//         </Link>
//       </div>
//     </motion.div>
//   );
// };
// export default ForgotPasswordPage;
