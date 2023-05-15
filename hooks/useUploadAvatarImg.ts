import { storage } from "@/utils/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const useUploadAvatarImg = () => {
  //写真が登録されたら実行
  //そのファイル名を取得してfullパスをランダムな文字列に書き換える
  //editedPostのimgUrlをfullパスに入れる
  const useMutateUploadAvatarImg = async (fileData: File) => {
    const file = fileData;
    const fileName = `${Date.now()}-${file.name}`;
    const storageRef = ref(storage, `avatars/${fileName}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
    //ファイル名を参照する、ファイルをアップロードする。ファイルをstateに渡す関数はすべて異なる
  };
  return { useMutateUploadAvatarImg };
};
