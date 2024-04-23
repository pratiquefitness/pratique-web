import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  unidades: [],
}

export const declaracaoVendaSlice = createSlice({
  name: 'declaracaoVenda',
  initialState,
  reducers: {
    setLoading(state, action) {
      return { ...state, loading: action.payload }
    },
    setUnidades(state, action) {
      return { ...state, unidades: action.payload }
    },
  }
})

export const { setLoading, setUnidades } = declaracaoVendaSlice.actions

export default declaracaoVendaSlice
