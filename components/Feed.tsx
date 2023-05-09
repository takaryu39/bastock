import { useMutateAuth } from "@/hooks/useMutateAuth";
import { useQueryPosts } from "@/hooks/useQueryPosts";
import { FC, useCallback, useEffect } from "react";
import { useSubscribe } from "@/hooks/useSubscribe";
import { ModalLayout } from "./ModalLayout";
import { useModal } from "react-hooks-use-modal";
import { PostItem } from "./PostItem";
import { DeletePostModalLayout } from "./DeletePostModalLayout";
import { PostForm } from "./PostForm";
import useStore from "@/store/indax";
import { useMutatePost } from "@/hooks/useMutatePost";
import { useModals } from "@/hooks/useModals";
import { useMutateProfile } from "@/hooks/useMutateProfile";
const Feed: FC = () => {
  const editedPost = useStore((state) => state.editedPost);
  const { logout } = useMutateAuth();
  const { deletePostMutation } = useMutatePost();
  useSubscribe();
  const {
    Modal,
    DeletePostModal,
    open,
    close,
    handleModalOpen,
    handleModalClose,
    handleDeletePostModalOpen,
    deletePostModalClose,
  } = useModals();

  const { data: posts, isLoading, isError } = useQueryPosts();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error occurred while fetching posts</div>;
  }

  useEffect(() => {
    console.log("レンダリング");
  }, []);
  return (
    <>
      <button onClick={logout}>ログアウトする</button>
      <button
        onClick={() => {
          open();
        }}
      >
        釣果を投稿する
      </button>

      <Modal>
        <ModalLayout closeModal={handleModalClose}>
          <PostForm closeModal={handleModalClose} />
        </ModalLayout>
      </Modal>

      <DeletePostModal>
        <DeletePostModalLayout>
          <p>この投稿を削除しますか？</p>
          <div className="">
            <button onClick={() => deletePostModalClose()}>キャンセル</button>
            <button
              onClick={() => {
                deletePostMutation(editedPost.id);
                deletePostModalClose();
              }}
            >
              削除
            </button>
          </div>
        </DeletePostModalLayout>
      </DeletePostModal>

      <div>
        {posts?.map((post) => (
          <PostItem
            key={post.id}
            id={post.id}
            fished_at={post.fished_at}
            place={post.place}
            imgUrl={post.imgUrl}
            size={post.size}
            lure={post.lure}
            reel={post.reel}
            rod={post.rod}
            line={post.line}
            rig={post.rig}
            openModal={handleModalOpen}
            deletePostModalOpen={handleDeletePostModalOpen}
          />
        ))}
      </div>
    </>
  );
};

export default Feed;
