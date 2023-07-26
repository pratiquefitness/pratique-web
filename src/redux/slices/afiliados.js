import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  geral: [],
  comissao: [],
  produtos: [],
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
    setLoading(state, action) {
      return { ...state, loading: action.payload }
    }
  }
})

export const { setGeral, setComissao, setProdutos, setLoading } = afiliadosSlice.actions

export default afiliadosSlice
