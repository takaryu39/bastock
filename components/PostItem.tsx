import useStore from "@/store/indax";
import { Post } from "@/types";
import Image from "next/image";
import { FC, memo } from "react";

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
  openModal,
  deletePostModalOpen,
}) => {
  const update = useStore((state) => state.updateEditedPost);
  const deletePost = useStore((state) => state.deleteEditedPost);

  return (
    <div className="">
      {imgUrl && (
        <div className="">
          <Image
            src={imgUrl}
            width={200}
            height={200}
            alt={`${fished_at}の釣果`}
          />
        </div>
      )}
      <div className="bg-white p-4 shadow-sm rounded">
        <dl className="flex items-center gap-3">
          <dt className="font-bold">日付</dt>
          <dd>{fished_at}</dd>
        </dl>
        <dl className="flex items-center gap-3">
          <dt className="font-bold">場所</dt>
          <dd>{place}</dd>
        </dl>
        <dl className="flex items-center gap-3">
          <dt className="font-bold">重さ・長さ</dt>
          <dd>{size}</dd>
        </dl>
        <dl className="flex items-center gap-3">
          <dt className="font-bold">ルアー</dt>
          <dd>{lure}</dd>
        </dl>
        <dl className="flex items-center gap-3">
          <dt className="font-bold">ロッド</dt>
          <dd>{rod}</dd>
        </dl>
        <dl className="flex items-center gap-3">
          <dt className="font-bold">リール</dt>
          <dd>{reel}</dd>
        </dl>
        <dl className="flex items-center gap-3">
          <dt className="font-bold">ライン</dt>
          <dd>{line}</dd>
        </dl>
        <dl className="flex items-center gap-3">
          <dt className="font-bold">ルアー</dt>
          <dd>{lure}</dd>
        </dl>
        <dl className="flex items-center gap-3">
          <dt className="font-bold">リグ</dt>
          <dd>{rig}</dd>
        </dl>
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
          編集する
        </button>
        <button
          onClick={() => {
            deletePost(id);
            deletePostModalOpen();
          }}
        >
          削除する
        </button>
      </div>
    </div>
  );
};

export const PostItem = memo(PostItemMemo);
