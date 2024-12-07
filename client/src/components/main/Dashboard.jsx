// src/components/main/Dashboard.jsx
import React, { useEffect } from 'react';
import Charts from './Charts';
import { useCheckinStore } from '../../store/checkinStore';

const Dashboard = () => {
  const { getAllCheckIns, checkins, isLoading } = useCheckinStore();
  console.log('checkins: ', checkins);
  useEffect(() => {
    getAllCheckIns();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-[28rem] mx-auto p-6 bg-white rounded-lg shadow-md">
        {/* Skeleton Title */}
        <div className="h-8 bg-gray-300 rounded-md animate-pulse mb-4 w-1/3 mx-auto"></div>
        {/* Skeleton Chart Placeholder */}
        <div className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  return (
    <div>
      <Charts checkins={checkins} />
    </div>
  );
};

export default Dashboard;
