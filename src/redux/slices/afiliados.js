import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  geral: [],
  pix: {},
  pixLoading: true,
  comissao: [],
  produtos: [],
  unidades: [],
  planos: [],
  planosLoading: true,
  loading: true
}

export const afiliadosSlice = createSlice({
  name: 'afiliados',
  initialState,
  reducers: {
    setGeral(state, action) {
      return { ...state, geral: action.payload }
    },
    setComissao(state, action) {
      return { ...state, comissao: action.payload }
    },
    setProdutos(state, action) {
      return { ...state, produtos: action.payload }
    },
    setUnidades(state, action) {
      return { ...state, unidades: action.payload }
    },
    setPlanos(state, action) {
      return { ...state, planos: action.payload }
    },
    setPlanosLoading(state, action) {
      return { ...state, planosLoading: action.payload }
    },
    setPix(state, action) {
      return { ...state, pix: action.payload }
    },
    setPixLoading(state, action) {
      return { ...state, pixLoading: action.payload }
    },
    setLoading(state, action) {
      return { ...state, loading: action.payload }
    }
  }
})

export const {
  setGeral,
  setComissao,
  setProdutos,
  setUnidades,
  setPlanos,
  setPlanosLoading,
  setPix,
  setPixLoading,
  setLoading
} = afiliadosSlice.actions

export default afiliadosSlice
