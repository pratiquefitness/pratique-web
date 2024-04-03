import { message } from 'antd'
import { setData, setLoading, setLoadingAnotacoes, setLoadingPeso } from '../slices/treino'
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

export const updateAnotacoes = data => {
  return async dispatch => {
    dispatch(setLoadingAnotacoes(true))
    return api
      .post('/treino/updateAnotacoes', data)
      .then(() => {
        message.success('Anotações salvas com sucesso!')
      })
      .finally(() => {
        dispatch(setLoadingAnotacoes(false))
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
