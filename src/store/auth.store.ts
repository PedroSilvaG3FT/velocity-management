import { createStore } from "./_base.store";
import { IUser } from "@/modules/@shared/firebase/interfaces/user.interface";

interface State {
  user: IUser;
  firebaseToken: string;
  firebaseRefreshToken: string;

  reset: () => void;
  setUser: (value: IUser) => void;
  setFirebaseToken: (value: string) => void;
  setFirebaseRefreshToken: (value: string) => void;
}

export default createStore<State>({
  name: "auth",
  state: (set) => ({
    user: {} as IUser,
    firebaseToken: "",
    firebaseRefreshToken: "",

    setUser: (user) => set(() => ({ user })),
    setFirebaseToken: (firebaseToken) => set(() => ({ firebaseToken })),
    setFirebaseRefreshToken: (firebaseRefreshToken) =>
      set(() => ({ firebaseRefreshToken })),

    reset: () => {
      set(() => ({
        user: {} as IUser,
        firebaseToken: "",
        firebaseRefreshToken: "",
      }));
    },
  }),
});
