import api from '@/services/api'
import { setThemeColor } from '../slices/global'
import {
  resetModalRecovery,
  setLoading,
  setModalRecoveryData,
  setModalRecoveryStep,
  setModalRegister
} from '../slices/login'
import { message } from 'antd'

export async function signInRequest(email, senha) {
  const userRequest = await api.post('/login', { email: email, senha: senha })
  if (userRequest.data.length) {
    return userRequest.data[0]
  } else {
    return false
  }
}

export const setTheme = plano => {
  return dispatch => {
    let theme = 'red'
    if (plano?.includes('PRIME')) {
      theme = 'gold'
    }
    if (plano?.includes('NUTRI')) {
      theme = 'green'
    }
    dispatch(setThemeColor(theme))
  }
}

export const checkRecoveryEmail = email => {
  return async dispatch => {
    dispatch(setLoading(true))
    return api
      .post('/login/checkRecoveryEmail', { email })
      .then(res => {
        if (res.data.length) {
          dispatch(setModalRecoveryData({ email: res.data[0].user_login }))
          dispatch(setModalRecoveryStep(1))
        } else {
          message.error('Não encontramos seu e-mail.')
        }
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}

export const checkRecoveryCode = code => {
  return async (dispatch, getState) => {
    const { login } = getState()
    dispatch(setLoading(true))
    return api
      .post('/login/checkRecoveryCode', { email: login.modalRecoveryData.email, code })
      .then(res => {
        if (res.data.length) {
          dispatch(setModalRecoveryData({ ...login.modalRecoveryData, code }))
          dispatch(setModalRecoveryStep(2))
        } else {
          message.error('Código inválido.')
        }
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}

export const changePassword = password => {
  return async (dispatch, getState) => {
    const { login } = getState()
    dispatch(setLoading(true))
    return api
      .post('/login/changePassword', {
        email: login.modalRecoveryData.email,
        code: login.modalRecoveryData.code,
        password
      })
      .then(res => {
        if (res.data.length) {
          message.success('Senha alterada com sucesso!')
          dispatch(resetModalRecovery())
        } else {
          message.error('Erro ao alterar sua senha.')
        }
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}

export const register = values => {
  return async dispatch => {
    dispatch(setLoading(true))
    return api
      .post('/login/register', values)
      .then(res => {
        if (res.data.length) {
          if (res.data[0] === 0) {
            message.error('Este e-mail já foi cadastrado.')
          } else {
            message.success('Cadastro realizado com sucesso.')
            dispatch(setModalRegister(false))
          }
        } else {
          message.error('Erro ao realizar seu cadastro.')
        }
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}
