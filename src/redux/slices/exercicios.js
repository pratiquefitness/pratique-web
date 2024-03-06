import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: true,
  treinoLivre: [],
  listarTreino: []
}

export const exerciciosSlice = createSlice({
  name: 'exercicios',
  initialState,
  reducers: {
    setLoading(state, action) {
      return { ...state, loading: action.payload }
    },
    setTreinoLivre(state, action) {
      return { ...state, treinoLivre: action.payload }
    },
    setListarTreino(state, action) {
      return { ...state, listarTreino: action.payload }
    },
  }
})

export const { setLoading, setTreinoLivre, setListarTreino } = exerciciosSlice.actions

export default exerciciosSlice
