import { createSlice } from '@reduxjs/toolkit'
// import { parseCookies } from 'nookies'
// import { tokenName } from '@/contexts/AuthContext'

// const { [tokenName]: token } = parseCookies()

const initialState = {
  usuario: {},
  loading: false,
  authenticated: false,
  modalRegister: false,
  modalRecovery: false,
  modalRecoveryStep: 0,
  modalRecoveryData: {}
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogin(state, action) {
      return { ...state, usuario: action.payload, authenticated: true, loading: false }
    },
    setLoading(state, action) {
      return { ...state, loading: action.payload }
    },
    setAuthenticated(state) {
      return { ...state, authenticated: true, loading: false }
    },
    unsetLogin(state) {
      return { ...state, usuario: {}, authenticated: false, loading: false }
    },
    setModalRegister(state, action) {
      return { ...state, modalRegister: action.payload }
    },
    setModalRecovery(state, action) {
      return { ...state, modalRecovery: action.payload }
    },
    setModalRecoveryStep(state, action) {
      return { ...state, modalRecoveryStep: action.payload }
    },
    setModalRecoveryData(state, action) {
      return { ...state, modalRecoveryData: action.payload }
    },
    resetModalRecovery(state) {
      return {
        ...state,
        modalRecovery: initialState.modalRecovery,
        modalRecoveryStep: initialState.modalRecoveryStep,
        modalRecoveryData: initialState.modalRecoveryData
      }
    }
  }
})

export const {
  setLogin,
  setLoading,
  setAuthenticated,
  unsetLogin,
  setModalRegister,
  setModalRecovery,
  setModalRecoveryData,
  setModalRecoveryStep,
  resetModalRecovery
} = loginSlice.actions

export default loginSlice
