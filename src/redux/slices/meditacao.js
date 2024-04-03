import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  loading: true
}

export const meditacaoSlice = createSlice({
  name: 'meditacao',
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

export const { setData, setLoading } = meditacaoSlice.actions

export default meditacaoSlice
