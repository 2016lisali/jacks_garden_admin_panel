import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
  },
  reducers: {
    loginUser: (state, action) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("jg_admin");
      state.currentUser = null;
    }
  }
})

export const { loginUser, logout } = userSlice.actions
export default userSlice.reducer;