import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Generate 6-digit random number
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// @desc    Send OTP (Auto-Signup Logic)
// @route   POST /api/auth/send-otp
export const sendOtp = async (req, res) => {
  const { email, phone, type } = req.body; // type must be 'login' or 'signup'
  const identifier = email || phone;

  try {
    if (!identifier) return res.status(400).json({ message: "Email or Phone is required" });

    // 1. Check if user exists
    const query = email ? { email } : { phone };
    let user = await User.findOne(query);

    // 2. STRICT VALIDATION LOGIC
    if (type === 'signup') {
      if (user) {
        return res.status(400).json({ message: "Account already exists! Please Login." });
      }
      // Create new user for signup
      user = await User.create(query);
    } else if (type === 'login') {
      if (!user) {
        return res.status(404).json({ message: "Account not found. Please Sign Up first." });
      }
    } else {
        // Fallback for safety
        return res.status(400).json({ message: "Invalid request type" });
    }

    // 3. Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    // 4. Log for Testing
    console.log(`\n=== ${type.toUpperCase()} ATTEMPT ===`);
    console.log(`User: ${identifier}`);
    console.log(`OTP: ${otp}`);
    
    res.json({ 
      message: "OTP sent successfully", 
      otp: otp 
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify OTP
// @route   POST /api/auth/login
export const login = async (req, res) => {
  const { email, phone, otp } = req.body;
  
  try {
    const query = email ? { email } : { phone };
    const user = await User.findOne(query);

    if (!user) return res.status(400).json({ message: "User not found" });
    if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });
    if (user.otpExpires < Date.now()) return res.status(400).json({ message: "OTP Expired" });

    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '30d' });

    res.json({ 
      message: "Login Successful",
      token,
      user: { id: user._id, email: user.email, phone: user.phone }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};