import { FC, memo } from "react";
import styles from "../styles/modal-layout.module.css";

type Props = {
  children: React.ReactNode;
  closeModal: () => void;
};

export const ModalLayoutMemo: FC<Props> = ({ children, closeModal }) => {
  return (
    <div className={styles.modalContainer}>
      <div className="bg-white py-16 px-16">
        <h1>Title</h1>
        {children}
        <button onClick={closeModal}>CLOSE</button>
      </div>
    </div>
  );
};
export const ModalLayout = memo(ModalLayoutMemo);
