import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth); // Will set this up fully tomorrow

  // Temporary logic for testing
  const isAuthenticated = user !== null;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
