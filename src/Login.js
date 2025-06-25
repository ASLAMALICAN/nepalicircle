import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginUI() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      setMessage('');
      navigate('/dashboard');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#2B3C4E] flex flex-col justify-center items-center">
      <img src="/logo.png" alt="Logo" className="mb-6 w-12" />
      <div className="bg-white w-full max-w-md p-8 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Sign In</h2>
        {message && <p className="text-red-500 mb-4 text-sm">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} required className="w-full px-4 py-2 border rounded text-sm" />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required className="w-full px-4 py-2 border rounded text-sm" />
          <button type="submit" className="w-full bg-cyan-800 text-white py-2 rounded hover:bg-cyan-900">Login</button>
        </form>
      </div>
      <footer className="mt-8 text-white text-sm">
        <Link to="/" className="hover:underline">
          Don’t have an account? Register
        </Link>
      </footer>
    </div>
  );
}

