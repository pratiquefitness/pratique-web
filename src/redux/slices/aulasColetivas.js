import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  loading: true
}

export const aulasColetivasSlice = createSlice({
  name: 'aulasColetivas',
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

export const { setData, setLoading } = aulasColetivasSlice.actions

export default aulasColetivasSlice
