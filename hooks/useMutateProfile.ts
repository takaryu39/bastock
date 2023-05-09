import useStore from "@/store/indax";
import { EditedProfile, Profile } from "@/types";
import { db } from "@/utils/firebase";
import { updateProfile } from "firebase/auth";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";

export const useMutateProfile = () => {
  // const editedProfile = useStore((state)=>state.editedProfile)
  const reset = useStore((state) => state.resetEditedProfile);
  // const updateProfile = useStore((state)=>state.updateEditedProfile)
  //ログインしたユーザーのidを渡す
  const createProfile = async (user_id: string) => {
    try {
      const profileRef = doc(collection(db, "profiles"));
      await setDoc(profileRef, {
        id: user_id,
        username: "",
        avatar_url: "",
        description: "",
      });
      alert("登録に成功しました。");
      reset();
    } catch (error: any) {
      alert("登録に失敗しました。リーロードしてもう一度送信してください。");
      reset();
    }
  };
  const updateProfile = async (profile: Profile) => {
    try {
      const newRef = doc(db, "profiles", profile.id);
      await updateDoc(newRef, {
        username: profile.username,
        avatar_url: profile.avatar_url,
        description: profile.description,
      });
      reset();
    } catch (error: any) {
      alert("更新に失敗しました。もう一度更新してください。");
      reset();
    }
  };

  return {
    createProfile,
    updateProfile,
  };
};
