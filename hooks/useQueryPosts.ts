import { Post } from "@/types";
import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useQuery } from "react-query";

type PostData = Omit<Post, "id">;

export const useQueryPosts = () => {
  const getPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const postsArray: Post[] = [];
    querySnapshot.forEach((doc) => {
      postsArray.push({ id: doc.id, ...(doc.data() as PostData) });
    });

    return postsArray;
  };
  return useQuery("posts", getPosts, {
    staleTime: Infinity,
  });
};
