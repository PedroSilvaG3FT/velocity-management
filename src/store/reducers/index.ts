import { combineReducers } from "@reduxjs/toolkit";

import auth from "./auth.reducer";
import ui from "./ui.reducer";

export const RootStateReducers = { auth, ui };
export default combineReducers(RootStateReducers);
