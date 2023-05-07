import { Post } from "@/types";
import { db } from "@/utils/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect } from "react";
import { useQueryClient } from "react-query";

export const useSubscribe = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const q = query(collection(db, "posts"));
    let firstSnapshot = true;
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (firstSnapshot) {
        firstSnapshot = false;
        return;
      }
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("added new post ");
          let previousPosts = queryClient.getQueryData<Post[]>(["posts"]);
          if (!previousPosts) {
            previousPosts = [];
          }
          queryClient.setQueryData(
            ["posts"],
            [
              ...previousPosts,
              {
                id: change.doc.id,
                fished_at: change.doc.data().fished_at,
                fished_time: change.doc.data().fished_time,
                place: change.doc.data().place,
                imgUrl: change.doc.data().imgUrl,
                size: change.doc.data().size,
                lure: change.doc.data().lure,
                reel: change.doc.data().reel,
                rod: change.doc.data().rod,
                line: change.doc.data().line,
                rig: change.doc.data().rig,
              },
            ]
          );
        }
        if (change.type === "modified") {
          console.log("update post ");
          let previousPosts = queryClient.getQueryData<Post[]>(["posts"]);
          if (!previousPosts) {
            previousPosts = [];
          }
          queryClient.setQueryData(
            ["posts"],
            previousPosts.map((post) =>
              post.id === change.doc.id
                ? {
                    id: change.doc.id,
                    fished_at: change.doc.data().fished_at,
                    fished_time: change.doc.data().fished_time,
                    place: change.doc.data().place,
                    imgUrl: change.doc.data().imgUrl,
                    size: change.doc.data().size,
                    lure: change.doc.data().lure,
                    reel: change.doc.data().reel,
                    rod: change.doc.data().rod,
                    line: change.doc.data().line,
                    rig: change.doc.data().rig,
                  }
                : post
            )
          );
        }
        if (change.type === "removed") {
          console.log("Removed city: ", change.doc.data());
          let previousPosts = queryClient.getQueryData<Post[]>(["posts"]);
          if (!previousPosts) {
            previousPosts = [];
          }
          queryClient.setQueryData(
            ["posts"],
            previousPosts.filter((post) => post.id !== change.doc.id)
          );
        }
      });
    });
    return () => {
      unsubscribe();
    };
  }, [queryClient]);
};
