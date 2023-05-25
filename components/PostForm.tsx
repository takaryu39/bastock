import { useMutatePost } from "@/hooks/useMutatePost";
import { useUploadPostImg } from "@/hooks/useUploadPostImg";
import useStore from "@/store/indax";
import { ChangeEvent, FC, memo } from "react";
type Props = {
  closeModal: () => void;
};

export const PostFormMemo: FC<Props> = ({ closeModal }) => {
  const { createPostMutation, updatePostMutation } = useMutatePost();
  const { mutateUploadPostImg } = useUploadPostImg();
  const editedPost = useStore((state) => state.editedPost);
  const update = useStore((state) => state.updateEditedPost);
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    update({ ...editedPost, [name]: value });

    if (e.target.files) {
      const imgUrl = await mutateUploadPostImg(e.target.files[0]);
      update({ ...editedPost, imgUrl });
    }
    console.log(editedPost);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editedPost.id === "") {
      createPostMutation(editedPost);
    } else {
      updatePostMutation(editedPost);
    }
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className="w-10/12 m-auto">
      <div className="flex gap-6 items-center">
        <label className="font-bold w-1/5" htmlFor="imgUrl">
          画像
        </label>
        <input
          type="file"
          accept="image/*"
          id="imgUrl"
          name="imgUrl"
          onChange={handleChange}
          // value={editedPost.imgUrl}
          className="my-1 rounded border border-zinc-400 w-full px-3 py-2 text-sm focus:outline-none"
        />
      </div>
      <div className="flex gap-6 items-center mt-10">
        <label className="font-bold w-1/5" htmlFor="fished_at">
          日付
        </label>
        <input
          type="date"
          id="fished_at"
          name="fished_at"
          onChange={handleChange}
          value={editedPost.fished_at}
          className="my-1 rounded border border-zinc-400 w-full px-3 py-2 text-sm focus:outline-none"
        />
      </div>
      <div className="flex gap-6 items-center">
        <label className="font-bold w-1/5" htmlFor="place">
          場所
        </label>
        <input
          type="text"
          id="place"
          name="place"
          onChange={handleChange}
          value={editedPost.place}
          className="my-1 rounded border border-zinc-400 w-full px-3 py-2 text-sm focus:outline-none flex"
        />
      </div>
      <div className="flex gap-6 items-center">
        <label className="font-bold w-1/5" htmlFor="size">
          重さ・長さ
        </label>
        <input
          type="text"
          id="size"
          name="size"
          onChange={handleChange}
          value={editedPost.size}
          className="my-1 rounded border border-zinc-400 w-full px-3 py-2 text-sm focus:outline-none flex"
        />
      </div>
      <div className="flex gap-6 items-center">
        <label className="font-bold w-1/5" htmlFor="lure">
          ルアー
        </label>
        <input
          type="text"
          id="lure"
          name="lure"
          onChange={handleChange}
          value={editedPost.lure}
          className="my-1 rounded border border-zinc-400 w-full px-3 py-2 text-sm focus:outline-none flex"
        />
      </div>
      <div className="flex gap-6 items-center">
        <label className="font-bold w-1/5" htmlFor="rig">
          リグ
        </label>
        <input
          type="text"
          id="rig"
          name="rig"
          onChange={handleChange}
          value={editedPost.rig}
          className="my-1 rounded border border-zinc-400 w-full px-3 py-2 text-sm focus:outline-none flex"
        />
      </div>
      <div className="flex gap-6 items-center">
        <label className="font-bold w-1/5" htmlFor="reel">
          リール
        </label>
        <input
          type="text"
          id="reel"
          name="reel"
          onChange={handleChange}
          value={editedPost.reel}
          className="my-1 rounded border border-zinc-400 w-full px-3 py-2 text-sm focus:outline-none flex"
        />
      </div>
      <div className="flex gap-6 items-center">
        <label className="font-bold w-1/5" htmlFor="rod">
          ロッド
        </label>
        <input
          type="text"
          id="rod"
          name="rod"
          onChange={handleChange}
          value={editedPost.rod}
          className="my-1 rounded border border-zinc-400 w-full px-3 py-2 text-sm focus:outline-none flex"
        />
      </div>
      <div className="flex gap-6 items-center">
        <label className="font-bold w-1/5" htmlFor="line">
          ライン
        </label>
        <input
          type="text"
          id="line"
          name="line"
          onChange={handleChange}
          value={editedPost.line}
          className="my-1 rounded border border-zinc-400 w-full px-3 py-2 text-sm focus:outline-none flex"
        />
      </div>

      <button
        type="submit"
        className="flex items-center justify-center w-52 px-4 py-2 m-auto mt-5  bg-main-color text-white font-bold text-sm transition-all border border-transparent rounded-md shadow-sm hover:opacity-60"
      >
        {!editedPost.id ? "投稿する" : "更新する"}
      </button>
    </form>
  );
};

export const PostForm = memo(PostFormMemo);
