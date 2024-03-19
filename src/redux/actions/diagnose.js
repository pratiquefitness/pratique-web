import { setData, setLoading } from '../slices/diagnose'
import api from '@/services/api'

export const getDiagnose = () => {
  return async (dispatch, getState) => {
    const { login } = getState()
    dispatch(setLoading(true))
    return api
      .post('/diagnose', { email: login.usuario.user_email })
      .then(res => {
        dispatch(setData(res.data))
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}
