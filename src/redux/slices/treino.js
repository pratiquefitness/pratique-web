import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  loading: true,
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
    setLoadingAnotacoes(state, action) {
      return { ...state, loadingAnotacoes: action.payload }
    }
  }
})

export const { setData, setLoading, setLoadingAnotacoes } = treinoSlice.actions

export default treinoSlice
