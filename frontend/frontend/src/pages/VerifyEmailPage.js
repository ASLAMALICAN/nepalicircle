import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const VerifyEmailPage = () => {
  const { token } = useParams();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/verify-email/${token}`);
        setStatus(res.data.status);
      } catch (err) {
        if (err.response && err.response.data && err.response.data.status) {
          setStatus(err.response.data.status);
        } else {
          setStatus('error');
        }
      }
    };

    verify();
  }, [token]);

  return (
    <div className="text-center mt-20 text-lg">
      {status === 'loading' && <p>🔄 Verifying your email...</p>}
      {status === 'success' && <p className="text-green-600">✅ Your email has been verified successfully!</p>}
      {status === 'invalid' && <p className="text-red-600">❌ Invalid or broken verification link.</p>}
      {status === 'expired' && <p className="text-yellow-600">⚠️ This verification link has expired.</p>}
      {status === 'error' && <p className="text-red-600">❌ An error occurred. Please try again later.</p>}
    </div>
  );
};

export default VerifyEmailPage;
