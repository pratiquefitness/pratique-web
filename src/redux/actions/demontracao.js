import { message } from 'antd'
import { setData, setLoading, setLoadingPeso } from '../slices/demonstracao'
import api from '@/services/api'

export const getTreino = () => {
  return async (dispatch, getState) => {
    const { login } = getState()
    dispatch(setLoading(true))
    return api
      .post('/treino', { email: login.usuario.user_email })
      .then(res => {
        dispatch(setData(res.data))
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}

export const updatePeso = data => {
  return async dispatch => {
    dispatch(setLoadingPeso(true))
    return api
      .post('/treino/updatePeso', data)
      .then(() => {
        message.success('Peso salvo com sucesso!')
      })
      .finally(() => {
        dispatch(setLoadingPeso(false))
      })
  }
}
