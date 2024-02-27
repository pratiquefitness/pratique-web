import { configureStore } from '@reduxjs/toolkit'

import globalSlice from './slices/global'
import loginSlice from './slices/login'
import treinoSlice from './slices/treino'
import diagnoseSlice from './slices/diagnose'
import meditacaoSlice from './slices/meditacao'
import aulasColetivasSlice from './slices/aulasColetivas'
import livesSlice from './slices/lives'
import cisSlice from './slices/cis'
import pontoSlice from './slices/ponto'
import unipowerSlice from './slices/unipower'
import afiliadosSlice from './slices/afiliados'
import contaSlice from './slices/conta'
import exerciciosSlice from './slices/exercicios'

const store = configureStore({
  reducer: {
    global: globalSlice.reducer,
    login: loginSlice.reducer,
    conta: contaSlice.reducer,
    treino: treinoSlice.reducer,
    diagnose: diagnoseSlice.reducer,
    meditacao: meditacaoSlice.reducer,
    aulasColetivas: aulasColetivasSlice.reducer,
    lives: livesSlice.reducer,
    cis: cisSlice.reducer,
    ponto: pontoSlice.reducer,
    unipower: unipowerSlice.reducer,
    afiliados: afiliadosSlice.reducer,
    exercicios: exerciciosSlice.reducer,
  }
})

export default store
