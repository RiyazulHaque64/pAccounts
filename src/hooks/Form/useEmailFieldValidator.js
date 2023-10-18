import { useState } from "react";

const useEmailFieldValidator = () => {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState("");
  const [checkValidation, setCheckValidation] = useState(false);
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
  return { emailHandler, email, validEmail, checkValidation };
};

export default useEmailFieldValidator;
