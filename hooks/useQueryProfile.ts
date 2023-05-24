import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useQuery } from "react-query";
import useStore from "@/store/indax";
import { Profile } from "@/types";
type ProfileData = Omit<Profile, "id">;

export const useQueryProfile = () => {
  const session = useStore((state) => state.user);
  const update = useStore((state) => state.updateEditedProfile);
  const userId = session?.uid;
  const getProfile = async () => {
    console.log("実行");

    if (!userId) {
      return null;
    }
    const querySnapshot = await getDocs(collection(db, "profiles"));
    const profileData = querySnapshot.docs.find(
      (doc) => userId === doc.data().user_id
    );
    const profile = profileData
      ? { id: profileData.id, ...(profileData.data() as ProfileData) }
      : null;

    return profile;
  };
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    staleTime: Infinity,
    enabled: !!userId,
    onSuccess: (profile) => {
      if (profile) {
        update({
          id: profile.id,
          username: profile.username,
          avatar_url: profile.avatar_url,
          description: profile.description,
        });
      }
    },
  });
};
