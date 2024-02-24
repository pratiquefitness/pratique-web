import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: true,
  loadingPeso: false,
}

export const demonstracaoSlice = createSlice({
  name: 'demonstracao',
  initialState,
  reducers: {
    setLoading(state, action) {
      return { ...state, loading: action.payload }
    },
    setLoadingPeso(state, action) {
      return { ...state, loadingPeso: action.payload }
    },
  }
})

export const { setLoading, setLoadingPeso } = demonstracaoSlice.actions

export default demonstracaoSlice
