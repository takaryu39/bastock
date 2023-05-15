import { auth } from "@/utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useMutateProfile } from "./useMutateProfile";

export const useMutateAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const reset = () => {
    setEmail("");
    setPassword("");
  };
  const { createProfileMutation } = useMutateProfile();
  const queryClient = useQueryClient();
  const signUpEmail = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      createProfileMutation(user.uid);
      reset();
      return user;
    } catch (err: any) {
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
      const errorMessage = err.message;
      alert(errorMessage);
      reset();
      return;
    }
  };
  const logout = () => {
    auth.signOut();
    queryClient.removeQueries("posts");
    queryClient.removeQueries("profile");
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
