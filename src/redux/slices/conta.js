import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  loadingAvatar: false
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
    }
  }
})

export const { setLoading, setLoadingAvatar } = contaSlice.actions

export default contaSlice
