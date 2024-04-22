import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { User } from "@react-native-google-signin/google-signin";
import { create } from "zustand";

export type userCredential = FirebaseAuthTypes.UserCredential;

type Auth = {
  user: userCredential | null;
  setUser: (user: userCredential | null) => void;
};

const useAuth = create<Auth>()((set) => ({
  user: null,
  setUser: (user: userCredential | null) => set((state) => ({ user: user })),
}));

export default useAuth;
