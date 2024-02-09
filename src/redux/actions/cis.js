import { setData, setLoading } from '../slices/cis'
import api from '@/services/api'

export const getCis = () => {
  return async (dispatch, getState) => {
    try {
      const { login } = getState()
      // console.log('Estado atual de login:', login)
      dispatch(setLoading(true))

      const res = await api.post('/cis', {
        email: login.usuario.user_email,
        cargo: login.usuario.cargo
      })

      // console.log('Resposta da API:', res.data)

      dispatch(setData(res.data))
    } catch (error) {
      // console.error('Erro ao obter cis:', error)
    } finally {
      // console.log('Finalizando requisição')
      dispatch(setLoading(false))
    }
  }
}
