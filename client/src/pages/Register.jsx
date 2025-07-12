import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../api/axiosInstance";
import {
  loginStart,
  loginFailure,
} from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth); 
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      await axios.post("/auth/register", {
        username,
        email,
        password,
      });

      // ✅ Redirect to login after successful registration
      navigate("/login");
    } catch (err) {
      dispatch(
        loginFailure(err.response?.data?.error || "Registration failed")
      );
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Create Your Taskmate Account
      </h2>
      <form className="flex flex-col gap-4" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          className="border p-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
      </form>

      <div className="text-sm mt-4 text-center text-black">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
