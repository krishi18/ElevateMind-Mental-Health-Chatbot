import React, { useEffect } from 'react';
import { useCheckinStore } from '../../store/checkinStore';
import { formatDate } from '../../utils/date';

const CheckinTable = () => {
  const { checkins, getAllCheckIns, isLoading, error, deleteCheckIn } =
    useCheckinStore();

  useEffect(() => {
    getAllCheckIns();
  }, [getAllCheckIns]);

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full text-left text-gray-500 dark:text-gray-400">
        <thead className="hidden md:table-header-group text-xs uppercase text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Mood Rating
            </th>
            <th scope="col" className="px-6 py-3">
              Stress Level
            </th>
            <th scope="col" className="px-6 py-3">
              Journal Entry
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {checkins.length > 0 ? (
            checkins.map(checkin => (
              <tr
                key={checkin._id}
                className="md:table-row bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 flex flex-col md:flex-row md:items-center"
              >
                <td className="px-6 py-4 md:table-cell">
                  <span className="md:hidden font-bold">Date: </span>
                  {formatDate(checkin.date)}
                </td>
                <td className="px-6 py-4 md:table-cell">
                  <span className="md:hidden font-bold">Mood Rating: </span>
                  {checkin.moodRating}
                </td>
                <td className="px-6 py-4 md:table-cell">
                  <span className="md:hidden font-bold">Stress Level: </span>
                  {checkin.stressLevel}
                </td>
                <td className="px-6 py-4 md:table-cell">
                  <span className="md:hidden font-bold">Journal Entry: </span>
                  {checkin.journalEntry}
                </td>
                <td className="px-6 py-4 md:table-cell">
                  <button
                    onClick={() => deleteCheckIn(checkin._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full md:w-auto"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center">
                No check-ins found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
};

export default CheckinTable;
