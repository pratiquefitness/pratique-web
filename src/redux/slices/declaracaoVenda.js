import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  unidades: [],
  resumo: []
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
    setResumo(state, action) {
      return { ...state, resumo: action.payload }
    },
  }
})

export const { setLoading, setUnidades, setResumo } = declaracaoVendaSlice.actions

export default declaracaoVendaSlice
