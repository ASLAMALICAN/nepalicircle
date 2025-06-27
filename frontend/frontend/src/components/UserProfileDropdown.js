import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfileModal from './UserProfileModal';

const UserProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('googleUser'));
  const [profilePic, setProfilePic] = useState(
    user?.profilePic || user?.picture || '/default-avatar.png'
  );

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profilePic', file);

    try {
      const userId = user?._id;
      if (!userId) return alert('User ID missing.');

      const res = await fetch(`http://localhost:5000/api/upload/profile-pic/${userId}`, {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (data.success) {
        const updatedUser = data.user;
        setProfilePic(updatedUser.profilePic);
        localStorage.setItem('googleUser', JSON.stringify(updatedUser));
      } else {
        alert('Upload failed');
      }
    } catch (err) {
      alert('Error uploading image.');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login-ui');
  };

  return (
    <div className="relative inline-block text-left">
      {/* Avatar Trigger */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-100 rounded-full"
      >
        <img
          src={profilePic}
          alt="Profile"
          className="w-12 h-12 rounded-full border object-cover shadow"
          onError={(e) => {
            if (e.target.src !== '/default-avatar.png') {
              e.target.src = '/default-avatar.png';
            }
          }}
        />
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white border rounded-md shadow-lg z-50">
          <div className="px-4 py-3 border-b">
            <p className="text-sm font-semibold">{user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
          <ul className="py-1">
            <li>
              <button
                onClick={() => fileInputRef.current.click()}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Upload New Picture
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleUpload}
                accept="image/*"
                className="hidden"
              />
            </li>
            <li>
              <button
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => setShowModal(true)}
              >
                View Profile
              </button>
            </li>
            <li>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Modal */}
      <UserProfileModal isOpen={showModal} onClose={() => setShowModal(false)} user={user} />
    </div>
  );
};

export default UserProfileDropdown;
