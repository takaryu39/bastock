import { FC, ReactNode } from "react";
type Props = {
  children: ReactNode;
};

const Container: FC<Props> = ({ children }) => {
  return (
    <div className="w-11/12 max-w-screen-xl mx-auto mt-16">{children}</div>
  );
};

export default Container;
