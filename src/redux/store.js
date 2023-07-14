import { configureStore } from '@reduxjs/toolkit'

import globalSlice from './slices/global'
import loginSlice from './slices/login'
import treinoSlice from './slices/treino'
import diagnoseSlice from './slices/diagnose'
import meditacaoSlice from './slices/meditacao'
import aulasColetivasSlice from './slices/aulasColetivas'

const store = configureStore({
  reducer: {
    global: globalSlice.reducer,
    login: loginSlice.reducer,
    treino: treinoSlice.reducer,
    diagnose: diagnoseSlice.reducer,
    meditacao: meditacaoSlice.reducer,
    aulasColetivas: aulasColetivasSlice.reducer
  }
})

export default store
