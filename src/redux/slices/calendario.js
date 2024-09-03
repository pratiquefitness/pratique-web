import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  loading: true
}

export const calendarioSlice = createSlice({
  name: 'calendario',
  initialState,
  reducers: {
    setData(state, action) {
      return { ...state, data: action.payload }
    },
    setLoading(state, action) {
      return { ...state, loading: action.payload }
    }
  }
})

export const { setData, setLoading } = calendarioSlice.actions

export default calendarioSlice
