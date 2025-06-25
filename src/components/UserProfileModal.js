import React from 'react';

const UserProfileModal = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white w-full max-w-md mx-4 p-6 rounded-2xl shadow-xl relative">
        {/* ❌ Close Button */}
        <button
          className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-red-600"
          onClick={onClose}
        >
          &times;
        </button>

        {/* 👤 Header */}
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">👤 Your Profile</h2>

        {/* ✅ Profile Details */}
        <div className="space-y-3 text-gray-700 text-[15px]">
          <p><strong>Full Name:</strong> {user?.name || 'N/A'}</p>
          <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
          <p><strong>Date of Birth:</strong> {user?.dob ? new Date(user.dob).toLocaleDateString() : 'N/A'}</p>
          <p><strong>Visa Status:</strong> {user?.visaStatus || 'N/A'}</p>
          <p><strong>Referral Code:</strong> {user?.referralCode || 'N/A'}</p>
          <p><strong>Reward Points:</strong> {user?.rewardPoints ?? 0}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
