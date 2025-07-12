import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
} from "../controllers/authController.js";

import protect from "../middleware/authMiddleware.js";

// ✅ Import all password reset OTP controllers
import {
  sendOtp,
  verifyOtp,
  resetPassword,
} from "../controllers/passwordResetController.js";

const router = express.Router();

// 🟢 Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// 🛡️ Protected Route
router.get("/profile", protect, getProfile);

// ❌ Old reset-token route (optional - can delete if switching to OTP only)
// router.post("/request-password-reset", requestPasswordReset);

// ✅ New OTP-based Reset Routes
router.post("/send-otp", sendOtp);           // Step 1: Send OTP to email
router.post("/verify-otp", verifyOtp);       // Step 2: Verify OTP
router.post("/reset-password", resetPassword); // Step 3: Reset password

export default router;
