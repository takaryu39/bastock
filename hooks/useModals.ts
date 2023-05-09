import { useCallback } from "react";
import { useModal } from "react-hooks-use-modal";

export const useModals = () => {
  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: true,
  });
  const [DeletePostModal, deletePostModalOpen, deletePostModalClose] = useModal(
    "root",
    {
      preventScroll: true,
    }
  );

  const handleDeletePostModalOpen = useCallback(() => {
    deletePostModalOpen();
  }, [deletePostModalOpen]);

  const handleModalOpen = useCallback(() => {
    open();
  }, [open]);
  const handleModalClose = useCallback(() => {
    close();
  }, [close]);

  return {
    Modal,
    DeletePostModal,
    open,
    close,
    handleModalOpen,
    handleModalClose,
    handleDeletePostModalOpen,
    deletePostModalClose,
  };
};
