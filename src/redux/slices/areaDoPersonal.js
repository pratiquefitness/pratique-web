// src/redux/slices/areaDoPersonal.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  banner: []
};

export const areaDoPersonalSlice = createSlice({
  name: "areaDoPersonal",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setBanner(state, action) {
      state.banner = action.payload;
    }
  }
});

export const { setLoading, setBanner } = areaDoPersonalSlice.actions;

export default areaDoPersonalSlice.reducer; // Certifique-se de exportar o reducer
