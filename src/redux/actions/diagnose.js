import { setData, setLoading } from '../slices/diagnose'
import api from '@/services/api'

export const getDiagnose = (userEMail = '') => {
  return async (dispatch, getState) => {
    const { login } = getState()
    const email = userEMail === '' ? login.usuario.user_email : userEMail;
    dispatch(setLoading(true))
    return api
      .post('/diagnose', { email: email })
      .then(res => {
        dispatch(setData(res.data))
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}
