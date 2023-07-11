import api from '@/services/api'
import { setThemeMode } from '../slices/global'

export async function signInRequest(email, senha) {
  const userRequest = await api.post('/login', { email: email, senha: senha })
  if (userRequest.data.length) {
    return userRequest.data[0]
  } else {
    return false
  }
}

export const setTheme = plano => {
  return dispatch => {
    let theme = 'red'
    if (plano.includes('PRIME')) {
      theme = 'gold'
    }
    if (plano.includes('NUTRI')) {
      theme = 'green'
    }
    dispatch(setThemeMode(theme))
  }
}
