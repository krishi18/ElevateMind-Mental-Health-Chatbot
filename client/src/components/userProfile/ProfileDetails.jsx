/* eslint-disable react/display-name */
import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Edit, SquareUser, PenTool } from 'lucide-react';
import OptimizedImage from '../base/OptimizedImage';

const ProfileDetails = memo(({ user }) => {
  console.log('user: ', user);
  return (
    <div className="space-y-3 overflow-x-hidden">
      {user.profileImage && (
        <motion.div
          className="mb-0 flex-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* <img
            src={user.profileImage}
            alt={user.username}
            className="w-48 h-48 aspect-square rounded object-cover shadow-2xl"
          /> */}
          <OptimizedImage
            src={user.profileImage}
            alt={user.username}
            className="w-48 h-48 aspect-square rounded object-cover shadow-2xl"
          />
        </motion.div>
      )}

      {user.name && (
        <motion.div
          className="flex items-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <SquareUser className="text-primary" />
          <span className="font-semibold text-lg">Name:</span>
          <span className="text-gray-100">{user.name}</span>
        </motion.div>
      )}

      <motion.div
        className="flex items-center space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <User className="text-primary" />
        <span className="font-semibold text-lg">Username:</span>
        <span className="text-gray-100">{user.username}</span>
      </motion.div>

      {user.phoneNumber && (
        <motion.div
          className="flex items-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Phone className="text-primary" />
          <span className="font-semibold text-lg">Phone Number:</span>
          <span className="text-gray-100">{user.phoneNumber}</span>
        </motion.div>
      )}

      <motion.div
        className="flex items-center space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Mail className="text-primary" />
        <span className="font-semibold text-lg">Email:</span>
        <span className="text-gray-100 text-wrap overflow-hidden">{user.email}</span>
      </motion.div>

      {user.bio && (
        <motion.div
          className="flex items-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <PenTool className="text-primary" />
          <span className="font-semibold text-lg">Bio:</span>
          <span className="text-gray-100">{user.bio}</span>
        </motion.div>
      )}
    </div>
  );
});

export default ProfileDetails;

// import React, { memo } from 'react';

// const ProfileDetails = memo(({ user }) => {
//   return (
//     <div className="bg-white p-6 rounded-lg shadow">
//       <h2 className="text-xl font-semibold mb-4">Profile Information</h2>

//       {user.profileImage && (
//         <div className="mb-2">
//           <img
//             src={user.profileImage}
//             alt={user.username}
//             className="w-40 h-40 rounded object-cover"
//           />
//         </div>
//       )}
//       <div className="mb-2">
//         <span className="font-semibold">Username:</span> {user.username}
//       </div>
//       <div className="mb-2">
//         <span className="font-semibold">Email:</span> {user.email}
//       </div>
//       {user.name && (
//         <div className="mb-2">
//           <span className="font-semibold">Name:</span> {user.name}
//         </div>
//       )}
//       {user.bio && (
//         <div className="mb-2">
//           <span className="font-semibold">Bio:</span> {user.bio}
//         </div>
//       )}
//       {user.phoneNumber && (
//         <div className="mb-2">
//           <span className="font-semibold">Phone Number:</span>{' '}
//           {user.phoneNumber}
//         </div>
//       )}
//     </div>
//   );
// });

// export default ProfileDetails;
