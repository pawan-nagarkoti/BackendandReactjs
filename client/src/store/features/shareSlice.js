import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
  loginUserData: JSON.parse(localStorage.getItem("loginUserData")) || null,
  profilePicUpdate: false,
  // loginUserData: null,
};

export const shareSlice = createSlice({
  name: "share",
  initialState,
  reducers: {
    logoutUser: (state, action) => {
      state.value += action.payload;
    },
    loginUserDetail: (state, action) => {
      state.loginUserData = action.payload;
      localStorage.setItem("loginUserData", JSON.stringify(action.payload));
    },
    checkProfileUpdate: (state, action) => {
      state.profilePicUpdate = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { logoutUser, loginUserDetail, checkProfileUpdate } =
  shareSlice.actions;

export default shareSlice.reducer;
