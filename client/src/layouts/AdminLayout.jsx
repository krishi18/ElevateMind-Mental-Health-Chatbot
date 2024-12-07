import React, { useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/common/SideBar';

const AdminLayout = () => {
  return (
    <div className="flex bg-indigo-50 min-h-screen overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="relative flex-1 pt-16 max-w-7xl mx-auto p-4">
          <Outlet />
        </main>
        {/* Footer */}
      </div>
    </div>
  );
};

export default AdminLayout;
