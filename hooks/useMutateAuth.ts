import { auth } from "@/utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";

export const useMutateAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const reset = () => {
    setEmail("");
    setPassword("");
  };
  const signUpEmail = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      reset();
      return user;
    } catch (err: any) {
      const errorCode = err.code;
      const errorMessage = err.message;
      alert(errorMessage);
      reset();
      return;
    }
  };
  const loginEmail = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Signed in
      const user = userCredential.user;
      reset();
      return user;
    } catch (err: any) {
      const errorCode = err.code;
      const errorMessage = err.message;
      alert(errorMessage);
      reset();
      return;
    }
  };
  const logout = () => {
    auth.signOut();
  };
  return {
    email,
    setEmail,
    password,
    setPassword,
    signUpEmail,
    loginEmail,
    logout,
  };
};
