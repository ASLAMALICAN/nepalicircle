// src/components/LoginStatus.js
import React, { useEffect, useState } from 'react';

const LoginStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // true if token exists
  }, []);

  return (
    <div className="text-center mt-4 text-lg font-semibold">
      {isLoggedIn ? (
        <p className="text-green-600">✅ You are logged in</p>
      ) : (
        <p className="text-red-600">❌ You are not logged in</p>
      )}
    </div>
  );
};

export default LoginStatus;
