const mongoose = require('mongoose');

// Optional: clear duplicate model issues in dev
delete mongoose.connection.models['User'];

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  picture: { type: String },

  // NEW FIELDS
  dob: { type: Date },
  visaStatus: { type: String },

  // Referral system
  referralCode: { type: String, required: true },
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  rewardPoints: { type: Number, default: 0 },

  // Email verification
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  verificationTokenCreatedAt: { type: Date },
  verifiedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
