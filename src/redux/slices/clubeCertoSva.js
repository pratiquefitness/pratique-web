import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  svaClientParameters: {},
  loading: true
};

export const clubeCertoSvaSlice = createSlice({
  name: "clubeCertoSva",
  initialState,
  reducers: {
    setSvaClientParameters(state, action) {
      state.svaClientParameters = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    }
  }
});

export const { setSvaClientParameters, setLoading } = clubeCertoSvaSlice.actions;

export default clubeCertoSvaSlice.reducer;
