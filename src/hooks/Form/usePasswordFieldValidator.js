import { useState } from "react";

const usePasswordFieldValidator = () => {
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState("");
  const [checkPasswordValidation, setCheckPasswordValidation] = useState(false);

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

  return { passwordHandler, password, validPassword, checkPasswordValidation };
};

export default usePasswordFieldValidator;
