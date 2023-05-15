import { useQueryProfile } from "@/hooks/useQueryProfile";
import { ChangeEvent, FC, FormEvent } from "react";
import { Spinner } from "./Spinner";
import { PencilAltIcon, UserCircleIcon } from "@heroicons/react/solid";
import { useModals } from "@/hooks/useModals";
import { ModalLayout } from "./ModalLayout";
import useStore from "@/store/indax";
import { useUploadAvatarImg } from "@/hooks/useUploadAvatarImg";
import { useMutateProfile } from "@/hooks/useMutateProfile";
import Image from "next/image";

export const Profile: FC = () => {
  const { data: profile, isLoading, isError } = useQueryProfile();
  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <div>Error occurred while fetching profile</div>;
  }
  const session = useStore((state) => state.user);
  const update = useStore((state) => state.updateEditedProfile);
  const editedProfile = useStore((state) => state.editedProfile);
  const { Modal, handleModalOpen, handleModalClose } = useModals();
  const { useMutateUploadAvatarImg } = useUploadAvatarImg();
  const { updateProfileMutation } = useMutateProfile();

  const handleChangeProfile = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    update({ ...editedProfile, [name]: value });

    if (e.target.files) {
      const imgUrl = await useMutateUploadAvatarImg(e.target.files[0]);
      update({ ...editedProfile, avatar_url: imgUrl });
    }
    console.log(editedProfile);
  };
  const handleSubmitProfile = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateProfileMutation(editedProfile);
  };
  return (
    <>
      <button
        onClick={() => {
          handleModalOpen();
        }}
      >
        {editedProfile.avatar_url ? (
          <Image
            src={editedProfile.avatar_url}
            alt="avatar"
            width={50}
            height={50}
            className="rounded-full"
          />
        ) : (
          <UserCircleIcon className="h-50 w-50 text-gray-500" />
        )}
      </button>
      <Modal>
        <ModalLayout closeModal={handleModalClose}>
          <form onSubmit={handleSubmitProfile}>
            <div className="">
              <label htmlFor="avatarImg">
                {editedProfile.avatar_url ? (
                  <div className="relative inline-block cursor-pointer">
                    <Image
                      src={editedProfile.avatar_url}
                      alt="avatar"
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <PencilAltIcon className="h-5 w-5 text-blue-600 absolute bottom-0 right-0" />
                  </div>
                ) : (
                  <div className="relative inline-block cursor-pointer">
                    <UserCircleIcon className="h-50 w-50 text-gray-500" />
                    <PencilAltIcon className="h-5 w-5 text-blue-600 absolute bottom-0 right-0" />
                  </div>
                )}
              </label>
              <input
                type="file"
                id="avatarImg"
                className="hidden"
                onChange={handleChangeProfile}
              />
            </div>
            <div className="">
              <label htmlFor="username">表示名</label>
              <input
                id="username"
                name="username"
                type="text"
                value={editedProfile.username}
                onChange={handleChangeProfile}
              />
            </div>
            <div className="">
              <label htmlFor="description">自己紹介</label>
              <input
                id="description"
                name="description"
                type="text"
                value={editedProfile.description}
                onChange={handleChangeProfile}
              />
            </div>
            <button type="submit">保存する</button>
          </form>
        </ModalLayout>
      </Modal>
    </>
  );
};
