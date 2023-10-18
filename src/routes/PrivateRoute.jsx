import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Loader from "../components/Loader/Loader";
import { Navigate, useLocation } from "react-router-dom";
import EmailVerification from "../pages/EmailVerification";

const PrivateRoute = ({ children }) => {
  const { user, existUser } = useContext(AuthContext);
  const location = useLocation();

  if (!existUser) {
    return <Loader />;
  }
  if (user?.emailVerified) {
    return children;
  } else if (user) {
    return <EmailVerification />;
  }
  return <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
