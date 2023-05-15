export type Post = {
  id: string;
  user_id: string | undefined;
  timestamp: any;
  fished_at: string;
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
};
export type Profile = {
  id: string;
  user_id: string;
  username: string;
  avatar_url: string;
  description: string;
};
export type EditedProfile = {
  id: string;
  username: string | undefined;
  avatar_url: string | undefined;
  description: string | undefined;
};
