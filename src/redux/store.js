import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer.js";

export const store = configureStore({
    reducer: userReducer,
});
