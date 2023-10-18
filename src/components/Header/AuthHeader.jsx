import { Link, useLocation } from "react-router-dom";

const AuthHeader = () => {
  const location = useLocation();

  return (
    <div className="w-full h-20 shadow">
      <div className="header-style flex justify-between items-center">
        <div>
          <Link to="/">
            <h2 className="text-2xl">
              <span className="text-violet-600 font-bold">p</span>Accounts
            </h2>
          </Link>
        </div>
        <div>
          {location.pathname === "/auth/login" ||
          location.pathname === "/auth" ? (
            <p>
              New User?{" "}
              <Link to="/auth/register">
                <span className="text-violet-600 font-semibold">Sign Up</span>
              </Link>
            </p>
          ) : (
            <p>
              Have an account?{" "}
              <Link to="/auth/login">
                <span className="text-violet-600 font-semibold">Log In</span>
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthHeader;
