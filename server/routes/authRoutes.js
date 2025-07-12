import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
} from "../controllers/authController.js";

import protect from "../middleware/authMiddleware.js";

// Import all password reset OTP controllers
import {
  sendOtp,
  verifyOtp,
  resetPassword,
} from "../controllers/passwordResetController.js";

const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Route
router.get("/profile", protect, getProfile);

// New OTP-based Reset Routes
router.post("/send-otp", sendOtp);           
router.post("/verify-otp", verifyOtp);       
router.post("/reset-password", resetPassword); 

export default router;
