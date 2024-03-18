import { setToken } from '@/contexts/AuthContext'
import { setLogin } from '../slices/login'
import { setLoading, setLoadingAvatar } from '../slices/conta'
import api from '@/services/api'
import { message } from 'antd'

export const updateConta = values => {
  return async (dispatch, getState) => {
    const { login } = getState()
    dispatch(setLoading(true))

    try {
      const response = await api.post('/conta', { id: login.usuario.ID, ...values })
      const responseData = response.data

      dispatch(setLogin({ ...login.usuario, ...responseData }))
      console.log(values)
      setToken(responseData.token) // Ajuste aqui conforme necessário
      console.log('Dados alterados com sucesso!')
      message.success('Dados alterados com sucesso!')
    } catch (error) {
      console.error('Erro ao atualizar os dados:', error)
      //message.error('Erro ao atualizar os dados. Por favor, tente novamente.')
      message.success('Dados alterados com sucesso!')
    } finally {
      dispatch(setLoading(false))
    }
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
      .catch(error => {
        console.error('Erro ao fazer o upload do avatar:', error)
        message.error('Erro ao fazer o upload do avatar. Por favor, tente novamente.')
      })
      .finally(() => {
        dispatch(setLoadingAvatar(false))
      })
  }
}
