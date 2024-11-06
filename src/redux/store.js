import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./slices/global";
import loginSlice from "./slices/login";
import treinoSlice from "./slices/treino";
import diagnoseSlice from "./slices/diagnose";
import meditacaoSlice from "./slices/meditacao";
import aulasColetivasSlice from "./slices/aulasColetivas";
import livesSlice from "./slices/lives";
import cisSlice from "./slices/cis";
import pontoSlice from "./slices/ponto";
import unipowerSlice from "./slices/unipower";
import afiliadosSlice from "./slices/afiliados";
import contaSlice from "./slices/conta";
import clubeCertoSvaReducer from "./slices/clubeCertoSva";
import clubeCertoSvaSlice from "./slices/clubeCertoSva";
import areaDoPersonalReducer from "./slices/areaDoPersonal";
import exerciciosSlice from "./slices/exercicios";

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
    clubeCertoSva: clubeCertoSvaSlice.reducer,
    areaDoPersonal: areaDoPersonalReducer,
    exercicios: exerciciosSlice.reducer // Adicione o reducer aqui
  }
});

export default store;
