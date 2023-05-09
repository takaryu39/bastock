import Image from "next/image";
import { Inter } from "next/font/google";
import { Layout } from "@/components/Layout";
import { Auth } from "@/components/Auth";
import { Suspense, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utils/firebase";
import useStore from "@/store/indax";
import Feed from "@/components/Feed";
import { ErrorBoundary } from "react-error-boundary";
import { Spinner } from "@/components/Spinner";
import { NextPage } from "next";

const inter = Inter({ subsets: ["latin"] });

const Home: NextPage = () => {
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
  return (
    <Layout title="Home">
      {session ? (
        <ErrorBoundary fallback={<Spinner />}>
          <Suspense fallback={<Spinner />}>
            <Feed />
          </Suspense>
        </ErrorBoundary>
      ) : (
        <Auth />
      )}
    </Layout>
  );
};
export default Home;
