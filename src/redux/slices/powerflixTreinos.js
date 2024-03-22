import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: true,
  treino: [],
}

export const powerflixTreinosSlice = createSlice({
  name: 'powerflixTreinos',
  initialState,
  reducers: {
    setLoading(state, action) {
      return { ...state, loading: action.payload }
    },
    setTreino(state, action) {
      return { ...state, treino: action.payload }
    },
  }
})

export const { setLoading, setTreino } = powerflixTreinosSlice.actions

export default powerflixTreinosSlice
