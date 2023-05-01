import Image from "next/image";
import { Inter } from "next/font/google";
import { Layout } from "@/components/Layout";
import { Auth } from "@/components/Auth";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Layout title="Home">
      <h1 className="text-4xl font-bold"></h1>
      <Auth />
    </Layout>
  );
}
