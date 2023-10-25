import { Link, useNavigate } from "react-router-dom";
import verifyPageIllustration from "../../assets/verificationIllustration.jpg";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const EmailVerification = () => {
  const { user } = useContext(AuthContext);
  const [refreshPage, setRefreshPage] = useState(false);
  const navigate = useNavigate();
  console.log("Verified", refreshPage);
  console.log("emailVerified", user?.emailVerified);

  useEffect(() => {
    if (user?.emailVerified === false) {
      setInterval(() => {
        setRefreshPage(!refreshPage);
        window.location.reload(true);
      }, 5000);
    }
    if (user?.emailVerified === true) {
      navigate("/", { replace: true });
    }
  }, [refreshPage, user?.emailVerified, navigate]);

  return (
    <div className="w-10/12 mx-auto py-4 h-screen flex flex-col items-center justify-center">
      <div>
        <img
          className="w-96"
          src={verifyPageIllustration}
          alt="Verify Page Illustration"
        />
      </div>
      <div className="text-center">
        <h2 className="text-xl mb-2">Verify your email address</h2>
        <p>
          You&apos;ve entered{" "}
          <span className="text-violet-600 font-semibold">
            riyazulhaque64@gmail.com
          </span>{" "}
          as the email address for your account.
        </p>
        <p className="mb-6">
          Please, verify this email address by clicking button below.
        </p>
        <div className="flex items-center justify-center gap-2">
          <a
            className="bg-violet-600 duration-200 hover:bg-violet-800 text-white py-3 px-6 rounded-full"
            href="https://gmail.com"
            rel="noreferrer"
            target="_blank"
          >
            {user?.emailVerified ? "Verified" : "Verify your email"}
          </a>
          <Link to="/auth/register">
            <button className="border font-semibold border-violet-600 duration-200 text-violet-600 py-3 px-6 rounded-full hover:text-violet-800">
              Register with other email
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
