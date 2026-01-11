import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, refreshToken, user } = action.payload;

      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.user = user;

      // persist
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    },

    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
