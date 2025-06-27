const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  picture: { type: String }, // Google profile picture
  profilePic: { type: String, default: '' }, // ✅ manually uploaded picture
  referralCode: { type: String, required: true },
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  rewardPoints: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  verificationTokenCreatedAt: { type: Date },
  verifiedAt: { type: Date },

  // ✅ New fields
  dob: { type: Date },
  visaStatus: { type: String, enum: ['Student', 'PR', 'Work Permit', 'Visitor', 'Other'] }

}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
