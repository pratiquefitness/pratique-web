import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  loading: true
}

export const treinoSlice = createSlice({
  name: 'treino',
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

export const { setData, setLoading } = treinoSlice.actions

export default treinoSlice
