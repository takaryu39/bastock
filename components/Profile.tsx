import { ChangeEvent, FC, FormEvent } from "react";
import { PencilAltIcon, UserCircleIcon } from "@heroicons/react/solid";
import { useModals } from "@/hooks/useModals";
import { ModalLayout } from "./ModalLayout";
import useStore from "@/store/indax";
import { useUploadAvatarImg } from "@/hooks/useUploadAvatarImg";
import { useMutateProfile } from "@/hooks/useMutateProfile";
import Image from "next/image";

export const Profile: FC = () => {
  const update = useStore((state) => state.updateEditedProfile);
  const editedProfile = useStore((state) => state.editedProfile);
  const { Modal, handleModalOpen, handleModalClose } = useModals();
  const { mutateUploadAvatarImg } = useUploadAvatarImg();
  const { updateProfileMutation } = useMutateProfile();

  const handleChangeProfile = async (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    update({ ...editedProfile, [name]: value });

    if (e.target instanceof HTMLInputElement && e.target.files) {
      const imgUrl = await mutateUploadAvatarImg(e.target.files[0]);
      update({ ...editedProfile, avatar_url: imgUrl });
    }
  };

  const handleSubmitProfile = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateProfileMutation(editedProfile);
    handleModalClose();
  };

  return (
    <>
      <button
        onClick={() => {
          handleModalOpen();
        }}
        className="w-10 h-10"
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
          <UserCircleIcon className="h-50 w-50 text-zinc-400" />
        )}
      </button>
      <Modal>
        <ModalLayout closeModal={handleModalClose} title={"プロフィール"}>
          <form onSubmit={handleSubmitProfile}>
            <div className="">
              <label htmlFor="avatarImg">
                {editedProfile.avatar_url ? (
                  <div className="relative m-auto cursor-pointer  w-72 h-72">
                    <Image
                      src={editedProfile.avatar_url}
                      alt="avatar"
                      width={50}
                      height={50}
                      sizes="100vw"
                      style={{
                        width: "100%",
                        height: "auto",
                      }}
                      className="rounded-full"
                    />
                    <PencilAltIcon className="h-5 w-5 text-zinc-400 absolute bottom-0 right-0" />
                  </div>
                ) : (
                  <div className="relative m-auto cursor-pointer w-72 h-72">
                    <UserCircleIcon className="h-50 w-50 text-zinc-400" />
                    <PencilAltIcon className="h-5 w-5 text-zinc-400 absolute bottom-0 right-0" />
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
            <div className="w-full flex flex-col gap-2 mb-6">
              <label htmlFor="username" className="font-bold ">
                表示名
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={editedProfile.username}
                onChange={handleChangeProfile}
                className="my-1 rounded border border-zinc-400 px-3 py-2 text-sm focus:outline-none"
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="description" className="font-bold ">
                自己紹介
              </label>
              <textarea
                id="description"
                name="description"
                value={editedProfile.description}
                onChange={handleChangeProfile}
                className="my-1 rounded border border-zinc-400 px-3 py-2 text-sm focus:outline-none h-56"
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center  px-4 py-2 m-auto mt-5  bg-main-color text-white text-sm transition-all border border-transparent rounded-md shadow-sm hover:opacity-60"
            >
              プロフィールを更新する
            </button>
          </form>
        </ModalLayout>
      </Modal>
    </>
  );
};
