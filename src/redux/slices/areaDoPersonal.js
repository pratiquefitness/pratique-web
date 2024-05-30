import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  banner: []
}

export const areaDoPersonalSlice = createSlice({
  name: 'areaDoPersonal',
  initialState,
  reducers: {
    setLoading(state, action) {
      return { ...state, loading: action.payload }
    },
    setBanner(state, action) {
      return { ...state, banner: action.payload }
    }
  }
})

export const { setLoading, setBanner } = areaDoPersonalSlice.actions

export default areaDoPersonalSlice
