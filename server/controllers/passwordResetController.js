import crypto from "crypto";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";

//  STEP 1: Send OTP to user
export const sendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const otp = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit OTP

    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 min
    await user.save();

    await sendEmail({
      to: user.email,
      subject: "Taskmate OTP - Reset Password",
      html: `<p>Your OTP is <b>${otp}</b>. It is valid for 10 minutes.</p>`,
    });

    res.json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error("Send OTP error:", error);
    res.status(500).json({ error: "Error sending OTP" });
  }
};

//  STEP 2: Verify OTP
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (
      !user ||
      user.otp !== otp ||
      Date.now() > user.otpExpires
    ) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    // Clear OTP after verification
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.json({ message: "OTP verified" });
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ error: "OTP verification failed" });
  }
};

//  STEP 3: Reset Password after OTP verification
export const resetPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    user.password = password;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ error: "Could not reset password" });
  }
};
