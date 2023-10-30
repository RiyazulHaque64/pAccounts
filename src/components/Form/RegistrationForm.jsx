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
import { MdEmail } from "react-icons/md";
import { BsCloudUploadFill } from "react-icons/bs";
import { TbLoader } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import useEmailValidator from "../../hooks/Form/useEmailFieldValidator";
import usePasswordFieldValidator from "../../hooks/Form/usePasswordFieldValidator";
import useConfirmPasswordFieldValidator from "../../hooks/Form/useConfirmPasswordFieldValidator";
import googleIcon from "../../assets/google_icon.png";
import { AuthContext } from "../../provider/AuthProvider";
import { useAddUserMutation } from "../../redux/features/auth/authApi";

const image_hosting_url = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_imgbb_api_key
}`;

const RegistrationForm = () => {
  const [addUser] = useAddUserMutation();
  const {
    createUser,
    setLoading,
    loading,
    updateUser,
    signInWithGoogle,
    emailVerify,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const { emailHandler, email, validEmail, checkValidation } =
    useEmailValidator();
  const { passwordHandler, password, validPassword, checkPasswordValidation } =
    usePasswordFieldValidator();
  const {
    confirmPasswordHandler,
    confirmPassword,
    validConfirmPassword,
    checkConfirmPasswordValidation,
  } = useConfirmPasswordFieldValidator(password);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState(null);

  const registrationFormHandler = (e) => {
    e.preventDefault();
    if (validEmail) {
      setError("");
      if (validPassword) {
        setError("");
        if (validPassword === confirmPassword) {
          setError("");
          if (file) {
            const fileType = ["image/jpeg", "image/png", "image/webp"];
            if (fileType.includes(file.type)) {
              setError("");
              setLoading({ userCreate: true });
              const formData = new FormData();
              formData.append("image", file);
              fetch(image_hosting_url, {
                method: "POST",
                body: formData,
              })
                .then((res) => res.json())
                .then((data) => {
                  setError("");
                  const photoUrl = data.data.url;
                  createUser(validEmail, confirmPassword)
                    .then((user) => {
                      updateUser(name, photoUrl)
                        .then(() => {
                          setLoading(null);
                          setError("");
                          const userInfo = {
                            name: user.user.displayName,
                            email: user.user.email,
                            photoURL: user.user.photoURL,
                          };
                          addUser(userInfo);
                          emailVerify(user.user)
                            .then(() => {
                              navigate("/auth/verify", { replace: true });
                              // console.log("Verified User", user.user);
                            })
                            .catch((error) => console.log(error.message));
                        })
                        .catch((error) => {
                          setError(error.message);
                          setLoading(null);
                        });
                    })
                    .catch((error) => {
                      if (
                        error.message ===
                        "Firebase: Error (auth/email-already-in-use)."
                      ) {
                        setError("This email already exists!");
                      } else {
                        setError(error.message);
                      }
                      setLoading(null);
                    });
                })
                .catch((error) => {
                  setError(error.message);
                  setLoading(null);
                });
            } else {
              setError("Only jpg, jpeg, png, & webp format allowed!");
            }
          } else {
            setError("");
            setLoading({ userCreate: true });
            createUser(validEmail, confirmPassword)
              .then((user) => {
                updateUser(name)
                  .then(() => {
                    setLoading(null);
                    setError("");
                    const userInfo = {
                      name: user.user.displayName,
                      email: user.user.email,
                      photoURL: user.user.photoURL,
                    };
                    navigate("/", { replace: true });
                    console.log(userInfo);
                  })
                  .catch((error) => {
                    setError(error.message);
                    setLoading(null);
                  });
              })
              .catch((error) => {
                if (
                  error.message ===
                  "Firebase: Error (auth/email-already-in-use)."
                ) {
                  setError("This email already exists!");
                } else {
                  setError(error.message);
                }
                setLoading(null);
              });
          }
        } else {
          setError("Password & Confirm Password didn't match!");
        }
      } else {
        setError("Password must be minimum 6 characters!");
      }
    } else {
      setError("Please, Enter a valid email!");
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
      <form className="space-y-5" onSubmit={registrationFormHandler}>
        <div className="w-full relative input-field">
          <input
            className={`w-full py-2 outline-none pl-9 border border-gray-400 focus:border-violet-600 ${
              name.length > 0 && "border-violet-600"
            }`}
            type="text"
            placeholder="Type your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <BiSolidUser
            className={`w-6 h-6 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2 field-icon ${
              name.length > 0 && "text-violet-600"
            }`}
          />
        </div>
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
          <MdEmail
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
            placeholder="Set a password"
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
        <div className="w-full relative input-field">
          <input
            className={`border w-full py-2 outline-none  pl-9 ${
              checkConfirmPasswordValidation
                ? "border-red-500 focus:border-red-500"
                : validConfirmPassword
                ? "border-violet-600 focus:border-violet-600"
                : "border-gray-400 focus:border-violet-600"
            }`}
            type={showPassword ? "text" : "password"}
            placeholder="Retype the password"
            value={confirmPassword}
            onChange={confirmPasswordHandler}
            required
          />
          <BiSolidKey
            className={`w-6 h-6 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2  ${
              checkConfirmPasswordValidation
                ? "text-red-500"
                : validConfirmPassword
                ? "text-violet-600"
                : "field-icon"
            }`}
          />
          {confirmPassword.length > 0 ? (
            showPassword ? (
              <FaEye
                className={`w-6 h-6 ${
                  validConfirmPassword ? "text-violet-600" : "text-red-500"
                } absolute right-2 top-1/2 transform -translate-y-1/2`}
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FaEyeSlash
                className={`w-6 h-6 ${
                  validConfirmPassword ? "text-violet-600" : "text-red-500"
                } absolute right-2 top-1/2 transform -translate-y-1/2`}
                onClick={() => setShowPassword(true)}
              />
            )
          ) : (
            ""
          )}
        </div>
        <div
          className={`w-full border border-dashed relative group duration-200 hover:border-violet-600 ${
            file?.name ? "border-violet-600" : "border-gray-400"
          }`}
        >
          <input
            className="w-full p-2 z-50 opacity-0 cursor-pointer"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <div className="flex justify-center items-center gap-2 absolute w-full top-1/2 transform -translate-y-1/2 -z-50">
            <BsCloudUploadFill
              className={`w-6 h-6 duration-200 group-hover:text-violet-600 ${
                file?.name ? "text-violet-600" : "text-gray-400"
              }`}
            />
            <span
              className={`text-lg duration-200 group-hover:text-violet-600 ${
                file?.name ? "text-violet-600" : "text-gray-400"
              }`}
            >
              {file?.name ? file.name : "Select your profile picture"}
            </span>
          </div>
        </div>
        <div className="w-full flex items-center gap-6">
          <button
            className=" w-4/12 flex items-center justify-center bg-violet-600 p-2 text-white font-semibold rounded-full disabled:cursor-not-allowed"
            type="submit"
            disabled={loading?.userCreate}
          >
            {loading?.userCreate ? (
              <TbLoader className="w-6 h-6 text-white animate-spin" />
            ) : (
              "SIGN UP"
            )}
          </button>
          <p>
            Have an account?{" "}
            <Link to="/auth/login">
              <span className="text-violet-600 font-semibold cursor-pointer duration-200 hover:text-violet-700">
                Log In
              </span>
            </Link>
          </p>
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

export default RegistrationForm;
