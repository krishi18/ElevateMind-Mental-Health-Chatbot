import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { responseHandler, errorHandler } from '../utils/responseHandler';
import { apiUrl } from '../config/envConfig';
import toast from 'react-hot-toast';

const API_URL = apiUrl || 'http://localhost:5000/api';

axios.defaults.withCredentials = true;

export const useCheckinStore = create(
  persist(
    set => ({
      checkins: [],
      isLoading: false, 
      error: null,
      message: null, 

      resetState: () => set({ error: null, message: null }),

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

      getAllCheckIns: async () => {
        set({ isLoading: true });
        try {
          const response = await axios.get(`${API_URL}/check-in`);
          responseHandler(response, set, 'checkins');
        } catch (error) {
          errorHandler(error, set);
        } finally {
          set({ isLoading: false });
        }
      },

      deleteCheckIn: async id => {
        set({ isLoading: true });
        try {
          await axios.delete(`${API_URL}/check-in/${id}`);
          set({ message: 'Check-in deleted successfully' });

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
      name: 'checkin',
      getStorage: () => localStorage,
    }
  )
);
