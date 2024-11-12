import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  verificationToken: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400 // expires after 24 hours
  },
  expiresAt: {
    type: Date,
    required: true
  },

  passwordResetToken: {
    type: String,
    default: "",
  },

  createdAt: {
    type: Date,
    required: true,
  },

  expiresAt: {
    type: Date,
    required: true,
  },
});

const Token = mongoose.model("Token", TokenSchema);

export default Token;