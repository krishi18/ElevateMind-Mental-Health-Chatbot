import React, { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { siteName } from '../../config/envConfig';
import { useAuthStore } from '../../store/authStore';
import ProfileDropdown from '../base/ProfileDropdown';

const Navbar = ({ isAuthenticated }) => {
  const { user, logout } = useAuthStore();

  // Logout handler
  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  return (
    <div className="sticky glass-panel p-0 top-0 left-0 right-0 z-50">
      <div className="w-full flex items-start justify-center py-4 px-4">
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          className="w-full max-w-7xl bg-plain-black-background/0 backdrop-blur-xl border border-neutral-600 rounded-2xl px-6 py-3.5 flex items-center justify-between lg:justify-between"
        >
          <div className="flex items-center gap-6">
            <div className="hidden"></div>
          </div>

          {/* Center Logo */}
          <div className="absolute left-1/2 block transform -translate-x-[65%] md:-translate-x-1/2">
            <span className="text-white text-2xl font-semibold font-jetbrains-mono text-shadow">
              <Link to="/">{siteName}</Link>
            </span>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Auth Button */}
            {isAuthenticated && (
              <>
                <ProfileDropdown user={user} handleLogout={handleLogout} />
              </>
            )}
          </div>
        </motion.nav>
      </div>
    </div>
  );
};

export default memo(Navbar);
