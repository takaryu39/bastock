import Head from "next/head";
import { FC, ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};
export const Layout: FC<Props> = ({ children, title = "Bastock" }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <header></header>
      <main>{children}</main>
      <footer></footer>
    </>
  );
};
