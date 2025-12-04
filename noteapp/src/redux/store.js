import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../redux/RegisterSlice";
import LoginReducer from "../redux/LoginSlice";

export const store = configureStore({
  reducer: {
    notes: registerReducer,
    login: LoginReducer,
  },
});
