import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [serverOtp, setServerOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const otpRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ OTP sent to your email.");
        setServerOtp(data.otp);
        setStep(2);
      } else {
        setMessage(data.error || "Something went wrong.");
      }
    } catch (err) {
      setMessage("Server error. Try again later.");
    }
    setLoading(false);
  };

  const handleResendOtp = async () => {
    setMessage("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("🔁 OTP resent to your email.");
        setServerOtp(data.otp);
      } else {
        setMessage(data.error || "Failed to resend OTP.");
      }
    } catch (err) {
      setMessage("Server error.");
    }
    setLoading(false);
  };

  const handleOtpChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 3) {
      otpRefs[index + 1].current.focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 4) return setMessage("Please enter all 4 digits.");

    setMessage("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: enteredOtp }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ OTP verified. You can now reset your password.");
        setStep(3);
      } else {
        setMessage(data.error || "Invalid OTP.");
      }
    } catch (err) {
      setMessage("Server error.");
    }
    setLoading(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    if (password !== confirm) {
      return setMessage("Passwords do not match.");
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Password reset successfully. Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(data.error || "Failed to reset password.");
      }
    } catch (err) {
      setMessage("Server error.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
      <h2 className="text-xl font-bold text-center mb-4">
        {step === 1 && "Forgot Password"}
        {step === 2 && "Enter OTP"}
        {step === 3 && "Reset Password"}
      </h2>

      {step === 1 && (
        <form className="flex flex-col gap-4" onSubmit={handleSendOtp}>
          <input
            type="email"
            placeholder="Enter your email"
            className="border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      )}

      {step === 2 && (
        <>
          <form className="flex flex-col gap-4" onSubmit={handleVerifyOtp}>
            <div className="flex justify-between gap-2">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={otpRefs[i]}
                  type="text"
                  maxLength={1}
                  className="w-10 h-10 text-center border rounded"
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                />
              ))}
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>

          <div className="mt-3 text-center">
            <button
              onClick={handleResendOtp}
              className="text-sm text-blue-600 hover:underline"
              disabled={loading}
            >
              Resend OTP
            </button>
          </div>
        </>
      )}

      {step === 3 && (
        <form className="flex flex-col gap-4" onSubmit={handleResetPassword}>
          <input
            type="password"
            placeholder="New Password"
            className="border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="border p-2 rounded"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      )}

      {message && (
        <p className="text-sm text-center mt-3 text-green-700">{message}</p>
      )}

      <div className="text-sm text-center mt-4">
        <Link to="/login" className="text-blue-600 hover:underline">
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
