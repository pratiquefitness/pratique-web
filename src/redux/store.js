import { configureStore } from '@reduxjs/toolkit'

import globalSlice from './slices/global'
import loginSlice from './slices/login'
import treinoSlice from './slices/treino'
import diagnoseSlice from './slices/diagnose'

const store = configureStore({
  reducer: {
    global: globalSlice.reducer,
    login: loginSlice.reducer,
    treino: treinoSlice.reducer,
    diagnose: diagnoseSlice.reducer
  }
})

export default store
