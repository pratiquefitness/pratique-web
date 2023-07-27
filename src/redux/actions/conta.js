import { setToken } from '@/contexts/AuthContext'
import { setLoading, setLogin } from '../slices/login'
import api from '@/services/api'
import { message } from 'antd'

export const updateConta = values => {
  return async (dispatch, getState) => {
    const { login } = getState()
    dispatch(setLoading(true))
    return api
      .post('/conta', { id: login.usuario.ID, ...values })
      .then(res => {
        dispatch(setLogin({ ...login.usuario, ...res.data }))
        setToken(res.data)
        message.success('Dados alterados com sucesso!')
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}
