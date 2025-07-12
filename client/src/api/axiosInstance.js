import axios from "axios";

// Base instance pointing to backend API
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Change to production URL when deploying
});

// Attach JWT token to all outgoing requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
