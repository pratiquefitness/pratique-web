import { message } from 'antd'
import { setData, setLoading } from '../slices/ponto'
import api from '@/services/api'

export const setPonto = userLocation => {
  return async (dispatch, getState) => {
    const { login } = getState()
    dispatch(setLoading(true))
    return api
      .post('/ponto', { id: login.usuario.ID, chave: login.usuario.chave, ...userLocation })
      .then(res => {
        if (res.data.status === 1) {
          message.success('Ponto registrado com sucesso!')
        } else {
          if (res.data.status === 2) {
            message.error('Você não está na sua unidade!')
          } else {
            message.error('Erro ao registrar ponto!')
          }
        }

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
