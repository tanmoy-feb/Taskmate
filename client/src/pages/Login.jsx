import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../api/axiosInstance";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const res = await axios.post("/auth/login", { email, password });
      const { user, token } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      dispatch(loginSuccess({ user, token }));
      navigate("/");
    } catch (err) {
      dispatch(loginFailure(err.response?.data?.error || "Login failed"));
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Login to Taskmate
      </h2>
      <form className="flex flex-col gap-4" onSubmit={handleLogin}>
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
          Login
        </button>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
      </form>

      <div className="text-sm flex justify-between mt-4">
        <p className="text-black">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
        <Link
          to="/forgot-password"
          className="text-gray-500 hover:underline"
        >
          Forgot password?
        </Link>
      </div>
    </div>
  );
};

export default Login;
