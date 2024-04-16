import store from "../index";
import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../modules/@shared/interfaces/user.interface";

const initialState = {
  user: {} as IUser,
  firebaseToken: ``,
  firebaseRefreshToken: ``,
};

const { actions: mutations, reducer } = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setFirebaseToken(state, { payload }) {
      state.firebaseToken = payload;
    },
    setFirebaseRefreshToken(state, { payload }) {
      state.firebaseRefreshToken = payload;
    },
    setUser(state, { payload }) {
      state.user = payload;
    },
    reset(state) {
      state.firebaseToken = "";
      state.user = {} as IUser;
    },
  },
});

export const authActions = {
  reset: () => store.dispatch(mutations.reset()),
  setUser: (payload: IUser) => store.dispatch(mutations.setUser(payload)),
  setFirebaseToken: (payload: string) =>
    store.dispatch(mutations.setFirebaseToken(payload)),
  setFirebaseRefreshToken: (payload: string) =>
    store.dispatch(mutations.setFirebaseRefreshToken(payload)),
};

export default reducer;
