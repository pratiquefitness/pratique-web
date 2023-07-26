import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  themeColor: 'red',
  themeMode: 'light'
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
    setThemeColor(state, action) {
      return {
        ...state,
        themeColor: action.payload
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

export const { setIsAuthenticated, setThemeColor, setThemeMode } = globalSlice.actions

export default globalSlice
