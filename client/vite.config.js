import { defineConfig } from 'vite';
import { config } from 'dotenv';
import react from '@vitejs/plugin-react';

// Load environment variables from .env file
config();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Log the current mode (development or production)
  console.log(`Current mode: ${mode}`);

  return {
    server: {
      // Set the port from env variable
      port: process.env.PORT || 5173,
    },
    plugins: [react()],
    // plugins: [MillionLint.vite()],

    envDir: './',
    define: {
      // Set process.env.NODE_ENV based on the mode
      'process.env.NODE_ENV': JSON.stringify(mode),
      // Expose other environment variables
      'process.env': {
        ...process.env,
      },
    },
  };
});
