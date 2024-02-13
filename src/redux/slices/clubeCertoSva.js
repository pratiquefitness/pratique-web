import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  svaData: {},
  loading: true
}

export const clubeCertoSvaSlice = createSlice({
  name: 'clubeCertoSva',
  initialState,
  reducers: {
    setSvaData(state, action) {
      return { ...state, svaData: action.payload }
    },
    setLoading(state, action) {
      return { ...state, loading: action.payload }
    }
  }
})

export const { setSvaData, setLoading } = clubeCertoSvaSlice.actions

export default clubeCertoSvaSlice
