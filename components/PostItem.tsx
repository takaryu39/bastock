import { useDownloadAvatarImg } from "@/hooks/useDownloadAvatarImg";
import useStore from "@/store/indax";
import Image from "next/image";
import { FC, memo } from "react";
import { Spinner } from "./Spinner";
import {
  PencilAltIcon,
  TrashIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";

type Props = {
  id: string;
  fished_at: string;
  place: string;
  imgUrl: string;
  size: string;
  lure: string;
  reel: string;
  rod: string;
  line: string;
  rig: string;
  user_id: string;
  openModal: () => void;
  deletePostModalOpen: () => void;
};
export const PostItemMemo: FC<Props> = ({
  id,
  fished_at,
  place,
  imgUrl,
  size,
  lure,
  reel,
  rod,
  line,
  rig,
  user_id,
  openModal,
  deletePostModalOpen,
}) => {
  const update = useStore((state) => state.updateEditedPost);
  const deletePost = useStore((state) => state.deleteEditedPost);
  const { isLoading, avatar_url } = useDownloadAvatarImg(user_id);

  return (
    <div className="shadow">
      {imgUrl && (
        <div className="w-full aspect-image relative ">
          <Image
            src={imgUrl}
            width={200}
            height={200}
            alt={`${fished_at}の釣果`}
            className="w-auto h-full  object-cover m-auto"
          />
          <div className="absolute bottom-1 left-1">
            {isLoading ? (
              <Spinner />
            ) : avatar_url ? (
              <Image
                src={avatar_url}
                width={30}
                height={30}
                alt="avatar"
                className="rounded-full"
              />
            ) : (
              <UserCircleIcon className="w-8 h-8 text-zinc-400" />
            )}
          </div>
        </div>
      )}
      <div className="bg-white p-4  rounded">
        <span className="text-sm text-zinc-400">{fished_at}</span>
        <p className="font-bold">{place}</p>
        <p className="font-bold mt-2">{size}</p>
        <p className="font-bold mt-2">タックル</p>
        <dl className="flex items-center">
          <dt className="font-bold text-xs  w-1/5">ルアー</dt>
          <dd className="text-xs">{lure}</dd>
        </dl>
        <dl className="flex items-center">
          <dt className="font-bold text-xs  w-1/5">ロッド</dt>
          <dd className="text-xs">{rod}</dd>
        </dl>
        <dl className="flex items-center">
          <dt className="font-bold text-xs  w-1/5">リール</dt>
          <dd className="text-xs">{reel}</dd>
        </dl>
        <dl className="flex items-center">
          <dt className="font-bold text-xs  w-1/5">ライン</dt>
          <dd className="text-xs">{line}</dd>
        </dl>
        <dl className="flex items-center">
          <dt className="font-bold text-xs  w-1/5">ルアー</dt>
          <dd className="text-xs">{lure}</dd>
        </dl>
        <dl className="flex items-center">
          <dt className="font-bold text-xs  w-1/5">リグ</dt>
          <dd className="text-xs">{rig}</dd>
        </dl>
        <div className="flex gap-2 items-center mt-2 justify-end">
          <button
            onClick={() => {
              update({
                id: id,
                fished_at: fished_at,
                place: place,
                imgUrl: imgUrl,
                size: size,
                lure: lure,
                reel: reel,
                rod: rod,
                line: line,
                rig: rig,
              });

              openModal();
              // console.log(editedPost);
            }}
          >
            <PencilAltIcon className="w-5 h-5 text-main-color" />
          </button>
          <button
            onClick={() => {
              deletePost(id);
              deletePostModalOpen();
            }}
          >
            <TrashIcon className="w-5 h-5 text-main-color" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const PostItem = memo(PostItemMemo);
