import { createSlice } from '@reduxjs/toolkit'

/** Primeiro Slice: afiliadosSlice **/

const initialStateAfiliados = {
  geral: [],
  pix: {},
  pixLoading: true,
  comissao: [],
  produtos: [],
  unidades: [],
  planos: [],
  planosLoading: true,
  loading: true,
  pixPayments: [],
  pixPaymentsLoading: false // Adicionamos este estado
  // Adicione outros estados se necessário
}

const afiliadosSlice = createSlice({
  name: 'afiliados',
  initialState: initialStateAfiliados,
  reducers: {
    setGeral(state, action) {
      state.geral = action.payload
    },
    setComissao(state, action) {
      state.comissao = action.payload
    },
    setProdutos(state, action) {
      state.produtos = action.payload
    },
    setUnidades(state, action) {
      state.unidades = action.payload
    },
    setPlanos(state, action) {
      state.planos = action.payload
    },
    setPlanosLoading(state, action) {
      state.planosLoading = action.payload
    },
    setPix(state, action) {
      state.pix = action.payload
    },
    setPixLoading(state, action) {
      state.pixLoading = action.payload
    },
    setLoading(state, action) {
      state.loading = action.payload
    },
    // Adicionando a action que está faltando
    setPixPaymentsLoading(state, action) {
      state.pixPaymentsLoading = action.payload
    },
    setPixPayments(state, action) {
      state.pixPayments = action.payload
    }
    // Adicione outros reducers se necessário
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
  setLoading,
  setPixPaymentsLoading, // Exportamos a action aqui
  setPixPayments
  // Exporte outras actions se necessário
} = afiliadosSlice.actions

// Exportação do reducer do primeiro slice
export const afiliadosReducer = afiliadosSlice.reducer
