import React from 'react';
import { useLocation } from 'react-router-dom';

const VerifyResultPage = () => {
  const location = useLocation();

  let content = {
    title: 'Loading...',
    message: '',
    color: 'text-gray-500'
  };

  if (location.pathname.includes('success')) {
    content = {
      title: '✓ Email Verified',
      message: 'You can now log in to your account.',
      color: 'text-green-600'
    };
  } else if (location.pathname.includes('invalid')) {
    content = {
      title: '✘ Invalid or Expired Link',
      message: 'Please register again or request a new verification link.',
      color: 'text-red-600'
    };
  } else if (location.pathname.includes('error')) {
    content = {
      title: '⚠ Error verifying email',
      message: 'Something went wrong. Please try again later.',
      color: 'text-yellow-600'
    };
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
      <h1 className={`text-3xl font-bold ${content.color}`}>{content.title}</h1>
      <p className="mt-4 text-lg">{content.message}</p>
      {location.pathname.includes('success') && (
        <a href="/login-ui" className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded shadow">
          Go to Login
        </a>
      )}
    </div>
  );
};

export default VerifyResultPage;
