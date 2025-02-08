import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";
import localStorageUtil from "../../utils/localstorageutils";

const cookies = new Cookies();

const userProfileData = localStorageUtil.getItem("user_profile");

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
      localStorageUtil.removeItem("token");
      localStorageUtil.removeItem("user_profile");
      localStorageUtil.removeItem("rpev");

      // const user = cookies.get("user_profile");

      // console.log(user);
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
