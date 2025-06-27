// src/pages/AuthPage.js
import { useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const navigate = useNavigate();

  // ✅ Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleGoogleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);

    try {
      const res = await axios.post('https://connectingnepali.onrender.com/api/auth/google', {
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
      });

      console.log('Received token:', res.data.token); // Debugging
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('googleUser', JSON.stringify(res.data.user));

      // ✅ Small delay to ensure localStorage is written
      setTimeout(() => {
        navigate('/');
      }, 100);
    } catch (err) {
      console.error('Google Auth Error:', err);
      alert('Authentication failed. Try again.');
    }
  };

  return (
    <div className="text-center mt-10">
      <h2 className="text-xl font-bold mb-4">Sign up / Login with Google</h2>
      <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => alert('Google Login Failed')} />
    </div>
  );
};

export default AuthPage;
