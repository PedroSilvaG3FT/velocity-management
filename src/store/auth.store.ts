import { IUser } from "@/modules/@shared/interfaces/user.interface";
import { createStore } from "./_base.store";

interface State {
  user: IUser;
  token: string;

  reset: () => void;
  setUser: (value: IUser) => void;
  setToken: (value: string) => void;
}

export default createStore<State>({
  name: "auth",
  state: (set) => ({
    user: {} as IUser,
    token: "",

    setUser: (user) => set(() => ({ user })),
    setToken: (token) => set(() => ({ token })),

    reset: () => {
      set(() => ({
        user: {} as IUser,
        token: "",
      }));
    },
  }),
});
