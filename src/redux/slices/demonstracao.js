import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  loading: true,
  loadingPeso: false,
}

export const demonstracaoSlice = createSlice({
  name: 'demonstracao',
  initialState,
  reducers: {
    setData(state, action) {
      return { ...state, data: action.payload }
    },
    setLoading(state, action) {
      return { ...state, loading: action.payload }
    },
    setLoadingPeso(state, action) {
      return { ...state, loadingPeso: action.payload }
    },
  }
})

export const { setData, setLoading, setLoadingPeso } = demonstracaoSlice.actions

export default demonstracaoSlice
