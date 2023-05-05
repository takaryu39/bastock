export type Post = {
  user_id: string | undefined;
  timestamp: any;
  fished_at: string;
  fished_time: string;
  place: string;
  imgUrl: string;
  size: string;
  lure: string;
  reel: string;
  rod: string;
  line: string;
  rig: string;
};
export type EditedPost = {
  fished_at: string;
  fished_time: string;
  place: string;
  imgUrl: string;
  size: string;
  lure: string;
  reel: string;
  rod: string;
  line: string;
  rig: string;
};
