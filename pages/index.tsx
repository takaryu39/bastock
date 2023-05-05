import Image from "next/image";
import { Inter } from "next/font/google";
import { Layout } from "@/components/Layout";
import { Auth } from "@/components/Auth";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utils/firebase";
import useStore from "@/store/indax";
import Feed from "@/components/Feed";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const session = useStore((state) => state.user);
  const setSession = useStore((state) => state.setUser);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setSession(user);
        console.log(user);
      } else {
        setSession(user);
        console.log("ログアウト");
      }
    });
  }, [setSession]);
  return <Layout title="Home">{session ? <Feed /> : <Auth />}</Layout>;
}
