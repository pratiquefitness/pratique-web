import { setData, setLoading } from '../slices/cis'
import api from '@/services/api'

export const getCis = () => {
  return async (dispatch, getState) => {
    const { login } = getState()
    dispatch(setLoading(true))
    return api
      .post('/cis', { email: login.usuario.user_email, cargo: login.cargo })
      .then(res => {
        dispatch(setData(res.data))
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}
