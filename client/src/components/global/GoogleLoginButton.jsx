import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from '../../services/axiosInstance';
import toast from 'react-hot-toast';

const GoogleButtons = ({ chooseBtn = 'login' }) => {
  const handleGoogleLogin = async response => {
    try {
      const token = response.credential;
      const res = await axios.post('/auth/google', { token, action: 'login' });
      toast.success(res.data.message || 'Logged in successfully');
      localStorage.setItem('authToken', res.data.token);
      window.location.href = '/';
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.error('Internal server error:', error);
        toast.error(
          'An error occurred while authenticating with Google. Please try again later.'
        );
      } else {
        console.debug('Error authenticating with Google:', error);
        toast.error(error.response.data.message || 'Login failed');
      }
      console.error('Google login failed:', error);
    }
  };

  const handleGoogleSignup = async response => {
    try {
      const token = response.credential;
      const res = await axios.post('/auth/google', { token, action: 'signup' });
      toast.success(res.data.message || 'Signed up successfully');
      localStorage.setItem('authToken', res.data.token);
      window.location.href = '/';
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.error('Internal server error:', error);
        toast.error(
          'An error occurred while authenticating with Google. Please try again later.'
        );
      } else {
        console.debug('Error authenticating with Google:', error);
        toast.error(error.response.data.message || 'Signup failed');
      }
      console.error('Google signup failed:', error);
    }
  };

  return (
    <>
      {chooseBtn === 'login' ? (
        <GoogleLogin
          auto_select
          shape="rectangular"
          type="standard"
          useOneTap
          width="100%"
          text="signin_with"
          theme="filled_blue"
          onSuccess={handleGoogleLogin}
          onError={handleGoogleLogin}
        />
      ) : (
        <GoogleLogin
          auto_select
          shape="rectangular"
          type="standard"
          width="100%"
          useOneTap
          text="signup_with"
          theme="filled_blue"
          onSuccess={handleGoogleSignup}
          onError={handleGoogleSignup}
        />
      )}
    </>
  );
};

export default GoogleButtons;
