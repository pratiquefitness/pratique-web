import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  loadingAvatar: false,
  loadingIsPersonal: false,
  loadingAlunosPersonal: false,
  isPersonal: false,
  alunosPersonal: [],
  vincularAluno: [],
}

export const contaSlice = createSlice({
  name: 'conta',
  initialState,
  reducers: {
    setLoading(state, action) {
      return { ...state, loading: action.payload }
    },
    setLoadingAvatar(state, action) {
      return { ...state, loadingAvatar: action.payload }
    },
    setLoadingIsPersonal(state, action) {
      return { ...state, loadingIsPersonal: action.payload }
    },
    setIsPersonal(state, action) {
      return { ...state, isPersonal: action.payload }
    },
    setLoadingAlunosPersonal(state, action) {
      return { ...state, loadingAlunosPersonal: action.payload }
    },
    setAlunosPersonal(state, action) {
      return { ...state, alunosPersonal: action.payload }
    },
    setVincularAluno(state, action) {
      return { ...state, vincularAluno: action.payload }
    },
  }
})

export const {
  setLoading,
  setLoadingAvatar,
  setIsPersonal,
  setLoadingIsPersonal,
  setLoadingAlunosPersonal,
  setAlunosPersonal,
  setVincularAluno,
} = contaSlice.actions

export default contaSlice
