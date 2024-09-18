import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: true
};

export const unipowerSlice = createSlice({
  name: "unipower",
  initialState,
  reducers: {
    setData(state, action) {
      return { ...state, data: action.payload };
    },
    setLoading(state, action) {
      return { ...state, loading: action.payload };
    }
  }
});

export const { setData, setLoading } = unipowerSlice.actions;

export default unipowerSlice;
