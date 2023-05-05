import { FormEvent, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useMutateAuth } from "@/hooks/useMutateAuth";

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const {
    email,
    setEmail,
    password,
    setPassword,
    loginEmail,
    signUpEmail,
    logout,
  } = useMutateAuth();

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
