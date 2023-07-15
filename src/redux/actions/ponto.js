import { message } from 'antd'
import { setData, setLoading } from '../slices/ponto'
import api from '@/services/api'

export const setPonto = () => {
  return async (dispatch, getState) => {
    const { login } = getState()
    dispatch(setLoading(true))
    return api
      .post('/ponto', { id: login.usuario.ID })
      .then(res => {
        dispatch(setData(res.data))
        message.success('Ponto registrado com sucesso!')
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}
