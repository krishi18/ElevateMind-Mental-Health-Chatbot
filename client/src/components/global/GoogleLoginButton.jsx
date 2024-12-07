import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from '../../services/axiosInstance';
import toast from 'react-hot-toast';

const GoogleButtons = ({ chooseBtn = 'login' }) => {
  const [loading, setLoading] = useState(false); 

  const handleGoogleLogin = async response => {
    setLoading(true);
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
        toast.error(error.response?.data?.message || 'Login failed');
      }
      console.error('Google login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async response => {
    setLoading(true);
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
        toast.error(error.response?.data?.message || 'Signup failed');
      }
      console.error('Google signup failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
      {loading && (
        <div style={styles.loadingOverlay}>
          <div style={styles.spinner}></div>
        </div>
      )}
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
    </div>
  );
};

const styles = {
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    borderRadius: '4px',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid rgba(0, 0, 0, 0.1)',
    borderTop: '4px solid #3498db',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};

export default GoogleButtons;
