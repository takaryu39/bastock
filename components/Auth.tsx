import { useMutateAuth } from "@/hooks/useMutateAuth";
import { useState } from "react";

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { email, setEmail, password, setPassword, loginEmail, signUpEmail } =
    useMutateAuth();
  return (
    <div className="bg-light-gray h-screen flex justify-center items-center">
      <div className="w-3/5 m-auto bg-white p-9">
        <h1 className="text-main-color font-bold text-center text-6xl mb-8">
          Bastock
        </h1>
        <div className="flex flex-col gap-5 items-center justify-center">
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="メールアドレス"
              className="text-dark-gray border border-gray rounded-lg w-80 p-3"
            />
          </div>
          <div className="flex items-center gap-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="パスワード"
              className="text-dark-gray border border-gray rounded-lg w-80 p-3"
            />
          </div>
        </div>
        <div>
          <button
            onClick={isLogin ? loginEmail : signUpEmail}
            className="flex items-center justify-center h-12 w-80 m-auto rounded-lg bg-main-color text-white font-bold mt-4 transition-all hover:opacity-75"
          >
            {isLogin ? "ログインする" : "新規登録する"}
          </button>
          <div className="flex justify-center items-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="mt-12 my-auto text-dark-gray text-xs transition-all hover:opacity-75"
            >
              {isLogin ? "新規登録する" : "ログインする"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
