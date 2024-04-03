import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  loading: true
}

export const diagnoseSlice = createSlice({
  name: 'diagnose',
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

export const { setData, setLoading } = diagnoseSlice.actions

export default diagnoseSlice
