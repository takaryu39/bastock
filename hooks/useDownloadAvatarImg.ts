import { storage } from "@/utils/firebase";
import { ref } from "@firebase/storage";
import { async } from "@firebase/util";

export const useDownloadAvatarImg = async (user_id: string) => {
  //profilesをfillterしてuseridが一致したら、imgUrlにprofile.avatar_urlを代入し
  // const imageUrl = await ref(storage, fullPath);
  //上記をreturn

  return {};
};
