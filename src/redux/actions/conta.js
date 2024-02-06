import { setToken } from '@/contexts/AuthContext'
import { setLogin } from '../slices/login'
import { setLoading, setLoadingAvatar } from '../slices/conta'
import api from '@/services/api'
import { message } from 'antd'

export const excluirConta = () => {
  return async (dispatch, getState) => {
    const { login } = getState()
    dispatch(setLoading(true))
    try {
      await api.delete('/conta', { id: login.usuario.ID })
      message.success('Dados excluídos com sucesso!')
    } catch (error) {
      console.error('Erro ao excluir conta:', error)
    } finally {
      dispatch(setLoading(false))
    }
  }
}

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

export const uploadAvatar = avatar_image => {
  return async (dispatch, getState) => {
    const { login } = getState()
    dispatch(setLoadingAvatar(true))
    return api
      .post('/conta/uploadAvatar', { id: login.usuario.ID, avatar_image })
      .then(res => {
        dispatch(setLogin({ ...login.usuario, ...res.data }))
        setToken(res.data)
        message.success('Avatar alterado com sucesso!')
      })
      .finally(() => {
        dispatch(setLoadingAvatar(false))
      })
  }
}
