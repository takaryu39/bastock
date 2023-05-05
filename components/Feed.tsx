import { useMutateAuth } from "@/hooks/useMutateAuth";
import { useMutatePost } from "@/hooks/useMutatePost";
import PostInput from "./PostInput";
const Feed = () => {
  const { logout } = useMutateAuth();
  return (
    <>
      <button onClick={logout}>ログアウトする</button>
      <PostInput />
    </>
  );
};

export default Feed;
