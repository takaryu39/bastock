import { useMutateAuth } from "@/hooks/useMutateAuth";
import { Profile } from "./Profile";
import { LogoutIcon } from "@heroicons/react/solid";
import { FC } from "react";

const Header: FC = () => {
  const { logout } = useMutateAuth();

  return (
    <header className="flex justify-between items-center px-4 py-2 bg-gray-800 shadow">
      <h1 className="text-2xl font-bold text-main-color">BASTOCK</h1>
      <div className="flex items-center gap-4">
        <Profile />
        <button onClick={logout} className="flex items-center gap-2">
          <LogoutIcon className="w-4 h-4 text-dark-gray" />
          <span className="text-xs font-bold  text-dark-gray">ログアウト</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
