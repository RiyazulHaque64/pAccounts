import { Outlet } from "react-router-dom";
import AuthHeader from "../components/Header/AuthHeader";

const AuthLayout = () => {
  return (
    <>
      <AuthHeader />
      <Outlet />
    </>
  );
};

export default AuthLayout;
