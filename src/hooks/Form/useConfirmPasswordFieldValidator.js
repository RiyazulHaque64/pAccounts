import { useState } from "react";

const useConfirmPasswordFieldValidator = (password = "") => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validConfirmPassword, setValidConfirmPassword] = useState("");
  const [checkConfirmPasswordValidation, setCheckConfirmPasswordValidation] =
    useState(false);

  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value.length) {
      setCheckConfirmPasswordValidation(true);
      if (password === e.target.value && e.target.value.length >= 6) {
        setValidConfirmPassword(e.target.value);
        setCheckConfirmPasswordValidation(false);
      } else {
        setValidConfirmPassword("");
      }
    } else {
      setCheckConfirmPasswordValidation(false);
    }
  };
  return {
    confirmPasswordHandler,
    confirmPassword,
    validConfirmPassword,
    checkConfirmPasswordValidation,
  };
};

export default useConfirmPasswordFieldValidator;
