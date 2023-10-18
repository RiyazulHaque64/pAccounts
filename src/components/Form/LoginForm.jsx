import { useContext, useState } from "react";
import {
  BiSolidUser,
  BiSolidKey,
  BiErrorCircle,
  BiError,
} from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import { TbLoader } from "react-icons/tb";
import useEmailFieldValidator from "../../hooks/Form/useEmailFieldValidator";
import usePasswordFieldValidator from "../../hooks/Form/usePasswordFieldValidator";
import googleIcon from "../../assets/google_icon.png";
import { AuthContext } from "../../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { signInWithGoogle, loading, setLoading, loginUser } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const { emailHandler, email, validEmail, checkValidation } =
    useEmailFieldValidator();
  const { passwordHandler, password, validPassword, checkPasswordValidation } =
    usePasswordFieldValidator();

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginFormHandler = (e) => {
    e.preventDefault();
    if (validEmail) {
      if (validPassword) {
        loginUser(validEmail, validPassword)
          .then((user) => {
            console.log(user);
            setError("");
            setLoading(null);
            navigate("/", { replace: true });
          })
          .catch((error) => {
            if (
              error.message ===
              "Firebase: Error (auth/invalid-login-credentials)."
            ) {
              setError("Email or password is invalid!");
            } else {
              setError(error.message);
            }
            setLoading(null);
          });
      } else {
        setError("Password must be minimum 6 characters");
      }
    } else {
      setError("Please, Enter a valid email");
    }
  };

  const loginWithGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result);
        setError("");
        setLoading(null);
      })
      .catch((error) => {
        setLoading(null);
        if (error.message === "Firebase: Error (auth/popup-closed-by-user).") {
          setError("Authorization canceled by user");
        } else {
          setError(error.message);
        }
      });
  };

  return (
    <div>
      {error.length > 0 ? (
        <div className="border border-red-200 bg-red-100 mb-6 flex justify-between items-center p-2">
          <div className="flex items-center gap-2">
            <BiError className="text-red-500 w-6 h-6" />
            <h2 className="text-red-500">{error}</h2>
          </div>
          <HiXMark
            className="text-red-500 w-6 h-6"
            onClick={() => setError("")}
          />
        </div>
      ) : (
        ""
      )}
      <form className="space-y-5" onSubmit={loginFormHandler}>
        <div className="w-full relative input-field">
          <input
            className={`border  w-full py-2 outline-none  pl-9 ${
              checkValidation
                ? "border-red-500 focus:border-red-500"
                : validEmail
                ? "border-violet-600 focus:border-violet-600"
                : "border-gray-400 focus:border-violet-600"
            }`}
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={emailHandler}
            required
          />
          <BiSolidUser
            className={`w-6 h-6 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2  ${
              checkValidation
                ? "text-red-500"
                : validEmail
                ? "text-violet-600"
                : "field-icon"
            }`}
          />
          {checkValidation ? (
            <BiErrorCircle className="w-6 h-6 text-red-500 absolute right-2 top-1/2 transform -translate-y-1/2" />
          ) : validEmail ? (
            <TiTick className="w-6 h-6 text-violet-600 absolute right-2 top-1/2 transform -translate-y-1/2" />
          ) : (
            ""
          )}
        </div>
        <div className="w-full relative input-field">
          <input
            className={`border  w-full py-2 outline-none  pl-9 ${
              checkPasswordValidation
                ? "border-red-500 focus:border-red-500"
                : validPassword
                ? "border-violet-600 focus:border-violet-600"
                : "border-gray-400 focus:border-violet-600"
            }`}
            type={showPassword ? "text" : "password"}
            placeholder="Type your password"
            value={password}
            onChange={passwordHandler}
            required
          />
          <BiSolidKey
            className={`w-6 h-6 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2  ${
              checkPasswordValidation
                ? "text-red-500"
                : validPassword
                ? "text-violet-600"
                : "field-icon"
            }`}
          />
          {password.length > 0 ? (
            showPassword ? (
              <FaEye
                className={`w-6 h-6 ${
                  validPassword ? "text-violet-600" : "text-red-500"
                } absolute right-2 top-1/2 transform -translate-y-1/2`}
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FaEyeSlash
                className={`w-6 h-6 ${
                  validPassword ? "text-violet-600" : "text-red-500"
                } absolute right-2 top-1/2 transform -translate-y-1/2`}
                onClick={() => setShowPassword(true)}
              />
            )
          ) : (
            ""
          )}
        </div>
        <div className="w-full flex items-center gap-6">
          <button
            className="w-4/12 flex items-center justify-center bg-violet-600 p-2 text-white font-semibold rounded-full disabled:cursor-not-allowed"
            type="submit"
            disabled={loading?.login}
          >
            {loading?.login ? (
              <TbLoader className="w-6 h-6 text-white animate-spin" />
            ) : (
              "LOG IN"
            )}
          </button>
          <p className="uppercase cursor-pointer">Forget password?</p>
        </div>
      </form>
      <div className="text-center mt-2 mb-4">
        <span className="text-gray-500 text-xl font-semibold">Or</span>
      </div>
      <button
        className="w-full py-3 border border-violet-200 rounded-full font-semibold flex items-center justify-center gap-4 hover:bg-violet-100/50 duration-300 disabled:cursor-not-allowed"
        onClick={loginWithGoogle}
        disabled={loading?.google}
      >
        <img className="w-6 h-6" src={googleIcon} alt="" />
        <span className="text-gray-700">Signup with google</span>
        {loading?.google && (
          <TbLoader className="w-6 h-6 text-violet-700 animate-spin" />
        )}
      </button>
    </div>
  );
};

export default LoginForm;
