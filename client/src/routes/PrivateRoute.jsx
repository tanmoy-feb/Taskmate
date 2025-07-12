import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth); 

  
  const isAuthenticated = user !== null;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
