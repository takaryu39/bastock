import useStore from "@/store/indax";
import { EditedPost, Post } from "@/types";
import { db } from "@/utils/firebase";
import { log } from "console";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
export const useMutatePost = () => {
  const session = useStore((state) => state.user);
  const reset = useStore((state) => state.resetEditedPost);

  const createPostMutation = async (
    post: Omit<Post, "id" | "user_id" | "timestamp">
  ) => {
    try {
      const postRef = doc(collection(db, "posts"));
      await setDoc(postRef, {
        user_id: session?.uid,
        timestamp: serverTimestamp(),
        fished_at: post.fished_at,
        place: post.place,
        imgUrl: post.imgUrl,
        size: post.size,
        lure: post.lure,
        reel: post.reel,
        rod: post.rod,
        line: post.line,
        rig: post.rig,
      });

      alert("登録に成功しました。");
      reset();
    } catch (error: any) {
      alert("登録に失敗しました。リーロードしてもう一度送信してください。");
      reset();
    }
  };
  1;
  const updatePostMutation = async (post: EditedPost) => {
    try {
      const newRef = doc(db, "posts", post.id);

      await updateDoc(newRef, {
        fished_at: post.fished_at,
        place: post.place,
        imgUrl: post.imgUrl,
        size: post.size,
        lure: post.lure,
        reel: post.reel,
        rod: post.rod,
        line: post.line,
        rig: post.rig,
      });
      reset();
    } catch (error: any) {
      alert("更新に失敗しました。もう一度更新してください。");
      reset();
    }
  };
  const deletePostMutation = async (id: string) => {
    try {
      await deleteDoc(doc(db, "posts", id));
      reset();
    } catch (error: any) {
      alert("削除に失敗しました。もう一度削除してください。");
      reset();
    }
  };

  return { createPostMutation, updatePostMutation, deletePostMutation };
};
