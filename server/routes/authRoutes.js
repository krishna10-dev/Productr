import express from 'express';
import { sendOtp, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/login', login);

export default router;