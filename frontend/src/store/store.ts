import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type AuthState = {
  accessToken: string | null;
  user: null;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
};

const createUserSlice: StateCreator<AuthState> = (set) => ({
  accessToken: null,
  user: null,
  setAccessToken: (token: string) => set({ accessToken: token }),
  clearAccessToken: () => set({ accessToken: null }),
});

type StoreType = AuthState;

export const useStore = create<StoreType>()(
  devtools(
    persist(
      immer((...a) => ({
        ...createUserSlice(...a),
      })),

      {
        name: "session-storage", // Name of the item in localStorage (or sessionStorage)
        getStorage: () => sessionStorage, // (optional) by default it's localStorage
      }
    )
  )
);
