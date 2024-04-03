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
        message.success('Ponto registrado com sucesso!')
        dispatch(getPonto())
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}

export const getPonto = () => {
  return async (dispatch, getState) => {
    const { login } = getState()
    dispatch(setLoading(true))
    return api
      .post('/ponto/getPontoDeHoje', { id: login.usuario.ID })
      .then(res => {
        dispatch(setData(res.data))
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}
