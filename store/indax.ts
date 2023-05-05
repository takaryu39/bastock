import { EditedPost } from "@/types";
import firebase from "firebase/app";
import { create } from "zustand";
import { User } from "firebase/auth";

type State = {
  user: User | null;
  setUser: (user: User | null) => void;
  editedPost: EditedPost;
  updateEditedPost: (payload: EditedPost) => void;
  resetEditedPost: () => void;
};

const useStore = create<State>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  editedPost: {
    fished_at: "",
    fished_time: "",
    place: "",
    imgUrl: "",
    size: "",
    lure: "",
    reel: "",
    rod: "",
    line: "",
    rig: "",
  },
  updateEditedPost: (payload) =>
    set({
      editedPost: {
        fished_at: payload.fished_at,
        fished_time: payload.fished_time,
        place: payload.place,
        imgUrl: payload.imgUrl,
        size: payload.size,
        lure: payload.lure,
        reel: payload.reel,
        rod: payload.rod,
        line: payload.line,
        rig: payload.rig,
      },
    }),
  resetEditedPost: () =>
    set({
      editedPost: {
        fished_at: "",
        fished_time: "",
        place: "",
        imgUrl: "",
        size: "",
        lure: "",
        reel: "",
        rod: "",
        line: "",
        rig: "",
      },
    }),
}));

export default useStore;
