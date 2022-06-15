import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    isSuccess: false,
    // errorMsg: null
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.currentUser = action.payload;
      // state.errorMsg = null;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.isSuccess = false;
      // state.errorMsg = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("jg_admin");
      state.currentUser = null;
      state.isSuccess = false;
    }
  }
})

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions
export default userSlice.reducer;