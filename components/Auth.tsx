import { FormEvent, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/utils/firebase";

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUpEmail = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setEmail("");
      setPassword("");
      return user;
    } catch (err: any) {
      const errorCode = err.code;
      const errorMessage = err.message;
      alert(errorMessage);
      setEmail("");
      setPassword("");
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
      setEmail("");
      setPassword("");
      return user;
    } catch (err: any) {
      const errorCode = err.code;
      const errorMessage = err.message;
      alert(errorMessage);
      setEmail("");
      setPassword("");
      return;
    }
  };
  const logout = () => {
    auth.signOut();
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(user);
      } else {
      }
    });
  }, []);

  return (
    <div>
      <div className="flex items-center gap-4">
        <span>メールアドレス</span>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-4">
        <span>パスワード</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button onClick={loginEmail}>ログインする</button>
        <button onClick={signUpEmail}>新規登録</button>
        <button onClick={logout}>ログアウトする</button>
      </div>
    </div>
  );
};
