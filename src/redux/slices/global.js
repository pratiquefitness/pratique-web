import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  themeColor: "red",
  themeMode: "light",
  browserURL: null
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsAuthenticated(state, action) {
      return {
        ...state,
        isAuthenticated: action.payload
      };
    },
    setThemeColor(state, action) {
      return {
        ...state,
        themeColor: action.payload
      };
    },
    setThemeMode(state, action) {
      return {
        ...state,
        themeMode: action.payload
      };
    },
    setBrowserURL(state, action) {
      return {
        ...state,
        browserURL: action.payload
      };
    }
  }
});

export const { setIsAuthenticated, setThemeColor, setThemeMode, setBrowserURL } =
  globalSlice.actions;

export default globalSlice;
