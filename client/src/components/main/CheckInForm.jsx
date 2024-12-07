// src/components/main/CheckInForm.jsx
import React, { useState } from 'react';
import { useCheckinStore } from '../../store/checkinStore';
import { toast } from 'react-hot-toast';

const CheckInForm = () => {
  const [moodRating, setMoodRating] = useState(5);
  const [stressLevel, setStressLevel] = useState('Medium');
  const [journalEntry, setJournalEntry] = useState('');
  const { createCheckIn, isLoading, getAllCheckIns } = useCheckinStore();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await createCheckIn({ moodRating, stressLevel, journalEntry });
      setMoodRating(5);
      setStressLevel('Medium');
      setJournalEntry('');
      await getAllCheckIns();
      
      toast.success('Check-in created successfully');
    } catch (err) {
      toast.error(err.message || 'Something went wrong. Please try again.');
      console.error('Error creating check-in:', err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md w-full mx-auto"
    >
      {/* Mood Rating */}
      <div>
        <label
          htmlFor="moodRating"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Mood Rating (1-10):
        </label>
        <input
          type="range"
          id="moodRating"
          min="1"
          max="10"
          value={moodRating}
          onChange={e => setMoodRating(parseInt(e.target.value, 10))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        <span className="block mt-2 text-sm text-gray-500">
          Current: {moodRating}
        </span>
      </div>

      {/* Stress Level */}
      <div>
        <label
          htmlFor="stressLevel"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Stress Level:
        </label>
        <select
          id="stressLevel"
          value={stressLevel}
          onChange={e => setStressLevel(e.target.value)}
          className="block w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* Journal Entry */}
      <div>
        <label
          htmlFor="journalEntry"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Journal Entry:
        </label>
        <textarea
          id="journalEntry"
          value={journalEntry}
          onChange={e => setJournalEntry(e.target.value)}
          rows="4"
          className="block w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Write your thoughts here..."
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg ${
          isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
        }`}
      >
        {isLoading ? 'Saving...' : 'Save Check-in'}
      </button>
    </form>
  );
};

export default CheckInForm;
