// src/layouts/UserLayout.js
import React, { useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/global/Navbar';

import { useAuthStore } from '../store/authStore';

const UserLayout = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="bg-gray-100">
      <div>
        {isAuthenticated && <Navbar isAuthenticated={isAuthenticated} />}
      </div>
      <main className="relative container mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
