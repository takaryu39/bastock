import useStore from "@/store/indax";
import { Post } from "@/types";
import { db } from "@/utils/firebase";
import { log } from "console";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
export const useMutatePost = () => {
  const session = useStore((state) => state.user);

  const createPostMutation = async (
    post: Omit<Post, "user_id" | "timestamp">
  ) => {
    try {
      const postRef = doc(collection(db, "posts"));
      await setDoc(postRef, {
        user_id: session?.uid,
        timestamp: serverTimestamp(),
        fished_at: post.fished_at,
        fished_time: post.fished_time,
        place: post.place,
        imgUrl: post.imgUrl,
        size: post.size,
        lure: post.lure,
        reel: post.reel,
        rod: post.rod,
        line: post.line,
        rig: post.rig,
      });
      //   await addDoc(collection(db, "posts"), {
      //     user_id: session?.uid,
      //     timestamp: serverTimestamp(),
      //     fished_at: post.fished_at,
      //     fished_time: post.fished_time,
      //     place: post.place,
      //     imgUrl: post.imgUrl,
      //     size: post.size,
      //     lure: post.lure,
      //     reel: post.reel,
      //     rod: post.rod,
      //     line: post.line,
      //     rig: post.rig,
      //   });
      alert("登録に成功しました。");
    } catch (error: any) {
      alert("登録に失敗しました。リーロードしてもう一度送信してください。");
    }
  };
  const updatePostMutation = async () => {
    const washingtonRef = doc(db, "posts");
    console.log(washingtonRef);

    // Set the "capital" field of the city 'DC'
    // await updateDoc(washingtonRef, {
    //   capital: true
    // });
  };

  return { createPostMutation, updatePostMutation };
};
