import { setData, setLoading } from '../slices/treino'
import api from '@/services/api'

export const getTreino = () => {
  return async (dispatch, getState) => {
    const { login } = getState()
    dispatch(setLoading(true))
    return api
      .post('/treino', { email: login.usuario.user_email })
      .then(res => {
        dispatch(setData(res.data[0]))
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}
