import api from '@/services/api'

export async function signInRequest(email, senha) {
  const userRequest = await api.post('/login', { email: email, senha: senha })
  if (userRequest.data.length) {
    return userRequest.data[0]
  } else {
    return false
  }
}
