import { EditedPost, EditedProfile } from "@/types";
import firebase from "firebase/app";
import { create } from "zustand";
import { User } from "firebase/auth";

type State = {
  user: User | null;
  setUser: (user: User | null) => void;
  editedProfile: EditedProfile;
  editedPost: EditedPost;
  updateEditedProfile: (payload: EditedProfile) => void;
  resetEditedProfile: () => void;
  updateEditedPost: (payload: EditedPost) => void;
  deleteEditedPost: (payload: string) => void;
  resetEditedPost: () => void;
};

const useStore = create<State>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  editedProfile: {
    username: "",
    avatar_url: "",
    description: "",
  },
  updateEditedProfile: (payload) =>
    set({
      editedProfile: {
        username: payload.username,
        avatar_url: payload.avatar_url,
        description: payload.description,
      },
    }),
  resetEditedProfile: () =>
    set({
      editedProfile: {
        username: "",
        avatar_url: "",
        description: "",
      },
    }),
  editedPost: {
    id: "",
    fished_at: "",
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
        id: payload.id,
        fished_at: payload.fished_at,
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
  deleteEditedPost: (payload) =>
    set({
      editedPost: {
        id: payload,
        fished_at: "",
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
  resetEditedPost: () =>
    set({
      editedPost: {
        id: "",
        fished_at: "",
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
