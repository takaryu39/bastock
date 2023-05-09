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
  username: string | undefined;
  avatar_url: string | undefined;
  description: string | undefined;
};
export type EditedProfile = {
  username: string | undefined;
  avatar_url: string | undefined;
  description: string | undefined;
};
