import Head from "next/head";
import { FC, ReactNode } from "react";
import Header from "./Header";
import Container from "./Container";

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
      <div className="flex-col h-screen flex">
        <Header />
        <main>
          <Container>{children}</Container>
        </main>
        <footer></footer>
      </div>
    </>
  );
};
