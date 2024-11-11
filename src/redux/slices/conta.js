import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  loadingAvatar: false,
  loadingIsPersonal: false,
  loadingAlunosPersonal: false,
  loadingPersonal: false,
  isPersonal: false,
  alunosPersonal: [],
  vincularAluno: [],
  dadosAluno: {},
  meuPersonal: []
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
    setDadosAluno(state, action) {
      return { ...state, dadosAluno: action.payload }
    },
    setLoadingPersonal(state, action) {
      return { ...state, loadingPersonal: action.payload }
    },
    setMeuPersonal(state, action) {
      return { ...state, meuPersonal: action.payload }
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
  setDadosAluno,
  setVincularAluno,
  setLoadingPersonal,
  setMeuPersonal
} = contaSlice.actions

export default contaSlice
