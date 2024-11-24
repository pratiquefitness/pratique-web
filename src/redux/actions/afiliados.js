import apiPratiqueFitness from '@/services/apiPratiqueFitness'
import {
  setComissao,
  setGeral,
  setLoading,
  setPix,
  setPixLoading,
  setPlanos,
  setPlanosLoading,
  setProdutos,
  setUnidades,
  setPixPayments,
  setPixPaymentsLoading
} from '../slices/afiliados'
import apiLojaAfiliados from '@/services/apiLojaAfiliados'
import api from '@/services/api'
import { message, Alert } from 'antd'

export const getPix = () => {
  return async (dispatch, getState) => {
    const { login } = getState()
    dispatch(setPixLoading(true))
    return api
      .post('/afiliados/getPix', {
        email: login.usuario.user_email
      })
      .then(res => {
        dispatch(setPix(res.data))
      })
      .finally(() => {
        dispatch(setPixLoading(false))
      })
  }
}

export const savePix = (tipo, chave, callback) => {
  return async (dispatch, getState) => {
    const { login } = getState()
    dispatch(setPixLoading(true))
    return api
      .post('/afiliados/savePix', {
        email: login.usuario.user_email,
        tipo,
        chave
      })
      .then(res => {
        dispatch(setPix(res.data[0]))
        message.success('Pix salvo com sucesso!')
        callback(false)
      })
      .finally(() => {
        dispatch(setPixLoading(false))
      })
  }
}

export const getPixPayments = chavePix => async dispatch => {
  dispatch(setPixPaymentsLoading(true))
  console.log('Chave Pix enviada para getPixPayments:', chavePix) // Log para verificar a chave Pix
  try {
    const response = await api.post('/afiliados/getPixPayments', { chave: chavePix })

    if (response.data?.pixPayments) {
      dispatch(setPixPayments(response.data.pixPayments))
      return { success: true }
    } else {
      dispatch(setPixPayments([]))
      return { success: false, message: 'Nenhum pagamento encontrado para esta chave Pix.' }
    }
  } catch (error) {
    console.error('Erro ao obter pagamentos do Pix:', error)
    message.error('Erro ao obter pagamentos via Pix.')
    return { success: false, message: 'Erro ao obter pagamentos via Pix.' }
  } finally {
    dispatch(setPixPaymentsLoading(false))
  }
}

export const getDadosAfiliado = () => {
  return async (dispatch, getState) => {
    const { login } = getState()
    dispatch(setLoading(true))
    return apiLojaAfiliados
      .post('getDadosAfiliado.php', {
        isAffiliate: login.usuario.isAffiliate,
        isEmail: login.usuario.user_login
      })
      .then(res => {
        dispatch(setGeral(res.data))
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}

export const getComissoesAfiliado = () => {
  return async (dispatch, getState) => {
    const { login } = getState()
    dispatch(setLoading(true))
    return apiLojaAfiliados
      .post('getComisoesAfiliado.php', {
        isAffiliate: login.usuario.isAffiliate
      })
      .then(res => {
        dispatch(setComissao(res.data))
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}

export const getProdutosAfiliado = isAffiliate => {
  return async dispatch => {
    dispatch(setLoading(true))
    return apiLojaAfiliados
      .post('getProdutosAfiliado.php', {
        isAffiliate
      })
      .then(res => {
        dispatch(setProdutos(res.data))
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}

export const getUnidades = () => {
  return async dispatch => {
    dispatch(setLoading(true))
    return apiPratiqueFitness
      .get('getunidades/index2.php')
      .then(res => {
        dispatch(setUnidades(res.data))
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}

export const getPlanos = (chave, separador, nome, slug) => {
  return async dispatch => {
    dispatch(setPlanosLoading(true))
    return apiPratiqueFitness
      .get(`getplanos/index.php?unidade=${chave}|${separador}&nome=${nome}&slug=${slug}`)
      .then(res => {
        dispatch(setPlanos(res.data))
      })
      .finally(() => {
        dispatch(setPlanosLoading(false))
      })
  }
}
