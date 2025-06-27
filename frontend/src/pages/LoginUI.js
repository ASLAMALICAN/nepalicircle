import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export default function LoginUI() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
<<<<<<< HEAD
      const response = await fetch('https://connectingnepali.onrender.com/api/auth/login', {
=======
      const response = await fetch('http://localhost:5000/api/auth/login', {
>>>>>>> df7abcf3 (new file added)
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Save token and user info
      localStorage.setItem('token', data.token);
      localStorage.setItem('googleUser', JSON.stringify(data.user));

      navigate('/');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    localStorage.setItem('token', credentialResponse.credential);
    localStorage.setItem('googleUser', JSON.stringify(decoded));
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded shadow max-w-md w-full space-y-6">
        <h2 className="text-2xl font-bold text-center">Login to Your Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="text-center text-sm text-gray-500">or</div>

        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => alert('Google Login Failed')}
        />

        <div className="text-sm text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-600 underline">Register</a>
        </div>
      </div>
    </div>
  );
}
