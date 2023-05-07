import { FC } from "react";
type Props = {
  children: React.ReactNode;
};
export const DeletePostModalLayout: FC<Props> = ({ children }) => {
  return (
    <div>
      <div className="bg-white py-16 px-16">{children}</div>
    </div>
  );
};
