import React, { useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://nepalicircle-backend.onrender.com/api/auth/reset-password', { token, password });
      setMessage('✅ Password reset successful. You can now log in.');
    } catch (err) {
      setMessage(err.response?.data?.error || '❌ Failed to reset password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleReset} className="bg-white p-6 shadow-md rounded w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Reset Your Password</h2>
        {message && <p className="mb-4 text-center text-red-500">{message}</p>}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
          className="mb-4 w-full px-3 py-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Set New Password
        </button>
      </form>
    </div>
  );
}
