import { useLocation, Navigate } from "react-router-dom";

const ProtectedSuccess = ({ children }) => {

  const location = useLocation();

  // Only allow if user came from checkout flow
  if (!location.state?.fromCheckout) {
    return <Navigate to={-1} replace />;
  }

  return children;
};

export default ProtectedSuccess;