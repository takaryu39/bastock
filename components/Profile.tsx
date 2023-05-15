import { useQueryProfile } from "@/hooks/useQueryProfile";
import { ChangeEvent, FC, FormEvent } from "react";
import { Spinner } from "./Spinner";
import { UserCircleIcon } from "@heroicons/react/solid";
import { useModals } from "@/hooks/useModals";
import { ModalLayout } from "./ModalLayout";
import useStore from "@/store/indax";
import { useUploadAvatarImg } from "@/hooks/useUploadAvatarImg";
import { useMutateProfile } from "@/hooks/useMutateProfile";

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
  };

  return (
    <>
      <button
        onClick={() => {
          handleModalOpen;
          // update({
          //   id: profile.id,
          //   username: profile.username,
          //   avatar_url: profile.avatar_url,
          //   description: profile.description,
          // });
        }}
      >
        <UserCircleIcon className="h-10 w-10 text-gray-500" />
      </button>

      <Modal>
        <ModalLayout closeModal={handleModalClose}>
          <form onSubmit={handleSubmitProfile}>
            <div className="">
              <label htmlFor="avatarImg">
                <UserCircleIcon className="h-10 w-10 text-gray-500" />
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
