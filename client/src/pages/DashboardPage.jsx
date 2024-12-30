import React from 'react';
import Dashboard from '../components/main/Dashboard';
import CheckInForm from '../components/main/CheckInForm';
import CheckInTable from '../components/main/CheckInTable';
import Profile from '../components/main/Profile';
import ChatBOT from '../components/global/ChatBOT';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="flex-center">
        <div className="max-w-7xl w-full mx-auto py-6 sm:px-6 lg:px-8">
          <Profile />
          <div className="grid grid-cols-1 my-5 md:grid-cols-3 gap-4">
            <Dashboard />
            <CheckInForm />
            <ChatBOT />
          </div>
          <CheckInTable />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
