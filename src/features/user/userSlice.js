import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const userProfileData = cookies.get("user_profile");

const initialState = {
  user: userProfileData || null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      cookies.remove("token");
      cookies.remove("user_profile");
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
