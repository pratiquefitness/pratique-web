import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: {
    disponiveis: [],
    anteriores: [],
  },
  coordenadaUnidade: {},
  loading: true
}

export const cisSlice = createSlice({
  name: 'cis',
  initialState,
  reducers: {
    setData(state, action) {
      return { ...state, data: action.payload }
    },
    setCoordenada(state, action) {
      return { ...state, coordenadaUnidade: action.payload }
    },
    setLoading(state, action) {
      return { ...state, loading: action.payload }
    }
  }
})

export const { setData, setLoading, setCoordenada } = cisSlice.actions

export default cisSlice
