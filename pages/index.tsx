import { Inter } from "next/font/google";
import { Layout } from "@/components/Layout";
import { Auth } from "@/components/Auth";
import { Suspense, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utils/firebase";
import useStore from "@/store/indax";
import Feed from "@/components/Feed";
import { Spinner } from "@/components/Spinner";
import { NextPage } from "next";

const Home: NextPage = () => {
  const session = useStore((state) => state.user);
  const setSession = useStore((state) => state.setUser);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setSession(user);
      } else {
        setSession(user);
      }
    });
  }, [setSession]);
  return (
    <Layout title="Home">
      {session ? (
        <Suspense fallback={<Spinner />}>
          <Feed />
        </Suspense>
      ) : (
        <Auth />
      )}
    </Layout>
  );
};
export default Home;
