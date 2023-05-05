import { useMutatePost } from "@/hooks/useMutatePost";
import useStore from "@/store/indax";
import { log } from "console";
import { useEffect, useState } from "react";

const PostInput = () => {
  const { createPostMutation, updatePostMutation } = useMutatePost();
  const editedPost = useStore((state) => state.editedPost);
  const update = useStore((state) => state.updateEditedPost);
  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    update({ ...editedPost, [name]: value });
    console.log(editedPost);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createPostMutation(editedPost);
  };

  useEffect(() => {
    console.log(updatePostMutation);
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fished_at">Fished At:</label>
        <input
          type="date"
          id="fished_at"
          name="fished_at"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="fished_time">Fished Time:</label>
        <input
          type="time"
          id="fished_time"
          name="fished_time"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="place">Place:</label>
        <input type="text" id="place" name="place" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="imgUrl">Image URL:</label>
        <input type="text" id="imgUrl" name="imgUrl" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="size">Size:</label>
        <input type="text" id="size" name="size" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="lure">Lure:</label>
        <input type="text" id="lure" name="lure" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="reel">Reel:</label>
        <input type="text" id="reel" name="reel" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="rod">Rod:</label>
        <input type="text" id="rod" name="rod" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="line">Line:</label>
        <input type="text" id="line" name="line" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="rig">Rig:</label>
        <input type="text" id="rig" name="rig" onChange={handleChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PostInput;
