const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const User = require('../models/User');

const router = express.Router();
const uploadDir = path.join(__dirname, '..', 'uploads');

// ✅ Ensure uploads folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ✅ Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('💾 Upload destination called');
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    const filename = `${Date.now()}.${ext}`;
    console.log(`📁 Saving file as: ${filename}`);
    cb(null, filename);
  }
});

// ✅ File type filter
const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/jpg', 'image/png'];
  console.log(`📎 File mimetype: ${file.mimetype}`);
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    console.log('❌ File rejected due to invalid type');
    cb(new Error('Only .jpg, .jpeg, and .png files are allowed'));
  }
};

// ✅ Multer middleware with limits
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter
});

// ✅ Upload route
router.post('/profile-pic/:userId', upload.single('profilePic'), async (req, res) => {
  try {
    if (!req.file) {
      console.log('❌ No file received');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const userId = req.params.userId;
    console.log(`🧑 User ID: ${userId}`);
    console.log(`📸 New file: ${req.file.filename}`);

    const newImageUrl = `https://nepalicircle-backend.onrender.com/uploads/${req.file.filename}`;

    const user = await User.findById(userId);
    if (!user) {
      console.log('❌ User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    // ✅ Delete old image if it's a local upload
    if (user.profilePic && user.profilePic.includes('/uploads/')) {
      const oldFileName = path.basename(user.profilePic);
      const oldFilePath = path.join(uploadDir, oldFileName);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
        console.log(`🗑️ Deleted old file: ${oldFileName}`);
      }
    }

    user.profilePic = newImageUrl;
    await user.save();
    console.log(`✅ Saved profilePic in DB: ${newImageUrl}`);

    // ✅ Return lean object to reflect updated fields
    const updatedUser = await User.findById(userId).lean();

    res.json({ success: true, user: updatedUser });
  } catch (err) {
    console.error('❌ Upload error:', err.message);
    res.status(500).json({ error: err.message || 'Upload failed' });
  }
});

module.exports = router;
