import { FC, memo } from "react";
import styles from "../styles/modal-layout.module.css";
import { XIcon } from "@heroicons/react/solid";
import useStore from "@/store/indax";

type Props = {
  children: React.ReactNode;
  title: string;
  closeModal: () => void;
};

export const ModalLayoutMemo: FC<Props> = ({ children, closeModal, title }) => {
  const reset = useStore((state) => state.resetEditedPost);
  return (
    <div className={styles.modalContainer}>
      <div className="bg-white py-16 px-16">
        <h1 className="text-center font-bold ">{title}</h1>
        {children}
        <button
          onClick={() => {
            closeModal();
            reset();
          }}
        >
          <XIcon className="w-12 h-12 absolute right-10 top-6 text-main-color" />
        </button>
      </div>
    </div>
  );
};
export const ModalLayout = memo(ModalLayoutMemo);
