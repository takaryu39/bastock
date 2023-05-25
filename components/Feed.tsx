import { useQueryPosts } from "@/hooks/useQueryPosts";
import { FC } from "react";
import { useSubscribe } from "@/hooks/useSubscribe";
import { ModalLayout } from "./ModalLayout";
import { PostItem } from "./PostItem";
import { DeletePostModalLayout } from "./DeletePostModalLayout";
import { PostForm } from "./PostForm";
import useStore from "@/store/indax";
import { useMutatePost } from "@/hooks/useMutatePost";
import { useModals } from "@/hooks/useModals";
import { Spinner } from "./Spinner";
import { PlusIcon } from "@heroicons/react/solid";
import { useQueryProfile } from "@/hooks/useQueryProfile";
const Feed: FC = () => {
  const editedPost = useStore((state) => state.editedPost);
  const { deletePostMutation } = useMutatePost();
  useSubscribe();
  const {
    Modal,
    DeletePostModal,
    open,
    handleModalOpen,
    handleModalClose,
    handleDeletePostModalOpen,
    deletePostModalClose,
  } = useModals();

  useQueryProfile();
  const { data: posts, isLoading, isError } = useQueryPosts();
  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <div>投稿を取得することができませんでした。</div>;
  }

  return (
    <>
      <button
        onClick={() => {
          open();
        }}
        className="fixed bottom-5 right-5 flex items-center justify-center gap-2 w-48 px-4 py-2  bg-main-color transition-all border border-transparent rounded-md shadow-sm hover:opacity-60"
      >
        <PlusIcon className="w-4 h-4 text-white" />
        <span className="text-white text-sm">釣果を投稿する</span>
      </button>

      <Modal>
        <ModalLayout closeModal={handleModalClose} title="釣果を編集する">
          <PostForm closeModal={handleModalClose} />
        </ModalLayout>
      </Modal>

      <DeletePostModal>
        <DeletePostModalLayout>
          <p className="font-bold text-center ">この投稿を削除しますか？</p>
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => deletePostModalClose()}
              className="flex items-center justify-center gap-2 w-48 px-4 py-2  bg-white text-main-color transition-all border border-main-color rounded-md shadow-sm hover:opacity-60"
            >
              キャンセル
            </button>
            <button
              onClick={() => {
                deletePostMutation(editedPost.id);
                deletePostModalClose();
              }}
              className="flex items-center justify-center gap-2 w-48 px-4 py-2  bg-main-color transition-all text-white border border-transparent rounded-md shadow-sm hover:opacity-60"
            >
              削除
            </button>
          </div>
        </DeletePostModalLayout>
      </DeletePostModal>

      <div className="grid grid-cols-3 gap-8 ">
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
            user_id={post.user_id}
            openModal={handleModalOpen}
            deletePostModalOpen={handleDeletePostModalOpen}
          />
        ))}
      </div>
    </>
  );
};

export default Feed;
