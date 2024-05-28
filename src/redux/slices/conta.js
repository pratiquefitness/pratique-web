import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  loadingAvatar: false,
  loadingIsPersonal: false,
  isPersonal: false,
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
  }
})

export const {
  setLoading,
  setLoadingAvatar,
  setIsPersonal,
  setLoadingIsPersonal
} = contaSlice.actions

export default contaSlice
