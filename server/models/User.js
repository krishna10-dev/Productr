import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    unique: true, 
    sparse: true // Allows null/missing values
  },
  phone: { 
    type: String, 
    unique: true, 
    sparse: true // Allows null/missing values
  },
  otp: { type: String },
  otpExpires: { type: Date }
}, { timestamps: true });

export default mongoose.model('User', userSchema);