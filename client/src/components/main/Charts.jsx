import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Charts = ({ checkins = [] }) => {
  const moodData = Array.isArray(checkins)
    ? checkins.map(checkin => checkin.moodRating)
    : [];
  const labels = Array.isArray(checkins)
    ? checkins.map(checkin => new Date(checkin.date).toLocaleDateString())
    : [];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Mood',
        data: moodData,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        height: '100%',
      },
    ],
  };

  return (
    <div className="w-full sm:h-[28rem]  mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
        Mood Trend
      </h2>
      <div className="relative w-full h-full">
        <Line data={data} className="rounded-lg" />
      </div>
    </div>
  );
};

export default Charts;
