import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  themeMode: 'red'
}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setIsAuthenticated(state, action) {
      return {
        ...state,
        isAuthenticated: action.payload
      }
    },
    setThemeMode(state, action) {
      return {
        ...state,
        themeMode: action.payload
      }
    }
  }
})

export const { setIsAuthenticated, setThemeMode } = globalSlice.actions

export default globalSlice
