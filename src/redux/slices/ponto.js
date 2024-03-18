import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  loading: false
}

export const pontoSlice = createSlice({
  name: 'ponto',
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

export const { setData, setLoading } = pontoSlice.actions

export default pontoSlice
