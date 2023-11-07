import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    getUserInfo: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { getUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
