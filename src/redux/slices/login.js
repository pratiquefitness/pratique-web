import { createSlice } from '@reduxjs/toolkit'
// import { parseCookies } from 'nookies'
// import { tokenName } from '@/contexts/AuthContext'

// const { [tokenName]: token } = parseCookies()

const initialState = {
  usuario: {},
  loading: false,
  authenticated: false
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogin(state, action) {
      return { ...state, usuario: action.payload, authenticated: true, loading: false }
    },
    setLoading(state, action) {
      return { ...state, loading: action.payload }
    },
    setAuthenticated(state) {
      return { ...state, authenticated: true, loading: false }
    },
    unsetLogin() {
      return { usuario: {}, authenticated: false, loading: false }
    }
  }
})

export const { setLogin, setLoading, setAuthenticated, unsetLogin } = loginSlice.actions

export default loginSlice
