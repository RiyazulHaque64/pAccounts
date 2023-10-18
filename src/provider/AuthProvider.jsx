import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.init";
import { getAuth } from "firebase/auth";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(null);
  const [user, setUser] = useState(null);
  const [existUser, setExistUser] = useState(false);

  const signInWithGoogle = () => {
    setLoading({ google: true });
    return signInWithPopup(auth, googleProvider);
  };

  const createUser = (email, password) => {
    setLoading({ userCreate: true });
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const emailVerify = (signInUser) => {
    return sendEmailVerification(signInUser);
  };

  const updateUser = (userName, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: userName,
      photoURL: photoURL,
    });
  };

  const loginUser = (email, password) => {
    setLoading({ login: true });
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setExistUser(true);
    });
    return () => {
      return unsubscribe();
    };
  }, [loading, user?.emailVerified]);

  const authInfo = {
    signInWithGoogle,
    createUser,
    emailVerify,
    updateUser,
    loginUser,
    logout,
    loading,
    setLoading,
    user,
    existUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
