import { db } from "@/utils/firebase";
import { collection, getDocs } from "@firebase/firestore";
import { useEffect, useState } from "react";

export const useDownloadAvatarImg = (user_id: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [avatar_url, setAvatarUrl] = useState("");

  useEffect(() => {
    const getAvatarUrl = async () => {
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, "profiles"));
      const profileData = querySnapshot.docs.find(
        (doc) => user_id === doc.data().user_id
      );
      const avatar_url = profileData?.data().avatar_url;
      setAvatarUrl(avatar_url);
      setIsLoading(false);
    };
    getAvatarUrl();
  }, [user_id]);
  return { isLoading, avatar_url };
};
