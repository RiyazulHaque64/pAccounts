import { useState } from "react";
import {
  BiSolidUser,
  BiSolidKey,
  BiErrorCircle,
  BiError,
} from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";

//
const LoginForm = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState("");
  const [checkValidation, setCheckValidation] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState("");
  const [checkPasswordValidation, setCheckPasswordValidation] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const emailHandler = (e) => {
    setEmail(e.target.value);
    if (e.target.value.length) {
      setCheckValidation(true);
      if (/\S+@\S+\.\S+/.test(e.target.value)) {
        setValidEmail(e.target.value);
        setCheckValidation(false);
      } else {
        setValidEmail("");
      }
    } else {
      setCheckValidation(false);
    }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length) {
      setCheckPasswordValidation(true);
      if (e.target.value.length >= 6) {
        setValidPassword(e.target.value);
        setCheckPasswordValidation(false);
      } else {
        setValidPassword("");
      }
    } else {
      setCheckPasswordValidation(false);
    }
  };

  const loginFormHandler = (e) => {
    e.preventDefault();
    if (validEmail) {
      if (validPassword) {
        console.log("sobkicu thik ace", validEmail, validPassword);
      } else {
        setError("Password must be minimum 6 characters");
      }
    } else {
      setError("Please, Enter a valid email");
    }
  };

  return (
    <div className="border border-gray-300 p-10">
      <div className="mb-5">
        <h2 className="font-bold text-2xl">Welcome Back</h2>
        <p className="text-gray-500">Login to continue</p>
      </div>
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
            type="text"
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
                  validPassword ? "text-indigo-600" : "text-red-500"
                } absolute right-2 top-1/2 transform -translate-y-1/2`}
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FaEyeSlash
                className={`w-6 h-6 ${
                  validPassword ? "text-indigo-600" : "text-red-500"
                } absolute right-2 top-1/2 transform -translate-y-1/2`}
                onClick={() => setShowPassword(true)}
              />
            )
          ) : (
            ""
          )}
        </div>
        <div className="w-full flex items-center gap-6">
          <input
            className=" w-4/12 bg-violet-600 p-2 text-white font-semibold rounded-full"
            type="submit"
            value="LOG IN"
          />
          <p className="uppercase cursor-pointer">Forget password?</p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

{
  /* <FaEye
                className="w-6 h-6 text-red-500 absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(false)}
              /> */
}

// <FaEyeSlash
//   className="w-6 h-6 text-red-500 absolute right-2 top-1/2 transform -translate-y-1/2"
//   onClick={() => setShowPassword(true)}
// />
