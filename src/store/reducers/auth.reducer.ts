import store from "../index";
import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../modules/@shared/interfaces/user.interface";

const initialState = {
  token: ``,
  user: {} as IUser,
};

const { actions: mutations, reducer } = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, { payload }) {
      state.token = payload;
    },
    setUser(state, { payload }) {
      state.user = payload;
    },

    reset(state) {
      state.token = "";
      state.user = {} as IUser;
    },
  },
});

export const authActions = {
  reset: () => store.dispatch(mutations.reset()),
  setToken: (payload: string) => store.dispatch(mutations.setToken(payload)),
  setUser: (payload: IUser) => store.dispatch(mutations.setUser(payload)),
};

export default reducer;
