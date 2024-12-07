// src/store/checkinStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { responseHandler, errorHandler } from '../utils/responseHandler';
import { apiUrl } from '../config/envConfig';
import toast from 'react-hot-toast';

// Set the API URL with a fallback for local development
const API_URL = apiUrl || 'http://localhost:5000/api';

// Enable Axios to include cookies with requests
axios.defaults.withCredentials = true;

// Zustand Store
export const useCheckinStore = create(
  persist(
    set => ({
      checkins: [], // List of check-ins
      isLoading: false, // Loading state
      error: null, // Error messages
      message: null, // Success messages

      // Reset state utility
      resetState: () => set({ error: null, message: null }),

      // Create a new check-in
      createCheckIn: async checkinData => {
        set({ isLoading: true });
        try {
          const response = await axios.post(`${API_URL}/check-in`, checkinData);
          responseHandler(response, set, 'checkins');
        } catch (error) {
          console.error('error: ', error);
          errorHandler(error, set);
        } finally {
          set({ isLoading: false });
        }
      },

      // Get all check-ins
      getAllCheckIns: async () => {
        set({ isLoading: true });
        try {
          const response = await axios.get(`${API_URL}/check-in`);
          responseHandler(response, set, 'checkins');
        } catch (error) {
          errorHandler(error, set);
          toast.error('Failed to fetch check-ins');
        } finally {
          set({ isLoading: false });
        }
      },

      // Delete a check-in by ID
      deleteCheckIn: async id => {
        set({ isLoading: true });
        try {
          await axios.delete(`${API_URL}/check-in/${id}`);
          set({ message: 'Check-in deleted successfully' });

          // Fetch updated check-ins after deletion
          const response = await axios.get(`${API_URL}/check-in`);
          responseHandler(response, set, 'checkins');

          toast.success('Check-in deleted successfully');
        } catch (error) {
          console.error('error: ', error);
          errorHandler(error, set);
          toast.error('Failed to delete check-in');
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'checkin', // Persistent store name
      getStorage: () => localStorage, // Use localStorage for persistence
    }
  )
);
