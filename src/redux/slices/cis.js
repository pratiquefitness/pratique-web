import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: {
    disponiveis: [],
    anteriores: []
  },
  loading: true
}

export const cisSlice = createSlice({
  name: 'cis',
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

export const { setData, setLoading } = cisSlice.actions

export default cisSlice
