import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  loading: true,
  loadingPeso: false,
  loadingAnotacoes: false
}

export const treinoSlice = createSlice({
  name: 'treino',
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
    setLoadingAnotacoes(state, action) {
      return { ...state, loadingAnotacoes: action.payload }
    }
  }
})

export const { setData, setLoading, setLoadingPeso, setLoadingAnotacoes } = treinoSlice.actions

export default treinoSlice
