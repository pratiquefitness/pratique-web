import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  loadingAvatar: false
}

export const areaDoPersonalSlice = createSlice({
  name: 'areaDoPersonal',
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

export const { setLoading, setLoadingAvatar } = areaDoPersonalSlice.actions

export default areaDoPersonalSlice
