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
  setUnidades
} from '../slices/afiliados'
import apiLojaAfiliados from '@/services/apiLojaAfiliados'
import api from '@/services/api'
import { message } from 'antd'

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
        console.log('res', res)
        dispatch(setPix(res.data[0]))
        message.success('Pix salvo com sucesso!')
        callback(false)
      })
      .finally(() => {
        dispatch(setPixLoading(false))
      })
  }
}

export const getDadosAfiliado = () => {
  return async (dispatch, getState) => {
    const { login } = getState()
    dispatch(setLoading(true))
    return apiLojaAfiliados
      .post('getDadosAfiliado.php', {
        isAffiliate: login.usuario.isAffiliate
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
      .get('getunidades/index.php')
      .then(res => {
        dispatch(setUnidades(res.data))
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}

export const getPlanos = (chave, separador) => {
  return async dispatch => {
    dispatch(setPlanosLoading(true))
    return apiPratiqueFitness
      .get(`getplanos/index.php?unidade=${chave}|${separador}`)
      .then(res => {
        dispatch(setPlanos(res.data))
      })
      .finally(() => {
        dispatch(setPlanosLoading(false))
      })
  }
}
