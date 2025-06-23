const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');

// ✅ Constants
const CLIENT_URL = 'http://localhost:3000'; // Change for production

// ✅ Generate referral code
const generateReferralCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

// ✅ Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ✅ REGISTER Route
router.post('/register', async (req, res) => {
  const { name, email, password, referredBy, dob, visaStatus } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const referrer = referredBy ? await User.findOne({ referralCode: referredBy }) : null;

    const user = new User({
      name,
      email,
      password: hashed,
      dob,
      visaStatus,
      referralCode: generateReferralCode(),
      referredBy: referrer ? referrer._id : null,
      rewardPoints: referrer ? 100 : 0,
      isVerified: false,
      verificationToken,
      verificationTokenCreatedAt: Date.now()
    });

    await user.save();

    if (referrer) {
      referrer.rewardPoints += 100;
      await referrer.save();
    }

    const verifyUrl = `${CLIENT_URL}/verify-email/${verificationToken}`;
    await transporter.sendMail({
      from: 'Connecting Nepali <noreply@connectingnepali.com>',
      to: email,
      subject: 'Verify your Email',
      html: `<p>Click to verify your email: <a href="${verifyUrl}">${verifyUrl}</a></p>`
    });

    console.log('✅ Verification token:', verificationToken);
    res.status(200).json({ message: 'Verification email sent.' });

  } catch (err) {
    console.error('❌ Registration error:', err);
    res.status(500).json({ error: 'Registration failed' });
  }
});
// 🔐 LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    if (!user.isVerified) return res.status(400).json({ error: 'Email not verified' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Incorrect password' });

    // Token generation (basic, replace with JWT in production)
    const token = `mock-token-${user._id}`;

    res.status(200).json({ token, user: { name: user.name, email: user.email } });

  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// ✅ Export the router
module.exports = router;
